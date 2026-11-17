import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { policyInEffect, seoulDate } from '@/data/privacy-policy';
import LinkClickTracker from './LinkClickTracker';

/**
 * 빌드한 날(서울 기준) 시행 중인 개인정보 처리방침이 이용 분석 쿠키를 안내하는가.
 * 처리방침보다 GA4가 먼저 켜지지 않게 묶는다. 측정 ID를 미리 넣어 두면 개정판 시행일 빌드
 * (deploy.yml이 매일 0시 5분 KST에 다시 빌드)부터 켜진다.
 */
const policyCoversAnalytics = policyInEffect(seoulDate()).analyticsCookies;

if (GA_MEASUREMENT_ID && !policyCoversAnalytics) {
  console.warn(
    '[GA4] NEXT_PUBLIC_GA_ID가 있지만 시행 중인 개인정보 처리방침이 이용 분석 쿠키를 안내하지 않아 GA4를 넣지 않습니다 (src/data/privacy-policy.ts).',
  );
}

/**
 * GA4 태그. 측정 ID(NEXT_PUBLIC_GA_ID)가 없거나 처리방침이 아직 안내하지 않으면 아무것도 넣지 않는다.
 * 사이트 안 이동(next-intl Link)의 페이지뷰는 GA4 향상된 측정의
 * "브라우저 기록 이벤트 기반 페이지 변경"이 세므로 여기서 따로 보내지 않는다.
 * 광고 신호는 끈다 — 처리방침 10장이 "광고에 쓰지 않는다"고 약속하므로 GA4 관리 화면 설정과 상관없이 막는다.
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || !policyCoversAnalytics) return null;

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
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
      <LinkClickTracker />
    </>
  );
}
