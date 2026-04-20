'use client';

import { getStoredToken } from './admin-auth';

const OWNER = 'HY3D-co-ltd';
const REPO = 'hyedu-web';
const BRANCH = 'main';
const MAX_DIMENSION = 1600; // px
const JPEG_QUALITY = 0.85;

/**
 * 이미지 파일을 받아 지정 경로로 자동 축소·GitHub 업로드 후 /images/... 경로를 반환.
 *
 * 흐름:
 *  1. <input type="file"> 에서 받은 File → <canvas> 로 최대 1600px 리사이즈
 *  2. JPEG 85% 품질로 압축 → Blob → ArrayBuffer → base64
 *  3. GitHub PUT /repos/.../contents/public/images/... 로 커밋
 *  4. 사이트에서 사용할 /images/... 경로 반환
 */
export async function uploadImage(
  file: File,
  folder: string, // 예: 'board/reviews', 'popups'
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드할 수 있습니다.');
  }

  const token = getStoredToken();
  if (!token) throw new Error('GitHub 토큰이 등록되어 있지 않습니다.');

  // 1. 리사이즈 + JPEG 재압축
  const resized = await resizeImage(file);

  // 2. base64 변환
  const base64 = await blobToBase64(resized);

  // 3. 파일명 생성 (확장자는 jpg)
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const repoPath = `public/images/${folder}/${filename}`;

  // 4. GitHub API 로 커밋
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(repoPath)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore(admin): upload image ${filename}`,
        content: base64,
        branch: BRANCH,
      }),
    },
  );

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message || `이미지 업로드 실패 (${res.status})`);
  }

  // 5. 사이트에서 쓸 경로 (public 제외, basePath 포함)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}/images/${folder}/${filename}`;
}

async function resizeImage(file: File): Promise<Blob> {
  const img = await loadImage(file);
  const { width, height } = fitWithin(img.naturalWidth, img.naturalHeight, MAX_DIMENSION);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D 컨텍스트를 가져올 수 없습니다.');
  ctx.drawImage(img, 0, 0, width, height);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('이미지 변환 실패'))),
      'image/jpeg',
      JPEG_QUALITY,
    );
  });
}

function fitWithin(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = w > h ? max / w : max / h;
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지를 읽을 수 없습니다.'));
    };
    img.src = url;
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:image/jpeg;base64,XXXX → XXXX 부분만
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(blob);
  });
}
