/**
 * 위저드 흐름: 어떤 질문이 어떤 순서로 나오는지. 사양 §2.
 * 답(Answers)만 보고 정한다 — 같은 답이면 언제나 같은 질문 목록이 나온다.
 */
import { SCHOOL_ORGS, gradeOptions } from '@/data/contact-wizard';
import { findProgramBySlug } from './catalog';
import type { Answers, EduKey, FieldKey, StepId, Target } from './types';

export function isSchool(orgType: string | undefined): boolean {
  return !!orgType && SCHOOL_ORGS.includes(orgType);
}

/** 지금 답으로 보여 줄 질문 목록. 개인 참가는 S1에서 끝난다. */
export function visibleSteps(a: Answers): StepId[] {
  const steps: StepId[] = ['eduType'];
  if (a.eduType === 'individual') return steps;

  const edu = a.eduType;
  steps.push('orgType');
  if (isSchool(a.orgType?.value) && (edu === 'class' || edu === 'club' || edu === 'lecture' || edu === 'unknown')) {
    steps.push('schoolSlot');
  }
  steps.push('audience', 'headcount');
  if (edu === 'class' || edu === 'club' || edu === 'unknown') steps.push('field');
  steps.push('programs', 'place');

  // S9 · S10은 진행 장소(S8)로 정한다. 체험부스는 S10 대신 S11.
  const place = a.place === undefined ? undefined : (a.place?.value ?? 'unknown');
  const onSite = place === 'visit' || place === 'other';
  if (onSite) steps.push('region');
  if (edu === 'booth') {
    steps.push('booth');
  } else if (onSite || place === 'unknown' || place === 'live') {
    steps.push('facility');
  }

  steps.push('schedule', 'budget', 'request', 'contact');
  return steps;
}

/** S10에서 보여 줄 묶음. 온라인 실시간이면 기기만. */
export function facilityGroups(a: Answers): { rooms: boolean; devices: boolean } {
  return a.place?.value === 'live' ? { rooms: false, devices: true } : { rooms: true, devices: true };
}

/** 답한 질문인지 (모르겠어요 · 건너뛰기도 답이다) */
export function isAnswered(a: Answers, step: StepId): boolean {
  if (step === 'contact') return false;
  return a[step] !== undefined;
}

/**
 * 답을 바꾼 뒤 뒤쪽의 맞지 않게 된 답을 지운다.
 * - 보이지 않게 된 질문의 답은 지운다.
 * - 보기가 바뀌는 질문(교육 형태 → 프로그램 · 장소 · 일정 보충, 기관 → 수업 시간 · 대상)은 지운다.
 */
export function applyAnswer<K extends keyof Answers>(prev: Answers, step: K, value: Answers[K]): Answers {
  const next: Answers = { ...prev, [step]: value };
  const changed = JSON.stringify(prev[step]) !== JSON.stringify(value);
  if (changed && prev[step] !== undefined) {
    if (step === 'eduType') {
      delete next.programs;
      delete next.place;
      delete next.schedule;
      delete next.field;
      delete next.booth;
      delete next.facility;
      delete next.region;
      delete next.schoolSlot;
    }
    if (step === 'orgType') {
      delete next.schoolSlot;
      delete next.audience;
    }
  }
  const visible = new Set(visibleSteps(next));
  for (const key of Object.keys(next) as (keyof Answers)[]) {
    if (!visible.has(key as StepId)) delete next[key];
  }
  return next;
}

/** 프로그램 필터용 대상. 유아 · 가족은 필터를 걸지 않는다. */
export function targetsOf(a: Answers): Target[] {
  const grades = a.audience?.grades ?? [];
  const opts = gradeOptions(a.orgType?.value);
  const out = new Set<Target>();
  for (const gr of grades) {
    const t = opts.find((o) => o.value === gr)?.target;
    if (t) out.add(t);
  }
  return [...out];
}

export function fieldsOf(a: Answers): FieldKey[] {
  return a.field ?? [];
}

const TYPE_PARAM: Record<string, EduKey> = {
  class: 'class',
  club: 'club',
  lecture: 'lecture',
  booth: 'booth',
  camp: 'camp',
  online: 'online',
};

/**
 * 진입 파라미터로 미리 채우기. 사양 §5.1.
 * 목록에 없거나 숨김인 slug, 모르는 type은 무시한다.
 */
export function prefillFromQuery(params: URLSearchParams): { answers: Answers; programSlug: string | null } | null {
  const slug = params.get('program');
  if (slug) {
    const p = findProgramBySlug(slug);
    if (p) {
      return {
        answers: {
          eduType: 'class',
          field: [p.category],
          programs: { picked: [`program:${p.slug}`], other: '', recommend: false },
        },
        programSlug: p.slug,
      };
    }
  }
  const type = params.get('type');
  if (type && TYPE_PARAM[type]) {
    return { answers: { eduType: TYPE_PARAM[type] }, programSlug: null };
  }
  return null;
}

/** 미리 채운 답 다음의 첫 질문 */
export function firstUnanswered(a: Answers): StepId {
  return visibleSteps(a).find((s) => !isAnswered(a, s)) ?? 'contact';
}
