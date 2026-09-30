import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProgramsClient from './ProgramsClient';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';
import { programs } from '@/data/programs';
import { BreadcrumbJsonLd, CourseListJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: buildAlternates(locale, 'programs'),
    openGraph: buildOpenGraph(locale, 'programs'),
    title:
      locale === 'ko'
        ? '찾아가는 체험교실 | AI교육·로봇코딩·메이커교육'
        : 'Experience Classes | AI · Robot Coding · Maker',
    description:
      locale === 'ko'
        ? '초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, 3D프린팅, 드론, VR/AR 체험교실. 학교로 찾아가는 맞춤형 교육.'
        : 'AI, robot coding, autonomous driving, 3D printing, drone, VR/AR experience classes for K-12 students.',
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  // hidden 프로그램은 목록·스키마 모두에서 제외
  const visiblePrograms = programs.filter((p) => !p.hidden);
  const countBy = (c: string) => visiblePrograms.filter((p) => p.category === c).length;

  const categories = [
    {
      key: 'ai',
      title: { ko: 'AI 인공지능 교육', en: 'AI Education' },
      desc: {
        ko: 'ChatGPT, 빅데이터, 자율주행 등 인공지능의 원리를 직접 만들어 보며 이해합니다.',
        en: 'Understand AI principles hands-on through ChatGPT, big data, and autonomous driving.',
      },
    },
    {
      key: 'coding',
      title: { ko: '코딩 교육', en: 'Coding' },
      desc: {
        ko: '마이크로비트·엔트리·핑퐁로봇으로 블록코딩부터 스마트팜·스마트홈 제어까지 다룹니다.',
        en: 'From block coding with micro:bit and Entry to smart farm and smart home control.',
      },
    },
    {
      key: 'maker',
      title: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
      desc: {
        ko: '드론, VR/AR, 3D펜, 3D프린터, 메타버스, 유튜브 크리에이터 등 만들면서 배우는 과정입니다.',
        en: 'Learn by making — drones, VR/AR, 3D pens, 3D printers, metaverse, and YouTube creation.',
      },
    },
    {
      key: 'steam',
      title: { ko: 'STEAM 교육', en: 'STEAM' },
      desc: {
        ko: '신재생에너지 등 과학·기술·공학·예술·수학을 융합한 탐구형 프로그램입니다.',
        en: 'Inquiry-based programs integrating science, technology, engineering, arts, and math.',
      },
    },
  ];

  const faqs = isKo
    ? [
        {
          q: '어떤 기관에서 신청할 수 있나요?',
          a: '초·중·고등학교, 청소년수련관, 문화센터, 돌봄센터, 유치원 등 교육기관이면 신청할 수 있습니다. 기업 임직원 연수도 진행합니다.',
        },
        {
          q: '학교에서 따로 준비할 것이 있나요?',
          a: '강사와 교구는 저희가 전부 가지고 방문합니다. 프로그램에 따라 컴퓨터실이 필요한 경우와 일반 교실에서 진행 가능한 경우가 나뉘며, 각 프로그램 상세 페이지에서 확인할 수 있습니다.',
        },
        {
          q: '몇 명부터 신청할 수 있나요?',
          a: '프로그램별로 최소 인원이 정해져 있습니다. 각 프로그램 상세 페이지에 인원 기준과 비용이 표기되어 있습니다.',
        },
        {
          q: '한 번에 몇 차시로 진행되나요?',
          a: '대부분 2~3차시(1차시 40~50분) 기준이며, 프로그램과 학교 일정에 맞춰 조정할 수 있습니다.',
        },
        {
          q: '나라장터·학교장터로 계약할 수 있나요?',
          a: '네, 나라장터와 학교장터를 이용하여 계약 가능합니다.',
        },
        {
          q: '비용은 교육이 끝난 뒤에 결제해도 되나요?',
          a: '네, 교육 종료 후 결제도 가능합니다.',
        },
      ]
    : [
        {
          q: 'Which organizations can apply?',
          a: 'Elementary, middle, and high schools, youth centers, community centers, care centers, and kindergartens. We also run corporate employee training.',
        },
        {
          q: 'Does the school need to prepare anything?',
          a: 'We bring instructors and all materials. Some programs need a computer lab while others run in a regular classroom — see each program page.',
        },
        {
          q: 'What is the minimum group size?',
          a: 'Each program has its own minimum. Group size and pricing are listed on each program detail page.',
        },
        {
          q: 'How many sessions does it take?',
          a: 'Most programs run 2–3 sessions (40–50 minutes each) and can be adjusted to your schedule.',
        },
        {
          q: 'Can we contract through public procurement?',
          a: 'Yes, contracts through the national and school e-procurement systems are available.',
        },
        {
          q: 'Can we pay after the program ends?',
          a: 'Yes, post-program payment is available.',
        },
      ];

  return (
    <>
      <CourseListJsonLd programs={visiblePrograms} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `https://hyedu.kr/${locale}` },
          {
            name: isKo ? '찾아가는 체험교실' : 'Experience Classes',
            href: `https://hyedu.kr/${locale}/programs`,
          },
        ]}
      />
      {/* 아래 FAQ 섹션이 화면에도 실제로 표시되므로 스키마 적용이 정당하다 */}
      <FAQJsonLd faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <ProgramsClient locale={locale} />

      {/*
        목록 페이지 본문 보강 섹션.
        기존에는 본문 텍스트가 130단어뿐이라 검색엔진이 이 페이지의 주제를
        판단할 근거가 부족했다. 아래는 담당 선생님이 실제로 궁금해하는 정보를
        서버 렌더링 텍스트로 제공한다 (JS 없이도 크롤러가 읽는다).
      */}
      <section className="bg-gray-50 py-14 md:py-20 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {isKo ? '찾아가는 체험교실 안내' : 'About Our On-site Experience Classes'}
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            {isKo
              ? `한양미래연구소는 학교·수련관·문화센터 등 교육기관에 강사와 장비를 직접 가지고 방문합니다. 현재 ${visiblePrograms.length}종의 프로그램을 운영하며, 2019년 한양대학교에서 시작해 245개 학교와 함께 누적 4만명 이상을 교육했습니다.`
              : `Hanyang Future Lab brings instructors and equipment directly to schools, youth centers, and community centers. We currently run ${visiblePrograms.length} programs and, since starting at Hanyang University in 2019, have taught over 40,000 students in partnership with 245 schools.`}
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {categories.map((c) => (
              <div key={c.key} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isKo ? c.title.ko : c.title.en}
                  <span className="ml-2 text-sm font-semibold text-point">
                    {countBy(c.key)}
                    {isKo ? '종' : ' programs'}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isKo ? c.desc.ko : c.desc.en}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {isKo ? '신청 전 자주 묻는 질문' : 'Frequently Asked Questions'}
          </h2>
          <dl className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl bg-white p-6 shadow-sm">
                <dt className="font-bold text-gray-900 mb-2">Q. {f.q}</dt>
                <dd className="text-sm text-gray-600 leading-relaxed">A. {f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
