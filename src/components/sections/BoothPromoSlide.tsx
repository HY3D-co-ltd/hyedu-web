/**
 * 메인 슬라이드용 — 2026 체험부스 커리큘럼 프로모션 배너 (밝고 재미있는 스타일)
 * AI · 로봇 · VR/AR · 코딩 체험부스 관심자를 PDF로 유도하는 마케팅 배너
 */
export default function BoothPromoSlide({ isKo }: { isKo: boolean }) {
  return (
    <div className="relative w-full aspect-[16/6] md:aspect-[16/5] overflow-hidden bg-gradient-to-br from-[#fff8f0] via-[#fff3e6] to-[#ffe9d6]">
      {/* 밝은 배경 도트 패턴 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,159,67,0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 컬러 블롭 (재미있는 분위기) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(255,205,86,0.65) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 w-[460px] h-[460px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(255,138,128,0.55) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/3 w-[320px] h-[320px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(120,200,255,0.55) 0%, transparent 70%)',
        }}
      />

      {/* 작은 떠다니는 별/점 (재미요소) */}
      <span aria-hidden className="hidden md:block absolute top-8 left-1/3 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>✨</span>
      <span aria-hidden className="hidden md:block absolute bottom-12 left-[55%] text-xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🚀</span>
      <span aria-hidden className="hidden lg:block absolute top-1/2 right-8 text-2xl animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '1s' }}>🎉</span>

      {/* 콘텐츠 */}
      <div className="relative h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full max-w-[1280px] mx-auto items-center">
          {/* 좌측 — 텍스트 + CTA */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7">
            {/* NEW 라벨 */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 mb-3 md:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-white uppercase">
                {isKo ? '🎯 2026 NEW · 체험부스 커리큘럼' : '🎯 2026 NEW · BOOTH'}
              </span>
            </div>

            {/* 메인 헤드라인 */}
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-2 md:mb-3 text-gray-900">
              {isKo ? (
                <>
                  AI · 로봇 · VR/AR · 코딩
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    재미있는 체험부스 한눈에!
                  </span>
                </>
              ) : (
                <>
                  AI · Robot · VR/AR · Coding
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Fun Booth Programs!
                  </span>
                </>
              )}
            </h2>

            {/* 서브카피 */}
            <p className="text-[12px] sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 md:mb-5 max-w-xl font-medium">
              {isKo
                ? '23종 프로그램 · 4개 거점 · 베테랑 강사진. 행사·축제·기관에 딱 맞는 체험부스를 PDF에서 확인하세요!'
                : '23 programs · 4 hubs · expert instructors. Find the perfect booth lineup for your event!'}
            </p>

            {/* 키워드 태그 (밝고 컬러풀) */}
            <div className="hidden sm:flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
              {[
                { ko: '#AI오락실', en: '#AIArcade', color: 'bg-sky-100 text-sky-700 border-sky-300' },
                { ko: '#로봇축구', en: '#RobotSoccer', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
                { ko: '#VR해부학', en: '#VRAnatomy', color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300' },
                { ko: '#드론체험', en: '#Drone', color: 'bg-amber-100 text-amber-700 border-amber-300' },
                { ko: '#3D메이커', en: '#3DMaker', color: 'bg-rose-100 text-rose-700 border-rose-300' },
              ].map((t, i) => (
                <span
                  key={i}
                  className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold border ${t.color}`}
                >
                  {isKo ? t.ko : t.en}
                </span>
              ))}
            </div>

            {/* CTA 버튼 */}
            <div className="flex items-center gap-3 md:gap-4">
              <span className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-extrabold text-xs md:text-base shadow-[0_8px_30px_rgba(236,72,153,0.45)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.65)] hover:scale-105 transition-all">
                {/* 다운로드 아이콘 */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 md:w-5 md:h-5">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isKo ? 'PDF로 자세히 보기' : 'View PDF'}
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] md:text-xs text-gray-600 font-semibold">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7H5V5z" />
                </svg>
                {isKo ? '새 창 · 무료 다운로드' : 'New tab · Free'}
              </span>
            </div>
          </div>

          {/* 우측 — 4개 카테고리 사진 카드 */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-5 justify-end items-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              <div className="relative grid grid-cols-2 gap-3 lg:gap-4 h-full">
                {/* AI */}
                <div
                  className="group relative rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(56,189,248,0.35)] transition-all hover:-translate-y-1 hover:rotate-[-1deg]"
                  style={{ background: 'linear-gradient(135deg, #38bdf8, #0284c7)' }}
                >
                  <img
                    src="/images/booth/ai.png"
                    alt={isKo ? 'AI 체험' : 'AI Experience'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-700/80 via-sky-700/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white">
                    <p className="text-lg lg:text-xl font-extrabold leading-none drop-shadow">AI</p>
                    <p className="text-[10px] lg:text-xs font-semibold opacity-95 mt-1 drop-shadow">{isKo ? '오락실 · 윤리' : 'Arcade · Ethics'}</p>
                  </div>
                  {/* 코너 이모지 */}
                  <span className="absolute top-2 right-2 text-base lg:text-lg drop-shadow-md">🤖</span>
                </div>

                {/* ROBOT */}
                <div
                  className="group relative rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.35)] transition-all hover:-translate-y-1 hover:rotate-[1deg]"
                >
                  <img
                    src="/images/booth/robot.png"
                    alt={isKo ? '로봇 체험' : 'Robot Experience'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-700/80 via-emerald-700/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white">
                    <p className="text-lg lg:text-xl font-extrabold leading-none drop-shadow">{isKo ? '로봇' : 'ROBOT'}</p>
                    <p className="text-[10px] lg:text-xs font-semibold opacity-95 mt-1 drop-shadow">{isKo ? '축구 · 자율주행' : 'Soccer · Auto'}</p>
                  </div>
                  <span className="absolute top-2 right-2 text-base lg:text-lg drop-shadow-md">⚽</span>
                </div>

                {/* VR / AR */}
                <div
                  className="group relative rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(217,70,239,0.35)] transition-all hover:-translate-y-1 hover:rotate-[1deg]"
                >
                  <img
                    src="/images/booth/vr.png"
                    alt={isKo ? 'VR/AR 체험' : 'VR/AR Experience'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-700/80 via-fuchsia-700/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white">
                    <p className="text-lg lg:text-xl font-extrabold leading-none drop-shadow">VR / AR</p>
                    <p className="text-[10px] lg:text-xs font-semibold opacity-95 mt-1 drop-shadow">{isKo ? '메타버스 · 해부학' : 'Meta · Anatomy'}</p>
                  </div>
                  <span className="absolute top-2 right-2 text-base lg:text-lg drop-shadow-md">🥽</span>
                </div>

                {/* CODING */}
                <div
                  className="group relative rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.35)] transition-all hover:-translate-y-1 hover:rotate-[-1deg]"
                >
                  <img
                    src="/images/booth/coding.png"
                    alt={isKo ? '코딩 체험' : 'Coding Experience'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-700/80 via-amber-700/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white">
                    <p className="text-lg lg:text-xl font-extrabold leading-none drop-shadow">{isKo ? '코딩' : 'CODING'}</p>
                    <p className="text-[10px] lg:text-xs font-semibold opacity-95 mt-1 drop-shadow">{isKo ? '아케이드 · 메이커' : 'Arcade · Maker'}</p>
                  </div>
                  <span className="absolute top-2 right-2 text-base lg:text-lg drop-shadow-md">💻</span>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 — 하단 카테고리 띠 */}
          <div className="md:hidden col-span-12 mt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">🤖 AI</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">⚽ {isKo ? '로봇' : 'ROBOT'}</span>
              <span className="px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-300">🥽 VR/AR</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">💻 {isKo ? '코딩' : 'CODE'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 우상단 PDF 라벨 */}
      <div className="hidden sm:flex absolute top-4 right-4 md:top-6 md:right-8 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-orange-200 text-gray-800 text-[10px] md:text-xs font-bold tracking-wide">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5 text-rose-500">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
        </svg>
        PDF
      </div>
    </div>
  );
}
