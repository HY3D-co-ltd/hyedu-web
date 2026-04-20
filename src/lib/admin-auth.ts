'use client';

/**
 * 관리자 인증 유틸리티.
 *
 * 두 개의 "자물쇠"가 있습니다:
 *
 *  1) 로그인 자물쇠 (아이디/비밀번호)  — 관리자 UI에 들어오기 위한 가벼운 게이트
 *  2) GitHub 토큰                   — 실제로 저장소에 글을 쓸 때 사용하는 진짜 권한
 *
 * 로그인 자물쇠는 클라이언트에 저장되므로 방어력이 약하지만,
 * GitHub 토큰이 없으면 아무것도 쓰지 못하므로 실제 피해는 제한적입니다.
 */

import { ADMIN_CREDENTIALS } from './admin-config';

const SESSION_KEY = 'hyedu_admin_session';
const TOKEN_KEY = 'hyedu_admin_token';
const USERNAME_KEY = 'hyedu_admin_username';

// ============================================================
// 1) 로그인 세션 (아이디/비밀번호)
// ============================================================

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SESSION_KEY) === '1';
}

export function loginWithCredentials(id: string, password: string): boolean {
  if (
    id.trim() === ADMIN_CREDENTIALS.id &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  // 토큰은 남겨둠 — 다시 로그인 시 재입력 없이 이어서 사용 가능.
  // 완전히 지우려면 clearGithubToken() 별도 호출.
}

// ============================================================
// 2) GitHub 토큰 (실제 쓰기 권한)
// ============================================================

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUsername(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USERNAME_KEY);
}

export function setStoredToken(token: string, username: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
}

export function clearGithubToken() {
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
