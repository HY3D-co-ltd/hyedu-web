# hyedu.kr 웹사이트 리빌드 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** www.hyedu.kr 을 Next.js 기반 자체 호스팅 사이트로 완전 이전하여 SEO/AEO 최적화를 극대화한다.

**Architecture:** Next.js 15 정적 export + Firestore 클라이언트 SDK. 프로그램 데이터는 정적 TypeScript 파일, 게시판/팝업은 Firestore. next-intl로 한국어/영어 다국어 지원. GitHub Pages + GitHub Actions 자동 배포.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Firestore, next-intl, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-04-14-hyedu-website-rebuild-design.md`

---

## File Map

### Configuration Files
- `package.json` — 프로젝트 의존성
- `next.config.ts` — Next.js 정적 export + i18n 설정
- `tailwind.config.ts` — Tailwind 테마 (색상, 폰트)
- `tsconfig.json` — TypeScript 설정
- `postcss.config.mjs` — PostCSS + Tailwind
- `.github/workflows/deploy.yml` — GitHub Pages 자동 배포
- `public/robots.txt` — 크롤러 설정

### i18n
- `src/i18n/request.ts` — next-intl 서버 설정
- `src/i18n/routing.ts` — 라우팅 설정 (ko/en)
- `src/messages/ko.json` — 한국어 UI 번역
- `src/messages/en.json` — 영어 UI 번역
- `src/middleware.ts` — locale 리다이렉트

### Layout & Navigation
- `src/app/[locale]/layout.tsx` — 루트 레이아웃 (Header/Footer 포함, JSON-LD Organization)
- `src/components/layout/Header.tsx` — 상단 네비게이션 (로고, 메뉴, 언어 전환)
- `src/components/layout/Navigation.tsx` — 드롭다운 메뉴 + 모바일 햄버거
- `src/components/layout/Footer.tsx` — 하단 정보 (회사정보, SNS, 연락처)
- `src/components/layout/Popup.tsx` — Firestore 팝업 ("오늘 하루 안보기")
- `src/components/ui/LanguageSwitch.tsx` — 한/영 전환 버튼

### SEO/AEO Components
- `src/components/seo/JsonLd.tsx` — JSON-LD 스키마 생성 (Organization, Course, FAQPage, BreadcrumbList, Event)
- `src/app/sitemap.ts` — sitemap.xml 자동 생성

### UI Components
- `src/components/ui/Button.tsx` — 공통 버튼
- `src/components/ui/Card.tsx` — 프로그램 카드
- `src/components/ui/Slider.tsx` — 히어로/후기 슬라이더
- `src/components/ui/Pagination.tsx` — 게시판 페이지네이션

### Main Page Sections
- `src/app/[locale]/page.tsx` — 메인 페이지
- `src/components/sections/HeroSection.tsx` — 히어로 배너 슬라이더
- `src/components/sections/StatsSection.tsx` — 참여인원/학교 통계
- `src/components/sections/ProgramPreview.tsx` — 프로그램 카테고리 미리보기
- `src/components/sections/TestimonialSection.tsx` — 교육 후기 슬라이더
- `src/components/sections/PartnerSection.tsx` — 협력 기관 로고

### Data Files
- `src/data/programs.ts` — 체험교실 26개 프로그램
- `src/data/youth-clubs.ts` — 청소년 동아리
- `src/data/online-courses.ts` — 온라인 교육
- `src/data/special-lectures.ts` — 전문인 특강
- `src/data/booths.ts` — 체험 부스
- `src/data/camps.ts` — 캠프
- `src/data/partners.ts` — 협력 기관 목록
- `src/data/history.ts` — 연혁
- `src/data/cancellation-policy.ts` — 취소/환불 규정
- `src/data/navigation.ts` — 네비게이션 메뉴 구조

### Page Files
- `src/app/[locale]/about/page.tsx` — 소개
- `src/app/[locale]/programs/page.tsx` — 체험교실 목록
- `src/app/[locale]/programs/[slug]/page.tsx` — 프로그램 상세
- `src/app/[locale]/youth-club/page.tsx` — 청소년 동아리
- `src/app/[locale]/online/page.tsx` — 온라인 교육
- `src/app/[locale]/special-lecture/page.tsx` — 전문인 특강
- `src/app/[locale]/booth/page.tsx` — 체험 부스
- `src/app/[locale]/camp/page.tsx` — 캠프
- `src/app/[locale]/contact/page.tsx` — 교육 신청/문의
- `src/app/[locale]/board/reviews/page.tsx` — 교육 후기 목록
- `src/app/[locale]/board/reviews/[id]/page.tsx` — 후기 상세
- `src/app/[locale]/board/events/page.tsx` — 대회&행사 목록
- `src/app/[locale]/board/events/[id]/page.tsx` — 행사 상세
- `src/app/[locale]/board/gallery/page.tsx` — 이미지 갤러리

### Firestore
- `src/lib/firebase.ts` — Firestore 클라이언트 초기화
- `src/lib/board.ts` — 게시판 조회 함수
- `src/lib/popup.ts` — 팝업 조회 함수
- `src/types/index.ts` — 공유 타입 정의 (Program, BoardPost, Popup 등)

### Scripts
- `scripts/crawl-board.ts` — 기존 게시판 데이터 크롤링 → Firestore 이관
- `scripts/download-images.ts` — 기존 사이트 이미지 다운로드

---

## Task 1: 프로젝트 초기 설정

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- Create: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`
- Create: `src/i18n/request.ts`, `src/i18n/routing.ts`, `src/middleware.ts`
- Create: `src/messages/ko.json`, `src/messages/en.json`
- Create: `public/robots.txt`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd D:/Dev/hyedu-web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

- [ ] **Step 2: 의존성 설치**

```bash
npm install next-intl firebase swiper
npm install -D @types/node
```

- [ ] **Step 3: next.config.ts 설정 — 정적 export**

`next.config.ts`:
```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: Tailwind 테마 설정**

`tailwind.config.ts` — 기존 사이트 색상 기반:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#3b82f6',
        },
        secondary: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        accent: '#10b981',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: i18n 설정 — next-intl**

`src/i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
});
```

`src/i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

`src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],
};
```

- [ ] **Step 6: 최소 번역 파일 생성**

`src/messages/ko.json`:
```json
{
  "common": {
    "siteName": "한양미래연구소",
    "siteDescription": "No.1 교육 플랫폼 | 미래기술 체험교실",
    "contact": "문의하기",
    "learnMore": "자세히 보기",
    "home": "홈"
  },
  "nav": {
    "about": "소개",
    "programs": "찾아가는 체험교실",
    "experienceClass": "체험교실",
    "youthClub": "청소년 동아리",
    "online": "온라인 교육",
    "specialLecture": "전문인 특강",
    "booth": "체험 부스",
    "camp": "캠프",
    "eduRequest": "교육 신청",
    "contactUs": "교육신청/문의",
    "events": "대회&행사",
    "reviews": "교육 후기"
  },
  "footer": {
    "company": "(주)하이스타터",
    "ceo": "대표자: 이정욱",
    "bizNo": "사업자등록번호: 831-88-01997",
    "address": "경기도 안산시 상록구 한양대학로 55 5공학관 창업실",
    "tel": "TEL: 070-8064-0829",
    "email": "EMAIL: hyedu0829@gmail.com",
    "hours": "주중 9시 ~ 18시 (점심시간 12시 ~ 13시)",
    "holiday": "주말 및 공휴일 휴무",
    "inquiry": "교육 문의: 카카오톡 채널 '한양미래연구소'"
  }
}
```

`src/messages/en.json`:
```json
{
  "common": {
    "siteName": "Hanyang Future Lab",
    "siteDescription": "No.1 Education Platform | Future Technology Experience",
    "contact": "Contact Us",
    "learnMore": "Learn More",
    "home": "Home"
  },
  "nav": {
    "about": "About",
    "programs": "Experience Classes",
    "experienceClass": "Experience Class",
    "youthClub": "Youth Club",
    "online": "Online Education",
    "specialLecture": "Special Lectures",
    "booth": "Maker Booth",
    "camp": "Camp",
    "eduRequest": "Apply",
    "contactUs": "Contact / Apply",
    "events": "Events",
    "reviews": "Reviews"
  },
  "footer": {
    "company": "Hi-Starter Inc.",
    "ceo": "CEO: Lee Jeongwook",
    "bizNo": "Business Registration: 831-88-01997",
    "address": "Hanyang Univ. ERICA, 55 Hanyangdaehak-ro, Sangnok-gu, Ansan, Gyeonggi-do",
    "tel": "TEL: 070-8064-0829",
    "email": "EMAIL: hyedu0829@gmail.com",
    "hours": "Weekdays 9AM-6PM (Lunch 12PM-1PM)",
    "holiday": "Closed on weekends and holidays",
    "inquiry": "Inquiry: KakaoTalk Channel 'Hanyang Future Lab'"
  }
}
```

- [ ] **Step 7: 기본 레이아웃 생성**

`src/app/[locale]/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: '한양미래연구소 | No.1 교육 플랫폼',
  description: '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 메이커교육, STEAM교육 전문 플랫폼. 찾아가는 체험교실, 캠프, 온라인 교육 제공.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: 임시 메인 페이지**

`src/app/[locale]/page.tsx`:
```tsx
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <main>
      <h1>한양미래연구소</h1>
      <p>사이트 구축 중입니다.</p>
    </main>
  );
}
```

- [ ] **Step 9: robots.txt 생성**

`public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://hyedu.kr/sitemap.xml
```

- [ ] **Step 10: GitHub Actions 배포 설정**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 11: 빌드 확인**

```bash
npm run build
```
Expected: `out/` 디렉토리에 정적 파일 생성 성공

- [ ] **Step 12: 커밋**

```bash
git init
git add -A
git commit -m "chore: initialize Next.js project with i18n, Tailwind, static export"
```

---

## Task 2: 공유 타입 정의 & 데이터 파일

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/programs.ts`, `src/data/youth-clubs.ts`, `src/data/online-courses.ts`
- Create: `src/data/special-lectures.ts`, `src/data/booths.ts`, `src/data/camps.ts`
- Create: `src/data/partners.ts`, `src/data/history.ts`, `src/data/cancellation-policy.ts`
- Create: `src/data/navigation.ts`

- [ ] **Step 1: 공유 타입 정의**

`src/types/index.ts`:
```typescript
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
```

- [ ] **Step 2: 네비게이션 데이터**

`src/data/navigation.ts`:
```typescript
import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  { label: '소개', labelKey: 'nav.about', href: '/about' },
  {
    label: '찾아가는 체험교실',
    labelKey: 'nav.programs',
    children: [
      { label: '체험교실', labelKey: 'nav.experienceClass', href: '/programs' },
      { label: '청소년 동아리', labelKey: 'nav.youthClub', href: '/youth-club' },
      { label: '온라인 교육', labelKey: 'nav.online', href: '/online' },
      { label: '전문인 특강', labelKey: 'nav.specialLecture', href: '/special-lecture' },
    ],
  },
  { label: '체험 부스', labelKey: 'nav.booth', href: '/booth' },
  { label: '캠프', labelKey: 'nav.camp', href: '/camp' },
  {
    label: '교육 신청',
    labelKey: 'nav.eduRequest',
    children: [
      { label: '교육신청/문의', labelKey: 'nav.contactUs', href: '/contact' },
      { label: '대회&행사', labelKey: 'nav.events', href: '/board/events' },
      { label: '교육 후기', labelKey: 'nav.reviews', href: '/board/reviews' },
    ],
  },
];
```

- [ ] **Step 3: 프로그램 데이터 — 현재 사이트에서 크롤링한 26개 프로그램 전부 입력**

`src/data/programs.ts` — 현재 사이트의 모든 텍스트 콘텐츠를 크롤링하여 채워야 함. 각 프로그램의 제목, 설명, 대상, 가격, 커리큘럼, FAQ를 현재 사이트 상세 페이지에서 가져와서 작성.

구조 예시 (전체 26개 모두 이 형태로):
```typescript
import { Program } from '@/types';

export const programs: Program[] = [
  {
    slug: 'chatgpt-led-mood-light',
    category: 'ai',
    title: 'ChatGPT로 노래하는 LED 무드등 만들기',
    titleEn: 'ChatGPT Singing LED Mood Light',
    description: 'ChatGPT를 활용하여 나만의 LED 무드등을 제작하고 음악과 함께 빛이 변하는 체험을 합니다.',
    descriptionEn: 'Create your own LED mood light using ChatGPT that changes colors with music.',
    target: ['elementary', 'middle', 'high', 'adult'],
    price: '45,000원',
    priceEn: '₩45,000',
    duration: '2시간',
    thumbnail: '/images/programs/chatgpt-led.png',
    images: [],
    curriculum: ['ChatGPT 기초 이해', 'LED 회로 구성', '코딩을 통한 빛 제어', '음악 연동 프로그래밍'],
    curriculumEn: ['ChatGPT basics', 'LED circuit assembly', 'Light control via coding', 'Music sync programming'],
    faq: [
      {
        question: '이 프로그램은 몇 학년부터 가능한가요?',
        questionEn: 'What age group is this program for?',
        answer: '초등학생부터 성인까지 모든 연령대에서 참여 가능합니다.',
        answerEn: 'Available for all ages from elementary school students to adults.',
      },
    ],
  },
  // ... 나머지 25개 프로그램 — 현재 사이트에서 크롤링하여 동일 구조로 입력
];
```

실행 시 현재 사이트의 각 상세 페이지(`visit_new_ai_detail01.html` ~ `visit_new_ai_detail26.html`)를 WebFetch로 크롤링하여 데이터를 채운다.

- [ ] **Step 4: 청소년 동아리, 온라인 교육, 특강, 부스, 캠프 데이터**

각 파일을 현재 사이트에서 크롤링한 데이터로 채운다:
- `src/data/youth-clubs.ts` — 5개 프로그램
- `src/data/online-courses.ts` — 7개 프로그램
- `src/data/special-lectures.ts` — 2개 특강
- `src/data/booths.ts` — 7개 부스
- `src/data/camps.ts` — 9개 캠프

- [ ] **Step 5: 연혁, 협력 기관, 취소/환불 규정 데이터**

`src/data/history.ts`:
```typescript
import { HistoryItem } from '@/types';

export const history: HistoryItem[] = [
  {
    year: 2025,
    events: [
      { title: '논산 이화초 축제', titleEn: 'Nonsan Ewha Elementary Festival' },
      { title: '강진군 4차산업 체험교실', titleEn: 'Gangjin 4th Industrial Experience Class' },
      { title: '상명대 메이커 융합교육사업', titleEn: 'Sangmyung Univ. Maker Convergence Education' },
      { title: '의왕시 철도축제 부스 운영', titleEn: 'Uiwang Railway Festival Booth' },
      { title: '익산 남성고 AI 코딩 20반 동시 진행', titleEn: 'Iksan Namseong High 20 AI coding classes simultaneously' },
    ],
  },
  {
    year: 2024,
    events: [
      { title: '동대문구청 4차산업체험교실', titleEn: 'Dongdaemun-gu 4th Industrial Experience' },
      { title: '현대트랜시스 임직원 캠프 (~200명)', titleEn: 'Hyundai Transys Employee Camp (~200 people)' },
      { title: '17개 기관 4차산업캠프 (~1900명)', titleEn: '17 institutions 4th Industrial Camp (~1900 people)' },
      { title: '인공지능 자율주행 교육프로그램 개발', titleEn: 'AI Autonomous Driving Education Program Development' },
    ],
  },
  {
    year: 2022,
    events: [
      { title: '한양대 ERICA/중앙대/광운대 청년 창업교육', titleEn: 'Hanyang ERICA/Chungang/Kwangwoon Youth Startup Education' },
      { title: '동대문청소년수련관 MOU 체결', titleEn: 'Dongdaemun Youth Center MOU' },
    ],
  },
  {
    year: 2020,
    events: [
      { title: '(주)하이스타터 법인 설립', titleEn: 'Hi-Starter Inc. Founded' },
    ],
  },
];
```

`src/data/partners.ts`:
```typescript
import { Partner } from '@/types';

export const partners: Partner[] = [
  { name: '한양대학교' },
  { name: '국립해양과학관' },
  { name: '현대트랜시스' },
  { name: '코웨이' },
  { name: '안산시청소년재단' },
  { name: '동대문구' },
  { name: '동대문청소년수련관' },
  { name: '만안청소년수련관' },
  { name: '토당청소년수련관' },
  { name: '안양국제영화제' },
  { name: '강원정보원' },
  { name: '성동구도서관' },
  { name: '강화군가족센터' },
  { name: '미추홀구' },
  // ... 전체 기관 목록
];
```

`src/data/cancellation-policy.ts`:
```typescript
import { CancellationPolicy } from '@/types';

export const cancellationPolicies: CancellationPolicy[] = [
  {
    type: 'experience',
    rules: [
      { timing: '15일 이전', timingEn: '15+ days before', cancellation: '무료 취소', cancellationEn: 'Free cancellation', changes: '일정/인원 변경 가능', changesEn: 'Schedule/headcount changes allowed' },
      { timing: '12~14일 전', timingEn: '12-14 days before', cancellation: '위약금 10%', cancellationEn: '10% penalty', changes: '인원만 변경', changesEn: 'Headcount only' },
      { timing: '8~11일 전', timingEn: '8-11 days before', cancellation: '위약금 30%', cancellationEn: '30% penalty', changes: '변경 불가', changesEn: 'No changes' },
      { timing: '7일 이내', timingEn: 'Within 7 days', cancellation: '취소 불가', cancellationEn: 'No cancellation', changes: '변경 불가', changesEn: 'No changes' },
    ],
  },
  {
    type: 'camp',
    rules: [
      { timing: '15일 이전', timingEn: '15+ days before', cancellation: '100% 환불', cancellationEn: '100% refund', changes: '', changesEn: '' },
      { timing: '12일 이전', timingEn: '12+ days before', cancellation: '50% 환불', cancellationEn: '50% refund', changes: '', changesEn: '' },
      { timing: '10일 이전', timingEn: '10+ days before', cancellation: '30% 환불', cancellationEn: '30% refund', changes: '', changesEn: '' },
      { timing: '7일 이내', timingEn: 'Within 7 days', cancellation: '취소/환불 불가', cancellationEn: 'No cancellation/refund', changes: '', changesEn: '' },
    ],
  },
];
```

- [ ] **Step 6: 커밋**

```bash
git add src/types/ src/data/
git commit -m "feat: add shared types and static data files for all programs"
```

---

## Task 3: UI 공통 컴포넌트

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Slider.tsx`
- Create: `src/components/ui/Pagination.tsx`
- Create: `src/components/ui/LanguageSwitch.tsx`

- [ ] **Step 1: Button 컴포넌트**

`src/components/ui/Button.tsx`:
```tsx
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({ children, href, variant = 'primary', size = 'md', className = '', onClick }: ButtonProps) {
  const classes = `inline-block rounded-lg font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button onClick={onClick} className={classes}>{children}</button>;
}
```

- [ ] **Step 2: Card 컴포넌트**

`src/components/ui/Card.tsx`:
```tsx
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  thumbnail: string;
  href: string;
  tags?: string[];
  price?: string;
}

export default function Card({ title, description, thumbnail, href, tags, price }: CardProps) {
  return (
    <Link href={href} className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        {tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
        {description && <p className="text-gray-600 text-sm line-clamp-2">{description}</p>}
        {price && <p className="text-primary font-semibold mt-2">{price}</p>}
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Slider 컴포넌트 (Swiper 기반)**

`src/components/ui/Slider.tsx`:
```tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SliderProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
}

export default function Slider({
  children,
  autoplay = true,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = true,
  className = '',
}: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      pagination={{ clickable: true }}
      navigation
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      className={className}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
```

- [ ] **Step 4: Pagination 컴포넌트**

`src/components/ui/Pagination.tsx`:
```tsx
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="px-3 py-2 rounded-lg border hover:bg-gray-100">
          이전
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-2 rounded-lg border ${
            page === currentPage ? 'bg-primary text-white border-primary' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="px-3 py-2 rounded-lg border hover:bg-gray-100">
          다음
        </Link>
      )}
    </nav>
  );
}
```

- [ ] **Step 5: LanguageSwitch 컴포넌트**

`src/components/ui/LanguageSwitch.tsx`:
```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === 'ko' ? 'en' : 'ko';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
      aria-label="Switch language"
    >
      {locale === 'ko' ? 'EN' : '한'}
    </button>
  );
}
```

- [ ] **Step 6: 커밋**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components (Button, Card, Slider, Pagination, LanguageSwitch)"
```

---

## Task 4: 레이아웃 컴포넌트 (Header, Footer, Navigation)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Navigation 컴포넌트 — 드롭다운 + 모바일 햄버거**

`src/components/layout/Navigation.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { navigationItems } from '@/data/navigation';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  const getLocalePath = (href: string) => `/${locale}${href}`;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <div key={item.labelKey} className="relative group">
            {item.href ? (
              <Link
                href={getLocalePath(item.href)}
                className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <button className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors">
                {t(item.labelKey)}
              </button>
            )}
            {item.children && (
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
                {item.children.map((child) => (
                  <Link
                    key={child.labelKey}
                    href={getLocalePath(child.href!)}
                    className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    {t(child.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
          {navigationItems.map((item) => (
            <div key={item.labelKey}>
              {item.href ? (
                <Link
                  href={getLocalePath(item.href)}
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-50 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ) : (
                <div className="px-6 py-3 text-gray-700 font-medium">{t(item.labelKey)}</div>
              )}
              {item.children?.map((child) => (
                <Link
                  key={child.labelKey}
                  href={getLocalePath(child.href!)}
                  className="block px-10 py-2 text-gray-500 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(child.labelKey)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Header 컴포넌트**

`src/components/layout/Header.tsx`:
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Navigation from './Navigation';
import LanguageSwitch from '../ui/LanguageSwitch';

export default function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/images/logo/logo.jpg" alt="한양미래연구소" width={140} height={40} priority />
        </Link>
        <Navigation />
        <div className="flex items-center gap-2">
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Footer 컴포넌트**

`src/components/layout/Footer.tsx`:
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('company')}</h3>
            <div className="space-y-1 text-sm">
              <p>{t('ceo')}</p>
              <p>{t('bizNo')}</p>
              <p>{t('address')}</p>
              <p>{t('tel')}</p>
              <p>{t('email')}</p>
            </div>
          </div>

          {/* Inquiry Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('inquiry')}</h3>
            <div className="space-y-1 text-sm">
              <p>070-8064-0829</p>
              <p>{t('hours')}</p>
              <p>{t('holiday')}</p>
            </div>
          </div>

          {/* SNS Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SNS</h3>
            <div className="flex gap-4">
              <a href="https://m.blog.naver.com/hyhyedu/?tab=1" target="_blank" rel="noopener noreferrer" aria-label="Naver Blog">
                <Image src="/images/main/footer_sns01.png" alt="Naver Blog" width={40} height={40} />
              </a>
              <a href="https://youtube.com/channel/UC-k-dVuRwgf7OuIU5D8-54w" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Image src="/images/main/footer_sns02.png" alt="YouTube" width={40} height={40} />
              </a>
              <a href="https://www.instagram.com/hy_edu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Image src="/images/main/footer_sns03.png" alt="Instagram" width={40} height={40} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 한양미래연구소. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: layout.tsx에 Header/Footer 통합**

`src/app/[locale]/layout.tsx` 업데이트 — Header, Footer 임포트하여 children을 감싸는 형태로 수정. Analytics 스크립트 빈 자리 추가 (GTM, 네이버 WCS 주석으로).

- [ ] **Step 5: 빌드 확인**

```bash
npm run build
```

- [ ] **Step 6: 커밋**

```bash
git add src/components/layout/ src/app/
git commit -m "feat: add Header, Footer, Navigation layout components"
```

---

## Task 5: SEO/AEO 인프라

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: JSON-LD 컴포넌트**

`src/components/seo/JsonLd.tsx`:
```tsx
import { Program } from '@/types';

interface OrganizationJsonLdProps {
  locale: string;
}

export function OrganizationJsonLd({ locale }: OrganizationJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: locale === 'ko' ? '한양미래연구소' : 'Hanyang Future Lab',
    alternateName: '(주)하이스타터',
    url: 'https://hyedu.kr',
    logo: 'https://hyedu.kr/images/logo/logo.jpg',
    description: locale === 'ko'
      ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 메이커교육, STEAM교육 전문 플랫폼'
      : 'Professional platform for AI, robotics, autonomous driving, maker, and STEAM education for K-12 students',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '한양대학로 55 5공학관 창업실',
      addressLocality: '안산시',
      addressRegion: '경기도',
      postalCode: '15588',
      addressCountry: 'KR',
    },
    telephone: '070-8064-0829',
    email: 'hyedu0829@gmail.com',
    sameAs: [
      'https://m.blog.naver.com/hyhyedu/',
      'https://youtube.com/channel/UC-k-dVuRwgf7OuIU5D8-54w',
      'https://www.instagram.com/hy_edu/',
    ],
    foundingDate: '2020',
    founder: { '@type': 'Person', name: '이정욱' },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    areaServed: { '@type': 'Country', name: 'KR' },
    knowsAbout: ['AI Education', 'Robot Coding', 'Autonomous Driving', 'STEAM Education', '3D Printing', 'Drone Education'],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface CourseJsonLdProps {
  program: Program;
  locale: string;
}

export function CourseJsonLd({ program, locale }: CourseJsonLdProps) {
  const targetMap = {
    elementary: locale === 'ko' ? '초등학생' : 'Elementary school',
    middle: locale === 'ko' ? '중학생' : 'Middle school',
    high: locale === 'ko' ? '고등학생' : 'High school',
    adult: locale === 'ko' ? '성인' : 'Adult',
  };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'ko' ? program.title : program.titleEn,
    description: locale === 'ko' ? program.description : program.descriptionEn,
    provider: {
      '@type': 'EducationalOrganization',
      name: locale === 'ko' ? '한양미래연구소' : 'Hanyang Future Lab',
      url: 'https://hyedu.kr',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: program.target.map((t) => targetMap[t]).join(', '),
    },
    offers: {
      '@type': 'Offer',
      price: program.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
    },
    courseMode: 'onsite',
    inLanguage: 'ko',
    url: `https://hyedu.kr/${locale}/programs/${program.slug}`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface FAQJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://hyedu.kr${item.href}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 2: sitemap.ts — 자동 생성**

`src/app/sitemap.ts`:
```typescript
import type { MetadataRoute } from 'next';
import { programs } from '@/data/programs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyedu.kr';
  const locales = ['ko', 'en'];

  const staticPages = [
    '', '/about', '/programs', '/youth-club', '/online',
    '/special-lecture', '/booth', '/camp', '/contact',
    '/board/reviews', '/board/events', '/board/gallery',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }

    for (const program of programs) {
      entries.push({
        url: `${baseUrl}/${locale}/programs/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko/programs/${program.slug}`,
            en: `${baseUrl}/en/programs/${program.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
```

- [ ] **Step 3: layout.tsx에 OrganizationJsonLd 추가**

`src/app/[locale]/layout.tsx`의 `<body>` 안에 `<OrganizationJsonLd locale={locale} />` 추가.

- [ ] **Step 4: 빌드 확인**

```bash
npm run build
```

- [ ] **Step 5: 커밋**

```bash
git add src/components/seo/ src/app/sitemap.ts src/app/\[locale\]/layout.tsx
git commit -m "feat: add SEO/AEO infrastructure (JSON-LD, sitemap, meta tags)"
```

---

## Task 6: 메인 페이지 섹션 컴포넌트

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/StatsSection.tsx`
- Create: `src/components/sections/ProgramPreview.tsx`
- Create: `src/components/sections/TestimonialSection.tsx`
- Create: `src/components/sections/PartnerSection.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: HeroSection — 히어로 배너 슬라이더**

`src/components/sections/HeroSection.tsx`:
현재 사이트의 히어로 배너를 재현. Swiper 슬라이더로 2~3개 배너 이미지 슬라이드. 각 슬라이드에 타이틀 + CTA 버튼. 현재 사이트에서 사용 중인 배너 이미지와 텍스트를 크롤링하여 반영.

- [ ] **Step 2: StatsSection — 핵심 통계**

`src/components/sections/StatsSection.tsx`:
```tsx
'use client';

import { useTranslations } from 'next-intl';

const stats = [
  { value: '17,150', labelKo: '참여인원', labelEn: 'Participants' },
  { value: '245', labelKo: '참여 학교/기관', labelEn: 'Schools & Institutions' },
];

export default function StatsSection() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.labelKo}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}+</p>
              <p className="text-lg opacity-90">{stat.labelKo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: ProgramPreview — 프로그램 카테고리 미리보기**

`src/components/sections/ProgramPreview.tsx`:
체험교실, 체험 부스, 캠프 3가지 카테고리를 카드형으로 미리보기. 현재 사이트의 `hyedu_program_2_visit_class.png`, `hyedu_program_3_maker_booth.png`, `hyedu_program_4_campus_tour.png` 이미지 사용. 각 카드 클릭 시 해당 카테고리 페이지로 이동.

- [ ] **Step 4: TestimonialSection — 교육 후기 슬라이더**

`src/components/sections/TestimonialSection.tsx`:
현재 사이트의 후기 텍스트 3개를 Swiper 슬라이더로 표시:
- "이전에는 알지 못했던 분야를 배우며 새로운 꿈이 생겼습니다..."
- "4차 산업혁명이라는 것에 대해서 잘 알지 못했는데..."
- "한 가지 기술만 체험할 수 있는게 아니라 다양한 기술을 체험할 수 있어서..."

- [ ] **Step 5: PartnerSection — 협력 기관 로고**

`src/components/sections/PartnerSection.tsx`:
partners 데이터에서 기관명 목록을 가져와 그리드 또는 가로 스크롤로 표시.

- [ ] **Step 6: 메인 페이지 조합**

`src/app/[locale]/page.tsx` — 모든 섹션 컴포넌트를 조합하고, 페이지 메타데이터 설정:
```tsx
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProgramPreview from '@/components/sections/ProgramPreview';
import TestimonialSection from '@/components/sections/TestimonialSection';
import PartnerSection from '@/components/sections/PartnerSection';

export const metadata: Metadata = {
  title: '한양미래연구소 | AI교육·로봇코딩·자율주행 No.1 체험교실',
  description: '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행자동차 체험교실. 찾아가는 체험교실, 캠프, 온라인 교육. 17,150명 참여.',
  keywords: ['AI교육', '로봇코딩', '자율주행', '체험교실', '코딩교육', 'STEAM교육', '초등학생 AI', '중학생 코딩', '고등학생 캠프'],
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProgramPreview />
      <TestimonialSection />
      <PartnerSection />
    </main>
  );
}
```

- [ ] **Step 7: 빌드 확인**

```bash
npm run build
```

- [ ] **Step 8: 커밋**

```bash
git add src/components/sections/ src/app/\[locale\]/page.tsx
git commit -m "feat: add main page with hero, stats, programs, testimonials, partners sections"
```

---

## Task 7: 소개 페이지

**Files:**
- Create: `src/app/[locale]/about/page.tsx`

- [ ] **Step 1: 소개 페이지 구현**

비전/미션, 6가지 교육 특징, 연혁 타임라인, 협력 기관 목록 포함. 현재 사이트의 `about_us.html` 콘텐츠를 그대로 반영. `generateMetadata`로 SEO 메타 태그 + `BreadcrumbJsonLd` 추가.

교육 6가지 특징:
1. 맞춤형 교육
2. 교육의 다양성
3. 베테랑 강사진
4. 기술직업 체험교육
5. PBL 수업
6. 협동하며 문제해결

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/about/
git commit -m "feat: add about page with vision, features, history, partners"
```

---

## Task 8: 찾아가는 체험교실 (목록 + 상세)

**Files:**
- Create: `src/app/[locale]/programs/page.tsx`
- Create: `src/app/[locale]/programs/[slug]/page.tsx`

- [ ] **Step 1: 프로그램 목록 페이지**

카테고리별 필터 (AI/코딩/메이커/STEAM) + 대상별 필터 (초등/중등/고등). 카드 그리드로 26개 프로그램 표시. `generateMetadata`로 키워드 최적화된 메타 태그.

- [ ] **Step 2: 프로그램 상세 페이지**

`generateStaticParams`로 26개 slug 정적 생성. 프로그램명, 대상, 가격, 커리큘럼, 이미지, FAQ 섹션 표시. `CourseJsonLd` + `FAQJsonLd` + `BreadcrumbJsonLd` 추가. 문의하기 CTA 버튼 (→ `/contact`).

- [ ] **Step 3: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/programs/
git commit -m "feat: add programs listing page with filters and detail pages with SEO"
```

---

## Task 9: 청소년 동아리 페이지

**Files:**
- Create: `src/app/[locale]/youth-club/page.tsx`

- [ ] **Step 1: 청소년 동아리 페이지**

카테고리별(메이커/코딩/STEAM/창업) 프로그램 카드 표시. 현재 사이트의 동아리 콘텐츠 반영. SEO 메타 태그 + BreadcrumbJsonLd.

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/youth-club/
git commit -m "feat: add youth club page"
```

---

## Task 10: 온라인 교육 페이지

**Files:**
- Create: `src/app/[locale]/online/page.tsx`

- [ ] **Step 1: 온라인 교육 페이지**

카테고리별(메이커/코딩/특강) 표시. 실시간/영상강의 구분 뱃지. 가격 표시. SEO 메타 태그.

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/online/
git commit -m "feat: add online education page"
```

---

## Task 11: 전문인 특강 페이지

**Files:**
- Create: `src/app/[locale]/special-lecture/page.tsx`

- [ ] **Step 1: 전문인 특강 페이지**

2개 특강 (4차산업혁명 특강, CEO 창업 특강) 상세 표시. 각 특강 구성 요소 (이미지 + 설명). SEO 메타 태그.

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/special-lecture/
git commit -m "feat: add special lecture page"
```

---

## Task 12: 체험 부스 페이지

**Files:**
- Create: `src/app/[locale]/booth/page.tsx`

- [ ] **Step 1: 체험 부스 페이지**

7개 부스 유형 카드 표시. 운영 방식 안내, 가격 (200만원부터). 현재 사이트 콘텐츠 반영. SEO 메타 태그.

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/booth/
git commit -m "feat: add maker booth page"
```

---

## Task 13: 캠프 페이지

**Files:**
- Create: `src/app/[locale]/camp/page.tsx`

- [ ] **Step 1: 캠프 페이지**

9개 캠프 프로그램 카드 표시. 캠프 유형별 (한양청소년캠프/토요캠프/경진대회 대비) 구분. 가격, 대상, 일정 정보. 캠프 준비물 안내 섹션. SEO 메타 태그.

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/camp/
git commit -m "feat: add camp page"
```

---

## Task 14: 교육 신청/문의 페이지

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`

- [ ] **Step 1: 교육 신청/문의 페이지**

Google Form 임베드 (`https://forms.gle/MMxBhw7PHCphfs1w9`를 iframe으로). 카카오톡 채널 바로가기 링크. 메일 전송 링크 (`mailto:hyedu0829@gmail.com`). 취소/환불 규정 테이블 (`cancellation-policy.ts` 데이터 활용). SEO 메타 태그.

```tsx
<section>
  <h2>교육 신청/문의</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <a href="https://pf.kakao.com/..." className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
      카카오톡 문의
    </a>
    <a href="mailto:hyedu0829@gmail.com" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
      이메일 문의
    </a>
    <a href="tel:070-8064-0829" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
      전화 문의
    </a>
  </div>
  <iframe src="https://docs.google.com/forms/d/e/.../viewform?embedded=true" ... />
</section>
```

- [ ] **Step 2: 빌드 확인 & 커밋**

```bash
npm run build
git add src/app/\[locale\]/contact/
git commit -m "feat: add contact page with Google Form embed and cancellation policy"
```

---

## Task 15: Firestore 설정 & 게시판

**Files:**
- Create: `src/lib/firebase.ts`
- Create: `src/lib/board.ts`
- Create: `src/lib/popup.ts`
- Create: `src/app/[locale]/board/reviews/page.tsx`
- Create: `src/app/[locale]/board/reviews/[id]/page.tsx`
- Create: `src/app/[locale]/board/events/page.tsx`
- Create: `src/app/[locale]/board/events/[id]/page.tsx`
- Create: `src/app/[locale]/board/gallery/page.tsx`

- [ ] **Step 1: Firebase 클라이언트 초기화**

`src/lib/firebase.ts`:
```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
```

`.env.local` (gitignore에 포함, 값은 Firebase 콘솔에서 가져옴):
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- [ ] **Step 2: 게시판 조회 함수**

`src/lib/board.ts`:
```typescript
import { collection, query, orderBy, limit, startAfter, getDocs, doc, getDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { BoardPost } from '@/types';

const POSTS_PER_PAGE = 10;

export async function getBoardPosts(boardType: string, page: number = 1): Promise<{ posts: BoardPost[]; totalPages: number }> {
  const postsRef = collection(db, 'boards', boardType, 'posts');
  const countQuery = query(postsRef);
  const countSnapshot = await getDocs(countQuery);
  const totalPages = Math.ceil(countSnapshot.size / POSTS_PER_PAGE);

  const postsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(POSTS_PER_PAGE * page));
  const snapshot = await getDocs(postsQuery);
  const allPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BoardPost));
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE);

  return { posts, totalPages };
}

export async function getBoardPost(boardType: string, postId: string): Promise<BoardPost | null> {
  const docRef = doc(db, 'boards', boardType, 'posts', postId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as BoardPost;
}
```

- [ ] **Step 3: 팝업 조회 함수**

`src/lib/popup.ts`:
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Popup } from '@/types';

export async function getActivePopups(): Promise<Popup[]> {
  const now = new Date();
  const popupsRef = collection(db, 'popups');
  const q = query(popupsRef, where('isActive', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Popup))
    .filter((popup) => {
      const start = popup.startDate instanceof Date ? popup.startDate : new Date(popup.startDate);
      const end = popup.endDate instanceof Date ? popup.endDate : new Date(popup.endDate);
      return now >= start && now <= end;
    });
}
```

- [ ] **Step 4: 교육 후기 게시판 페이지 (목록 + 상세)**

`src/app/[locale]/board/reviews/page.tsx` — 클라이언트 컴포넌트. Firestore에서 게시물 목록 조회, Pagination 사용. SEO 메타 태그.

`src/app/[locale]/board/reviews/[id]/page.tsx` — 클라이언트 컴포넌트. Firestore에서 단일 게시물 조회, HTML content 렌더링.

- [ ] **Step 5: 대회&행사 게시판 페이지 (목록 + 상세)**

`src/app/[locale]/board/events/page.tsx` — reviews와 동일 구조, boardType만 'events'.
`src/app/[locale]/board/events/[id]/page.tsx` — 상세 페이지.

- [ ] **Step 6: 이미지 갤러리 페이지**

`src/app/[locale]/board/gallery/page.tsx` — Firestore에서 gallery 타입 조회, 이미지 그리드 레이아웃 (3~4 컬럼).

- [ ] **Step 7: 빌드 확인 & 커밋**

```bash
npm run build
git add src/lib/ src/app/\[locale\]/board/ .env.local.example
git commit -m "feat: add Firestore integration and board pages (reviews, events, gallery)"
```

---

## Task 16: 팝업 컴포넌트

**Files:**
- Create: `src/components/layout/Popup.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Popup 컴포넌트**

`src/components/layout/Popup.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getActivePopups } from '@/lib/popup';
import { Popup as PopupType } from '@/types';

export default function Popup() {
  const [popups, setPopups] = useState<PopupType[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const hidden = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
    const today = new Date().toDateString();
    const hiddenToday = new Set<string>(
      Object.entries(hidden)
        .filter(([_, date]) => date === today)
        .map(([id]) => id)
    );
    setDismissed(hiddenToday);

    getActivePopups().then(setPopups);
  }, []);

  const hideForToday = (id: string) => {
    const hidden = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
    hidden[id] = new Date().toDateString();
    localStorage.setItem('hiddenPopups', JSON.stringify(hidden));
    setDismissed((prev) => new Set(prev).add(id));
  };

  const close = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  const visiblePopups = popups.filter((p) => !dismissed.has(p.id));
  if (visiblePopups.length === 0) return null;

  return (
    <>
      {visiblePopups.map((popup) => (
        <div key={popup.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full mx-4 shadow-2xl">
            {popup.imageUrl && (
              <div className="relative aspect-[4/3]">
                <Image src={popup.imageUrl} alt={popup.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{popup.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{popup.content}</p>
              {popup.linkUrl && (
                <Link href={popup.linkUrl} className="text-primary underline text-sm">
                  자세히 보기
                </Link>
              )}
            </div>
            <div className="flex border-t">
              <button
                onClick={() => hideForToday(popup.id)}
                className="flex-1 py-3 text-sm text-gray-500 hover:bg-gray-50"
              >
                오늘 하루 안보기
              </button>
              <button
                onClick={() => close(popup.id)}
                className="flex-1 py-3 text-sm font-medium border-l hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 2: layout.tsx에 Popup 추가**

`src/app/[locale]/layout.tsx`의 `<body>` 안에 `<Popup />` 추가.

- [ ] **Step 3: 빌드 확인 & 커밋**

```bash
npm run build
git add src/components/layout/Popup.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add Firestore-managed popup with hide-for-today functionality"
```

---

## Task 17: 이미지 에셋 다운로드

**Files:**
- Create: `scripts/download-images.ts`
- Create: `public/images/` 하위 디렉토리들

- [ ] **Step 1: 이미지 다운로드 스크립트**

`scripts/download-images.ts`:
현재 사이트(https://www.hyedu.kr)에서 발견된 60개 이상의 이미지 에셋을 다운로드하여 `public/images/` 하위에 저장하는 Node.js 스크립트 작성. 카테고리별로 디렉토리 분류 (logo/, main/, programs/, camps/, partners/).

```typescript
import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE_URL = 'https://www.hyedu.kr';

const images = [
  { url: '/skin/img/logo/logo.jpg', dest: 'logo/logo.jpg' },
  { url: '/skin/img/main/footer-img.png', dest: 'main/footer-img.png' },
  { url: '/skin/img/main/footer_sns01.png', dest: 'main/footer_sns01.png' },
  { url: '/skin/img/main/footer_sns02.png', dest: 'main/footer_sns02.png' },
  { url: '/skin/img/main/footer_sns03.png', dest: 'main/footer_sns03.png' },
  // ... 전체 이미지 목록 (spec에서 발견된 60개+)
];

async function downloadImage(url: string, dest: string) {
  const fullUrl = `${BASE_URL}${url}`;
  const destPath = path.join(__dirname, '../public/images', dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(fullUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  for (const img of images) {
    try {
      await downloadImage(img.url, img.dest);
      console.log(`Downloaded: ${img.dest}`);
    } catch (e) {
      console.error(`Failed: ${img.dest}`, e);
    }
  }
}

main();
```

- [ ] **Step 2: 스크립트 실행**

```bash
npx tsx scripts/download-images.ts
```

- [ ] **Step 3: 커밋**

```bash
git add public/images/ scripts/download-images.ts
git commit -m "feat: download and add all image assets from original site"
```

---

## Task 18: 게시판 데이터 크롤링 & Firestore 이관

**Files:**
- Create: `scripts/crawl-board.ts`

- [ ] **Step 1: 크롤링 스크립트**

`scripts/crawl-board.ts`:
현재 사이트의 BBS 페이지(bbs_no=10, 13, 4)를 크롤링하여 게시물 데이터를 추출하고 Firestore에 저장하는 스크립트.

```typescript
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDK 사용 (서비스 계정 키 필요)
// 1. Firebase 콘솔에서 서비스 계정 키 다운로드
// 2. GOOGLE_APPLICATION_CREDENTIALS 환경 변수 설정
// 3. 스크립트 실행

initializeApp();
const db = getFirestore();

async function crawlBoard(bbsNo: number, boardType: string) {
  // www.hyedu.kr/bbs/bbs/?bbs_no={bbsNo} 크롤링
  // HTML 파싱하여 게시물 목록 추출
  // 각 게시물 상세 페이지 방문하여 content 추출
  // Firestore boards/{boardType}/posts/{postId}에 저장
}

async function main() {
  await crawlBoard(10, 'reviews');  // 교육 후기
  await crawlBoard(13, 'events');   // 대회&행사
  await crawlBoard(4, 'gallery');   // 이미지 갤러리
}

main();
```

- [ ] **Step 2: Firebase 프로젝트 생성 & 서비스 계정 키 준비**

사용자가 Firebase 콘솔에서:
1. 프로젝트 생성
2. Firestore 데이터베이스 활성화
3. 서비스 계정 키 다운로드
4. `.env.local` 에 클라이언트 config 입력

- [ ] **Step 3: 스크립트 실행**

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
npx tsx scripts/crawl-board.ts
```

- [ ] **Step 4: 커밋**

```bash
git add scripts/crawl-board.ts
git commit -m "feat: add board data crawling script for Firestore migration"
```

---

## Task 19: 다국어 번역 완성

**Files:**
- Modify: `src/messages/ko.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: 전체 페이지 UI 텍스트 번역 추가**

ko.json과 en.json에 모든 페이지에서 사용되는 UI 텍스트 추가:
- 소개 페이지 섹션 타이틀
- 프로그램 필터 라벨
- 게시판 UI 텍스트
- 문의 페이지 텍스트
- 취소/환불 테이블 헤더
- 에러/빈 상태 메시지

- [ ] **Step 2: 각 페이지에 다국어 적용 확인**

모든 페이지에서 `useTranslations()` 훅을 통해 번역 텍스트가 올바르게 표시되는지 확인. `/en` 경로로 접속하여 영어 페이지 확인.

- [ ] **Step 3: 커밋**

```bash
git add src/messages/
git commit -m "feat: complete i18n translations for all pages (ko/en)"
```

---

## Task 20: 최종 통합 & 배포 준비

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (analytics 스크립트 자리)
- Create: `.gitignore` 업데이트
- Create: `.env.local.example`

- [ ] **Step 1: Analytics 스크립트 빈 자리 추가**

`src/app/[locale]/layout.tsx`의 `<head>` 영역에:
```tsx
{/* Google Tag Manager - 추후 ID 입력 */}
{/* <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX" /> */}

{/* Naver WCS - 추후 ID 입력 */}
{/* <script src="https://wcs.naver.net/wcslog.js" /> */}
```

- [ ] **Step 2: .env.local.example 생성**

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- [ ] **Step 3: .gitignore 확인**

`.env.local`, `node_modules/`, `out/`, `.next/` 등이 포함되어 있는지 확인.

- [ ] **Step 4: 전체 빌드 & 로컬 테스트**

```bash
npm run build
npx serve out
```
브라우저에서 `http://localhost:3000`으로 접속하여 전체 페이지 동작 확인.

- [ ] **Step 5: 커밋 & 푸시**

```bash
git add -A
git commit -m "feat: finalize site with analytics placeholders and deployment config"
git remote add origin https://github.com/{username}/hyedu-web.git
git push -u origin main
```

- [ ] **Step 6: GitHub Pages 설정**

GitHub 저장소 Settings → Pages → Source: GitHub Actions 선택. 자동 배포 확인.

---

## Task Dependencies

```
Task 1 (프로젝트 초기 설정)
  └── Task 2 (타입 & 데이터)
       └── Task 3 (UI 컴포넌트)
            └── Task 4 (레이아웃)
                 ├── Task 5 (SEO/AEO)
                 ├── Task 6 (메인 페이지)
                 ├── Task 7 (소개)
                 ├── Task 8 (체험교실)
                 ├── Task 9 (청소년 동아리)
                 ├── Task 10 (온라인 교육)
                 ├── Task 11 (전문인 특강)
                 ├── Task 12 (체험 부스)
                 ├── Task 13 (캠프)
                 ├── Task 14 (문의)
                 ├── Task 15 (Firestore & 게시판)
                 └── Task 16 (팝업)
Task 17 (이미지 다운로드) — Task 1 이후 언제든 병렬 가능
Task 18 (게시판 크롤링) — Task 15 이후
Task 19 (다국어 완성) — Task 6~16 이후
Task 20 (최종 통합) — 모든 Task 완료 후
```
