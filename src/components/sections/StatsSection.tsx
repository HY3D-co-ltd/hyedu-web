'use client';

import Image from 'next/image';

export default function StatsSection() {
  const partnerImages = Array.from({ length: 42 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/images/partners/partner${num}.png`;
  });

  return (
    <section className="py-16 px-6 bg-white" aria-label="통계 및 파트너">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-10">
          한양미래연구소는 지금까지 총{' '}
          <span className="text-primary">17,150명</span>의 학생들과 함께했습니다.
        </h2>

        {/* Stats */}
        <div className="flex justify-center gap-16 mb-12">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">17,150명</p>
            <p className="text-base md:text-lg text-gray-600 font-medium">참여인원</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">245개처</p>
            <p className="text-base md:text-lg text-gray-600 font-medium">참여 학교 및 기관</p>
          </div>
        </div>

        {/* Partner logos scrolling */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-4">
            {[...partnerImages, ...partnerImages].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-16 md:w-28 md:h-20 relative"
              >
                <Image
                  src={src}
                  alt={`파트너 ${(i % 42) + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
