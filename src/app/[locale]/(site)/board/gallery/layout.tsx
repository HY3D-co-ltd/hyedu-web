import type { Metadata } from 'next';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

/**
 * 갤러리 페이지는 'use client' 컴포넌트라 generateMetadata를 직접 내보낼 수 없다
 * → 라우트 layout에서 메타데이터를 제공한다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';

  return {
    alternates: buildAlternates(locale, 'board/gallery'),
    openGraph: buildOpenGraph(locale, 'board/gallery'),
    title: isKo
      ? '이미지 갤러리 | 교육 현장 사진 | 한양미래연구소'
      : 'Photo Gallery | Education Field Photos | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소 AI교육, 로봇코딩, 드론, VR/AR 체험교실과 청소년 캠프 현장 사진 모음.'
      : 'Photo collection from AI education, robot coding, drone, VR/AR classes and youth camps.',
    keywords: isKo
      ? ['교육 현장 사진', '체험교실 갤러리', '청소년 캠프 사진', '한양미래연구소']
      : ['education photos', 'class gallery', 'youth camp photos'],
  };
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
