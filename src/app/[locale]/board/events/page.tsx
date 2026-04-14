'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getBoardPosts } from '@/lib/board';
import { BoardPost } from '@/types';

export default function EventsPage() {
  const locale = useLocale();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getBoardPosts('events').then(({ posts }) => {
      setPosts(posts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const togglePost = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            {locale === 'ko' ? '대회 & 행사' : 'Events & Competitions'}
          </h1>
          <p className="mt-3 text-lg opacity-90">
            {locale === 'ko'
              ? '한양미래연구소가 참여한 대회와 행사 소식'
              : 'Competitions and events participated by Hanyang Future Lab'}
          </p>
        </div>
      </section>

      {/* Posts list */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {locale === 'ko' ? '게시물이 없습니다.' : 'No posts yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => togglePost(post.id)}
                  aria-expanded={expandedId === post.id}
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base md:text-lg text-gray-900 truncate">
                      {post.title}
                    </h2>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
                    </div>
                  </div>
                  <span className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${expandedId === post.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedId === post.id && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full max-h-80 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    {post.images && post.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {post.images.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${post.title} ${i + 1}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
