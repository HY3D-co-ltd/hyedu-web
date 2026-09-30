import { Program } from '@/types';

// ─── OrganizationJsonLd ───────────────────────────────────────────────────────

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const isKo = locale === 'ko';

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: isKo ? '한양미래연구소' : 'Hanyang Future Lab',
    alternateName: isKo ? '(주)하이스타터' : 'Histarter co.,ltd',
    url: 'https://hyedu.kr',
    logo: 'https://hyedu.kr/images/logo/logo.jpg',
    description: isKo
      ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 메이커교육, STEAM교육, 3D프린팅, 드론교육 전문 플랫폼. 찾아가는 체험교실, 캠프, 온라인 교육 제공.'
      : 'Professional platform for AI education, robot coding, autonomous driving, maker education, STEAM education, 3D printing, and drone education for elementary, middle, and high school students.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '한양대학로 55 5공학관 창업실',
      addressLocality: '안산시 상록구',
      addressRegion: '경기도',
      addressCountry: 'KR',
    },
    telephone: '070-8064-0829',
    email: 'hyedu0829@gmail.com',
    // sameAs는 "이 계정들이 전부 같은 기관"임을 검색엔진·AI에 알려 엔티티를 통합한다.
    // 죽은 URL이 들어 있으면 신호가 끊기므로 반드시 200 응답을 확인하고 등록할 것.
    // 2026-08-21 전수 확인 완료.
    sameAs: [
      'https://blog.naver.com/hyhyedu',
      'https://www.youtube.com/@%ED%95%9C%EC%96%91%EB%AF%B8%EB%9E%98%EC%97%B0%EA%B5%AC%EC%86%8C',
      'https://www.instagram.com/hy_edu',
      'https://www.facebook.com/HanyangFutureEdu',
      'https://hyedu-kr.blogspot.com',
    ],
    // about 페이지 본문에 "2019년 한양대학교에서 시작"으로 표기되어 있어 일치시킴
    foundingDate: '2019',
    founder: {
      '@type': 'Person',
      name: isKo ? '이정욱' : 'Lee Jeong Uk',
    },
    knowsAbout: [
      'AI Education',
      'Robot Coding',
      'Autonomous Driving',
      'STEAM Education',
      '3D Printing',
      'Drone Education',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── CourseJsonLd ─────────────────────────────────────────────────────────────

const targetLabelKo: Record<string, string> = {
  elementary: '초등학생',
  middle: '중학생',
  high: '고등학생',
  adult: '성인',
};

const targetLabelEn: Record<string, string> = {
  elementary: 'Elementary School Students',
  middle: 'Middle School Students',
  high: 'High School Students',
  adult: 'Adults',
};

/**
 * price 문자열을 schema.org Offer 로 변환한다.
 *
 * schema.org 의 `Offer.price` 는 **숫자만** 허용한다.
 * 기존에는 "1인 28,500원 (최소 20명)" 같은 문장을 그대로 넣고 있었는데,
 * 이러면 구글이 값을 파싱하지 못해 Offer 전체가 무효 처리된다.
 *
 * - 첫 번째 금액을 숫자로 추출해 `price` 에 넣는다
 *   ("대여 1인 30,000원 / 구매 1인 82,500원" → 30000)
 * - "최소 N명" 은 `eligibleQuantity` 로 옮긴다
 * - 사람이 읽는 원문은 `description` 에 보존한다
 */
function buildCourseOffer(priceText: string) {
  const amount = priceText.match(/([\d,]+)\s*원/);
  const minQty = priceText.match(/최소\s*(\d+)\s*명/);

  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'KRW',
    description: priceText,
    availability: 'https://schema.org/InStock',
  };

  if (amount) offer.price = amount[1].replace(/,/g, '');
  if (minQty) {
    offer.eligibleQuantity = {
      '@type': 'QuantitativeValue',
      minValue: Number(minQty[1]),
      unitText: 'person',
    };
  }

  return offer;
}

export function CourseJsonLd({
  program,
  locale,
}: {
  program: Program;
  locale: string;
}) {
  const isKo = locale === 'ko';
  const targetLabels = program.target.map((t) =>
    isKo ? targetLabelKo[t] : targetLabelEn[t]
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: isKo ? program.title : program.titleEn,
    description: isKo ? program.description : program.descriptionEn,
    provider: {
      '@type': 'EducationalOrganization',
      name: isKo ? '한양미래연구소' : 'Hanyang Future Lab',
      url: 'https://hyedu.kr',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: targetLabels.join(', '),
    },
    offers: buildCourseOffer(isKo ? program.price : program.priceEn),
    courseMode: 'onsite',
    url: `https://hyedu.kr/${locale}/programs/${program.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── CourseListJsonLd ─────────────────────────────────────────────────────────

/**
 * 프로그램 **목록** 페이지(/[locale]/programs)용 ItemList 스키마.
 *
 * 상세 페이지에는 개별 Course 스키마가 이미 들어가지만, 목록 페이지에는
 * Organization 밖에 없어서 "여기에 22개 강좌가 있다"는 사실을 검색엔진이
 * 알 수 없었다. ItemList 로 전체 목록을 한 번에 알린다.
 *
 * hidden 프로그램은 호출부에서 걸러서 넘길 것.
 */
export function CourseListJsonLd({
  programs,
  locale,
}: {
  programs: Program[];
  locale: string;
}) {
  const isKo = locale === 'ko';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isKo
      ? '한양미래연구소 찾아가는 체험교실 프로그램'
      : 'Hanyang Future Lab On-site Experience Class Programs',
    description: isKo
      ? '초·중·고등학생 대상 AI·코딩·메이커융합·STEAM 체험교실 프로그램 목록'
      : 'AI, coding, maker convergence, and STEAM experience class programs for K-12 students',
    numberOfItems: programs.length,
    itemListElement: programs.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: isKo ? p.title : p.titleEn,
        description: isKo ? p.description : p.descriptionEn,
        url: `https://hyedu.kr/${locale}/programs/${p.slug}`,
        provider: {
          '@type': 'EducationalOrganization',
          name: isKo ? '한양미래연구소' : 'Hanyang Future Lab',
          url: 'https://hyedu.kr',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQJsonLd ────────────────────────────────────────────────────────────────

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ReviewsJsonLd (Course에 부착되는 aggregateRating + reviews) ──────────────

export function ReviewsJsonLd({
  itemName,
  reviews,
}: {
  itemName: string;
  reviews: { author: string; rating: number; content: string }[];
}) {
  if (reviews.length === 0) return null;
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.content,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ArticleJsonLd (Blog/NewsArticle for board posts) ────────────────────────

export function ArticleJsonLd({
  headline,
  author,
  datePublished,
  url,
  image,
  description,
  locale,
}: {
  headline: string;
  author: string;
  datePublished?: string;
  url: string;
  image?: string;
  description?: string;
  locale: string;
}) {
  const isKo = locale === 'ko';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: description ?? headline,
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    author: {
      '@type': 'Organization',
      name: isKo ? '한양미래연구소' : 'Hanyang Future Lab',
    },
    publisher: {
      '@type': 'Organization',
      name: isKo ? '한양미래연구소' : 'Hanyang Future Lab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hyedu.kr/images/logo/logo.jpg',
      },
    },
    ...(datePublished && { datePublished, dateModified: datePublished }),
    ...(image && { image }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── EventJsonLd (Schema.org Event for /board/events 게시판) ─────────────────

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  venueName,
  venueAddress,
  url,
  image,
  price,
  currency = 'KRW',
  organizerName,
  sponsorName,
  capacity,
  locale,
}: {
  name: string;
  description: string;
  startDate: string; // ISO 8601, e.g. "2026-05-16T10:00:00+09:00"
  endDate?: string;
  venueName: string;
  venueAddress?: string;
  url: string;
  image?: string;
  price?: number | 'free';
  currency?: string;
  organizerName?: string;
  sponsorName?: string;
  capacity?: number;
  locale: string;
}) {
  const isKo = locale === 'ko';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name,
    description,
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    startDate,
    ...(endDate && { endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: venueName,
      ...(venueAddress && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: venueAddress,
          addressCountry: 'KR',
        },
      }),
    },
    organizer: {
      '@type': 'Organization',
      name: organizerName ?? (isKo ? '한양미래연구소' : 'Hanyang Future Lab'),
      url: 'https://hyedu.kr',
    },
    ...(sponsorName && {
      sponsor: { '@type': 'Organization', name: sponsorName },
    }),
    ...(image && { image }),
    ...(capacity && { maximumAttendeeCapacity: capacity }),
    url,
    offers: {
      '@type': 'Offer',
      url,
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      ...(price === 'free' || price === 0
        ? { price: 0, priceCurrency: currency }
        : price !== undefined
          ? { price, priceCurrency: currency }
          : { price: 0, priceCurrency: currency }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbJsonLd ─────────────────────────────────────────────────────────

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `https://hyedu.kr${href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
