import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { specialLectures } from '@/data/special-lectures';
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
        ? '전문인 특강 | 4차산업혁명·기업가정신·스타트업 특강'
        : 'Special Lectures | 4th Revolution · Entrepreneurship · Startup',
    description:
      locale === 'ko'
        ? '한양미래연구소 전문인 특강: 4차산업혁명과 청소년 기업가정신 특강, 스타트업 CEO가 들려주는 창업 이야기. 60~120분 강연 프로그램.'
        : 'Hanyang Future Lab special lectures: 4th industrial revolution & youth entrepreneurship, startup CEO stories. 60–120 min lecture programs.',
    keywords:
      locale === 'ko'
        ? ['전문인 특강', '기업가정신 특강', '4차산업혁명 특강', '스타트업 특강', '청소년 특강']
        : ['special lecture', 'entrepreneurship lecture', '4th industrial revolution', 'startup lecture'],
  };
}

export default async function SpecialLecturePage({
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
          { name: isKo ? '전문인 특강' : 'Special Lectures', href: `/${locale}/special-lecture` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 to-violet-500 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '전문인 특강' : 'Special Lectures'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '전문인 특강' : 'Special Lectures'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '현장 전문가와 함께하는 실전 강연 프로그램'
              : 'Practical lecture programs with field experts'}
          </p>
        </div>
      </section>

      {/* Lecture sections */}
      {specialLectures.map((lecture, index) => (
        <section
          key={lecture.slug}
          className={`py-16 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          aria-label={isKo ? lecture.title : lecture.titleEn}
        >
          <div className="max-w-6xl mx-auto">
            {/* Lecture header */}
            <div className="flex flex-col md:flex-row gap-10 mb-14">
              {/* Info */}
              <div className="flex-1">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 mb-4">
                  {isKo ? '특강' : 'Lecture'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {isKo ? lecture.title : lecture.titleEn}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {isKo ? lecture.description : lecture.descriptionEn}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">T</span>
                    <div>
                      <div className="text-xs text-gray-400">{isKo ? '강연 시간' : 'Duration'}</div>
                      <div className="font-semibold">{lecture.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">₩</span>
                    <div>
                      <div className="text-xs text-gray-400">{isKo ? '참가비' : 'Price'}</div>
                      <div className="font-semibold">{lecture.price}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail placeholder */}
              <div className="md:w-64 lg:w-80 flex-shrink-0">
                <div className="w-full h-48 md:h-full min-h-[180px] rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                  <span className="text-5xl">🎤</span>
                </div>
              </div>
            </div>

            {/* Features grid */}
            {lecture.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {isKo ? '프로그램 구성' : 'Program Components'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lecture.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Image placeholder */}
                      <div className="w-full h-32 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center mb-4">
                        <span className="text-3xl">✨</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {isKo ? feature.title : feature.titleEn}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {isKo ? feature.description : feature.descriptionEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-600 to-violet-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '특강 신청 문의' : 'Lecture Inquiry'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {isKo
              ? '학교·기관 단체 신청은 카카오톡 또는 전화로 문의해 주세요.'
              : 'For school or group applications, contact us via KakaoTalk or phone.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:bg-purple-50 transition-colors duration-200"
          >
            {isKo ? '문의하기' : 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}
