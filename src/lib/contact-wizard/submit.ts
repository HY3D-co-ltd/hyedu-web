/**
 * 접수 엔드포인트로 보내고 응답을 가른다. 사양 §5.4.
 * 같은 submissionId로 다시 보내는 것은 고정된 같은 묶음(payload)일 때만이다 — 호출하는 쪽이 지킨다.
 */
import type { InquiryPayload, WizardMode } from './types';

export const INQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT ?? '';

const TIMEOUT_MS = 15000;

export type SubmitResult =
  | { kind: 'ok'; receipt: string }
  /** 400이고 화면 칸을 가리키는 오류 */
  | { kind: 'invalid'; fields: string[] }
  /** 저장 실패가 확실함 (500 save_failed) */
  | { kind: 'save_failed' }
  /** 결과를 모름 (네트워크 오류 · 시간 초과). 저장됐을 수 있다 */
  | { kind: 'unknown' }
  /** 그 밖의 응답 (200인데 접수번호 없음, JSON 아님, 모르는 상태 코드, 화면 칸이 아닌 400) */
  | { kind: 'error' };

/** 화면 칸으로 돌아갈 수 있는 오류 필드 */
const FIELD_ERRORS = ['org.name', 'contact.name', 'contact.mobile', 'contact.email', 'consent'];

function receiptPattern(mode: WizardMode): RegExp {
  return mode === 'preview' ? /^T-[0-9A-F]{8}$/ : /^W-[0-9A-F]{8}$/;
}

async function postOnce(endpoint: string, body: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function classify(res: Response, mode: WizardMode): Promise<SubmitResult> {
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    return { kind: 'error' };
  }
  const body = (data ?? {}) as { ok?: boolean; receipt?: unknown; reason?: unknown; errors?: unknown };
  if (res.status === 200 && body.ok === true && typeof body.receipt === 'string' && receiptPattern(mode).test(body.receipt)) {
    return { kind: 'ok', receipt: body.receipt };
  }
  if (res.status === 400 && body.reason === 'invalid' && Array.isArray(body.errors)) {
    const fields = body.errors.filter((e): e is string => typeof e === 'string' && FIELD_ERRORS.includes(e));
    if (fields.length) return { kind: 'invalid', fields };
  }
  // 저장 실패는 500이다. 502는 n8n Cloud 앞단(Cloudflare)이 자기 HTML 오류 페이지로 바꾸고 CORS 헤더를 떨어뜨려
  // 브라우저가 네트워크 오류로 보게 되므로 중계가 쓰지 않는다 (hyedu-brain 웹 접수 계약 v1).
  if (res.status === 500 && body.reason === 'save_failed') return { kind: 'save_failed' };
  return { kind: 'error' };
}

/** 네트워크 오류 · 시간 초과면 같은 묶음으로 한 번 다시 보낸다. */
export async function submitInquiry(endpoint: string, payload: InquiryPayload, mode: WizardMode): Promise<SubmitResult> {
  const body = JSON.stringify(payload);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await postOnce(endpoint, body);
      return await classify(res, mode);
    } catch {
      // 응답을 못 받았다. 한 번 더 보내고, 그래도 안 되면 결과를 모르는 상태로 둔다.
    }
  }
  return { kind: 'unknown' };
}
