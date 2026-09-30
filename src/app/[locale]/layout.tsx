import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = 'https://hyedu.kr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  const siteName = isKo ? '한양미래연구소' : 'Hanyang Future Lab';
  const title = isKo
    ? '한양미래연구소 | AI·로봇코딩·자율주행 No.1 교육 플랫폼'
    : 'Hanyang Future Lab | AI · Robot Coding · Autonomous Driving Education Platform';
  const description = isKo
    ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 메이커교육, STEAM교육 전문 플랫폼. 찾아가는 체험교실, 캠프, 온라인 교육 제공.'
    : 'Specialized education platform for AI, robot coding, autonomous driving, maker, and STEAM programs for K-12 students. On-site classes, camps, and online courses.';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: isKo
      ? ['AI교육', '로봇교육', '한양미래연구소', '체험교실', '청소년 캠프', '4차산업혁명 교육']
      : ['AI education', 'robot education', 'Hanyang Future Lab', 'experience class', 'youth camp', '4th industrial revolution education'],
    // ⚠️ alternates(canonical/hreflang)와 openGraph.url은 여기서 설정하지 않는다.
    //
    // Next.js App Router는 layout의 metadata를 하위 page로 상속시킨다.
    // 여기에 canonical을 두면, 자기 canonical을 명시하지 않은 모든 페이지가
    // `/{locale}` 을 정본으로 선언하게 되어 색인에서 제외된다.
    // (2026-08 실제 발생 — about/programs/camp/board 등 약 30개 페이지 피해)
    //
    // → 각 page.tsx에서 `buildAlternates(locale, path)` 로
    //    자기참조 canonical을 설정할 것. src/lib/seo.ts 참고.
    openGraph: {
      type: 'website',
      siteName,
      locale: isKo ? 'ko_KR' : 'en_US',
      alternateLocale: isKo ? 'en_US' : 'ko_KR',
      title,
      description,
      images: [
        {
          url: '/images/logo/logo.jpg',
          width: 800,
          height: 400,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/logo/logo.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* GTM script placeholder — insert Google Tag Manager snippet here */}
        {/* Naver WCS script placeholder — insert Naver Web Analytics snippet here */}
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
