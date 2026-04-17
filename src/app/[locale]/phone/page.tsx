import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import PhoneCopyButton from '@/components/ui/PhoneCopyButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    title: isKo ? '전화 문의 | 한양미래연구소' : 'Phone Inquiry | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소 전화 문의 070-8064-0829. 업무시간 평일 09:00~18:00 (점심시간 12:00~13:00), 주말 및 공휴일 휴무.'
      : 'Hanyang Future Lab phone inquiry +82-70-8064-0829. Hours: Weekdays 09:00–18:00 (lunch 12:00–13:00). Closed weekends and holidays.',
  };
}

export default async function PhonePage({
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
          { name: isKo ? '전화 문의' : 'Phone Inquiry', href: `/${locale}/phone` },
        ]}
      />

      {/* Page Title */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">Phone Inquiry</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {isKo ? '전화 문의' : 'Call Us'}
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            {isKo
              ? '빠른 답변을 원하신다면 아래 번호로 전화해 주세요'
              : 'For the fastest response, please call the number below'}
          </p>
        </div>
      </section>

      {/* Phone Number Card */}
      <section className="pb-12 px-4 bg-white">
        <div className="mx-auto max-w-[600px]">
          <div className="rounded-3xl bg-gradient-to-br from-point to-[#264e4e] text-white p-10 md:p-12 shadow-xl text-center">
            <p className="text-sm md:text-base opacity-90 mb-3">
              {isKo ? '한양미래연구소 대표번호' : 'Hanyang Future Lab'}
            </p>
            <a
              href="tel:070-8064-0829"
              className="block text-4xl md:text-5xl font-extrabold tracking-wider mb-6 hover:opacity-90 transition-opacity"
              aria-label={isKo ? '070-8064-0829로 전화 걸기' : 'Call +82-70-8064-0829'}
            >
              070-8064-0829
            </a>
            <PhoneCopyButton phone="070-8064-0829" isKo={isKo} />
          </div>

          {/* Business Hours */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              {isKo ? '업무 시간 안내' : 'Business Hours'}
            </h2>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex justify-between">
                <span>{isKo ? '평일' : 'Weekdays'}</span>
                <span className="font-semibold">09:00 ~ 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>{isKo ? '점심시간' : 'Lunch Break'}</span>
                <span className="font-semibold">12:00 ~ 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>{isKo ? '주말 · 공휴일' : 'Weekends · Holidays'}</span>
                <span className="font-semibold text-gray-500">{isKo ? '휴무' : 'Closed'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            {isKo ? '다른 방법으로 문의하기' : 'Other Contact Methods'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://pf.kakao.com/_fxbVcs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow text-center"
            >
              <Image src="/images/main/kakao.png" alt={isKo ? '카카오톡' : 'KakaoTalk'} width={40} height={40} />
              <span className="text-sm font-semibold text-gray-900">
                {isKo ? '카카오톡' : 'KakaoTalk'}
              </span>
            </a>
            <a
              href="mailto:hyedu0829@gmail.com"
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow text-center"
            >
              <Image src="/images/main/mail.svg" alt={isKo ? '이메일' : 'Email'} width={40} height={40} />
              <span className="text-sm font-semibold text-gray-900">
                {isKo ? '이메일' : 'Email'}
              </span>
            </a>
            <a
              href="https://booking.naver.com/booking/12/bizes/252156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow text-center"
            >
              <Image src="/images/main/naver.png" alt={isKo ? '네이버 예약' : 'Naver Booking'} width={40} height={40} />
              <span className="text-sm font-semibold text-gray-900">
                {isKo ? '네이버 예약' : 'Naver Booking'}
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
