# 신규 행사·교육 등록 가이드

`/ko/board/events` 게시판에 새 교육·행사 페이지를 등록할 때 사용하는 워크플로우.

## 두 가지 사용 방법

### A. Claude Code로 자동 등록 (권장)

이 저장소를 클론한 PC에서 Claude Code를 실행한 뒤, Claude에게 자연어로 요청:

```
"신규 교육 추가해줘. 제목은 ○○○이고 일시는 ○월 ○일..."
```

또는

```
"add-event skill 사용해서 ○○○ 교육 페이지 만들어줘"
```

Claude가 [SKILL.md](SKILL.md) 절차를 따라 SVG 포스터·HTML 본문·`events.json` 등록·빌드 검증까지 자동으로 처리합니다.

### B. 수동 등록 (Claude Code 없이)

이 저장소를 클론한 직원이 직접 수정할 때:

#### 사전 준비 (한 번만)

```bash
git clone https://github.com/HY3D-co-ltd/hyedu-web.git
cd hyedu-web
npm install
```

#### 신규 행사 등록 절차

**1단계: 다음 ID 확인**

```bash
grep -o '"id": "[0-9]*"' src/data/boards/events.json | head -1
```

가장 큰 ID + 1이 신규 ID. 예: 318 다음은 319.

**2단계: 영문 slug 정하기**

- 형식: `{ID}-{english-slug}`
- 예: `319-ai-marketing-bootcamp`
- 짧고 핵심 키워드, 소문자, 하이픈으로 단어 구분

**3단계: SVG 포스터 만들기**

기존 포스터 복사 후 수정:

```bash
cp public/images/board/events/318-ai-ceo-basic-training.svg \
   public/images/board/events/319-{slug}.svg
```

또는 빈 템플릿에서 시작:

```bash
cp .claude/skills/add-event/templates/poster-template.svg \
   public/images/board/events/319-{slug}.svg
```

이미지 편집 도구나 텍스트 에디터로 `{{...}}` 자리표시자를 실제 내용으로 교체.

**4단계: HTML 본문 만들기**

```bash
cp scripts/event-318-body.html scripts/event-319-body.html
# 또는
cp .claude/skills/add-event/templates/body-template.html scripts/event-319-body.html
```

내용을 새 행사에 맞춰 수정. 디자인 토큰은 [SKILL.md](SKILL.md#디자인-토큰) 참고.

**5단계: 등록 스크립트에 추가**

`scripts/inject-events.mjs` 파일을 열어 `meta` 객체에 신규 행사 추가:

```javascript
const meta = {
  '317': { ... 기존 ... },
  '318': { ... 기존 ... },
  '319': {
    htmlPath: 'scripts/event-319-body.html',
    entry: {
      id: '319',
      slug: '319-{slug}',
      title: '[모집] M/D(요일) {교육 이름}',
      thumbnail: '/images/board/events/319-{slug}.svg',
      date: '2026-MM-DD',
      href: '',
      author: '한양미래연구소',
    },
  },
};
```

**6단계: 등록 실행**

```bash
node scripts/inject-events.mjs
```

**7단계: 로컬 확인**

```bash
npm run dev
```

브라우저에서 `http://localhost:3000/ko/board/events/319-{slug}/` 접속해 확인.

**8단계: 배포**

```bash
npm run build  # 빌드 성공 확인
git add -A
git commit -m "feat: 신규 행사 추가 - {교육 이름}"
git push origin main
```

GitHub Actions가 자동 배포 (수 분 소요).

## 디자인 일관성을 위한 핵심 규칙

| 항목 | 값 |
|------|------|
| Primary 컬러 | `#0E4194` (한양 블루) |
| 강조 컬러 | `#FFD93D` (노랑) |
| CTA 컬러 | `#FF5252` (빨강) |
| 다크 섹션 배경 | `#1A1A1A` |
| 폰트 | `Pretendard` |
| 카드 둥근 모서리 | `12px` ~ `16px` |
| 본문 전체 래퍼 | `<div class="not-prose">` |

## 자주 발생하는 실수

1. **스타일이 안 먹힘** → Tailwind `prose`가 inline style을 덮어씀. 다크 섹션은 `color:#FFFFFF !important;` 사용.
2. **STATS 카드 정렬 깨짐** → `align-items:flex-end` 쓰지 말고 `align-items:baseline` 사용.
3. **dev 서버 모듈 못 찾음 에러** → `rm -rf .next` 후 `npm run dev` 재시작.
4. **포트 3000 사용 중** → 자동으로 3001로 fallback. 터미널 출력의 URL 확인.

## 도움이 필요할 때

- 디자인 패턴 참고: [scripts/event-317-body.html](../../../scripts/event-317-body.html) (풀 기능 예시), [scripts/event-318-body.html](../../../scripts/event-318-body.html) (협찬·보조강사 변형)
- 데이터 스키마: [src/data/boardPosts.ts](../../../src/data/boardPosts.ts)
- 페이지 라우팅: [src/app/[locale]/board/events/](../../../src/app/[locale]/board/events/)
