'use client';

import { useLocale } from 'next-intl';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';

const slides = [
  {
    gradient: 'from-blue-900 via-blue-700 to-indigo-800',
    backgroundImage: '/images/programs/detail/main/main-pro01.png',
    title: '한 사람의 인생을 바꾸는 교육',
    subtitle: 'AI 인공지능 · 로봇코딩 · 자율주행 분야의 최고 수준 체험 교육으로 미래를 준비하세요.',
    ctaLabel: '프로그램 보기',
    ctaHref: '/programs',
  },
  {
    gradient: 'from-green-900 via-green-700 to-teal-700',
    backgroundImage: '/images/programs/detail/main/main-pro02.png',
    title: '찾아가는 체험교실',
    subtitle: '학교와 기관으로 직접 찾아가는 현장 밀착형 교육. 이동 없이 최고의 체험 수업을 받아보세요.',
    ctaLabel: '체험교실 신청',
    ctaHref: '/programs',
  },
  {
    gradient: 'from-orange-800 via-orange-600 to-amber-600',
    backgroundImage: '/images/programs/detail/main/main-pro03.png',
    title: '한양 캠프',
    subtitle: '방학 특별 캠프로 AI · 로봇 · 자율주행을 집중 탐구하는 특별한 경험을 만들어 드립니다.',
    ctaLabel: '캠프 알아보기',
    ctaHref: '/camp',
  },
];

export default function HeroSection() {
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <section aria-label="메인 배너">
      <Slider autoplay loop className="w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center min-h-[500px] md:min-h-[600px] bg-gradient-to-br ${slide.gradient}`}
          >
            {/* Background image */}
            {slide.backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              />
            )}
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl mb-8 text-white/85 max-w-xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
              <Button href={buildHref(slide.ctaHref)} variant="secondary" size="lg">
                {slide.ctaLabel}
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
