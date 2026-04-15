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
        ? '경진대회 대비 캠프 | 검증된 강사진의 프리미엄 실습 캠프'
        : 'Competition Prep Camp | Premium Hands-on Camp by Award-winning Instructors',
    description:
      locale === 'ko'
        ? '경진대회 경험이 풍부한 우수 강사진이 이끄는 실습 중심 프리미엄 특별 캠프. 로봇·자율주행·스마트시티·코딩 4가지 주제. 격주 토요일 4회 24시간.'
        : 'A premium hands-on competition prep camp led by award-winning instructors. Robot, autonomous driving, smart city, and coding tracks. 4 biweekly Saturday sessions, 24 hours total.',
    keywords:
      locale === 'ko'
        ? ['경진대회 대비 캠프', '로봇 경진대회', '자율주행 경진대회', '스마트시티 캠프', '코딩 경진대회']
        : ['competition prep camp', 'robot competition', 'autonomous driving competition', 'smart city camp', 'coding competition'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const reasons: { title: Bi; description: Bi }[] = [
  {
    title: { ko: '검증된 강사진', en: 'Proven Instructors' },
    description: {
      ko: '국내외 대회 수상 또는 지도 경험자 강사진으로만 구성된 프리미엄 강사들이 직접 지도하여, 학생들이 실전에 필요한 전략과 노하우를 체득할 수 있습니다.',
      en: 'Premium instructors with domestic or international competition wins (or coaching experience) personally guide students through strategies and know-how needed in real competitions.',
    },
  },
  {
    title: { ko: '실습 중심 수업', en: 'Hands-on Curriculum' },
    description: {
      ko: '이론 강의에 그치지 않고 로봇 제작, 자율주행 실험, 스마트시티 시뮬레이션, 앱과 게임 개발 실습 등 실제 코딩과 제작 경험을 통해 자기 주도적 문제 해결 능력을 키우고 성취감까지 획득할 수 있어요.',
      en: 'Beyond theory: robot building, autonomous-driving experiments, smart-city simulations, app and game development — real coding and making that grow self-directed problem-solving and a sense of achievement.',
    },
  },
  {
    title: { ko: '맞춤형 성장 지원', en: 'Personalized Growth Support' },
    description: {
      ko: '학생 개개인의 흥미와 수준에 맞춘 프로젝트 설계와 피드백을 제공하여, 단순한 완주를 넘어 \u2018나만의 스펙\u2019을 찾고 성장하는 기회를 잡으세요.',
      en: 'Project designs and feedback tailored to each student\u2019s interests and level — beyond mere completion, an opportunity to discover \u201Cyour own portfolio item\u201D and grow.',
    },
  },
  {
    title: { ko: '경진대회 직접 대비', en: 'Direct Competition Prep' },
    description: {
      ko: '코딩의 기초를 토대로 알고리즘 최적화, 발표 자료 준비, 모의 경진대회 등 실전 중심 훈련을 거쳐 실제 대회에서 당당히 성과를 낼 수 있는 역량 확보',
      en: 'Building on coding fundamentals, students train with algorithm optimization, presentation prep, and mock competitions — building the capacity to perform confidently in real events.',
    },
  },
  {
    title: { ko: '주말반/방학집중반 운영', en: 'Weekend & Vacation Intensives' },
    description: {
      ko: '학교에 학원에 빠듯한 아이들을 위한 주말 또는 방학기간 활용한 프로그램으로 4회이지만 깊이 있는 학습으로 시간은 짧게 효과는 크게!',
      en: 'For busy students juggling school and academies — a 4-session program over weekends or vacation breaks. Short on time, big on results.',
    },
  },
];

const subjects: Bi[] = [
  {
    ko: '경진대회 대비\n로봇 엔지니어 캠프(기초/심화)',
    en: 'Competition Prep\nRobot Engineer Camp (Basic / Advanced)',
  },
  {
    ko: '경진대회 대비\n스마트시티 엔지니어 캠프',
    en: 'Competition Prep\nSmart City Engineer Camp',
  },
  {
    ko: '경진대회 대비\n스마트 모빌리티 엔지니어 캠프',
    en: 'Competition Prep\nSmart Mobility Engineer Camp',
  },
  {
    ko: '경진대회 대비\n코딩 전문가 양성 캠프',
    en: 'Competition Prep\nCoding Expert Camp',
  },
];

type Slot = { time: string; activity: Bi };
const timetableRounds: { round: Bi; rows: Slot[] }[] = [
  {
    round: { ko: '1회차', en: 'Session 1' },
    rows: [
      { time: '11:00 ~ 11:20 (20)', activity: { ko: '접수 및 일정 안내', en: 'Check-in & schedule briefing' } },
      { time: '11:20 ~ 12:20 (60)', activity: { ko: '특강', en: 'Special lecture' } },
      { time: '12:20 ~ 13:10 (50)', activity: { ko: '점심 식사', en: 'Lunch' } },
      { time: '13:10 ~ 15:00 (110)', activity: { ko: '기본 이론과 실습 1', en: 'Theory & practice 1' } },
      { time: '15:10 ~ 17:00 (110)', activity: { ko: '기본 실습 2', en: 'Practice 2' } },
    ],
  },
  {
    round: { ko: '2회차', en: 'Session 2' },
    rows: [
      { time: '11:00 ~ 11:20 (20)', activity: { ko: '출석확인 / 과제 보고', en: 'Attendance / homework review' } },
      { time: '11:20 ~ 12:20 (60)', activity: { ko: '프로젝트 실습 1 (활용 1)', en: 'Project practice 1 (application 1)' } },
      { time: '12:20 ~ 13:10 (50)', activity: { ko: '점심 식사', en: 'Lunch' } },
      { time: '13:10 ~ 15:00 (110)', activity: { ko: '프로젝트 실습 2 (활용 2)', en: 'Project practice 2 (application 2)' } },
      { time: '15:10 ~ 17:00 (110)', activity: { ko: '미션 제공, 테스트 후 피드백', en: 'Mission, test, and feedback' } },
    ],
  },
  {
    round: { ko: '3회차', en: 'Session 3' },
    rows: [
      { time: '11:00 ~ 11:20 (20)', activity: { ko: '출석확인 / 과제 보고', en: 'Attendance / homework review' } },
      { time: '11:20 ~ 12:20 (60)', activity: { ko: '프로젝트 실습 3 (활용 3)', en: 'Project practice 3 (application 3)' } },
      { time: '12:20 ~ 13:10 (50)', activity: { ko: '점심 식사', en: 'Lunch' } },
      { time: '13:10 ~ 15:00 (110)', activity: { ko: '프로젝트 실습 4 (활용 4)', en: 'Project practice 4 (application 4)' } },
      { time: '15:10 ~ 17:00 (110)', activity: { ko: '미션 제공, 테스트 후 피드백', en: 'Mission, test, and feedback' } },
    ],
  },
  {
    round: { ko: '4회차', en: 'Session 4' },
    rows: [
      { time: '11:00 ~ 11:20 (20)', activity: { ko: '출석확인 / 과제 보고', en: 'Attendance / homework review' } },
      { time: '11:20 ~ 12:20 (60)', activity: { ko: '복합 미션 실습 1', en: 'Complex mission 1' } },
      { time: '12:20 ~ 13:10 (50)', activity: { ko: '점심 식사', en: 'Lunch' } },
      { time: '13:10 ~ 15:00 (110)', activity: { ko: '복합 미션 실습 2', en: 'Complex mission 2' } },
      { time: '15:10 ~ 17:00 (110)', activity: { ko: '대비 전략 전달 강의 1', en: 'Strategy briefing lecture 1' } },
    ],
  },
  {
    round: { ko: '5회차', en: 'Session 5' },
    rows: [
      { time: '11:00 ~ 11:20 (20)', activity: { ko: '출석확인 / 과제 보고', en: 'Attendance / homework review' } },
      { time: '11:20 ~ 12:20 (60)', activity: { ko: '예선 미션 실습 / 경진대회 모의 평가', en: 'Qualifier mission / mock competition' } },
      { time: '12:20 ~ 13:10 (50)', activity: { ko: '점심 식사', en: 'Lunch' } },
      { time: '13:10 ~ 15:00 (110)', activity: { ko: '예선 미션 실습 / 경진대회 모의 평가', en: 'Qualifier mission / mock competition' } },
      { time: '15:10 ~ 16:40 (90)', activity: { ko: '대비 전략 전달 강의 2', en: 'Strategy briefing lecture 2' } },
      {
        time: '16:40 ~ 17:00 (20)',
        activity: { ko: '[마무리] 설문조사 및 단체사진 촬영, 수료증 수여', en: '[Closing] Survey, group photo, and certificate ceremony' },
      },
    ],
  },
];

export default async function CompetitionCampPage({
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
          { name: isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp', href: `/${locale}/camp/competition` },
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
              <Link href={`/${locale}/camp/saturday`} className="block px-5 py-4 font-semibold text-gray-600 hover:text-point whitespace-nowrap">
                {isKo ? '토요 캠프' : 'Saturday Camp'}
              </Link>
            </li>
            <li>
              <span className="block px-5 py-4 font-bold text-[#c73030] border-b-2 border-[#c73030] whitespace-nowrap">
                {isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#c73030] to-[#8a1f1f] text-white py-16 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <h1 className="text-[28px] md:text-[40px] font-bold mb-4 leading-tight">
            {isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp'}
          </h1>
          <p className="text-[14px] md:text-[16px] leading-relaxed opacity-95 mb-6">
            {isKo ? (
              <>
                경진대회 경험이 풍부한 우수 강사진이 이끄는 실습 중심 프리미엄 특별 캠프입니다.
                <br className="hidden md:block" />
                개인 단위로 참여 가능합니다.
              </>
            ) : (
              <>
                A premium, hands-on special camp led by award-winning instructors with deep competition experience.
                <br className="hidden md:block" />
                Open to individual participants.
              </>
            )}
          </p>
          <a
            href="https://booking.naver.com/booking/12/bizes/252156"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#c73030] font-bold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors text-sm"
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
          <p className="text-[18px] md:text-[22px] font-bold text-[#c73030] mb-4">
            <strong>{isKo ? '프리미엄 경진대회 대비 캠프' : 'Premium Competition Prep Camp'}</strong>
            {isKo ? '는' : ''}
          </p>
          <p className="text-[14px] md:text-[16px] text-gray-700 leading-loose mb-5">
            {isKo
              ? '한양미래연구소의 다년간 축적된 커리큘럼 노하우와 경진대회 출전 및 지도 경험이 풍부한 우수 강사진이 함께하는 프리미엄 과정입니다.'
              : 'A premium track combining Hanyang Future Lab\'s years of curriculum know-how with award-winning instructors experienced in competing and coaching.'}
          </p>
          <p className="text-[14px] md:text-[16px] text-gray-700 leading-loose">
            {isKo ? (
              <>
                실습 중심의 커리큘럼과 맞춤형 피드백을 통해 학생들이 경진대회를 효과적으로 준비할 수 있도록 설계되었습니다.
                <br />
                또한, 학생 개개인이 자신만의 독창적인 스펙을 완성하고 필요에 맞는 맞춤형 경험을 쌓을 수 있는 특별한 교육 과정입니다. 이를 통해 참가자들은 한층 더 성장할 수 있으며 나아가 인공지능 시대에 어울리는 경쟁력 있는 인재로 발전할 수 있습니다.
              </>
            ) : (
              <>
                A hands-on curriculum and personalized feedback help students prepare effectively for competitions.
                <br />
                Each student can build a unique portfolio item and accumulate experience tailored to their needs — growing into competitive talent suited for the AI era.
              </>
            )}
          </p>
        </div>
      </section>

      {/* 프로그램 개요 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[900px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '프로그램 개요' : 'Program Overview'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white text-[13px] md:text-[14px]">
              <tbody className="text-gray-700">
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold w-[100px] md:w-[120px]">
                    {isKo ? '대상' : 'Target'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '기초 코딩 경험자라면 초등학교 3학년부터 성인까지 누구나 참여 가능합니다.'
                      : 'Open to anyone with basic coding experience, from 3rd-grade elementary students through adults.'}
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
                      ? '격주 토요일 오전 11시 ~ 오후 5시 총 4회 (일일 6시간 총 24시간)'
                      : 'Biweekly Saturdays 11:00 a.m. – 5:00 p.m., 4 sessions (6 hours/day, 24 hours total)'}
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

      {/* 왜 경진대회 대비 캠프여야 할까요? */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo
              ? '왜 한양미래연구소의 경진대회 대비 캠프여야 할까요?'
              : 'Why our Competition Prep Camp?'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="bg-[#fafafa] rounded-xl border border-gray-100 p-6 shadow-sm">
                <h4 className="text-[15px] md:text-[16px] font-bold text-[#c73030] mb-3 leading-snug">
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

      {/* 캠프 주제 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '캠프 주제' : 'Camp Tracks'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((s, i) => (
              <div
                key={i}
                className="aspect-square rounded-full bg-gradient-to-br from-[#c73030] to-[#8a1f1f] text-white p-4 flex items-center justify-center text-center shadow-md"
              >
                <p className="text-[12px] md:text-[14px] font-bold leading-snug whitespace-pre-line">
                  {pick(s, isKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비용 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-[#c73030] text-white font-bold px-4 py-2 rounded-lg text-[15px]">
              {isKo ? '경진대회 대비' : 'Competition Prep'}
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
                    <span className="font-bold text-[#c73030] text-[16px]">
                      {isKo ? '499,000원' : 'KRW 499,000'}
                    </span>
                    <span className="block text-[12px] text-gray-500 mt-1">
                      {isKo ? '(총 4회 프로그램)' : '(4-session program)'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold">
                    {isKo ? '프로그램 구성' : 'Program'}
                  </th>
                  <td className="border border-gray-200 px-4 py-3 align-top text-gray-800">
                    {isKo
                      ? '4일의 강의비와 4회 점심 식사비가 포함됨'
                      : 'Includes tuition for 4 days and lunch for 4 sessions.'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold">
                    {isKo ? '참고사항' : 'Notes'}
                  </th>
                  <td className="border border-gray-200 px-4 py-3 align-top text-gray-700">
                    {isKo
                      ? '재료비는 학생들이 선택하는 프로그램에 따라 달라지기 때문에 추후 별도 청구'
                      : 'Materials fees vary by chosen track and are billed separately.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 타임테이블 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '타임테이블 예시안' : 'Sample Time Table'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {timetableRounds.map((round) => (
              <div key={round.round.ko} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-[#c73030] text-white text-center py-3 font-bold text-[16px]">
                  {pick(round.round, isKo)}
                </div>
                <table className="w-full text-[12px] md:text-[13px]">
                  <tbody>
                    {round.rows.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                        <td className="px-3 py-2.5 font-semibold text-gray-700 align-top whitespace-nowrap border-b border-gray-100">
                          {r.time}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700 align-top border-b border-gray-100">
                          {pick(r.activity, isKo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
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
            className="inline-block bg-[#c73030] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {isKo ? '네이버 예약으로 신청하기' : 'Apply via Naver Booking'}
          </a>
        </div>
      </section>
    </>
  );
}
