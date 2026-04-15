import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
import { setRequestLocale } from 'next-intl/server';
import { history } from '@/data/history';
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
      ? '한양미래연구소 소개 | AI교육·로봇코딩 전문 교육기관'
      : 'About Hanyang Future Lab | AI Education & Robot Coding Institute',
    description: isKo
      ? '한양미래연구소는 초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, STEAM교육 전문 기관입니다. 17,150명 참여, 245개 학교 협력.'
      : 'Hanyang Future Lab is a specialized institute for AI education, robot coding, autonomous driving, and STEAM programs for K-12 students. 17,150 participants and 245 school partnerships.',
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

      {/* 기업소개 */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {isKo ? '기업소개' : 'Company Overview'}
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/3 flex justify-center">
              <Image
                src="/images/about/logo02.png"
                alt={isKo ? '한양미래연구소 로고' : 'Hanyang Future Lab logo'}
                width={280}
                height={120}
                className="w-auto h-auto max-w-[280px]"
              />
            </div>
            <div className="w-full lg:w-2/3 space-y-5">
              <p className="text-gray-700 leading-relaxed">
                {isKo ? (
                  <>
                    한양미래연구소는 2020년에 하이스타터 법인 수립 이후 현재까지 전국에 약 <strong className="text-point">200명</strong>의 강사풀 네트워크를 토대로 <strong className="text-point">72개이상</strong>의 커리큘럼으로 구성된 찾아가는 체험교실과 경진대회 대비와 청소년 토요 캠프를 포함한 청소년 캠프, 축제를 위한 체험부스도 운영 중에 있습니다.
                  </>
                ) : (
                  <>
                    Since Histarter co.,ltd was founded in 2020, Hanyang Future Lab has grown a nationwide network of about <strong className="text-point">200 instructors</strong> delivering <strong className="text-point">72+ curricula</strong> through on-site experience classes, youth camps (including Saturday and competition prep), and festival booths.
                  </>
                )}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isKo
                  ? '메이커 융합 교육, 코딩 교육, STEAM 교육, 창업 교육과 같이 4차산업혁명 시대에 한 사람의 인생을 바꿀 수 있는 체험교육을 제공합니다.'
                  : 'We provide life-changing hands-on education for the 4th Industrial Revolution era — maker convergence, coding, STEAM, and entrepreneurship.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { value: isKo ? '200명' : '200', labelKo: '강사 네트워크', labelEn: 'Instructor Network' },
                  { value: isKo ? '72종+' : '72+', labelKo: '커리큘럼', labelEn: 'Curricula' },
                  { value: isKo ? '245개처' : '245', labelKo: '참여 학교·기관', labelEn: 'Partner Schools' },
                  { value: isKo ? '17,150명' : '17,150', labelKo: '참여 인원', labelEn: 'Participants' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-point">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {isKo ? stat.labelKo : stat.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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

      {/* 핵심 가치 */}
      <section className="py-16 md:py-20 px-6 bg-gray-50" aria-label={isKo ? '핵심 가치' : 'Core Values'}>
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            {isKo ? '핵심 가치' : 'Core Values'}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-center text-gray-600 mb-10">
            {isKo ? '기술기반 미래인재육성' : 'Developing Future Talent Through Technology'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title.ko}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  <Image
                    src={value.image}
                    alt={pick(value.title, isKo)}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-bold text-point mb-2">
                    {pick(value.title, isKo)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pick(value.description, isKo)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
