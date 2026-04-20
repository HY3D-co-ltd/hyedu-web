'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/admin/Modal';
import ImageField from '@/components/admin/ImageField';
import {
  AdminPopup,
  loadPopups,
  savePopups,
  newId,
} from '@/lib/admin-data';
import { getStoredToken } from '@/lib/admin-auth';

export default function AdminPopupsPage() {
  return (
    <AdminGuard>
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <PopupsPanel />
      </main>
    </AdminGuard>
  );
}

function PopupsPanel() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [items, setItems] = useState<AdminPopup[] | null>(null);
  const [sha, setSha] = useState<string>('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<AdminPopup | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setHasToken(!!getStoredToken());
  }, []);

  async function reload() {
    setLoading(true);
    setLoadError(null);
    try {
      const { data, sha } = await loadPopups();
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
  }, [hasToken]);

  async function commit(next: AdminPopup[], message: string) {
    setSaving(true);
    setSaveError(null);
    try {
      const result = await savePopups(next, sha, message);
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

  function handleCreate(popup: AdminPopup) {
    const next = [popup, ...(items ?? [])];
    commit(next, `chore(admin): add popup "${popup.title}"`);
  }

  function handleUpdate(popup: AdminPopup) {
    const next = (items ?? []).map((p) => (p.id === popup.id ? popup : p));
    commit(next, `chore(admin): update popup "${popup.title}"`);
  }

  function handleDelete(popup: AdminPopup) {
    if (!confirm(`"${popup.title}" 팝업을 삭제하시겠습니까?`)) return;
    const next = (items ?? []).filter((p) => p.id !== popup.id);
    commit(next, `chore(admin): delete popup "${popup.title}"`);
  }

  if (hasToken === null) return null;

  if (!hasToken) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="font-semibold text-amber-900 mb-2">
          GitHub 연결이 필요합니다
        </p>
        <p className="text-sm text-amber-800 mb-4">
          팝업을 관리하려면 먼저 GitHub 토큰을 등록해야 합니다.
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
          <h1 className="text-2xl font-bold text-gray-900">팝업 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            홈페이지 방문 시 노출되는 팝업. 기간·활성 여부 제어 가능.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="bg-point text-white font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90"
        >
          + 새 팝업
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
          등록된 팝업이 없습니다. 위의 &quot;+ 새 팝업&quot; 버튼을 눌러 추가해주세요.
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((popup) => (
            <PopupCard
              key={popup.id}
              popup={popup}
              onEdit={() => setEditing(popup)}
              onDelete={() => handleDelete(popup)}
            />
          ))}
        </div>
      )}

      <Modal
        open={creating}
        title="새 팝업 만들기"
        onClose={() => setCreating(false)}
        size="lg"
      >
        <PopupForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          saving={saving}
          error={saveError}
        />
      </Modal>
      <Modal
        open={!!editing}
        title="팝업 편집"
        onClose={() => setEditing(null)}
        size="lg"
      >
        {editing && (
          <PopupForm
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

function PopupCard({
  popup,
  onEdit,
  onDelete,
}: {
  popup: AdminPopup;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex gap-4">
      {popup.imageUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={popup.imageUrl}
          alt={popup.title}
          className="w-24 h-24 rounded-lg object-cover bg-gray-100"
        />
      ) : (
        <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          이미지 없음
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              popup.isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {popup.isActive ? '활성' : '비활성'}
          </span>
          <span className="text-xs text-gray-500">
            {popup.startDate} ~ {popup.endDate}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 truncate">{popup.title}</h3>
        {popup.content && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{popup.content}</p>
        )}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
          >
            편집
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-xs border border-red-300 text-red-600 rounded px-3 py-1 hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function PopupForm({
  initial,
  onSubmit,
  onCancel,
  saving,
  error,
}: {
  initial?: AdminPopup;
  onSubmit: (popup: AdminPopup) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const oneMonthLater = new Date(Date.now() + 30 * 86400_000)
    .toISOString()
    .slice(0, 10);

  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
  const [linkUrl, setLinkUrl] = useState(initial?.linkUrl ?? '');
  const [startDate, setStartDate] = useState(initial?.startDate ?? today);
  const [endDate, setEndDate] = useState(initial?.endDate ?? oneMonthLater);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const popup: AdminPopup = {
      id: initial?.id ?? newId(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      linkUrl: linkUrl.trim() || undefined,
      isActive,
      startDate,
      endDate,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };
    onSubmit(popup);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="제목" required>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="내용 (본문 텍스트 또는 HTML)">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </Field>

      <ImageField
        label="이미지"
        folder="popups"
        value={imageUrl}
        onChange={setImageUrl}
        aspect="wide"
      />

      <Field label="클릭 시 이동할 링크 (선택)">
        <input
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="시작일" required>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="종료일" required>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm text-gray-700">활성화 (사이트에 노출)</span>
      </label>

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

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
