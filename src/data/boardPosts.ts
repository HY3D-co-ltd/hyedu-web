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

  // ─── SEO/AEO 구조화 데이터 (events 게시판 신규 행사용) ──────────────────────
  /** 150–200자 요약. metadata.description / og:description 에 사용. 없으면 title 사용. */
  description?: string;
  /** ISO 8601 시작 시각 (예: "2026-05-16T10:00:00+09:00"). EventJsonLd 활성화. */
  eventStartDate?: string;
  /** ISO 8601 종료 시각. */
  eventEndDate?: string;
  /** 장소 표시 이름 (예: "한양대학교 ERICA 창업보육센터"). EventJsonLd location.name. */
  venueName?: string;
  /** 상세 주소 (예: "경기도 안산시 상록구 한양대학로 55 BI Center 219-1호"). */
  venueAddress?: string;
  /** 가격 (KRW). 0 또는 'free' = 무료. EventJsonLd offers.price. */
  price?: number | 'free';
  /** 모집 인원. EventJsonLd maximumAttendeeCapacity. */
  capacity?: number;
  /** 협찬사 이름. EventJsonLd sponsor.name. */
  sponsorName?: string;
  /** FAQ 항목. FAQJsonLd 활성화 + AEO(ChatGPT/Perplexity 인용 친화) 강화. */
  faqs?: { question: string; answer: string }[];
}

export const eventPosts: StaticBoardPost[] = eventsData as StaticBoardPost[];
export const reviewPosts: StaticBoardPost[] = reviewsData as StaticBoardPost[];
