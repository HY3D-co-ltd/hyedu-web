# hyedu.kr 웹사이트 리빌드 설계 문서

## 1. 프로젝트 개요

**목적:** 현재 외부 솔루션 기반의 www.hyedu.kr 을 자체 호스팅 웹사이트로 완전 이전하여 SEO/AEO 최적화를 극대화하고, 팀원들이 쉽게 수정할 수 있는 구조로 전환한다.

**사업체:** 한양미래연구소 (주)하이스타터
**대표:** 이정욱
**사업자등록번호:** 831-88-01997
**주소:** 경기도 안산시 상록구 한양대학로 55 5공학관 창업실
**연락처:** 070-8064-0829 / hyedu0829@gmail.com
**비전:** "한 사람의 인생을 바꾸는 교육을 제공합니다"
**주요 통계:** 17,150명 참여인원, 245개 참여 학교/기관

**타겟 대상:** 초등학생, 중학생, 고등학생
**주력 교육 분야:** AI 인공지능 교육, 로봇코딩 교육, 자율주행자동차 교육

---

## 2. 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (정적 export) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| DB | Firestore (클라이언트 SDK) |
| 다국어 | next-intl (한국어/영어) |
| 호스팅 | GitHub Pages |
| CI/CD | GitHub Actions (자동 빌드/배포) |
| 문의하기 | 기존 Google Form 임베드 |
| 분석 | GTM + 네이버 WCS (빈 자리 준비, 추후 설정) |

---

## 3. 프로젝트 구조

```
hyedu-web/
├── src/
│   ├── app/
│   │   └── [locale]/                # ko, en
│   │       ├── layout.tsx           # 공통 레이아웃
│   │       ├── page.tsx             # 메인 페이지
│   │       ├── about/
│   │       │   └── page.tsx         # 소개
│   │       ├── programs/
│   │       │   ├── page.tsx         # 체험교실 목록
│   │       │   └── [slug]/
│   │       │       └── page.tsx     # 프로그램 상세 (26개)
│   │       ├── youth-club/
│   │       │   └── page.tsx         # 청소년 동아리
│   │       ├── online/
│   │       │   └── page.tsx         # 온라인 교육
│   │       ├── special-lecture/
│   │       │   └── page.tsx         # 전문인 특강
│   │       ├── booth/
│   │       │   └── page.tsx         # 체험 부스
│   │       ├── camp/
│   │       │   └── page.tsx         # 캠프
│   │       ├── contact/
│   │       │   └── page.tsx         # 교육 신청/문의
│   │       └── board/
│   │           ├── reviews/
│   │           │   ├── page.tsx     # 교육 후기 목록
│   │           │   └── [id]/
│   │           │       └── page.tsx # 후기 상세
│   │           ├── events/
│   │           │   ├── page.tsx     # 대회&행사 목록
│   │           │   └── [id]/
│   │           │       └── page.tsx # 행사 상세
│   │           └── gallery/
│   │               └── page.tsx     # 이미지 갤러리
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # 상단 네비게이션
│   │   │   ├── Footer.tsx           # 하단 정보
│   │   │   ├── Navigation.tsx       # 메뉴 (모바일 햄버거 포함)
│   │   │   └── Popup.tsx            # 팝업 컴포넌트
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx           # JSON-LD 구조화 데이터
│   │   │   └── MetaTags.tsx         # Open Graph, Twitter Card
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx             # 프로그램 카드
│   │   │   ├── Slider.tsx           # 히어로/후기 슬라이더
│   │   │   ├── Pagination.tsx       # 게시판 페이지네이션
│   │   │   └── LanguageSwitch.tsx   # 한/영 전환
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── StatsSection.tsx
│   │       ├── ProgramPreview.tsx
│   │       ├── TestimonialSection.tsx
│   │       └── PartnerSection.tsx
│   ├── data/
│   │   ├── programs.ts              # 체험교실 26개 프로그램 데이터
│   │   ├── youth-clubs.ts           # 청소년 동아리 데이터
│   │   ├── online-courses.ts        # 온라인 교육 데이터
│   │   ├── special-lectures.ts      # 전문인 특강 데이터
│   │   ├── booths.ts                # 체험 부스 데이터
│   │   ├── camps.ts                 # 캠프 데이터
│   │   ├── partners.ts              # 협력 기관 목록
│   │   ├── history.ts               # 연혁 데이터
│   │   └── cancellation-policy.ts   # 취소/환불 규정
│   ├── lib/
│   │   ├── firebase.ts              # Firestore 클라이언트 초기화
│   │   └── board.ts                 # 게시판 CRUD 함수
│   └── messages/
│       ├── ko.json                  # 한국어 번역
│       └── en.json                  # 영어 번역
├── public/
│   ├── images/                      # 사이트 이미지 에셋
│   │   ├── logo/
│   │   ├── main/
│   │   ├── programs/
│   │   ├── camps/
│   │   └── partners/
│   ├── sitemap.xml                  # 자동 생성
│   └── robots.txt
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml               # GitHub Pages 자동 배포
```

---

## 4. 페이지별 기능 상세

### 4.1 메인 페이지 (`/`)
- 히어로 배너 슬라이더
- 핵심 통계 (참여인원 17,150명, 참여 학교/기관 245개)
- 프로그램 카테고리 미리보기 (체험교실/부스/캠프) — 카드형
- 교육 후기 슬라이더
- 협력 기관 로고 배열
- 팝업 (Firestore 관리, "오늘 하루 안보기" 기능)

### 4.2 소개 페이지 (`/about`)
- 비전/미션 텍스트
- 4차산업기술교육의 6가지 특징
- 연혁 타임라인 (2020~2025)
- 협력 기관 목록

### 4.3 찾아가는 체험교실 (`/programs`)
- 카테고리별 필터 (AI 인공지능 / 코딩 / 메이커 융합 / STEAM)
- 대상별 필터 (초등 / 중등 / 고등)
- 카드 그리드 레이아웃
- 상세 페이지 (`/programs/[slug]`):
  - 프로그램명, 대상, 가격, 소요시간
  - 커리큘럼/교육내용
  - 교육 사진
  - 문의하기 CTA 버튼

### 4.4 청소년 동아리 (`/youth-club`)
- 카테고리별 표시 (메이커/코딩/STEAM/창업)
- 프로그램 카드 + 상세 정보

### 4.5 온라인 교육 (`/online`)
- 카테고리별 표시 (메이커 융합/코딩/특강)
- 실시간/영상강의 구분
- 가격 표시

### 4.6 전문인 특강 (`/special-lecture`)
- 2개 특강 프로그램 상세
- 특강 구성 요소 (4차산업혁명 특강, CEO 창업 특강)

### 4.7 체험 부스 (`/booth`)
- 7개 부스 유형 소개
- 운영 방식 안내
- 가격 (200만원부터)

### 4.8 캠프 (`/camp`)
- 캠프 프로그램 9개
- 한양청소년캠프 / 토요캠프 / 경진대회 대비 캠프
- 가격, 대상, 일정 정보
- 캠프 준비물 안내

### 4.9 교육 신청/문의 (`/contact`)
- Google Form 임베드
- 카카오톡 채널 바로가기 링크
- 메일 전송 링크 (hyedu0829@gmail.com)
- 취소/환불 규정 안내

### 4.10 게시판 (`/board`)
- **교육 후기** (`/board/reviews`): 목록 + 상세, 페이지네이션
- **대회&행사** (`/board/events`): 목록 + 상세, 페이지네이션
- **이미지 갤러리** (`/board/gallery`): 그리드 레이아웃
- 데이터 소스: Firestore (읽기 전용, 글 작성은 Claude/직접 Firestore)
- 기존 게시물 크롤링하여 Firestore에 이관

### 4.11 팝업
- Firestore `popups` 컬렉션에서 관리
- 필드: title, content, imageUrl, linkUrl, isActive, startDate, endDate
- "오늘 하루 안보기" (localStorage 기반)
- 활성화된 팝업만 표시

---

## 5. SEO/AEO 최적화 전략

### 5.1 SEO 기본
- 페이지별 고유 `title`, `description`, `keywords` 메타 태그
- Open Graph / Twitter Card 메타 태그
- `sitemap.xml` 자동 생성 (모든 페이지 + 프로그램 상세)
- `robots.txt` 설정
- 시맨틱 HTML (`<article>`, `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`)
- 모든 이미지 alt 태그 작성
- canonical URL 설정
- `hreflang` 태그 (ko/en 연결)
- 반응형 디자인 (모바일 우선)

### 5.2 AEO 최적화 — JSON-LD 구조화 데이터
- `Organization` — 회사 정보 (이름, 주소, 연락처, SNS)
- `EducationalOrganization` — 교육 기관 정보
- `Course` — 각 프로그램별 (이름, 설명, 대상, 가격, 제공자)
- `FAQPage` — 자주 묻는 질문 (취소/환불 정책, 교육 대상, 비용 등)
- `BreadcrumbList` — 경로 탐색
- `Event` — 대회/행사 게시판 항목

### 5.3 키워드 전략

**주력 키워드 (AI/로봇/자율주행 중심):**
- AI교육, 인공지능 교육, 청소년 AI 체험, ChatGPT 교육
- 로봇코딩 교육, 로봇 체험교실, 핑퐁로봇 교육
- 자율주행자동차 교육, 자율주행 체험
- 찾아가는 체험교실, 4차산업혁명 교육
- 코딩교육, 메이커교육, STEAM교육

**타겟별 롱테일 키워드:**
- 초등학생: "초등학생 AI 교육 프로그램", "초등 로봇코딩 수업", "초등학교 찾아가는 체험교실"
- 중학생: "중학생 자율주행 체험", "중학교 코딩 동아리", "중등 인공지능 교육"
- 고등학생: "고등학생 AI 캠프", "고등학교 4차산업 체험", "청소년 창업 교육"

**AEO 질문형 키워드:**
- "AI 교육은 몇 학년부터 가능한가요?"
- "찾아가는 체험교실 비용은 얼마인가요?"
- "로봇코딩 교육 어디서 받을 수 있나요?"
- "자율주행자동차 체험 프로그램 추천"
- "초등학생 코딩 캠프 추천"

**적용 방식:**
- 주력 프로그램(AI/로봇/자율주행) 페이지 메타 태그에 우선 반영
- 각 프로그램 상세 페이지에 FAQ 섹션 추가 (질문-답변 형태)
- JSON-LD `Course` 스키마에 `audience` 필드로 학년별 대상 명시
- 영어 페이지에도 동일한 키워드 전략 적용 (번역)

### 5.4 성능 최적화
- `next/image` 이미지 최적화 (WebP 자동 변환, lazy loading)
- Tailwind CSS purge (미사용 클래스 제거)
- 정적 export로 서버 없이 CDN 배포
- Core Web Vitals 최적화 (LCP, FID, CLS)

### 5.5 분석 도구 (준비만)
- Google Tag Manager 스크립트 자리 (ID 추후 입력)
- 네이버 WCS 스크립트 자리 (ID 추후 입력)
- Google Search Console 인증 파일 자리
- 네이버 서치어드바이저 인증 파일 자리

---

## 6. 데이터 구조

### 6.1 정적 데이터 (TypeScript 파일)

**프로그램 데이터 타입:**
```typescript
interface Program {
  slug: string;
  category: 'ai' | 'coding' | 'maker' | 'steam';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  target: ('elementary' | 'middle' | 'high' | 'adult')[];
  price: string;
  duration: string;
  thumbnail: string;
  images: string[];
  curriculum: string[];
  faq: { question: string; answer: string }[];
}
```

### 6.2 Firestore 컬렉션

**게시판 (`boards/{boardType}/posts/{postId}`):**
```typescript
interface BoardPost {
  id: string;
  title: string;
  content: string;        // HTML 또는 Markdown
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnail?: string;
  images?: string[];
  boardType: 'reviews' | 'events' | 'gallery';
}
```

**팝업 (`popups/{popupId}`):**
```typescript
interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
}
```

---

## 7. 네비게이션 구조

```
[로고] → /
├── 소개 → /about
├── 찾아가는 체험교실
│   ├── 체험교실 → /programs
│   ├── 청소년 동아리 → /youth-club
│   ├── 온라인 교육 → /online
│   └── 전문인 특강 → /special-lecture
├── 체험 부스 → /booth
├── 캠프 → /camp
├── 교육 신청
│   ├── 교육신청/문의 → /contact
│   ├── 대회&행사 → /board/events
│   └── 교육 후기 → /board/reviews
└── [한/EN] 언어 전환
```

---

## 8. 다국어 (i18n) 전략

- URL 구조: `/ko/...`, `/en/...`
- 기본 언어: 한국어 (`/ko`)
- `next-intl` 사용, 정적 export 호환
- 번역 범위:
  - UI 텍스트 (메뉴, 버튼, 라벨)
  - 프로그램 제목/설명
  - 메타 태그 (title, description)
  - JSON-LD 구조화 데이터
- 게시판 콘텐츠는 한국어만 (번역 불필요)

---

## 9. 배포 파이프라인

1. 코드 push → GitHub repository
2. GitHub Actions 트리거:
   - `npm install`
   - `npm run build` (next export)
   - `public/` 디렉토리를 `gh-pages` 브랜치에 배포
3. GitHub Pages가 `gh-pages` 브랜치를 서빙
4. 커스텀 도메인 `hyedu.kr` 연결 (DNS 설정)

---

## 10. 기존 데이터 이관 계획

1. 현재 사이트의 이미지 에셋을 다운로드하여 `public/images/`에 저장
2. 프로그램 데이터를 정적 TypeScript 파일로 정리
3. 게시판 게시물(교육 후기, 대회&행사, 이미지 갤러리)을 크롤링하여 Firestore에 저장
4. 모든 텍스트 콘텐츠를 현재 사이트와 동일하게 유지

---

## 11. 범위 외 (제외 항목)

- 로그인/회원가입 기능
- 게시판 글 작성 UI (Claude/직접 Firestore로 관리)
- 결제/장바구니 기능
- 실시간 채팅
- 관리자 대시보드
