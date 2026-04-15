/**
 * Returns the Next.js basePath so static asset URLs work on GitHub Pages.
 * next/image handles basePath automatically, but raw <img>, <iframe>,
 * and CSS background-image need manual prefixing.
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

/** Prefix a path with basePath. Idempotent (won't double-prefix). */
export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!base || path.startsWith(base)) return path;
  return `${base}${path}`;
}
