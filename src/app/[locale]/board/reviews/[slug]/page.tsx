import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { reviewPosts, StaticBoardPost } from '@/data/boardPosts';
import { reviewDetails } from '@/data/boardPostDetails';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

// Extract numeric ID prefix from slug like "329-ai-led-mood-lamp..."
function idFromSlug(slug: string): string {
  const m = slug.match(/^(\d+)(?:-|$)/);
  return m ? m[1] : slug;
}

/** 관리자 작성 post.body 또는 크롤링된 reviewDetails 중 있는 쪽을 반환. */
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
  const detail = reviewDetails[idFromSlug(post.slug)];
  return detail ?? null;
}

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  return locales.flatMap((locale) => reviewPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = reviewPosts.find((p) => p.slug === slug);
  const detail = resolveDetail(post);
  if (!detail) return {};
  const isKo = locale === 'ko';
  const url = `https://hyedu.kr/${locale}/board/reviews/${slug}`;
  const title = isKo
    ? `${detail.title} | 한양미래연구소 교육 후기`
    : `${detail.title} | Hanyang Future Lab Reviews`;
  return {
    title,
    description: detail.title,
    alternates: {
      canonical: url,
      languages: {
        ko: `https://hyedu.kr/ko/board/reviews/${slug}`,
        en: `https://hyedu.kr/en/board/reviews/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description: detail.title,
      url,
      publishedTime: detail.date || undefined,
      authors: [detail.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: detail.title,
    },
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const post = reviewPosts.find((p) => p.slug === slug);
  const detail = resolveDetail(post);
  if (!post || !detail) notFound();

  const idx = reviewPosts.findIndex((p) => p.slug === slug);
  const prev = idx < reviewPosts.length - 1 ? reviewPosts[idx + 1] : null;
  const next = idx > 0 ? reviewPosts[idx - 1] : null;

  const url = `https://hyedu.kr/${locale}/board/reviews/${slug}`;

  return (
    <>
      <ArticleJsonLd
        headline={detail.title}
        author={detail.author}
        datePublished={detail.date || undefined}
        url={url}
        image={post.thumbnail}
        locale={locale}
      />
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          {
            name: isKo ? '교육 후기' : 'Education Reviews',
            href: `/${locale}/board/reviews`,
          },
          { name: detail.title, href: `/${locale}/board/reviews/${slug}` },
        ]}
      />

      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={`/${locale}/board/reviews`}
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
            href={`/${locale}/board/reviews/${prev.slug}`}
            className="flex-1 border border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-gray-50 transition-colors"
          >
            <div className="text-xs text-gray-400 mb-1">← {isKo ? '이전 글' : 'Previous'}</div>
            <div className="text-sm font-medium text-gray-800 line-clamp-1">{prev.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        <Link
          href={`/${locale}/board/reviews`}
          className="px-5 flex items-center justify-center border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isKo ? '목록' : 'List'}
        </Link>
        {next ? (
          <Link
            href={`/${locale}/board/reviews/${next.slug}`}
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
