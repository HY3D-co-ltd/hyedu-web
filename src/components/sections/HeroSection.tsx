'use client';

import Link from 'next/link';
import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';
import Slider from '@/components/ui/Slider';
import BoothPromoSlide from './BoothPromoSlide';

type Slide =
  | { type: 'image'; image: string; href: string | null }
  | { type: 'booth' };

const slides: Slide[] = [
  { type: 'image', image: '/images/slide/slide01.png', href: null },
  { type: 'booth' },
  { type: 'image', image: '/images/slide/slide02.png', href: '/camp' },
  { type: 'image', image: '/images/slide/slide03.png', href: '/programs' },
];

const BOOTH_PDF_URL = 'https://hyedu.kr/files/2026-booth-curriculum.pdf';

export default function HeroSection() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section aria-label={isKo ? '메인 배너' : 'Main banner'}>
      <Slider autoplay loop className="w-full">
        {slides.map((slide, index) => {
          if (slide.type === 'booth') {
            return (
              <a
                key={index}
                href={BOOTH_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={isKo ? '2026 체험부스 커리큘럼 PDF 다운로드' : '2026 Booth Curriculum PDF'}
              >
                <BoothPromoSlide isKo={isKo} />
              </a>
            );
          }

          const content = (
            <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
              <Image
                src={slide.image}
                alt={isKo ? `슬라이드 ${index + 1}` : `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          );

          if (slide.href) {
            return (
              <Link key={index} href={`/${locale}${slide.href}`} className="block">
                {content}
              </Link>
            );
          }
          return <div key={index}>{content}</div>;
        })}
      </Slider>
    </section>
  );
}
