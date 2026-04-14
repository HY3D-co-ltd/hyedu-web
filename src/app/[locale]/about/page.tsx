import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { history } from '@/data/history';
import { partners } from '@/data/partners';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '한양미래연구소 소개 | AI교육·로봇코딩 전문 교육기관'
        : 'About Hanyang Future Lab | AI & Robot Coding Education',
    description:
      locale === 'ko'
        ? '한양미래연구소는 초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, STEAM교육 전문 기관입니다. 17,150명 참여, 245개 학교 협력.'
        : 'Hanyang Future Lab specializes in AI, robot coding, autonomous driving, and STEAM education for K-12 students.',
  };
}

const features = [
  {
    emoji: '🎯',
    title: '맞춤형 교육',
    titleEn: 'Customized Education',
    description: '연령과 회기수에 맞춘 기획/운영',
    descriptionEn: 'Planned by age and session count',
  },
  {
    emoji: '📚',
    title: '교육의 다양성',
    titleEn: 'Educational Diversity',
    description: '코딩, 메이커, STEAM, 인공지능, 특강',
    descriptionEn: 'Coding, Maker, STEAM, AI, Lectures',
  },
  {
    emoji: '👨‍🏫',
    title: '베테랑 강사진',
    titleEn: 'Veteran Instructors',
    description: '경력 3년 이상 전문 강사',
    descriptionEn: '3+ years experienced professionals',
  },
  {
    emoji: '🔭',
    title: '기술직업 체험교육',
    titleEn: 'Tech Career Experience',
    description: '미래 유망 직업 탐색',
    descriptionEn: 'Exploring promising future careers',
  },
  {
    emoji: '🧩',
    title: 'PBL 수업',
    titleEn: 'PBL Classes',
    description: '문제해결 역량 강화',
    descriptionEn: 'Problem-solving capacity building',
  },
  {
    emoji: '🤝',
    title: '협동하며 문제해결',
    titleEn: 'Collaborative Problem Solving',
    description: '상호작용을 통한 배려와 존중',
    descriptionEn: 'Respect through interaction',
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '소개' : 'About', href: `/${locale}/about` },
        ]}
      />

      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '한양미래연구소' : 'Hanyang Future Lab'}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            {isKo
              ? '한 사람의 인생을 바꾸는 교육을 제공합니다'
              : 'Education that changes one person\'s life'}
          </p>
        </div>
      </section>

      {/* 2. 4차산업기술교육의 6가지 특징 */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '6가지 특징' : '6 Features'}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            {isKo ? '4차산업기술교육의 6가지 특징' : '6 Features of 4th Industrial Education'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isKo
              ? '한양미래연구소만의 차별화된 교육 방식'
              : 'Our differentiated approach to education'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isKo ? feature.title : feature.titleEn}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isKo ? feature.description : feature.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 연혁 (History) */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '연혁' : 'History'}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            {isKo ? '연혁' : 'History'}
          </h2>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

            <div className="space-y-10">
              {history.map((item) => (
                <div key={item.year} className="flex flex-col md:flex-row gap-6">
                  {/* Year */}
                  <div className="md:w-40 flex-shrink-0 flex md:justify-end items-start">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                  </div>
                  {/* Events */}
                  <div className="flex-1 md:pl-10 relative">
                    {/* Dot on timeline */}
                    <div className="hidden md:block absolute -left-[1.65rem] top-2 w-3 h-3 rounded-full bg-primary border-2 border-white shadow" />
                    <ul className="space-y-2">
                      {item.events.map((event) => (
                        <li key={event.title} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          <span>{isKo ? event.title : event.titleEn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 협력 기관 (Partners) */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '협력 기관' : 'Partners'}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {isKo ? '협력 기관' : 'Partners'}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center rounded-lg border border-gray-200 px-2 py-3 text-xs md:text-sm text-gray-600 font-medium text-center hover:border-primary hover:text-primary transition-colors duration-200"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
