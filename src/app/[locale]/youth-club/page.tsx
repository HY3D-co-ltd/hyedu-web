import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: '청소년 동아리 | 로봇코딩·메이커·STEAM 동아리',
    description:
      '청소년 동아리 프로그램: 3D펜 디자이너, 3D프린터 모델링, VR 영상, 드론 농구, 자율주행자동차 동아리. 각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여 첨단 장비와 미래기술을 활용한 수준별 체험 프로그램.',
    keywords: [
      '청소년 동아리',
      '로봇코딩 동아리',
      '메이커 동아리',
      'STEAM 동아리',
      '창업 동아리',
      '3D프린팅 동아리',
      '드론 동아리',
      'VR 동아리',
    ],
  };
}

type Category = 'all' | 'maker' | 'coding' | 'steam' | 'startup';

interface ClubProgram {
  category: 'maker' | 'coding' | 'steam' | 'startup';
  categoryLabel: string;
  title: string;
  subtitle: string;
  target: string;
  output: string;
  price: string;
  image: string;
}

const programs: ClubProgram[] = [
  {
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    title: '3D펜 디자이너',
    subtitle: 'Tinker CAD를 활용한 3D모델링 실습',
    target: '초등/중등/고등/성인',
    output: '3D펜 창작품',
    price: '1회기 1인 29,500원',
    image: '/images/programs/maker_activity_2_3d_pen.png',
  },
  {
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    title: '3D프린터 모델링 전문가',
    subtitle: '4차산업혁명 직업 체험 교실',
    target: '초등/중등/고등/성인',
    output: '3D모델링 파일',
    price: '1회기 1인 22,000원',
    image: '/images/programs/maker_activity_1_3d_printer.png',
  },
  {
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    title: 'VR 영상 디자이너',
    subtitle: '4차산업혁명 직업 체험 교실',
    target: '초등/중등',
    output: 'VR 콘텐츠',
    price: '1회기 1인 26,000원',
    image: '/images/programs/maker_activity_3_vr_movie.png',
  },
  {
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    title: '드론 농구 전문가',
    subtitle: '4차산업혁명 직업 체험 교실',
    target: '초등/중등/고등/성인',
    output: '-',
    price: '1회기 1인 28,500원',
    image: '/images/programs/maker_activity_5_drone_steam.png',
  },
  {
    category: 'coding',
    categoryLabel: '코딩 교육',
    title: '자율주행자동차 엔지니어',
    subtitle: '4차산업혁명 직업 체험 교실',
    target: '중등/고등/성인',
    output: '자율주행자동차 주행 알고리즘',
    price: '1회기 1인 30,000원',
    image: '/images/programs/maker_activity_7_autonomous_car.png',
  },
];

const categoryTabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'maker', label: '메이커 융합 교육' },
  { key: 'coding', label: '코딩 교육' },
  { key: 'steam', label: 'STEAM 교육' },
  { key: 'startup', label: '창업 교육' },
];

export default async function YouthClubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: `/${locale}` },
          { name: '청소년 동아리', href: `/${locale}/youth-club` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-[#f8f9fa] py-16 md:py-20 border-b border-gray-200">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            청소년 동아리 <span className="text-point">(장회기)</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여
            첨단 장비와 미래기술을 활용한 수준별 체험 프로그램
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide" aria-label="프로그램 카테고리">
            {categoryTabs.map((tab) => (
              <span
                key={tab.key}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-default ${
                  tab.key === 'all'
                    ? 'bg-point text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </span>
            ))}
          </nav>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program) => (
              <article
                key={program.title}
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-point text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {program.categoryLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {program.subtitle}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">대상</span>
                      <span className="text-gray-800">{program.target}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">산출물</span>
                      <span className="text-gray-800">{program.output}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">교육비용</span>
                      <span className="font-semibold text-point">{program.price}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-point">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            교육 신청하기
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
            학교·기관 단체 신청은 카카오톡 또는 전화로 문의해 주세요.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-point font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors duration-200 text-base"
          >
            교육 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}
