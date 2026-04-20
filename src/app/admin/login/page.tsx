'use client';

import { useState, FormEvent, useEffect } from 'react';
import {
  getStoredToken,
  setStoredAuth,
  validateToken,
} from '@/lib/admin-auth';

export default function AdminLoginPage() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이미 로그인되어 있으면 대시보드로
  useEffect(() => {
    if (getStoredToken()) {
      window.location.replace('/admin/');
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await validateToken(token);
    if (result.ok) {
      setStoredAuth(token.trim(), result.username);
      window.location.replace('/admin/');
    } else {
      setError(result.error);
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
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-point focus:border-transparent"
                autoComplete="off"
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
              disabled={loading || !token.trim()}
              className="w-full bg-point text-white font-semibold rounded-lg py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </form>

          <details className="mt-6 pt-6 border-t border-gray-200">
            <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none">
              토큰이 없으신가요? 발급 방법 보기
            </summary>
            <ol className="mt-3 text-xs text-gray-600 space-y-2 list-decimal pl-5">
              <li>
                GitHub 로그인 후{' '}
                <a
                  href="https://github.com/settings/tokens?type=beta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-point underline"
                >
                  Fine-grained tokens 페이지
                </a>{' '}
                접속
              </li>
              <li>
                <b>Generate new token</b> 클릭
              </li>
              <li>
                <b>Resource owner</b>: <code>HY3D-co-ltd</code> 선택
              </li>
              <li>
                <b>Repository access</b>: <code>HY3D-co-ltd/hyedu-web</code>{' '}
                만 선택
              </li>
              <li>
                <b>Permissions → Repository</b>:{' '}
                <code>Contents = Read and write</code>
              </li>
              <li>
                <b>Generate token</b> 클릭 → 표시된 토큰 복사 후 위에 붙여넣기
              </li>
            </ol>
          </details>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          토큰은 이 브라우저에만 저장되며, 다른 곳으로 전송되지 않습니다.
        </p>
      </div>
    </div>
  );
}
