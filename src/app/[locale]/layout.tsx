import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Popup from '@/components/layout/Popup';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
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
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/ko`,
      },
    },
    openGraph: {
      type: 'website',
      siteName,
      locale: isKo ? 'ko_KR' : 'en_US',
      alternateLocale: isKo ? 'en_US' : 'ko_KR',
      title,
      description,
      url: `${SITE_URL}/${locale}`,
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
          <OrganizationJsonLd locale={locale} />
          <Header />
          <main>{children}</main>
          <Footer />
          <Popup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
