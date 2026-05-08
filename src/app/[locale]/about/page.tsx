import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
import { setRequestLocale } from 'next-intl/server';
import { history } from '@/data/history';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import CoreValuesMindMap from '@/components/sections/CoreValuesMindMap';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '한양미래연구소 소개 | AI교육·로봇코딩 전문 교육기관'
      : 'About Hanyang Future Lab | AI Education & Robot Coding Institute',
    description: isKo
      ? '한양미래연구소는 초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, STEAM교육 전문 기관입니다. 누적 참가자 4만명+, 245개 학교 협력.'
      : 'Hanyang Future Lab is a specialized institute for AI education, robot coding, autonomous driving, and STEAM programs for K-12 students. 40,000+ participants and 245 school partnerships.',
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const coreValues: { title: Bi; image: string; description: Bi }[] = [
  {
    title: { ko: '3D프린팅', en: '3D Printing' },
    image: '/images/about/edu02_1_1.png',
    description: {
      ko: '프린터로 물체를 뽑아내는 기술을 말한다. 종이에 글자를 인쇄하는 기존 프린터와 비슷한 방식으로, 다만 입체 모형을 만드는 기술',
      en: 'Technology that prints physical objects. Similar in principle to paper printers but producing three-dimensional models.',
    },
  },
  {
    title: { ko: '3D펜', en: '3D Pen' },
    image: '/images/about/edu02_2_1.png',
    description: {
      ko: '3D프린터의 원리를 그대로 적용한 펜 형태의 기기로서, 펜촉에서 액체 플라스틱이 흘러나오면서 원하는 대로 입체 형상을 만들어낼 수 있다',
      en: 'A pen-form device that applies 3D-printer principles, extruding liquid plastic to let users freely create 3D shapes.',
    },
  },
  {
    title: { ko: 'VR', en: 'VR' },
    image: '/images/about/edu02_3_1.png',
    description: {
      ko: '컴퓨터로 만들어 놓은 가상의 세계에서 사람이 실제와 같은 체험을 할 수 있도록 하는 최첨단 기술',
      en: 'Cutting-edge technology enabling lifelike experiences inside computer-generated virtual worlds.',
    },
  },
  {
    title: { ko: 'AR', en: 'AR' },
    image: '/images/about/edu02_4_1.png',
    description: {
      ko: '현실에 기반하여 정보를 추가 제공하는 기술. 현실의 이미지나 배경에 3차원 가상 이미지를 겹쳐서 하나의 영상으로 보여주는 기술',
      en: 'Technology that overlays additional information on reality — superimposing 3D virtual images onto real scenes.',
    },
  },
  {
    title: { ko: '드론', en: 'Drones' },
    image: '/images/about/edu02_5_1.png',
    description: {
      ko: '사람이 타지 않고 무선전파의 유도에 의해서 비행하는 비행기나 헬리콥터 모양의 비행체',
      en: 'Airplane- or helicopter-shaped aircraft that fly without an onboard pilot, controlled remotely.',
    },
  },
  {
    title: { ko: '코딩', en: 'Coding' },
    image: '/images/about/edu02_6_1.png',
    description: {
      ko: '주어진 명령을 컴퓨터가 이해할 수 있는 언어로 입력하는 것',
      en: 'Writing instructions in a language that computers can understand and execute.',
    },
  },
  {
    title: { ko: '자율주행자동차', en: 'Autonomous Vehicles' },
    image: '/images/about/maker_activity_7_autonomous_car.png',
    description: {
      ko: '인간의 지능으로 할 수 있는 사고, 학습, 자기 개발 등을 컴퓨터가 할 수 있도록 하는 방법을 연구하는 분야',
      en: 'A field that studies how computers can perform thinking, learning, and self-development — tasks historically done by humans.',
    },
  },
];

export default async function AboutPage({
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
          { name: isKo ? '소개' : 'About', href: `/${locale}/about` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-point to-point/80 py-20 md:py-28 px-6 text-white text-center">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {isKo ? '기업 소개 및 연혁' : 'About & History'}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {isKo
              ? '한양 미래 연구소는 (주)하이스타터의 교육 브랜드입니다.'
              : 'Hanyang Future Lab is the education brand of Histarter co.,ltd.'}
          </p>
          <p className="text-base md:text-lg opacity-80 mt-2">
            {isKo
              ? '한양 미래 연구소는 아이들의 평생 꿈을 보육합니다.'
              : 'We nurture children\'s lifelong dreams.'}
          </p>
        </div>
      </section>

      {/* 비전 */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {isKo ? (
              <>
                한양미래연구소의 <span className="text-point">비전</span>
              </>
            ) : (
              <>
                Our <span className="text-point">Vision</span>
              </>
            )}
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/about/company01_1.png"
                alt={isKo ? '한양미래연구소 비전' : 'Hanyang Future Lab Vision'}
                width={570}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-point">
                {isKo
                  ? '한 사람의 인생을 바꾸는 교육을 제공합니다'
                  : 'Education that changes a person\'s life'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {isKo
                  ? '체험교육은 삶의 방향에 영향을 주는 가장 중요한 \u2018경험\u2019입니다. 그 \u2018경험\u2019이야말로 한 사람의 인생과 방향을 크게 바꿀 수 있는 기회이며, 미래를 위한 투자이기 때문입니다. 우리는 체험교육을 통해 미래를 바꾸는 씨앗을 심는 일을 합니다.'
                  : 'Experiential education is one of the most important "experiences" that shape a life\'s direction. Those experiences can transform someone\'s path — an investment in their future. We plant the seeds that change tomorrow.'}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isKo
                  ? '교육이라는 미래에 투자하고 함께 성장하며 함께 사회적 가치를 만들어나가는 스타트업을 목표로 합니다.'
                  : 'We aim to be a startup that invests in education as a future, grows together, and builds social value alongside our community.'}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isKo
                  ? '한양미래연구소는 단순한 교육이 아닙니다. 평생 꿈을 보육합니다. 매일 바뀌는 세상에 적응하며, 생존하기 위해 새로운 기술과 이론을 체험하고, 자기주도적 학습을 가능하게 합니다.'
                  : 'We are more than simple education — we nurture lifelong dreams. By experiencing new technologies and theories, students adapt to a rapidly changing world and gain self-directed learning skills.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 기업소개 — 한양미래연구소란? (마케팅 차별화 포인트) */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* 배경 장식 */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-point/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          {/* 섹션 라벨 + 헤드라인 */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-point uppercase mb-3">
              {isKo ? 'WHO WE ARE' : 'WHO WE ARE'}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {isKo ? (
                <>
                  <span className="inline-block text-point">| </span>
                  한양미래연구소란?
                </>
              ) : (
                <>
                  <span className="inline-block text-point">| </span>
                  What is Hanyang Future Lab?
                </>
              )}
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {isKo
                ? '한양대학교에서 시작된 검증된 4차산업·AI 교육기관, 5가지 차별점으로 증명합니다.'
                : 'Started at Hanyang University — a verified institute proven by 5 differentiators.'}
            </p>
          </div>

          {/* 5가지 차별점 카드 (별점 + 강조 키워드 + 설명 + 배경 이미지) */}
          <div className="space-y-4 md:space-y-5 mb-12">
            {[
              {
                stars: 1,
                keyword: isKo ? '한양대' : 'Hanyang',
                sub: isKo ? '명문 대학 출범' : 'University Origin',
                desc: isKo ? (
                  <>
                    <strong className="text-point">2019년 한양대학교</strong>에서 시작된 4차산업 교육기관으로, <strong className="text-gray-900">대학 연계 · 뛰어난 인력풀</strong>을 활용해 <strong className="text-gray-900">AI 모델 개발 · 캠퍼스 멘토링 · 방문형 캠프</strong>를 운영합니다.
                  </>
                ) : (
                  <>
                    Started at <strong className="text-point">Hanyang University in 2019</strong>, leveraging <strong className="text-gray-900">university partnerships &amp; top-tier talent</strong> for <strong className="text-gray-900">AI model development, campus mentoring, and on-site camps</strong>.
                  </>
                ),
                bgImage: '/images/main/hyedu_program_4_campus_tour.png',
              },
              {
                stars: 2,
                keyword: '250명',
                keywordEn: '250',
                sub: isKo ? '검증된 베테랑 강사' : 'Verified Expert Instructors',
                desc: isKo ? (
                  <>
                    <strong className="text-point">전국 250명</strong>의 우수 강사풀 보유. <strong className="text-gray-900">공개 입찰 경쟁</strong>으로 강의를 배정하여, 가장 <strong className="text-gray-900">우수한 검증된 베테랑 강사</strong>가 강의의 품질을 책임집니다.
                  </>
                ) : (
                  <>
                    A nationwide pool of <strong className="text-point">250 top instructors</strong>. <strong className="text-gray-900">Open bidding</strong> ensures only the <strong className="text-gray-900">most verified veterans</strong> deliver each class — guaranteed quality.
                  </>
                ),
                bgImage: '/images/about/introduce_7_entrepreneurship_class.jpg',
              },
              {
                stars: 3,
                keyword: '4만명',
                keywordEn: '40K',
                sub: isKo ? '누적 참가자' : 'Cumulative Participants',
                desc: isKo ? (
                  <>
                    지속적인 <strong className="text-gray-900">다분야 커리큘럼 개발</strong>, <strong className="text-gray-900">기관 맞춤형 제안</strong>, 체계적이고 꼼꼼한 사전 준비 끝에 <strong className="text-point">누적 참가자 4만명 이상</strong>이 선택한 검증된 기관입니다.
                  </>
                ) : (
                  <>
                    Through ongoing <strong className="text-gray-900">multi-field curriculum development</strong>, <strong className="text-gray-900">custom proposals</strong>, and meticulous preparation — <strong className="text-point">over 40,000 participants</strong> chose us.
                  </>
                ),
                bgImage: '/images/main/hyedu_program_2_visit_class.png',
              },
              {
                stars: 4,
                keyword: '4거점',
                keywordEn: '4 Hubs',
                sub: isKo ? '전국 어디서나' : 'Nationwide Coverage',
                desc: isKo ? (
                  <>
                    수도권 본사 및 <strong className="text-point">전국 4개 거점</strong>(충청·전라 / 강원 / 부울경) 운영으로 <strong className="text-gray-900">출장비 부담을 낮추고</strong>, 어디서나 <strong className="text-gray-900">첨단 기자재 활용</strong> 수업이 가능합니다.
                  </>
                ) : (
                  <>
                    HQ in the capital region and <strong className="text-point">4 nationwide hubs</strong> (Honam / Gangwon / BuULGyeong) <strong className="text-gray-900">reduce travel cost</strong> and enable <strong className="text-gray-900">cutting-edge classes</strong> anywhere.
                  </>
                ),
                bgImage: '/images/network/nationwide-map.png',
              },
              {
                stars: 5,
                keyword: '8단계',
                keywordEn: '8-Step',
                sub: isKo ? '체계적 운영 시스템' : 'Systematic Operation',
                desc: isKo ? (
                  <>
                    제안서부터 사후 보고서까지 이어지는 <strong className="text-point">8단계 체계적 시스템</strong>으로 <strong className="text-gray-900">기관의 업무 부담은 최소화</strong>하고 <strong className="text-gray-900">강의의 질은 최대</strong>로 끌어올렸습니다.
                  </>
                ) : (
                  <>
                    An <strong className="text-point">8-step systematic process</strong> from proposal to post-event report — <strong className="text-gray-900">minimizing institutional workload</strong> while <strong className="text-gray-900">maximizing class quality</strong>.
                  </>
                ),
                bgImage: '/images/about/company01_8.jpg',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(51,102,102,0.12)] hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                {/* 좌측 — 배경 사진 + 최소 오버레이 + 별점 + 키워드 */}
                <div className="flex-shrink-0 w-full sm:w-[240px] md:w-[280px] lg:w-[300px] relative overflow-hidden min-h-[220px] sm:min-h-[240px]">
                  {/* 배경 이미지 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.bgImage}')` }}
                  />
                  {/* 하단 그라디언트만 적용 (사진 잘 보이게, 글씨 부분만 어둡게) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

                  {/* 콘텐츠 */}
                  <div className="relative z-10 h-full p-5 md:p-6 flex flex-col items-center justify-end text-white">
                    {/* 별점 */}
                    <div className="flex gap-0.5 mb-2 md:mb-2.5">
                      {[...Array(5)].map((_, idx) => (
                        <svg
                          key={idx}
                          viewBox="0 0 24 24"
                          className={`w-4 h-4 md:w-[18px] md:h-[18px] ${idx < item.stars ? 'text-yellow-300' : 'text-white/40'}`}
                          fill="currentColor"
                          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    {/* 메인 키워드 (대형) */}
                    <p
                      className="text-[44px] md:text-[52px] lg:text-[60px] font-black leading-none tracking-tight"
                      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {isKo ? item.keyword : (item.keywordEn || item.keyword)}
                    </p>
                    {/* 부제 */}
                    <p
                      className="mt-2.5 md:mt-3 text-sm md:text-base font-bold tracking-wide text-center px-2"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                    >
                      {item.sub}
                    </p>
                  </div>

                  {/* 우측 화살표 (호버 시) */}
                  <div className="hidden sm:block absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-white rotate-45 border-l border-b border-gray-100 group-hover:bg-gray-50 transition-colors z-10" />
                </div>

                {/* 우측 — 설명 (마케팅 강조) */}
                <div className="flex-1 p-6 md:p-8 lg:p-10 flex items-center">
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-[1.7] md:leading-[1.75] font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 통합 통계 박스 (CTA 강조) */}
          <div className="relative bg-gradient-to-r from-point to-point/85 rounded-3xl p-6 md:p-8 text-white shadow-xl overflow-hidden">
            {/* 장식 점 */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
            </div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <p className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-80 mb-1.5">
                    {isKo ? 'BY THE NUMBERS' : 'BY THE NUMBERS'}
                  </p>
                  <h3 className="text-xl md:text-2xl font-extrabold">
                    {isKo
                      ? '숫자로 증명하는 한양미래연구소'
                      : 'Hanyang Future Lab — Proven by Numbers'}
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-300" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wide">
                    {isKo ? '검증된 교육 파트너' : 'Verified Partner'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { value: '250명+', valueEn: '250+', labelKo: '강사 네트워크', labelEn: 'Instructors' },
                  { value: '72종+', valueEn: '72+', labelKo: '커리큘럼', labelEn: 'Curricula' },
                  { value: '245개처+', valueEn: '245+', labelKo: '참여 학교·기관', labelEn: 'Partners' },
                  { value: '4만명+', valueEn: '40K+', labelKo: '누적 참가자', labelEn: 'Participants' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <p className="text-2xl md:text-[28px] font-extrabold leading-none mb-1.5">
                      {isKo ? stat.value : stat.valueEn}
                    </p>
                    <p className="text-[11px] md:text-xs font-semibold opacity-90">
                      {isKo ? stat.labelKo : stat.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 한 줄 메시지 (하단) */}
          <div className="mt-10 md:mt-12 flex flex-col items-center text-center">
            <p className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
              {isKo ? (
                <>
                  메이커 융합 · 코딩 · STEAM · 창업 교육으로<br className="hidden md:inline" />
                  {' '}<strong className="text-point">한 사람의 인생을 바꾸는 체험교육</strong>을 제공합니다.
                </>
              ) : (
                <>
                  Maker, coding, STEAM, and entrepreneurship education<br className="hidden md:inline" />
                  {' '}— <strong className="text-point">life-changing hands-on learning</strong>.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="py-16 md:py-20 px-6 bg-white" aria-label={isKo ? '연혁' : 'History'}>
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            {isKo ? '연혁 및 교육 진행 이력' : 'History & Education Track Record'}
          </h2>
          <div className="relative">
            <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-point/20 hidden md:block" />

            <div className="space-y-10">
              {history.map((item) => (
                <div key={item.year} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-40 flex-shrink-0 flex md:justify-end items-start">
                    <span className="text-2xl font-bold text-point">{item.year}</span>
                  </div>
                  <div className="flex-1 md:pl-10 relative">
                    <div className="hidden md:block absolute -left-[1.65rem] top-2 w-3 h-3 rounded-full bg-point border-2 border-white shadow" />
                    <ul className="space-y-2">
                      {item.events.map((event, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-point/50 flex-shrink-0" />
                          <span>{isKo ? event.title : event.titleEn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 — 미래지향 마인드맵 */}
      <CoreValuesMindMap isKo={isKo} />
    </>
  );
}
