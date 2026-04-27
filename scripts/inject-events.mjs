import fs from 'node:fs';
import path from 'node:path';

const EVENTS_PATH = path.resolve('src/data/boards/events.json');

// Featured events appear first in the listing, in the order declared here.
const meta = {
  '317': {
    htmlPath: 'scripts/event-317-body.html',
    entry: {
      id: '317',
      slug: '317-ai-agent-intensive-bootcamp',
      title: '[모집] 5/16(토) AI 에이전트 집중과정 — Antigravity · Claude Code 일일 부트캠프',
      thumbnail: '/images/board/events/317-ai-agent-intensive-bootcamp.svg',
      date: '2026-04-27',
      href: '',
      author: '한양미래연구소',
      description:
        '한양대 ERICA에서 진행되는 1일 6시간 AI 에이전트 집중 부트캠프. 비개발자도 Antigravity와 Claude Code를 직접 다뤄보고, 본인 업무·아이디어를 자동화하는 1:5 밀착 실습 교육. 15명 한정 모집.',
      eventStartDate: '2026-05-16T10:00:00+09:00',
      eventEndDate: '2026-05-16T16:00:00+09:00',
      venueName: '한양대학교 ERICA 창업보육센터',
      venueAddress: '경기도 안산시 상록구 한양대학로 55 BI Center 219-1호',
      price: 300000,
      capacity: 15,
      faqs: [
        {
          question: '진짜 코딩이나 AI 하나도 몰라도 따라갈 수 있나요?',
          answer: '네, 정확히 그런 분들을 위한 교육입니다. 강사가 1:5로 밀착하고, 설치부터 마지막 결과물까지 직접 옆에서 잡아드립니다.',
        },
        {
          question: '노트북 사양이 어느 정도면 되나요?',
          answer: '인터넷이 되고, 5년 이내 구매한 노트북이면 충분합니다. 신청 시 사양이 걱정되시면 사전 문의 주세요.',
        },
        {
          question: '청소년인데 부모님 동반해야 하나요?',
          answer: '만 14세 이상 단독 참여 가능합니다. 만 14세 미만은 부모님 동반 또는 사전 협의 부탁드립니다.',
        },
        {
          question: '회사에서 단체로 신청할 수 있나요?',
          answer: '네, 다인원 할인(인당 15만원)이 적용됩니다. 세금계산서 발행, 법인 카드 결제 모두 가능합니다.',
        },
        {
          question: '환불 정책은요?',
          answer: '교육 7일 전까지 100%, 3일 전까지 50% 환불 가능합니다. 교육 당일 / 무단 불참은 환불 불가합니다.',
        },
      ],
    },
  },
  '318': {
    htmlPath: 'scripts/event-318-body.html',
    entry: {
      id: '318',
      slug: '318-ai-ceo-basic-training',
      title: '[모집] 5/2(토) AI CEO 기본교육 — ChatGPT · Gemini 실무 활용',
      thumbnail: '/images/board/events/318-ai-ceo-basic-training.svg',
      date: '2026-04-27',
      href: '',
      author: '한양미래연구소',
      description:
        '중소기업 CEO·임직원을 위한 ChatGPT·Gemini 실무 활용 1일 집중과정. 한양대 ERICA에서 AI 전공 보조강사 3명과 함께하는 10명 한정 교육. (주)다운종합건설 협찬 무료, 초청 기업만 참석.',
      eventStartDate: '2026-05-02T10:00:00+09:00',
      eventEndDate: '2026-05-02T16:00:00+09:00',
      venueName: '한양대학교 ERICA 창업보육센터',
      venueAddress: '경기도 안산시 상록구 한양대학로 55 창업보육센터 219-1호',
      price: 'free',
      capacity: 10,
      sponsorName: '(주)다운종합건설',
      faqs: [
        {
          question: 'ChatGPT나 Gemini를 한 번도 써본 적이 없는데 따라갈 수 있나요?',
          answer: '네, 전혀 처음이신 분들을 위한 교육입니다. 가입·로그인부터 AI 전공 보조강사 3명이 옆에서 직접 잡아드립니다.',
        },
        {
          question: '건설업이 아닌 다른 업종 CEO도 참여 가능한가요?',
          answer: '네, 모든 업종 환영합니다. 건설산업은 대표 사례로 다루지만, 모든 실습은 본인 업종에 적용 가능한 형태로 진행됩니다.',
        },
        {
          question: '임직원과 함께 참여할 수 있나요?',
          answer: '네, 적극 권장합니다. CEO 혼자보다 핵심 임직원이 함께 와서 사내 AI 도입 동력으로 만드시길 추천드립니다.',
        },
        {
          question: '준비물은 무엇이 필요한가요?',
          answer: '노트북 필수 지참입니다. 모든 실습은 노트북으로 진행되며, 보조강사가 환경 설정부터 함께 도와드립니다.',
        },
        {
          question: '수강료는 얼마인가요?',
          answer: '(주)다운종합건설에서 협찬하여 진행하는 교육입니다. 초청받은 일부 기업만 참석이 가능하며, 교육비용은 무료입니다.',
        },
      ],
    },
  },
};

const events = JSON.parse(fs.readFileSync(EVENTS_PATH, 'utf-8'));

for (const [id, { htmlPath, entry }] of Object.entries(meta)) {
  const html = fs.readFileSync(path.resolve(htmlPath), 'utf-8').replace(/\r?\n\s*/g, '').trim();
  const existingIdx = events.findIndex((e) => e.id === id);
  const next = { ...entry, body: html };
  if (existingIdx === -1) {
    events.unshift(next);
    console.log(`Added event ${id} (${html.length} chars)`);
  } else {
    events[existingIdx] = { ...events[existingIdx], ...next };
    console.log(`Updated event ${id} (${html.length} chars)`);
  }
}

// Featured events first (in meta declaration order), then legacy events by ID desc.
const metaIds = Object.keys(meta);
events.sort((a, b) => {
  const aIdx = metaIds.indexOf(a.id);
  const bIdx = metaIds.indexOf(b.id);
  if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
  if (aIdx !== -1) return -1;
  if (bIdx !== -1) return 1;
  return Number(b.id) - Number(a.id);
});

fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2) + '\n', 'utf-8');
console.log(`Total events: ${events.length}`);
