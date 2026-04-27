/**
 * 한양미래연구소 큐브 로고에서 다양한 사이즈 파비콘 생성.
 *
 * 입력 우선순위:
 *  1. public/images/logo/logo-cube.png (투명 배경 큐브 원본 — 권장)
 *  2. public/images/logo/logo.jpg (전체 로고 — fallback, 흰 배경 자동 제거)
 *
 * 출력:
 *  - src/app/icon.png       (32x32, Next.js 자동 인식 favicon)
 *  - src/app/apple-icon.png (180x180, iOS 홈 화면 추가용)
 *  - public/icon-192.png    (192x192, PWA·안드로이드)
 *  - public/icon-512.png    (512x512, PWA·고해상도)
 *
 * 실행: node scripts/generate-favicons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const CUBE_PNG = path.resolve('public/images/logo/logo-cube.png');
const LOGO_JPG = path.resolve('public/images/logo/logo.jpg');

const outputs = [
  { path: path.resolve('src/app/icon.png'), size: 32 },
  { path: path.resolve('src/app/apple-icon.png'), size: 180 },
  { path: path.resolve('public/icon-192.png'), size: 192 },
  { path: path.resolve('public/icon-512.png'), size: 512 },
];

let cubeBuffer;

if (fs.existsSync(CUBE_PNG)) {
  // 케이스 1: 투명 배경 큐브 PNG 원본 사용 (가장 깔끔)
  console.log(`Using transparent cube PNG: ${path.relative(process.cwd(), CUBE_PNG)}`);
  cubeBuffer = fs.readFileSync(CUBE_PNG);
} else {
  // 케이스 2: logo.jpg에서 좌측 큐브 영역 추출 + 흰 배경 자동 제거 (fallback)
  console.log(`Cube PNG not found. Falling back to logo.jpg crop + white removal.`);
  const { data, info } = await sharp(LOGO_JPG)
    .extract({ left: 0, top: 0, width: 60, height: 60 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 235 && g > 235 && b > 235) data[i + 3] = 0;
  }
  cubeBuffer = await sharp(data, { raw: info }).png().toBuffer();
}

for (const { path: outPath, size } of outputs) {
  const dir = path.dirname(outPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(cubeBuffer)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`Generated: ${path.relative(process.cwd(), outPath)} (${size}x${size}, ${(stats.size / 1024).toFixed(1)}KB)`);
}

console.log('Done.');
