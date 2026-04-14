import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { camps } from '@/data/camps';
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
        ? '캠프 | 한양청소년캠프·토요캠프·경진대회 대비 캠프'
        : 'Camps | Hanyang Youth Camp · Saturday Camp · Competition Camp',
    description:
      locale === 'ko'
        ? '한양미래연구소 캠프: 한양청소년캠프(단체), 토요캠프(개인), 경진대회 대비 캠프. 3D프린팅, STEAM, AI, IoT, 자율주행 등 다양한 캠프 프로그램.'
        : 'Hanyang Future Lab camps: Hanyang youth camp (group), Saturday camp (individual), competition prep camp. 3D printing, STEAM, AI, IoT, autonomous driving programs.',
    keywords:
      locale === 'ko'
        ? ['청소년 캠프', '한양청소년캠프', 'STEAM 캠프', 'AI 캠프', 'IoT 캠프', '3D프린팅 캠프', '경진대회 대비 캠프', '토요 캠프']
        : ['youth camp', 'STEAM camp', 'AI camp', 'IoT camp', '3D printing camp', 'competition camp'],
  };
}

const targetLabels: Record<string, { ko: string; en: string }> = {
  elementary: { ko: '초등학생', en: 'Elementary' },
  middle: { ko: '중학생', en: 'Middle School' },
  high: { ko: '고등학생', en: 'High School' },
};

const campTypeEmojis = ['🏕️', '🔬', '🚀', '🤖', '🧠', '💡', '📡', '🌱', '🎮'];

export default async function CampPage({
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
          { name: isKo ? '캠프' : 'Camps', href: `/${locale}/camp` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cyan-600 to-sky-500 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '캠프' : 'Camps'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '캠프' : 'Camps'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '몰입형 체험으로 성장하는 4차산업혁명 캠프 프로그램'
              : '4th Industrial Revolution immersive camp programs for growth'}
          </p>
        </div>
      </section>

      {/* 3 Camp types */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '캠프 유형' : 'Camp Types'}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {isKo ? '캠프 유형 안내' : 'Camp Types'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isKo
              ? '단체·개인·경진대회 대비 등 다양한 캠프 유형을 운영합니다'
              : 'We offer group, individual, and competition preparation camps'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏫',
                title: isKo ? '한양청소년 캠프' : 'Hanyang Youth Camp',
                subtitle: isKo ? '단체 캠프' : 'Group Camp',
                desc: isKo
                  ? '학교·기관 단체 대상 캠프 프로그램. 최소 25명 이상 신청.'
                  : 'Camp program for schools and institutions. Minimum 25 participants.',
                price: isKo ? '120,000원/일' : '₩120,000/day',
                detail: isKo ? '최소 25명 · 단체 신청' : 'Min. 25 people · Group application',
                color: 'from-cyan-50 to-sky-50 border-cyan-200',
                badge: 'bg-cyan-100 text-cyan-700',
              },
              {
                icon: '📅',
                title: isKo ? '토요캠프' : 'Saturday Camp',
                subtitle: isKo ? '개인 캠프' : 'Individual Camp',
                desc: isKo
                  ? '매주 토요일 운영되는 개인 신청 캠프. 네이버 예약을 통해 신청 가능.'
                  : 'Individual Saturday camp available weekly. Apply via Naver booking.',
                price: isKo ? '120,000원/일' : '₩120,000/day',
                detail: isKo ? '개인 신청 · 네이버 예약' : 'Individual · Naver Booking',
                color: 'from-sky-50 to-blue-50 border-sky-200',
                badge: 'bg-sky-100 text-sky-700',
              },
              {
                icon: '🏆',
                title: isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp',
                subtitle: isKo ? '대회 대비' : 'Competition Prep',
                desc: isKo
                  ? '코딩·로봇·STEAM 경진대회 대비를 위한 집중 훈련 캠프.'
                  : 'Intensive training camp for coding, robot, and STEAM competitions.',
                price: isKo ? '399,000원/4회' : '₩399,000 / 4 sessions',
                detail: isKo ? '4회 집중 과정' : '4-session intensive course',
                color: 'from-amber-50 to-orange-50 border-amber-200',
                badge: 'bg-amber-100 text-amber-700',
              },
            ].map((type) => (
              <div
                key={type.title}
                className={`rounded-2xl border bg-gradient-to-br ${type.color} p-6`}
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${type.badge}`}>
                  {type.subtitle}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{type.desc}</p>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-lg font-bold text-cyan-700 mb-1">{type.price}</div>
                  <div className="text-xs text-gray-500">{type.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camp programs grid */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '캠프 프로그램 목록' : 'Camp Programs'}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {isKo ? '캠프 프로그램' : 'Camp Programs'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isKo
              ? '다양한 4차산업혁명 기술을 체험하는 캠프 프로그램'
              : 'Camp programs for experiencing various 4th Industrial Revolution technologies'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp, index) => (
              <article
                key={camp.slug}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Thumbnail placeholder */}
                <div className="h-40 bg-gradient-to-br from-cyan-50 to-sky-100 flex items-center justify-center">
                  <span className="text-4xl">{campTypeEmojis[index] ?? '🏕️'}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isKo ? camp.title : camp.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {isKo ? camp.description : camp.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {camp.target.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                      >
                        {isKo ? targetLabels[t].ko : targetLabels[t].en}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-sm font-semibold text-cyan-600">{camp.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-cyan-600 to-sky-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '캠프 신청 문의' : 'Camp Inquiry'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {isKo
              ? '단체 캠프는 카카오톡 또는 전화로, 토요캠프는 네이버 예약으로 신청해 주세요.'
              : 'For group camps, contact us via KakaoTalk or phone. For Saturday camps, book via Naver.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-block bg-white text-cyan-700 font-bold px-8 py-3 rounded-full hover:bg-cyan-50 transition-colors duration-200"
            >
              {isKo ? '단체 문의하기' : 'Group Inquiry'}
            </a>
            <a
              href="https://booking.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-800 text-white font-bold px-8 py-3 rounded-full hover:bg-cyan-900 transition-colors duration-200"
            >
              {isKo ? '네이버 예약 (토요캠프)' : 'Naver Booking (Saturday)'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
