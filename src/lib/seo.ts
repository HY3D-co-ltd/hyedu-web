/**
 * SEO 메타데이터 헬퍼.
 *
 * Next.js App Router는 layout의 metadata를 하위 page로 **상속**시킨다.
 * `[locale]/layout.tsx`가 `alternates.canonical`을 설정하면, 자기 canonical을
 * 명시하지 않은 모든 하위 페이지가 layout 값을 그대로 물려받는다.
 * 그 결과 /ko/about, /ko/camp 등이 전부 "나는 /ko/ 의 복제본"이라고
 * 검색엔진에 선언하게 되어 색인에서 제외된다.
 *
 * 따라서 layout에서는 canonical을 설정하지 않고, **모든 페이지가
 * `buildAlternates()`로 자기 자신을 가리키는 canonical을 명시**한다.
 */

export const SITE_URL = 'https://hyedu.kr';

export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number] | string;

/**
 * 로케일을 제외한 경로를 정규화한다.
 * '', '/', 'about', '/about', 'about/' → '' 또는 '/about'
 */
function normalizePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
}

/**
 * 페이지 절대 URL을 만든다.
 *
 * @param locale 'ko' | 'en'
 * @param path   로케일 뒤에 붙는 경로 (예: 'about', 'camp/saturday'). 홈은 생략.
 */
export function pageUrl(locale: Locale, path = ''): string {
  return `${SITE_URL}/${locale}${normalizePath(path)}`;
}

/**
 * 자기참조 canonical + ko/en hreflang을 생성한다.
 * 모든 page.tsx의 generateMetadata에서 사용할 것.
 *
 * @example
 * export async function generateMetadata({ params }) {
 *   const { locale } = await params;
 *   return {
 *     title: '...',
 *     alternates: buildAlternates(locale, 'about'),
 *     openGraph: { url: pageUrl(locale, 'about'), ... },
 *   };
 * }
 */
export function buildAlternates(locale: Locale, path = '') {
  const suffix = normalizePath(path);
  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages: {
      ko: `${SITE_URL}/ko${suffix}`,
      en: `${SITE_URL}/en${suffix}`,
      'x-default': `${SITE_URL}/ko${suffix}`,
    },
  };
}

/**
 * 페이지용 Open Graph 객체를 생성한다.
 *
 * ⚠️ Next.js는 page가 `openGraph`를 정의하면 layout의 openGraph를 **통째로 대체**한다
 * (얕은 병합). 따라서 url만 넣으면 og:image·og:site_name·og:type이 전부 사라진다.
 * → 이 헬퍼가 공통 필드를 모두 포함해서 반환한다.
 *
 * title/description은 일부러 넣지 않는다. 비워두면 Next가 해당 페이지의
 * `title`/`description`에서 og:title·og:description을 자동으로 채워주므로,
 * 페이지마다 문구를 중복 입력할 필요가 없다. (2026-08 빌드 산출물로 확인)
 */
export function buildOpenGraph(locale: Locale, path = '') {
  const isKo = locale === 'ko';
  const siteName = isKo ? '한양미래연구소' : 'Hanyang Future Lab';

  return {
    type: 'website' as const,
    siteName,
    locale: isKo ? 'ko_KR' : 'en_US',
    alternateLocale: isKo ? 'en_US' : 'ko_KR',
    url: pageUrl(locale, path),
    images: [
      {
        url: '/images/logo/logo.jpg',
        width: 800,
        height: 400,
        alt: siteName,
      },
    ],
  };
}
