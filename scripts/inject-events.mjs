import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const EVENTS_PATH = path.resolve('src/data/boards/events.json');

// Featured events appear first in the listing, in the order declared here.
// NOTE: once a post has been edited via /admin, remove its entry here —
// re-running this script would overwrite the admin-edited body/fields.
const meta = {};

const events = JSON.parse(fs.readFileSync(EVENTS_PATH, 'utf-8'));

for (const [id, { htmlPath, entry }] of Object.entries(meta)) {
  const html = fs.readFileSync(path.resolve(htmlPath), 'utf-8').replace(/\r?\n\s*/g, '').trim();
  const existingIdx = events.findIndex((e) => e.id === id);
  const next = { ...entry, body: html };
  if (existingIdx === -1) {
    events.unshift(next);
    console.log(`Added event ${id} (${html.length} chars)`);
  } else {
    events[existingIdx] = { ...events[existingIdx], ...next };
    console.log(`Updated event ${id} (${html.length} chars)`);
  }
}

// Featured events first (in meta declaration order), then legacy events by ID desc.
const metaIds = Object.keys(meta);
events.sort((a, b) => {
  const aIdx = metaIds.indexOf(a.id);
  const bIdx = metaIds.indexOf(b.id);
  if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
  if (aIdx !== -1) return -1;
  if (bIdx !== -1) return 1;
  return Number(b.id) - Number(a.id);
});

fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2) + '\n', 'utf-8');
console.log(`Total events: ${events.length}`);

// SNS 미리보기용 OG PNG 자동 생성 (포스터 SVG → PNG).
// 카카오톡·페이스북·라인·슬랙 등이 SVG 미지원이므로 필수.
console.log('\n--- Generating SNS preview PNGs ---');
execSync('node scripts/generate-og-images.mjs', { stdio: 'inherit' });
