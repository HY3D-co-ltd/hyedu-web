/**
 * 교육 후기 썸네일 생성 — 기존 후기 썸네일(1080×1080: 상단 띠 + 굵은 파란 제목 + 사진 + 장소 라벨)과
 * 같은 양식으로 만든다. 폰트는 devDependency `pretendard`, 렌더링은 `@resvg/resvg-js` (시스템 폰트 비의존).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';

const SIZE = 1080;
const FONT_DIR = path.resolve('node_modules/pretendard/dist/public/static');
const FONT_FILES = ['Black', 'ExtraBold', 'Bold', 'Medium'].map((w) => path.join(FONT_DIR, `Pretendard-${w}.otf`));
const LOGO_CUBE = path.resolve('public/images/logo/logo-cube.png');

const C = {
  bg: '#d7dee6',
  panel: '#ffffff',
  strip: '#eeeeee',
  blue: '#398ce8',
  label: '#2b2b2b',
  brand: '#2f7567',
  captionBg: '#e9e9e9',
  captionText: '#333333',
};

const PHOTO = { x: 100, y: 330, w: 880, h: 670 };
const HEADLINE = { maxW: 900, top: 148, bottom: 322 };

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fontOpts = { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: 'Pretendard' };

function render(svg) {
  return new Resvg(svg, { font: fontOpts }).render().asPng();
}

function measure(text, size, weight, letterSpacing = 0) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="400"><text x="0" y="250" font-family="Pretendard" font-weight="${weight}" font-size="${size}" letter-spacing="${letterSpacing}">${escapeXml(text)}</text></svg>`;
  const box = new Resvg(svg, { font: fontOpts }).getBBox();
  return box ? box.width : 0;
}

/** 제목 → { headline, caption, label } (예: "…, … (용인 백암중)") */
export function deriveThumbText(title) {
  let rest = title.trim();
  let caption = '';
  const m = rest.match(/\(([^()]+)\)\s*$/);
  if (m) {
    caption = m[1].trim();
    rest = rest.slice(0, m.index).trim();
  }
  const commaIdx = rest.search(/[,，]/);
  let headline = (commaIdx > 0 ? rest.slice(0, commaIdx) : rest).trim().replace(/[.!?。]+$/, '');
  if (headline.length > 30) headline = `${headline.slice(0, 29).trim()}…`;
  const label = /캠프/.test(rest) ? '한양 청소년 캠프' : '찾아가는 체험학습';
  return { headline, caption, label };
}

function fitSize(text, maxW, maxSize, minSize, ls) {
  const w100 = measure(text, 100, 900, ls * (100 / maxSize));
  const size = Math.floor((maxW / Math.max(w100, 1)) * 100);
  return Math.max(minSize, Math.min(maxSize, size));
}

function splitTwoLines(text) {
  const words = text.split(/\s+/);
  if (words.length < 2) {
    const mid = Math.ceil(text.length / 2);
    return [text.slice(0, mid), text.slice(mid)];
  }
  let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    const score = Math.max(a.length, b.length);
    if (!best || score < best.score) best = { lines: [a, b], score };
  }
  return best.lines;
}

function layoutHeadline(headline) {
  const ls = -2;
  const one = fitSize(headline, HEADLINE.maxW, 112, 40, ls);
  const centerY = (HEADLINE.top + HEADLINE.bottom) / 2;
  if (one >= 84 || headline.length <= 10) {
    return [{ text: headline, size: one, y: centerY + one * 0.36 }];
  }
  const lines = splitTwoLines(headline);
  const size = Math.min(...lines.map((l) => fitSize(l, HEADLINE.maxW, 88, 44, ls)));
  const gap = size * 1.12;
  const y1 = centerY - gap / 2 + size * 0.36;
  return [
    { text: lines[0], size, y: y1 },
    { text: lines[1], size, y: y1 + gap },
  ];
}

const PAPERCLIP = `
<g transform="translate(80,16)" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M40 38 L40 128 A14 14 0 0 1 12 128 L12 24 A22 22 0 0 1 56 24 L56 136 A28 28 0 0 1 0 136 L0 42" stroke="#b4bac3" stroke-width="7"/>
  <path d="M40 38 L40 128 A14 14 0 0 1 12 128 L12 24 A22 22 0 0 1 56 24 L56 136 A28 28 0 0 1 0 136 L0 42" stroke="#eef0f3" stroke-width="2.4"/>
</g>`;

async function logoCubeDataUri() {
  const buf = await sharp(LOGO_CUBE).resize({ height: 50 }).png().toBuffer();
  return `data:image/png;base64,${buf.toString('base64')}`;
}

export async function makeReviewThumbnail({ photoPath, title, destPath, cover = true }) {
  const { headline, caption, label } = deriveThumbText(title);
  const lines = layoutHeadline(headline);
  const cube = await logoCubeDataUri();

  const headlineSvg = lines
    .map(
      (l) =>
        `<text x="${SIZE / 2}" y="${l.y.toFixed(1)}" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="${l.size}" letter-spacing="-2" fill="${C.blue}">${escapeXml(l.text)}</text>`,
    )
    .join('');

  const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${C.bg}"/>
  <rect x="47" y="55" width="986" height="993" fill="${C.panel}"/>
  <rect x="47" y="55" width="986" height="78" fill="${C.strip}"/>
  <rect x="47" y="57" width="122" height="76" fill="${C.blue}"/>
  <text x="187" y="106" font-family="Pretendard" font-weight="700" font-size="35" fill="${C.label}">${escapeXml(label)}</text>
  <image x="772" y="69" height="50" width="50" href="${cube}"/>
  <text x="826" y="106" font-family="Pretendard" font-weight="800" font-size="33" fill="${C.brand}">한양미래연구소</text>
  ${cover ? '' : `<rect x="${PHOTO.x}" y="${PHOTO.y}" width="${PHOTO.w}" height="${PHOTO.h}" fill="#eef2f7"/>`}
  ${PAPERCLIP}
  ${headlineSvg}
</svg>`;

  const base = render(baseSvg);
  let photo;
  let photoLeft = PHOTO.x;
  let photoTop = PHOTO.y;
  if (cover) {
    photo = await sharp(photoPath).rotate().resize(PHOTO.w, PHOTO.h, { fit: 'cover', position: 'attention' }).toBuffer();
  } else {
    // 사진이 아닌 그래픽(카드형·로고)은 잘리지 않게 전체를 보여준다
    const maxW = PHOTO.w - 60;
    const maxH = PHOTO.h - 60;
    photo = await sharp(photoPath).rotate().resize(maxW, maxH, { fit: 'inside', withoutEnlargement: false }).toBuffer();
    const meta = await sharp(photo).metadata();
    photoLeft = PHOTO.x + Math.round((PHOTO.w - meta.width) / 2);
    photoTop = PHOTO.y + Math.round((PHOTO.h - meta.height) / 2);
  }

  const layers = [{ input: photo, left: photoLeft, top: photoTop }];

  if (caption) {
    const fs = 28;
    const w = Math.ceil(measure(caption, fs, 500)) + 40;
    const h = 46;
    const x = PHOTO.x + PHOTO.w - 18 - w;
    const y = PHOTO.y + PHOTO.h - 15 - h;
    const captionSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.captionBg}" fill-opacity="0.9"/>
  <text x="${x + w / 2}" y="${y + 32}" text-anchor="middle" font-family="Pretendard" font-weight="500" font-size="${fs}" fill="${C.captionText}">${escapeXml(caption)}</text>
</svg>`;
    layers.push({ input: render(captionSvg), left: 0, top: 0 });
  }

  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await sharp(base).composite(layers).jpeg({ quality: 84, mozjpeg: true }).toFile(destPath);
}

/** 사진다운 이미지를 고른다(흰 카드 그래픽·어두운 일러스트·단색에 가까운 이미지는 제외). 없으면 첫 이미지를 isPhoto:false 로 반환 */
export async function pickPhoto(candidates) {
  for (const file of candidates) {
    try {
      const { data, info } = await sharp(file).resize(48, 48, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
      const n = info.width * info.height;
      let sum = 0;
      let nearWhite = 0;
      const lum = [];
      for (let i = 0; i < n; i++) {
        const r = data[i * info.channels];
        const g = data[i * info.channels + 1];
        const b = data[i * info.channels + 2];
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        lum.push(l);
        sum += l;
        if (l > 238) nearWhite += 1;
      }
      const mean = sum / n;
      const sd = Math.sqrt(lum.reduce((s, l) => s + (l - mean) ** 2, 0) / n);
      if (mean >= 70 && mean <= 215 && nearWhite / n < 0.3 && sd > 30) return { file, isPhoto: true };
    } catch {
      /* 다음 후보 */
    }
  }
  return { file: candidates[0], isPhoto: false };
}
