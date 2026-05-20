'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * 교육 신청 폼.
 *
 * 전송 전략 (3중 안전망):
 * 1) PRIMARY   — Firestore 직접 저장 (Firebase, 100% 안정적, 무료, 즉시)
 *                → 관리자가 Firebase Console 에서 직접 확인 가능
 *                → 분실 위험 없음, 외부 서비스 장애 영향 없음
 * 2) SECONDARY — Web3Forms / FormSubmit 으로 이메일 알림 (best effort)
 *                → 실패해도 Firestore 에 저장되었으므로 데이터는 안전
 * 3) UI FALLBACK — 모든 전송이 실패할 경우만 사용자에게 대체 안내
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/hyedu0829@gmail.com';

const KAKAO_CHANNEL = 'http://pf.kakao.com/_fxbVcs';
const CONTACT_EMAIL = 'hyedu0829@gmail.com';

type FormFields = {
  school: string;
  contactName: string;
  phone: string;
  email: string;
  target: string;
  schedule: string;
  programs: string;
  notes: string;
};

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; fields: FormFields };

function collectFields(form: HTMLFormElement): FormFields {
  const fd = new FormData(form);
  const get = (k: string) => String(fd.get(k) ?? '').trim();
  return {
    school: get('학교/기관명'),
    contactName: get('담당자 이름'),
    phone: get('연락처'),
    email: get('이메일'),
    target: get('대상 및 인원'),
    schedule: get('희망 일정'),
    programs: get('관심 프로그램'),
    notes: get('기타 요청사항'),
  };
}

function buildMessageBody(f: FormFields): string {
  const lines: Array<[string, string]> = [
    ['학교/기관명', f.school],
    ['담당자 이름', f.contactName],
    ['연락처', f.phone],
    ['이메일', f.email],
    ['대상 및 인원', f.target],
    ['희망 일정', f.schedule],
    ['관심 프로그램', f.programs],
    ['기타 요청사항', f.notes],
  ];
  return lines
    .map(([label, value]) => `■ ${label}\n${value || '-'}`)
    .join('\n\n');
}

/**
 * Firestore 'applications' 컬렉션에 신청서 저장.
 * Firebase 가 살아있으면 100% 성공. 관리자는 Firebase Console > Firestore Database
 * > applications 컬렉션에서 모든 신청 내역 확인 가능.
 */
async function submitFirestore(f: FormFields): Promise<boolean> {
  try {
    await addDoc(collection(db, 'applications'), {
      school: f.school,
      contactName: f.contactName,
      phone: f.phone,
      email: f.email,
      target: f.target,
      schedule: f.schedule,
      programs: f.programs,
      notes: f.notes,
      createdAt: serverTimestamp(),
      status: 'new',
      source: 'website',
    });
    return true;
  } catch (err) {
    console.error('[ApplicationForm] Firestore submit failed', err);
    return false;
  }
}

async function submitWeb3Forms(f: FormFields): Promise<boolean> {
  if (!WEB3FORMS_KEY) return false;
  const payload = new FormData();
  payload.append('access_key', WEB3FORMS_KEY);
  payload.append('subject', '[홈페이지] 교육 신청서');
  payload.append('from_name', `${f.school} - ${f.contactName}`);
  payload.append('email', f.email);
  payload.append('학교/기관명', f.school);
  payload.append('담당자 이름', f.contactName);
  payload.append('연락처', f.phone);
  payload.append('이메일', f.email);
  payload.append('대상 및 인원', f.target);
  payload.append('희망 일정', f.schedule);
  payload.append('관심 프로그램', f.programs);
  payload.append('기타 요청사항', f.notes);
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

async function submitFormSubmit(f: FormFields): Promise<boolean> {
  const payload = new FormData();
  payload.append('학교/기관명', f.school);
  payload.append('담당자 이름', f.contactName);
  payload.append('연락처', f.phone);
  payload.append('이메일', f.email);
  payload.append('대상 및 인원', f.target);
  payload.append('희망 일정', f.schedule);
  payload.append('관심 프로그램', f.programs);
  payload.append('기타 요청사항', f.notes);
  payload.append('_subject', '[홈페이지] 교육 신청서');
  payload.append('_template', 'table');
  payload.append('_captcha', 'false');

  // 1회 자동 재시도 (FormSubmit 의 일시 522 에러 완화)
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      if (res.ok) {
        const json = (await res.json()) as { success?: string | boolean };
        if (json.success === 'true' || json.success === true) return true;
      }
    } catch {
      // 다음 시도로 진행
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

export default function ApplicationForm({ isKo }: { isKo: boolean }) {
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: 'submitting' });

    const form = e.currentTarget;
    const fields = collectFields(form);

    // 1) Firestore 에 저장 (PRIMARY - 무조건 성공해야 함)
    const firestoreOk = await submitFirestore(fields);

    // 2) 동시에 이메일 알림 시도 (best effort - 실패해도 데이터는 Firestore 에 안전)
    //    사용자를 기다리게 하지 않고 백그라운드로 실행
    void submitWeb3Forms(fields).catch(() => {});
    void submitFormSubmit(fields).catch(() => {});

    if (firestoreOk) {
      setStatus({ type: 'success' });
      form.reset();
    } else {
      // Firestore 도 실패한 극히 드문 경우 → 대체 안내
      setStatus({ type: 'error', fields });
    }
  }

  // 성공 화면 ---------------------------------------------------
  if (status.type === 'success') {
    return (
      <div className="rounded-2xl bg-white border border-green-200 p-10 text-center shadow-sm">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isKo ? '신청이 완료되었습니다!' : 'Submission complete'}
        </h3>
        <p className="text-sm text-gray-600">
          {isKo
            ? '담당자가 확인 후 빠르게 연락드리겠습니다.'
            : 'Our team will get back to you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: 'idle' })}
          className="mt-6 inline-block text-sm text-point hover:underline"
        >
          {isKo ? '추가 신청 작성하기' : 'Submit another'}
        </button>
      </div>
    );
  }

  const submitting = status.type === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm text-left max-w-[760px] mx-auto"
    >
      <div className="mb-5 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {isKo ? '교육 신청서' : 'Education Application'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {isKo
            ? '아래 정보를 작성해 주시면 담당자가 빠르게 연락드립니다.'
            : 'Fill in the form below and our team will reach out.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={isKo ? '학교/기관명' : 'School / Organization'} required>
          <input type="text" name="학교/기관명" required disabled={submitting} className="form-input" />
        </Field>

        <Field label={isKo ? '담당자 이름' : 'Contact Person'} required>
          <input type="text" name="담당자 이름" required disabled={submitting} className="form-input" />
        </Field>

        <Field label={isKo ? '연락처' : 'Phone'} required>
          <input type="tel" name="연락처" placeholder="010-1234-5678" required disabled={submitting} className="form-input" />
        </Field>

        <Field label={isKo ? '이메일' : 'Email'} required>
          <input type="email" name="이메일" placeholder="example@email.com" required disabled={submitting} className="form-input" />
        </Field>

        <Field label={isKo ? '대상 및 인원' : 'Target & Number'} required>
          <input
            type="text"
            name="대상 및 인원"
            placeholder={isKo ? '예) 초등 4학년 30명' : 'e.g., 30 4th-graders'}
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '희망 일정' : 'Preferred Schedule'}>
          <input
            type="text"
            name="희망 일정"
            placeholder={isKo ? '예) 2026년 5월 둘째 주' : 'e.g., 2nd week of May 2026'}
            disabled={submitting}
            className="form-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={isKo ? '관심 프로그램' : 'Programs of Interest'}>
          <textarea
            name="관심 프로그램"
            rows={2}
            placeholder={
              isKo
                ? '예) AI 인공지능 교육, 자율주행 자동차, 드론 코딩'
                : 'e.g., AI education, autonomous driving, drone coding'
            }
            disabled={submitting}
            className="form-input resize-y"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={isKo ? '기타 요청사항' : 'Additional Notes'}>
          <textarea
            name="기타 요청사항"
            rows={3}
            placeholder={
              isKo
                ? '특별히 요청하실 사항이나 궁금한 점을 자유롭게 적어주세요.'
                : 'Anything else you want us to know?'
            }
            disabled={submitting}
            className="form-input resize-y"
          />
        </Field>
      </div>

      {/* 오류 시 대체 안내 ----------------------------------- */}
      {status.type === 'error' && (
        <ErrorFallback fields={status.fields} isKo={isKo} />
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={submitting}
          className="bg-point text-white font-semibold rounded-xl px-10 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
        >
          {submitting
            ? isKo
              ? '전송 중...'
              : 'Sending...'
            : isKo
              ? '신청서 보내기'
              : 'Submit'}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        {isKo
          ? `제출하신 정보는 ${CONTACT_EMAIL} 으로 전송되며, 문의 응대 외 다른 용도로 사용되지 않습니다.`
          : `Your information is sent to ${CONTACT_EMAIL} and used solely for responding to your inquiry.`}
      </p>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: #336666;
          box-shadow: 0 0 0 2px rgba(51, 102, 102, 0.15);
        }
        :global(.form-input:disabled) {
          background: #f9fafb;
          color: #9ca3af;
        }
      `}</style>
    </form>
  );
}

// ============ 오류 시 대체 안내 컴포넌트 ============
const GMAIL_URL = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox';

function ErrorFallback({ fields, isKo }: { fields: FormFields; isKo: boolean }) {
  const [copied, setCopied] = useState(false);
  const body = buildMessageBody(fields);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(
        `${CONTACT_EMAIL}\n\n[교육 신청서]\n\n${body}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // 클립보드 권한 없는 경우 무시
    }
  }

  return (
    <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h4 className="font-bold text-amber-900 mb-1">
            {isKo ? '전송에 일시적인 문제가 발생했습니다' : 'Temporary submission issue'}
          </h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            {isKo
              ? '아래 방법 중 한 가지로 신청해 주시면 담당자가 빠르게 연락드리겠습니다. 「이메일로 보내기」 클릭 시 입력하신 내용이 클립보드에 자동 복사되며, Gmail이 새 창으로 열립니다 — 받는사람·내용 붙여넣어 보내주세요.'
              : 'Please use one of the alternatives below — we will respond shortly. Clicking "Send via Email" copies your info to the clipboard and opens Gmail; paste and send.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
        {/* ① Gmail 열기 (작성 내용 자동 복사 후 새 창에서 Gmail) */}
        <button
          type="button"
          onClick={async () => {
            // 내용을 자동으로 클립보드에 복사 후 Gmail 새 창으로 이동
            try {
              await navigator.clipboard.writeText(
                `받는사람: ${CONTACT_EMAIL}\n제목: [교육 신청] ${fields.school || ''}\n\n${body}`,
              );
            } catch {
              // 클립보드 실패해도 Gmail 은 열기
            }
            window.open(GMAIL_URL, '_blank', 'noopener,noreferrer');
          }}
          className="flex items-center justify-center gap-2 bg-white text-point font-bold text-sm px-4 py-3 rounded-lg border-2 border-point hover:bg-point hover:text-white transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isKo ? '이메일로 보내기' : 'Send via Email'}
        </button>

        {/* ② 카카오 채널 문의 */}
        <a
          href={KAKAO_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#391B1B] font-bold text-sm px-4 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.85 1.87 5.34 4.66 6.79l-1.1 4.03c-.1.36.3.65.62.45L11 19.5c.33.03.66.05 1 .05 5.52 0 10-3.58 10-8s-4.48-8.55-10-8.55z" />
          </svg>
          {isKo ? '카카오톡 문의' : 'KakaoTalk'}
        </a>

        {/* ③ 작성 내용 복사 */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 bg-white text-slate-700 font-bold text-sm px-4 py-3 rounded-lg border-2 border-slate-300 hover:border-slate-500 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {copied
            ? isKo ? '복사됨 ✓' : 'Copied ✓'
            : isKo ? '내용 복사' : 'Copy Info'}
        </button>
      </div>

      {/* 연락처 정보 */}
      <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-amber-900 space-y-1">
        <p>
          📧 <strong>{CONTACT_EMAIL}</strong>
        </p>
        <p>
          📞 <strong>070-8064-0829</strong>
        </p>
        <p className="text-amber-700/80">
          {isKo
            ? '※ 잠시 후 [신청서 보내기] 버튼을 다시 눌러보셔도 됩니다.'
            : '※ You can also retry by clicking [Submit] in a moment.'}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
