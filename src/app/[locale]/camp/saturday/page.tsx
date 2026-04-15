import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '한양미래 청소년 토요캠프 | 1일 융합기술 집중체험'
        : 'Hanyang Saturday Youth Camp | One-day Convergence Tech Camp',
    description:
      locale === 'ko'
        ? '개인 단위로 참여 가능한 토요일 1일 집중 캠프. 인공지능(AI), 메이커 융합기술, VR, 코딩 등 다양한 융합기술을 하루 동안 집중 체험합니다.'
        : 'A one-day Saturday intensive camp for individual participants. Experience AI, maker tech, VR, and coding convergence technologies in a single day.',
    keywords:
      locale === 'ko'
        ? ['토요캠프', '한양미래 청소년 토요캠프', '1일 집중 캠프', 'AI 체험 캠프', 'VR 캠프', '코딩 캠프']
        : ['Saturday camp', 'Hanyang youth Saturday camp', 'one-day intensive camp', 'AI camp', 'VR camp', 'coding camp'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const programSchedule: { name: Bi; content: Bi; field: Bi; takeHome: Bi }[] = [
  {
    name: {
      ko: '야너두! 자동차 엔지니어 될 수 있어!',
      en: 'You Too! Become a Car Engineer!',
    },
    content: {
      ko: '자율주행 자동차\n태양광자동차 엔지니어',
      en: 'Autonomous vehicles\nSolar-powered car engineering',
    },
    field: {
      ko: '코딩, 메이커융합\n인공지능, 신재생에너지',
      en: 'Coding, maker convergence\nAI, renewable energy',
    },
    takeHome: { ko: '태양광자동차', en: 'Solar car' },
  },
  {
    name: {
      ko: '야너두! 카카오개발자 될 수 있어!',
      en: 'You Too! Become a Kakao Developer!',
    },
    content: { ko: '앱 개발 및 게임 개발', en: 'App and game development' },
    field: { ko: '블록코딩/텍스트코딩, 앱개발', en: 'Block/text coding, app development' },
    takeHome: { ko: '개발한 게임/앱', en: 'Your own game/app' },
  },
  {
    name: {
      ko: '야너두! 인공지능 아티스트 될 수 있어!',
      en: 'You Too! Become an AI Artist!',
    },
    content: {
      ko: '인공지능 창의 융합 교육 - 음악, 웹툰',
      en: 'AI creative convergence — music and webtoons',
    },
    field: { ko: '인공지능, 생성형 AI 체험', en: 'AI, hands-on generative AI' },
    takeHome: { ko: '생성형AI 제작물', en: 'Generative-AI creations' },
  },
  {
    name: {
      ko: '야너두! 인공지능 로봇 만들 수 있어!',
      en: 'You Too! Build AI Robots!',
    },
    content: {
      ko: '로봇 스마트 휴지통\n네오봇 오감자극 게임 코딩',
      en: 'Smart robot trash can\nNeobot sensory-stimulation game coding',
    },
    field: {
      ko: '블록코딩, 피지컬 코딩, 로봇, 메이커융합',
      en: 'Block coding, physical coding, robotics, maker convergence',
    },
    takeHome: { ko: '로봇휴지통, LED무드등', en: 'Robot trash can, LED mood lamp' },
  },
  {
    name: {
      ko: '야너두! AR/VR 전문가 될 수 있어!',
      en: 'You Too! Become an AR/VR Expert!',
    },
    content: {
      ko: '3D 모델링 기업 견학\n3D 펜 디자이너 체험\n메타버스 아바타 제작',
      en: '3D modeling company tour\n3D pen designer experience\nMetaverse avatar creation',
    },
    field: { ko: '3D 기술, VR/AR, 메이커융합', en: '3D technology, VR/AR, maker convergence' },
    takeHome: {
      ko: '만든 3D 키링, 메타버스 아바타',
      en: '3D keyring you made, metaverse avatar',
    },
  },
  {
    name: {
      ko: '야너두! 드론 전문가 될 수 있어!',
      en: 'You Too! Become a Drone Expert!',
    },
    content: {
      ko: '드론 체험\n드론 축구 체험\n또는 드론 영상 촬영',
      en: 'Drone experience\nDrone soccer\nor drone videography',
    },
    field: {
      ko: '언플러그드코딩, 드론, 메이커융합',
      en: 'Unplugged coding, drones, maker convergence',
    },
    takeHome: { ko: '드론 체험과 영상', en: 'Drone experience and video' },
  },
];

const timetable: { time: string; activity: Bi }[] = [
  { time: '10:30 ~ 10:40 (10)', activity: { ko: '오리엔테이션', en: 'Orientation' } },
  { time: '10:40 ~ 12:10 (90)', activity: { ko: '액티비티 Ⅰ', en: 'Activity I' } },
  { time: '12:10 ~ 13:00 (50)', activity: { ko: '점심식사', en: 'Lunch' } },
  { time: '13:00 ~ 15:00 (120)', activity: { ko: '액티비티 Ⅱ', en: 'Activity II' } },
  {
    time: '15:00 ~ 15:20 (20)',
    activity: {
      ko: '[마무리] 설문조사 및 단체사진 촬영, 수료증 수여',
      en: '[Closing] Survey, group photo, and certificate ceremony',
    },
  },
  {
    time: '15:20 ~ 16:00 (40)',
    activity: { ko: '한양대학교 ERICA 캠퍼스 투어', en: 'Hanyang ERICA Campus tour' },
  },
  { time: '16:00 ~', activity: { ko: '귀가', en: 'Dismissal' } },
];

const reasons: { title: Bi; description: Bi }[] = [
  {
    title: {
      ko: '짧은 시간 안에 큰 효과를 원하는 학생',
      en: 'Big results in a short time',
    },
    description: {
      ko: '바쁜 우리 아이들, 토요일 하루, 집중 체험형 교육으로 다분야 이해도를 넓히고 깊이있는 융합 지식을 재미있는 방식으로 빠르게 습득할 수 있어요.',
      en: 'A single Saturday of intensive, hands-on learning broadens multi-field understanding and delivers deep convergence knowledge quickly — and in a fun way.',
    },
  },
  {
    title: {
      ko: '이론과 실습을 함께 경험하고 싶은 학생',
      en: 'Theory combined with hands-on practice',
    },
    description: {
      ko: '단순한 강의가 아닌, PBL 수업으로 문제 해결 중심의 프로젝트를 통해 이론+실습+제작이 결합된 프로그램으로 실제적인 경험과 응용력에 성취감까지 키워 줄 수 있어요.',
      en: 'Not lectures alone: PBL-based, problem-solving projects combine theory, practice, and making — building real experience, applied skills, and a sense of achievement.',
    },
  },
  {
    title: {
      ko: '결과물 뿐 아니라 멋진 스펙까지 남기고 싶나요?',
      en: 'Leave with a great portfolio addition',
    },
    description: {
      ko: '캠프 종료 후 온/오프라인 결과물, 사진이 포함된 멋진 수료증으로 성취감도 얻고, 자기소개서 및 진로 스펙에도 활용할 수 있어요.',
      en: 'After the camp you receive online/offline deliverables and a photo-inclusive certificate that you can use in personal statements and career applications.',
    },
  },
  {
    title: {
      ko: '미래 진로를 탐색하고 싶은 학생',
      en: 'Explore future careers',
    },
    description: {
      ko: '다양한 분야의 체험을 통해 자신의 흥미와 가능성을 탐색하고 싶은데 한달 학원은 망설여질 때, 4차 산업 분야도 다양한데 어떤 분야를 좋아하는지 모를 때, 이 캠프로 진로에 대한 방향성을 설정해보세요.',
      en: 'If you want to explore your interests but aren\'t ready for a month-long academy, or don\'t yet know which 4th-IR field fits you — use this camp to set a direction for your career path.',
    },
  },
];

export default async function SaturdayCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '캠프' : 'Camps', href: `/${locale}/camp` },
          { name: isKo ? '토요캠프' : 'Saturday Camp', href: `/${locale}/camp/saturday` },
        ]}
      />

      {/* 탭 */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <ul className="flex overflow-x-auto text-[13px] md:text-[14px]">
            <li>
              <Link href={`/${locale}/camp`} className="block px-5 py-4 font-semibold text-gray-600 hover:text-point whitespace-nowrap">
                {isKo ? '한양청소년캠프' : 'Hanyang Youth Camp'}
              </Link>
            </li>
            <li>
              <span className="block px-5 py-4 font-bold text-point border-b-2 border-point whitespace-nowrap">
                {isKo ? '토요 캠프' : 'Saturday Camp'}
              </span>
            </li>
            <li>
              <Link href={`/${locale}/camp/competition`} className="block px-5 py-4 font-semibold text-gray-600 hover:text-point whitespace-nowrap">
                {isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp'}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#336666] to-[#1f4040] text-white py-16 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <h1 className="text-[28px] md:text-[40px] font-bold mb-4 leading-tight">
            {isKo ? '한양미래 청소년 토요캠프' : 'Hanyang Future Saturday Youth Camp'}
          </h1>
          <p className="text-[14px] md:text-[16px] leading-relaxed opacity-95 mb-6">
            {isKo
              ? '학교나 기관을 통한 단체 신청이 아닌, 개인 단위로 참여할 수 있는 청소년 대상 캠프 프로그램입니다.'
              : 'A youth camp program that individuals can join directly, rather than applying as part of a school or organization group.'}
          </p>
          <a
            href="https://booking.naver.com/booking/12/bizes/252156"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-point font-bold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors text-sm"
          >
            {isKo ? '교육 신청하기' : 'Apply'}
          </a>
        </div>
      </section>

      {/* 교육 소개 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8">
            {isKo ? '교육 소개' : 'About the Camp'}
          </h2>
          <p className="text-[18px] md:text-[22px] font-bold text-point mb-4">
            <strong>{isKo ? '한양미래 청소년 토요캠프' : 'Hanyang Future Saturday Youth Camp'}</strong>
            {isKo ? '는' : ''}
          </p>
          <p className="text-[14px] md:text-[16px] text-gray-700 leading-loose mb-5">
            {isKo ? (
              <>
                한양미래연구소에서 다년간 진행해온 B2B 프로그램 [한양미래 청소년캠프]는 그동안 많은 개인분들의 참가 문의를 받았습니다.
                <br />
                이에 개인에게도 참여 기회를 제공하고자, 이번에 &lsquo;1일 융합기술 집중체험 프로그램&rsquo;으로 새롭게 리뉴얼하였습니다.
              </>
            ) : (
              <>
                Hanyang Future Lab&apos;s long-running B2B program, [Hanyang Youth Camp], has received many inquiries from individual participants.
                <br />
                To provide individuals the same opportunity, we have relaunched it as a &ldquo;One-day Convergence Tech Intensive Program&rdquo;.
              </>
            )}
          </p>
          <p className="text-[14px] md:text-[16px] text-gray-700 leading-loose">
            {isKo
              ? '이 프로그램은 창의융합형 인재 양성을 목표로 하며, 인공지능(AI), 메이커 융합기술, 가상현실(VR), 코딩 등 다양한 융합기술 교육을 하루 동안 집중적으로 체험할 수 있습니다.'
              : 'The program aims to develop convergent, creative talent, letting students dive into AI, maker technology, VR, and coding in a single intensive day.'}
          </p>
        </div>
      </section>

      {/* 왜 토요캠프여야 할까요? */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo
              ? '왜 한양미래연구소의 한양미래 청소년 토요캠프여야 할까요?'
              : 'Why the Hanyang Future Saturday Youth Camp?'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h4 className="text-[15px] md:text-[16px] font-bold text-point mb-3 leading-snug">
                  - {pick(r.title, isKo)}
                </h4>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                  {pick(r.description, isKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 개요 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[900px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '프로그램 개요' : 'Program Overview'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-[13px] md:text-[14px]">
              <tbody className="text-gray-700">
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold w-[100px] md:w-[120px]">
                    {isKo ? '대상' : 'Target'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '4차산업혁명을 이끌어 나갈 리더를 꿈꾸는 초등/중등/고등학생'
                      : 'Elementary, middle, and high school students aspiring to lead the 4th Industrial Revolution'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold">
                    {isKo ? '인원' : 'Capacity'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '최소 12명 이상 (최저 인원수 12명 모집 미달 시에는 폐강될 수 있습니다.)'
                      : 'Minimum 12 participants (a class may be canceled if fewer than 12 register).'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold">
                    {isKo ? '시간' : 'Schedule'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '월 1~2회 토요일 오전 10시 30분 ~ 오후 4시 (일일 4.5시간)'
                      : '1–2 Saturdays per month, 10:30 a.m. – 4:00 p.m. (4.5 hours per day)'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold">
                    {isKo ? '장소' : 'Location'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '한양대학교 ERICA 캠퍼스 (경기도 안산시 상록구 한양대학로 55)'
                      : 'Hanyang University ERICA Campus (55 Hanyangdaehak-ro, Sangnok-gu, Ansan, Gyeonggi-do)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 운행 일정 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '운행 일정' : 'Program Schedule'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white text-[13px] md:text-[14px]">
              <thead>
                <tr>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold">
                    {isKo ? '프로그램 명' : 'Program'}
                  </th>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold">
                    {isKo ? '프로그램 내용' : 'Content'}
                  </th>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold">
                    {isKo ? '학습 분야' : 'Learning Area'}
                  </th>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold">
                    {isKo ? '개인 소장물' : 'Take-home'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {programSchedule.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                    <td className="border border-gray-300 px-4 py-3 font-semibold whitespace-pre-line align-top">
                      {pick(p.name, isKo)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-pre-line align-top">
                      {pick(p.content, isKo)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-pre-line align-top">
                      {pick(p.field, isKo)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 align-top">
                      {pick(p.takeHome, isKo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 비용 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-point text-white font-bold px-4 py-2 rounded-lg text-[15px]">
              {isKo ? '토요 캠프' : 'Saturday Camp'}
            </span>
            <h3 className="text-[18px] md:text-[22px] font-bold text-gray-900">
              {isKo ? '상세 정보' : 'Details'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-[13px] md:text-[14px]">
              <tbody>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold w-[140px] md:w-[180px]">
                    {isKo ? '비용 (1인 기준)' : 'Fee (per person)'}
                  </th>
                  <td className="border border-gray-200 px-4 py-3 align-top">
                    <span className="font-bold text-point text-[16px]">
                      {isKo ? '120,000원' : 'KRW 120,000'}
                    </span>
                    <span className="block text-[12px] text-gray-500 mt-1">
                      {isKo
                        ? '최소 인원 25명 / 교육비, 교재비, 관리비, 식비 등 기타 제반비용 모두 포함 / 변동 가능'
                        : 'Minimum 25 participants / includes tuition, materials, operations, and meals / subject to change'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold">
                    {isKo ? '프로그램 구성' : 'Program'}
                  </th>
                  <td className="border border-gray-200 px-4 py-3 align-top">
                    <span className="font-semibold text-gray-800">
                      {isKo
                        ? '프로그램마다 진행되는 엑티비티가 달라집니다.'
                        : 'Activities vary by program.'}
                    </span>
                    <span className="block text-[12px] text-gray-500 mt-1">
                      {isKo
                        ? '메이커 액티비티 별로 1인 1 결과물을 가져갈 수 있습니다. (상세 내용 프로그램 안내 참고)'
                        : 'Each participant takes home 1 project per maker activity. (See program details.)'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold">
                    {isKo ? '참고사항' : 'Notes'}
                  </th>
                  <td className="border border-gray-200 px-4 py-3 align-top text-gray-700">
                    {isKo ? (
                      <>
                        캠프 이수자에게는 포트폴리오(사진, 영상) 제공
                        <br />
                        캠프 이수자에게는 수료증(한양미래연구소 대표) 수여
                      </>
                    ) : (
                      <>
                        Portfolio (photos, video) provided to camp graduates
                        <br />
                        Certificate (from the CEO of Hanyang Future Lab) awarded
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 타임 테이블 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[700px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '한양청소년 토요캠프' : 'Hanyang Saturday Youth Camp'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white text-[13px] md:text-[14px]">
              <thead>
                <tr>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold w-[180px]">
                    {isKo ? '시간' : 'Time'}
                  </th>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3 font-bold">
                    {isKo ? '내용' : 'Activity'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {timetable.map((t, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                    <td className="border border-gray-300 px-4 py-3 font-semibold align-top">{t.time}</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">
                      {pick(t.activity, isKo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 신청 CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[14px] md:text-[16px] text-gray-700 mb-6">
            {isKo
              ? '개인 신청은 네이버 예약으로 진행됩니다.'
              : 'Individual applications are handled via Naver Booking.'}
          </p>
          <a
            href="https://booking.naver.com/booking/12/bizes/252156"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-point text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {isKo ? '네이버 예약으로 신청하기' : 'Apply via Naver Booking'}
          </a>
        </div>
      </section>
    </>
  );
}
