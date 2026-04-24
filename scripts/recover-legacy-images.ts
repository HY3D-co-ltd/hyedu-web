/**
 * 옛 Mailplug BBS 의 이미지를 미러 서버(print3d.10pages.co.kr)에서 가져와
 * 로컬 저장소에 저장 + 리사이즈하고, reviews.json / events.json / boardPostDetails.ts 의
 * 이미지 URL 을 모두 로컬 경로로 교체한다.
 *
 * 실행:  npx tsx scripts/recover-legacy-images.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const ROOT = process.cwd();
const MIRROR = 'http://print3d.10pages.co.kr';
const OLD_PREFIX = 'https://hyedu.kr';

const OUT_DIR = path.join(ROOT, 'public', 'images', 'board', 'legacy');
const MAX_DIM = 1200; // 최대 변 길이
const JPEG_QUALITY = 82;

interface StaticBoardPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  href: string;
  body?: string;
  author?: string;
}

function sanitizeNameFromUrl(url: string): string {
  // 원본 파일명 기반 + 해시로 충돌 방지. 한글/특수문자는 해시에 담김
  const lastSlash = url.lastIndexOf('/');
  const raw = lastSlash >= 0 ? url.slice(lastSlash + 1) : url;
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();
  const ascii = decoded.replace(/[^a-zA-Z0-9._-]/g, '');
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  const base = ascii.replace(/\.[^.]+$/, '').slice(0, 40) || 'img';
  return `${base}-${hash}.jpg`;
}

async function downloadAndResize(
  originalUrl: string,
  destPath: string,
): Promise<{ ok: boolean; bytes?: number; error?: string }> {
  try {
    const mirrorUrl = originalUrl.replace(OLD_PREFIX, MIRROR);
    const res = await fetch(mirrorUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
      },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    const resized = await sharp(buf)
      .rotate() // EXIF 기반 회전
      .resize({
        width: MAX_DIM,
        height: MAX_DIM,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toBuffer();
    fs.writeFileSync(destPath, resized);
    return { ok: true, bytes: resized.length };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const reviewsPath = path.join(ROOT, 'src/data/boards/reviews.json');
  const eventsPath = path.join(ROOT, 'src/data/boards/events.json');
  const detailsPath = path.join(ROOT, 'src/data/boardPostDetails.ts');

  const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8')) as StaticBoardPost[];
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8')) as StaticBoardPost[];
  const detailsSrc = fs.readFileSync(detailsPath, 'utf8');

  // 1) 모든 이미지 URL 수집
  const urlSet = new Set<string>();
  reviews.forEach((p) => p.thumbnail?.startsWith(OLD_PREFIX) && urlSet.add(p.thumbnail));
  events.forEach((p) => p.thumbnail?.startsWith(OLD_PREFIX) && urlSet.add(p.thumbnail));

  const imgRe = /https:\/\/hyedu\.kr\/skin\/(thumb|upload)\/[^"'\\>\s)]+/g;
  let m: RegExpExecArray | null;
  while ((m = imgRe.exec(detailsSrc))) urlSet.add(m[0]);

  const urls = Array.from(urlSet);
  console.log(`총 ${urls.length}개 이미지 처리 시작`);

  // 2) URL -> 로컬 파일명 매핑
  const mapping = new Map<string, string>();
  const nameUsed = new Set<string>();

  for (const url of urls) {
    let name = sanitizeNameFromUrl(url);
    // 중복 방지
    let suffix = 1;
    while (nameUsed.has(name)) {
      name = name.replace(/\.jpg$/, `-${suffix++}.jpg`);
    }
    nameUsed.add(name);
    mapping.set(url, name);
  }

  // 3) 병렬 다운로드 (6개씩)
  const results: Array<{ url: string; ok: boolean; bytes?: number; error?: string }> = [];
  const queue = [...urls];
  const CONCURRENCY = 6;
  let done = 0;

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      if (!url) break;
      const filename = mapping.get(url)!;
      const dest = path.join(OUT_DIR, filename);
      if (fs.existsSync(dest)) {
        results.push({ url, ok: true, bytes: fs.statSync(dest).size });
        done++;
        continue;
      }
      const r = await downloadAndResize(url, dest);
      results.push({ url, ...r });
      done++;
      if (done % 10 === 0 || done === urls.length) {
        console.log(`  진행: ${done}/${urls.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  // 결과 요약
  const okResults = results.filter((r) => r.ok);
  const failResults = results.filter((r) => !r.ok);
  const totalBytes = okResults.reduce((s, r) => s + (r.bytes ?? 0), 0);
  console.log(`\n다운로드 완료: 성공 ${okResults.length} / 실패 ${failResults.length}`);
  console.log(`총 크기: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  if (failResults.length > 0) {
    console.log('\n실패 URL (상위 10개):');
    failResults.slice(0, 10).forEach((r) => console.log(`  ${r.url} → ${r.error}`));
  }

  // 4) JSON 업데이트 (성공한 것만 교체, 실패한 URL 은 비워둠)
  function rewriteUrl(orig: string): string {
    const r = results.find((x) => x.url === orig);
    if (!r?.ok) return ''; // 다운로드 실패 → 빈 문자열
    return `/images/board/legacy/${mapping.get(orig)}`;
  }

  for (const p of reviews) {
    if (p.thumbnail?.startsWith(OLD_PREFIX)) p.thumbnail = rewriteUrl(p.thumbnail);
  }
  for (const p of events) {
    if (p.thumbnail?.startsWith(OLD_PREFIX)) p.thumbnail = rewriteUrl(p.thumbnail);
  }
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2) + '\n');
  fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + '\n');

  // 5) boardPostDetails.ts 업데이트 (HTML body 내의 <img src>)
  let newDetailsSrc = detailsSrc;
  for (const url of urls) {
    const r = results.find((x) => x.url === url);
    if (!r?.ok) continue;
    const localUrl = `/images/board/legacy/${mapping.get(url)}`;
    // 정확한 URL 치환 (이스케이프된 상태로 매칭)
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    newDetailsSrc = newDetailsSrc.replace(new RegExp(escaped, 'g'), localUrl);
  }
  fs.writeFileSync(detailsPath, newDetailsSrc);

  console.log('\n✅ JSON 및 boardPostDetails.ts 업데이트 완료');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
