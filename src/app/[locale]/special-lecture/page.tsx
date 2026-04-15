import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '전문인 특강 | 4차산업혁명·기업가정신·스타트업 특강'
      : 'Specialist Lectures | 4th Industrial Revolution · Entrepreneurship · Startup',
    description: isKo
      ? '한양미래연구소 전문인 특강: 4차산업혁명과 청소년 기업가정신 특강, 스타트업 CEO가 들려주는 창업 이야기. 60~120분 강연 프로그램.'
      : 'Hanyang Future Lab specialist lectures: 4th Industrial Revolution & Youth Entrepreneurship lecture, and Startup CEO Stories. 60–120 minute lecture programs.',
    keywords: isKo
      ? ['전문인 특강', '기업가정신 특강', '4차산업혁명 특강', '스타트업 특강', '청소년 특강']
      : ['specialist lecture', 'entrepreneurship lecture', '4th industrial revolution lecture', 'startup lecture', 'youth lecture'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

// 4차산업혁명 특강 features
const features4th: { src: string; title: Bi; desc: Bi }[] = [
  {
    src: '/images/sub/edu04_7.jpg',
    title: { ko: '맞춤화 된 연계 교육', en: 'Customized Linked Education' },
    desc: {
      ko: '학생, 학부모, 교사가 동일한 교육 이슈에 대해 각 대상에 따라 맞춤화된 연계 교육에 참여',
      en: 'Students, parents, and teachers engage with the same topic through audience-specific, linked sessions.',
    },
  },
  {
    src: '/images/sub/edu04_8.jpg',
    title: { ko: '통합적 교육', en: 'Integrated Education' },
    desc: {
      ko: '진로 · 학습 · 인성 영역에 대한 개별적 진행을 넘어서는 통합적 접근과 전략',
      en: 'An integrated approach and strategy that goes beyond treating career, learning, and character domains separately.',
    },
  },
  {
    src: '/images/sub/edu04_9.jpg',
    title: { ko: '교육 대상 맞춤형 교육', en: 'Audience-tailored Education' },
    desc: {
      ko: '교육 대상에 따라 특강, 워크샵, 연수, 멘토링 등 다양한 방식의 접근으로 교육효과 증대',
      en: 'Lectures, workshops, training, and mentoring are matched to the audience to maximize educational impact.',
    },
  },
  {
    src: '/images/sub/edu04_10.jpg',
    title: { ko: '지역 프로젝트 활성화', en: 'Regional Project Activation' },
    desc: {
      ko: '관내 학교가 원하는 프로그램 지원으로 학교 – 지자체 · 교육청 연계 프로젝트의 활성화',
      en: 'Supporting the programs local schools want — activating school–government–education-office collaborations.',
    },
  },
];

const reviews4th: { name: Bi; date: Bi; review: Bi }[] = [
  {
    name: { ko: '경기도 모 고등학교\n○○○ 학생', en: 'A Gyeonggi high school student' },
    date: { ko: '6월 4일', en: 'June 4' },
    review: {
      ko: '학교에서 이런 4차산업혁명 수업을 받을 수 있어서 좋았다. 평소에 4차산업혁명에 대해서 많이 들어 보긴 했지만, 구체적으로 어떤 것인지 알지 못했는데 이번 수업을 통해서 4차산업혁명에 대한 핵심 기술에 대해 알 수 있었다. 가장 기억에 남는 내용은 인공지능으로 인해 많은 직업들이 사라지고 생겨난다는 것이다. 나도 인공지능에 뒤쳐지지 않을 수 있는 직업을 찾아야겠다.',
      en: 'I\'m glad we could take a class on the 4th Industrial Revolution at school. I\'d heard the phrase a lot but never understood it concretely — the class taught me the core technologies behind it. The most memorable point was how AI will both destroy and create many jobs. I need to find a career that can keep up with AI.',
    },
  },
  {
    name: { ko: '서울 모 중학교\n교사 ○○○', en: 'A Seoul middle school teacher' },
    date: { ko: '7월 21일', en: 'July 21' },
    review: {
      ko: '4차산업혁명이라는 단어는 많이 들어봤지만, 학생들에게 설명해줄만큼 자세히 알지는 못했어요. 이번 기회로 4차산업혁명 전문 강사님께 수업을 들으면서 4차산업혁명에 대해 자세히 알 수 있었고, 학생들에게 어떻게 설명해줘야 할지도 감이 오더라고요. 요즘 하도 메이커 교육 말은 많이 나오는데, 아이들에게 어떻게 하면 동기부여를 해줄 수 있는지 알게 되는 시간이었습니다. 감사합니다~',
      en: 'I\'d heard the term "4th Industrial Revolution" many times, but I didn\'t know it well enough to explain it to students. This class with a specialist instructor helped me understand it in detail and gave me a feel for how to explain it to students. Maker education gets talked about a lot lately — this session helped me see how to motivate kids for it. Thank you!',
    },
  },
];

// CEO 창업 특강 programs
const ceoPrograms: { src: string; title: Bi; desc: Bi }[] = [
  {
    src: '/images/sub/program_figure_1_ceo_story.png',
    title: { ko: 'CEO 창업 스토리', en: 'CEO Startup Story' },
    desc: {
      ko: '기업가정신의 5대요소인 혁신성, 위험 감수성, 성취욕구, 자율성, 진취성) 확립시키고 함양을 증가시키는 청소년 창업 교육',
      en: 'Youth entrepreneurship education that builds the five core entrepreneurial traits — innovation, risk-taking, achievement motivation, autonomy, and proactiveness.',
    },
  },
  {
    src: '/images/sub/program_figure_2_startup_market.png',
    title: {
      ko: '\u201c국내·외 창업 시장을 노려라\u201d',
      en: '"Target Domestic & Global Startup Markets"',
    },
    desc: {
      ko: '현재 국내외 스타트업시장에 대한 인사이트를 제시하고 산업동향을 간접적으로 체험할 수 있습니다.',
      en: 'Presents insights into current domestic and global startup markets and lets students indirectly experience industry trends.',
    },
  },
  {
    src: '/images/sub/program_figure_3_talk_show.png',
    title: { ko: '생생 토크쇼', en: 'Live Talk Show' },
    desc: {
      ko: '청소년 창업과 관련한 노하우전수, 창업에 대해 궁금했던 점 등을 QnA합니다.',
      en: 'A Q&A session sharing know-how and answering questions about youth entrepreneurship.',
    },
  },
];

const ceoFeatures: { src: string; title: Bi; desc: Bi }[] = [
  {
    src: '/images/sub/education_feature_2_leading_awareness.jpg',
    title: { ko: '삶을 향한 주도적 인식 확립', en: 'Building a Proactive Life Mindset' },
    desc: {
      ko: '자기 스스로 진로를 개척하고 주도적인 삶을 살아가는 데에 매우 긍정적인 인식변화',
      en: 'A highly positive shift in awareness — carving one\'s own career path and living proactively.',
    },
  },
  {
    src: '/images/sub/education_feature_3_entreprenuer_spirit.jpg',
    title: { ko: '기업가정신 확립', en: 'Entrepreneurial Spirit' },
    desc: {
      ko: '기업가정신의 5대요소(혁신성, 위험감수성, 성취욕구, 자율성, 진취성)확립 및 함양정도 증가',
      en: 'Builds and strengthens the five entrepreneurial traits (innovation, risk-taking, achievement motivation, autonomy, proactiveness).',
    },
  },
];

const reviewsCeo: { name: Bi; date: Bi; review: Bi }[] = [
  {
    name: {
      ko: 'OO여자고등학교 2학년\n민OO학생',
      en: 'Girls\' high school, 2nd year\n(Min)',
    },
    date: { ko: '11월 9일', en: 'November 9' },
    review: {
      ko: "책으로만 듣고 멀게만 느껴졌던 창업이 직접 몸으로 경험하고 깨우친 CEO님의 강연을 듣고 나니 다양한 진로를 선택 할 수 있다는걸 알면서 동시에 그 다양한 직업중 하나인 창업에 대한 개념이 쏙쏙 들어왔어요. 기업의 대표나 회장은 다 할아버지인줄 알았는데 실제로 사업을 하고 있는 대표님이 우리와 별로 나이 차이가 안나는 20,30대 라는걸 보고 들으니 왠지 '나도 해볼 수 있겠다!'라는 생각이 든 것 같아요. 창업에 대한 관심이 더 많아졌어요. 학교 수업에서 배울 수 없는 부분에 대해서 강연으로 들을 수 있어서 좋은 기회였던 것 같아요 ㅎㅎ",
      en: 'Entrepreneurship used to feel distant and textbook-only, but after hearing the CEO speak from their own experience, I realized starting a business is one of many career options — and the concept clicked. I assumed company founders were all old, so seeing a real CEO in their 20s/30s made me think "maybe I could do this too!" My interest in entrepreneurship grew a lot. It was a great opportunity to learn things we can\'t get from regular school classes!',
    },
  },
  {
    name: {
      ko: '00고등학교 1학년\n000 학생',
      en: 'High school, 1st year',
    },
    date: { ko: '9월 28일', en: 'September 28' },
    review: {
      ko: '솔직히 창업에 대해서 별 관심이 없었는데 이번 특강을 들으면서 좀 생각이 바뀌었어요. 여태까지는 그냥 회사에 취직해야겠다라는 생각만 했는데 창업을 해서 기업을 꾸려나갈 수도 있구나, 생각했어요. 진짜 CEO가 말해준다는게 제일 좋았던 것 같아요. 앞으로 이런 기회가 많았으면 좋겠어요!',
      en: 'Honestly I wasn\'t interested in entrepreneurship, but this lecture changed my thinking a bit. Until now I only thought about getting a job at a company, but I now realize I could start my own and run it. The best part was hearing it from a real CEO. I hope there are more opportunities like this!',
    },
  },
  {
    name: {
      ko: '서울 모 고등학교\n000 학생',
      en: 'A Seoul high school student',
    },
    date: { ko: '4월 31일', en: 'April 31' },
    review: {
      ko: '제가 알고 있던 창업은 빵 구워서 팔고 그런 것처럼 단순하게 사고 파는 것 밖에 없었는데 이번 특강을 들으면서 생각이 진짜 많이 바뀌었어요. 제가 너무 1차원적인 것만 생각하고 있더라고요. 이번 기회로 진짜 생각이 많이 바뀐 것 같아요. 이런 교육을 들을 수 있어서 너무 좋습니다. 여름에 있는 창업 페스티벌에 참가하는 것을 목표로 열심히 아이디어 구상해 볼 게요!!',
      en: 'My idea of entrepreneurship used to be simple things like baking bread and selling it, but this lecture really changed my perspective. I realized my thinking was very one-dimensional. I\'m really grateful to have learned this. I\'ll aim to join the summer startup festival and work hard on my ideas!',
    },
  },
];

const noticesKo = [
  { main: '체험 신청 마감은 해당 수업 일자 1주일 전 오후 2시입니다.', sub: '※ 정원이 찼을 경우, 일찍 마감될 수 있습니다.' },
  { main: '본 프로그램은 최소 인원 20명을 기준으로 진행됩니다.', sub: '※ 프로그램 진행 인원이 20명 이하일 경우, 추가 요금이 발생할 수 있습니다.' },
  { main: '프로그램 안내 문자(수업 일시, 주소)는 프로그램 기준 1-2일 전 오후 6시까지 체험 교육 담당자에게 발송됩니다.', sub: '' },
  { main: '수업 10분전까지 입장 부탁드리며, 늦을 경우 일부 프로그램 체험이 제한될 수 있습니다.', sub: '' },
  { main: '체험 교육 당일, 사전 연락 없이 지각 및 불참하실 경우, 당일 불참으로 처리되며 취소/보충/환불이 불가합니다.', sub: '' },
  { main: '문의 : 070-8064-0829', sub: '' },
];

const noticesEn = [
  { main: 'Applications close at 2 p.m. one week before the class date.', sub: '※ May close earlier if full.' },
  { main: 'Programs run based on a minimum of 20 participants.', sub: '※ Additional fees may apply if fewer than 20 participants.' },
  { main: 'A program guide SMS (date/time, address) is sent to the program coordinator by 6 p.m. 1–2 days before the program.', sub: '' },
  { main: 'Please arrive 10 minutes before class — late arrivals may miss parts of the program.', sub: '' },
  { main: 'No-shows or late arrivals without prior notice are treated as absent — no cancellation, make-up, or refund.', sub: '' },
  { main: 'Inquiries: +82-70-8064-0829', sub: '' },
];

export default async function SpecialLecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const applyBtn = isKo ? '교육 신청하기' : 'Apply';

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '전문인 특강' : 'Specialist Lectures', href: `/${locale}/special-lecture` },
        ]}
      />

      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[380px] bg-[url('/images/sub/subTop03.png')] bg-cover bg-center border-b border-gray-200">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4 h-full flex items-center">
          <div>
            <span className="text-[15px] font-bold text-gray-400 tracking-tight">
              Specialist Lecture
            </span>
            <h1 className="mt-2 mb-4 text-[32px] md:text-[45px] font-bold text-gray-900 tracking-tight leading-tight relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[35px] after:h-[3px] after:bg-gray-300">
              {isKo ? '전문인 특강' : 'Specialist Lectures'}
            </h1>
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed mt-4">
              {isKo ? (
                <>
                  지역별 학교, 청소년 수련관, 청소년문화의집, 도서관 등의 교육기관에서 진행되는
                  <br className="hidden md:block" />
                  각 분야의 전문가가 진행하는 전문인 특강
                </>
              ) : (
                <>
                  Specialist lectures delivered by domain experts at schools, youth training centers,
                  <br className="hidden md:block" />
                  youth culture centers, and libraries across regions.
                </>
              )}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block mt-6 px-6 py-2.5 bg-[#336666] text-white text-[14px] font-semibold rounded hover:bg-[#2a5454] transition-colors"
            >
              {applyBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <a
              href="#lecture-4th"
              className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-[360/205]">
                <Image
                  src="/images/sub/introduce_4_4th_industrial_lecture.jpg"
                  alt={isKo ? '4차산업혁명과 청소년 기업가 정신 특강' : '4th Industrial Revolution & Youth Entrepreneurship Lecture'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 min-h-[220px]">
                <dl>
                  <dt className="text-[14px] font-bold text-gray-900 leading-snug">
                    <span className="inline-block text-[12px] font-semibold text-[#336666] mb-1">
                      {isKo ? '메이커 융합 교육' : 'Maker Convergence'}
                    </span>
                    <br />
                    {isKo ? '4차산업혁명과 청소년 기업가 정신 특강' : '4th Industrial Revolution & Youth Entrepreneurship'}
                  </dt>
                  <dd className="mt-2 text-[13px] text-gray-500">
                    {isKo
                      ? '4차산업혁명전문가의 4차산업혁명 완전 정복'
                      : 'Master the 4th Industrial Revolution with an expert'}
                  </dd>
                </dl>
                <ul className="mt-4 space-y-1 text-[13px] text-gray-600">
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    {isKo ? '대상: 초등/중등/고등/성인' : 'Target: Elementary / Middle / High / Adult'}
                  </li>
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    {isKo ? '기간: 60-100분' : 'Duration: 60–100 min'}
                  </li>
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    <span className="font-semibold text-[#336666]">
                      {isKo ? '교육비용: 1인 22,000원' : 'Fee: KRW 22,000 / person'}
                    </span>
                  </li>
                </ul>
              </div>
            </a>

            {/* Card 2 */}
            <a
              href="#lecture-ceo"
              className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-[360/205]">
                <Image
                  src="/images/sub/introduce_8_ceo_lecture.jpg"
                  alt={isKo ? '스타트업 CEO가 들려주는 나의 창업 이야기' : 'My Startup Story from a Real CEO'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 min-h-[220px]">
                <dl>
                  <dt className="text-[14px] font-bold text-gray-900 leading-snug">
                    <span className="inline-block text-[12px] font-semibold text-[#336666] mb-1">
                      {isKo ? '창업 교육' : 'Entrepreneurship'}
                    </span>
                    <br />
                    {isKo ? '스타트업 CEO가 들려주는 나의 창업 이야기' : 'My Startup Story from a Real CEO'}
                  </dt>
                  <dd className="mt-2 text-[13px] text-gray-500">
                    {isKo
                      ? '청년 창업 CEO가 진행하는 창업 특강'
                      : 'A startup lecture led by a young CEO'}
                  </dd>
                </dl>
                <ul className="mt-4 space-y-1 text-[13px] text-gray-600">
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    {isKo ? '대상: 중등/고등' : 'Target: Middle / High'}
                  </li>
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    {isKo ? '기간: 100-120분' : 'Duration: 100–120 min'}
                  </li>
                  <li className="relative pl-3 before:content-['·'] before:absolute before:left-0">
                    <span className="font-semibold text-[#336666]">
                      {isKo ? '교육비용: 별도 문의' : 'Fee: Contact for quote'}
                    </span>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== 4차산업혁명 특강 ===== */}
      <section id="lecture-4th" className="scroll-mt-20">
        <div className="relative w-full h-[320px] md:h-[380px] bg-[url('/images/sub/subTop03.png')] bg-cover bg-center border-b border-gray-200">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4 h-full flex items-center">
            <div>
              <span className="text-[15px] font-bold text-gray-400 tracking-tight">
                Special Lecture on the 4th Industrial Revolution
              </span>
              <h2 className="mt-2 mb-4 text-[32px] md:text-[45px] font-bold text-gray-900 tracking-tight leading-tight relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[35px] after:h-[3px] after:bg-gray-300">
                {isKo ? '4차 산업혁명 특강' : '4th Industrial Revolution Lecture'}
              </h2>
              <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed mt-4">
                {isKo ? (
                  <>
                    각 지역별 청소년 수련관, 학교, 문화센터 등의 교육 기관에서 진행되는
                    <br />
                    4차산업혁명 전문가의 4차산업혁명 완전 정복 특강
                  </>
                ) : (
                  <>
                    A master-the-4th-IR lecture by a specialist,
                    <br />
                    delivered at youth centers, schools, and culture centers.
                  </>
                )}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block mt-6 px-6 py-2.5 bg-[#336666] text-white text-[14px] font-semibold rounded hover:bg-[#2a5454] transition-colors"
              >
                {applyBtn}
              </Link>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
            <h3 className="text-[20px] font-bold text-[#336666] mb-8">
              {isKo ? '교육 소개' : 'About the Lecture'}
            </h3>
            <div className="text-center max-w-[900px] mx-auto mb-16">
              <p className="text-[28px] md:text-[36px] font-bold text-gray-900 tracking-tight mb-6">
                <strong>{isKo ? '4차 산업혁명 특강' : 'The 4th Industrial Revolution Lecture'}</strong>
                {isKo ? '은' : ''}
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {isKo ? (
                  <>
                    4차 산업혁명의 시대를 주도하는 융합형 창의인재 양성을 위한 특강입니다.
                    <br />
                    전문 강사의 특강을 통해 4차 산업혁명을 이해하고 4차 산업혁명 시대를 대표하는 미래 기술들을 탐구할 수 있습니다.
                    <br />
                    더 나아가 청소년들의 폭 넓은 진로 설계를 도울 수 있습니다.
                  </>
                ) : (
                  <>
                    A lecture for developing convergent, creative talent to lead the 4th Industrial Revolution era.
                    <br />
                    Through a specialist instructor, students understand the 4IR and explore its flagship technologies.
                    <br />
                    It also helps broaden students\u2019 career-planning horizons.
                  </>
                )}
              </p>
            </div>

            {/* 프로그램 개요 */}
            <div className="max-w-[900px] mx-auto mb-16">
              <h4 className="text-[24px] md:text-[30px] font-bold text-gray-900 tracking-tight mb-8 text-center relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-gray-300">
                {isKo ? '프로그램 개요' : 'Program Overview'}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-t-2 border-[#336666] text-[14px]">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="w-[100px] md:w-[120px] py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700 align-top">
                        {isKo ? '대상' : 'Target'}
                      </th>
                      <td className="py-4 px-4 text-gray-600 leading-relaxed">
                        <ul className="space-y-1">
                          {(isKo
                            ? [
                                { strong: true, text: '4차 산업혁명을 이끌어나갈 창업 메이커를 꿈꾸는 초·중·고등학생' },
                                { strong: false, text: '학생, 학부모, 교사 대상 교육을 연계한 통합 프로그램이 필요한 학교' },
                                { strong: false, text: '진로 · 학습 · 인성 영역의 주요 이슈에 대해 단계적 프로그램을 고민하는 학교' },
                                { strong: false, text: '특강, 워크샵, 연수, 멘토링 등 다양한 방식의 연계 프로그램을 도입하려는 학교' },
                                { strong: false, text: '관내 학교를 대상으로, 지역 특색에 맞는 통합 프로그램을 지원하려는 지자체나 교육청' },
                              ]
                            : [
                                { strong: true, text: 'K-12 students aspiring to be startup-makers for the 4th Industrial Revolution' },
                                { strong: false, text: 'Schools needing integrated programs for students, parents, and teachers' },
                                { strong: false, text: 'Schools planning phased programs on career, learning, and character' },
                                { strong: false, text: 'Schools introducing diverse linked programs — lectures, workshops, training, mentoring' },
                                { strong: false, text: 'Local governments or education offices supporting region-specific integrated programs for local schools' },
                              ]
                          ).map((t, i) => (
                            <li key={i} className="relative pl-4 before:content-['-'] before:absolute before:left-0">
                              {t.strong ? <strong>{t.text}</strong> : t.text}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '인원' : 'Capacity'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo
                          ? '1회 최소인원 20명 (20명 이하일 경우, 1인당 비용 상승)'
                          : 'Minimum 20 per session (fewer than 20 → per-person fee increases)'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '비용' : 'Fee'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo ? '1인 20,000 (VAT 별도)' : 'KRW 20,000 / person (VAT excl.)'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '시간' : 'Duration'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">{isKo ? '90분 / 120분' : '90 min / 120 min'}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '장소' : 'Venue'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo
                          ? '각 학교/청소년수련관/문화센터/연수원/대학교 등'
                          : 'Schools, youth centers, culture centers, training centers, universities, etc.'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '문의' : 'Contact'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo ? '한양 미래 연구소 / 070-8064-0829' : 'Hanyang Future Lab / +82-70-8064-0829'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 프로그램 진행 */}
            <div className="max-w-[700px] mx-auto mb-16">
              <h4 className="text-[24px] md:text-[30px] font-bold text-gray-900 tracking-tight mb-8 text-center relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-gray-300">
                {isKo ? '프로그램 진행' : 'Program Flow'}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-t-2 border-[#336666] text-[14px]">
                  <tbody>
                    {[
                      {
                        labelKo: '도입', labelEn: 'Intro',
                        titleKo: '4차산업혁명이란?', titleEn: 'What is the 4th Industrial Revolution?',
                        bulletsKo: ['4차산업혁명의 등장', '1차산업혁명부터 4차산업혁명까지의 진행 과정', '4차산업혁명을 대비해야 하는 이유'],
                        bulletsEn: ['The emergence of the 4IR', 'From the 1st to the 4th Industrial Revolution', 'Why we need to prepare for the 4IR'],
                      },
                      {
                        labelKo: '전개', labelEn: 'Develop',
                        titleKo: '4차산업혁명 기술', titleEn: '4IR Technologies',
                        bulletsKo: ['3D프린터, 인공지능, VR/AR과 같은 4차산업혁명 메인 기술 알아보기', '4차산업혁명시대 미래 예측하기'],
                        bulletsEn: ['Explore core 4IR technologies: 3D printing, AI, VR/AR', 'Predict the future of the 4IR era'],
                      },
                      {
                        labelKo: '마무리', labelEn: 'Wrap-up',
                        titleKo: '4차산업혁명에 대비하는 우리', titleEn: 'Preparing Ourselves for the 4IR',
                        bulletsKo: ['4차산업혁명에 대비하는 개인과 기업의 자세 비교하기', '4차산업혁명에서 살아남기 위한 기업가정신 기르기'],
                        bulletsEn: ['Compare how individuals and companies prepare for the 4IR', 'Grow entrepreneurial spirit to thrive in the 4IR'],
                      },
                    ].map((stage, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <th className="w-[80px] md:w-[100px] py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700 align-top">
                          {isKo ? stage.labelKo : stage.labelEn}
                        </th>
                        <td className="py-4 px-4 text-gray-600 leading-relaxed">
                          <p className="font-semibold text-gray-800 mb-1">
                            {isKo ? stage.titleKo : stage.titleEn}
                          </p>
                          <ul className="space-y-0.5">
                            {(isKo ? stage.bulletsKo : stage.bulletsEn).map((b, j) => (
                              <li key={j} className="relative pl-4 before:content-['-'] before:absolute before:left-0">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 교육 특징 */}
            <div className="mb-16">
              <h3 className="text-[20px] font-bold text-[#336666] mb-8">
                {isKo ? '교육 특징' : 'Features'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features4th.map((item) => (
                  <div key={item.src} className="text-center">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <Image src={item.src} alt={pick(item.title, isKo)} fill className="object-cover" />
                    </div>
                    <h5 className="text-[15px] font-bold text-gray-900 mb-2">{pick(item.title, isKo)}</h5>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{pick(item.desc, isKo)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 교육 후기 */}
            <div className="mb-16">
              <h3 className="text-[20px] font-bold text-[#336666] mb-8">
                {isKo ? '교육 후기' : 'Reviews'}
              </h3>
              {reviews4th.map((r, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-6 mb-4 flex flex-col md:flex-row gap-6"
                >
                  <div className="flex-shrink-0 text-center md:w-[160px]">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image src="/images/sub/user.png" alt={isKo ? '사용자' : 'User'} fill className="object-contain" />
                    </div>
                    <p className="text-[13px] text-gray-600 whitespace-pre-line">{pick(r.name, isKo)}</p>
                    <div className="relative w-[80px] h-[16px] mx-auto mt-1">
                      <Image src="/images/sub/star.png" alt={isKo ? '별점' : 'Rating'} fill className="object-contain" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-600 leading-relaxed">{pick(r.review, isKo)}</p>
                  </div>
                  <div className="flex-shrink-0 text-[13px] text-gray-400 md:self-start">
                    {pick(r.date, isKo)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CEO 창업 특강 ===== */}
      <section id="lecture-ceo" className="scroll-mt-20 bg-gray-50">
        <div className="relative w-full h-[320px] md:h-[380px] bg-[url('/images/sub/subTop03.png')] bg-cover bg-center border-b border-gray-200">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4 h-full flex items-center">
            <div className="md:w-1/2">
              <span className="text-[15px] font-bold text-gray-400 tracking-tight">
                Special Lecture on CEO
              </span>
              <h2 className="mt-2 mb-4 text-[32px] md:text-[45px] font-bold text-gray-900 tracking-tight leading-tight relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[35px] after:h-[3px] after:bg-gray-300">
                {isKo ? 'CEO 창업 특강' : 'CEO Startup Lecture'}
              </h2>
              <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed mt-4">
                {isKo ? (
                  <>
                    벤처기업 청년 창업 성공사례 CEO의
                    <br />
                    마음을 움직이고 동기를 심어주는 특별한 강연
                  </>
                ) : (
                  <>
                    A special lecture by a successful young startup CEO
                    <br />
                    that moves hearts and plants motivation.
                  </>
                )}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block mt-6 px-6 py-2.5 bg-[#336666] text-white text-[14px] font-semibold rounded hover:bg-[#2a5454] transition-colors"
              >
                {applyBtn}
              </Link>
            </div>
            <div className="hidden md:block md:w-1/2">
              <ul className="flex flex-wrap gap-3 justify-end">
                {(isKo
                  ? ['청년 CEO의 창업스토리', '국내외창업시장을 노려라!', '생생 토크쇼']
                  : ['A Young CEO\'s Startup Story', 'Target Global Startup Markets!', 'Live Talk Show']
                ).map((item) => (
                  <li
                    key={item}
                    className="px-5 py-2.5 bg-white/80 backdrop-blur rounded-full text-[14px] font-semibold text-[#336666] border border-[#336666]/20"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 교육 소개 */}
        <div className="py-16 bg-white">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
            <h3 className="text-[20px] font-bold text-[#336666] mb-8">
              {isKo ? '교육 소개' : 'About the Lecture'}
            </h3>
            <div className="text-center max-w-[900px] mx-auto mb-16">
              <p className="text-[28px] md:text-[36px] font-bold text-gray-900 tracking-tight mb-6">
                <strong>{isKo ? 'CEO 창업 특강' : 'The CEO Startup Lecture'}</strong>
                {isKo ? '은' : ''}
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {isKo ? (
                  <>
                    실제 벤처기업 청년 창업 성공사례 CEO의 마음을 움직이고 동기를 심어주는 특별한 강연입니다.
                    <br />
                    국내외 창업시장에 관한 생생한 이야기와 창업 노하우 QnA 시간으로 학생 스스로가 능동적으로 생각하며
                    <br />
                    진로에 대한 넓은 시각과 열린 마음을 함양할 수 있는 바른 전환점이 됩니다.
                  </>
                ) : (
                  <>
                    A special lecture by a successful young startup CEO that moves students and motivates them.
                    <br />
                    Vivid stories about domestic and global startup markets and a Q&A on entrepreneurship help students think actively,
                    <br />
                    building broader career perspectives and an open mindset.
                  </>
                )}
              </p>
            </div>

            {/* 프로그램 개요 */}
            <div className="max-w-[900px] mx-auto mb-16">
              <h4 className="text-[24px] md:text-[30px] font-bold text-gray-900 tracking-tight mb-8 text-center relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-gray-300">
                {isKo ? '프로그램 개요' : 'Program Overview'}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-t-2 border-[#336666] text-[14px]">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="w-[100px] md:w-[120px] py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700 align-top">
                        {isKo ? '대상' : 'Target'}
                      </th>
                      <td className="py-4 px-4 text-gray-600 leading-relaxed">
                        <ul className="space-y-1">
                          {(isKo
                            ? [
                                '세계화 시대를 이끌어나갈 미래 경영 CEO를 꿈꾸는 초·중·고등학생',
                                '학생, 학부모, 교사 대상 교육을 연계한 통합 창업 프로그램이 필요한 학교',
                                '진로 · 학습 · 인성 영역의 주요 이슈에 대해 단계적 프로그램을 고민하는 학교',
                                '특강, 워크샵, 연수, 멘토링 등 다양한 방식의 연계 프로그램을 도입하려는 학교',
                                '관내 학교를 대상으로, 지역 특색에 맞는 통합 프로그램을 지원하려는 지자체나 교육청',
                              ]
                            : [
                                'K-12 students aspiring to be future global CEOs',
                                'Schools needing integrated entrepreneurship programs linking students, parents, and teachers',
                                'Schools planning phased programs on career, learning, and character',
                                'Schools introducing diverse linked programs — lectures, workshops, training, mentoring',
                                'Local governments or education offices supporting region-specific integrated programs for local schools',
                              ]
                          ).map((t, i) => (
                            <li key={i} className="relative pl-4 before:content-['-'] before:absolute before:left-0">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '인원' : 'Capacity'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo ? '1회 최소 20명 이상' : 'Minimum 20 per session'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '비용' : 'Fee'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo ? '별도 문의' : 'Contact for quote'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '시간' : 'Duration'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        <span className="font-bold text-[#951015]">
                          {isKo ? '100-120분' : '100–120 min'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '장소' : 'Venue'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo
                          ? '각 학교/청소년수련관/문화센터/연수원/대학교 등'
                          : 'Schools, youth centers, culture centers, training centers, universities, etc.'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                        {isKo ? '문의' : 'Contact'}
                      </th>
                      <td className="py-4 px-4 text-gray-600">
                        {isKo ? '한양 미래 연구소 / 070-8064-0829' : 'Hanyang Future Lab / +82-70-8064-0829'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 프로그램 */}
        <div className="py-16 bg-white">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
            <h3 className="text-[20px] font-bold text-[#336666] mb-4">
              {isKo ? '프로그램 안내' : 'Program Guide'}
            </h3>
            <h4 className="text-[24px] md:text-[30px] font-bold text-gray-900 tracking-tight mb-8 text-center relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-gray-300">
              {isKo ? '주요 프로그램' : 'Key Programs'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
              {ceoPrograms.map((item) => (
                <div key={item.src} className="text-center">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <Image src={item.src} alt={pick(item.title, isKo)} fill className="object-cover" />
                  </div>
                  <h5 className="text-[15px] font-bold text-gray-900 mb-2">{pick(item.title, isKo)}</h5>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{pick(item.desc, isKo)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 교육 특징 */}
        <div className="py-16 bg-white">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
            <h3 className="text-[20px] font-bold text-[#336666] mb-8">
              {isKo ? '교육 특징' : 'Features'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[600px] mx-auto">
              {ceoFeatures.map((item) => (
                <div key={item.src} className="text-center">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <Image src={item.src} alt={pick(item.title, isKo)} fill className="object-cover" />
                  </div>
                  <h5 className="text-[15px] font-bold text-gray-900 mb-2">{pick(item.title, isKo)}</h5>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{pick(item.desc, isKo)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 교육 후기 */}
        <div className="py-16 bg-white">
          <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
            <h3 className="text-[20px] font-bold text-[#336666] mb-8">
              {isKo ? '교육 후기' : 'Reviews'}
            </h3>
            {reviewsCeo.map((r, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 mb-4 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-shrink-0 text-center md:w-[160px]">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <Image src="/images/sub/user.png" alt={isKo ? '사용자' : 'User'} fill className="object-contain" />
                  </div>
                  <p className="text-[13px] text-gray-600 whitespace-pre-line">{pick(r.name, isKo)}</p>
                  <div className="relative w-[80px] h-[16px] mx-auto mt-1">
                    <Image src="/images/sub/star.png" alt={isKo ? '별점' : 'Rating'} fill className="object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-gray-600 leading-relaxed">{pick(r.review, isKo)}</p>
                </div>
                <div className="flex-shrink-0 text-[13px] text-gray-400 md:self-start">
                  {pick(r.date, isKo)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-16">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <h3 className="text-[20px] font-bold text-[#336666] mb-8">
            {isKo ? '오시는 길' : 'Location'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-[250px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.944032697291!2d126.83237666564264!3d37.29646024730607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6ef2f5a7cb73%3A0x26b59cb3d9af4a46!2z7ZWc7JaR64yA7ZWZ6rWQIEVSSUNB7Lqg7Y287Iqk!5e0!3m2!1sko!2skr!4v1556386346348!5m2!1sko!2skr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isKo ? '한양대학교 ERICA 위치' : 'Hanyang University ERICA location'}
              />
            </div>
            <div className="flex items-center">
              <dl>
                <dt className="text-[16px] font-bold text-gray-900 mb-2">
                  {isKo ? '본사' : 'Headquarters'}
                </dt>
                <dd className="text-[14px] text-gray-600 leading-relaxed">
                  {isKo
                    ? '경기도 안산시 상록구 한양대학로 55 5공학관 창업실'
                    : '55 Hanyangdaehak-ro, Engineering Bldg. 5 Startup Room, Sangnok-gu, Ansan, Gyeonggi-do'}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <h3 className="text-[20px] font-bold text-[#336666] mb-8">
            {isKo ? '공지사항' : 'Notices'}
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <ul className="space-y-3 text-[14px] text-gray-600 leading-relaxed">
              {(isKo ? noticesKo : noticesEn).map((n, i) => (
                <li
                  key={i}
                  className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-[6px] before:h-[6px] before:bg-[#336666] before:rounded-full"
                >
                  {n.main}
                  {n.sub && (
                    <>
                      <br />
                      <span className="text-[13px] text-gray-400">{n.sub}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 취소 환불 규정 */}
      <section className="py-16">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto px-4">
          <h3 className="text-[20px] font-bold text-[#336666] mb-8">
            {isKo ? '취소 환불 규정' : 'Cancellation & Refund Policy'}
          </h3>
          <div className="max-w-[400px] mx-auto mb-8">
            <table className="w-full border-t-2 border-[#336666] text-[14px]">
              <tbody>
                {[
                  { ko: '수업 15일 전 취소', en: '15+ days before', refundKo: '100% 환불', refundEn: '100% refund' },
                  { ko: '수업 12일 전 취소', en: '12 days before', refundKo: '50% 환불', refundEn: '50% refund' },
                  { ko: '수업 10일 전 취소', en: '10 days before', refundKo: '30% 환불', refundEn: '30% refund' },
                  { ko: '수업 7일 이내', en: 'Within 7 days', refundKo: '취소·환불 불가', refundEn: 'No cancellation/refund' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <th className="py-3 px-4 bg-gray-50 text-left font-semibold text-gray-700">
                      {isKo ? row.ko : row.en}
                    </th>
                    <td className="py-3 px-4 text-gray-600">
                      {isKo ? row.refundKo : row.refundEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-[700px] mx-auto">
            <ul className="space-y-2 text-[13px] text-gray-500 leading-relaxed">
              {(isKo
                ? [
                    '환불 업무시간 : 평일 오전 10:00~오후 06:00 (점심시간 : 오후 12:00~13:00)',
                    '토·일요일 및 국·공휴일은 취소 및 변경신청이 접수 되지 않으며 취소 일수에서 제외됩니다.',
                    '업무시간 이후 취소요청시 익일 기준으로 처리됩니다.',
                  ]
                : [
                    'Refund hours: weekdays 10:00 a.m. – 6:00 p.m. (lunch 12:00 – 13:00)',
                    'Cancellations/changes not accepted on weekends or public holidays, and those days are excluded from the cancellation window.',
                    'Cancellation requests after business hours are processed the next business day.',
                  ]
              ).map((t, i) => (
                <li
                  key={i}
                  className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:bg-gray-400 before:rounded-full"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
