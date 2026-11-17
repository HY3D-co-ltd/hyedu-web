/**
 * 임시 저장. 사양 §5.3.
 * - 허용 목록 방식: 보기에서 고른 답만 저장한다. 자유 입력(S14), 연락처(S15), 시험 의견은 저장하지 않는다.
 * - localStorage에는 만료 기능이 없으므로 저장 시각을 함께 두고, 읽을 때 7일이 지났으면 지운다.
 * - 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서는 저장 없이 동작한다.
 */
import type { Answers, StepId, WizardMode } from './types';

const TTL_MS = 7 * 24 * 3600 * 1000;

const KEYS: Record<WizardMode, string> = {
  live: 'hyedu:contact-draft:v1',
  preview: 'hyedu:contact-preview-draft:v1',
};

interface Stored {
  savedAt: number;
  step: StepId;
  answers: Answers;
  programSlug: string | null;
}

/** 저장해도 되는 답만 남긴다 */
function allowlisted(a: Answers): Answers {
  const out: Answers = { ...a };
  if (out.request) out.request = { ...out.request, text: '' };
  return out;
}

export function saveDraft(mode: WizardMode, step: StepId, answers: Answers, programSlug: string | null): void {
  try {
    const data: Stored = { savedAt: Date.now(), step, answers: allowlisted(answers), programSlug };
    window.localStorage.setItem(KEYS[mode], JSON.stringify(data));
  } catch {
    // 저장소를 못 쓰면 임시 저장 없이 진행한다(사양 §5.3).
  }
}

export function loadDraft(mode: WizardMode): Stored | null {
  try {
    const raw = window.localStorage.getItem(KEYS[mode]);
    if (!raw) return null;
    const data = JSON.parse(raw) as Stored;
    if (!data || typeof data.savedAt !== 'number' || Date.now() - data.savedAt > TTL_MS) {
      window.localStorage.removeItem(KEYS[mode]);
      return null;
    }
    if (!data.answers || Object.keys(data.answers).length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export function clearDraft(mode: WizardMode): void {
  try {
    window.localStorage.removeItem(KEYS[mode]);
  } catch {
    // 저장소를 못 쓰면 지울 것도 없다.
  }
}
