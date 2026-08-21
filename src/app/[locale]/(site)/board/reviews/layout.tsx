import type { Metadata } from 'next';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

/**
 * 후기 목록 페이지는 'use client' 컴포넌트라 generateMetadata를 직접 내보낼 수 없다
 * (generateMetadata는 서버 전용) → 라우트 layout에서 메타데이터를 제공한다.
 *
 * 이 layout이 없으면 [locale]/layout.tsx의 메타데이터를 그대로 상속받아
 * 홈페이지와 title·description·canonical이 전부 동일해진다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';

  return {
    alternates: buildAlternates(locale, 'board/reviews'),
    openGraph: buildOpenGraph(locale, 'board/reviews'),
    title: isKo
      ? '교육 후기 | 학교 체험교실·캠프 진행 사례 | 한양미래연구소'
      : 'Education Reviews | On-site Class & Camp Case Studies | Hanyang Future Lab',
    description: isKo
      ? '전국 초·중·고등학교에서 진행한 AI교육, 로봇코딩, 드론, VR/AR 체험교실 실제 진행 후기. 학교별 진행 내용과 현장 사진을 확인하세요.'
      : 'Real case studies of AI education, robot coding, drone, and VR/AR classes conducted at elementary, middle, and high schools nationwide.',
    keywords: isKo
      ? ['교육 후기', '진로체험 후기', '체험교실 사례', '학교 AI교육', '한양미래연구소 후기']
      : ['education reviews', 'career experience reviews', 'case studies', 'school AI education'],
  };
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
