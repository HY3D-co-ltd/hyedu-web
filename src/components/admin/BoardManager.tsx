'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import { getStoredToken } from '@/lib/admin-auth';
import {
  loadReviews,
  saveReviews,
  loadEvents,
  saveEvents,
  newId,
} from '@/lib/admin-data';
import type { StaticBoardPost } from '@/data/boardPosts';

type Kind = 'reviews' | 'events';

const LABEL: Record<Kind, string> = {
  reviews: '교육 후기',
  events: '대회 & 행사',
};

export default function BoardManager({ kind }: { kind: Kind }) {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [items, setItems] = useState<StaticBoardPost[] | null>(null);
  const [sha, setSha] = useState<string>('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<StaticBoardPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setHasToken(!!getStoredToken());
  }, []);

  const load = kind === 'reviews' ? loadReviews : loadEvents;
  const save = kind === 'reviews' ? saveReviews : saveEvents;

  async function reload() {
    setLoading(true);
    setLoadError(null);
    try {
      const { data, sha } = await load();
      setItems(data);
      setSha(sha);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasToken) reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken, kind]);

  async function commit(next: StaticBoardPost[], message: string) {
    setSaving(true);
    setSaveError(null);
    try {
      const result = await save(next, sha, message);
      setItems(next);
      setSha(result.sha);
      setCreating(false);
      setEditing(null);
      setNotice('저장되었습니다. 1-2분 후 사이트에 반영됩니다.');
      setTimeout(() => setNotice(null), 5000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  }

  function handleCreate(post: StaticBoardPost) {
    const next = [post, ...(items ?? [])];
    commit(next, `chore(admin): add ${kind} "${post.title}"`);
  }

  function handleUpdate(post: StaticBoardPost) {
    const next = (items ?? []).map((p) => (p.id === post.id ? post : p));
    commit(next, `chore(admin): update ${kind} "${post.title}"`);
  }

  function handleDelete(post: StaticBoardPost) {
    if (!confirm(`"${post.title}" 글을 삭제하시겠습니까?`)) return;
    const next = (items ?? []).filter((p) => p.id !== post.id);
    commit(next, `chore(admin): delete ${kind} "${post.title}"`);
  }

  if (hasToken === null) return null;

  if (!hasToken) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="font-semibold text-amber-900 mb-2">GitHub 연결이 필요합니다</p>
        <p className="text-sm text-amber-800 mb-4">
          {LABEL[kind]}을(를) 관리하려면 먼저 GitHub 토큰을 등록해야 합니다.
        </p>
        <Link
          href="/admin/settings/"
          className="inline-block bg-amber-600 text-white font-semibold rounded-lg px-4 py-2 text-sm"
        >
          연결 설정하기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{LABEL[kind]} 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            {LABEL[kind]} 게시판의 글을 작성·수정·삭제합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="bg-point text-white font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90"
        >
          + 새 글
        </button>
      </div>

      {notice && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          {notice}
        </div>
      )}

      {loadError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      {loading && <p className="text-sm text-gray-500">불러오는 중...</p>}

      {items && items.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          등록된 글이 없습니다.
        </div>
      )}

      {items && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left w-20">썸네일</th>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left w-28">날짜</th>
                <th className="px-4 py-3 text-right w-36">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-2">
                    {post.thumbnail ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={post.thumbnail}
                        alt=""
                        className="w-14 h-14 rounded object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <p className="font-medium text-gray-900 line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {post.slug}
                    </p>
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs">
                    {post.date || '-'}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditing(post)}
                        className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
                      >
                        편집
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        className="text-xs border border-red-300 text-red-600 rounded px-3 py-1 hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={creating}
        title={`새 ${LABEL[kind]} 글`}
        onClose={() => setCreating(false)}
        size="lg"
      >
        <BoardPostForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          saving={saving}
          error={saveError}
        />
      </Modal>
      <Modal
        open={!!editing}
        title={`${LABEL[kind]} 편집`}
        onClose={() => setEditing(null)}
        size="lg"
      >
        {editing && (
          <BoardPostForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            saving={saving}
            error={saveError}
          />
        )}
      </Modal>
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function BoardPostForm({
  initial,
  onSubmit,
  onCancel,
  saving,
  error,
}: {
  initial?: StaticBoardPost;
  onSubmit: (post: StaticBoardPost) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? '');
  const [date, setDate] = useState(initial?.date || today);
  const [href, setHref] = useState(initial?.href ?? '');
  const [autoSlug, setAutoSlug] = useState(!initial);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) setSlug(slugify(value));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const post: StaticBoardPost = {
      id: initial?.id ?? newId(),
      slug: slug.trim() || slugify(title),
      title: title.trim(),
      thumbnail: thumbnail.trim(),
      date,
      href: href.trim(),
    };
    onSubmit(post);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          주소용 영문 ID (slug) <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setAutoSlug(false);
              setSlug(e.target.value);
            }}
            required
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono"
          />
          {!autoSlug && (
            <button
              type="button"
              onClick={() => {
                setAutoSlug(true);
                setSlug(slugify(title));
              }}
              className="text-xs text-gray-500 hover:text-gray-900 whitespace-nowrap"
            >
              자동
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          URL 주소에 들어가는 짧은 영문 식별자. 기본적으로 제목을 바탕으로 자동 생성됩니다.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          썸네일 이미지 URL
        </label>
        <input
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        {thumbnail && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbnail}
            alt="미리보기"
            className="mt-2 w-40 h-40 rounded-lg object-cover bg-gray-100"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          날짜
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          연결 URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          placeholder="https://..."
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          글을 클릭했을 때 이동할 주소 (외부 사이트 또는 내부 상세 페이지).
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 text-sm bg-point text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
