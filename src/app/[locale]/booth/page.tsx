import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { booths } from '@/data/booths';
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
        ? '창의체험 부스 | 3D프린팅·VR·AR·드론·로봇 체험 부스'
        : 'Creative Experience Booths | 3D Printing · VR · AR · Drone · Robot',
    description:
      locale === 'ko'
        ? '한양미래연구소 창의체험 부스: 3D프린팅, 3D펜, VR, AR, 드론, 로봇코딩, 자율주행 체험 부스. 축제·행사·박람회 출장 운영. 200만원부터.'
        : 'Hanyang Future Lab experience booths: 3D printing, 3D pen, VR, AR, drone, robot coding, autonomous driving booths. On-site booth operation for festivals, events, and fairs. From 2,000,000 KRW.',
    keywords:
      locale === 'ko'
        ? ['창의체험 부스', '3D프린팅 부스', 'VR 부스', 'AR 부스', '드론 부스', '로봇 부스', '체험 부스 운영']
        : ['experience booth', '3D printing booth', 'VR booth', 'AR booth', 'drone booth', 'robot booth'],
  };
}

export default async function BoothPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const boothEmojis = ['🖨️', '✏️', '🥽', '📱', '🚁', '🤖', '🚗'];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '창의체험 부스' : 'Experience Booths', href: `/${locale}/booth` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 to-amber-400 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '창의체험 부스' : 'Creative Experience Booths'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '창의체험 부스' : 'Creative Experience Booths'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '축제·행사·박람회에서 만나는 첨단 기술 체험 부스'
              : 'Cutting-edge technology experience booths for festivals, events, and fairs'}
          </p>
        </div>
      </section>

      {/* Booth grid */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '체험 부스 목록' : 'Booth List'}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {isKo ? '운영 부스 목록' : 'Available Booths'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isKo
              ? '총 7종의 창의체험 부스를 운영합니다'
              : 'We operate 7 types of creative experience booths'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {booths.map((booth, index) => (
              <article
                key={booth.slug}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Thumbnail placeholder */}
                <div className="h-44 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                  <span className="text-5xl">{boothEmojis[index] ?? '🎪'}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isKo ? booth.title : booth.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isKo ? booth.description : booth.descriptionEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Price info */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '부스 운영 안내' : 'Booth Operation Info'}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            {isKo ? '부스 운영 안내' : 'Booth Operation Info'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: '💰',
                title: isKo ? '운영 비용' : 'Operating Cost',
                value: isKo ? '200만원부터' : 'From ₩2,000,000',
                desc: isKo ? '부스 종류 및 규모에 따라 상이' : 'Varies by booth type and size',
              },
              {
                icon: '📍',
                title: isKo ? '운영 방식' : 'Operation Method',
                value: isKo ? '출장 운영' : 'On-site Operation',
                desc: isKo ? '행사 장소로 직접 방문 운영' : 'We visit and operate at your event venue',
              },
              {
                icon: '📞',
                title: isKo ? '신청 방법' : 'How to Apply',
                value: isKo ? '카카오톡/전화 문의' : 'KakaoTalk / Phone',
                desc: isKo ? '일정 및 요금 개별 협의' : 'Schedule and fees negotiated individually',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.title}</div>
                <div className="text-xl font-bold text-orange-600 mb-2">{item.value}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-orange-50 border border-orange-200 p-6">
            <h3 className="font-bold text-gray-900 mb-3">
              {isKo ? '부스 운영 포함 사항' : 'What is Included'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {(isKo
                ? [
                    '전문 강사 및 운영 인력 파견',
                    '체험 재료 및 교구 일체 제공',
                    '장비 설치 및 철수 포함',
                    '참가자 안전 지도 및 프로그램 진행',
                  ]
                : [
                    'Dispatch of expert instructors and staff',
                    'All materials and teaching aids provided',
                    'Equipment setup and teardown included',
                    'Safety guidance and program facilitation for participants',
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-500 to-amber-400 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '부스 운영 신청' : 'Book a Booth'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {isKo
              ? '행사 일정과 장소를 알려주시면 맞춤 견적을 드립니다.'
              : 'Share your event schedule and venue and we will provide a custom quote.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors duration-200"
          >
            {isKo ? '문의하기' : 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}
