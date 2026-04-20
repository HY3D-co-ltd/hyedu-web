/**
 * 관리자 페이지 내부 리다이렉트(window.location)에서 basePath 를 올바르게 붙이는 헬퍼.
 * next/link 는 basePath 를 자동 처리하지만, window.location 은 raw 브라우저 API 라서 직접 붙여줘야 한다.
 */
export function adminHref(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${base}${path}`;
}
