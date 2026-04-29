'use client';

/**
 * 한양미래연구소 핵심가치를 표시하는 미래지향적 마인드맵.
 *
 * - 중앙 글로우 오브
 * - 7개 키워드가 원형으로 배치
 * - SVG 점선 + 흐름 애니메이션
 * - 다크 사이버 테마 (그리드 + 그라디언트 배경)
 */

const KEYWORDS = [
  'AI',
  '로봇',
  '디지털트윈',
  '자율주행',
  '스마트시티',
  'VR/AR',
  '메이커융합',
];

interface Pos {
  x: number; // %
  y: number; // %
}

function buildPositions(n: number, radius: number): Pos[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2; // 12시 방향에서 시작
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });
}

export default function CoreValuesMindMap({ isKo }: { isKo: boolean }) {
  const positions = buildPositions(KEYWORDS.length, 38);

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-6 bg-[#070b1a]"
      aria-label={isKo ? '핵심 가치' : 'Core Values'}
    >
      {/* 사이버 그리드 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      {/* 빛 번짐 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.5) 0%, rgba(99,102,241,0.3) 40%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1170px] mx-auto text-center">
        {/* 헤더 */}
        <p className="text-sm md:text-base font-mono tracking-[0.4em] text-cyan-300/80 mb-3">
          CORE VALUES
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          {isKo ? '핵심 가치' : 'Core Values'}
        </h2>
        <p className="text-lg md:text-2xl font-medium text-cyan-200/90 mb-10 md:mb-14">
          {isKo
            ? '기술기반 미래인재육성'
            : 'Developing Future Talent Through Technology'}
        </p>

        {/* 마인드맵 컨테이너 */}
        <div className="relative mx-auto w-full max-w-[760px] aspect-square">
          {/* SVG 연결선 */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {positions.map((p, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="url(#line-grad)"
                strokeWidth="0.25"
                strokeDasharray="0.8 0.8"
                vectorEffect="non-scaling-stroke"
                className="mindmap-line"
              />
            ))}
          </svg>

          {/* 중앙 오브 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* 외부 펄스 링 */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full mindmap-pulse"
                style={{
                  background:
                    'radial-gradient(circle, rgba(34,211,238,0.45) 0%, transparent 70%)',
                }}
              />
              <div
                className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, #06b6d4 0%, #1e3a8a 60%, #0a0f24 100%)',
                  boxShadow:
                    '0 0 60px rgba(34,211,238,0.5), 0 0 120px rgba(99,102,241,0.4), inset 0 0 24px rgba(255,255,255,0.15)',
                  border: '1px solid rgba(34,211,238,0.6)',
                }}
              >
                <div className="text-center px-3">
                  <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-widest text-cyan-300 mb-1.5">
                    HANYANG · FUTURE
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                    {isKo ? '한양미래연구소' : 'Hanyang Future Lab'}
                  </p>
                  <p className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mt-1">
                    {isKo ? '핵심 가치' : 'CORE VALUES'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 키워드 노드 */}
          {KEYWORDS.map((label, i) => (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2 mindmap-node"
              style={{
                left: `${positions[i].x}%`,
                top: `${positions[i].y}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full backdrop-blur text-white font-bold text-sm sm:text-base md:text-lg whitespace-nowrap transition-all hover:scale-110 cursor-default"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.85))',
                  border: '1px solid rgba(34,211,238,0.5)',
                  boxShadow:
                    '0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(99,102,241,0.15)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mindmap-line {
          animation: lineFlow 8s linear infinite;
        }
        @keyframes lineFlow {
          to {
            stroke-dashoffset: -100;
          }
        }
        .mindmap-pulse {
          animation: pulseRing 3s ease-out infinite;
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .mindmap-node {
          animation: nodeFloat 4s ease-in-out infinite;
        }
        @keyframes nodeFloat {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
