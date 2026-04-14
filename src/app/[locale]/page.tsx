import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProgramPreview from '@/components/sections/ProgramPreview';
import TestimonialSection from '@/components/sections/TestimonialSection';
import PartnerSection from '@/components/sections/PartnerSection';

export const metadata: Metadata = {
  title: '한양미래연구소 | AI교육·로봇코딩·자율주행 No.1 체험교실',
  description:
    '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행자동차 체험교실. 찾아가는 체험교실, 캠프, 온라인 교육. 17,150명 참여.',
  keywords: [
    'AI교육',
    '로봇코딩',
    '자율주행',
    '체험교실',
    '코딩교육',
    'STEAM교육',
    '초등학생 AI',
    '중학생 코딩',
    '고등학생 캠프',
  ],
};

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
      <StatsSection />
      <ProgramPreview />
      <TestimonialSection />
      <PartnerSection />
    </>
  );
}
