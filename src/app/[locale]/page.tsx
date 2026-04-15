import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/sections/HeroSection';
import QuickLinksAndPrograms from '@/components/sections/QuickLinksAndPrograms';
import AgeRecommendation from '@/components/sections/AgeRecommendation';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import RecommendSection from '@/components/sections/RecommendSection';
import FeatureSection from '@/components/sections/FeatureSection';
import ContactSection from '@/components/sections/ContactSection';
import MapSection from '@/components/sections/MapSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '한양미래연구소 | AI교육·로봇코딩·자율주행 No.1 체험교실'
      : 'Hanyang Future Lab | AI · Robot Coding · Autonomous Driving — No.1 Experience Classes',
    description: isKo
      ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행자동차 체험교실. 찾아가는 체험교실, 캠프, 온라인 교육. 17,150명 참여.'
      : 'AI education, robot coding, and autonomous-driving experience classes for K-12 students. On-site classes, camps, and online programs. 17,150 participants.',
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

  return (
    <>
      <HeroSection />
      <QuickLinksAndPrograms />
      <AgeRecommendation />
      <StatsSection />
      <TestimonialSection />
      <RecommendSection />
      <FeatureSection />
      <ContactSection />
      <MapSection />
    </>
  );
}
