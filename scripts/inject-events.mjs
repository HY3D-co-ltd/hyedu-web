import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const EVENTS_PATH = path.resolve('src/data/boards/events.json');

// Featured events appear first in the listing, in the order declared here.
const meta = {
  '319': {
    htmlPath: 'scripts/event-319-body.html',
    entry: {
      id: '319',
      slug: '319-yangju-future-education-festa',
      title: "양주미래교육페스타 'Jump Up! 2026' 성황리 개최 — 한양미래연구소 체험부스 참여",
      thumbnail: '/images/board/events/319-yangju-future-education-festa-poster.png',
      date: '2026-09-30',
      href: '',
      author: '한양미래연구소',
      description:
        '2026년 9월 12일 경동대학교 메트로폴캠퍼스에서 열린 양주미래교육페스타 Jump Up! 행사 현장 스케치. 한양미래연구소는 미래기술 PLAY ZONE에서 AI·드론 체험부스를 운영하며 학생·학부모·시민 1,000여 명과 함께했습니다.',
      eventStartDate: '2026-09-12T10:00:00+09:00',
      eventEndDate: '2026-09-12T17:00:00+09:00',
      venueName: '경동대학교 메트로폴캠퍼스 청사종합체육관',
      venueAddress: '경기도 양주시 경동대학교 메트로폴캠퍼스',
      price: 'free',
      faqs: [
        {
          question: '2026 양주미래교육페스타는 어떤 행사인가요?',
          answer:
            '"Jump Up! 미래를 설계하는 하루"를 주제로 2026년 9월 12일 경동대학교 메트로폴캠퍼스 청사종합체육관에서 열린 양주시 청소년 진로·진학 박람회입니다. 미래기술 체험, 직업체험, 대학 전공상담, 진로검사 등을 한 자리에서 체험할 수 있는 행사였습니다.',
        },
        {
          question: '한양미래연구소는 어떤 역할로 참여했나요?',
          answer:
            "한양미래연구소는 '미래기술 PLAY ZONE'에서 AI·드론 체험부스를 운영하며, 청소년들이 4차 산업혁명 기술을 직접 만지고 조종해보는 체험을 지원했습니다.",
        },
        {
          question: '당일 어떤 체험 프로그램이 진행됐나요?',
          answer:
            '미래기술 PLAY ZONE(드론·VR·AI 체험), 미래직업 CHALLENGE ZONE(진로 체험), 직업체험 MAKER ZONE(3D프린팅·LED 조명 만들기) 등 총 45개 체험 프로그램과 3개 참여형 이벤트존이 운영됐습니다.',
        },
        {
          question: '우리 학교·지자체 축제에도 체험부스를 요청할 수 있나요?',
          answer:
            '네, 한양미래연구소는 지자체·학교 행사에 찾아가는 창의체험 부스를 상시 운영하고 있습니다. 체험부스 소개 페이지에서 프로그램과 커리큘럼을 확인하고 문의하실 수 있습니다.',
        },
        {
          question: '행사 현장 영상은 어디서 볼 수 있나요?',
          answer: "본문 상단의 '현장의 열기, 영상으로 확인하세요' 영역에서 바로 재생해 보실 수 있습니다.",
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

// SNS 미리보기용 OG PNG 자동 생성 (포스터 SVG → PNG).
// 카카오톡·페이스북·라인·슬랙 등이 SVG 미지원이므로 필수.
console.log('\n--- Generating SNS preview PNGs ---');
execSync('node scripts/generate-og-images.mjs', { stdio: 'inherit' });
