'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 썸네일 이미지 + 로딩 실패 시 fallback.
 * 구 BBS 에서 크롤링된 썸네일은 도메인 전환 이후 404 가 되므로
 * 이 경우 깨진 아이콘 대신 placeholder(아이콘)로 대체.
 *
 * React의 onError 는 handler 부착 전에 이미 실패한 이미지에 대해서는
 * 발동하지 않을 수 있으므로, mount 시 img.complete + naturalWidth===0 도 체크.
 */
export default function BoardThumbnail({
  src,
  alt,
  fallbackEmoji,
  className,
}: {
  src: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // 이미 실패 상태로 DOM 에 마운트된 경우 감지
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  const showImage = !!src && !errored;

  if (!showImage) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
        {fallbackEmoji}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}
