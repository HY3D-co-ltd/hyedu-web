'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActivePopups } from '@/lib/popup';
import { Popup as PopupType } from '@/types';

export default function Popup() {
  const [popups, setPopups] = useState<PopupType[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check localStorage for hidden popups
    const hidden = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
    const today = new Date().toDateString();
    const hiddenToday = new Set<string>(
      Object.entries(hidden)
        .filter(([_, date]) => date === today)
        .map(([id]) => id)
    );
    setDismissed(hiddenToday);

    // Fetch active popups from Firestore
    getActivePopups().then(setPopups).catch(() => {});
  }, []);

  const hideForToday = (id: string) => {
    const hidden = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
    hidden[id] = new Date().toDateString();
    localStorage.setItem('hiddenPopups', JSON.stringify(hidden));
    setDismissed((prev) => new Set(prev).add(id));
  };

  const close = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  const visiblePopups = popups.filter((p) => !dismissed.has(p.id));
  if (visiblePopups.length === 0) return null;

  return (
    <>
      {visiblePopups.map((popup) => (
        <div key={popup.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {popup.imageUrl && (
              <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ maxHeight: '65vh' }}>
                {/* 포스터 등 세로/가로 비율 다양한 이미지를 잘리지 않게 표시 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    popup.imageUrl.startsWith('http')
                      ? popup.imageUrl
                      : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${popup.imageUrl}`
                  }
                  alt={popup.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '65vh' }}
                />
              </div>
            )}
            <div className="p-4 overflow-y-auto">
              <h3 className="font-bold text-lg mb-2">{popup.title}</h3>
              <p className="text-gray-600 text-sm mb-4 whitespace-pre-line">{popup.content}</p>
              {popup.linkUrl && (
                <Link href={popup.linkUrl} className="text-primary underline text-sm">
                  자세히 보기
                </Link>
              )}
            </div>
            <div className="flex border-t flex-shrink-0">
              <button
                onClick={() => hideForToday(popup.id)}
                className="flex-1 py-3 text-sm text-gray-500 hover:bg-gray-50"
              >
                오늘 하루 안보기
              </button>
              <button
                onClick={() => close(popup.id)}
                className="flex-1 py-3 text-sm font-medium border-l hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
