import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: '한양미래연구소 | No.1 교육 플랫폼',
  description: '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 메이커교육, STEAM교육 전문 플랫폼. 찾아가는 체험교실, 캠프, 온라인 교육 제공.',
};

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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
