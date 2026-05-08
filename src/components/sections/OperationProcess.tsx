'use client';

import { useLocale } from 'next-intl';

/**
 * 업무 진행 프로세스 — 8단계 체계적 운영 시스템 (Snake-flow 화살표 디자인)
 * 마케팅 메시지: "학교의 준비 부담은 줄이고 교육의 완성도는 높입니다"
 *
 * 흐름: 01 → 02 ↓ 03 → 04 ↓ 05 → 06 ↓ 07 → 08
 * 데스크톱: 2열 4행 zigzag + 곡선 화살표
 * 모바일: 1열 세로 흐름 + 직선 아래 화살표
 */

type Step = {
  no: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon: React.ReactNode;
  accent: string;
  ringColor: string;
};

const STEPS: Step[] = [
  {
    no: '01',
    titleKo: '계획 및 견적서 전달',
    titleEn: 'Plan & Quote',
    descKo: '견적서 · 계획서 · 시간표 일괄 전달\n*학교 요청 시 맞춤형 프로그램 제안',
    descEn: 'Quote, plan, schedule together.\n*Custom program available.',
    accent: 'from-amber-400 to-orange-500',
    ringColor: '#f59e0b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    no: '02',
    titleKo: '전문 강사 섭외',
    titleEn: 'Expert Instructor Match',
    descKo: '공개 입찰 시스템으로\n검증된 베테랑 강사만 배정',
    descEn: 'Open-bidding ensures only\nverified veteran instructors.',
    accent: 'from-rose-400 to-pink-500',
    ringColor: '#ec4899',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M16 4l2 2 4-4" />
      </svg>
    ),
  },
  {
    no: '03',
    titleKo: '사전 점검',
    titleEn: 'Pre-event Check',
    descKo: '사전확인서로 환경 · 수준 세팅\n강사와 실시간 체크',
    descEn: 'Environment & level checklist\nshared live with instructor.',
    accent: 'from-cyan-400 to-blue-500',
    ringColor: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16l5 5" />
        <path d="M8 11l2 2 4-4" />
      </svg>
    ),
  },
  {
    no: '04',
    titleKo: '증명 서류 전달',
    titleEn: 'Verified Documents',
    descKo: '강사 이력서 · 성범죄 조회동의서\n등 모든 서류 사전 제공',
    descEn: 'Resume, background check, all\nrequired papers upfront.',
    accent: 'from-emerald-400 to-teal-500',
    ringColor: '#10b981',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    no: '05',
    titleKo: '최종 점검 · 기자재 전달',
    titleEn: 'Final Check · Equipment',
    descKo: '운영 단톡방 초대 · 앱/계정 점검\n기자재 사전 배송',
    descEn: 'Group chat, app/account check,\npre-shipment of equipment.',
    accent: 'from-indigo-400 to-violet-500',
    ringColor: '#6366f1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    no: '06',
    titleKo: '강의 및 활동 보고',
    titleEn: 'Class & Activity Report',
    descKo: '활동 일지와 만족도 조사 실시\n*요청 시 맞춤 보고서 제공',
    descEn: 'Activity logs + satisfaction.\n*Custom reports on request.',
    accent: 'from-fuchsia-400 to-purple-500',
    ringColor: '#d946ef',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    no: '07',
    titleKo: '결과 보고서 전달',
    titleEn: 'Final Report Delivery',
    descKo: '현장 사진 수록 결과 보고서\n*만족도 통계 · 세특 보고서 가능',
    descEn: 'Photo-included final report.\n*Stats & student record available.',
    accent: 'from-sky-400 to-blue-500',
    ringColor: '#0ea5e9',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    no: '08',
    titleKo: '회계 및 정산',
    titleEn: 'Billing & Settlement',
    descKo: '세금계산서 · 4대보험 완납증명서 등\n서류 완비로 간편한 정산\n(나라장터 공개 입찰 가능)',
    descEn: 'Invoice, insurance proof, etc.\nFull-paperwork settlement\n(G-Marketplace).',
    accent: 'from-lime-400 to-green-500',
    ringColor: '#84cc16',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h2M12 15h5" />
      </svg>
    ),
  },
];

// 단일 카드 컴포넌트
function ProcessCard({ step, isKo }: { step: Step; isKo: boolean }) {
  return (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 px-4 md:px-5 pt-10 md:pt-12 pb-5 md:pb-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: `0 4px 16px ${step.ringColor}1f` }}
    >
      {/* 상단 떠 있는 원형 아이콘 */}
      <div
        className={`absolute -top-7 md:-top-8 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${step.accent} text-white flex items-center justify-center shadow-lg`}
        style={{ boxShadow: `0 6px 18px ${step.ringColor}66` }}
      >
        {step.icon}
        {/* 작은 번호 배지 */}
        <span
          className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white text-[10px] md:text-xs font-black flex items-center justify-center shadow"
          style={{ color: step.ringColor }}
        >
          {step.no}
        </span>
      </div>

      <h3 className="text-base md:text-lg font-extrabold text-gray-900 mb-2 leading-tight">
        <span className="font-black mr-1.5" style={{ color: step.ringColor }}>{step.no}.</span>
        {isKo ? step.titleKo : step.titleEn}
      </h3>
      <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
        {isKo ? step.descKo : step.descEn}
      </p>
    </div>
  );
}

// 데스크톱 가로 화살표 (왼쪽 카드 → 오른쪽 카드)
function ArrowRight({ color }: { color: string }) {
  return (
    <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
        <path
          d="M4 16 L54 16"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M48 8 L58 16 L48 24"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// 데스크톱 곡선 화살표 (오른쪽 카드 → 다음 행 왼쪽 카드, S 곡선)
function CurveDownLeft({ color }: { color: string }) {
  return (
    <div className="hidden sm:block relative h-12 md:h-16 my-1" aria-hidden>
      <svg
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M 600 0 C 600 50, 200 30, 200 80"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M 192 70 L 200 82 L 210 72"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// 모바일 아래 화살표
function ArrowDownMobile({ color }: { color: string }) {
  return (
    <div className="sm:hidden flex justify-center my-2" aria-hidden>
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
        <path
          d="M12 2 L12 26"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M5 22 L12 30 L19 22"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function OperationProcess() {
  const isKo = useLocale() === 'ko';

  // 카드를 페어로 묶음 (1-2, 3-4, 5-6, 7-8)
  const pairs: Step[][] = [
    [STEPS[0], STEPS[1]],
    [STEPS[2], STEPS[3]],
    [STEPS[4], STEPS[5]],
    [STEPS[6], STEPS[7]],
  ];

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      aria-label={isKo ? '업무 진행 프로세스' : 'Operation Process'}
    >
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-12 w-72 h-72 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-20 right-12 w-80 h-80 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[900px]">
        {/* 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-point uppercase mb-3">
            {isKo ? '8-STEP PROCESS' : '8-STEP PROCESS'}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {isKo ? (
              <>
                <span className="inline-block text-point">| </span>
                업무 진행 프로세스
              </>
            ) : (
              <>
                <span className="inline-block text-point">| </span>
                Operation Process
              </>
            )}
          </h2>
          <p className="mt-4 text-base md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {isKo ? (
              <>
                <strong className="text-point">체계적인 8단계 운영 시스템</strong>으로<br className="md:hidden" />
                {' '}<strong className="text-gray-900">학교의 준비 부담은 줄이고</strong>{' '}
                <strong className="text-gray-900">교육의 완성도는 높입니다.</strong>
              </>
            ) : (
              <>
                A <strong className="text-point">systematic 8-step process</strong> that{' '}
                <strong className="text-gray-900">reduces school workload</strong> while{' '}
                <strong className="text-gray-900">elevating quality</strong>.
              </>
            )}
          </p>
        </div>

        {/* 8단계 흐름도 */}
        <div className="relative">
          {pairs.map((pair, rowIdx) => (
            <div key={rowIdx}>
              {/* 한 행 (좌 카드 + 우 카드 + 가로 화살표) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-12 sm:gap-y-0 relative pt-8 md:pt-10">
                <ProcessCard step={pair[0]} isKo={isKo} />
                {/* 모바일에서만 카드 사이 아래 화살표 */}
                <ArrowDownMobile color={pair[0].ringColor} />
                <ProcessCard step={pair[1]} isKo={isKo} />
                {/* 데스크톱: 가로 화살표 (좌→우) */}
                <ArrowRight color={pair[0].ringColor} />
              </div>

              {/* 행 사이 곡선 (마지막 행 제외) */}
              {rowIdx < pairs.length - 1 && (
                <>
                  <CurveDownLeft color={pair[1].ringColor} />
                  <ArrowDownMobile color={pair[1].ringColor} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* 하단 CTA 강조 박스 — 신뢰감 있는 클린 디자인 (브랜드 point 컬러 활용) */}
        <div className="mt-14 md:mt-20">
          <div
            className="relative rounded-3xl bg-white p-6 md:p-10 overflow-hidden"
            style={{
              boxShadow: '0 20px 50px rgba(51,102,102,0.10), 0 4px 12px rgba(0,0,0,0.04)',
              border: '1px solid #e5e7eb',
            }}
          >
            {/* 좌측 컬러 강조 바 (브랜드 point 컬러) */}
            <div
              aria-hidden
              className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-point via-point to-point/70"
            />

            {/* 부드러운 배경 글로우 (아주 옅게) */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-point/8 blur-3xl" />
              <div className="absolute -bottom-20 left-1/3 w-48 h-48 rounded-full bg-slate-200/40 blur-3xl" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="md:col-span-2 md:pl-2">
                <p className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase text-point mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-point" />
                  {isKo ? 'WHY CHOOSE US' : 'WHY CHOOSE US'}
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3 text-slate-900">
                  {isKo ? (
                    <>
                      맡기시면 처음부터 끝까지,<br className="hidden md:inline" />
                      {' '}<span className="text-point">모든 것이 준비됩니다.</span>
                    </>
                  ) : (
                    <>
                      From start to finish —{' '}
                      <span className="text-point">we handle everything.</span>
                    </>
                  )}
                </h3>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  {isKo ? (
                    <>
                      제안서 · 강사 섭외 · 기자재 · 보고서 · 정산까지.
                      <br />
                      학교 담당자는 딱 한 분만 계셔도 충분합니다.
                    </>
                  ) : (
                    <>
                      Proposal, instructors, equipment, reports, billing.
                      <br />
                      Your one contact handles all.
                    </>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-3.5">
                {[
                  { value: '8단계', valueEn: '8-Step', labelKo: '체계적 시스템', labelEn: 'Step System' },
                  { value: '100%', valueEn: '100%', labelKo: '서류 완비', labelEn: 'Full Docs' },
                  { value: '1:1', valueEn: '1:1', labelKo: '담당자 배정', labelEn: 'Dedicated Lead' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="relative text-center md:text-left rounded-2xl px-3 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-200/80 hover:border-point/40 hover:bg-white transition-colors"
                  >
                    {/* 좌측 작은 점 (md+ 만) */}
                    <span aria-hidden className="hidden md:block absolute left-3 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-point to-point/50" />
                    <div className="md:pl-4">
                      <p className="text-2xl md:text-3xl font-black leading-none text-point">
                        {isKo ? stat.value : stat.valueEn}
                      </p>
                      <p className="text-[11px] md:text-sm font-semibold text-slate-700 mt-1">
                        {isKo ? stat.labelKo : stat.labelEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
