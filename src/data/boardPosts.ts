import eventsData from "./boards/events.json";
import reviewsData from "./boards/reviews.json";

export interface StaticBoardPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  /** 외부 연결(구 BBS). 새로 작성되는 글은 body 를 채우고 href 는 빈 문자열. */
  href: string;
  /** 관리자 페이지에서 작성된 본문 (HTML). 있으면 내부 상세 페이지에서 렌더링. */
  body?: string;
  /** 작성자. 기본값 "관리자". */
  author?: string;
}

export const eventPosts: StaticBoardPost[] = eventsData as StaticBoardPost[];
export const reviewPosts: StaticBoardPost[] = reviewsData as StaticBoardPost[];
