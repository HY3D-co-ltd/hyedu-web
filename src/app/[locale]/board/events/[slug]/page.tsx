import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { eventPosts, StaticBoardPost } from '@/data/boardPosts';
import { eventDetails } from '@/data/boardPostDetails';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  EventJsonLd,
  FAQJsonLd,
} from '@/components/seo/JsonLd';

function idFromSlug(slug: string): string {
  const m = slug.match(/^(\d+)(?:-|$)/);
  return m ? m[1] : slug;
}

function resolveDetail(post: StaticBoardPost | undefined) {
  if (!post) return null;
  if (post.body) {
    return {
      title: post.title,
      author: post.author ?? '관리자',
      date: post.date,
      body: post.body,
    };
  }
  const detail = eventDetails[idFromSlug(post.slug)];
  return detail ?? null;
}

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  return locales.flatMap((locale) => eventPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = eventPosts.find((p) => p.slug === slug);
  const detail = resolveDetail(post);
  if (!detail) return {};
  const isKo = locale === 'ko';
  const url = `https://hyedu.kr/${locale}/board/events/${slug}`;
  const title = isKo
    ? `${detail.title} | 한양미래연구소 대회&행사`
    : `${detail.title} | Hanyang Future Lab Events`;
  // SEO/AEO: prefer structured description, fall back to title.
  const description = post?.description ?? detail.title;
  // 카카오톡·페이스북 등은 SVG og:image 미지원. SVG → PNG로 변환된 -og.png 사용.
  // (scripts/generate-og-images.mjs 가 모든 이벤트 SVG를 PNG로 자동 생성)
  const ogImage = post?.thumbnail
    ? `https://hyedu.kr${post.thumbnail.replace(/\.svg$/, '-og.png')}`
    : undefined;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ko: `https://hyedu.kr/ko/board/events/${slug}`,
        en: `https://hyedu.kr/en/board/events/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: detail.date || undefined,
      authors: [detail.author],
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const post = eventPosts.find((p) => p.slug === slug);
  const detail = resolveDetail(post);
  if (!post || !detail) notFound();

  const idx = eventPosts.findIndex((p) => p.slug === slug);
  const prev = idx < eventPosts.length - 1 ? eventPosts[idx + 1] : null;
  const next = idx > 0 ? eventPosts[idx - 1] : null;

  const url = `https://hyedu.kr/${locale}/board/events/${slug}`;

  return (
    <>
      <ArticleJsonLd
        headline={detail.title}
        author={detail.author}
        datePublished={detail.date || undefined}
        url={url}
        image={post.thumbnail}
        description={post.description}
        locale={locale}
      />
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          {
            name: isKo ? '대회 & 행사' : 'Events & Competitions',
            href: `/${locale}/board/events`,
          },
          { name: detail.title, href: `/${locale}/board/events/${slug}` },
        ]}
      />
      {/* Schema.org Event — Google Events 카드, 리치 결과에 노출 */}
      {post.eventStartDate && post.venueName && (
        <EventJsonLd
          name={detail.title}
          description={post.description ?? detail.title}
          startDate={post.eventStartDate}
          endDate={post.eventEndDate}
          venueName={post.venueName}
          venueAddress={post.venueAddress}
          url={url}
          image={
            post.thumbnail
              ? `https://hyedu.kr${post.thumbnail.replace(/\.svg$/, '-og.png')}`
              : undefined
          }
          price={post.price}
          capacity={post.capacity}
          sponsorName={post.sponsorName}
          locale={locale}
        />
      )}
      {/* Schema.org FAQPage — Google FAQ 리치 스니펫 + AEO(ChatGPT 인용) 강화 */}
      {post.faqs && post.faqs.length > 0 && (
        <FAQJsonLd
          faqs={post.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        />
      )}

      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={`/${locale}/board/events`}
            className="text-sm opacity-80 hover:opacity-100 inline-flex items-center gap-1 mb-4"
          >
            ← {isKo ? '목록으로' : 'Back to list'}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">{detail.title}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
            <span>{detail.author}</span>
            {detail.date && <span>{detail.date}</span>}
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-10">
        <div
          className="post-content prose prose-sm md:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: detail.body }}
        />
      </article>

      <nav className="max-w-4xl mx-auto px-4 pb-16 flex gap-3">
        {prev ? (
          <Link
            href={`/${locale}/board/events/${prev.slug}`}
            className="flex-1 border border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-gray-50 transition-colors"
          >
            <div className="text-xs text-gray-400 mb-1">← {isKo ? '이전 글' : 'Previous'}</div>
            <div className="text-sm font-medium text-gray-800 line-clamp-1">{prev.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        <Link
          href={`/${locale}/board/events`}
          className="px-5 flex items-center justify-center border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isKo ? '목록' : 'List'}
        </Link>
        {next ? (
          <Link
            href={`/${locale}/board/events/${next.slug}`}
            className="flex-1 border border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-gray-50 transition-colors text-right"
          >
            <div className="text-xs text-gray-400 mb-1">{isKo ? '다음 글' : 'Next'} →</div>
            <div className="text-sm font-medium text-gray-800 line-clamp-1">{next.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </>
  );
}
