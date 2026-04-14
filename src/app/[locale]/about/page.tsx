import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { history } from '@/data/history';
import { partners } from '@/data/partners';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: '한양미래연구소 소개 | AI교육·로봇코딩 전문 교육기관',
    description:
      '한양미래연구소는 초등·중등·고등학생 대상 AI교육, 로봇코딩, 자율주행, STEAM교육 전문 기관입니다. 17,150명 참여, 245개 학교 협력.',
  };
}

const coreValues = [
  {
    title: '3D프린팅',
    image: '/images/about/edu02_1_1.png',
    description:
      '프린터로 물체를 뽑아내는 기술을 말한다. 종이에 글자를 인쇄하는 기존 프린터와 비슷한 방식으로, 다만 입체 모형을 만드는 기술',
  },
  {
    title: '3D펜',
    image: '/images/about/edu02_2_1.png',
    description:
      '3D프린터의 원리를 그대로 적용한 펜 형태의 기기로서, 펜촉에서 액체 플라스틱이 흘러나오면서 원하는 대로 입체 형상을 만들어낼 수 있다',
  },
  {
    title: 'VR',
    image: '/images/about/edu02_3_1.png',
    description:
      '컴퓨터로 만들어 놓은 가상의 세계에서 사람이 실제와 같은 체험을 할 수 있도록 하는 최첨단 기술',
  },
  {
    title: 'AR',
    image: '/images/about/edu02_4_1.png',
    description:
      '현실에 기반하여 정보를 추가 제공하는 기술. 현실의 이미지나 배경에 3차원 가상 이미지를 겹쳐서 하나의 영상으로 보여주는 기술',
  },
  {
    title: '드론',
    image: '/images/about/edu02_5_1.png',
    description:
      '사람이 타지 않고 무선전파의 유도에 의해서 비행하는 비행기나 헬리콥터 모양의 비행체',
  },
  {
    title: '코딩',
    image: '/images/about/edu02_6_1.png',
    description: '주어진 명령을 컴퓨터가 이해할 수 있는 언어로 입력하는 것',
  },
  {
    title: '자율주행자동차',
    image: '/images/about/maker_activity_7_autonomous_car.png',
    description:
      '인간의 지능으로 할 수 있는 사고, 학습, 자기 개발 등을 컴퓨터가 할 수 있도록 하는 방법을 연구하는 분야',
  },
];

const programs = [
  {
    title: '한양청소년캠프',
    image: '/images/main/hyedu_program_4_campus_tour.png',
    target: '창업 메이커를 꿈꾸는 초·중·고등학생',
    duration: '일일캠프 | 1박2일 | 2박3일',
    price: '1인 120,000원~450,000원',
  },
  {
    title: '찾아가는 체험교실(1회기)',
    image: '/images/main/hyedu_program_2_visit_class.png',
    target: '창업 메이커를 꿈꾸는 초·중·고등학생, 성인',
    duration: '1회 2교시(90-100분) | 3교시(120-150분)',
    price: '1인 22,000원~프로그램별 상이',
  },
  {
    title: '찾아가는 체험교실(장회기)',
    image: '/images/about/company01_7.jpg',
    target: '창업 메이커를 꿈꾸는 초·중·고등학생, 성인',
    duration: '2회 이상 (프로그램별 상이)',
    price: '1인 22,000원~프로그램별 상이',
  },
  {
    title: '4차산업혁명 특강',
    image: '/images/about/introduce_4_4th_industrial_lecture.jpg',
    target: '4차산업혁명 시대를 살아가는 학생, 교사, 학부모',
    duration: '1회 60-100분',
    price: '1인 22,000원 (50인 이상 단체는 별도 문의)',
  },
  {
    title: '메이커동아리',
    image: '/images/about/company01_8.jpg',
    target: '창업 메이커를 꿈꾸는 초·중·고등학생',
    duration: '2회기 이상 (1회기 2교시(90-100분) | 3교시(120-150분))',
    price: '1인 22,000원~프로그램별 상이',
  },
  {
    title: '메이커 부스 운영',
    image: '/images/main/hyedu_program_3_maker_booth.png',
    target: '특별한 행사, 축제를 기획하는 학교·지자체',
    duration: '별도 문의',
    price: '200만원~별도 문의',
  },
  {
    title: '청소년 창업 교실',
    image: '/images/about/introduce_7_entrepreneurship_class.jpg',
    target: '미래의 CEO를 꿈꾸는 초·중·고등학생',
    duration: '8회기 (1회기 90분)',
    price: '1인 160,000원 (VAT별도)',
  },
  {
    title: '나의 창업 이야기 (CEO 특강)',
    image: '/images/about/introduce_8_ceo_lecture.jpg',
    target: '미래의 CEO를 꿈꾸는 중·고등학생',
    duration: '1회 100-120분',
    price: '1인 22,000원 (50인 이상 단체는 별도 문의)',
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: `/${locale}` },
          { name: '소개', href: `/${locale}/about` },
        ]}
      />

      {/* 1. 기업 소개 및 연혁 - Hero */}
      <section className="relative bg-gradient-to-br from-point to-point/80 py-20 md:py-28 px-6 text-white text-center">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            기업 소개 및 연혁
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            한양 미래 연구소는 (주)하이스타터의 교육 브랜드입니다.
          </p>
          <p className="text-base md:text-lg opacity-80 mt-2">
            한양 미래 연구소는 아이들의 평생 꿈을 보육합니다.
          </p>
        </div>
      </section>

      {/* 2. 비전 */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            한양미래연구소의 <span className="text-point">비전</span>
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/about/company01_1.png"
                alt="한양미래연구소 비전"
                width={570}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-point">
                한 사람의 인생을 바꾸는 교육을 제공합니다
              </h3>
              <p className="text-gray-700 leading-relaxed">
                체험교육은 삶의 방향에 영향을 주는 가장 중요한 &lsquo;경험&rsquo;입니다. 그 &lsquo;경험&rsquo;이야말로 한 사람의 인생과 방향을 크게 바꿀 수 있는 기회이며, 미래를 위한 투자이기 때문입니다. 우리는 체험교육을 통해 미래를 바꾸는 씨앗을 심는 일을 합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                교육이라는 미래에 투자하고 함께 성장하며 함께 사회적 가치를 만들어나가는 스타트업을 목표로 합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                한양미래연구소는 단순한 교육이 아닙니다. 평생 꿈을 보육합니다. 매일 바뀌는 세상에 적응하며, 생존하기 위해 새로운 기술과 이론을 체험하고, 자기주도적 학습을 가능하게 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 기업소개 */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            기업소개
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/3 flex justify-center">
              <Image
                src="/images/about/logo02.png"
                alt="한양미래연구소 로고"
                width={280}
                height={120}
                className="w-auto h-auto max-w-[280px]"
              />
            </div>
            <div className="w-full lg:w-2/3 space-y-5">
              <p className="text-gray-700 leading-relaxed">
                한양미래연구소는 2020년에 하이스타터 법인 수립 이후 현재까지 전국에 약 <strong className="text-point">200명</strong>의 강사풀 네트워크를 토대로 <strong className="text-point">72개이상</strong>의 커리큘럼으로 구성된 찾아가는 체험교실과 경진대회 대비와 청소년 토요 캠프를 포함한 청소년 캠프, 축제를 위한 체험부스도 운영 중에 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                메이커 융합 교육, 코딩 교육, STEAM 교육, 창업 교육과 같이 4차산업혁명 시대에 한 사람의 인생을 바꿀 수 있는 체험교육을 제공합니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-point">200명</p>
                  <p className="text-sm text-gray-500 mt-1">강사 네트워크</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-point">72종+</p>
                  <p className="text-sm text-gray-500 mt-1">커리큘럼</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-point">245개처</p>
                  <p className="text-sm text-gray-500 mt-1">참여 학교·기관</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-point">17,150명</p>
                  <p className="text-sm text-gray-500 mt-1">참여 인원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 연혁 및 교육 진행 이력 */}
      <section className="py-16 md:py-20 px-6 bg-white" aria-label="연혁">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            연혁 및 교육 진행 이력
          </h2>
          <div className="relative">
            {/* Vertical connecting line */}
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
                          <span>{event.title}</span>
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

      {/* 5. 핵심 가치 */}
      <section className="py-16 md:py-20 px-6 bg-gray-50" aria-label="핵심 가치">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            핵심 가치
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-bold text-point mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 프로그램 소개 */}
      <section className="py-16 md:py-20 px-6 bg-white" aria-label="프로그램 소개">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            프로그램 소개
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {program.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">대상:</span> {program.target}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">기간:</span> {program.duration}
                  </p>
                  <p className="text-sm font-semibold text-point">
                    {program.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 교육 현황 */}
      <section className="py-16 md:py-20 px-6 bg-point text-white" aria-label="교육 현황">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            교육 현황
          </h2>
          <p className="text-center text-lg md:text-xl mb-10 opacity-90">
            한양 미래 연구소는 지금까지 총 <strong className="text-2xl md:text-3xl">17,150명</strong>의 학생들과 함께했습니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold">17,150<span className="text-xl">명</span></p>
                <p className="text-sm mt-2 opacity-80">참여 인원</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold">245<span className="text-xl">개처</span></p>
                <p className="text-sm mt-2 opacity-80">참여 학교·기관</p>
              </div>
            </div>
            <div className="w-full md:w-auto max-w-[400px]">
              <Image
                src="/images/about/company01_3.png"
                alt="교육 현황"
                width={400}
                height={280}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. 협력 기관 */}
      <section className="py-16 md:py-20 px-6 bg-gray-50" aria-label="협력 기관">
        <div className="max-w-[1170px] 2xl:max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            협력 기관
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-2 py-3 text-xs md:text-sm text-gray-600 font-medium text-center hover:border-point hover:text-point transition-colors duration-200"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
