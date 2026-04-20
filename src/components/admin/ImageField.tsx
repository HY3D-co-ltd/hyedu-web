'use client';

import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/image-upload';

export default function ImageField({
  value,
  onChange,
  folder,
  label,
  aspect = 'square',
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label: string;
  aspect?: 'square' | 'wide';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 실패');
    } finally {
      setUploading(false);
    }
  }

  const previewBox = aspect === 'wide' ? 'w-60 h-36' : 'w-40 h-40';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-start gap-4">
        <div
          className={`${previewBox} rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0`}
        >
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400">미리보기</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="bg-point text-white text-sm font-medium rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? '업로드 중...' : value ? '이미지 변경' : '파일 선택'}
          </button>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="ml-2 text-sm text-gray-500 hover:text-red-600"
            >
              제거
            </button>
          )}
          <p className="text-xs text-gray-500">
            JPG · PNG 권장. 큰 사진은 자동으로 1600px 이하·JPEG 85%로 압축됩니다.
          </p>
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
