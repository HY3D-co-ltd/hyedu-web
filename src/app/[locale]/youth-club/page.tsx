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
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '청소년 동아리 | 로봇코딩·메이커·STEAM 동아리'
      : 'Youth Clubs | Robot Coding · Maker · STEAM Clubs',
    description: isKo
      ? '청소년 동아리 프로그램: 3D펜 디자이너, 3D프린터 모델링, VR 영상, 드론 농구, 자율주행자동차 동아리. 각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여 첨단 장비와 미래기술을 활용한 수준별 체험 프로그램.'
      : 'Youth club programs: 3D Pen Designer, 3D Printer Modeling, VR Video, Drone Basketball, Autonomous Driving. On-site visits to youth training centers, schools, and culture centers — leveled hands-on programs with advanced equipment and future technologies.',
    keywords: isKo
      ? ['청소년 동아리', '로봇코딩 동아리', '메이커 동아리', 'STEAM 동아리', '창업 동아리', '3D프린팅 동아리', '드론 동아리', 'VR 동아리']
      : ['youth club', 'robot coding club', 'maker club', 'STEAM club', 'startup club', '3D printing club', 'drone club', 'VR club'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

type Category = 'all' | 'maker' | 'coding' | 'steam' | 'startup';

interface ClubProgram {
  category: 'maker' | 'coding' | 'steam' | 'startup';
  categoryLabel: Bi;
  title: Bi;
  subtitle: Bi;
  target: Bi;
  output: Bi;
  price: Bi;
  image: string;
}

const programs: ClubProgram[] = [
  {
    category: 'maker',
    categoryLabel: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
    title: { ko: '3D펜 디자이너', en: '3D Pen Designer' },
    subtitle: {
      ko: 'Tinker CAD를 활용한 3D모델링 실습',
      en: 'Hands-on 3D modeling with TinkerCAD',
    },
    target: { ko: '초등/중등/고등/성인', en: 'Elementary / Middle / High / Adult' },
    output: { ko: '3D펜 창작품', en: '3D pen creation' },
    price: { ko: '1회기 1인 29,500원', en: 'KRW 29,500 per person per session' },
    image: '/images/programs/maker_activity_2_3d_pen.png',
  },
  {
    category: 'maker',
    categoryLabel: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
    title: { ko: '3D프린터 모델링 전문가', en: '3D Printer Modeling Expert' },
    subtitle: {
      ko: '4차산업혁명 직업 체험 교실',
      en: '4th Industrial Revolution career experience',
    },
    target: { ko: '초등/중등/고등/성인', en: 'Elementary / Middle / High / Adult' },
    output: { ko: '3D모델링 파일', en: '3D modeling file' },
    price: { ko: '1회기 1인 22,000원', en: 'KRW 22,000 per person per session' },
    image: '/images/programs/maker_activity_1_3d_printer.png',
  },
  {
    category: 'maker',
    categoryLabel: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
    title: { ko: 'VR 영상 디자이너', en: 'VR Video Designer' },
    subtitle: {
      ko: '4차산업혁명 직업 체험 교실',
      en: '4th Industrial Revolution career experience',
    },
    target: { ko: '초등/중등', en: 'Elementary / Middle' },
    output: { ko: 'VR 콘텐츠', en: 'VR content' },
    price: { ko: '1회기 1인 26,000원', en: 'KRW 26,000 per person per session' },
    image: '/images/programs/maker_activity_3_vr_movie.png',
  },
  {
    category: 'maker',
    categoryLabel: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
    title: { ko: '드론 농구 전문가', en: 'Drone Basketball Expert' },
    subtitle: {
      ko: '4차산업혁명 직업 체험 교실',
      en: '4th Industrial Revolution career experience',
    },
    target: { ko: '초등/중등/고등/성인', en: 'Elementary / Middle / High / Adult' },
    output: { ko: '-', en: '-' },
    price: { ko: '1회기 1인 28,500원', en: 'KRW 28,500 per person per session' },
    image: '/images/programs/maker_activity_5_drone_steam.png',
  },
  {
    category: 'coding',
    categoryLabel: { ko: '코딩 교육', en: 'Coding' },
    title: { ko: '자율주행자동차 엔지니어', en: 'Autonomous Driving Engineer' },
    subtitle: {
      ko: '4차산업혁명 직업 체험 교실',
      en: '4th Industrial Revolution career experience',
    },
    target: { ko: '중등/고등/성인', en: 'Middle / High / Adult' },
    output: { ko: '자율주행자동차 주행 알고리즘', en: 'Autonomous-driving algorithm' },
    price: { ko: '1회기 1인 30,000원', en: 'KRW 30,000 per person per session' },
    image: '/images/programs/maker_activity_7_autonomous_car.png',
  },
];

const categoryTabs: { key: Category; label: Bi }[] = [
  { key: 'all', label: { ko: 'ALL', en: 'ALL' } },
  { key: 'maker', label: { ko: '메이커 융합 교육', en: 'Maker Convergence' } },
  { key: 'coding', label: { ko: '코딩 교육', en: 'Coding' } },
  { key: 'steam', label: { ko: 'STEAM 교육', en: 'STEAM' } },
  { key: 'startup', label: { ko: '창업 교육', en: 'Entrepreneurship' } },
];

export default async function YouthClubPage({
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
          { name: isKo ? '청소년 동아리' : 'Youth Clubs', href: `/${locale}/youth-club` },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#f8f9fa] py-16 md:py-20 border-b border-gray-200">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isKo ? (
              <>
                청소년 동아리 <span className="text-point">(장회기)</span>
              </>
            ) : (
              <>
                Youth Clubs <span className="text-point">(Long-term)</span>
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            {isKo
              ? '각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여 첨단 장비와 미래기술을 활용한 수준별 체험 프로그램'
              : 'On-site visits to regional youth training centers, schools, and culture centers — leveled hands-on programs using advanced equipment and future technologies.'}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide" aria-label={isKo ? '프로그램 카테고리' : 'Program categories'}>
            {categoryTabs.map((tab) => (
              <span
                key={tab.key}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-default ${
                  tab.key === 'all'
                    ? 'bg-point text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {pick(tab.label, isKo)}
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
                key={program.title.ko}
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={pick(program.title, isKo)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-point text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pick(program.categoryLabel, isKo)}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {pick(program.title, isKo)}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {pick(program.subtitle, isKo)}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="text-gray-500 w-20 flex-shrink-0">
                        {isKo ? '대상' : 'Target'}
                      </span>
                      <span className="text-gray-800">{pick(program.target, isKo)}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-20 flex-shrink-0">
                        {isKo ? '산출물' : 'Output'}
                      </span>
                      <span className="text-gray-800">{pick(program.output, isKo)}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-20 flex-shrink-0">
                        {isKo ? '교육비용' : 'Fee'}
                      </span>
                      <span className="font-semibold text-point">{pick(program.price, isKo)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-point">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {isKo ? '교육 신청하기' : 'Apply'}
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
            {isKo
              ? '학교·기관 단체 신청은 카카오톡 또는 전화로 문의해 주세요.'
              : 'Group applications from schools and institutions: please inquire via KakaoTalk or phone.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-point font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors duration-200 text-base"
          >
            {isKo ? '교육 신청하기' : 'Apply'}
          </Link>
        </div>
      </section>
    </>
  );
}
