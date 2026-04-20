'use client';

/**
 * 관리자 인증 유틸리티.
 * - GitHub Personal Access Token(PAT)을 localStorage 에 저장/조회/삭제
 * - 토큰 유효성 검증은 GitHub `GET /user` 호출
 * - 토큰은 절대 서버로 전송되지 않음 (브라우저 내부에만 존재)
 */

const TOKEN_KEY = 'hyedu_admin_token';
const USERNAME_KEY = 'hyedu_admin_username';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUsername(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USERNAME_KEY);
}

export function setStoredAuth(token: string, username: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
}

export function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export type ValidateResult =
  | { ok: true; username: string }
  | { ok: false; error: string };

export async function validateToken(token: string): Promise<ValidateResult> {
  if (!token.trim()) return { ok: false, error: '토큰을 입력해주세요.' };
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (res.status === 401) {
      return { ok: false, error: '유효하지 않은 토큰입니다. 다시 확인해주세요.' };
    }
    if (!res.ok) {
      return { ok: false, error: `GitHub API 오류 (상태 ${res.status})` };
    }
    const data = (await res.json()) as { login?: string };
    if (!data.login) return { ok: false, error: '사용자 정보를 가져올 수 없습니다.' };
    return { ok: true, username: data.login };
  } catch {
    return { ok: false, error: '네트워크 오류. 인터넷 연결을 확인해주세요.' };
  }
}
