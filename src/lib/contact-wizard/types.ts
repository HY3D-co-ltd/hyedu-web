/**
 * 교육 신청 위저드의 상태 타입.
 * 사양: docs/superpowers/specs/2026-11-17-contact-wizard-questions.md
 *
 * 답은 질문(StepId)마다 하나씩 둔다.
 * - undefined: 아직 답하지 않음
 * - null: 「아직 모르겠어요」 또는 「건너뛰기」로 넘어감 (보낼 때 `미정`)
 */

export type Lang = 'ko' | 'en';

/** 화면 문구 한 쌍. 보내는 값은 따로 두고, 이것은 보여 주기용이다. */
export interface Loc {
  ko: string;
  en: string;
}

export type StepId =
  | 'eduType' // S1
  | 'orgType' // S2
  | 'schoolSlot' // S3
  | 'audience' // S4
  | 'headcount' // S5
  | 'field' // S6
  | 'programs' // S7
  | 'place' // S8
  | 'region' // S9
  | 'facility' // S10
  | 'booth' // S11
  | 'schedule' // S12
  | 'budget' // S13
  | 'request' // S14
  | 'contact'; // S15

export type EduKey = 'class' | 'club' | 'lecture' | 'booth' | 'camp' | 'online' | 'individual' | 'unknown';

export type PlaceKey = 'visit' | 'erica' | 'other' | 'live' | 'video';

export type FieldKey = 'ai' | 'coding' | 'maker' | 'steam' | 'recommend';

export type Target = 'elementary' | 'middle' | 'high' | 'adult';

export interface OrgTypeAnswer {
  value: string;
  other: string;
}

export interface AudienceAnswer {
  grades: string[];
  support: string[];
}

export interface HeadcountAnswer {
  count: number | null;
  classes: number | null;
}

export interface ProgramsAnswer {
  /** CatalogItem.id 목록 */
  picked: string[];
  other: string;
  recommend: boolean;
}

export interface PlaceAnswer {
  value: PlaceKey;
  campLength: string;
}

export interface RegionAnswer {
  sido: string;
  sigungu: string;
  place: string;
}

export interface FacilityAnswer {
  rooms: string[];
  devices: string[];
}

export interface BoothAnswer {
  count: number | null;
  start: string;
  end: string;
  lunch: string;
  area: string;
  size: string;
  support: string[];
  needs: string[];
}

export interface ScheduleAnswer {
  when: 'fixed' | 'rough' | 'unknown';
  dates: string[];
  timeOfDay: string;
  timeCustom: string;
  rough: string;
  roughCustom: string;
  periods: string;
  periodMinutes: string;
  sessions: string;
  sessionPeriods: string;
  weekdays: string[];
  eventDays: string;
}

export interface BudgetAnswer {
  mode: 'total' | 'perHead' | 'quote';
  /** total: 만 원, perHead: 원 */
  amount: number | null;
  vat: string;
  source: string;
}

export interface RequestAnswer {
  docs: string[];
  purchase: string;
  /** 자유 입력. 임시 저장하지 않는다. */
  text: string;
}

export interface Answers {
  eduType?: EduKey;
  orgType?: OrgTypeAnswer;
  schoolSlot?: string | null;
  audience?: AudienceAnswer | null;
  headcount?: HeadcountAnswer | null;
  field?: FieldKey[] | null;
  programs?: ProgramsAnswer | null;
  place?: PlaceAnswer | null;
  region?: RegionAnswer | null;
  facility?: FacilityAnswer | null;
  booth?: BoothAnswer | null;
  schedule?: ScheduleAnswer | null;
  budget?: BudgetAnswer | null;
  request?: RequestAnswer | null;
}

/** S15. 임시 저장하지 않는다. */
export interface ContactForm {
  orgName: string;
  name: string;
  mobile: string;
  email: string;
  phone: string;
  replyPreference: string;
  callTime: string;
  consent: boolean;
  hp: string;
}

export type WizardMode = 'preview' | 'live';

/** 접수 엔드포인트 요청 계약 v1 */
export interface InquiryPayload {
  schema: 1;
  submissionId: string;
  test: boolean;
  source: { page: string; program: string | null };
  org: { name: string; type: string };
  contact: { name: string; mobile: string; email: string; phone: string; replyPreference: string };
  inquiry: {
    eduType: string | null;
    interestPrograms: string[];
    schedule: string;
    audience: string;
    budget: string;
    mode: string;
    venue: string;
    extra: string;
    answers: { q: string; a: string }[];
  };
  consent: { privacy: boolean; version: string };
  hp: string;
}
