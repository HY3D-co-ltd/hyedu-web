'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { getStoredToken } from '@/lib/admin-auth';

const cards = [
  {
    href: '/admin/popups/',
    title: '팝업 관리',
    description: '홈페이지 방문 시 노출되는 팝업 (활성/비활성, 기간)',
    emoji: '📢',
  },
  {
    href: '/admin/reviews/',
    title: '교육 후기 관리',
    description: '교육 후기 게시판 글 작성·수정·삭제',
    emoji: '📝',
  },
  {
    href: '/admin/events/',
    title: '대회 & 행사 관리',
    description: '대회·행사 공지 게시판 글 작성·수정·삭제',
    emoji: '🏆',
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-sm text-gray-600 mb-8">
          관리할 항목을 선택하세요. 변경 사항은 저장 시 자동으로 사이트에 반영됩니다
          (1-2분 소요).
        </p>

        <GithubConnectionBanner />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h2 className="font-bold text-lg text-gray-900 mb-1">
                {c.title}
              </h2>
              <p className="text-sm text-gray-500">{c.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}

function GithubConnectionBanner() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(!!getStoredToken());
  }, []);

  if (hasToken === null) return null; // 초기 렌더 중
  if (hasToken) return null; // 연결되어 있으면 배너 숨김

  return (
    <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 flex items-start justify-between gap-4">
      <div>
        <p className="font-semibold text-amber-900 mb-1">
          ⚠️ 처음이신가요? GitHub 연결이 필요해요
        </p>
        <p className="text-sm text-amber-800">
          글을 저장하려면 먼저 "연결 설정" 페이지에서 GitHub 토큰을 등록해주세요.
          한 번만 하시면 됩니다.
        </p>
      </div>
      <Link
        href="/admin/settings/"
        className="shrink-0 bg-amber-600 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-amber-700 transition-colors"
      >
        연결 설정하기
      </Link>
    </div>
  );
}
