import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from '@/components/ui/Img';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import ContactWizard, { WizardSkeleton } from '@/components/contact-wizard/ContactWizard';
import DownloadQR from '@/components/ui/DownloadQR';
import EmailLink from '@/components/ui/EmailLink';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';

const PROGRAM_PDF_URL = 'https://hyedu.kr/files/2026-programs-overview.pdf';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    alternates: buildAlternates(locale, 'contact'),
    openGraph: buildOpenGraph(locale, 'contact'),
    title: isKo ? '교육 신청/문의 | 한양미래연구소' : 'Contact / Apply | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소 교육 신청 및 문의. 몇 가지 질문에 답하면 담당자가 견적과 교육계획안을 준비해 연락드립니다. 카카오톡, 이메일(hyedu0829@gmail.com), 전화(070-8064-0829)로도 문의하실 수 있습니다. 경진대회 대비반, 토요캠프 네이버 예약.'
      : 'Apply to Hanyang Future Lab online: answer a few questions and we will reply with a quote and lesson plan. You can also reach us via KakaoTalk, email (hyedu0829@gmail.com), or phone (+82-70-8064-0829). Naver booking for Competition Prep and Saturday Camps.',
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
      <section className="pt-10 pb-8 md:pt-14 md:pb-10 bg-white text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
            Education Application / Education Inquiry
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {isKo ? '교육 신청 / 문의' : 'Apply / Contact'}
          </h1>
          <p className="mt-3 text-[15px] text-gray-500 break-keep">
            {isKo
              ? '몇 가지만 골라 주시면 담당자가 견적과 교육계획안을 준비해 연락드려요.'
              : "Answer a few questions and we'll get back to you with a quote and lesson plan."}
          </p>
        </div>
      </section>

      {/* 교육 신청 위저드 (공개본). 사양 docs/superpowers/specs/2026-11-17-contact-wizard-questions.md §6.3 */}
      <section className="bg-white pb-16">
        <Suspense fallback={<WizardSkeleton />}>
          <ContactWizard mode="live" locale={locale} />
        </Suspense>
      </section>

      {/* 프로그램 안내 PDF */}
      <section className="pb-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          {/* 휴대폰 화면에서는 QR을 찍을 수 없으므로 sm 이상에서만 QR을 보인다 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/files/2026-programs-overview.pdf`}
              download
              className="inline-flex items-center gap-3 bg-point text-white font-semibold rounded-xl px-7 py-4 hover:opacity-90 transition-all shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {isKo ? '모든 프로그램 한눈에 보기 (PDF)' : 'View All Programs (PDF)'}
            </a>
            <div className="hidden sm:block">
              <DownloadQR
                url={PROGRAM_PDF_URL}
                label={isKo ? 'QR로 받기' : 'Scan to Download'}
                sublabel={isKo ? '모바일 카메라로 스캔' : 'Scan with your phone'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 다른 방법으로 문의하기 */}
      <section className="pt-12 pb-8 px-4 bg-white border-t border-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {isKo ? '다른 방법으로 문의하기' : 'Other ways to reach us'}
        </h2>
        <p className="mt-2 text-[15px] text-gray-500 break-keep">
          {isKo ? '전화나 카카오톡, 이메일로도 편하게 문의하세요.' : 'You can also call us or reach us on KakaoTalk or by email.'}
        </p>
      </section>

      {/* Phone / Business Hours */}
      <section className="pb-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] flex justify-center">
          {/* 이미지 전체가 통화 링크 — 모바일에서 누르면 전화 앱이 번호를 띄운다 */}
          <a
            href="tel:070-8064-0829"
            aria-label={isKo ? '070-8064-0829로 전화 걸기' : 'Call +82-70-8064-0829'}
            className="block w-full max-w-[500px] rounded-2xl transition-opacity hover:opacity-90 active:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-point"
          >
            <Image
              src="/images/main/inquiry01_02.png"
              alt={
                isKo
                  ? '빠른 답변을 원하신다면 070-8064-0829. 업무 시간: 평일 09:00~18:00 (점심시간 12:00~13:00) 주말 및 공휴일 휴무'
                  : 'For fast responses call +82-70-8064-0829. Hours: Weekdays 09:00–18:00 (lunch 12:00–13:00). Closed on weekends and holidays.'
              }
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </a>
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

            {/* Email — 받는 사람·제목이 채워진 작성 화면 (PC: Gmail 작성 창, 모바일: 메일 앱) */}
            <EmailLink
              to="hyedu0829@gmail.com"
              subject={isKo ? '[홈페이지] 교육 문의' : '[Website] Inquiry'}
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
            </EmailLink>

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
    </>
  );
}
