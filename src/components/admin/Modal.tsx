'use client';

import { useEffect } from 'react';

export default function Modal({
  open,
  title,
  onClose,
  children,
  size = 'md',
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxW = size === 'lg' ? 'max-w-3xl' : 'max-w-xl';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxW} max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-2xl leading-none"
            aria-label="닫기"
          >
            ×
          </button>
        </header>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
