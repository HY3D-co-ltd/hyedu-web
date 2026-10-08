/**
 * 네이버 블로그(hyhyedu) RSS → 교육 후기(reviews.json) 자동 동기화.
 *
 * 1. RSS에서 새 글 감지 (guid의 logNo 기준 중복 체크)
 * 2. 원문 PostView 페이지에서 SmartEditor 본문·이미지를 가져와 단순 HTML로 변환
 * 3. 이미지는 public/images/board/reviews/naver/ 로 내려받아 리사이즈 (외부 링크 의존 X)
 * 4. reviews.json 맨 앞에 추가 + scripts/naver-sync-state.json 에 처리 이력 기록
 *
 * 처리 이력(state)에 있는 글은 관리자가 삭제해도 다시 올라오지 않는다.
 *
 * 실행: node scripts/sync-naver-blog.mjs [--limit 30] [--dry-run] [--probe] [--rethumb] [--refresh-bodies [--only logNo]]
 * GitHub Actions: .github/workflows/sync-naver-blog.yml (매일 자동 실행)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';
import sharp from 'sharp';
import { makeReviewThumbnail, pickPhoto } from './lib/review-thumbnail.mjs';

const BLOG_ID = 'hyhyedu';
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;
const REVIEWS_PATH = path.resolve('src/data/boards/reviews.json');
const STATE_PATH = path.resolve('scripts/naver-sync-state.json');
const IMG_DIR = path.resolve('public/images/board/reviews/naver');
const IMG_URL_BASE = '/images/board/reviews/naver';
const AUTHOR = '한양미래연구소';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const args = process.argv.slice(2);
const PROBE = args.includes('--probe'); // 최신 1건을 저장 없이 시험 변환 (접근 차단 점검용)
const DRY_RUN = PROBE || args.includes('--dry-run');
const RETHUMB = args.includes('--rethumb'); // 이미 등록된 네이버 글의 썸네일을 현재 양식으로 다시 생성
const REFRESH = args.includes('--refresh-bodies'); // 이미 등록된 네이버 글의 본문만 원문에서 다시 변환 (관리자에서 고친 본문은 덮어씀)
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? String(args[onlyIdx + 1]) : null; // --refresh-bodies 대상을 글 1건(logNo)으로 제한
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) || 30 : 30;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(label, fn, tries = 3) {
  let lastErr;
  for (let i = 1; i <= tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < tries) await sleep(1000 * i);
    }
  }
  throw new Error(`${label}: ${lastErr?.message ?? lastErr}`);
}

async function fetchText(url) {
  return withRetry(`GET ${url}`, async () => {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'ko-KR,ko;q=0.9', Referer: 'https://blog.naver.com/' },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  });
}

async function fetchBuffer(url) {
  return withRetry(`GET ${url}`, async () => {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Referer: 'https://blog.naver.com/' },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { buf: Buffer.from(await res.arrayBuffer()), type: res.headers.get('content-type') ?? '' };
  });
}

// ─── RSS ────────────────────────────────────────────────────────────────────

function parseRss(xml) {
  const $ = cheerio.load(xml, { xmlMode: true });
  const items = [];
  $('item').each((_, el) => {
    const $el = $(el);
    const guid = $el.children('guid').text().trim();
    const logNo = (guid.match(/(\d{6,})\s*$/) ?? $el.children('link').text().match(/\/(\d{6,})/) ?? [])[1];
    if (!logNo) return;
    const descHtml = $el.children('description').text();
    const thumb = cheerio.load(descHtml)('img').first().attr('src');
    items.push({
      logNo,
      title: $el.children('title').text().trim(),
      pubDate: $el.children('pubDate').text().trim(),
      thumb: thumb ?? null,
    });
  });
  return items;
}

function toKstDate(pubDate) {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(d);
}

// ─── 본문 변환 ───────────────────────────────────────────────────────────────

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inlineHtml($, el) {
  let out = '';
  $(el)
    .contents()
    .each((_, node) => {
      if (node.type === 'text') {
        out += escapeHtml(node.data.replace(/​/g, ''));
        return;
      }
      if (node.type !== 'tag') return;
      const inner = inlineHtml($, node);
      switch (node.name) {
        case 'br':
          out += '<br>';
          break;
        case 'b':
        case 'strong':
          out += inner.trim() ? `<strong>${inner}</strong>` : inner;
          break;
        case 'i':
        case 'em':
          out += inner.trim() ? `<em>${inner}</em>` : inner;
          break;
        case 'u':
          out += inner.trim() ? `<u>${inner}</u>` : inner;
          break;
        case 'a': {
          const href = node.attribs?.href ?? '';
          out += /^https?:\/\//.test(href)
            ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
            : inner;
          break;
        }
        default:
          out += inner;
      }
    });
  return out;
}

const isBlank = (html) => html.replace(/<[^>]*>|&nbsp;|\s/g, '') === '';

// 사이트 공통 CSS(.post-content p)는 문단을 가운데 정렬 + 1em 간격으로 강제한다.
// 네이버 원문(왼쪽 정렬, 같은 묶음은 붙이고 빈 문단으로 구분)을 그대로 보이려면
// 문단마다 정렬과 여백을 인라인으로 지정해야 한다. (글자 크기/줄간격/색은 사이트 CSS가 !important 로 고정)
const alignOf = (cls) => (String(cls ?? '').match(/align-(left|center|right|justify)/) ?? [])[1] ?? 'left';

/** 문단 1개 → HTML. 빈 문단은 한 줄 간격(<br>)으로 보존한다 */
function paragraphHtml($, p, extraStyle = '') {
  const html = inlineHtml($, p).trim();
  if (isBlank(html)) return '<p style="margin:0;"><br></p>';
  return `<p style="margin:0;text-align:${alignOf($(p).attr('class'))};${extraStyle}">${html}</p>`;
}

/** 연속된 빈 문단은 최대 2줄까지만 유지 */
function collapseBlanks(parts) {
  const BLANK = '<p style="margin:0;"><br></p>';
  const out = [];
  let run = 0;
  for (const part of parts) {
    if (part === BLANK) {
      run += 1;
      if (run > 2) continue;
    } else {
      run = 0;
    }
    out.push(part);
  }
  return out;
}

function textParagraphs($, root, extraStyle = '') {
  return $(root)
    .find('p.se-text-paragraph')
    .toArray()
    .map((p) => paragraphHtml($, p, extraStyle));
}

function sectionTitleHtml($, root) {
  const parts = [];
  $(root)
    .find('p.se-text-paragraph')
    .each((_, p) => {
      const html = inlineHtml($, p).trim();
      if (isBlank(html)) return;
      parts.push(
        `<h2 style="margin:36px 0 14px;text-align:${alignOf($(p).attr('class'))};font-size:1.65em;line-height:1.5;font-weight:700;">${html}</h2>`,
      );
    });
  return parts.join('');
}

// 네이버 기본 인용구(큰 따옴표 장식 + 가운데 이탤릭)
const QUOTE_MARK = 'font-family:Georgia,\'Times New Roman\',serif;font-style:normal;font-size:46px;line-height:1;color:#c9c9c9;text-align:center;';
function quotationHtml($, root) {
  const inner = textParagraphs($, root, 'font-style:italic;').filter((x) => !isBlank(x));
  if (!inner.length) return '';
  return (
    `<blockquote style="margin:30px 0;padding:0;border:0;font-family:Georgia,'Times New Roman',serif;">` +
    `<div style="${QUOTE_MARK}">&ldquo;</div>${inner.join('')}<div style="${QUOTE_MARK}">&rdquo;</div></blockquote>`
  );
}

function bigImageUrl(src) {
  const base = src.split('?')[0];
  return `${base}?type=w966`;
}

async function saveImage(src, logNo, n) {
  // 이미 받은 이미지는 다시 내려받지 않는다 (본문만 다시 만드는 --refresh-bodies 용)
  for (const ext of ['jpg', 'gif']) {
    const cached = `${logNo}-${n}.${ext}`;
    try {
      await fs.access(path.join(IMG_DIR, cached));
      return `${IMG_URL_BASE}/${cached}`;
    } catch {
      /* 없으면 새로 받음 */
    }
  }
  const url = bigImageUrl(src);
  const { buf, type } = await fetchBuffer(url);
  if (!type.startsWith('image/')) throw new Error(`not an image (${type})`);
  const isGif = type.includes('gif');
  const file = `${logNo}-${n}.${isGif ? 'gif' : 'jpg'}`;
  const dest = path.join(IMG_DIR, file);
  if (!DRY_RUN) {
    await fs.mkdir(IMG_DIR, { recursive: true });
    if (isGif) {
      await fs.writeFile(dest, buf);
    } else {
      await sharp(buf)
        .rotate()
        .resize({ width: 900, withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(dest);
    }
  }
  return `${IMG_URL_BASE}/${file}`;
}

async function convertPost(logNo, title) {
  const html = await fetchText(
    `https://blog.naver.com/PostView.naver?blogId=${BLOG_ID}&logNo=${logNo}&redirect=Dlog&widgetTypeCall=true&directAccess=false`,
  );
  const $ = cheerio.load(html);
  let container = $('.se-main-container').first();
  if (!container.length) container = $('#postViewArea').first();
  if (!container.length) throw new Error('본문 영역(.se-main-container)을 찾지 못함 — 네이버 구조 변경 가능성');

  const blocks = [];
  const images = [];
  let imgCount = 0;

  const pushImage = async (el) => {
    const $img = $(el);
    const src = $img.attr('data-lazy-src') || $img.attr('src');
    if (!src || !/^https?:\/\//.test(src)) return;
    imgCount += 1;
    try {
      const local = await saveImage(src, logNo, imgCount);
      images.push(local);
      blocks.push(`<img src="${local}" alt="${escapeHtml(title)}">`);
      await sleep(150);
    } catch (err) {
      console.warn(`  ⚠ 이미지 건너뜀 (${logNo}-${imgCount}): ${err.message}`);
    }
  };

  const components = container.is('.se-main-container') ? container.children('.se-component') : container;
  const comps = container.is('.se-main-container') ? components.toArray() : [container.get(0)];

  for (const comp of comps) {
    const $c = $(comp);
    const cls = $c.attr('class') ?? '';
    if (cls.includes('se-documentTitle')) continue;
    if (cls.includes('se-sectionTitle')) {
      const h = sectionTitleHtml($, comp);
      if (h) blocks.push(h);
    } else if (cls.includes('se-quotation')) {
      const q = quotationHtml($, comp);
      if (q) blocks.push(q);
    } else if (cls.includes('se-horizontalLine')) {
      blocks.push('<hr style="border:0;border-top:1px solid #d9d9d9;margin:32px 0;">');
    } else if (cls.includes('se-oglink')) {
      const $a = $c.find('a[href^="http"]').first();
      const label = $c.find('.se-oglink-title').first().text().trim() || $a.attr('href');
      if ($a.length) blocks.push(`<p style="margin:0 0 1em;text-align:left;"><a href="${escapeHtml($a.attr('href'))}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></p>`);
    } else if (cls.includes('se-table')) {
      const t = $c.find('table').first();
      if (t.length) {
        const rows = t
          .find('tr')
          .toArray()
          .map((tr) => `<tr>${$(tr).children('td,th').toArray().map((td) => `<td>${inlineHtml($, td).trim()}</td>`).join('')}</tr>`)
          .join('');
        blocks.push(`<div style="overflow-x:auto;"><table style="min-width:480px;"><tbody>${rows}</tbody></table></div>`);
      }
    } else {
      // text / image / imageGroup / imageStrip / 기타 — 텍스트와 이미지를 문서 순서대로 처리
      const nodes = $c.find('p.se-text-paragraph, img.se-image-resource').toArray();
      let pendingText = [];
      const flush = () => {
        if (pendingText.length) {
          blocks.push(collapseBlanks(pendingText).join(''));
          pendingText = [];
        }
      };
      for (const n of nodes) {
        if (n.name === 'img') {
          flush();
          await pushImage(n);
        } else {
          pendingText.push(paragraphHtml($, n));
        }
      }
      flush();
    }
  }

  const textLen = blocks.join('').replace(/<[^>]*>/g, '').length;
  if (textLen < 30 && images.length === 0) throw new Error('변환된 본문이 비어 있음');

  blocks.push(
    `<p style="margin:32px 0 0;text-align:center;"><a href="https://blog.naver.com/${BLOG_ID}/${logNo}" target="_blank" rel="noopener noreferrer">📝 네이버 블로그 원문 보기</a></p>`,
  );
  return { body: blocks.join(''), images };
}

// ─── 썸네일 ─────────────────────────────────────────────────────────────────

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf-8'));
  } catch {
    return fallback;
  }
}

/** 기존 후기 썸네일 양식(상단 띠 + 파란 제목 + 사진)으로 생성. 실패하면 null → 호출부에서 첫 이미지로 대체 */
async function buildThumbnail(logNo, title, localImages) {
  if (DRY_RUN || localImages.length === 0) return null;
  try {
    const files = localImages.map((p) => path.resolve('public', p.replace(/^\//, '')));
    const { file: photo, isPhoto } = await pickPhoto(files);
    const name = `${logNo}-thumb.jpg`;
    await makeReviewThumbnail({ photoPath: photo, title, destPath: path.join(IMG_DIR, name), cover: isPhoto });
    return `${IMG_URL_BASE}/${name}`;
  } catch (err) {
    console.warn(`  ⚠ 썸네일 생성 실패, 첫 이미지로 대체: ${err.message}`);
    return null;
  }
}

async function rethumbAll() {
  const reviews = await readJson(REVIEWS_PATH, []);
  const names = await fs.readdir(IMG_DIR);
  let done = 0;
  for (const r of reviews) {
    if (!r.id?.startsWith('naver-')) continue;
    const logNo = r.id.slice('naver-'.length);
    const imgs = names
      .filter((f) => f.startsWith(`${logNo}-`) && !f.includes('thumb') && /\.(jpg|gif)$/.test(f))
      .sort((a, b) => parseInt(a.split('-')[1], 10) - parseInt(b.split('-')[1], 10))
      .map((f) => `${IMG_URL_BASE}/${f}`);
    const thumb = await buildThumbnail(logNo, r.title, imgs);
    if (thumb) {
      r.thumbnail = thumb;
      done += 1;
      console.log(`✓ ${logNo} ${r.title}`);
    }
  }
  if (!DRY_RUN) await fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2) + '\n', 'utf-8');
  console.log(`\n썸네일 재생성 완료: ${done}건`);
}

async function refreshBodies() {
  const reviews = await readJson(REVIEWS_PATH, []);
  let done = 0;
  let failed = 0;
  for (const r of reviews) {
    if (!r.id?.startsWith('naver-')) continue;
    const logNo = r.id.slice('naver-'.length);
    if (ONLY && ONLY !== logNo) continue;
    try {
      const { body } = await convertPost(logNo, r.title);
      r.body = body;
      done += 1;
      console.log(`✓ ${logNo} ${r.title}`);
    } catch (err) {
      failed += 1;
      console.warn(`✗ ${logNo} 건너뜀: ${err.message}`);
    }
    await sleep(300);
  }
  if (!DRY_RUN && done > 0) await fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2) + '\n', 'utf-8');
  console.log(`\n본문 재변환 완료: ${done}건, 실패 ${failed}건`);
  if (done === 0) throw new Error('재변환된 글이 없습니다');
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main() {
  if (RETHUMB) return rethumbAll();
  if (REFRESH) return refreshBodies();

  const xml = await fetchText(RSS_URL);
  const items = parseRss(xml);
  if (items.length === 0) throw new Error('RSS에서 글을 하나도 읽지 못함');

  const reviews = await readJson(REVIEWS_PATH, []);
  const state = await readJson(STATE_PATH, { version: 1, processed: {} });
  const existingSlugs = new Set(reviews.map((r) => r.slug));

  const fresh = PROBE
    ? items.slice(0, 1)
    : items.filter((it) => !state.processed[it.logNo] && !existingSlugs.has(`naver-${it.logNo}`));
  console.log(`RSS ${items.length}건 중 신규 ${fresh.length}건 (이번 실행 상한 ${LIMIT}건)${DRY_RUN ? ' [dry-run]' : ''}`);

  const targets = fresh.slice(0, LIMIT);
  const added = [];
  let failed = 0;

  for (const it of targets) {
    try {
      console.log(`→ ${it.logNo} ${it.title}`);
      const { body, images } = await convertPost(it.logNo, it.title);
      let thumbnail = (await buildThumbnail(it.logNo, it.title, images)) ?? images[0] ?? '';
      if (!thumbnail && it.thumb) {
        try {
          thumbnail = await saveImage(it.thumb, it.logNo, 0);
        } catch {
          /* 썸네일 없이 진행 */
        }
      }
      added.push({
        id: `naver-${it.logNo}`,
        slug: `naver-${it.logNo}`,
        title: it.title,
        thumbnail,
        date: toKstDate(it.pubDate),
        href: '',
        body,
        author: AUTHOR,
      });
      state.processed[it.logNo] = { title: it.title, syncedAt: new Date().toISOString() };
      console.log(`  ✓ 본문 ${body.length}자, 이미지 ${images.length}장`);
    } catch (err) {
      failed += 1;
      console.warn(`  ✗ 건너뜀 (다음 실행 때 재시도): ${err.message}`);
    }
    await sleep(400);
  }

  if (targets.length > 0 && added.length === 0) {
    throw new Error(`시도한 ${targets.length}건 모두 실패 — 네이버 접근 차단 또는 구조 변경을 확인하세요`);
  }

  added.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  if (added.length > 0 && !DRY_RUN) {
    await fs.writeFile(REVIEWS_PATH, JSON.stringify([...added, ...reviews], null, 2) + '\n', 'utf-8');
    await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf-8');
  }

  console.log(`\n완료: 추가 ${added.length}건, 실패 ${failed}건, 남은 신규 ${fresh.length - targets.length}건`);
  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `added=${DRY_RUN ? 0 : added.length}\n`);
  }
}

main().catch((err) => {
  console.error(`\n✗ 동기화 실패: ${err.message}`);
  process.exit(1);
});
