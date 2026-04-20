'use client';

import { getStoredToken } from './admin-auth';

const OWNER = 'HY3D-co-ltd';
const REPO = 'hyedu-web';
const BRANCH = 'main';
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

export class GithubApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export interface FileResult<T> {
  data: T;
  sha: string;
}

function authHeaders(): HeadersInit {
  const token = getStoredToken();
  if (!token) {
    throw new GithubApiError(
      'GitHub 토큰이 등록되어 있지 않습니다. "연결 설정" 페이지에서 토큰을 등록해주세요.',
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

// UTF-8 안전 base64 encode/decode (한글 포함)
function base64Encode(str: string): string {
  const utf8 = new TextEncoder().encode(str);
  let binary = '';
  utf8.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}
function base64Decode(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

export async function getJsonFile<T>(path: string): Promise<FileResult<T>> {
  const url = `${API_BASE}/contents/${encodeURI(path)}?ref=${BRANCH}&_=${Date.now()}`;
  const res = await fetch(url, { headers: authHeaders(), cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      throw new GithubApiError('파일을 찾을 수 없습니다.', 404);
    }
    throw new GithubApiError(`불러오기 실패 (${res.status})`, res.status);
  }
  const body = (await res.json()) as {
    content: string;
    encoding: string;
    sha: string;
  };
  if (body.encoding !== 'base64') {
    throw new GithubApiError('예상치 못한 파일 인코딩입니다.');
  }
  const jsonStr = base64Decode(body.content.replace(/\n/g, ''));
  return { data: JSON.parse(jsonStr) as T, sha: body.sha };
}

export async function putJsonFile<T>(
  path: string,
  data: T,
  sha: string,
  message: string,
): Promise<{ sha: string }> {
  const content = JSON.stringify(data, null, 2) + '\n';
  const res = await fetch(`${API_BASE}/contents/${encodeURI(path)}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: base64Encode(content),
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new GithubApiError(
      err.message || `저장 실패 (${res.status})`,
      res.status,
    );
  }
  const body = (await res.json()) as { content: { sha: string } };
  return { sha: body.content.sha };
}
