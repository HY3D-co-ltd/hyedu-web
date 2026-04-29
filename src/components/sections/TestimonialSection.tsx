'use client';

import Image from '@/components/ui/Img';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { reviewPosts } from '@/data/boardPosts';

/**
 * 교육 후기 게시판(reviews.json) 에 글이 추가/수정되면 자동으로 이 영역도 갱신.
 * 빌드 시점에 reviews.json 을 import 하므로, 관리자 페이지에서 글을 저장하면
 * GitHub Actions 재배포 후 1-2분 내 메인의 6개 후기에 반영된다.
 */
function getLatestReviews(count: number) {
  return [...reviewPosts]
    .filter((p) => p.thumbnail) // 썸네일 없는 글은 제외
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, count);
}

export default function TestimonialSection() {
  const locale = useLocale();
  const isKo = locale === 'ko';
  const latest = getLatestReviews(6);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-[40px] mx-0 md:mx-[100px]">
          {/* Left: YouTube */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {isKo ? '교육을 받고 꿈이 생겼어요' : 'The class gave me a new dream'}
            </h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.youtube.com/embed/eBueNdGAvGg?rel=0&showinfo=0"
                title={isKo ? '한양미래연구소 교육 후기' : 'Hanyang Future Lab Class Review'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              {isKo
                ? '\u201C이전에는 알지 못했던 분야를 배우며 새로운 꿈이 생겼습니다. 교육 받기 전과 비교하면 인생이 바뀐 기분입니다!\u201D'
                : '\u201CLearning about a field I never knew, I found a new dream. Compared to before the class, I feel like my life has changed!\u201D'}
            </p>
          </div>

          {/* Right: Latest Reviews — reviews.json 에서 자동 로드 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">
                {isKo ? '최신 후기' : 'Latest Reviews'}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              {isKo
                ? '한양미래연구소는 아이들의 꿈을 보육하며 인생을 바꿀 수 있는 체험교육을 제공합니다'
                : 'Hanyang Future Lab nurtures children\u2019s dreams and delivers life-changing hands-on education.'}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {latest.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/board/reviews/${post.slug}`}
                  className="overflow-hidden rounded hover:opacity-80 transition-opacity"
                  title={post.title}
                >
                  <div className="relative w-full aspect-square bg-gray-100">
                    {post.thumbnail && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-right">
              <Link
                href={`/${locale}/board/reviews`}
                className="text-xs text-point hover:underline"
              >
                {isKo ? '자세히보기' : 'View more'} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
