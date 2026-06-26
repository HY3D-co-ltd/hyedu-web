import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

/**
 * KAVI(한국벤처혁신학회) 교육사업 소개 랜딩페이지.
 *
 * 단독 원페이지로, 본 사이트(hyedu.kr)의 헤더/푸터/내비에서 분리되어
 * URL(`/ko/kavi`)로만 접근한다. 레이아웃 격리는 ConditionalChrome가 처리하고,
 * 검색 노출은 noindex로 차단한다. 사이트맵(staticPages)에도 포함하지 않는다.
 *
 * 콘텐츠 운영: 한양미래연구소 / 표면 홍보 주체: 한국벤처혁신학회(KAVI)
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '한국벤처혁신학회(KAVI) 청소년 AI 교육사업',
    description:
      '한국벤처혁신학회(KAVI)와 함께하는 청소년 AI 교육 — AI 체험교실 14종, 청소년 캠프, 전국 AI에이전트 코딩 경진대회. 초·중·고 대상 미래 인재 양성 프로그램.',
    robots: { index: false, follow: false },
    alternates: {},
  };
}

const BRAND = {
  blue: '#1B4DA1',
  red: '#E63027',
  green: '#1FA85B',
};

// ── AI 교육 콘텐츠 (찾아가는 AI 체험교실 신규 14종 / 3단계) ──────────────
type Course = { no: number; title: string; target: string; output: string };
const aiTiers: { level: string; sub: string; color: string; courses: Course[] }[] = [
  {
    level: 'AI 체험 · 기초',
    sub: '인공지능의 원리와 윤리를 직접 체험하며 이해',
    color: BRAND.blue,
    courses: [
      { no: 1, title: '내가 훈련시키는 인공지능 (원리편)', target: '초·중·고', output: '웹 제작물' },
      { no: 2, title: 'AI 윤리 전문가 (원리편)', target: '초·중·고', output: '웹 제작물' },
      { no: 3, title: 'AI 데이터 검증 전문가 (데이터 윤리)', target: '초·중·고', output: '웹 제작물' },
      { no: 4, title: '인공지능 기초체험 종합세트', target: '초·중·고', output: '웹 제작물' },
    ],
  },
  {
    level: 'AI 체험 · 활용',
    sub: '생성형 AI로 음악·영상·디자인 콘텐츠를 직접 제작',
    color: BRAND.green,
    courses: [
      { no: 5, title: '인공지능 음악 프로듀서', target: '초·중·고', output: '웹 제작물' },
      { no: 6, title: '인공지능 웹북 만들기', target: '초·중·고', output: '웹 제작물' },
      { no: 7, title: 'AI 그래픽 디자이너 & 워드클라우드', target: '초·중·고', output: '웹 제작물' },
      { no: 8, title: '인공지능 웹툰 만들기', target: '초·중·고', output: '웹 제작물' },
      { no: 9, title: '인공지능 유튜브 크리에이터', target: '초·중·고', output: '유튜브 영상' },
      { no: 10, title: '인공지능 숏츠 크리에이터', target: '초·중·고', output: '숏츠 영상' },
      { no: 11, title: 'Gemini로 인공지능 챗봇 만들기', target: '초·중·고', output: '챗봇' },
    ],
  },
  {
    level: 'AI 체험 · 심화',
    sub: '데이터 분석부터 앱·웹 개발까지 실전 프로젝트',
    color: BRAND.red,
    courses: [
      { no: 12, title: '인공지능 프리젠테이션 전문가', target: '초·중·고', output: '웹 제작물' },
      { no: 13, title: '인공지능 빅데이터 분석 / 예측', target: '고등·성인', output: '데이터' },
      { no: 14, title: '앱 / 웹 개발자 (Gemini & Antigravity)', target: '초·중·고', output: '웹 제작물' },
    ],
  },
];

// ── 캠프 유형 ────────────────────────────────────────────────────────────
const campTypes = [
  { type: '일일 캠프', price: '120,000원', detail: '1일 5시간 · 메이커 액티비티 2종' },
  { type: '1박 2일', price: '300,000원', detail: '특강 + 액티비티 + 팀 프로젝트' },
  { type: '2박 3일', price: '450,000원', detail: '메이커 액티비티 3종 + 발표·수료' },
];

const campTimetable = [
  { time: '09:30', activity: '입교 · 오리엔테이션' },
  { time: '10:00', activity: '4차산업혁명 · 청소년 기업가정신 특강' },
  { time: '11:00', activity: '관계형성 트레이닝 (팀빌딩)' },
  { time: '12:00', activity: '점심' },
  { time: '13:00', activity: '메이커 액티비티 ① (3D프린팅 / VR·AR / 드론 등)' },
  { time: '15:00', activity: '메이커 액티비티 ② (로봇코딩 / 자율주행 등)' },
  { time: '17:00', activity: '프로젝트 발표 · 수료식' },
];

const makerActivities = [
  '3D프린팅 · 3D펜', 'VR / AR 콘텐츠', '드론 STEAM',
  '로봇코딩', '인공지능 자율주행', '기업가정신 · 스타트업 특강',
];

// ── 경진대회 일정 ────────────────────────────────────────────────────────
const competitionSchedule = [
  { date: '5.20 ~ 6.15', label: '얼리버드 신청 (50% 할인)' },
  { date: '6.16 ~ 7.10', label: '일반 신청' },
  { date: '7.15 (수)', label: '사전 오리엔테이션' },
  { date: '7.18 (토)', label: 'AI 에이전트 집중교육 (온라인 4시간)' },
  { date: '7.25 (토)', label: '경진대회 1차 — 한양대 ERICA (현장 개발)' },
  { date: '8.1 · 8.8 (토)', label: '2차 · 3차 (인원 초과 시)' },
];

const competitionPrizes = [
  { rank: '1위', prize: '100만원' },
  { rank: '2위', prize: '50만원' },
  { rank: '3위', prize: '30만원' },
  { rank: '특별상', prize: '10만원' },
];

export default async function KaviLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-white text-gray-900">
      {/* ───── 상단 브랜드 바 ───── */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
          <Image
            src="/images/kavi/logo.png"
            alt="한국벤처혁신학회 KAVI"
            width={218}
            height={69}
            className="h-8 md:h-10 w-auto"
            priority
          />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-[#1B4DA1] px-5 py-2 text-sm font-bold text-white hover:bg-[#163f86] transition-colors"
          >
            교육 문의
          </a>
        </div>
      </header>

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E2D63] via-[#1B4DA1] to-[#2E6BD0] text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[12px] md:text-[13px] font-semibold tracking-wide mb-6">
            한국벤처혁신학회 · 청소년 AI 교육사업
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            AI 시대,<br />
            청소년이 직접 <span className="text-[#FFD93D]">만드는</span> 미래
          </h1>
          <p className="text-base md:text-xl text-white/85 leading-relaxed max-w-2xl mb-10">
            한국벤처혁신학회(KAVI)가 제안하는 청소년 인공지능 교육.<br className="hidden md:block" />
            AI 체험교실 <b className="text-white">14종</b>부터 캠프, 전국 AI에이전트 코딩 경진대회까지.
          </p>
          <div className="flex flex-wrap gap-3">
            {['AI 체험교실 14종', '청소년 캠프', 'AI에이전트 경진대회'].map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm md:text-[15px] font-semibold"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 가치 제안 ───── */}
      <section className="py-16 md:py-20 px-5 bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">왜 지금, AI 교육인가</h2>
          <p className="text-center text-gray-500 text-sm md:text-base mb-12">
            단순 사용을 넘어, 스스로 만들고 검증하는 AI 활용 역량을 기릅니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'AI 리터러시', desc: '인공지능의 원리와 윤리를 이해하고, 올바르게 활용하는 힘을 기릅니다.' },
              { icon: '🚀', title: '미래 직업 역량', desc: '생성형 AI로 콘텐츠·앱·데이터를 직접 만들며 진로 시야를 넓힙니다.' },
              { icon: '💡', title: '창의 · 문제해결', desc: '아이디어를 실제 결과물로 구현하며 창의력과 문제해결력을 키웁니다.' },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-7 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── AI 교육 프로그램 14종 ───── */}
      <section className="py-16 md:py-20 px-5 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-[#1B4DA1]/10 text-[#1B4DA1] px-4 py-1.5 text-[13px] font-bold mb-4">
              AI 체험교실
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">청소년 AI 교육 프로그램 14종</h2>
            <p className="text-gray-500 text-sm md:text-base">
              기초 · 활용 · 심화 3단계 · 초·중·고 대상 · 과정당 2~3교시(약 80~150분) · 단체 최소 20명
            </p>
          </div>

          <div className="space-y-10">
            {aiTiers.map((tier) => (
              <div key={tier.level}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  <h3 className="text-lg md:text-xl font-extrabold">{tier.level}</h3>
                  <span className="text-[13px] md:text-sm text-gray-500">{tier.sub}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tier.courses.map((c) => (
                    <div
                      key={c.no}
                      className="group rounded-xl border border-gray-100 bg-[#fafbfd] p-5 hover:shadow-md hover:border-[#1B4DA1]/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-lg text-white text-sm font-bold flex items-center justify-center"
                          style={{ backgroundColor: tier.color }}
                        >
                          {c.no}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-[15px] md:text-base font-bold leading-snug mb-2">{c.title}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="rounded-full bg-white border border-gray-200 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
                              {c.target}
                            </span>
                            <span className="rounded-full bg-[#1B4DA1]/8 px-2.5 py-0.5 text-[11px] font-semibold text-[#1B4DA1]">
                              {c.output}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-gray-400 mt-8">
            * 세부 커리큘럼·교구·가격은 대상과 인원에 따라 조정됩니다. 자세한 내용은 문의해 주세요.
          </p>
        </div>
      </section>

      {/* ───── 청소년 캠프 ───── */}
      <section className="py-16 md:py-20 px-5 bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-[#1FA85B]/10 text-[#1FA85B] px-4 py-1.5 text-[13px] font-bold mb-4">
              청소년 캠프
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">한양청소년캠프</h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              4차산업혁명 기술을 체험하며 융합형 창의인재로 성장하는 캠프.<br className="hidden md:block" />
              초·중·고 대상 · 최소 25명 · 한양대 ERICA 캠퍼스 또는 협력기관에서 진행
            </p>
          </div>

          {/* 유형/비용 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {campTypes.map((c) => (
              <div key={c.type} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-7 text-center">
                <div className="text-sm font-bold text-[#1FA85B] mb-2">{c.type}</div>
                <div className="text-2xl md:text-3xl font-extrabold mb-3">{c.price}</div>
                <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 타임테이블 */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-extrabold mb-5">하루 일정 (일일 캠프 예시)</h3>
              <ul className="space-y-3">
                {campTimetable.map((t) => (
                  <li key={t.time} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-14 text-sm font-bold text-[#1B4DA1]">{t.time}</span>
                    <span className="text-sm md:text-[15px] text-gray-700 leading-snug">{t.activity}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[12px] text-gray-400 mt-5">* 일정은 캠프 유형·단체 요청에 따라 맞춤 구성됩니다.</p>
            </div>

            {/* 액티비티 */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-extrabold mb-5">메이커 액티비티</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {makerActivities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 rounded-lg bg-[#f7f9fc] border border-gray-100 px-4 py-3"
                  >
                    <span className="text-[#1FA85B] font-bold">✓</span>
                    <span className="text-sm md:text-[15px] font-medium text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-gray-400 mt-5">
                * 캠프 이수자에게 수료증과 포트폴리오(사진·영상)를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── AI 에이전트 경진대회 ───── */}
      <section className="py-16 md:py-20 px-5 bg-gradient-to-br from-[#0A2E6C] to-[#16264f] text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-[#FFD93D]/15 text-[#FFD93D] border border-[#FFD93D]/40 px-4 py-1.5 text-[13px] font-bold mb-4">
              전국 경진대회
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
              2026 전국 청소년<br className="md:hidden" /> AI에이전트 코딩 경진대회
            </h2>
            <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
              “자연어로 말하면 AI가 직접 빌드·테스트·배포까지.”<br className="hidden md:block" />
              하루 안에 아이디어를 실제 아이템으로 구현하는 <b className="text-white">1일 1아이템 챌린지</b>
            </p>
          </div>

          {/* 핵심 요약 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { k: '참가 대상', v: '전국 중·고·대학생', s: '만 13~20세 · 개인전' },
              { k: '진행 방식', v: '1일 현장 개발', s: 'AI 자동심사 80 + 투표 20' },
              { k: '참가비', v: '20만원', s: '얼리버드 10만원' },
              { k: '총 상금', v: '180만원+', s: '참가자 전원 상장' },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl bg-white/8 border border-white/15 p-5 text-center">
                <div className="text-[12px] text-white/60 font-semibold mb-2">{x.k}</div>
                <div className="text-lg md:text-2xl font-extrabold mb-1">{x.v}</div>
                <div className="text-[11px] md:text-[12px] text-[#FFD93D]">{x.s}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* 일정 */}
            <div className="rounded-2xl bg-white/8 border border-white/15 p-6 md:p-8">
              <h3 className="text-lg font-extrabold mb-5">주요 일정</h3>
              <ul className="space-y-3.5">
                {competitionSchedule.map((s) => (
                  <li key={s.date} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-24 md:w-28 text-[13px] md:text-sm font-bold text-[#FFD93D]">
                      {s.date}
                    </span>
                    <span className="text-sm md:text-[15px] text-white/85 leading-snug">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 시상 */}
            <div className="rounded-2xl bg-white/8 border border-white/15 p-6 md:p-8">
              <h3 className="text-lg font-extrabold mb-5">시상 (차수별)</h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {competitionPrizes.map((p) => (
                  <div key={p.rank} className="rounded-xl bg-white/10 px-4 py-4 text-center">
                    <div className="text-[13px] text-white/70 mb-1">{p.rank}</div>
                    <div className="text-xl md:text-2xl font-extrabold text-[#FFD93D]">{p.prize}</div>
                  </div>
                ))}
              </div>
              <ul className="text-[13px] text-white/75 space-y-1.5">
                <li>· 심사 기준: 독창성 · 이해도 · 설계성 · 완성도 (각 20점)</li>
                <li>· 사용 도구: Claude · ChatGPT 등 AI 에이전트</li>
                <li>· 준비물: 노트북 1대 + 충전기 (인터넷 제공)</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://ai-coding-2026.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD93D] px-8 py-4 text-base font-extrabold text-[#0A2E6C] hover:bg-[#ffe46b] transition-colors"
            >
              경진대회 자세히 보기 · 신청하기 →
            </a>
            <p className="text-[12px] text-white/50 mt-4">주최 한양미래연구소 · 후원 한양대학교 ERICA 수리데이터사이언스학과</p>
          </div>
        </div>
      </section>

      {/* ───── 문의 ───── */}
      <section id="contact" className="py-16 md:py-20 px-5 bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">교육 문의</h2>
            <p className="text-gray-500 text-sm md:text-base">
              프로그램 도입·견적·일정 협의는 아래로 문의해 주세요.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-[#f7f9fc] p-7 md:p-10">
            <div className="flex justify-center mb-8 pb-8 border-b border-gray-200">
              <Image
                src="/images/kavi/logo.png"
                alt="한국벤처혁신학회 KAVI"
                width={218}
                height={69}
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href="tel:02-521-6745"
                className="group flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 px-6 py-8 shadow-sm hover:shadow-md hover:border-[#1B4DA1]/40 transition-all"
              >
                <span className="text-3xl mb-3">📞</span>
                <span className="text-[13px] font-bold text-gray-400 tracking-widest mb-2">대표번호</span>
                <span className="text-2xl md:text-3xl font-extrabold text-[#1B4DA1] group-hover:underline">
                  02-521-6745
                </span>
              </a>
              <a
                href="mailto:mail.kavi@kavi.or.kr"
                className="group flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 px-6 py-8 shadow-sm hover:shadow-md hover:border-[#1B4DA1]/40 transition-all"
              >
                <span className="text-3xl mb-3">✉️</span>
                <span className="text-[13px] font-bold text-gray-400 tracking-widest mb-2">이메일</span>
                <span className="text-lg md:text-2xl font-extrabold text-[#1B4DA1] group-hover:underline break-all">
                  mail.kavi@kavi.or.kr
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 푸터 ───── */}
      <footer className="bg-[#0E1A2E] text-white/70 py-10 px-5">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[15px] font-bold text-white mb-2">한국벤처혁신학회 (KAVI)</p>
          <p className="text-[13px] leading-relaxed">
            Korean Academy of Venture Innovation<br />
            02-521-6745 · mail.kavi@kavi.or.kr
          </p>
          <p className="text-[12px] text-white/40 mt-5">
            교육 기획·운영: 한양미래연구소 &nbsp;|&nbsp; © 2026 한국벤처혁신학회. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
