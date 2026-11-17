import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import LinkClickTracker from './LinkClickTracker';

/**
 * GA4 태그. 측정 ID(NEXT_PUBLIC_GA_ID)가 없으면 아무것도 넣지 않는다.
 * 사이트 안 이동(next-intl Link)의 페이지뷰는 GA4 향상된 측정의
 * "브라우저 기록 이벤트 기반 페이지 변경"이 세므로 여기서 따로 보내지 않는다.
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});`}
      </Script>
      <LinkClickTracker />
    </>
  );
}
