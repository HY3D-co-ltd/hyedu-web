import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { reviewPosts } from '@/data/boardPosts';
import { reviewDetails } from '@/data/boardPostDetails';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

// Extract numeric ID prefix from slug like "329-ai-led-mood-lamp..."
function idFromSlug(slug: string): string {
  const m = slug.match(/^(\d+)(?:-|$)/);
  return m ? m[1] : slug;
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
  const id = idFromSlug(slug);
  const detail = reviewDetails[id];
  if (!detail) return {};
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? `${detail.title} | 한양미래연구소 교육 후기`
      : `${detail.title} | Hanyang Future Lab Reviews`,
    description: detail.title,
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

  const id = idFromSlug(slug);
  const detail = reviewDetails[id];
  if (!detail) notFound();

  const idx = reviewPosts.findIndex((p) => p.id === id);
  const prev = idx < reviewPosts.length - 1 ? reviewPosts[idx + 1] : null;
  const next = idx > 0 ? reviewPosts[idx - 1] : null;

  return (
    <>
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
