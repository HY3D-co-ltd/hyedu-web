'use client';

import { useEffect, useState, FormEvent } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  clearGithubToken,
  getStoredToken,
  getStoredUsername,
  setStoredToken,
  validateToken,
} from '@/lib/admin-auth';

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <AdminHeader />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">연결 설정</h1>
        <p className="text-sm text-gray-600 mb-8">
          글 저장 기능을 사용하려면 GitHub 토큰을 한 번 등록해야 합니다. 한 번 등록하면
          이 브라우저에서는 다시 입력할 필요가 없습니다.
        </p>
        <GithubTokenPanel />
      </main>
    </AdminGuard>
  );
}

function GithubTokenPanel() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [status, setStatus] = useState<
    | { type: 'idle' }
    | { type: 'testing' }
    | { type: 'ok'; username: string }
    | { type: 'error'; message: string }
  >({ type: 'idle' });

  useEffect(() => {
    setCurrentUser(getStoredUsername());
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: 'testing' });
    const result = await validateToken(tokenInput);
    if (result.ok) {
      setStoredToken(tokenInput.trim(), result.username);
      setCurrentUser(result.username);
      setTokenInput('');
      setStatus({ type: 'ok', username: result.username });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
  }

  function handleDisconnect() {
    if (!confirm('GitHub 연결을 해제하시겠습니까? 글 저장 기능이 중단됩니다.'))
      return;
    clearGithubToken();
    setCurrentUser(null);
    setStatus({ type: 'idle' });
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-semibold text-gray-900 mb-2">GitHub 연결 상태</h2>
        {currentUser ? (
          <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-green-800">✓ 연결됨</p>
              <p className="text-xs text-green-700 mt-0.5">
                GitHub 계정: <b>{currentUser}</b>
              </p>
            </div>
            <button
              type="button"
              onClick={handleDisconnect}
              className="text-xs text-red-600 hover:underline"
            >
              연결 해제
            </button>
          </div>
        ) : (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-sm font-medium text-amber-800">
              ⚠️ 아직 연결되지 않았습니다
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              아래에 GitHub 토큰을 입력해 연결을 완료해주세요.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="github_pat_..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-point"
            autoComplete="off"
          />
        </div>

        {status.type === 'error' && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {status.message}
          </div>
        )}
        {status.type === 'ok' && (
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            연결 완료! GitHub 계정: <b>{status.username}</b>
          </div>
        )}

        <button
          type="submit"
          disabled={status.type === 'testing' || !tokenInput.trim()}
          className="w-full sm:w-auto bg-point text-white font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status.type === 'testing' ? '확인 중...' : currentUser ? '토큰 교체' : '연결하기'}
        </button>
      </form>

      <details className="mt-8 pt-6 border-t border-gray-200">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none">
          토큰 발급 방법 보기
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
            <b>Resource owner</b>: <code>HY3D-co-ltd</code> 선택 (이게 가장 중요!)
          </li>
          <li>
            <b>Repository access</b>: <code>Only select repositories</code> →{' '}
            <code>HY3D-co-ltd/hyedu-web</code>
          </li>
          <li>
            <b>Permissions → Repository permissions → Contents</b>:{' '}
            <code>Read and write</code>
          </li>
          <li>
            <b>Generate token</b> 클릭 → 표시된 토큰(github_pat_...)을 복사해 위에
            붙여넣기
          </li>
        </ol>
      </details>
    </div>
  );
}
