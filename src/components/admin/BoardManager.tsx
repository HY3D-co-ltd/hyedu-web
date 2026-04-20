'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import RichEditor from './RichEditor';
import ImageField from './ImageField';
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
                    <p className="text-xs text-gray-500 mt-0.5">
                      {post.body ? (
                        <span className="text-green-600">내부 작성</span>
                      ) : (
                        <span className="text-gray-400">외부 링크 (BBS)</span>
                      )}
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
          kind={kind}
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
            kind={kind}
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

/**
 * 제목 + 날짜 + 랜덤 6자 → URL 안전한 slug 자동 생성.
 * 예: 20260420-a3b5c9
 */
function autoSlug(date: string): string {
  const datePart = date.replace(/-/g, '') || new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 8);
  return `${datePart}-${rand}`;
}

function BoardPostForm({
  kind,
  initial,
  onSubmit,
  onCancel,
  saving,
  error,
}: {
  kind: Kind;
  initial?: StaticBoardPost;
  onSubmit: (post: StaticBoardPost) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState(initial?.title ?? '');
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? '');
  const [date, setDate] = useState(initial?.date || today);
  const [body, setBody] = useState(initial?.body ?? '');

  const imageFolder = `board/${kind}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = initial?.slug || autoSlug(date);
    const post: StaticBoardPost = {
      id: initial?.id ?? newId(),
      slug,
      title: title.trim(),
      thumbnail,
      date,
      href: initial?.href ?? '', // 새 글은 href 없음; 기존 글은 유지
      body: body.trim() || undefined,
      author: initial?.author ?? '관리자',
    };
    onSubmit(post);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageField
        label="썸네일"
        folder={imageFolder}
        value={thumbnail}
        onChange={setThumbnail}
      />

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
          본문 <span className="text-red-500">*</span>
        </label>
        <RichEditor
          value={body}
          onChange={setBody}
          imageFolder={imageFolder}
        />
        <p className="text-xs text-gray-500 mt-1">
          굵게/기울임/색/크기/이미지 삽입 등을 사용할 수 있습니다. 이미지는 삽입 시 자동으로 축소됩니다.
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
          disabled={saving || !title.trim() || !body.trim()}
          className="px-5 py-2 text-sm bg-point text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
