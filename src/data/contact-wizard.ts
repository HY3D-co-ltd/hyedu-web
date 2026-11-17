/**
 * 교육 신청 위저드의 질문 · 보기 · 화면 문구.
 * 사양: docs/superpowers/specs/2026-11-17-contact-wizard-questions.md
 *
 * 보기의 `value`는 접수 엔드포인트로 보내는 한국어 기준값이다. 화면 언어와 상관없이
 * 이 값을 보낸다(운영자가 한국어로 읽는다). `en`은 영어 화면에 보여 줄 말이다.
 */
import type { EduKey, FieldKey, Loc, PlaceKey, StepId, Target } from '@/lib/contact-wizard/types';
import { policyInEffect, seoulDate } from '@/data/privacy-policy';

export interface Opt {
  value: string;
  en: string;
  desc?: Loc;
}

const o = (value: string, en: string, desc?: Loc): Opt => ({ value, en, desc });

// ─── 연락처 · 외부 링크 ───────────────────────────────────────────

export const PHONE = '070-8064-0829';
export const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_fxbVcs';
export const KAKAO_CHAT_URL = 'https://pf.kakao.com/_fxbVcs/chat';
export const NAVER_BOOKING_URL = 'https://booking.naver.com/booking/12/bizes/252156';

/**
 * 동의한 처리방침 버전 = 제출하는 날(서울 기준) 시행 중인 처리방침의 시행일 (src/data/privacy-policy.ts).
 * 빌드한 날이 아니라 제출하는 순간에 고르도록 함수로 둔다.
 */
export function privacyVersionNow(): string {
  return policyInEffect(seoulDate()).effectiveDate;
}

// ─── 질문 머리 ───────────────────────────────────────────────────

export interface StepCopy {
  /** 질문 */
  title: Loc;
  /** 왜 여쭤보나요 */
  why: Loc;
  /** 요약 패널에 쓰는 짧은 이름 */
  short: Loc;
  /** 시험 의견 칸 이름 (S 번호) */
  code: string;
}

export const STEP_COPY: Record<StepId, StepCopy> = {
  eduType: {
    code: 'S1',
    title: { ko: '어떤 교육을 찾으세요?', en: 'What kind of program are you looking for?' },
    why: { ko: '교육 형태에 따라 견적 기준과 다음 질문이 달라져요.', en: 'The quote and the next questions depend on the type of program.' },
    short: { ko: '교육 형태', en: 'Program type' },
  },
  orgType: {
    code: 'S2',
    title: { ko: '어디에서 문의하시나요?', en: 'Where are you contacting us from?' },
    why: { ko: '학교인지 기관인지에 따라 학년 보기와 수업 시간이 달라져요.', en: 'Grade options and class times differ for schools and other organizations.' },
    short: { ko: '기관', en: 'Organization' },
  },
  schoolSlot: {
    code: 'S3',
    title: { ko: '어느 시간에 하는 수업인가요?', en: 'Which school time slot is this for?' },
    why: { ko: '정규 수업인지 방과후인지에 따라 교시 길이와 진행 방식이 달라져요.', en: 'Class length and format differ between regular classes and after-school programs.' },
    short: { ko: '수업 시간', en: 'Time slot' },
  },
  audience: {
    code: 'S4',
    title: { ko: '누가 참여하나요?', en: 'Who will take part?' },
    why: { ko: '학년에 맞는 프로그램만 골라서 보여 드릴게요.', en: "We'll show only the programs that fit these grades." },
    short: { ko: '대상', en: 'Participants' },
  },
  headcount: {
    code: 'S5',
    title: { ko: '몇 명 정도인가요?', en: 'How many participants?' },
    why: { ko: '강사 수와 재료 준비량이 인원으로 정해져요.', en: 'The number of instructors and materials depends on headcount.' },
    short: { ko: '인원', en: 'Headcount' },
  },
  field: {
    code: 'S6',
    title: { ko: '관심 있는 분야는요?', en: 'Which fields interest you?' },
    why: { ko: '고르신 분야의 프로그램을 먼저 보여 드릴게요.', en: "We'll show programs in these fields first." },
    short: { ko: '분야', en: 'Field' },
  },
  programs: {
    code: 'S7',
    title: { ko: '관심 있는 프로그램을 골라 주세요', en: "Pick the programs you're interested in" },
    why: { ko: '고르신 프로그램으로 견적과 교육계획안을 바로 준비할게요.', en: "We'll prepare a quote and lesson plan for the programs you pick." },
    short: { ko: '프로그램', en: 'Programs' },
  },
  place: {
    code: 'S8',
    title: { ko: '어디서 진행하나요?', en: 'Where will it take place?' },
    why: { ko: '장소에 따라 출장비와 준비물이 달라져요.', en: 'Travel costs and materials depend on the location.' },
    short: { ko: '장소', en: 'Location' },
  },
  region: {
    code: 'S9',
    title: { ko: '교육 장소는 어디인가요?', en: 'Where is the venue?' },
    why: { ko: '강사 배정과 출장비 계산에 필요해요.', en: 'We need this to assign instructors and estimate travel costs.' },
    short: { ko: '지역', en: 'Region' },
  },
  facility: {
    code: 'S10',
    title: { ko: '교육 공간과 기기를 알려 주세요', en: 'Tell us about the room and devices' },
    why: { ko: '수업에 따라 1인 1기기가 필요해요. 부족하면 저희가 준비해 가요.', en: 'Some classes need one device per student. We can bring them if needed.' },
    short: { ko: '공간 · 기기', en: 'Room & devices' },
  },
  booth: {
    code: 'S11',
    title: { ko: '부스 운영 조건을 알려 주세요', en: 'Tell us about the booth conditions' },
    why: { ko: '행사 부스는 현장 조건에 따라 준비가 크게 달라져서 미리 여쭤요. 아는 것만 채워 주세요.', en: 'Booth preparation depends heavily on the site. Fill in only what you know.' },
    short: { ko: '부스 조건', en: 'Booth' },
  },
  schedule: {
    code: 'S12',
    title: { ko: '언제 하실 계획인가요?', en: 'When are you planning it?' },
    why: { ko: '강사 일정은 보통 한 달 전에 정해져요. 날짜가 가까우면 먼저 연락드릴게요.', en: "Instructor schedules are usually set a month ahead. If it's soon, we'll call you first." },
    short: { ko: '일정', en: 'Schedule' },
  },
  budget: {
    code: 'S13',
    title: { ko: '예산은 어느 정도인가요?', en: "What's your budget?" },
    why: { ko: '예산에 맞춰 프로그램과 인원 구성을 제안해 드릴게요.', en: "We'll suggest programs and group sizes that fit your budget." },
    short: { ko: '예산', en: 'Budget' },
  },
  request: {
    code: 'S14',
    title: { ko: '필요한 자료와 더 하실 말씀', en: 'Documents you need, anything else' },
    why: { ko: '필요한 서류를 미리 알려 주시면 첫 회신에 같이 보내 드릴게요.', en: "Tell us which documents you need and we'll send them with our first reply." },
    short: { ko: '요청 사항', en: 'Requests' },
  },
  contact: {
    code: 'S15',
    title: { ko: '회신받으실 연락처', en: 'How should we reach you?' },
    why: { ko: '접수 내용을 확인한 담당자가 평일 9~18시에 연락드려요.', en: 'Our staff will contact you on weekdays between 9:00 and 18:00 (KST).' },
    short: { ko: '연락처', en: 'Contact' },
  },
};

// ─── 진행 단계 ───────────────────────────────────────────────────

export const PHASES: { label: Loc; steps: StepId[] }[] = [
  { label: { ko: '교육 정보', en: 'Program' }, steps: ['eduType', 'orgType', 'schoolSlot'] },
  {
    label: { ko: '대상 · 장소 · 일정', en: 'Details' },
    steps: ['audience', 'headcount', 'field', 'programs', 'place', 'region', 'facility', 'booth', 'schedule'],
  },
  { label: { ko: '예산 · 요청', en: 'Budget' }, steps: ['budget', 'request'] },
  { label: { ko: '연락처', en: 'Contact' }, steps: ['contact'] },
];

// ─── S1 교육 형태 ─────────────────────────────────────────────────

export type EduIcon = 'class' | 'club' | 'lecture' | 'booth' | 'camp' | 'online' | 'family' | 'question';

export interface EduOption {
  key: EduKey;
  label: Loc;
  desc: Loc;
  icon: EduIcon;
}

export const EDU_OPTIONS: EduOption[] = [
  {
    key: 'class',
    icon: 'class',
    label: { ko: '찾아가는 체험교실', en: 'On-site class' },
    desc: { ko: '강사가 찾아가는 1회 체험 수업 (2~4교시)', en: 'A one-time class at your school (2–4 periods)' },
  },
  {
    key: 'club',
    icon: 'club',
    label: { ko: '동아리 · 여러 회차 수업', en: 'Club / multi-session course' },
    desc: { ko: '같은 학생들과 2회 이상 이어서 하는 수업', en: 'Two or more sessions with the same students' },
  },
  {
    key: 'lecture',
    icon: 'lecture',
    label: { ko: '전문인 특강', en: 'Expert lecture' },
    desc: { ko: '강연 · 진로 특강', en: 'Talks and career lectures' },
  },
  {
    key: 'booth',
    icon: 'booth',
    label: { ko: '체험 부스', en: 'Hands-on booth' },
    desc: { ko: '축제 · 박람회 · 학교 행사 부스 운영', en: 'Booths for festivals, fairs and school events' },
  },
  {
    key: 'camp',
    icon: 'camp',
    label: { ko: '단체 캠프', en: 'Group camp' },
    desc: { ko: '하루 ~ 2박 3일 캠프', en: 'One day to three days' },
  },
  {
    key: 'online',
    icon: 'online',
    label: { ko: '온라인 교육', en: 'Online course' },
    desc: { ko: '실시간 화상 · 녹화 영상 수업', en: 'Live video or recorded classes' },
  },
  {
    key: 'individual',
    icon: 'family',
    label: { ko: '자녀(개인) 참가 신청', en: 'Individual (my child)' },
    desc: { ko: '토요캠프 · 경진대회 대비반 · 방학 캠프', en: 'Saturday camp, competition prep, vacation camp' },
  },
  {
    key: 'unknown',
    icon: 'question',
    label: { ko: '아직 모르겠어요', en: 'Not sure yet' },
    desc: { ko: '상담하면서 정할게요', en: "Let's decide together" },
  },
];

/** 보내는 교육 유형(OM 8값). 캠프는 S8에서 온라인 실시간이면 온라인캠프. */
export function eduTypeValue(key: EduKey | undefined, place: PlaceKey | undefined): string | null {
  switch (key) {
    case 'class':
      return '찾아가는 체험교실';
    case 'club':
      return '동아리';
    case 'lecture':
      return '특강';
    case 'booth':
      return '체험부스';
    case 'camp':
      return place === 'live' ? '온라인캠프' : '오프라인캠프';
    case 'online':
      return '온라인체험';
    default:
      return null;
  }
}

// ─── S2 기관 ─────────────────────────────────────────────────────

export const ORG_OTHER = '기타';

export const ORG_TYPES: Opt[] = [
  o('초등학교', 'Elementary school'),
  o('중학교', 'Middle school'),
  o('고등학교', 'High school'),
  o('특수학교', 'Special education school'),
  o('대학교', 'University'),
  o('교육청 · 공공기관 · 지자체', 'Education office / public agency'),
  o('청소년수련관 · 도서관 · 복지관', 'Youth center / library / welfare center'),
  o('학원 · 교육업체', 'Academy / education company'),
  o('기업 · 행사 대행사', 'Company / event agency'),
  o(ORG_OTHER, 'Other'),
];

export const SCHOOL_ORGS = ['초등학교', '중학교', '고등학교', '특수학교'];

// ─── S3 수업 시간 ─────────────────────────────────────────────────

export const TEACHER_TRAINING = '교사 연수';

export const SCHOOL_SLOTS: Opt[] = [
  o('정규 수업(교과 · 창체)', 'Regular class'),
  o('자유학기 · 진로 활동', 'Free semester / career activity'),
  o('방과후 · 늘봄', 'After-school'),
  o('동아리 시간', 'Club period'),
  o(TEACHER_TRAINING, 'Teacher training'),
  o('학교 행사 · 축제', 'School event / festival'),
];

// ─── S4 대상 ─────────────────────────────────────────────────────

export interface GradeOpt extends Opt {
  target: Target | null;
}

const g = (value: string, en: string, target: Target | null): GradeOpt => ({ value, en, target });

export const TEACHER = '교사';

export function gradeOptions(orgType: string | undefined): GradeOpt[] {
  const teacher = g(TEACHER, 'Teachers', 'adult');
  switch (orgType) {
    case '초등학교':
      return [1, 2, 3, 4, 5, 6].map((n) => g(`${n}학년`, `Grade ${n}`, 'elementary')).concat(teacher);
    case '중학교':
      return [1, 2, 3].map((n) => g(`${n}학년`, `Grade ${n + 6}`, 'middle')).concat(teacher);
    case '고등학교':
      return [1, 2, 3].map((n) => g(`${n}학년`, `Grade ${n + 9}`, 'high')).concat(teacher);
    case '특수학교':
      return [
        g('초등부', 'Elementary division', 'elementary'),
        g('중등부', 'Middle division', 'middle'),
        g('고등부', 'High division', 'high'),
        g('전공과', 'Vocational division', 'adult'),
        teacher,
      ];
    default:
      return [
        g('유아', 'Preschool', null),
        g('초등 저학년(1~3)', 'Elementary grades 1–3', 'elementary'),
        g('초등 고학년(4~6)', 'Elementary grades 4–6', 'elementary'),
        g('중학생', 'Middle school', 'middle'),
        g('고등학생', 'High school', 'high'),
        g('대학생 · 성인', 'University / adults', 'adult'),
        teacher,
        g('가족(보호자 동반)', 'Families', null),
      ];
  }
}

export const SUPPORT_OPTIONS: Opt[] = [
  o('보조 인력 등 진행 지원 상의 필요', 'We need to discuss extra support staff'),
  o('통역 · 쉬운 한국어 진행 필요', 'We need interpretation or simple Korean'),
];

// ─── S6 분야 ─────────────────────────────────────────────────────

export const FIELD_OPTIONS: { key: FieldKey; value: string; en: string }[] = [
  { key: 'ai', value: 'AI 인공지능', en: 'AI' },
  { key: 'coding', value: '코딩 · 로봇', en: 'Coding & robots' },
  { key: 'maker', value: '메이커(3D · 드론 · VR)', en: 'Maker (3D, drones, VR)' },
  { key: 'steam', value: 'STEAM · 과학', en: 'STEAM & science' },
  { key: 'recommend', value: '추천해 주세요', en: 'Recommend for me' },
];

// ─── S8 장소 ─────────────────────────────────────────────────────

export const PLACE_OPTIONS: { key: PlaceKey; value: string; en: string; for: EduKey[] }[] = [
  { key: 'visit', value: '우리 기관 방문', en: 'Come to our site', for: ['class', 'club', 'lecture', 'booth', 'camp', 'unknown'] },
  { key: 'erica', value: '한양대 ERICA 방문', en: 'We visit Hanyang Univ. ERICA', for: ['class', 'club', 'lecture', 'camp', 'unknown'] },
  { key: 'other', value: '다른 장소(연수원 · 행사장 · 야외)', en: 'Another venue (retreat, event hall, outdoors)', for: ['lecture', 'booth', 'camp', 'unknown'] },
  { key: 'live', value: '온라인 실시간', en: 'Live online', for: ['club', 'lecture', 'camp', 'online', 'unknown'] },
  { key: 'video', value: '녹화 영상', en: 'Recorded video', for: ['online'] },
];

/** 화면에 보여 주는 S8 보기 문구 (보내는 값과 별개) */
export const PLACE_LABEL: Record<PlaceKey, Loc> = {
  visit: { ko: '우리 기관(학교)으로 와 주세요', en: 'Please come to us' },
  erica: { ko: '한양대 ERICA 캠퍼스로 갈게요', en: "We'll visit Hanyang Univ. ERICA campus" },
  other: { ko: '다른 장소(연수원 · 행사장 · 야외)', en: 'Another venue (retreat, event hall, outdoors)' },
  live: { ko: '온라인 실시간', en: 'Live online' },
  video: { ko: '녹화 영상', en: 'Recorded video' },
};

export const CAMP_LENGTHS: Opt[] = [o('당일', 'One day'), o('1박 2일', '2 days 1 night'), o('2박 3일', '3 days 2 nights'), o('기간 미정', 'Not decided')];

// ─── S9 지역 ─────────────────────────────────────────────────────

export const SIDO: Opt[] = [
  o('서울', 'Seoul'),
  o('부산', 'Busan'),
  o('대구', 'Daegu'),
  o('인천', 'Incheon'),
  o('광주', 'Gwangju'),
  o('대전', 'Daejeon'),
  o('울산', 'Ulsan'),
  o('세종', 'Sejong'),
  o('경기', 'Gyeonggi'),
  o('강원', 'Gangwon'),
  o('충북', 'Chungbuk'),
  o('충남', 'Chungnam'),
  o('전북', 'Jeonbuk'),
  o('전남', 'Jeonnam'),
  o('경북', 'Gyeongbuk'),
  o('경남', 'Gyeongnam'),
  o('제주', 'Jeju'),
];

// ─── S10 공간 · 기기 ──────────────────────────────────────────────

export const ROOMS: Opt[] = [o('일반 교실', 'Classroom'), o('컴퓨터실', 'Computer lab'), o('강당 · 체육관', 'Auditorium / gym'), o('야외', 'Outdoors')];

export const DEVICES: Opt[] = [
  o('빔프로젝터 · 스크린', 'Projector & screen'),
  o('학생 1인 1대 PC · 노트북', 'One PC/laptop per student'),
  o('크롬북', 'Chromebooks'),
  o('태블릿', 'Tablets'),
  o('와이파이', 'Wi-Fi'),
  o('기기 없음(대여 필요)', 'No devices (need rental)'),
];

// ─── S11 부스 ────────────────────────────────────────────────────

export const BOOTH_AREAS: Opt[] = [o('실내(교실 · 강당 · 체육관)', 'Indoors'), o('실외(운동장 · 공원)', 'Outdoors')];

export const BOOTH_LUNCH: Opt[] = [o('점심시간 포함', 'Includes lunch break'), o('점심시간 없음', 'No lunch break')];

export const BOOTH_SUPPORT: Opt[] = [
  o('책걸상 · 테이블', 'Desks & tables'),
  o('전기 콘센트', 'Power outlets'),
  o('멀티탭', 'Power strips'),
  o('와이파이', 'Wi-Fi'),
  o('노트북 · 태블릿', 'Laptops / tablets'),
  o('운영 보조 인력', 'Support staff'),
  o('강사 식사', 'Meals for instructors'),
  o('생수', 'Bottled water'),
  o('숙소(지방 · 이른 시작)', 'Lodging (remote / early start)'),
];

export const BOOTH_NEEDS: Opt[] = [o('현수막 · X배너 제작', 'Banners'), o('보조 강사 추가', 'Extra assistant instructors')];

// ─── S12 일정 ────────────────────────────────────────────────────

export const TIME_OF_DAY: Opt[] = [o('오전', 'Morning'), o('오후', 'Afternoon'), o('방과후(16시 이후)', 'After school (16:00~)'), o('종일', 'All day')];

export const ROUGH_PERIODS: Opt[] = [
  o('이번 달', 'This month'),
  o('다음 달', 'Next month'),
  o('이번 학기', 'This semester'),
  o('다음 학기', 'Next semester'),
  o('방학 중', 'During vacation'),
];

export const PERIOD_COUNTS: Opt[] = [o('1교시', '1 period'), o('2교시', '2 periods'), o('3교시', '3 periods'), o('4교시 이상', '4+ periods')];

export const PERIOD_MINUTES: Opt[] = [o('40분', '40 min'), o('45분', '45 min'), o('50분', '50 min')];

export const SESSION_COUNTS: Opt[] = [o('2~3회', '2–3 sessions'), o('4~6회', '4–6 sessions'), o('7~12회', '7–12 sessions'), o('13회 이상', '13+ sessions')];

export const WEEKDAYS: Opt[] = [o('월', 'Mon'), o('화', 'Tue'), o('수', 'Wed'), o('목', 'Thu'), o('금', 'Fri'), o('토', 'Sat')];

export const EVENT_DAYS: Opt[] = [o('1일', '1 day'), o('2일 이상', '2+ days')];

// ─── S13 예산 ────────────────────────────────────────────────────

export const VAT_OPTIONS: Opt[] = [o('부가세 포함', 'VAT included'), o('부가세 별도', 'VAT excluded'), o('부가세 모름', 'Not sure about VAT')];

export const BUDGET_SOURCES: Opt[] = [
  o('학교 · 기관 운영비', 'School / organization budget'),
  o('교육청 · 지자체 지원 사업', 'Education office / local government grant'),
  o('선도학교 · 중점학교 사업비', 'Leading/focus school program funds'),
  o('수익자(학부모) 부담', 'Paid by parents'),
  o('기업 예산', 'Company budget'),
];

// ─── S14 요청 ────────────────────────────────────────────────────

export const DOCS: Opt[] = [
  o('견적서', 'Quote'),
  o('교육계획안(시행계획서)', 'Lesson plan'),
  o('제안서', 'Proposal'),
  o('커리큘럼 · 수업 예시 자료', 'Curriculum / sample materials'),
  o('사업자등록증 · 통장 사본', 'Business registration / bank details'),
];

export const PURCHASE: Opt[] = [
  o('학교장터(S2B)', 'School marketplace (S2B)'),
  o('나라장터', 'KONEPS'),
  o('세금계산서 발행 후 계좌이체', 'Tax invoice & bank transfer'),
  o('카드 결제', 'Card payment'),
];

// ─── S15 연락처 ──────────────────────────────────────────────────

export const REPLY_EMAIL = '이메일';
export const REPLY_KAKAO = '카카오톡';

export const REPLY_OPTIONS: Opt[] = [o('전화', 'Phone call'), o('문자', 'Text message'), o(REPLY_EMAIL, 'Email'), o(REPLY_KAKAO, 'KakaoTalk')];

export const CALL_TIMES: Opt[] = [o('오전', 'Morning'), o('점심', 'Lunchtime'), o('오후', 'Afternoon'), o('16시 이후', 'After 16:00'), o('언제든', 'Any time')];

/** 미리보기의 [시험용 연락처 채우기] 값 */
export const TEST_CONTACT = { orgName: '시험 기관', name: '시험', mobile: '010-0000-0000' };

// ─── 길이 제한 (수신 측 검증과 같게) ─────────────────────────────

export const LIMITS = {
  orgName: 80,
  name: 40,
  email: 120,
  phone: 20,
  orgOther: 40,
  programOther: 100,
  shortText: 60,
  freeText: 600,
  extra: 1000,
  feedbackPerStep: 300,
  feedbackOverall: 1000,
  feedbackTotal: 5000,
};

// ─── 공통 화면 문구 ───────────────────────────────────────────────

export const UI = {
  pageTitle: { ko: '교육 신청', en: 'Apply for a program' },
  next: { ko: '다음', en: 'Next' },
  prev: { ko: '이전', en: 'Back' },
  unknown: { ko: '아직 모르겠어요', en: 'Not sure yet' },
  skip: { ko: '건너뛰기', en: 'Skip' },
  notDecided: { ko: '아직 미정(모집 예정)', en: 'Not decided yet' },
  whyPrefix: { ko: '왜 여쭤보나요?', en: 'Why we ask' },
  summaryTitle: { ko: '적어 주신 내용', en: 'Your answers' },
  summaryEmpty: { ko: '답하신 내용이 여기에 쌓여요. 누르면 그 질문으로 돌아가요.', en: 'Your answers will appear here. Tap one to go back to it.' },
  summaryFill: { ko: '채운 질문', en: 'Answered' },
  restart: { ko: '처음부터 다시', en: 'Start over' },
  restartConfirm: { ko: '처음으로 돌아갈까요? 지금까지 고르신 것이 모두 지워집니다.', en: 'Start over? Everything you have chosen will be cleared.' },
  resumeTitle: { ko: '작성하던 내용이 있어요. 이어서 하시겠어요?', en: 'You have an unfinished application. Continue?' },
  resumeYes: { ko: '이어서 하기', en: 'Continue' },
  resumeNo: { ko: '새로 시작', en: 'Start new' },
  close: { ko: '닫기', en: 'Close' },
  copy: { ko: '내용 복사', en: 'Copy answers' },
  copied: { ko: '복사했어요', en: 'Copied' },
  submit: { ko: '접수하기', en: 'Submit' },
  submitting: { ko: '보내는 중…', en: 'Sending…' },
  noPrivateInfo: { ko: '학생 개인에 대한 정보(이름, 건강 정보 등)는 적지 말아 주세요.', en: 'Please do not enter personal information about students (names, health, etc.).' },
  required: { ko: '필수', en: 'Required' },
  optional: { ko: '선택', en: 'Optional' },
};

export const PREVIEW = {
  banner: {
    ko: '시험용 화면입니다. 실제 문의로 접수되지 않으며, 입력한 내용은 시험 기록으로 저장됩니다. 실제 개인정보 대신 시험용 값을 써 주세요.',
    en: 'Test page. Nothing here becomes a real inquiry, but what you enter is saved as a test record. Please use test values instead of real personal data.',
  },
  feedbackToggle: { ko: '이 질문에 의견 남기기', en: 'Leave feedback on this question' },
  feedbackPlaceholder: { ko: '예) 보기에 ○○가 없어요 / 질문이 헷갈려요', en: 'e.g. an option is missing / the question is confusing' },
  feedbackOverall: { ko: '전체 의견', en: 'Overall feedback' },
  feedbackOverallPlaceholder: { ko: '전체적으로 느낀 점, 빠진 질문, 순서 등', en: 'Overall impressions, missing questions, order, etc.' },
  copyFeedback: { ko: '의견 복사', en: 'Copy feedback' },
  feedbackTooLong: { ko: '의견이 너무 길어요. 5000자 안으로 줄여 주세요.', en: 'Feedback is too long. Please keep it under 5000 characters.' },
  fillTestContact: { ko: '시험용 연락처 채우기', en: 'Fill test contact' },
  noEndpointTitle: { ko: '시험 모드: 접수는 보내지 않았어요', en: 'Test mode: nothing was sent' },
  noEndpointBody: {
    ko: '아직 접수 중계가 연결되지 않아 보내지 않았어요. 아래가 보낼 내용이에요. 의견은 [의견 복사]로 카톡에 붙여 보내 주세요.',
    en: 'The intake relay is not connected yet, so nothing was sent. Below is what would be sent. Please copy your feedback and send it to us.',
  },
};
