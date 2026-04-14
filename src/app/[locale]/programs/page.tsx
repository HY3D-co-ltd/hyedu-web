import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProgramsClient from './ProgramsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '찾아가는 체험교실 | AI교육·로봇코딩·메이커교육'
        : 'Experience Classes | AI · Robot Coding · Maker',
    description:
      locale === 'ko'
        ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 3D프린팅, 드론, VR/AR 체험교실. 학교로 찾아가는 맞춤형 교육.'
        : 'AI, robot coding, autonomous driving, 3D printing, drone, VR/AR experience classes for K-12 students.',
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProgramsClient locale={locale} />;
}
