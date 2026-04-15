'use client';

import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';

export default function StatsSection() {
  const isKo = useLocale() === 'ko';
  const partnerImages = Array.from({ length: 42 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/images/partners/partner${num}.png`;
  });

  return (
    <section className="py-12 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* Title + stats */}
        <div className="text-center mb-8">
          <h2 className="text-[40px] font-bold text-gray-900 mb-6">
            {isKo ? (
              <>
                한양미래연구소는 지금까지 총 <span className="text-point">17,150</span>명의 학생들과 함께했습니다.
              </>
            ) : (
              <>
                Hanyang Future Lab has worked with a total of <span className="text-point">17,150</span> students so far.
              </>
            )}
          </h2>
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="text-center border border-gray-200 rounded-lg px-6 py-4">
              <p className="text-3xl md:text-4xl font-bold text-point">
                {isKo ? '17,150명' : '17,150'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isKo ? '참여인원' : 'Participants'}
              </p>
            </div>
            <div className="text-center border border-gray-200 rounded-lg px-6 py-4">
              <p className="text-3xl md:text-4xl font-bold text-point">
                {isKo ? '245개 단체' : '245 Partners'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isKo ? '참여 학교 및 기관' : 'Partner Schools & Institutions'}
              </p>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-[30px] bg-[#e8f5e9] rounded-lg p-6">
          {partnerImages.map((src, i) => (
            <div key={i} className="relative h-14 flex items-center justify-center">
              <Image
                src={src}
                alt={isKo ? `파트너 ${i + 1}` : `Partner ${i + 1}`}
                width={120}
                height={56}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
