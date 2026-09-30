import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/sections/HeroSection';
import QuickLinksAndPrograms from '@/components/sections/QuickLinksAndPrograms';
import AgeRecommendation from '@/components/sections/AgeRecommendation';
import NationwideNetwork from '@/components/sections/NationwideNetwork';
import OperationProcess from '@/components/sections/OperationProcess';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import RecommendSection from '@/components/sections/RecommendSection';
import FeatureSection from '@/components/sections/FeatureSection';
import ContactSection from '@/components/sections/ContactSection';
import MapSection from '@/components/sections/MapSection';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    alternates: buildAlternates(locale, ''),
    openGraph: buildOpenGraph(locale, ''),
    title: isKo
      ? '한양미래연구소 | AI교육·로봇코딩·자율주행 No.1 체험교실'
      : 'Hanyang Future Lab | AI · Robot Coding · Autonomous Driving — No.1 Experience Classes',
    description: isKo
      ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행자동차 체험교실. 찾아가는 체험교실, 캠프, 온라인 교육. 누적 참가자 4만명+.'
      : 'AI education, robot coding, and autonomous-driving experience classes for K-12 students. On-site classes, camps, and online programs. 40,000+ participants.',
    keywords: isKo
      ? ['AI교육', '로봇교육', '로봇코딩', '자율주행', '체험교실', '코딩교육', 'STEAM교육', '한양미래연구소', '청소년 캠프']
      : ['AI education', 'robot education', 'robot coding', 'autonomous driving', 'experience class', 'coding education', 'STEAM education', 'Hanyang Future Lab', 'youth camp'],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKoPage = locale === 'ko';

  return (
    <>
      {/*
        홈 히어로는 이미지 슬라이더라 화면에 텍스트 제목이 없어 H1이 존재하지 않았다.
        H1이 없으면 검색엔진이 이 문서의 주제를 판단할 근거를 잃으므로,
        디자인을 바꾸지 않으면서 스크린리더·크롤러에만 노출되는 H1을 둔다.
        (sr-only = 시각적으로 숨기되 접근성 트리에는 남기는 표준 패턴)
      */}
      <h1 className="sr-only">
        {isKoPage
          ? '한양미래연구소 — 초·중·고 AI교육, 로봇코딩, 자율주행 찾아가는 체험교실'
          : 'Hanyang Future Lab — AI Education, Robot Coding, and Autonomous Driving On-site Classes for K-12'}
      </h1>
      <HeroSection />
      <QuickLinksAndPrograms />
      <AgeRecommendation />
      <NationwideNetwork />
      <OperationProcess />
      <StatsSection />
      <TestimonialSection />
      <RecommendSection />
      <FeatureSection />
      <ContactSection />
      <MapSection />
    </>
  );
}
