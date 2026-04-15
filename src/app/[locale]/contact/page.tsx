import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
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
    title: isKo ? '교육 신청/문의 | 한양미래연구소' : 'Contact / Apply | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소 교육 신청 및 문의. 카카오톡, 이메일(hyedu0829@gmail.com), 전화(070-8064-0829)로 문의하세요. 경진대회 대비반, 토요캠프 네이버 예약.'
      : 'Apply and inquire at Hanyang Future Lab via KakaoTalk, email (hyedu0829@gmail.com), or phone (+82-70-8064-0829). Naver booking for Competition Prep and Saturday Camps.',
    keywords: isKo
      ? ['한양미래연구소 문의', 'AI교육', '로봇교육', '교육 신청', '카카오톡 문의', '교육 예약', '경진대회 대비반', '토요캠프']
      : ['Hanyang Future Lab contact', 'AI education', 'robot education', 'education apply', 'KakaoTalk inquiry', 'competition prep', 'Saturday camp'],
  };
}

export default async function ContactPage({
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
          { name: isKo ? '교육 신청/문의' : 'Contact', href: `/${locale}/contact` },
        ]}
      />

      {/* Page Title */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
            Education Application / Education Inquiry
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {isKo ? '교육 신청 / 문의' : 'Apply / Contact'}
          </h1>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-16 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {/* KakaoTalk */}
            <a
              href="https://pf.kakao.com/_fxbVcs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Image
                src="/images/main/kakao.png"
                alt={isKo ? '카카오톡' : 'KakaoTalk'}
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                {isKo ? '카카오톡 바로가기' : 'Open KakaoTalk'}
              </span>
              <span className="text-sm text-gray-500">
                {isKo ? '카카오톡 채널에서 편하게 문의하세요' : 'Chat with us on our KakaoTalk channel'}
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hyedu0829@gmail.com"
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Image
                src="/images/main/mail.svg"
                alt={isKo ? '이메일' : 'Email'}
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                {isKo ? '메일 전송하기' : 'Send Email'}
              </span>
              <span className="text-sm text-gray-500">hyedu0829@gmail.com</span>
            </a>

            {/* Naver Booking */}
            <a
              href="https://booking.naver.com/booking/12/bizes/252156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center sm:col-span-2 lg:col-span-1"
            >
              <Image
                src="/images/main/naver.png"
                alt={isKo ? '네이버 예약' : 'Naver Booking'}
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                {isKo ? (
                  <>
                    경진대회 대비반/
                    <br />
                    토요캠프 신청하기
                  </>
                ) : (
                  <>
                    Competition Prep /
                    <br />
                    Saturday Camp Booking
                  </>
                )}
              </span>
              <span className="text-sm text-gray-500">
                {isKo ? '네이버 예약으로 바로 신청' : 'Apply directly via Naver Booking'}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* KakaoTalk Channel Guide */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] flex justify-center">
          <Image
            src="/images/main/inquiry01_01.png"
            alt={
              isKo
                ? '카카오톡에서 한양미래연구소 채널을 추가하세요. QR 스캔 시 채널로 이동합니다.'
                : 'Add the Hanyang Future Lab channel on KakaoTalk. Scan the QR to open the channel.'
            }
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </section>

      {/* Phone / Business Hours */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] flex justify-center">
          <Image
            src="/images/main/inquiry01_02.png"
            alt={
              isKo
                ? '빠른 답변을 원하신다면 070-8064-0829. 업무 시간: 평일 09:00~18:00 (점심시간 12:00~13:00) 주말 및 공휴일 휴무'
                : 'For fast responses call +82-70-8064-0829. Hours: Weekdays 09:00–18:00 (lunch 12:00–13:00). Closed on weekends and holidays.'
            }
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </section>
    </>
  );
}
