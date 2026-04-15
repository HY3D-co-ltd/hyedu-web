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
    title: '교육 신청/문의 | 한양미래연구소',
    description:
      '한양미래연구소 교육 신청 및 문의. 카카오톡, 이메일(hyedu0829@gmail.com), 전화(070-8064-0829)로 문의하세요. 경진대회 대비반, 토요캠프 네이버 예약.',
    keywords: [
      '한양미래연구소 문의',
      '교육 신청',
      '카카오톡 문의',
      '교육 예약',
      '경진대회 대비반',
      '토요캠프',
    ],
  };
}

export default async function ContactPage({
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
          { name: '교육 신청/문의', href: `/${locale}/contact` },
        ]}
      />

      {/* Page Title */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
            Education Application / Education Inquiry
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            교육 신청 / 문의
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
                alt="카카오톡"
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                카카오톡 바로가기
              </span>
              <span className="text-sm text-gray-500">
                카카오톡 채널에서 편하게 문의하세요
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hyedu0829@gmail.com"
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Image
                src="/images/main/mail.svg"
                alt="이메일"
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                메일 전송하기
              </span>
              <span className="text-sm text-gray-500">
                hyedu0829@gmail.com
              </span>
            </a>

            {/* Naver Booking - 경진대회 대비반 / 토요캠프 */}
            <a
              href="https://booking.naver.com/booking/12/bizes/252156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow text-center sm:col-span-2 lg:col-span-1"
            >
              <Image
                src="/images/main/naver.png"
                alt="네이버 예약"
                width={48}
                height={48}
              />
              <span className="text-lg font-bold text-gray-900">
                경진대회 대비반/
                <br />
                토요캠프 신청하기
              </span>
              <span className="text-sm text-gray-500">
                네이버 예약으로 바로 신청
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
            alt="카카오톡에서 한양미래연구소 채널을 추가하세요. QR 스캔 시 채널로 이동합니다."
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
            alt="빠른 답변을 원하신다면 070-8064-0829. 업무 시간: 평일 09:00~18:00 (점심시간 12:00~13:00) 주말 및 공휴일 휴무"
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </section>
    </>
  );
}
