/**
 * S7 「관심 있는 프로그램」 목록. 교육 형태(S1)별로 src/data의 상품을 카드로 바꾸고,
 * 분야(S6) × 대상(S4)으로 거른다. 사양 §3 S7.
 */
import { programs } from '@/data/programs';
import { youthClubs } from '@/data/youth-clubs';
import { specialLectures } from '@/data/special-lectures';
import { booths } from '@/data/booths';
import { camps } from '@/data/camps';
import { onlineCourses } from '@/data/online-courses';
import type { EduKey, FieldKey, Loc, Target } from './types';

export interface CatalogItem {
  /** `${kind}:${slug}` — 데이터 파일 사이에 slug가 겹치므로(3d-pen-designer) kind를 붙인다 */
  id: string;
  /** ko 제목이 보내는 값이다 */
  title: Loc;
  price: Loc;
  thumbnail: string;
  category?: string;
  targets?: Target[];
  /** 온라인 과정이 지원하는 방식 */
  modes?: ('live' | 'video')[];
}

/** 숨김 프로그램은 어디에서도 쓰지 않는다 (목록 · 미리 채우기 · 추천). */
const visiblePrograms = programs.filter((p) => !p.hidden);

const programItems: CatalogItem[] = visiblePrograms.map((p) => ({
  id: `program:${p.slug}`,
  title: { ko: p.title, en: p.titleEn },
  price: { ko: p.price, en: p.priceEn },
  thumbnail: p.thumbnail,
  category: p.category,
  targets: p.target,
}));

const clubItems: CatalogItem[] = (() => {
  const own: CatalogItem[] = youthClubs.map((c) => ({
    id: `club:${c.slug}`,
    title: { ko: c.title, en: c.titleEn },
    price: { ko: c.price, en: c.price },
    thumbnail: c.thumbnail,
    category: c.category,
    targets: c.target,
  }));
  // 같은 제목은 하나만 보여 준다. 동아리 데이터 쪽을 남긴다(회기 단가가 그쪽에 있다).
  const titles = new Set(own.map((c) => c.title.ko));
  const fromPrograms = programItems.filter(
    (p) => visiblePrograms.find((v) => `program:${v.slug}` === p.id)?.clubAvailable && !titles.has(p.title.ko),
  );
  return [...own, ...fromPrograms];
})();

const lectureItems: CatalogItem[] = specialLectures.map((l) => ({
  id: `lecture:${l.slug}`,
  title: { ko: l.title, en: l.titleEn },
  price: { ko: l.price, en: l.price },
  thumbnail: l.thumbnail,
}));

const boothItems: CatalogItem[] = booths.map((b) => ({
  id: `booth:${b.slug}`,
  title: { ko: b.title, en: b.titleEn },
  price: { ko: '견적 문의', en: 'Quote on request' },
  thumbnail: b.thumbnail,
}));

const campItems: CatalogItem[] = camps.map((c) => ({
  id: `camp:${c.slug}`,
  title: { ko: c.title, en: c.titleEn },
  price: { ko: c.price, en: c.price },
  thumbnail: c.thumbnail,
  targets: c.target,
}));

const onlineItems: CatalogItem[] = onlineCourses.map((c) => {
  const ko: string[] = [];
  const en: string[] = [];
  if (c.priceLive) {
    ko.push(`실시간 ${c.priceLive}`);
    en.push(`Live ${c.priceLive}`);
  }
  if (c.priceVideo) {
    ko.push(`영상 ${c.priceVideo}`);
    en.push(`Video ${c.priceVideo}`);
  }
  return {
    id: `online:${c.slug}`,
    title: { ko: c.title, en: c.titleEn },
    price: { ko: ko.join(' / '), en: en.join(' / ') },
    thumbnail: c.thumbnail,
    category: c.category,
    modes: c.type === 'both' ? ['live', 'video'] : [c.type],
  };
});

const ALL_ITEMS = [...programItems, ...clubItems, ...lectureItems, ...boothItems, ...campItems, ...onlineItems];

export function findItem(id: string): CatalogItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id);
}

/** `?program=<slug>` 미리 채우기. programs.ts 전용이며 숨김은 찾지 않는다. */
export function findProgramBySlug(slug: string) {
  return visiblePrograms.find((p) => p.slug === slug);
}

export interface CatalogResult {
  items: CatalogItem[];
  /** 필터를 풀었는지: 'none' 그대로, 'field' 분야 필터를 풂, 'all' 대상 필터까지 풂 */
  relaxed: 'none' | 'field' | 'all';
}

export function catalogFor(edu: EduKey | undefined, fields: FieldKey[], targets: Target[]): CatalogResult {
  let base: CatalogItem[];
  let useField = false;
  let useTarget = false;
  switch (edu) {
    case 'club':
      base = clubItems;
      useField = true;
      useTarget = true;
      break;
    case 'lecture':
      base = lectureItems;
      break;
    case 'booth':
      base = boothItems;
      break;
    case 'camp':
      base = campItems;
      useTarget = true;
      break;
    case 'online':
      base = onlineItems;
      break;
    default:
      base = programItems;
      useField = true;
      useTarget = true;
  }

  const fieldSet = fields.filter((f) => f !== 'recommend');
  const byField = (items: CatalogItem[]) =>
    useField && fieldSet.length ? items.filter((i) => i.category && (fieldSet as string[]).includes(i.category)) : items;
  const byTarget = (items: CatalogItem[]) =>
    useTarget && targets.length ? items.filter((i) => !i.targets || i.targets.some((t) => targets.includes(t))) : items;

  const both = byTarget(byField(base));
  if (both.length) return { items: both, relaxed: 'none' };
  const targetOnly = byTarget(base);
  if (targetOnly.length) return { items: targetOnly, relaxed: 'field' };
  return { items: base, relaxed: 'all' };
}
