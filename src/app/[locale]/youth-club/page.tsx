import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { youthClubs } from '@/data/youth-clubs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { YouthClub } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '청소년 동아리 | 로봇코딩·메이커·STEAM 동아리'
        : 'Youth Clubs | Robot Coding · Maker · STEAM Clubs',
    description:
      locale === 'ko'
        ? '청소년 동아리 프로그램: 3D펜 디자이너, 3D프린터 모델링, VR 영상, 드론 농구, 자율주행자동차 동아리. 중·고등학생 대상 창의융합 동아리 교육.'
        : 'Youth club programs: 3D pen designer, 3D printer modeling, VR video, drone basketball, autonomous driving clubs for middle and high school students.',
    keywords:
      locale === 'ko'
        ? ['청소년 동아리', '로봇코딩 동아리', '메이커 동아리', 'STEAM 동아리', '창업 동아리', '3D프린팅 동아리', '드론 동아리', 'VR 동아리']
        : ['youth club', 'robot coding club', 'maker club', 'STEAM club', 'startup club'],
  };
}

const categoryLabels: Record<YouthClub['category'], { ko: string; en: string }> = {
  maker: { ko: '메이커', en: 'Maker' },
  coding: { ko: '코딩', en: 'Coding' },
  steam: { ko: 'STEAM', en: 'STEAM' },
  startup: { ko: '창업', en: 'Startup' },
};

const targetLabels: Record<string, { ko: string; en: string }> = {
  elementary: { ko: '초등학생', en: 'Elementary' },
  middle: { ko: '중학생', en: 'Middle School' },
  high: { ko: '고등학생', en: 'High School' },
};

export default async function YouthClubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const categories: YouthClub['category'][] = ['maker', 'coding', 'steam', 'startup'];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '청소년 동아리' : 'Youth Clubs', href: `/${locale}/youth-club` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-teal-500 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '청소년 동아리' : 'Youth Clubs'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '청소년 동아리' : 'Youth Club Programs'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '창의·융합·도전으로 성장하는 청소년 동아리 프로그램'
              : 'Youth club programs for creative, convergent, and challenging growth'}
          </p>
        </div>
      </section>

      {/* Category sections */}
      {categories.map((category) => {
        const clubsInCategory = youthClubs.filter((c) => c.category === category);
        if (clubsInCategory.length === 0) return null;
        const label = categoryLabels[category];

        return (
          <section
            key={category}
            className="py-16 px-6 even:bg-gray-50 odd:bg-white"
            aria-label={isKo ? label.ko : label.en}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {isKo ? label.ko : label.en}
                </h2>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">
                  {clubsInCategory.length}{isKo ? '개' : ' programs'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubsInCategory.map((club) => (
                  <article
                    key={club.slug}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <span className="text-4xl">🔬</span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {isKo ? label.ko : label.en}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {isKo ? club.title : club.titleEn}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {isKo ? club.description : club.descriptionEn}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {club.target.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                          >
                            {isKo ? targetLabels[t].ko : targetLabels[t].en}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <span className="text-sm font-semibold text-emerald-600">{club.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-600 to-teal-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '동아리 신청 문의' : 'Club Inquiry'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {isKo
              ? '학교·기관 단체 신청은 카카오톡 또는 전화로 문의해 주세요.'
              : 'For group applications from schools or institutions, contact us via KakaoTalk or phone.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors duration-200"
          >
            {isKo ? '문의하기' : 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}
