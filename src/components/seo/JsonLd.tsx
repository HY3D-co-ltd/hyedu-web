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
    sameAs: [
      'https://blog.naver.com/hyedu0829',
      'https://www.youtube.com/@hyedu0829',
      'https://www.instagram.com/hyedu0829',
    ],
    foundingDate: '2020',
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
    offers: {
      '@type': 'Offer',
      price: isKo ? program.price : program.priceEn,
      priceCurrency: 'KRW',
    },
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
