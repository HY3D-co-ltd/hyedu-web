/**
 * Board Data Crawling Script
 *
 * Crawls existing BBS pages from www.hyedu.kr and saves to Firestore.
 *
 * Prerequisites:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Firestore Database (Build > Firestore Database)
 * 3. Download a service account key:
 *      Project Settings > Service Accounts > Generate new private key
 * 4. Set environment variable pointing to the downloaded JSON file:
 *      export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   npx tsx scripts/crawl-board.ts
 *
 * Notes:
 * - The HTML parsing relies on class-name patterns from hyedu.kr's BBS software.
 *   If the site is updated, the regexes in extractPosts() and extractPostDetail()
 *   may need adjustment.
 * - Individual post pages are fetched to obtain full content and images.
 *   Add a short delay (DELAY_MS) between requests to avoid overloading the server.
 * - The script is idempotent in the sense that it does not check for duplicates.
 *   Running it multiple times will create duplicate documents. Use a fixed doc ID
 *   (e.g. based on the BBS post number) if you need upsert behaviour.
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// ---------------------------------------------------------------------------
// Firebase initialisation
// ---------------------------------------------------------------------------

if (getApps().length === 0) {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credPath) {
    console.error(
      'Error: GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.\n' +
        'Set it to the path of your Firebase service account key JSON file.\n' +
        'Example: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json'
    );
    process.exit(1);
  }
  initializeApp({ credential: cert(credPath) });
}

const db = getFirestore();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PostSummary {
  /** Numeric post ID extracted from the BBS URL parameter (no=…). */
  id: string;
  title: string;
  author: string;
  /** Raw date string as it appears on the list page, e.g. "2024-01-15". */
  dateStr: string;
  /** Absolute URL of the detail page. */
  url: string;
}

interface CrawledPost {
  id: string;
  title: string;
  /** Full HTML content of the post body (stripped to plain text as fallback). */
  content: string;
  author: string;
  createdAt: Date;
  thumbnail: string;
  images: string[];
  boardType: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = 'https://www.hyedu.kr';
/** Milliseconds to wait between individual page requests. */
const DELAY_MS = 500;

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Fetch a URL and return the raw HTML text. */
async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      // Some BBS systems reject requests without a User-Agent header.
      'User-Agent':
        'Mozilla/5.0 (compatible; HyeduMigrationBot/1.0; +https://hyedu.kr)',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

/** Strip HTML tags and decode common HTML entities. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/** Parse a date string like "2024-01-15" or "24-01-15" into a Date object.
 *  Falls back to the current date if parsing fails.
 */
function parseDate(raw: string): Date {
  const cleaned = raw.trim();
  // Attempt ISO-ish format (YYYY-MM-DD or YY-MM-DD)
  const iso = cleaned.match(/^(\d{2,4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
  if (iso) {
    const year =
      iso[1].length === 2 ? 2000 + parseInt(iso[1], 10) : parseInt(iso[1], 10);
    const month = parseInt(iso[2], 10) - 1;
    const day = parseInt(iso[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }
  console.warn(`  Could not parse date "${raw}", using current date`);
  return new Date();
}

/** Extract image src attributes from an HTML string and resolve them to absolute URLs. */
function extractImages(html: string): string[] {
  const imgs: string[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  for (const m of html.matchAll(imgRegex)) {
    const src = m[1].trim();
    if (!src || src.startsWith('data:')) continue;
    imgs.push(src.startsWith('http') ? src : `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`);
  }
  return [...new Set(imgs)]; // deduplicate
}

// ---------------------------------------------------------------------------
// List-page parsing
// ---------------------------------------------------------------------------

/**
 * Parse the BBS list page HTML and return an array of post summaries.
 *
 * NOTE: This targets the typical GNU BBS / Rhymix-style markup used by
 * hyedu.kr. If the markup changes the regexes below will need updating.
 */
function extractPostSummaries(html: string, bbsNo: number): PostSummary[] {
  const posts: PostSummary[] = [];

  // Strategy 1: look for anchor tags whose href contains "no=\d+"
  // This covers the most common BBS list formats.
  const linkRegex =
    /<a[^>]+href=["']([^"']*bbs[^"']*no=(\d+)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;

  for (const m of html.matchAll(linkRegex)) {
    const rawHref = m[1];
    const postNo = m[2];
    const rawTitle = stripHtml(m[3]);

    // Filter out empty titles and navigation links
    if (!rawTitle || rawTitle.length < 2) continue;
    // Skip "more", "list", "write" type anchors that are not actual posts
    if (/^(더보기|목록|글쓰기|검색|이전|다음|first|last|prev|next)$/i.test(rawTitle)) continue;

    const href = rawHref.startsWith('http')
      ? rawHref
      : `${BASE_URL}${rawHref.startsWith('/') ? '' : '/'}${rawHref}`;

    // Avoid duplicate post IDs
    if (posts.some((p) => p.id === postNo)) continue;

    posts.push({
      id: postNo,
      title: rawTitle,
      author: '한양미래연구소',
      dateStr: '',
      url: href,
    });
  }

  // Strategy 2 (fallback): look for <td class="…title…"> cells with an anchor inside
  if (posts.length === 0) {
    const tdRegex =
      /<td[^>]*class="[^"]*(?:subject|title)[^"]*"[^>]*>([\s\S]*?)<\/td>/gi;
    for (const tdMatch of html.matchAll(tdRegex)) {
      const cell = tdMatch[1];
      const aMatch = cell.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
      if (!aMatch) continue;
      const rawHref = aMatch[1];
      const rawTitle = stripHtml(aMatch[2]);
      if (!rawTitle) continue;

      const noMatch = rawHref.match(/no=(\d+)/);
      const postNo = noMatch ? noMatch[1] : String(Date.now());

      const href = rawHref.startsWith('http')
        ? rawHref
        : `${BASE_URL}${rawHref.startsWith('/') ? '' : '/'}${rawHref}`;

      if (posts.some((p) => p.id === postNo)) continue;
      posts.push({ id: postNo, title: rawTitle, author: '한양미래연구소', dateStr: '', url: href });
    }
  }

  // Attempt to enrich with author / date from surrounding <td> siblings.
  // (Best-effort — many BBS formats differ here.)
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  for (const rowMatch of html.matchAll(rowRegex)) {
    const row = rowMatch[1];
    const noMatch = row.match(/no=(\d+)/);
    if (!noMatch) continue;
    const postNo = noMatch[1];
    const post = posts.find((p) => p.id === postNo);
    if (!post) continue;

    // Date: look for a pattern like 2024-01-15 or 24.01.15 in the row
    const dateMatch = row.match(/(\d{2,4}[.\-]\d{1,2}[.\-]\d{1,2})/);
    if (dateMatch && !post.dateStr) post.dateStr = dateMatch[1];

    // Author: look for <td class="…(writer|author|name)…">
    const authorMatch = row.match(
      /<td[^>]*class="[^"]*(?:writer|author|name)[^"]*"[^>]*>([\s\S]*?)<\/td>/i
    );
    if (authorMatch) {
      const a = stripHtml(authorMatch[1]);
      if (a) post.author = a;
    }
  }

  return posts;
}

// ---------------------------------------------------------------------------
// Detail-page parsing
// ---------------------------------------------------------------------------

/**
 * Fetch and parse an individual post detail page.
 * Returns the plain-text content and any image URLs found in the post body.
 */
async function extractPostDetail(
  summary: PostSummary
): Promise<{ content: string; images: string[]; thumbnail: string }> {
  let html: string;
  try {
    html = await fetchPage(summary.url);
  } catch (err) {
    console.warn(`  Warning: could not fetch detail page for "${summary.title}": ${err}`);
    return { content: '', images: [], thumbnail: '' };
  }

  // Try to isolate the post body.
  // Common BBS body containers: div.bbs_content, div.view_content, div#view_content, etc.
  const bodyPatterns = [
    /<div[^>]+class="[^"]*(?:bbs_content|view_content|post_content|content_view|article_body)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+id="[^"]*(?:bbs_content|view_content|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<td[^>]+class="[^"]*(?:content|bbs_content)[^"]*"[^>]*>([\s\S]*?)<\/td>/i,
  ];

  let bodyHtml = '';
  for (const pattern of bodyPatterns) {
    const m = html.match(pattern);
    if (m) {
      bodyHtml = m[1];
      break;
    }
  }

  // Fallback: use everything between <body> tags
  if (!bodyHtml) {
    const bodyTag = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    bodyHtml = bodyTag ? bodyTag[1] : html;
  }

  const images = extractImages(bodyHtml);
  const thumbnail = images[0] ?? '';
  const content = stripHtml(bodyHtml).replace(/\s{2,}/g, ' ').trim();

  return { content, images, thumbnail };
}

// ---------------------------------------------------------------------------
// Crawl a single board
// ---------------------------------------------------------------------------

async function crawlBoard(bbsNo: number, boardType: string): Promise<void> {
  console.log(`\nCrawling ${boardType} (bbs_no=${bbsNo})...`);

  let listHtml: string;
  try {
    listHtml = await fetchPage(`${BASE_URL}/bbs/bbs/?bbs_no=${bbsNo}`);
  } catch (err) {
    console.error(`  Failed to fetch list page: ${err}`);
    return;
  }

  const summaries = extractPostSummaries(listHtml, bbsNo);
  console.log(`  Found ${summaries.length} posts on the list page`);

  if (summaries.length === 0) {
    console.warn(
      '  No posts found. The BBS HTML structure may differ from expected.\n' +
        '  Inspect the page source and adjust the regex patterns in extractPostSummaries().'
    );
    return;
  }

  let saved = 0;
  for (const summary of summaries) {
    await sleep(DELAY_MS);

    let detail: { content: string; images: string[]; thumbnail: string };
    try {
      detail = await extractPostDetail(summary);
    } catch (err) {
      console.warn(`  Skipping "${summary.title}": ${err}`);
      continue;
    }

    const createdAt = summary.dateStr ? parseDate(summary.dateStr) : new Date();

    const post: CrawledPost = {
      id: summary.id,
      title: summary.title,
      content: detail.content,
      author: summary.author,
      createdAt,
      thumbnail: detail.thumbnail,
      images: detail.images,
      boardType,
    };

    // Use the BBS post ID as the Firestore document ID to enable idempotent upserts.
    const docRef = db
      .collection('boards')
      .doc(boardType)
      .collection('posts')
      .doc(`bbs_${post.id}`);

    await docRef.set({
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: Timestamp.fromDate(post.createdAt),
      updatedAt: Timestamp.fromDate(new Date()),
      thumbnail: post.thumbnail,
      images: post.images,
      boardType: post.boardType,
      sourceBbsNo: bbsNo,
      sourcePostId: post.id,
    });

    console.log(`  Saved [${post.id}]: ${post.title}`);
    saved++;
  }

  console.log(`  ${boardType}: ${saved}/${summaries.length} posts saved to Firestore`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('=========================================');
  console.log(' HyEdu Board Migration Script');
  console.log('=========================================');
  console.log('Make sure GOOGLE_APPLICATION_CREDENTIALS is set.\n');

  // 교육 후기
  await crawlBoard(10, 'reviews');
  // 대회&행사
  await crawlBoard(13, 'events');
  // 이미지 갤러리
  await crawlBoard(4, 'gallery');

  console.log('\n=========================================');
  console.log(' Migration complete!');
  console.log('=========================================');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
