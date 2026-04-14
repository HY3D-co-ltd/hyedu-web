import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
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
        ? '온라인 교육 | AI·코딩·메이커 온라인 수업'
        : 'Online Education | AI · Coding · Maker Online Classes',
    description:
      locale === 'ko'
        ? '한양미래연구소 온라인 교육: 3D프린팅, 3D펜, 초음파 로봇, 메타버스, 4차산업혁명 특강. 실시간·영상·실시간+영상 수업 제공.'
        : 'Hanyang Future Lab online education: 3D printing, 3D pen, ultrasonic robot, metaverse, 4th industrial revolution. Live, video, and combined online classes.',
    keywords:
      locale === 'ko'
        ? ['온라인 교육', 'AI 온라인 수업', '메이커 온라인', '코딩 온라인', '3D프린팅 온라인', '메타버스 교육']
        : ['online education', 'AI online class', 'maker online', 'coding online', '3D printing online'],
  };
}

type Category = 'all' | 'maker' | 'coding' | 'special';

interface CourseItem {
  title: string;
  category: Category;
  categoryLabel: string;
  target: string;
  deliverable: string;
  priceLive?: string;
  priceVideo?: string;
  priceNote?: string;
  image: string;
}

const courses: CourseItem[] = [
  {
    title: '3D프린팅 전문가',
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    target: '초등/중등/고등',
    deliverable: '3D모델링 파일',
    priceLive: '실시간 1인 22,000원',
    priceVideo: '동영상 1인 20,000원',
    image: '/images/online/maker_activity_1_3d_printer.png',
  },
  {
    title: '3D펜 디자이너',
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    target: '초등/중등/고등',
    deliverable: '3D펜, 3D펜 창작품',
    priceVideo: '동영상 제공 1인 20,000원',
    priceNote: '(3D 펜 재료비 20,000원 별도)',
    image: '/images/online/maker_activity_2_3d_pen.png',
  },
  {
    title: '초음파 센서로 "로봇 쓰레기통" 만들기',
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    target: '초등/중등',
    deliverable: '로봇 쓰레기통',
    priceLive: '실시간 1인 30,000원',
    priceVideo: '동영상 제공 1인 25,000원',
    image: '/images/online/online_maker03.png',
  },
  {
    title: '적외선 센서로 "강아지 자동차" 만들기',
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    target: '초등/중등',
    deliverable: '강아지 자동차',
    priceLive: '실시간 1인 25,000원',
    priceVideo: '동영상 1인 22,000원',
    image: '/images/online/online_maker04.png',
  },
  {
    title: '"블루투스 스피커" 만들기',
    category: 'maker',
    categoryLabel: '메이커 융합 교육',
    target: '초등/중등',
    deliverable: '블루투스 스피커',
    priceLive: '실시간 1인 27,000원',
    priceVideo: '동영상 제공 1인 22,000원',
    image: '/images/online/online_maker05.png',
  },
  {
    title: '메타버스의 이해와 제페토 체험',
    category: 'coding',
    categoryLabel: '코딩 교육',
    target: '초등/중등/고등/성인',
    deliverable: '자신만의 메타버스 콘텐츠',
    priceLive: '실시간 1인 25,000원',
    image: '/images/online/online_coding07.png',
  },
  {
    title: '4차 산업혁명과 청소년 기업가정신',
    category: 'special',
    categoryLabel: '특강',
    target: '초등/중등/고등',
    deliverable: '',
    priceLive: '실시간 1인 22,000원',
    priceVideo: '동영상 1인 20,000원',
    image: '/images/online/online_special01.png',
  },
];

const filterTabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'maker', label: '메이커 융합 교육' },
  { key: 'coding', label: '코딩 교육' },
  { key: 'special', label: '특강' },
];

export default async function OnlinePage({
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
          { name: '온라인 교육', href: `/${locale}/online` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-point py-16 md:py-20 text-white text-center">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Online Education
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            온라인 교육 (실시간/영상강의)
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4 text-center">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            인공지능, 메타버스, 3D프린팅 등 4차산업혁명 핵심 기술을
            <br className="hidden md:block" />
            시간과 장소의 제약 없이 최신 미래기술을 쉽고 재미있게 배우는 온라인 교육 프로그램
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 pb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  tab.key === 'all'
                    ? 'bg-point text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-point hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, index) => (
              <article
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-point/10 text-point mb-3">
                    {course.categoryLabel}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                    {course.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-800">대상:</span>{' '}
                      {course.target}
                    </p>
                    {course.deliverable && (
                      <p>
                        <span className="font-semibold text-gray-800">결과물:</span>{' '}
                        {course.deliverable}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1 text-sm">
                    {course.priceLive && (
                      <p className="text-point font-semibold">
                        {course.priceLive}
                      </p>
                    )}
                    {course.priceVideo && (
                      <p className="text-point font-semibold">
                        {course.priceVideo}
                      </p>
                    )}
                    {course.priceNote && (
                      <p className="text-red-500 text-xs mt-1">
                        {course.priceNote}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
