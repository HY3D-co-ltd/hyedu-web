'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const reviewRow1 = [
  { image: '/images/programs/detail/main/comming-class01_01.png', alt: '전북유니텍', href: '/board/reviews' },
  { image: '/images/programs/detail/main/comming-class01_02.png', alt: '진성고', href: '/board/reviews' },
  { image: '/images/programs/detail/main/comming-class01_03.png', alt: '서문여고', href: '/board/reviews' },
];

const reviewRow2 = [
  { image: '/images/programs/detail/main/comming-class02_01.png', alt: '9가지 체험', href: 'https://blog.naver.com/hyhyedu/223515904796' },
  { image: '/images/programs/detail/main/comming-class02_02.png', alt: 'VR 디자이너', href: 'https://blog.naver.com/hyhyedu/223514634459' },
  { image: '/images/programs/detail/main/comming-class02_03.png', alt: '빅데이터', href: 'https://blog.naver.com/hyhyedu/223514508319' },
];

export default function TestimonialSection() {
  const locale = useLocale();

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* YouTube + Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-[40px] mx-0 md:mx-[100px]">
          {/* Left: YouTube */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">교육을 받고 꿈이 생겼어요</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.youtube.com/embed/eBueNdGAvGg?rel=0&showinfo=0"
                title="한양미래연구소 교육 후기"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              &ldquo;이전에는 알지 못했던 분야를 배우며 새로운 꿈이 생겼습니다. 교육 받기 전과 비교하면 인생이 바뀐 기분입니다!&rdquo;
            </p>
            <Link href={`/${locale}/board/reviews`} className="inline-block mt-2 text-sm text-point font-semibold hover:underline">
              더보기 &rarr;
            </Link>
          </div>

          {/* Right: Latest Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">최신 후기</h2>
            </div>
            <p className="text-sm text-gray-500 mb-3">한양미래연구소는 아이들의 꿈을 보육하며 인생을 바꿀 수 있는 체험교육을 제공합니다</p>

            {/* Row 1 - comming-class-wrap */}
            <div className="grid grid-cols-3 mb-2">
              {reviewRow1.map((item, i) => (
                <Link key={i} href={`/${locale}${item.href}`} className="overflow-hidden hover:opacity-80 transition-opacity">
                  <Image src={item.image} alt={item.alt} width={300} height={300} className="w-full object-contain" />
                </Link>
              ))}
            </div>
            <div className="text-right mb-3">
              <Link href={`/${locale}/board/reviews`} className="text-xs text-point hover:underline">자세히보기 &rarr;</Link>
            </div>

            {/* Row 2 - comming-class-wrap */}
            <div className="grid grid-cols-3 mb-2">
              {reviewRow2.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="overflow-hidden hover:opacity-80 transition-opacity">
                  <Image src={item.image} alt={item.alt} width={300} height={300} className="w-full object-contain" />
                </a>
              ))}
            </div>
            <div className="text-right">
              <a href="https://blog.naver.com/hyhyedu" target="_blank" rel="noopener noreferrer" className="text-xs text-point hover:underline">자세히보기 &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
