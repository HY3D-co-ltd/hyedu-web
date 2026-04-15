'use client';

import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';

export default function BackgroundSection() {
  const isKo = useLocale() === 'ko';
  return (
    <section className="relative w-full" aria-label={isKo ? '배경 이미지' : 'Background image'}>
      <div className="relative w-full aspect-[16/4]">
        <Image
          src="/images/main/sec03bg.png"
          alt={isKo ? '한양미래연구소 배경' : 'Hanyang Future Lab background'}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
