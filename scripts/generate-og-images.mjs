/**
 * 행사 SVG 포스터를 카카오톡·페이스북·라인·슬랙 등 SNS 링크 미리보기용
 * PNG 이미지로 변환한다 (포스터 SVG는 SNS 미리보기 미지원).
 *
 * 출력: {slug}-og.png (1200x1690, 포스터 풀 비율 유지)
 *
 * 실행: node scripts/generate-og-images.mjs
 *
 * 자동: scripts/inject-events.mjs 실행 후 자동 호출됨
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const EVENTS_DIR = path.resolve('public/images/board/events');

const svgs = fs
  .readdirSync(EVENTS_DIR)
  .filter((f) => f.endsWith('.svg'));

if (svgs.length === 0) {
  console.log('No SVG posters found in public/images/board/events/');
  process.exit(0);
}

let generated = 0;
let skipped = 0;

for (const file of svgs) {
  const svgPath = path.join(EVENTS_DIR, file);
  const pngPath = path.join(EVENTS_DIR, file.replace(/\.svg$/, '-og.png'));

  // SVG가 PNG보다 새것이면 재생성
  const svgMtime = fs.statSync(svgPath).mtimeMs;
  const pngMtime = fs.existsSync(pngPath) ? fs.statSync(pngPath).mtimeMs : 0;

  if (pngMtime >= svgMtime) {
    skipped++;
    continue;
  }

  const svgBuffer = fs.readFileSync(svgPath);

  // 원본 SVG는 605x852. 2x 해상도(1210x1704)로 PNG 생성.
  // 카카오톡·페이스북 권장 1200px 이상, 충분히 깔끔함.
  await sharp(svgBuffer, { density: 200 })
    .resize(1210, 1704, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(pngPath);

  generated++;
  console.log(`Generated: ${path.basename(pngPath)}`);
}

console.log(`Done. Generated: ${generated}, Skipped (up-to-date): ${skipped}`);
