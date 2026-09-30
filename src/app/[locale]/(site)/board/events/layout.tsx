import type { Metadata } from 'next';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

/**
 * 대회·행사 목록 페이지는 'use client' 컴포넌트라 generateMetadata를 직접
 * 내보낼 수 없다 → 라우트 layout에서 메타데이터를 제공한다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';

  return {
    alternates: buildAlternates(locale, 'board/events'),
    openGraph: buildOpenGraph(locale, 'board/events'),
    title: isKo
      ? '대회 & 행사 | 청소년 캠프·아이디어톤·메이커톤 | 한양미래연구소'
      : 'Events & Competitions | Youth Camps, Ideathons, Makerthons | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소가 주관·참여한 청소년 캠프, SW 창업 아이디어톤, 메이커톤, 경진대회 소식과 참가 안내.'
      : 'Youth camps, SW startup ideathons, makerthons, and competitions hosted or joined by Hanyang Future Lab.',
    keywords: isKo
      ? ['청소년 캠프', '아이디어톤', '메이커톤', '경진대회', 'SW 창업', '한양미래연구소 행사']
      : ['youth camp', 'ideathon', 'makerthon', 'competition', 'SW startup'],
  };
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
