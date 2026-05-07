'use client';

import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';

const benefits = [
  {
    icon: (
      // 출장비 절감 — 지갑 + 하강 화살표
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M16 14.5l2 2 3-3" />
      </svg>
    ),
    title: { ko: '출장비 부담 ↓', en: 'Lower Travel Cost' },
    desc: { ko: '거점 인근 강사 매칭으로\n불필요한 출장비 최소화', en: 'Match with nearby instructors\nto minimize travel cost' },
  },
  {
    icon: (
      // 첨단 기자재 — 칩
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    ),
    title: { ko: '첨단 기자재 보유', en: 'Cutting-Edge Equipment' },
    desc: { ko: 'AI · 로봇 · 3D프린팅 등\n전국 동일 수준 장비 제공', en: 'AI · Robotics · 3D printing\nsame quality nationwide' },
  },
  {
    icon: (
      // 어디서나 — 핀
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: { ko: '전국 어디서나', en: 'Anywhere in Korea' },
    desc: { ko: '수도권 · 충청 · 전라 ·\n강원 · 부울경 4개 거점', en: 'Capital · Honam · Gangwon ·\nBuULGyeong — 4 hubs' },
  },
];

export default function NationwideNetwork() {
  const isKo = useLocale() === 'ko';

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* 배경 장식 — 좌상단 도트, 우하단 페인트 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-8 w-40 h-40 rounded-full bg-point/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* 상단 라벨 + 헤드라인 */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-point uppercase mb-3">
            {isKo ? 'NATIONWIDE NETWORK' : 'NATIONWIDE NETWORK'}
          </span>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-gray-900 leading-tight">
            {isKo ? (
              <>
                전국 어디서나 <span className="text-point">AI · 4차산업 미래기술</span>을<br className="hidden md:inline" />
                {' '}직접 체험하며 진로를 탐색할 수 있습니다
              </>
            ) : (
              <>
                Experience <span className="text-point">AI · future industry tech</span> firsthand<br className="hidden md:inline" />
                {' '}and explore your career — anywhere in Korea
              </>
            )}
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isKo
              ? '수도권 본사 및 전국 4개 거점(충청·전라 / 강원 / 부울경) 운영으로 출장비 부담을 낮추고, 어디서나 첨단 기자재 활용 수업이 가능합니다.'
              : 'With our HQ in the capital region and 4 nationwide hubs (Honam / Gangwon / BuULGyeong), we minimize travel cost and deliver cutting-edge classes anywhere in Korea.'}
          </p>
        </div>

        {/* 본문: 좌(혜택 카드 3개) | 우(지도 이미지) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 좌측 — 혜택 + 거점 칩 */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="group flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-point/10 text-point flex items-center justify-center group-hover:bg-point group-hover:text-white transition-colors">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                      {isKo ? b.title.ko : b.title.en}
                    </h3>
                    <p className="text-[13px] text-gray-600 whitespace-pre-line leading-relaxed">
                      {isKo ? b.desc.ko : b.desc.en}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 우측 — 지도 이미지 */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* 큰 숫자 배지 — 우상단 */}
              <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 z-10 bg-point text-white px-4 py-3 md:px-5 md:py-3.5 rounded-2xl shadow-lg rotate-2">
                <span className="block text-[10px] md:text-[11px] font-semibold tracking-wider opacity-90">
                  {isKo ? 'NATIONWIDE' : 'NATIONWIDE'}
                </span>
                <span className="block text-[22px] md:text-[26px] font-extrabold leading-none mt-0.5">
                  {isKo ? '4개 거점' : '4 Hubs'}
                </span>
              </div>

              <div className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(51,102,102,0.10)] p-3 md:p-5 overflow-hidden">
                <Image
                  src="/images/network/nationwide-map.png"
                  alt={isKo ? '4개 거점 지점과 참가 기관 분포도' : 'Nationwide network map with 4 hubs'}
                  width={1024}
                  height={1024}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* 하단 데이터 라벨 */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center bg-white rounded-xl border border-gray-100 py-3">
                  <p className="text-[11px] text-gray-500 mb-0.5">{isKo ? '운영 거점' : 'Hubs'}</p>
                  <p className="text-[18px] font-bold text-gray-900">{isKo ? '4 + 1' : '4 + 1'}</p>
                </div>
                <div className="text-center bg-white rounded-xl border border-gray-100 py-3">
                  <p className="text-[11px] text-gray-500 mb-0.5">{isKo ? '커버 지역' : 'Coverage'}</p>
                  <p className="text-[18px] font-bold text-gray-900">{isKo ? '전국' : 'Nationwide'}</p>
                </div>
                <div className="text-center bg-white rounded-xl border border-gray-100 py-3">
                  <p className="text-[11px] text-gray-500 mb-0.5">{isKo ? '참여 기관' : 'Partners'}</p>
                  <p className="text-[18px] font-bold text-point">245+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
