'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Slider from '@/components/ui/Slider';

const slides = [
  { image: '/images/slide/slide01.png', href: null },
  { image: '/images/slide/slide02.png', href: '/camp' },
  { image: '/images/slide/slide03.png', href: '/programs' },
];

export default function HeroSection() {
  const locale = useLocale();

  return (
    <section aria-label="메인 배너">
      <Slider autoplay loop className="w-full">
        {slides.map((slide, index) => {
          const content = (
            <div key={index} className="relative w-full aspect-[16/6] md:aspect-[16/5]">
              <Image
                src={slide.image}
                alt={`슬라이드 ${index + 1}`}
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
          return content;
        })}
      </Slider>
    </section>
  );
}
