import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { onlineCourses } from '@/data/online-courses';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { OnlineCourse } from '@/types';

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

const categoryLabels: Record<OnlineCourse['category'], { ko: string; en: string }> = {
  maker: { ko: '메이커 융합', en: 'Maker Convergence' },
  coding: { ko: '코딩', en: 'Coding' },
  special: { ko: '특강', en: 'Special Lectures' },
};

const typeLabels: Record<OnlineCourse['type'], { ko: string; en: string; color: string }> = {
  live: { ko: '실시간', en: 'Live', color: 'bg-blue-100 text-blue-700' },
  video: { ko: '영상', en: 'Video', color: 'bg-purple-100 text-purple-700' },
  both: { ko: '실시간+영상', en: 'Live+Video', color: 'bg-orange-100 text-orange-700' },
};

export default async function OnlinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const categories: OnlineCourse['category'][] = ['maker', 'coding', 'special'];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '온라인 교육' : 'Online Education', href: `/${locale}/online` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-500 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '온라인 교육' : 'Online Education'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '온라인 교육' : 'Online Education'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '언제 어디서든 배울 수 있는 한양미래연구소 온라인 프로그램'
              : 'Hanyang Future Lab online programs — learn anytime, anywhere'}
          </p>
        </div>
      </section>

      {/* Type legend */}
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
          {Object.entries(typeLabels).map(([key, val]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-sm font-semibold ${val.color}`}>
              {isKo ? val.ko : val.en}
            </span>
          ))}
        </div>
      </section>

      {/* Category sections */}
      {categories.map((category, sectionIndex) => {
        const coursesInCategory = onlineCourses.filter((c) => c.category === category);
        if (coursesInCategory.length === 0) return null;
        const label = categoryLabels[category];

        return (
          <section
            key={category}
            className={`py-16 px-6 ${sectionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            aria-label={isKo ? label.ko : label.en}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {isKo ? label.ko : label.en}
                </h2>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                  {coursesInCategory.length}{isKo ? '개' : ' courses'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesInCategory.map((course) => {
                  const typeInfo = typeLabels[course.type];
                  return (
                    <article
                      key={course.slug}
                      className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      {/* Thumbnail placeholder */}
                      <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <span className="text-4xl">💻</span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                            {isKo ? typeInfo.ko : typeInfo.en}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {isKo ? course.title : course.titleEn}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {isKo ? course.description : course.descriptionEn}
                        </p>

                        <div className="pt-3 border-t border-gray-100 space-y-1">
                          {course.priceLive && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{isKo ? '실시간' : 'Live'}</span>
                              <span className="font-semibold text-blue-600">{course.priceLive}</span>
                            </div>
                          )}
                          {course.priceVideo && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{isKo ? '영상' : 'Video'}</span>
                              <span className="font-semibold text-purple-600">{course.priceVideo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-indigo-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '온라인 수업 신청' : 'Enroll in Online Classes'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {isKo
              ? '카카오톡 또는 전화로 문의 후 신청하세요.'
              : 'Contact us via KakaoTalk or phone to apply.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-200"
          >
            {isKo ? '문의하기' : 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}
