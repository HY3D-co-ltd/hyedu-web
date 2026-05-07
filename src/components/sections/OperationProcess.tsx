'use client';

import { useLocale } from 'next-intl';

/**
 * 업무 진행 프로세스 — 8단계 체계적 운영 시스템
 * 마케팅 메시지: "학교의 준비 부담은 줄이고 교육의 완성도는 높입니다"
 */

type Step = {
  no: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon: React.ReactNode;
  accent: string;
  shadow: string;
};

const STEPS: Step[] = [
  {
    no: '01',
    titleKo: '계획 및 견적서 전달',
    titleEn: 'Plan & Quote',
    descKo: '견적서 · 계획서 · 시간표 일괄 전달\n*학교 요청 시 맞춤형 프로그램 제안',
    descEn: 'Quote, plan, and schedule delivered together.\n*Custom program available on request.',
    accent: 'from-amber-400 to-orange-500',
    shadow: 'rgba(251,191,36,0.25)',
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
    descEn: 'Open-bidding system places only\nverified veteran instructors.',
    accent: 'from-rose-400 to-pink-500',
    shadow: 'rgba(244,114,182,0.25)',
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
    descKo: '사전확인서로 환경·수준 세팅\n강사와 실시간 체크',
    descEn: 'Environment & level checklist\nshared with instructor live.',
    accent: 'from-cyan-400 to-blue-500',
    shadow: 'rgba(56,189,248,0.25)',
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
    descEn: 'Resume, background check\nand all required papers upfront.',
    accent: 'from-emerald-400 to-teal-500',
    shadow: 'rgba(16,185,129,0.25)',
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
    descEn: 'Group chat invite, app/account check,\npre-shipment of equipment.',
    accent: 'from-indigo-400 to-violet-500',
    shadow: 'rgba(99,102,241,0.25)',
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
    descEn: 'Activity logs + satisfaction survey.\n*Custom reports on request.',
    accent: 'from-fuchsia-400 to-purple-500',
    shadow: 'rgba(217,70,239,0.25)',
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
    shadow: 'rgba(56,189,248,0.25)',
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
    descKo: '세금계산서 · 4대보험 완납증명서 등\n서류 완비로 간편한 정산 (나라장터 가능)',
    descEn: 'Invoice, insurance proof, etc.\nFull-paperwork settlement (G-Marketplace).',
    accent: 'from-lime-400 to-green-500',
    shadow: 'rgba(132,204,22,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h2M12 15h5" />
      </svg>
    ),
  },
];

export default function OperationProcess() {
  const isKo = useLocale() === 'ko';

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

      <div className="relative mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* 헤더 */}
        <div className="text-center mb-10 md:mb-14">
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
                <strong className="text-gray-900">elevating education quality</strong>.
              </>
            )}
          </p>
        </div>

        {/* 8단계 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 md:p-6 transition-all hover:-translate-y-1 overflow-hidden"
              style={{ boxShadow: `0 6px 20px ${step.shadow}` }}
            >
              {/* 모서리 컬러 글로우 */}
              <div
                aria-hidden
                className={`absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-30 blur-2xl bg-gradient-to-br ${step.accent}`}
              />
              {/* 좌측 컬러 바 */}
              <div
                aria-hidden
                className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${step.accent}`}
              />

              <div className="relative">
                {/* 상단: 번호 + 아이콘 */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <span
                    className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${step.accent} bg-clip-text text-transparent tracking-tight`}
                  >
                    {step.no}
                  </span>
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${step.accent} text-white flex items-center justify-center shadow-md`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="text-base md:text-lg font-extrabold text-gray-900 mb-2 leading-tight">
                  {isKo ? step.titleKo : step.titleEn}
                </h3>

                {/* 설명 */}
                <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {isKo ? step.descKo : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA 강조 박스 */}
        <div className="mt-10 md:mt-14">
          <div className="relative rounded-3xl bg-gradient-to-r from-point via-point/95 to-point/85 p-6 md:p-10 text-white overflow-hidden shadow-xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="md:col-span-2">
                <p className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-80 mb-2">
                  {isKo ? 'WHY CHOOSE US' : 'WHY CHOOSE US'}
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                  {isKo
                    ? '맡기시면 처음부터 끝까지, 모든 것이 준비됩니다.'
                    : 'From start to finish — we handle everything.'}
                </h3>
                <p className="text-base md:text-lg opacity-90 leading-relaxed">
                  {isKo
                    ? '제안서 · 강사 섭외 · 기자재 · 보고서 · 정산까지. 학교 담당자는 딱 한 분만 계셔도 충분합니다.'
                    : 'Proposal, instructors, equipment, reports, billing — your one contact handles all.'}
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
                <div className="text-center md:text-left bg-white/15 backdrop-blur-sm rounded-2xl px-3 md:px-5 py-3 md:py-4 border border-white/20">
                  <p className="text-2xl md:text-3xl font-black leading-none">8단계</p>
                  <p className="text-[11px] md:text-sm font-semibold opacity-90 mt-1">{isKo ? '체계적 시스템' : 'Step System'}</p>
                </div>
                <div className="text-center md:text-left bg-white/15 backdrop-blur-sm rounded-2xl px-3 md:px-5 py-3 md:py-4 border border-white/20">
                  <p className="text-2xl md:text-3xl font-black leading-none">100%</p>
                  <p className="text-[11px] md:text-sm font-semibold opacity-90 mt-1">{isKo ? '서류 완비' : 'Full Docs'}</p>
                </div>
                <div className="text-center md:text-left bg-white/15 backdrop-blur-sm rounded-2xl px-3 md:px-5 py-3 md:py-4 border border-white/20">
                  <p className="text-2xl md:text-3xl font-black leading-none">1:1</p>
                  <p className="text-[11px] md:text-sm font-semibold opacity-90 mt-1">{isKo ? '담당자 배정' : 'Dedicated Lead'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
