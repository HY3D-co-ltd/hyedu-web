/**
 * Generate keyword-based English slugs for each board post (SEO/AEO-friendly).
 * Slug format: `{id}-{english-keywords}` for URL stability + keyword signal.
 *
 * Usage: npx tsx scripts/gen-slugs.ts
 */
import fs from 'fs';
import { eventPosts, reviewPosts } from '../src/data/boardPosts';

// Keyword-based English slugs (hand-crafted from each Korean title).
// Rule: extract activity/topic + school/venue, lowercase, hyphen-separated.
const EVENT_SLUGS: Record<string, string> = {
  '316': 'renewable-energy-saturday-camp',
  '315': 'ai-robot-engineer-saturday-camp',
  '314': 'app-game-developer-saturday-camp',
  '313': 'music-tech-engineer-saturday-camp',
  '312': 'hanyang-youth-ai-space-fusion-camp',
  '302': 'hanyang-youth-machine-learning-ai-camp',
  '301': '2026-competition-prep-camp',
  '300': '2026-hanyang-youth-saturday-camp',
  '299': '2025-national-university-sw-startup-ideathon',
  '298': '2025-erica-ai-robot-startup-ideathon',
  '297': '2025-paichai-smart-ict-makerthon',
  '296': '2025-erica-software-up-sw-startup-ideathon',
  '295': '2024-national-university-sw-startup-ideathon',
  '294': '2023-national-university-sw-startup-ideathon',
  '293': '2023-paichai-smart-ict-makerthon',
  '292': '2023-erica-software-up-sw-startup-ideathon',
  '291': '2022-sw-startup-makerthon-app-iot',
  '290': '2022-dongseoul-maker-ideathon-bootcamp',
  '289': '2022-erica-software-up-sw-startup-ideathon-offline',
  '288': '2022-erica-software-up-sw-startup-ideathon-online',
  '287': '2021-national-university-sw-startup-ideathon-online',
  '286': '2021-sw-startup-makerthon-app-iot-online',
  '285': '2021-erica-software-up-sw-startup-ideathon-online',
};

const REVIEW_SLUGS: Record<string, string> = {
  '329': 'ai-led-mood-lamp-ganghwa-girls-high',
  '328': 'algeomath-coding-webapp-ansan-seongan-high',
  '327': 'generative-ai-avatar-video-beombak-high',
  '326': 'drone-education-iwol-elementary',
  '325': 'ai-basics-experience-sanae-high',
  '324': 'no-code-chatbot-ganghwa-girls-high',
  '323': 'neobot-coding-autonomous-driving-samyuk-elementary',
  '322': 'bluetooth-speaker-career-ganghwa-girls-high',
  '321': 'drone-education-seohae-high',
  '320': 'robot-arm-ar-musilbit-kindergarten-wonju',
  '319': 'snail-robot-ai-iho-middle',
  '318': 'generative-ai-education-beombak-high',
  '317': 'ultrasonic-smart-robot-trashcan-sujeong-youth-center',
  '284': 'smart-house-block-coding-taejongdae-elementary',
  '283': 'augmented-reality-burim-elementary',
  '272': 'experience-class-cheongpyeong-high-electronics',
  '271': 'experience-class-yeoju-sangpum-middle',
  '267': 'experience-class-gajeong-high',
  '266': 'hanyang-youth-camp-ansan-technical-high',
  '265': 'experience-class-icheon-dawon',
  '264': 'youth-club-seomun-girls-high',
  '263': 'experience-class-hyeonhwa-high',
  '262': 'experience-class-osan-high',
  '260': '2024-national-youth-opensw-game-python-competition',
  '257': 'experience-class-jeonbuk-unitech-high',
  '256': 'experience-class-jinseong-high',
  '255': 'experience-class-seomun-girls-high',
  '254': 'experience-class-sangwon-high',
  '253': 'experience-class-yangpyeong-high',
  '252': 'experience-class-incheon-munhak-info-high',
};

const regen = (
  posts: typeof eventPosts,
  bbsNo: number,
  slugMap: Record<string, string>,
) =>
  posts.map((p) => {
    const keyword = slugMap[p.id];
    if (!keyword) throw new Error(`No slug mapping for id=${p.id} (${p.title})`);
    return {
      ...p,
      slug: `${p.id}-${keyword}`,
      href: `https://hyedu.kr/bbs/bbs/view.php?bbs_no=${bbsNo}&data_no=${p.id}`,
    };
  });

const newEvents = regen(eventPosts, 13, EVENT_SLUGS);
const newReviews = regen(reviewPosts, 10, REVIEW_SLUGS);

const toEntry = (p: typeof newEvents[0]) =>
  `  {\n    id: ${JSON.stringify(p.id)},\n    slug: ${JSON.stringify(p.slug)},\n    title: ${JSON.stringify(p.title)},\n    thumbnail: ${JSON.stringify(p.thumbnail)},\n    date: ${JSON.stringify(p.date)},\n    href: ${JSON.stringify(p.href)},\n  }`;

const content = `export interface StaticBoardPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  href: string;
}

export const eventPosts: StaticBoardPost[] = [
${newEvents.map(toEntry).join(',\n')},
];

export const reviewPosts: StaticBoardPost[] = [
${newReviews.map(toEntry).join(',\n')},
];
`;

fs.writeFileSync('src/data/boardPosts.ts', content);
console.log(`Wrote src/data/boardPosts.ts (events: ${newEvents.length}, reviews: ${newReviews.length})`);
console.log('\nSample slugs:');
console.log(`  ${newEvents[0].slug}`);
console.log(`  ${newEvents[9].slug}`);
console.log(`  ${newReviews[0].slug}`);
console.log(`  ${newReviews[5].slug}`);
