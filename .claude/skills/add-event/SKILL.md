---
name: add-event
description: 한양미래연구소 홈페이지 대회·행사(/ko/board/events) 게시판에 신규 교육·행사 상세페이지를 디자인 시스템에 맞춰 등록한다. 사용자가 "행사 추가", "교육 페이지 만들어줘", "이벤트 등록" 등을 요청하거나 새 부트캠프/세미나/CEO 교육을 추가하려 할 때 트리거된다.
---

# 신규 행사·교육 등록 Skill

`/ko/board/events` 게시판에 등록하는 신규 교육/행사 상세페이지를 한양미래연구소 디자인 시스템에 맞춰 일관되게 만든다.

## 언제 사용하나

- "새 교육 추가해줘", "행사 페이지 만들어줘", "이벤트 등록"
- 새 부트캠프·세미나·CEO 교육·캠프·워크숍 페이지 신규 생성
- 기존 등록된 교육의 디자인을 동일하게 적용해야 할 때

## 필수 정보 체크리스트

신규 행사를 만들기 전에 사용자에게 아래 정보를 모두 확보하라. **빠지면 직접 물어볼 것** (이 프로젝트의 콘텐츠 운영 원칙).

| 항목 | 예시 |
|------|------|
| **교육 제목** | "AI 에이전트 집중과정" |
| **개최 일시** | 2026-05-16 (토) 10:00~16:00 |
| **개최 장소** | 한양대학교 ERICA 창업보육센터 219-1호 (네이버지도 URL 있으면 받기) |
| **모집 인원** | 15명 한정 |
| **대상** | 중소기업 CEO·임직원 / 교육강사 / 청소년 등 |
| **교육 도구·주제** | Antigravity·Claude Code, ChatGPT·Gemini 등 |
| **커리큘럼** | 시간대별 PART 1·2·3·4 (최소 4단계) |
| **차별점** | 1:5 밀착, 멘토 협업, 산업 특화 등 |
| **수강료** | "30만원/15만원" 또는 "협찬 무료" 또는 "별도 문의" |
| **협찬·후원** | (있으면) 회사명, 협찬 형태 |
| **준비물** | "노트북 필수" 등 |
| **FAQ 항목** | 5개 정도 (Q&A 쌍, FAQJsonLd + AEO에 사용) |

### SEO/AEO 필수 (검색엔진·AI 답변엔진 노출용 — 절대 생략 금지)

| 항목 | 용도 | 예시 |
|------|------|------|
| **description** | 메타 description, OG description, 검색결과 미리보기 (150~200자) | "한양대 ERICA에서 진행되는 1일 6시간 AI 부트캠프..." |
| **eventStartDate** | Schema.org Event startDate (ISO 8601) | "2026-05-16T10:00:00+09:00" |
| **eventEndDate** | Schema.org Event endDate | "2026-05-16T16:00:00+09:00" |
| **venueName** | Event location.name | "한양대학교 ERICA 창업보육센터" |
| **venueAddress** | Event location.address (정확한 도로명 주소 권장) | "경기도 안산시 상록구 한양대학로 55 BI Center 219-1호" |
| **price** | Event offers.price (KRW). 0 또는 'free' = 무료 | 300000 또는 'free' |
| **capacity** | Event maximumAttendeeCapacity | 15 |
| **sponsorName** | Event sponsor.name (있으면) | "(주)다운종합건설" |

이 모든 필드는 `events.json` 항목에 직접 저장되며, 자동으로:
- ✅ Google 이벤트 카드 (Schema.org Event 리치 결과)
- ✅ FAQ 리치 스니펫 (Schema.org FAQPage)
- ✅ ChatGPT/Perplexity 인용 (AEO)
- ✅ 정확한 메타 description / OG description
- ✅ 사이트맵 자동 등록

에 사용됨.

> **포스터 이미지가 따로 있으면 받아라** (없으면 생성한다 — 아래 5단계 참고)

## 작업 순서

### 1. ID·slug 결정

```bash
# 가장 큰 ID 확인
grep -o '"id": "[0-9]*"' src/data/boards/events.json | head -3
```

- 신규 ID = 가장 큰 ID + 1 (예: 317, 318 다음은 319)
- slug = `{id}-{english-slug}` (예: `319-ai-marketing-bootcamp`)
- 영문 slug는 SEO 친화적으로: 짧고, 핵심 키워드, 소문자, 하이픈 구분

### 2. SVG 포스터 작성

기존 포스터를 템플릿으로 복사 후 수정:

```bash
cp public/images/board/events/318-ai-ceo-basic-training.svg \
   public/images/board/events/{slug}.svg
```

또는 빈 템플릿에서 시작:

- 템플릿: `.claude/skills/add-event/templates/poster-template.svg`
- 캔버스: A4 세로 (605 x 852)
- 컬러: 한양 블루 `#0E4194` + `#0A2E6C`, 노랑 `#FFD93D`
- 구조:
  - 상단 340px: 그라디언트 블루 + 메인 카피
  - 중간: 흰 배경 카드들
  - 하단 90px: 짙은 블루 + 일정/장소/대상 정보
  - 최하단 32px: 준비물 + 문의

### 3. HTML 본문 작성

`scripts/event-{id}-body.html` 신규 작성. **기존 행사를 참고하라**:

- `scripts/event-317-body.html` (AI 에이전트 — 풀 디자인)
- `scripts/event-318-body.html` (AI CEO — 협찬 무료, 포함 다양한 패턴)

본문 표준 섹션 구조 (모두 필수는 아니지만 순서 유지):

1. **HERO** — 그라디언트 블루 배경 + 큰 타이틀 + 노란색 강조 키워드
2. **(선택) SPONSOR 배너** — 협찬사 있으면 노란 박스로 표시
3. **STATS GRID** — 4개 카드 (인원·비율·시간·기타)
4. **EVENT INFO** — 2x2 그리드 (DATE·VENUE·TARGET·PREPARE)
5. **포스터 이미지** — `<img src="/images/board/events/{slug}.svg">`
6. **PROBLEM** — 어두운 배경, 페르소나별 통증 포인트
7. **SOLUTION** — 도구·접근 비교 카드
8. **TARGET 페르소나** — 3열 카드
9. **(선택) SPECIAL** — 차별점 강조 섹션 (멘토 협업, 산학 등)
10. **CURRICULUM** — 시간대별 타임라인
11. **WHY US 비교표** — 일반 강의 vs 한양미래연구소
12. **(선택) PRICING** — 가격 카드
13. **FAQ** — 5문항 정도
14. **FINAL CTA** — 큰 노란색 버튼

**디자인 토큰**:

- Primary: `#0E4194`
- Dark blue: `#0A2E6C`
- Accent yellow: `#FFD93D`
- CTA red: `#FF5252`
- Background: white `#FFFFFF` ↔ `#F8F9FA` 교차
- Dark section: `#1A1A1A`
- 카드 border-radius: `12px` ~ `16px`
- 폰트: `Pretendard,-apple-system,BlinkMacSystemFont,sans-serif`

**중요한 규칙**:

- 전체를 `<div class="not-prose" style="font-family:Pretendard,...;color:#1A1A1A;line-height:1.6;">` 로 감싸라 (Tailwind prose 스타일 회피)
- 모든 스타일은 **inline style**로 작성 (props 변경 시에도 안정적)
- 어두운 배경의 텍스트는 `color:#FFFFFF !important;` (prose 스타일 덮어쓰기)
- baseline 정렬이 필요하면 `align-items:baseline` (절대 `flex-end` 쓰지 마라 — 폰트 크기 다를 때 어긋남)
- STATS 카드처럼 4개 카드 정렬할 때는 `height` 고정 + flex column 구조로 모든 요소가 동일 Y좌표에 오도록

### 4. inject 스크립트에 신규 행사 등록 (SEO 필드 모두 포함)

`scripts/inject-events.mjs`의 `meta` 객체에 추가. **SEO 필드 누락 금지**:

```javascript
const meta = {
  '317': { ... 기존 ... },
  '318': { ... 기존 ... },
  '319': {
    htmlPath: 'scripts/event-319-body.html',
    entry: {
      // 기본 메타
      id: '319',
      slug: '319-{english-slug}',
      title: '[모집] {M/D}({요일}) {교육 이름}',
      thumbnail: '/images/board/events/319-{english-slug}.svg',
      date: '{YYYY-MM-DD}',  // 등록일 (오늘 날짜)
      href: '',
      author: '한양미래연구소',

      // ─── SEO/AEO 필수 (생략 금지) ───
      description:
        '{150~200자 요약. 본문 Hero 카피를 평문으로. 핵심 키워드(장소·도구·대상) 포함.}',
      eventStartDate: '2026-MM-DDTHH:MM:00+09:00',
      eventEndDate: '2026-MM-DDTHH:MM:00+09:00',
      venueName: '한양대학교 ERICA 창업보육센터', // 또는 실제 장소
      venueAddress: '경기도 안산시 상록구 한양대학로 55 ...', // 정확한 도로명 주소
      price: 300000, // 또는 'free' (무료/협찬일 때)
      capacity: 15, // 정원
      sponsorName: '...', // 협찬사 있으면 (없으면 이 필드 생략)
      faqs: [
        { question: '...?', answer: '...' },
        // 5개 권장
      ],
    },
  },
};
```

> **순서 주의**: `meta` 객체 선언 순서 = 목록 페이지 노출 순서. 이전 행사보다 먼저 노출하고 싶으면 위에 둬라.

> **SEO 필드 검증**: `description`, `eventStartDate`, `venueName`, `price` 4개는 누락 시 EventJsonLd가 출력되지 않는다. 반드시 채울 것.

### 5. 스크립트 실행 (OG PNG 자동 생성 포함)

```bash
node scripts/inject-events.mjs
```

출력 예시:
```
Updated event 317 (XXXXX chars)
Updated event 318 (XXXXX chars)
Added event 319 (XXXXX chars)
Total events: 26

--- Generating SNS preview PNGs ---
Generated: 319-{slug}-og.png
Done. Generated: 1, Skipped (up-to-date): 2
```

> 자동으로 `scripts/generate-og-images.mjs`도 호출되어 SVG 포스터를 1210×1704 PNG로 변환한다.
> **이 PNG는 카카오톡·페이스북·라인·슬랙 링크 미리보기 (og:image) 용**이며, 없으면 SNS 썸네일이 표시되지 않는다.
> SVG og:image는 모든 SNS가 미지원이므로 PNG 변환 필수.

### 6. 빌드 검증

```bash
npm run build
```

`✓ Generating static pages (XXX/XXX)` 로그 확인. 그리고 출력에서 신규 슬러그 확인:

```
├   ├ /ko/board/events/319-{english-slug}
```

### 7. 브라우저 확인

```bash
npm run dev
# http://localhost:3000/ko/board/events/319-{english-slug}/
```

목록(`/ko/board/events/`)과 상세 페이지 모두 확인.

### 8. 커밋 & 푸시

```bash
git add -A
git commit -m "feat: 신규 행사 추가 - {교육 이름}"
git push origin HEAD:main
```

GitHub Actions가 자동 배포한다.

## 디자인 검증 체크리스트

배포 전 다음 항목을 브라우저에서 직접 확인:

- [ ] 4개 STATS 카드의 큰 숫자/텍스트가 모두 같은 Y좌표 (baseline)
- [ ] 4개 STATS 카드의 설명 텍스트도 모두 같은 Y좌표
- [ ] 어두운 배경 안의 텍스트가 흰색으로 보이는지 (prose 스타일 덮어쓰기 잘 됐는지)
- [ ] 그라디언트 박스의 강조 텍스트가 잘 보이는지
- [ ] 모바일에서도 그리드(`grid-template-columns: repeat(N, 1fr)`)가 깨지지 않는지 — 필요시 `@media` 미디어쿼리 대신 그리드 자동 reflow 사용
- [ ] 포스터 SVG가 본문 내부에 잘 렌더링되는지

## SEO/AEO 검증 체크리스트 (배포 전 필수)

- [ ] `events.json` 신규 entry에 `description`, `eventStartDate`, `eventEndDate`, `venueName`, `venueAddress`, `price`, `capacity`, `faqs` 모두 채워짐
- [ ] 본문 HTML에도 평문으로 일시·장소·가격·정원 정보가 노출됨 (이미지 안에만 매몰 X)
- [ ] FAQ 섹션이 본문에 있고, `faqs` 배열에도 동일 내용 (FAQJsonLd 활성화)
- [ ] `public/images/board/events/{slug}-og.png` 가 생성되었는지 확인 (SNS 링크 미리보기용)
- [ ] 빌드 후 `out/ko/board/events/{slug}/index.html` 에 og:image가 `-og.png` 로 끝나는지 확인 (SVG 아님)
- [ ] 빌드 후 `out/ko/board/events/{slug}/index.html` 에 `<script type="application/ld+json">` 가 EventJsonLd, FAQJsonLd, ArticleJsonLd, BreadcrumbJsonLd 4개 모두 포함되는지 확인
- [ ] 배포 후 https://search.google.com/test/rich-results 에서 신규 URL 통과 확인
- [ ] (가능하면) https://hyedu.kr/sitemap.xml 에 신규 URL 포함 확인

> **AEO(ChatGPT/Perplexity 인용 강화)**: FAQ는 단답이 아닌 "X는 Y입니다" 정의형 문장으로 작성. 핵심 사실(가격·일시·장소)은 본문 첫 단락 또는 INFO 카드에 평문으로 작성하여 LLM이 쉽게 인용할 수 있게 한다.

## 자주 발생하는 문제와 해결

| 문제 | 원인 | 해결 |
|------|------|------|
| 어두운 박스의 글씨가 검정색으로 보임 | Tailwind `prose` 스타일이 inline style을 덮어씀 | `color:#FFFFFF !important;` 사용 |
| STATS 카드의 숫자가 들쭉날쭉 | `align-items:flex-end` 사용 (descender 차이) | `align-items:baseline`으로 변경 |
| 카드들이 다른 높이 | 콘텐츠 길이 차이 | `height: 128px` 고정 + flex column |
| Next.js dev 서버 모듈 못 찾음 | `.next` 캐시 손상 | `rm -rf .next` 후 `npm run dev` 재시작 |
| dev 서버 포트 3000 이미 사용 중 | 이전 프로세스 남음 | 자동으로 3001로 fallback (URL 확인) |
| 카카오톡·페이스북에 썸네일 안 뜸 | SVG는 SNS 미리보기 미지원 | `node scripts/inject-events.mjs` 실행 시 자동으로 -og.png 생성됨. 안 됐으면 `node scripts/generate-og-images.mjs` 직접 실행 |
| 카톡 미리보기가 캐시된 상태로 안 바뀜 | 카카오 캐시 | 카카오톡 링크 새로 공유 또는 시간(~수 시간) 대기. 또는 URL에 `?v=2` 같은 쿼리 추가하여 강제 갱신 |

## 참고 자료

- 기존 행사 (canonical examples):
  - `scripts/event-317-body.html` — AI 에이전트 집중과정 (풀 기능)
  - `scripts/event-318-body.html` — AI CEO 기본교육 (협찬, 보조강사 등 변형 패턴)
- 데이터 스키마: `src/data/boardPosts.ts`
- 페이지 라우팅: `src/app/[locale]/board/events/page.tsx`, `[slug]/page.tsx`
- 디자인 참조 (외부): https://qjc.app/singularity-builders
