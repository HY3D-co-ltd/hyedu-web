export interface Program {
  slug: string;
  category: 'ai' | 'coding' | 'maker' | 'steam';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  target: ('elementary' | 'middle' | 'high' | 'adult')[];
  price: string;
  priceEn: string;
  duration: string;
  thumbnail: string;
  images: string[];
  curriculum: string[];
  curriculumEn: string[];
  faq: { question: string; questionEn: string; answer: string; answerEn: string }[];
}

export interface YouthClub {
  slug: string;
  category: 'maker' | 'coding' | 'steam' | 'startup';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  target: ('elementary' | 'middle' | 'high')[];
  price: string;
  thumbnail: string;
}

export interface OnlineCourse {
  slug: string;
  category: 'maker' | 'coding' | 'special';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: 'live' | 'video' | 'both';
  priceLive?: string;
  priceVideo?: string;
  thumbnail: string;
}

export interface SpecialLecture {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  duration: string;
  price: string;
  thumbnail: string;
  features: { title: string; titleEn: string; description: string; descriptionEn: string; image: string }[];
}

export interface Booth {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
}

export interface Camp {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  target: ('elementary' | 'middle' | 'high')[];
  price: string;
  thumbnail: string;
}

export interface HistoryItem {
  year: number;
  events: { title: string; titleEn: string }[];
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  images?: string[];
  boardType: 'reviews' | 'events' | 'gallery';
}

export interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface NavItem {
  label: string;
  labelKey: string;
  href?: string;
  children?: NavItem[];
}

export interface CancellationPolicy {
  type: 'experience' | 'camp';
  rules: { timing: string; timingEn: string; cancellation: string; cancellationEn: string; changes: string; changesEn: string }[];
}
