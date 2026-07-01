'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { eventPosts } from '@/data/boardPosts';
import BoardThumbnail from '@/components/ui/BoardThumbnail';

export default function EventsPage() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            {isKo ? '대회 & 행사' : 'Events & Competitions'}
          </h1>
          <p className="mt-3 text-lg opacity-90">
            {isKo
              ? '한양미래연구소가 참여한 대회와 행사 소식'
              : 'Competitions and events participated by Hanyang Future Lab'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500 mb-6">
          {isKo ? `총 ${eventPosts.length}건` : `Total ${eventPosts.length} posts`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eventPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/board/events/${post.slug}`}
              className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                <BoardThumbnail
                  src={post.thumbnail}
                  alt={post.title}
                  fallbackEmoji="📣"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[14px] md:text-[15px] text-gray-900 leading-snug line-clamp-2 mb-2 min-h-[2.5em]">
                  {post.title}
                </h2>
                {post.date && (
                  <p className="text-xs text-gray-500">{post.date}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
