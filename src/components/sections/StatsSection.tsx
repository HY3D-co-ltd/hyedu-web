'use client';

import Image from 'next/image';

export default function StatsSection() {
  const partnerImages = Array.from({ length: 42 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/images/partners/partner${num}.png`;
  });

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 원본 스타일: 컴팩트한 이미지 기반 통계 */}
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
            한양미래연구소는 지금까지 총 <span className="text-primary">17,150</span>명의 학생들과 함께했습니다.
          </h2>
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="text-center border border-gray-200 rounded-lg px-6 py-4">
              <p className="text-2xl md:text-3xl font-bold text-primary">17,150명</p>
              <p className="text-sm text-gray-500 mt-1">참여인원</p>
            </div>
            <div className="text-center border border-gray-200 rounded-lg px-6 py-4">
              <p className="text-2xl md:text-3xl font-bold text-primary">245개처</p>
              <p className="text-sm text-gray-500 mt-1">참여 학교 및 기관</p>
            </div>
          </div>
        </div>

        {/* Partner logos - 스크롤링 */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-3">
            {[...partnerImages, ...partnerImages].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-20 h-14 relative">
                <Image src={src} alt={`파트너 ${(i % 42) + 1}`} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
