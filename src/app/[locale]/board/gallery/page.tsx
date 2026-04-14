'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getBoardPosts } from '@/lib/board';
import { BoardPost } from '@/types';

export default function GalleryPage() {
  const locale = useLocale();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);

  useEffect(() => {
    getBoardPosts('gallery').then(({ posts }) => {
      setPosts(posts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            {locale === 'ko' ? '이미지 갤러리' : 'Photo Gallery'}
          </h1>
          <p className="mt-3 text-lg opacity-90">
            {locale === 'ko'
              ? '한양미래연구소의 교육 현장을 담았습니다'
              : 'Capturing the educational moments at Hanyang Future Lab'}
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {locale === 'ko' ? '게시물이 없습니다.' : 'No photos yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <button
                key={post.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setSelectedPost(post)}
                aria-label={post.title}
              >
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : post.images && post.images[0] ? (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                    📷
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-medium line-clamp-2 text-left">
                    {post.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPost.title}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900 flex-1 mr-4">{selectedPost.title}</h2>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl transition-colors"
                onClick={() => setSelectedPost(null)}
                aria-label={locale === 'ko' ? '닫기' : 'Close'}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {selectedPost.thumbnail && (
                <img
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  className="w-full rounded-lg mb-4 object-cover max-h-80"
                />
              )}
              {selectedPost.images && selectedPost.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {selectedPost.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${selectedPost.title} ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              {selectedPost.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              )}
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>{selectedPost.author}</span>
                <span>{new Date(selectedPost.createdAt).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
