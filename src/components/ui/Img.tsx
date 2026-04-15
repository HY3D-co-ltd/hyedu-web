'use client';

import NextImage, { ImageProps } from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Drop-in replacement for next/image that prepends basePath to src strings.
 * Needed because `images.unoptimized: true` + `output: 'export'` skips
 * the built-in basePath prefixing that the image optimizer normally handles.
 */
export default function Img({ src, ...rest }: ImageProps) {
  let resolvedSrc = src;
  if (typeof src === 'string' && basePath && !src.startsWith(basePath) && src.startsWith('/')) {
    resolvedSrc = `${basePath}${src}`;
  }
  return <NextImage src={resolvedSrc} {...rest} />;
}
