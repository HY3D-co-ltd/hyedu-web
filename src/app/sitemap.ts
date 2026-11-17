import type { MetadataRoute } from 'next';
import { programs } from '@/data/programs';
import { eventPosts, reviewPosts } from '@/data/boardPosts';
import { PRIVACY_POLICY_DRAFT } from '@/data/privacy-policy';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyedu.kr';
  const locales = ['ko', 'en'];

  const staticPages = [
    '',
    '/about',
    '/programs',
    '/youth-club',
    '/online',
    '/special-lecture',
    '/booth',
    '/camp',
    '/camp/saturday',
    '/camp/competition',
    '/contact',
    '/phone',
    '/board/reviews',
    '/board/events',
    '/board/gallery',
    // 처리방침이 초안이면 사이트맵에서 뺀다 (위저드 사양 §8)
    ...(PRIVACY_POLICY_DRAFT ? [] : ['/privacy']),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }

    for (const program of programs) {
      if (program.hidden) continue; // 숨김 처리된 프로그램은 sitemap 에서 제외
      entries.push({
        url: `${baseUrl}/${locale}/programs/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko/programs/${program.slug}`,
            en: `${baseUrl}/en/programs/${program.slug}`,
          },
        },
      });
    }

    for (const post of reviewPosts) {
      entries.push({
        url: `${baseUrl}/${locale}/board/reviews/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko/board/reviews/${post.slug}`,
            en: `${baseUrl}/en/board/reviews/${post.slug}`,
          },
        },
      });
    }

    for (const post of eventPosts) {
      entries.push({
        url: `${baseUrl}/${locale}/board/events/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko/board/events/${post.slug}`,
            en: `${baseUrl}/en/board/events/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
