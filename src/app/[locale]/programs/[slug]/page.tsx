import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from '@/components/ui/Img';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { programs } from '@/data/programs';
import { cancellationPolicies } from '@/data/cancellation-policy';
import { CourseJsonLd, FAQJsonLd, BreadcrumbJsonLd, ReviewsJsonLd } from '@/components/seo/JsonLd';
import AgeRecommendation from '@/components/sections/AgeRecommendation';
import ContactSection from '@/components/sections/ContactSection';
import { withBasePath } from '@/lib/basePath';
import MapSection from '@/components/sections/MapSection';

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const categoryLabelKo: Record<string, string> = {
  ai: 'AI 인공지능',
  coding: '코딩',
  maker: '메이커 융합',
  steam: 'STEAM',
};
const categoryLabelEn: Record<string, string> = {
  ai: 'AI',
  coding: 'Coding',
  maker: 'Maker Convergence',
  steam: 'STEAM',
};

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  return locales.flatMap((locale) =>
    programs.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};

  const isKo = locale === 'ko';
  const title = isKo ? program.title : program.titleEn;
  const desc = isKo ? program.description : program.descriptionEn;

  return {
    title: isKo ? `${title} | 한양미래연구소` : `${title} | Hanyang Future Lab`,
    description: desc,
    keywords: isKo
      ? [title, 'AI교육', '체험교실', '한양미래연구소']
      : [title, 'AI education', 'experience class', 'Hanyang Future Lab'],
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const title = isKo ? program.title : program.titleEn;
  const altTitle = isKo ? program.titleEn : program.title;
  const description = isKo ? program.description : program.descriptionEn;
  const curriculum = isKo ? program.curriculum : program.curriculumEn;
  const categoryLabel = isKo ? categoryLabelKo[program.category] : categoryLabelEn[program.category];

  // 사이트 공통 FAQ
  const siteFaqs: { question: Bi; questionHtml: Bi; answer: Bi }[] = [
    {
      question: {
        ko: '나라장터, 학교장터로 계약 가능한가요?',
        en: 'Can we contract via Korea ON-line E-Procurement System (나라장터) or School Market (학교장터)?',
      },
      questionHtml: {
        ko: '<mark class="bg-[#f2e58c] px-1 rounded">나라장터, 학교장터</mark>로 계약 가능한가요?',
        en: 'Can we contract via <mark class="bg-[#f2e58c] px-1 rounded">나라장터 / 학교장터</mark>?',
      },
      answer: {
        ko: '네, 나라장터·학교장터를 이용하여 계약 가능합니다.',
        en: 'Yes, contracts can be made through 나라장터 and 학교장터 (Korean public procurement platforms).',
      },
    },
    {
      question: {
        ko: '비용은 교육 종료 후 결제 가능할까요?',
        en: 'Can payment be made after the class ends?',
      },
      questionHtml: {
        ko: '비용은 <mark class="bg-[#f2e58c] px-1 rounded">교육 종료 후 결제</mark> 가능할까요?',
        en: 'Can we pay <mark class="bg-[#f2e58c] px-1 rounded">after the class ends</mark>?',
      },
      answer: { ko: '네, 가능합니다.', en: 'Yes, post-class payment is supported.' },
    },
    {
      question: {
        ko: 'PC 없이 재미있게 진행할 수 있는 프로그램을 추천해주세요.',
        en: 'Please recommend fun programs that don\'t require a PC.',
      },
      questionHtml: {
        ko: '<mark class="bg-[#f2e58c] px-1 rounded">PC 없이 재미있게 진행할 수 있는 프로그램</mark>을 추천해주세요.',
        en: 'Recommend <mark class="bg-[#f2e58c] px-1 rounded">fun programs that don\'t require a PC</mark>.',
      },
      answer: {
        ko: '3D펜, 드론, 자율주행자동차, 유튜브 크리에이터, 신재생에너지 전문가, LED 무드등 만들기 등이 있습니다.',
        en: '3D Pen, Drones, Autonomous Driving, YouTube Creator, Renewable Energy, LED Mood Lamp, and more.',
      },
    },
    {
      question: {
        ko: '아이들이 직접 만들면서 결과물을 가져갈 수 있는 교육을 진행하고 싶습니다.',
        en: 'We want classes where students make something themselves and take it home.',
      },
      questionHtml: {
        ko: '아이들이 직접 만들면서 <mark class="bg-[#f2e58c] px-1 rounded">결과물을 가져갈 수 있는 교육</mark>을 진행하고 싶습니다.',
        en: 'We want <mark class="bg-[#f2e58c] px-1 rounded">classes where students build and take home a project</mark>.',
      },
      answer: {
        ko: 'ChatGPT로 노래하는 LED 무드등 만들기, 스마트홈 전문가, 적외선센서로 강아지 자동차 만들기, 블루투스 스피커 만들기, 초음파센서로 로봇 휴지통 만들기, 야경 디자이너 등을 추천드립니다.',
        en: 'We recommend Singing LED Mood Lamp with ChatGPT, Smart Home Expert, IR-Sensor Dog Car, Bluetooth Speaker, Ultrasonic Sensor Robot Trash Can, and Night View Designer.',
      },
    },
  ];

  const faqsForJsonLd = siteFaqs.map((f) => ({
    question: pick(f.question, isKo),
    answer: pick(f.answer, isKo),
  }));

  // 사이트 공통 리뷰
  const siteReviews: { author: Bi; rating: number; content: Bi }[] = [
    {
      author: { ko: '고등학교 선생님', en: 'High School Teacher' },
      rating: 5,
      content: {
        ko: '여러 요청 사항도 들어주시고 다인원 교육도 가능해 너무 만족했습니다!',
        en: 'They accommodated our various requests and supported a large class size — we were very satisfied!',
      },
    },
    {
      author: { ko: '돌봄센터 선생님', en: 'After-school Care Center Teacher' },
      rating: 5,
      content: {
        ko: '아이들 연령대가 다양해서 수업 방향을 잡기가 어려웠는데, 추천해 준 대로 진행하니 수월했어요.',
        en: 'The kids spanned many ages, so planning was tough, but following their recommendations made it smooth.',
      },
    },
    {
      author: { ko: '중학교 학생', en: 'Middle School Student' },
      rating: 5,
      content: {
        ko: '사실 처음 배워보는 내용에 체험이 익숙하지 않아 걱정했는데, 강사님이 도와주셔서 어렵지 않았어요.',
        en: 'Honestly, it was my first time with this topic and I was worried, but the instructor\'s help made it easy.',
      },
    },
  ];

  const reviewsForJsonLd = siteReviews.map((r) => ({
    author: pick(r.author, isKo),
    rating: r.rating,
    content: pick(r.content, isKo),
  }));

  // 학습 단계 분할
  const totalItems = curriculum.length;
  const stage1End = Math.ceil(totalItems / 3);
  const stage2End = Math.ceil((totalItems * 2) / 3);
  const introItems = curriculum.slice(0, stage1End);
  const devItems = curriculum.slice(stage1End, stage2End);
  const wrapItems = curriculum.slice(stage2End);

  const hasElementary = program.target.includes('elementary');
  const hasMiddle = program.target.includes('middle');
  const hasHigh = program.target.includes('high');

  const policy = cancellationPolicies.find((p) => p.type === 'experience');
  const displayImages = program.images;

  // 4차산업기술교육 특징 6개
  const features: { image: string; title: Bi; description: Bi }[] = [
    {
      image: '/images/main/feature01_01.png',
      title: { ko: '맞춤형 교육', en: 'Tailored Education' },
      description: {
        ko: '원하는 연령과 회기수에 맞춰서 기획 및 운영 가능',
        en: 'Planning and operations customized to the target age group and number of sessions.',
      },
    },
    {
      image: '/images/main/feature01_02.png',
      title: { ko: '교육의 다양성', en: 'Diverse Topics' },
      description: {
        ko: '코딩 교육 메이커 융합 교육 STEAM 교육 인공지능 교육 특강까지',
        en: 'Coding, maker convergence, STEAM, AI education, and special lectures.',
      },
    },
    {
      image: '/images/main/feature01_03.png',
      title: { ko: '베테랑 강사진', en: 'Veteran Instructors' },
      description: {
        ko: '경력 3년 이상의 전문 강사진들이 진행하는 교육',
        en: 'Classes led by professional instructors with 3+ years of experience.',
      },
    },
    {
      image: '/images/main/feature01_04.png',
      title: { ko: '기술직업 체험교육', en: 'Tech Career Experience' },
      description: {
        ko: '기술 이해를 바탕으로 기업가 정신 함양 / 4차산업혁명 기술을 이용한 미래 유망 직업 탐색',
        en: 'Build entrepreneurial mindset based on tech understanding; explore promising future careers powered by 4th-IR technology.',
      },
    },
    {
      image: '/images/main/feature01_05.png',
      title: { ko: '사고력을 기르는 PBL 수업', en: 'PBL Classes That Grow Thinking Skills' },
      description: {
        ko: '문제해결 역량 강화 / 자기주도적 학습을 통한 사고력 향상',
        en: 'Strengthens problem-solving and grows thinking skills through self-directed learning.',
      },
    },
    {
      image: '/images/main/feature01_06.png',
      title: { ko: '협동하며 문제해결', en: 'Collaborative Problem-solving' },
      description: {
        ko: '친구와 정보 공유및 상호작용으로 문제 해결 / 상호작용 과정을 통해 배려와 존중 정신 함양',
        en: 'Solve problems by sharing information with peers; build care and respect through collaborative interactions.',
      },
    },
  ];

  // 추천드립니다 (con01)
  const recommendations: { text: Bi; highlight: boolean }[] = [
    {
      text: {
        ko: '4차산업혁명을 이끌어나갈 메이커를 꿈꾸는 초·중·고등학생',
        en: 'Elementary, middle, and high school students dreaming of becoming makers who will lead the 4th Industrial Revolution',
      },
      highlight: true,
    },
    {
      text: {
        ko: '진로·학습·인성 영역과 연계한 체험 프로그램을 고민하는 학교',
        en: 'Schools seeking experience programs linked to career, learning, and character education',
      },
      highlight: false,
    },
    {
      text: {
        ko: '특강, 워크샵, 연수, 멘토링 등 다양한 프로그램을 진행하려는 기관',
        en: 'Institutions running diverse programs such as lectures, workshops, training, and mentoring',
      },
      highlight: false,
    },
    {
      text: {
        ko: '지역 특색에 맞는 프로그램을 지원하려는 지자체 또는 교육청',
        en: 'Local governments or education offices supporting region-specific programs',
      },
      highlight: false,
    },
  ];

  // 필독사항 (con15)
  const importantNotices: Bi[] = [
    {
      ko: '교육 인원이 20명 이하일 경우, 인당 교육비 단가가 상승됩니다.',
      en: 'If enrollment is 20 or fewer, per-person tuition increases.',
    },
    {
      ko: '원활한 교육 진행을 위해 최소 30일 전 문의바랍니다.',
      en: 'Please inquire at least 30 days in advance for smooth scheduling.',
    },
    {
      ko: '교육 당일, 인원 변동으로 인한 교육비 변경은 불가합니다.',
      en: 'Tuition cannot be adjusted on the day of class due to enrollment changes.',
    },
    {
      ko: '출장비는 별도 책정되며, 서울/경기 외 지역은 추가 비용이 발생할 수 있습니다.',
      en: 'Travel fees are charged separately; locations outside Seoul/Gyeonggi may incur additional costs.',
    },
    {
      ko: '교육 장소에 빔 프로젝터와 와이파이가 준비되어야 합니다.',
      en: 'A beam projector and Wi-Fi must be available at the venue.',
    },
    {
      ko: '교육 교구는 수업 종료 후 반납하며, 파손 시 배상 책임이 있습니다.',
      en: 'Teaching materials must be returned after class; damages are billable.',
    },
    {
      ko: '커리큘럼은 학교/기관의 요청에 따라 조정될 수 있습니다.',
      en: 'Curriculum may be adjusted upon request by the school or institution.',
    },
  ];

  // 교육 추천 정리표 — 컬럼 정의
  const recColumns: { key: 'elementary' | 'middle' | 'high'; label: Bi; color: string }[] = [
    { key: 'elementary', label: { ko: '초등 추천', en: 'For Elementary' }, color: 'bg-point' },
    { key: 'middle', label: { ko: '중등 추천', en: 'For Middle School' }, color: 'bg-[#e8a030]' },
    { key: 'high', label: { ko: '고등 추천', en: 'For High School' }, color: 'bg-[#e05050]' },
  ];

  // 교육 추천 정리표 extras (상세 페이지 없는 프로그램)
  const extraRecs: Record<'elementary' | 'middle' | 'high', { title: Bi; club?: boolean; multi?: boolean }[]> = {
    elementary: [],
    middle: [
      {
        title: { ko: '파이썬으로 게임 만들기', en: 'Make Games with Python' },
        club: true,
        multi: true,
      },
    ],
    high: [
      {
        title: { ko: '스마트 모빌리티 프로젝트(소장)', en: 'Smart Mobility Project (Director-led)' },
      },
      {
        title: { ko: '파이썬으로 게임 만들기', en: 'Make Games with Python' },
        club: true,
        multi: true,
      },
    ],
  };

  // PC 미사용 추가
  const pcFreeExtras: Record<'elementary' | 'middle' | 'high', { title: Bi; club?: boolean; multi?: boolean }[]> = {
    elementary: [{ title: { ko: '소리 감지 자동차 만들기', en: 'Build a Sound-sensing Car' } }],
    middle: [],
    high: [],
  };

  const pcFreeSlugs = [
    'autonomous-driving',
    'drone-expert',
    'youtube-creator',
    '3d-pen-designer',
    '3d-pen-led-interior',
    'ir-sensor-dog-car',
    'snail-robot',
    'bluetooth-speaker',
    'light-sensor-street-lamp',
    'night-view-designer',
    'led-mood-light',
    'renewable-energy',
  ];
  const pcFreePrograms = programs.filter((p) => pcFreeSlugs.includes(p.slug));

  // 교육 신청 방법 4단계
  const applySteps: { img: string; label: Bi; step: string }[] = [
    { img: '/images/sub/howImg01_01.png', label: { ko: '교육 문의', en: 'Inquiry' }, step: '01' },
    { img: '/images/sub/howImg01_02.png', label: { ko: '교육 확정', en: 'Confirmation' }, step: '02' },
    { img: '/images/sub/howImg01_04.png', label: { ko: '서류 송부', en: 'Documents Sent' }, step: '03' },
    { img: '/images/sub/howImg01_03.png', label: { ko: '교육 진행', en: 'Class Runs' }, step: '04' },
  ];

  return (
    <>
      {/* JSON-LD */}
      <CourseJsonLd program={program} locale={locale} />
      <FAQJsonLd faqs={faqsForJsonLd} />
      <ReviewsJsonLd itemName={title} reviews={reviewsForJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '찾아가는 체험교실' : 'On-site Experience Classes', href: `/${locale}/programs` },
          { name: title, href: `/${locale}/programs/${slug}` },
        ]}
      />

      {/* 상단 배너 + 제목 오버레이 */}
      <section className="relative w-full">
        <Image
          src="/images/sub/subTop.png"
          alt={isKo ? '찾아가는 체험교실' : 'On-site Experience Classes'}
          width={1920}
          height={385}
          className="w-full h-auto"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="inline-block bg-point text-white text-[11px] md:text-[14px] font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-2 md:mb-3">
            {categoryLabel}
          </span>
          <h1 className="text-[18px] md:text-[28px] lg:text-[36px] font-bold text-gray-900 leading-tight drop-shadow-sm">
            {title}
          </h1>
          <p className="text-[11px] md:text-[14px] lg:text-[16px] text-gray-700 mt-1 md:mt-2">{altTitle}</p>
        </div>
      </section>

      {/* 추천드립니다 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '추천드립니다' : 'Recommended For'}
          </h2>
          <ul className="space-y-4 max-w-[800px] mx-auto">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-center justify-center gap-3">
                <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${rec.highlight ? 'bg-point' : 'bg-gray-400'}`} />
                <span
                  className={`text-[15px] md:text-[17px] ${rec.highlight ? 'text-point font-bold' : 'text-gray-700'}`}
                >
                  {pick(rec.text, isKo)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 교육소개 (table) */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '교육소개' : 'Program Overview'}
          </h2>
          <div className="overflow-x-auto max-w-[800px] mx-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '과정' : 'Course'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">{title}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '난도' : 'Difficulty'}
                  </th>
                  <td className="px-5 py-3.5">
                    <Image
                      src="/images/sub/star3.png"
                      alt={isKo ? '난이도' : 'Difficulty'}
                      width={80}
                      height={16}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '추천' : 'Target'}
                  </th>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-5">
                      {[
                        { has: hasElementary, labelKo: '초등', labelEn: 'Elementary' },
                        { has: hasMiddle, labelKo: '중등', labelEn: 'Middle' },
                        { has: hasHigh, labelKo: '고등', labelEn: 'High' },
                      ].map((t, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-[14px] text-gray-700">
                          <Image
                            src={t.has ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                            alt={t.has ? (isKo ? '선택' : 'checked') : (isKo ? '미선택' : 'unchecked')}
                            width={20}
                            height={20}
                          />
                          {isKo ? t.labelKo : t.labelEn}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '시간' : 'Duration'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {isKo
                      ? program.duration
                      : program.duration === '2~3교시 (1교시 40~50분)'
                        ? '2–3 periods (40–50 min per period)'
                        : program.duration}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '인원' : 'Capacity'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {isKo ? '최소 인원 20명' : 'Minimum 20 participants'}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '비용' : 'Fee'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {isKo ? program.price : program.priceEn}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    {isKo ? '장소' : 'Venue'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {isKo
                      ? '시청각 시설, 1인 1PC, 인터넷/WI-FI 환경'
                      : 'AV facility, 1 PC per participant, Internet / Wi-Fi'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300 align-top">
                    {isKo ? '수업목표' : 'Objective'}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700 leading-relaxed">{description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 학습 단계 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-10 text-center">
            {isKo ? '학습 단계' : 'Learning Stages'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {[
              { items: introItems, labelKo: '도입', labelEn: 'Intro', color: 'bg-point', dot: 'bg-point' },
              { items: devItems, labelKo: '전개', labelEn: 'Develop', color: 'bg-[#e8a030]', dot: 'bg-[#e8a030]' },
              { items: wrapItems, labelKo: '마무리', labelEn: 'Wrap-up', color: 'bg-[#e05050]', dot: 'bg-[#e05050]' },
            ].map((stage, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
                <div className="flex items-center gap-2 mb-5">
                  <span className={`${stage.color} text-white text-[12px] font-bold px-3 py-1 rounded-full`}>
                    STEP {i + 1}
                  </span>
                  <h3 className="font-bold text-[16px] text-gray-900">
                    {isKo ? stage.labelKo : stage.labelEn}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {stage.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-700 leading-relaxed">
                      <span className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full ${stage.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {i < 2 && (
                  <div className="md:hidden flex justify-center mt-4">
                    <span className={`${stage.dot === 'bg-point' ? 'text-point' : stage.dot === 'bg-[#e8a030]' ? 'text-[#e8a030]' : 'text-[#e05050]'} text-2xl font-bold`}>
                      &#8595;
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육사진 */}
      {displayImages.length > 0 && (
        <section className="py-14 px-4 bg-white">
          <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
              {isKo ? '교육사진' : 'Class Photos'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              {displayImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={isKo ? `${title} 교육사진 ${idx + 1}` : `${title} class photo ${idx + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 인재 양성 */}
      <section className="py-16 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <p className="text-[14px] text-gray-500 mb-2">
            {isKo
              ? '4차산업혁명 기술교육, 어떻게 시작하는게 좋을까?'
              : 'Where should 4th Industrial Revolution tech education begin?'}
          </p>
          <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-10">
            {isKo ? (
              <>
                인재 양성을 위한 필수 학습 <span className="text-point">한양미래연구소</span> 대표 교육으로 시작하세요!
              </>
            ) : (
              <>
                Start with <span className="text-point">Hanyang Future Lab</span>&apos;s flagship programs — essential learning for talent development!
              </>
            )}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10 max-w-[900px] mx-auto">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex justify-center items-end">
                <div className="relative w-full max-w-[120px] aspect-square">
                  <Image
                    src={`/images/sub/talent_icon01_0${n}.png`}
                    alt={isKo ? `인재 양성 아이콘 ${n}` : `Talent development icon ${n}`}
                    fill
                    sizes="120px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-point text-white font-bold px-10 py-3 rounded-full text-[16px] hover:opacity-90 transition-opacity"
          >
            {isKo ? '신청하기' : 'Apply'}
          </Link>
        </div>
      </section>

      {/* 고객 만족도 & 리뷰 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[900px] flex flex-col items-center gap-8">
          <Image
            src="/images/sub/true_review01_03.png"
            alt={isKo ? '탄탄한 커리큘럼과 맞춤 전문 케어로 고객 만족도 UP!' : 'Solid curriculum and personalized care — customer satisfaction UP!'}
            width={684}
            height={395}
            sizes="(max-width: 900px) 100vw, 900px"
            className="w-full h-auto"
          />
          <div className="w-full max-w-[700px] py-6">
            <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 text-center mb-2">
              {isKo ? '한양미래연구소 교육 만족도 설문조사' : 'Hanyang Future Lab Satisfaction Survey'}
            </h3>
            <p className="text-[13px] md:text-[14px] text-gray-500 text-center mb-8">
              {isKo ? '설문 대상: 이용 고객 총 100명' : 'Respondents: 100 customers'}
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-10">
              {[
                { labelKo: '선생님 만족도', labelEn: 'Teacher Satisfaction', pct: 97, gradient: '0% 97%, #d6e6e1 97% 100%' },
                { labelKo: '학생 만족도', labelEn: 'Student Satisfaction', pct: 98, gradient: '0% 98%, #d6e6e1 98% 100%' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full flex items-center justify-center"
                    style={{ background: `conic-gradient(#336666 ${s.gradient})` }}
                    role="img"
                    aria-label={`${isKo ? s.labelKo : s.labelEn} ${s.pct}%`}
                  >
                    <div className="absolute inset-[14px] bg-white rounded-full flex flex-col items-center justify-center">
                      <span className="text-[12px] md:text-[13px] text-gray-600">
                        {isKo ? s.labelKo : s.labelEn}
                      </span>
                      <span className="text-[28px] md:text-[34px] font-extrabold text-point leading-none mt-1">
                        {s.pct}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 솔직 리뷰 */}
          <div className="w-full py-6">
            <div className="text-center mb-8">
              <p className="text-[11px] tracking-[0.3em] font-semibold text-gray-500 mb-1">HONEST REVIEW</p>
              <h3 className="text-[22px] md:text-[28px] font-bold text-gray-900">
                {isKo ? '솔직 리뷰' : 'Honest Reviews'}
              </h3>
            </div>
            <div className="space-y-5 max-w-[720px] mx-auto">
              {siteReviews.map((r, i) => {
                const authorText = pick(r.author, isKo);
                return (
                  <article
                    key={i}
                    className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 shadow-sm p-5 md:p-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#f9d7c4] to-[#f2b08b] flex items-center justify-center text-white font-bold text-[20px]">
                      {authorText.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[14px] font-bold text-gray-900">{authorText}</span>
                        <span className="ml-auto text-[#f5b800] text-[13px]" aria-label={isKo ? `별점 ${r.rating}점` : `${r.rating}-star rating`}>
                          {'★'.repeat(r.rating)}
                        </span>
                      </div>
                      <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                        {pick(r.content, isKo)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 배경 (questions) */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium text-gray-800 leading-relaxed">
            {isKo
              ? '빠르게 변해가는 시대, 우리 아이 교육은 어떻게 준비해야 하나요?'
              : 'In this fast-changing era, how should we prepare our children\'s education?'}
          </p>
          <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium text-gray-800 leading-relaxed mt-1">
            {isKo
              ? '과학 기술을 재미있게 경험하려면 어떻게 교육해야 할까요?'
              : 'How can we teach science and technology in a fun, hands-on way?'}
          </p>
        </div>
      </section>

      {/* 강력 추천 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-10 text-center">
            {isKo
              ? '한양미래연구소 이런 분들께 강력 추천드립니다'
              : 'Hanyang Future Lab is a strong fit for these people'}
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex flex-col items-center flex-shrink-0 w-full sm:w-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-12 h-12 md:w-14 md:h-14 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
                </svg>
              </div>
              <p className="text-[13px] md:text-[14px] font-semibold text-gray-700 mt-2 text-center whitespace-nowrap">
                {isKo ? '학교 및 기관 선생님' : 'School & Institution Teachers'}
              </p>
            </div>

            <div className="flex-1 w-full space-y-3">
              {(isKo
                ? [
                    '4차산업 기술 체험교육을 계획 중인데...',
                    '지역사회와 연계한 체험교육은 없을까?',
                    '청소년동아리 활동은 뭘 해야 하지?',
                    '여러 가지 교육을 동시에 진행하고 싶어',
                    '이런 교육 어디 없을까?',
                  ]
                : [
                    'We\'re planning a 4th-IR hands-on class...',
                    'Are there experience programs tied to the local community?',
                    'What should we do for youth-club activities?',
                    'We want to run several programs at once',
                    'Where can we find classes like this?',
                  ]
              ).map((q, i) => (
                <div key={i} className="flex">
                  <p className="inline-block max-w-[85%] bg-gray-100 text-gray-800 text-[14px] md:text-[15px] px-5 py-3 rounded-2xl rounded-tl-sm">
                    {q}
                  </p>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <p className="inline-block bg-primary text-white font-bold text-[15px] md:text-[17px] px-6 py-3.5 rounded-2xl rounded-tr-sm shadow-sm">
                  {isKo ? '모두 한양미래연구소에 있습니다!' : 'All of it is at Hanyang Future Lab!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4차산업기술교육 특징 */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-bold text-center text-gray-900 mb-8">
            {isKo ? (
              <>
                4차산업기술교육 답은 <span className="text-point">한양미래연구소</span>에 있습니다
              </>
            ) : (
              <>
                The answer to 4th-IR tech education is at <span className="text-point">Hanyang Future Lab</span>
              </>
            )}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-[30px]">
            {features.map((feature) => (
              <div
                key={feature.image}
                className="relative w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-md overflow-hidden"
                style={{
                  backgroundImage: `url(${withBasePath('/images/main/feature-bg.png')})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%',
                }}
              >
                <div className="relative w-full flex-1 flex items-center justify-center px-2">
                  <Image
                    src={feature.image}
                    alt={pick(feature.title, isKo)}
                    width={200}
                    height={130}
                    className="w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-bold text-gray-900 text-center leading-tight">
                  {pick(feature.title, isKo)}
                </h3>
                <p className="text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-medium text-gray-600 text-center leading-snug">
                  {pick(feature.description, isKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연령별 추천 교육 */}
      <AgeRecommendation />

      {/* 교육 추천 정리표 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '교육 추천 정리표' : 'Program Recommendation Summary'}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-[12px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-point/10 text-point font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-point" />
              {isKo ? '동아리 가능' : 'Club-ready'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8a030]/10 text-[#b87616] font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e8a030]" />
              {isKo ? '다회기 추천' : 'Multi-session'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recColumns.map((col) => (
              <div key={col.key} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${col.color} text-white font-bold text-center py-3 text-[16px]`}>
                  {pick(col.label, isKo)}
                </div>
                <ul className="p-5 space-y-3">
                  {programs
                    .filter((p) => p.target.includes(col.key))
                    .map((p) => (
                      <li key={p.slug} className="flex items-start gap-2 text-[13px] leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400" />
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <Link
                            href={`/${locale}/programs/${p.slug}`}
                            className="text-gray-700 hover:text-point transition-colors"
                          >
                            {isKo ? p.title : p.titleEn}
                          </Link>
                          {p.clubAvailable && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-point/10 text-point">
                              {isKo ? '동아리' : 'Club'}
                            </span>
                          )}
                          {p.multiSession && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#e8a030]/10 text-[#b87616]">
                              {isKo ? '다회기' : 'Multi'}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  {extraRecs[col.key].map((e) => (
                    <li key={e.title.ko} className="flex items-start gap-2 text-[13px] leading-relaxed">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400" />
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-gray-700">{pick(e.title, isKo)}</span>
                        {e.club && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-point/10 text-point">
                            {isKo ? '동아리' : 'Club'}
                          </span>
                        )}
                        {e.multi && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#e8a030]/10 text-[#b87616]">
                            {isKo ? '다회기' : 'Multi'}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PC 미사용 교육 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-3 text-center">
            {isKo ? 'PC 미사용 교육' : 'PC-free Programs'}
          </h2>
          <p className="text-[14px] text-gray-600 mb-8 text-center">
            {isKo
              ? 'PC가 없는 환경에서도 진행 가능한 교육 프로그램입니다'
              : 'Programs that can run without PCs'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recColumns.map((col) => (
              <div key={col.key} className="bg-[#f9f9f9] rounded-xl border border-gray-100 overflow-hidden">
                <div className={`${col.color} text-white font-bold text-center py-3 text-[16px]`}>
                  {pick(col.label, isKo)}
                </div>
                <ul className="p-5 space-y-3">
                  {pcFreePrograms
                    .filter((p) => p.target.includes(col.key))
                    .map((p) => (
                      <li key={p.slug} className="flex items-start gap-2 text-[13px] leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400" />
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <Link
                            href={`/${locale}/programs/${p.slug}`}
                            className="text-gray-700 hover:text-point transition-colors"
                          >
                            {isKo ? p.title : p.titleEn}
                          </Link>
                          {p.clubAvailable && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-point/10 text-point">
                              {isKo ? '동아리' : 'Club'}
                            </span>
                          )}
                          {p.multiSession && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#e8a030]/10 text-[#b87616]">
                              {isKo ? '다회기' : 'Multi'}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  {pcFreeExtras[col.key].map((e) => (
                    <li key={e.title.ko} className="flex items-start gap-2 text-[13px] leading-relaxed">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400" />
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-gray-700">{pick(e.title, isKo)}</span>
                        {e.club && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-point/10 text-point">
                            {isKo ? '동아리' : 'Club'}
                          </span>
                        )}
                        {e.multi && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#e8a030]/10 text-[#b87616]">
                            {isKo ? '다회기' : 'Multi'}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#8fc85e] to-[#f2c94c] text-white font-bold text-[18px] shadow-sm">
              Q<span className="text-[14px] ml-0.5">A</span>
            </span>
            <div className="text-left">
              <p className="text-[11px] tracking-[0.3em] font-semibold text-gray-500">FAQ</p>
              <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">
                {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {siteFaqs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-r from-[#eaf5df] to-[#f2f9ea] p-5 md:p-6 shadow-sm"
              >
                <div className="flex items-start gap-3 bg-white rounded-full px-5 py-3 shadow-sm mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8fc85e] text-white font-bold text-[13px] flex items-center justify-center">
                    Q
                  </span>
                  <p
                    className="text-[14px] md:text-[15px] font-semibold text-gray-800 leading-snug pt-0.5"
                    dangerouslySetInnerHTML={{ __html: pick(item.questionHtml, isKo) }}
                  />
                </div>
                <div className="flex items-start gap-3 pl-2 md:pl-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-white font-bold text-[13px] flex items-center justify-center">
                    A
                  </span>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed pt-0.5">
                    {pick(item.answer, isKo)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 필독사항 & 취소·변경 규정 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_01.png"
                alt={isKo ? '필독사항' : 'Important Notes'}
                width={40}
                height={40}
              />
              <h3 className="text-[17px] font-bold text-gray-900">
                {isKo ? '필독사항' : 'Important Notes'}
              </h3>
            </div>
            <ul className="space-y-3 text-[13px] text-gray-700">
              {importantNotices.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                  {pick(note, isKo)}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_02.png"
                alt={isKo ? '취소·변경 규정' : 'Cancellation & Change Policy'}
                width={40}
                height={40}
              />
              <h3 className="text-[17px] font-bold text-gray-900">
                {isKo ? '취소·변경 규정' : 'Cancellation & Change Policy'}
              </h3>
            </div>
            {policy && (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#eee]">
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">
                        {isKo ? '시기' : 'Timing'}
                      </th>
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">
                        {isKo ? '취소' : 'Cancellation'}
                      </th>
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">
                        {isKo ? '변경' : 'Change'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {policy.rules.map((rule, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">
                          {isKo ? rule.timing : rule.timingEn}
                        </td>
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">
                          {isKo ? rule.cancellation : rule.cancellationEn}
                        </td>
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">
                          {isKo ? rule.changes : rule.changesEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 교육 신청 방법 */}
      <section className="py-16 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/images/sub/how01_01.png"
              alt={isKo ? '교육 신청 방법' : 'How to Apply'}
              width={40}
              height={40}
            />
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900">
              {isKo ? '교육 신청 방법' : 'How to Apply'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto">
            {applySteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3">
                  <Image src={item.img} alt={pick(item.label, isKo)} fill className="object-contain" />
                </div>
                <span className="text-[11px] text-point font-bold mb-1">STEP {item.step}</span>
                <span className="text-[14px] font-semibold text-gray-800">{pick(item.label, isKo)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 문의하기 (reuse) */}
      <ContactSection />

      {/* 오시는 길 (reuse) */}
      <MapSection />
    </>
  );
}
