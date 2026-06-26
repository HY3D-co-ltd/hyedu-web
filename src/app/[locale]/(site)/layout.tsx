import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Popup from '@/components/layout/Popup';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

/**
 * Layout for the main hyedu.kr site — wraps pages with the shared chrome
 * (header, footer, popup) and Organization JSON-LD.
 *
 * Standalone landing pages that must be isolated from this chrome (e.g. the
 * KAVI partner page at `/[locale]/kavi`) live OUTSIDE this route group, so they
 * only inherit the bare `[locale]/layout.tsx`. Route groups don't affect URLs.
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <Header />
      <main>{children}</main>
      <Footer />
      <Popup />
    </>
  );
}
