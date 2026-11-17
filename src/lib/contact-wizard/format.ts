/**
 * 답을 글로 바꾼다: 요약 패널(화면 언어), 접수 계약 v1(항상 한국어), 복사용 글.
 * 사양 §4 「계약 v1로 조립하는 규칙」.
 */
import {
  BOOTH_AREAS,
  BOOTH_LUNCH,
  BOOTH_NEEDS,
  BOOTH_SUPPORT,
  BUDGET_SOURCES,
  CALL_TIMES,
  CAMP_LENGTHS,
  DEVICES,
  DOCS,
  EDU_OPTIONS,
  EVENT_DAYS,
  FIELD_OPTIONS,
  LIMITS,
  ORG_OTHER,
  ORG_TYPES,
  PERIOD_COUNTS,
  PERIOD_MINUTES,
  PLACE_LABEL,
  PLACE_OPTIONS,
  PRIVACY_VERSION,
  PURCHASE,
  REPLY_OPTIONS,
  ROOMS,
  ROUGH_PERIODS,
  SCHOOL_SLOTS,
  SESSION_COUNTS,
  SIDO,
  STEP_COPY,
  SUPPORT_OPTIONS,
  TIME_OF_DAY,
  VAT_OPTIONS,
  WEEKDAYS,
  eduTypeValue,
  gradeOptions,
  type Opt,
} from '@/data/contact-wizard';
import { findItem } from './catalog';
import { visibleSteps } from './flow';
import type { Answers, ContactForm, InquiryPayload, Lang, StepId } from './types';

const SEP = ' · ';

const UNDECIDED: Record<Lang, string> = { ko: '미정', en: 'Not decided' };

function lab(opts: Opt[], value: string, lang: Lang): string {
  if (lang === 'ko') return value;
  return opts.find((o) => o.value === value)?.en ?? value;
}

function labs(opts: Opt[], values: string[], lang: Lang): string {
  return values.map((v) => lab(opts, v, lang)).join(', ');
}

function join(parts: (string | false | null | undefined)[]): string {
  return parts.filter((p): p is string => !!p && p.trim() !== '').join(SEP);
}

function money(n: number): string {
  return n.toLocaleString('ko-KR');
}

const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKDAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** 'YYYY-MM-DD' → '2026-12-15(화)' */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const day = new Date(y, m - 1, d).getDay();
  return `${iso}(${lang === 'ko' ? WEEKDAY_KO[day] : WEEKDAY_EN[day]})`;
}

/** 가장 빠른 날짜가 30일 안인지 */
export function isSoon(a: Answers, today = new Date()): boolean {
  const dates = a.schedule?.when === 'fixed' ? a.schedule.dates.filter(Boolean) : [];
  if (!dates.length) return false;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return dates.some((iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    const t = new Date(y, m - 1, d).getTime();
    return t - start < 30 * 24 * 3600 * 1000;
  });
}

// ─── 질문별 글 ──────────────────────────────────────────────────

function orgTypeText(a: Answers, lang: Lang): string {
  const v = a.orgType;
  if (!v) return '';
  if (v.value === ORG_OTHER) return v.other.trim() || lab(ORG_TYPES, ORG_OTHER, lang);
  return lab(ORG_TYPES, v.value, lang);
}

function audienceText(a: Answers, lang: Lang): string {
  const v = a.audience;
  if (!v) return '';
  const grades = labs(gradeOptions(a.orgType?.value), v.grades, lang);
  return join([grades, labs(SUPPORT_OPTIONS, v.support, lang)]);
}

function headcountText(a: Answers, lang: Lang): string {
  const v = a.headcount;
  if (!v || v.count == null) return '';
  const classes = v.classes ? (lang === 'ko' ? `(${v.classes}개 반)` : ` (${v.classes} classes)`) : '';
  return lang === 'ko' ? `약 ${v.count}명${classes}` : `about ${v.count} people${classes}`;
}

function fieldText(a: Answers, lang: Lang): string {
  return (a.field ?? []).map((k) => FIELD_OPTIONS.find((f) => f.key === k)).map((f) => (f ? (lang === 'ko' ? f.value : f.en) : '')).filter(Boolean).join(', ');
}

function programTitles(a: Answers, lang: Lang): string[] {
  return (a.programs?.picked ?? []).map((id) => findItem(id)?.title[lang]).filter((t): t is string => !!t);
}

function recommendText(a: Answers, lang: Lang): string {
  const f = (a.field ?? []).filter((k) => k !== 'recommend');
  const names = f.map((k) => FIELD_OPTIONS.find((x) => x.key === k)).map((x) => (x ? (lang === 'ko' ? x.value : x.en) : '')).filter(Boolean);
  if (lang === 'ko') return names.length ? `추천 요청(분야: ${names.join(', ')})` : '추천 요청';
  return names.length ? `Please recommend (fields: ${names.join(', ')})` : 'Please recommend';
}

function programsText(a: Answers, lang: Lang): string {
  const v = a.programs;
  if (!v) return '';
  return [...programTitles(a, lang), v.other.trim(), v.recommend ? recommendText(a, lang) : ''].filter(Boolean).join(', ');
}

function placeText(a: Answers, lang: Lang): string {
  const v = a.place;
  if (!v) return '';
  return join([PLACE_LABEL[v.value][lang], v.campLength ? lab(CAMP_LENGTHS, v.campLength, lang) : '']);
}

/** 계약 `inquiry.mode`에 넣는 장소 값 (캠프 기간은 일정 쪽으로 간다) */
function placeValue(a: Answers): string {
  const v = a.place;
  if (!v) return '';
  return PLACE_OPTIONS.find((p) => p.key === v.value)?.value ?? '';
}

function regionText(a: Answers, lang: Lang): string {
  const v = a.region;
  if (!v) return '';
  const area = [v.sido ? lab(SIDO, v.sido, lang) : '', v.sigungu.trim()].filter(Boolean).join(' ');
  return join([area, v.place.trim()]);
}

function facilityText(a: Answers, lang: Lang): string {
  const v = a.facility;
  if (!v) return '';
  return join([labs(ROOMS, v.rooms, lang), labs(DEVICES, v.devices, lang)]);
}

function boothVenueText(a: Answers, lang: Lang): string {
  const v = a.booth;
  if (!v) return '';
  const ko = lang === 'ko';
  return join([
    v.count != null ? (ko ? `부스 ${v.count}개` : `${v.count} booths`) : '',
    v.area ? lab(BOOTH_AREAS, v.area, lang) : '',
    v.size.trim() ? (ko ? `크기 ${v.size.trim()}` : `size ${v.size.trim()}`) : '',
    v.support.length ? `${ko ? '지원 가능' : 'Available on site'}: ${labs(BOOTH_SUPPORT, v.support, lang)}` : '',
  ]);
}

function boothTimeText(a: Answers, lang: Lang): string {
  const v = a.booth;
  if (!v) return '';
  const time = v.start || v.end ? `${lang === 'ko' ? '운영' : 'Hours'} ${v.start || '?'}~${v.end || '?'}` : '';
  return join([time, v.lunch ? lab(BOOTH_LUNCH, v.lunch, lang) : '']);
}

function boothNeedsText(a: Answers, lang: Lang): string {
  return labs(BOOTH_NEEDS, a.booth?.needs ?? [], lang);
}

function scheduleText(a: Answers, lang: Lang): string {
  const v = a.schedule;
  if (!v) return '';
  const ko = lang === 'ko';
  let when = '';
  if (v.when === 'fixed') {
    const dates = v.dates.filter(Boolean);
    when =
      dates.length > 1
        ? dates.map((d, i) => `${ko ? `${i + 1}순위` : `#${i + 1}`} ${formatDate(d, lang)}`).join(', ')
        : dates[0]
          ? formatDate(dates[0], lang)
          : '';
  } else if (v.when === 'rough') {
    when = v.roughCustom.trim() || (v.rough ? lab(ROUGH_PERIODS, v.rough, lang) : '');
  } else {
    when = ko ? '날짜 미정' : 'Date not decided';
  }
  const time = v.when === 'fixed' ? v.timeCustom.trim() || (v.timeOfDay ? lab(TIME_OF_DAY, v.timeOfDay, lang) : '') : '';
  const periods = v.periods ? `${lab(PERIOD_COUNTS, v.periods, lang)}${v.periodMinutes ? `(${lab(PERIOD_MINUTES, v.periodMinutes, lang)})` : ''}` : '';
  const sessions = join([
    v.sessions ? lab(SESSION_COUNTS, v.sessions, lang) : '',
    v.sessionPeriods ? `${ko ? '회기당' : 'per session'} ${lab(PERIOD_COUNTS, v.sessionPeriods, lang)}` : '',
    v.weekdays.length ? `${labs(WEEKDAYS, v.weekdays, lang)}${ko ? '요일' : ''}` : '',
  ]);
  return join([when, time, periods, sessions, v.eventDays ? lab(EVENT_DAYS, v.eventDays, lang) : '']);
}

function budgetText(a: Answers, lang: Lang): string {
  const v = a.budget;
  if (!v) return '';
  const ko = lang === 'ko';
  let main = '';
  if (v.mode === 'total') {
    main = v.amount != null ? (ko ? `총 ${money(v.amount)}만 원` : `Total ${money(v.amount * 10000)} KRW`) : ko ? '총액 있음' : 'Total budget set';
    if (v.vat) main += ko ? `(${v.vat})` : ` (${lab(VAT_OPTIONS, v.vat, lang)})`;
  } else if (v.mode === 'perHead') {
    main = v.amount != null ? (ko ? `1인당 ${money(v.amount)}원` : `${money(v.amount)} KRW per person`) : ko ? '1인당 기준 있음' : 'Per-person budget set';
  } else {
    main = ko ? '견적 먼저 요청' : 'Quote first';
  }
  return join([main, v.source ? lab(BUDGET_SOURCES, v.source, lang) : '']);
}

function requestText(a: Answers, lang: Lang): string {
  const v = a.request;
  if (!v) return '';
  const ko = lang === 'ko';
  return join([
    v.docs.length ? `${ko ? '필요 자료' : 'Documents'}: ${labs(DOCS, v.docs, lang)}` : '',
    v.purchase ? `${ko ? '구매 방법' : 'Purchase'}: ${lab(PURCHASE, v.purchase, lang)}` : '',
    v.text.trim(),
  ]);
}

/** 요약 패널 · 계약 answers에 쓰는 질문별 글. 답하지 않았으면 null, 모르겠어요면 「미정」. */
export function answerText(a: Answers, step: StepId, lang: Lang): string | null {
  if (step === 'contact') return null;
  const raw = a[step];
  if (raw === undefined) return null;
  if (raw === null) return UNDECIDED[lang];
  let text = '';
  switch (step) {
    case 'eduType':
      text = EDU_OPTIONS.find((e) => e.key === a.eduType)?.label[lang] ?? '';
      break;
    case 'orgType':
      text = orgTypeText(a, lang);
      break;
    case 'schoolSlot':
      text = lab(SCHOOL_SLOTS, a.schoolSlot ?? '', lang);
      break;
    case 'audience':
      text = audienceText(a, lang);
      break;
    case 'headcount':
      text = headcountText(a, lang);
      break;
    case 'field':
      text = fieldText(a, lang);
      break;
    case 'programs':
      text = programsText(a, lang);
      break;
    case 'place':
      text = placeText(a, lang);
      break;
    case 'region':
      text = regionText(a, lang);
      break;
    case 'facility':
      text = facilityText(a, lang);
      break;
    case 'booth':
      text = join([boothVenueText(a, lang), boothTimeText(a, lang), boothNeedsText(a, lang)]);
      break;
    case 'schedule':
      text = scheduleText(a, lang);
      break;
    case 'budget':
      text = budgetText(a, lang);
      break;
    case 'request':
      text = requestText(a, lang);
      break;
  }
  return text || UNDECIDED[lang];
}

// ─── 계약 v1 ────────────────────────────────────────────────────

/** 화면에 나온 질문인데 답이 없거나 모르겠어요면 「미정」, 화면에 안 나온 질문이면 빈칸 */
function orUndecided(shown: boolean, text: string): string {
  if (text) return text;
  return shown ? UNDECIDED.ko : '';
}

export function digitsOnly(s: string): string {
  return s.replace(/[^0-9]/g, '');
}

/** 01012345678 → 010-1234-5678 (입력 중에도 쓴다) */
export function formatMobile(input: string): string {
  const d = digitsOnly(input).slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export interface Feedback {
  steps: Partial<Record<StepId, string>>;
  overall: string;
}

export function feedbackLength(fb: Feedback): number {
  return Object.values(fb.steps).reduce((n, s) => n + (s?.trim().length ?? 0), 0) + fb.overall.trim().length;
}

export function buildPayload(input: {
  answers: Answers;
  contact: ContactForm;
  submissionId: string;
  test: boolean;
  page: string;
  programSlug: string | null;
  feedback?: Feedback;
  today?: Date;
}): InquiryPayload {
  const { answers: a, contact: c } = input;
  const steps = visibleSteps(a);
  const shown = (s: StepId) => steps.includes(s);

  // 관심 프로그램
  let interest: string[] = [];
  if (a.programs) {
    interest = [...programTitles(a, 'ko'), a.programs.other.trim(), a.programs.recommend ? recommendText(a, 'ko') : ''].filter(Boolean);
  }
  if (!interest.length && shown('programs')) {
    const hasField = (a.field ?? []).length > 0;
    interest = [hasField ? recommendText(a, 'ko') : UNDECIDED.ko];
  }

  const schedule = orUndecided(
    shown('schedule') || shown('booth'),
    join([scheduleText(a, 'ko'), boothTimeText(a, 'ko'), a.place?.campLength ? a.place.campLength : '']),
  );

  const audience = join([
    shown('audience') ? audienceText(a, 'ko') || '대상 미정' : '',
    shown('headcount') ? headcountText(a, 'ko') || '인원 미정' : '',
  ]);

  const budget = orUndecided(shown('budget'), budgetText(a, 'ko'));

  const mode = orUndecided(shown('place'), join([placeValue(a), a.schoolSlot ? a.schoolSlot : '']));

  const venue = orUndecided(shown('region') || shown('facility') || shown('booth'), join([regionText(a, 'ko'), facilityText(a, 'ko'), boothVenueText(a, 'ko')]));

  const extraLines: string[] = [];
  if (isSoon(a, input.today)) extraLines.push('[한 달 이내 일정]');
  if (a.request?.docs.length) extraLines.push(`필요 자료: ${a.request.docs.join(', ')}`);
  if (a.request?.purchase) extraLines.push(`구매 방법: ${a.request.purchase}`);
  if (a.booth?.needs.length) extraLines.push(`부스 요청: ${a.booth.needs.join(', ')}`);
  // 회신 방법은 contact.replyPreference로도 가지만 그 칸은 원본 테이블에만 남는다. 실무자가 보는 OM 상담내용과
  // 알림 메일에는 이 extra만 실리므로 여기에도 적는다 (완료 화면이 고객에게 그 방법으로 연락하겠다고 약속한다).
  if (c.replyPreference) extraLines.push(`회신 방법: ${c.replyPreference}`);
  if (c.callTime) extraLines.push(`통화 편한 시간: ${c.callTime}`);
  const free = a.request?.text.trim() ?? '';
  if (free) extraLines.push('', free);
  const extra = extraLines.join('\n').slice(0, LIMITS.extra);

  const qa = steps
    .filter((s) => s !== 'contact')
    .map((s) => ({ q: STEP_COPY[s].title.ko, a: answerText(a, s, 'ko') ?? UNDECIDED.ko }));
  if (input.feedback) {
    for (const s of steps) {
      const f = input.feedback.steps[s]?.trim();
      if (f) qa.push({ q: `[의견] ${STEP_COPY[s].code} ${STEP_COPY[s].short.ko}`, a: f });
    }
    const overall = input.feedback.overall.trim();
    if (overall) qa.push({ q: '[의견] 전체', a: overall });
  }

  return {
    schema: 1,
    submissionId: input.submissionId,
    test: input.test,
    source: { page: input.page, program: input.programSlug },
    org: { name: c.orgName.trim(), type: orgTypeText(a, 'ko') },
    contact: {
      name: c.name.trim(),
      mobile: formatMobile(c.mobile),
      email: c.email.trim(),
      phone: c.phone.trim(),
      replyPreference: c.replyPreference,
    },
    inquiry: {
      eduType: eduTypeValue(a.eduType, a.place?.value),
      interestPrograms: interest,
      schedule,
      audience,
      budget,
      mode,
      venue,
      extra,
      answers: qa,
    },
    consent: { privacy: c.consent, version: PRIVACY_VERSION },
    hp: c.hp,
  };
}

// ─── 복사용 글 ──────────────────────────────────────────────────

/** 「내용 복사」: 카톡에 그대로 붙일 수 있는 요약. 연락처도 넣는다(본인 클립보드). */
export function summaryForCopy(a: Answers, c: ContactForm | null, lang: Lang): string {
  const lines = visibleSteps(a)
    .filter((s) => s !== 'contact')
    .map((s) => {
      const t = answerText(a, s, lang);
      return t ? `${STEP_COPY[s].short[lang]}: ${t}` : null;
    })
    .filter((l): l is string => !!l);
  if (c) {
    const ko = lang === 'ko';
    const contact = [
      c.orgName.trim() && `${ko ? '기관명' : 'Organization'}: ${c.orgName.trim()}`,
      c.name.trim() && `${ko ? '담당자' : 'Name'}: ${c.name.trim()}`,
      c.mobile.trim() && `${ko ? '휴대폰' : 'Mobile'}: ${formatMobile(c.mobile)}`,
      c.email.trim() && `${ko ? '이메일' : 'Email'}: ${c.email.trim()}`,
      c.replyPreference && `${ko ? '회신 방법' : 'Reply via'}: ${lab(REPLY_OPTIONS, c.replyPreference, lang)}`,
      c.callTime && `${ko ? '통화 편한 시간' : 'Best time to call'}: ${lab(CALL_TIMES, c.callTime, lang)}`,
    ].filter(Boolean) as string[];
    if (contact.length) lines.push('', ...contact);
  }
  const head = lang === 'ko' ? '[홈페이지 교육 신청]' : '[Program application]';
  return [head, ...lines].join('\n');
}

/** 미리보기 [의견 복사] */
export function feedbackForCopy(a: Answers, fb: Feedback): string {
  const steps = visibleSteps(a);
  const lines = ['[교육 신청 시험 의견]'];
  for (const s of steps) {
    const f = fb.steps[s]?.trim();
    if (f) lines.push(`${STEP_COPY[s].code} ${STEP_COPY[s].short.ko} (답: ${answerText(a, s, 'ko') ?? '-'}): ${f}`);
  }
  if (fb.overall.trim()) lines.push(`전체: ${fb.overall.trim()}`);
  if (lines.length === 1) lines.push('(남긴 의견 없음)');
  lines.push('', summaryForCopy(a, null, 'ko'));
  return lines.join('\n');
}
