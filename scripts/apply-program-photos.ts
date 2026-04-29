/**
 * '찾체 사진' 폴더의 사진들을 알맞은 프로그램 썸네일로 일괄 적용.
 * - PNG → JPG 600x450 cover 리사이즈 (sharp)
 * - public/images/programs/ 에 새 파일로 저장
 * - src/data/programs.ts 의 thumbnail 경로 갱신
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, '찾체 사진');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'programs');
const PROGRAMS_FILE = path.join(ROOT, 'src', 'data', 'programs.ts');

// '찾체 사진/<filename>.png' → 'programs.ts 의 thumbnail 경로'(현재 값)
// 매핑된 사진은 새 .jpg 로 저장되며 programs.ts 가 그 경로로 갱신됨.
const MAPPINGS: Array<{ photo: string; currentThumb: string; outBase: string }> = [
  { photo: '3d 프린터.png', currentThumb: '/images/programs/maker_activity_1_3d_printer.png', outBase: 'photo-3d-printer' },
  { photo: '3d펜.png', currentThumb: '/images/programs/maker_activity_2_3d_pen.png', outBase: 'photo-3d-pen' },
  { photo: '가로등.png', currentThumb: '/images/programs/2020_visit_new_coding19.png', outBase: 'photo-streetlamp' },
  { photo: '강아지 자동차.png', currentThumb: '/images/programs/new-programai04.png', outBase: 'photo-dog-car' },
  { photo: '드론.png', currentThumb: '/images/programs/maker_activity_5_drone_steam.png', outBase: 'photo-drone' },
  { photo: '따라오는 달팽이.png', currentThumb: '/images/programs/new-programai05.png', outBase: 'photo-snail-robot' },
  { photo: '메타버스.png', currentThumb: '/images/programs/2023_visit_maker_1.png', outBase: 'photo-metaverse' },
  { photo: '블록코딩.png', currentThumb: '/images/programs/2020_visit_new_coding04.png', outBase: 'photo-block-coding' },
  { photo: '빅데이터 분석 예측.png', currentThumb: '/images/programs/2023_visit_coding_1.png', outBase: 'photo-bigdata' },
  { photo: '스마트팜.png', currentThumb: '/images/programs/2020_visit_new_coding23.png', outBase: 'photo-smartfarm' },
  { photo: '스마트홈.png', currentThumb: '/images/programs/2020_visit_new_coding24.png', outBase: 'photo-smarthome' },
  { photo: '신재생_전기자동차.png', currentThumb: '/images/programs/2023_visit_new_steam01.png', outBase: 'photo-renewable' },
  { photo: '아케이드 게임.png', currentThumb: '/images/programs/new-programai02.png', outBase: 'photo-arcade' },
  { photo: '야경디자이너.png', currentThumb: '/images/programs/new-programai07.png', outBase: 'photo-night-design' },
  { photo: '어플리케이션 개발자.png', currentThumb: '/images/programs/2020_visit_new_coding05.png', outBase: 'photo-app-dev' },
  { photo: '유튜브.png', currentThumb: '/images/programs/2020_visit_new_maker01.png', outBase: 'photo-youtube' },
];

async function main() {
  let src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const ok: string[] = [];
  const fail: Array<{ photo: string; reason: string }> = [];

  for (const m of MAPPINGS) {
    const inPath = path.join(SRC_DIR, m.photo);
    const outFile = `${m.outBase}.jpg`;
    const outPath = path.join(OUT_DIR, outFile);
    const newThumb = `/images/programs/${outFile}`;

    if (!fs.existsSync(inPath)) {
      fail.push({ photo: m.photo, reason: '원본 없음' });
      continue;
    }

    try {
      await sharp(inPath)
        .resize({ width: 600, height: 450, fit: 'cover', position: 'center' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outPath);

      // programs.ts 의 해당 thumbnail 경로 교체 (정확한 매칭)
      const before = src;
      src = src.replace(
        new RegExp(`'${m.currentThumb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g'),
        `'${newThumb}'`,
      );
      if (src === before) {
        fail.push({ photo: m.photo, reason: `programs.ts 에서 ${m.currentThumb} 매칭 실패` });
      } else {
        ok.push(`${m.photo} → ${outFile}`);
      }
    } catch (err) {
      fail.push({ photo: m.photo, reason: String(err) });
    }
  }

  fs.writeFileSync(PROGRAMS_FILE, src);

  console.log(`\n✅ 성공 ${ok.length}건:`);
  ok.forEach((s) => console.log('  ' + s));
  if (fail.length > 0) {
    console.log(`\n❌ 실패 ${fail.length}건:`);
    fail.forEach((f) => console.log(`  ${f.photo} → ${f.reason}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
