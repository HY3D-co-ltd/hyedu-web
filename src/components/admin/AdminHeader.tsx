'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStoredUsername, logout } from '@/lib/admin-auth';

export default function AdminHeader() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(getStoredUsername());
  }, []);

  function handleLogout() {
    logout();
    window.location.replace('/admin/login/');
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/" className="text-lg font-bold text-gray-900">
            한양미래연구소 관리자
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
            <Link href="/admin/popups/" className="hover:text-gray-900">
              팝업
            </Link>
            <Link href="/admin/reviews/" className="hover:text-gray-900">
              교육 후기
            </Link>
            <Link href="/admin/events/" className="hover:text-gray-900">
              대회 &amp; 행사
            </Link>
            <Link href="/admin/settings/" className="hover:text-gray-900">
              설정
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {username && (
            <span className="hidden sm:inline text-xs text-gray-400">
              GitHub: {username}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
