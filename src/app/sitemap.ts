import type { MetadataRoute } from 'next';
import { programs } from '@/data/programs';

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
    '/board/reviews',
    '/board/events',
    '/board/gallery',
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
  }

  return entries;
}
