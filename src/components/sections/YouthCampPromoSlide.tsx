/**
 * 메인 슬라이드용 — 2026 한양 청소년 캠프 프로모션 배너
 * 선생님(학교/기관 담당자) 타깃, ERICA 캠퍼스 활용·멘토진·완성 결과물·수료증 강조
 */
export default function YouthCampPromoSlide({ isKo }: { isKo: boolean }) {
  return (
    <div className="relative w-full min-h-[480px] sm:min-h-0 sm:aspect-[16/6] md:aspect-[16/5] overflow-hidden bg-gradient-to-br from-[#0b1d3a] via-[#15346d] to-[#1e4ea8]">
      {/* 배경 — ERICA 캠퍼스 사진 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/booth/camp-bg.png')" }}
      />
      {/* 짙은 그라디언트 오버레이 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0b1d3a]/95 via-[#15346d]/85 to-[#1e4ea8]/55"
      />

      {/* 빛 번짐 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-[420px] h-[420px] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(251,191,36,0.55) 0%, rgba(251,146,60,0.25) 50%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 w-[360px] h-[360px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.55) 0%, transparent 70%)',
        }}
      />

      {/* 사이버 그리드 (희미하게) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage:
            'radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative h-full flex items-center py-6 sm:py-0 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="grid grid-cols-12 gap-4 md:gap-5 lg:gap-6 xl:gap-8 w-full max-w-[1320px] mx-auto items-center">
          {/* 좌측 — 텍스트 + CTA */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6 text-white">
            {/* 라벨 */}
            <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/40 mb-2 md:mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] md:text-xs lg:text-sm font-extrabold tracking-[0.18em] text-amber-950 uppercase">
                {isKo ? '🎓 NEW · 한양 청소년 캠프' : '🎓 NEW · YOUTH CAMP'}
              </span>
            </div>

            {/* 메인 헤드라인 */}
            <h2 className="font-extrabold mb-2 lg:mb-3">
              {isKo ? (
                <>
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-[36px] xl:text-[44px] leading-[1.3] py-1">
                    한양대학교 ERICA에서 시작하는
                  </span>
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-[36px] xl:text-[44px] leading-[1.4] pb-3 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    우리 학교 맞춤 청소년 캠프
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-[36px] xl:text-[44px] leading-[1.3] py-1">
                    Starting at Hanyang University ERICA
                  </span>
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-[36px] xl:text-[44px] leading-[1.4] pb-3 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Custom Youth Camp for Your School
                  </span>
                </>
              )}
            </h2>

            {/* 서브카피 — 선생님 어필 포인트 */}
            <p className="text-xs sm:text-[13px] md:text-base lg:text-lg xl:text-xl text-blue-100/95 leading-relaxed mb-2 md:mb-3 lg:mb-5 max-w-2xl font-medium">
              {isKo ? (
                <>
                  진학 동기부여 + 한양대학생 멘토링 + 완성 결과물 + 수료증까지.
                  <br />
                  학교·기관 일정에 맞춘 맞춤형 프로그램으로 구성 가능합니다.
                </>
              ) : (
                <>
                  Motivation + Hanyang student mentoring + finished projects + certificates.
                  <br />
                  Programs tailored to your school schedule.
                </>
              )}
            </p>

            {/* 강조 칩 */}
            <div className="hidden sm:flex flex-wrap gap-1.5 md:gap-2 lg:gap-2.5 mb-3 md:mb-4 lg:mb-5">
              {[
                { ko: '✓ ERICA 캠퍼스 투어', en: '✓ Campus Tour' },
                { ko: '✓ 한양대학생 멘토링', en: '✓ Hanyang Student Mentoring' },
                { ko: '✓ 완성 결과물 제공', en: '✓ Take-home Projects' },
                { ko: '✓ 수료증 · 생기부 활용', en: '✓ Certificate' },
                { ko: '✓ 맞춤 프로그램 구성', en: '✓ Custom Program' },
              ].map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 md:px-3 lg:px-3.5 py-0.5 md:py-1 lg:py-1.5 rounded-full text-[10px] md:text-xs lg:text-base font-bold text-amber-50 bg-amber-400/20 border border-amber-300/50 backdrop-blur-sm shadow-sm"
                >
                  {isKo ? t.ko : t.en}
                </span>
              ))}
            </div>

            {/* CTA 버튼 */}
            <div className="flex items-center gap-3 md:gap-4">
              <span className="inline-flex items-center gap-2 px-4 md:px-5 lg:px-7 py-2.5 md:py-3 lg:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white font-extrabold text-xs md:text-sm lg:text-lg shadow-[0_8px_30px_rgba(245,158,11,0.45)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.65)] hover:scale-105 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isKo ? '청소년 캠프 커리큘럼 보기' : 'View Camp Curriculum'}
              </span>
            </div>
          </div>

          {/* 우측 — 4가지 차별점 카드 (2x2) — 모바일에서도 표시 */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 flex justify-center md:justify-end items-center mt-3 md:mt-0">
            <div className="relative w-full max-w-[340px] md:max-w-[320px] lg:max-w-full">
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3.5">
                {[
                  {
                    no: '01',
                    titleKo: 'ERICA 캠퍼스 투어',
                    titleEn: 'ERICA Campus Tour',
                    descKo: '정규 강의실 · 실습실 활용\n진학 동기부여 효과',
                    descEn: 'Real lecture halls\nMotivates college-bound',
                    icon: '🎓',
                    accent: 'from-amber-400 to-orange-500',
                    shadowColor: 'rgba(251,191,36,0.45)',
                  },
                  {
                    no: '02',
                    titleKo: '한양대학생 멘토링',
                    titleEn: 'Hanyang Student Mentoring',
                    descKo: '이공계 교수진 자문\n한양대학생 보조 + 진로 인사이트',
                    descEn: 'STEM faculty advice\nHanyang student support',
                    icon: '👩‍🏫',
                    accent: 'from-cyan-400 to-blue-500',
                    shadowColor: 'rgba(56,189,248,0.45)',
                  },
                  {
                    no: '03',
                    titleKo: "'내 손으로 완성'",
                    titleEn: 'Hands-on Projects',
                    descKo: '코딩 로봇 · 블루투스 스피커\n드론 등 완성 결과물 소장',
                    descEn: 'Robots · Speakers · Drones\nTake home what you build',
                    icon: '🛠️',
                    accent: 'from-emerald-400 to-teal-500',
                    shadowColor: 'rgba(16,185,129,0.45)',
                  },
                  {
                    no: '04',
                    titleKo: '수료증 · 생기부 활용',
                    titleEn: 'Certificate · Portfolio',
                    descKo: '수료증 + 결과물 + 사진\n포트폴리오 즉시 활용',
                    descEn: 'Certificate + project + photos\nReady for portfolio',
                    icon: '📜',
                    accent: 'from-fuchsia-400 to-pink-500',
                    shadowColor: 'rgba(232,121,249,0.45)',
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl lg:rounded-2xl p-2.5 sm:p-3 md:p-3 lg:p-5 xl:p-6 bg-white/15 backdrop-blur-md border-[1.5px] border-white/30 hover:bg-white/25 hover:-translate-y-0.5 hover:scale-[1.02] transition-all overflow-hidden"
                    style={{ boxShadow: `0 6px 18px ${c.shadowColor}` }}
                  >
                    {/* 모서리 컬러 강조 */}
                    <div
                      aria-hidden
                      className={`absolute -top-6 -right-6 w-16 h-16 lg:w-24 lg:h-24 rounded-full opacity-40 blur-xl bg-gradient-to-br ${c.accent}`}
                    />
                    {/* 좌측 컬러 바 */}
                    <div
                      aria-hidden
                      className={`absolute top-0 left-0 bottom-0 w-[3px] lg:w-1 bg-gradient-to-b ${c.accent}`}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-1 sm:mb-1.5 lg:mb-2.5">
                        <span
                          className={`text-xs sm:text-sm lg:text-xl font-black bg-gradient-to-r ${c.accent} bg-clip-text text-transparent tracking-wider`}
                        >
                          {c.no}
                        </span>
                        <span className="text-sm sm:text-base lg:text-2xl leading-none drop-shadow-md">{c.icon}</span>
                      </div>
                      <p className="text-white text-[11px] sm:text-xs lg:text-base xl:text-lg font-extrabold leading-tight mb-0.5 sm:mb-1 lg:mb-1.5 drop-shadow">
                        {isKo ? c.titleKo : c.titleEn}
                      </p>
                      <p className="text-blue-50/90 text-[9px] sm:text-[10px] lg:text-[13px] xl:text-sm font-semibold leading-snug whitespace-pre-line">
                        {isKo ? c.descKo : c.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일 — 하단 차별점 칩 (이제 카드가 보이므로 숨김) */}
          <div className="hidden col-span-12 mt-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-100">
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/40">🎓 ERICA</span>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-300/40">👩‍🏫 멘토</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-300/40">🛠️ 결과물</span>
              <span className="px-1.5 py-0.5 rounded-full bg-fuchsia-400/15 border border-fuchsia-300/40">📜 수료증</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
