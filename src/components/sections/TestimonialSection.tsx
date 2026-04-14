'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const reviewImages = [
  '/images/programs/detail/main/comming-class01_01.png',
  '/images/programs/detail/main/comming-class01_02.png',
  '/images/programs/detail/main/comming-class01_03.png',
  '/images/programs/detail/main/comming-class02_01.png',
  '/images/programs/detail/main/comming-class02_02.png',
  '/images/programs/detail/main/comming-class02_03.png',
];

export default function TestimonialSection() {
  const locale = useLocale();

  return (
    <section className="py-16 px-6 bg-gray-50" aria-label="YouTube 및 최신 후기">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: YouTube */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              교육을 받고 꿈이 생겼어요
            </h2>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/eBueNdGAvGg?rel=0&showinfo=0"
                title="한양미래연구소 교육 후기"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              &ldquo;이전에는 알지 못했던 분야를 배우며 새로운 꿈이 생겼습니다.
              교육 받기 전과 비교하면 인생이 바뀐 기분입니다!&rdquo;
            </p>
            <Link
              href={`/${locale}/board/reviews`}
              className="inline-block mt-3 text-sm text-primary font-semibold hover:underline"
            >
              자세히보기 &rarr;
            </Link>
          </div>

          {/* Right: Latest Reviews */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              최신 후기
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {reviewImages.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={src}
                    alt={`최신 후기 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/board/reviews`}
              className="inline-block mt-4 text-sm text-primary font-semibold hover:underline"
            >
              자세히보기 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
