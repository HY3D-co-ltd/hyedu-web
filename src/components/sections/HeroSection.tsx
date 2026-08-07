'use client';

import Link from 'next/link';
import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';
import Slider from '@/components/ui/Slider';
import BoothPromoSlide from './BoothPromoSlide';
import YouthCampPromoSlide from './YouthCampPromoSlide';

type Slide =
  | { type: 'image'; image: string; href: string | null; external?: boolean; aspect?: string }
  | { type: 'booth' }
  | { type: 'camp' };

const KAKAO_URL = 'https://pf.kakao.com/_fxbVcs';

const slides: Slide[] = [
  { type: 'image', image: '/images/slide/slide01.png', href: null },
  { type: 'booth' },
  { type: 'camp' },
  // 포스터 원본 비율 1672x941 ≈ 16:9 — 원본 그대로 노출 (신청하기 버튼까지)
  { type: 'image', image: '/images/slide/popular-robot-camp.png', href: KAKAO_URL, external: true, aspect: 'aspect-[1672/941]' },
];

const BOOTH_PDF_URL = 'https://hyedu.kr/files/2026-booth-curriculum.pdf';
const CAMP_PDF_URL = 'https://hyedu.kr/files/2026-youth-camp-curriculum.pdf';

export default function HeroSection() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section aria-label={isKo ? '메인 배너' : 'Main banner'}>
      <Slider autoplay loop autoHeight className="w-full">
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

          if (slide.type === 'camp') {
            return (
              <a
                key={index}
                href={CAMP_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={isKo ? '2026 한양 청소년 캠프 커리큘럼 PDF 다운로드' : '2026 Youth Camp Curriculum PDF'}
              >
                <YouthCampPromoSlide isKo={isKo} />
              </a>
            );
          }

          const aspectClass = slide.aspect ?? 'aspect-[16/6] md:aspect-[16/5]';
          const content = (
            <div className={`relative w-full ${aspectClass}`}>
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
            if (slide.external) {
              return (
                <a
                  key={index}
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={isKo ? '인기 프로그램 신청하기 (카카오톡 채널)' : 'Apply via KakaoTalk channel'}
                >
                  {content}
                </a>
              );
            }
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
