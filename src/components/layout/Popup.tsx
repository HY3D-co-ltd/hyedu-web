'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
        <div key={popup.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full mx-4 shadow-2xl">
            {popup.imageUrl && (
              <div className="relative aspect-[4/3]">
                <Image src={popup.imageUrl} alt={popup.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{popup.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{popup.content}</p>
              {popup.linkUrl && (
                <Link href={popup.linkUrl} className="text-primary underline text-sm">
                  자세히 보기
                </Link>
              )}
            </div>
            <div className="flex border-t">
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
