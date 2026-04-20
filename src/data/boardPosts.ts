import eventsData from "./boards/events.json";
import reviewsData from "./boards/reviews.json";

export interface StaticBoardPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  href: string;
}

export const eventPosts: StaticBoardPost[] = eventsData as StaticBoardPost[];
export const reviewPosts: StaticBoardPost[] = reviewsData as StaticBoardPost[];
