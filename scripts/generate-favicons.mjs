/**
 * 한양미래연구소 로고에서 큐브 부분만 추출하여 다양한 사이즈 파비콘 생성.
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

const LOGO_PATH = path.resolve('public/images/logo/logo.jpg');

// logo.jpg 는 250x60. 큐브는 leftmost 60x60 정사각형 영역에 위치.
// 로고에 텍스트 "한양미래연구소"가 함께 있어서 파비콘에는 부적합.
const CUBE_REGION = { left: 0, top: 0, width: 60, height: 60 };

const outputs = [
  { path: path.resolve('src/app/icon.png'), size: 32 },
  { path: path.resolve('src/app/apple-icon.png'), size: 180 },
  { path: path.resolve('public/icon-192.png'), size: 192 },
  { path: path.resolve('public/icon-512.png'), size: 512 },
];

// 1. logo.jpg에서 큐브 영역 추출 후 raw RGBA 픽셀 데이터로 변환.
const { data, info } = await sharp(LOGO_PATH)
  .extract(CUBE_REGION)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// 2. 흰색에 가까운 픽셀(R,G,B 모두 > 235)의 alpha를 0(투명)으로 설정.
// 큐브 디자인 자체에는 흰색이 없으므로 안전하게 배경만 제거됨.
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r > 235 && g > 235 && b > 235) {
    data[i + 3] = 0;
  }
}

// 3. 알파 채널 적용된 큐브를 다시 sharp 객체로 변환.
const cubeBuffer = await sharp(data, { raw: info }).png().toBuffer();

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
