'use client';

import { getJsonFile, putJsonFile } from './github-api';
import type { StaticBoardPost } from '@/data/boardPosts';

/**
 * 관리자 페이지가 다루는 JSON 파일 경로와 스키마.
 */

export interface AdminPopup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  createdAt: string; // ISO 8601
}

const PATHS = {
  popups: 'src/data/boards/popups.json',
  reviews: 'src/data/boards/reviews.json',
  events: 'src/data/boards/events.json',
} as const;

// Popups
export const loadPopups = () => getJsonFile<AdminPopup[]>(PATHS.popups);
export const savePopups = (
  data: AdminPopup[],
  sha: string,
  message: string,
) => putJsonFile(PATHS.popups, data, sha, message);

// Reviews
export const loadReviews = () => getJsonFile<StaticBoardPost[]>(PATHS.reviews);
export const saveReviews = (
  data: StaticBoardPost[],
  sha: string,
  message: string,
) => putJsonFile(PATHS.reviews, data, sha, message);

// Events
export const loadEvents = () => getJsonFile<StaticBoardPost[]>(PATHS.events);
export const saveEvents = (
  data: StaticBoardPost[],
  sha: string,
  message: string,
) => putJsonFile(PATHS.events, data, sha, message);

// 공통 유틸
export function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
