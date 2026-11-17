/**
 * GA4 측정 ID와 링크 클릭 이벤트 분류.
 *
 * 페이지뷰(사이트 안 이동 포함) · 외부 링크 클릭(`click`) · 파일 다운로드(`file_download`)는
 * GA4 "향상된 측정"이 자동으로 센다. 여기서는 그 밖의 것에 이름을 붙인다.
 * - 전화 · 메일: 향상된 측정이 `tel:` · `mailto:` 링크를 세지 않는다.
 * - 네이버 예약 · 카카오 채널: 자동 `click`에도 잡히지만, 다른 외부 링크와 섞이지 않게
 *   따로 이름을 붙여 GA4에서 키 이벤트(전환)로 지정할 수 있게 한다.
 *
 * 이벤트 이름을 바꾸면 GA4 관리 화면의 키 이벤트 설정도 같이 바꿔야 한다.
 */

/** 빌드 때 박힌다. 비어 있으면 GA4 스크립트를 넣지 않는다(로컬 · 미설정 배포). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

const LINK_CLICK_EVENTS = ['click_phone', 'click_email', 'click_naver_booking', 'click_kakao_channel'] as const;
export type LinkClickEvent = (typeof LINK_CLICK_EVENTS)[number];

function isLinkClickEvent(value: string): value is LinkClickEvent {
  return (LINK_CLICK_EVENTS as readonly string[]).includes(value);
}

const NAVER_BOOKING_HOSTS = new Set(['booking.naver.com', 'm.booking.naver.com']);
const KAKAO_CHANNEL_HOSTS = new Set(['pf.kakao.com']);

/**
 * 링크가 어떤 행동인지 고른다.
 * 1. 링크가 `data-track`으로 직접 밝힌 이름. href만으로는 의도를 알 수 없는 링크가 쓴다
 *    (예: EmailLink는 PC에서 Gmail 작성 창 주소라 mailto:가 아니다).
 * 2. 브라우저가 해석한 href(`HTMLAnchorElement`의 protocol · hostname).
 */
export function classifyLink(
  link: Pick<HTMLAnchorElement, 'protocol' | 'hostname' | 'dataset'>,
): LinkClickEvent | null {
  const declared = link.dataset.track;
  if (declared && isLinkClickEvent(declared)) return declared;
  if (link.protocol === 'tel:') return 'click_phone';
  if (link.protocol === 'mailto:') return 'click_email';
  if (NAVER_BOOKING_HOSTS.has(link.hostname)) return 'click_naver_booking';
  if (KAKAO_CHANNEL_HOSTS.has(link.hostname)) return 'click_kakao_channel';
  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
