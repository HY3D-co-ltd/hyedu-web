'use client';

import { useState, FormEvent, useEffect } from 'react';
import { isLoggedIn, loginWithCredentials } from '@/lib/admin-auth';
import { adminHref } from '@/lib/admin-paths';

export default function AdminLoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 이미 로그인되어 있으면 대시보드로
  useEffect(() => {
    if (isLoggedIn()) {
      window.location.replace(adminHref('/admin/'));
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = loginWithCredentials(id, password);
    if (ok) {
      window.location.replace(adminHref('/admin/'));
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="mt-2 text-sm text-gray-600">
              한양미래연구소 홈페이지 관리자 페이지
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이디
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-point focus:border-transparent"
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-point focus:border-transparent"
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !id.trim() || !password}
              className="w-full bg-point text-white font-semibold rounded-lg py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
