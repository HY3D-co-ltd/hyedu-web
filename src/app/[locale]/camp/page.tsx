import type { Metadata } from 'next';
import Image from 'next/image';
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
        ? '캠프 | 한양청소년캠프·토요캠프·경진대회 대비 캠프'
        : 'Camps | Hanyang Youth Camp · Saturday Camp · Competition Camp',
    description:
      locale === 'ko'
        ? '한양미래연구소 캠프: 한양청소년캠프(단체), 토요캠프(개인), 경진대회 대비 캠프. 3D프린팅, STEAM, AI, IoT, 자율주행 등 다양한 캠프 프로그램.'
        : 'Hanyang Future Lab camps: Hanyang youth camp (group), Saturday camp (individual), competition prep camp. 3D printing, STEAM, AI, IoT, autonomous driving programs.',
    keywords:
      locale === 'ko'
        ? ['청소년 캠프', '한양청소년캠프', 'STEAM 캠프', 'AI 캠프', 'IoT 캠프', '3D프린팅 캠프', '경진대회 대비 캠프', '토요 캠프']
        : ['youth camp', 'STEAM camp', 'AI camp', 'IoT camp', '3D printing camp', 'competition camp'],
  };
}

/* ── camp card data ── */

type CampCategory = 'general' | 'special' | 'competition';

interface CampCard {
  image: string;
  category: CampCategory;
  categoryLabel: string;
  title: string;
  description: string;
  target: string;
  duration: string;
  price: string;
}

const categoryColors: Record<CampCategory, string> = {
  general: 'bg-[#336666] text-white',
  special: 'bg-amber-500 text-white',
  competition: 'bg-blue-600 text-white',
};

const camps: CampCard[] = [
  {
    image: '/images/programs/detail/youth_camp_all/hyedu_program_4_campus_tour.png',
    category: 'general',
    categoryLabel: '일반 캠프',
    title: '한양청소년캠프',
    description: '한양대 ERICA에서 메이커 꿈을 키우자!',
    target: '초등 / 중등 / 고등',
    duration: '1일',
    price: '1인 120,000원',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_maker01.png',
    category: 'special',
    categoryLabel: '특화 캠프',
    title: '한양 3D 메이커톤',
    description: '나만의 3D 발명품을 제작하자!',
    target: '중등 / 고등',
    duration: '1일',
    price: '별도 문의',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_steam01.png',
    category: 'special',
    categoryLabel: '특화 캠프',
    title: '한양 STEAM 캠프',
    description: 'STEM에 A를 더하다!',
    target: '초등',
    duration: '1일',
    price: '1인 120,000원',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_start01.png',
    category: 'special',
    categoryLabel: '특화 캠프',
    title: '한양 창업 아이디어톤',
    description: '청소년 창업을 위한 전문 창업 교육',
    target: '고등',
    duration: '1일',
    price: '별도 문의',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_coding01.png',
    category: 'special',
    categoryLabel: '특화 캠프',
    title: '한양 인공지능 캠프',
    description: '4차산업혁명의 핵심, 인공지능 개발!',
    target: '초등 / 중등 / 고등',
    duration: '1일',
    price: '별도 문의',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_coding03.png',
    category: 'competition',
    categoryLabel: '경진대회 대비',
    title: '한양 피지컬 코딩 캠프',
    description: '손으로 만지며 배우는 중급 코딩 캠프',
    target: '초등 / 중등 / 고등',
    duration: '1일',
    price: '별도 문의',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_coding04.png',
    category: 'competition',
    categoryLabel: '경진대회 대비',
    title: '한양 IoT 사물인터넷 캠프',
    description: 'IoT 기술을 배우고 스마트 디바이스 제작!',
    target: '중등 / 고등',
    duration: '1일',
    price: '1인 385,000원',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_coding05.png',
    category: 'competition',
    categoryLabel: '경진대회 대비',
    title: 'ICT 스마트팜 캠프',
    description: '양평에서 진행되는 스마트팜 전문 캠프',
    target: '초등 / 중등 / 고등',
    duration: '1일',
    price: '별도 문의',
  },
  {
    image: '/images/programs/detail/youth_camp_all/youth_camp_coding02.png',
    category: 'competition',
    categoryLabel: '경진대회 대비',
    title: '한양 언플러그드 로봇&블록코딩 캠프',
    description: '쉽고 재미있게 배우는 초급 코딩 캠프',
    target: '초등 / 중등',
    duration: '1일',
    price: '별도 문의',
  },
];

/* ── camp type comparison ── */
const campTypes = [
  {
    label: '한양청소년 캠프',
    content: '4차산업기술 체험과 비전 수립',
    mode: '학교/기업 단체 맞춤형',
    location: '한양대 ERICA 캠퍼스',
    cost: '일일 120,000원\n1박2일 300,000원\n2박3일 450,000원',
  },
  {
    label: '한양청소년 토요캠프',
    content: '토요일 1일 집중 체험',
    mode: '개인 네이버 예약',
    location: '한양대 ERICA 또는 지방',
    cost: '1일 체험 120,000원',
  },
  {
    label: '프리미엄 경진대회 대비 캠프',
    content: '경진대회 장/단기 대비',
    mode: '개인 네이버 예약',
    location: '한양대 ERICA 또는 지방',
    cost: '4회 399,000원',
  },
];

/* ── technology icons ── */
const techItems = [
  { image: '/images/programs/detail/shared/talent_icon01_01.png', label: '3D프린팅/3D펜' },
  { image: '/images/programs/detail/shared/talent_icon01_02.png', label: 'VR/AR' },
  { image: '/images/programs/detail/shared/talent_icon01_03.png', label: '드론' },
  { image: '/images/programs/detail/shared/talent_icon01_04.png', label: '로봇 코딩' },
  { image: '/images/programs/detail/shared/talent_icon01_05.png', label: '자율주행자동차' },
  { image: '/images/programs/detail/shared/talent_icon01_06.png', label: '기업가정신 교육' },
];

/* ── program figures ── */
const programs = [
  {
    image: '/images/programs/detail/hanyang_convergence_camp/program_figure_1_4th_industrial_and_youth_entrepreneurship.png',
    title: '4차 산업혁명과\n청소년 기업가정신',
    description: '기업가정신을 바탕으로 4차 산업혁명 시대의 핵심 기술을 이해하고 미래 비전을 수립합니다.',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/program_figure_2_relationship_traning.png',
    title: '관계 형성 트레이닝',
    description: '팀워크와 소통을 통해 협업 역량을 키우고 리더십을 함양합니다.',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/program_figure_3_pbl_class.png',
    title: '융합형 창의 인재를\n양성하는 PBL 클래스',
    description: '프로젝트 기반 학습(PBL)을 통해 문제 해결 능력과 창의적 사고력을 키웁니다.',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/program_figure_4_campus_tour.png',
    title: '한양대 캠퍼스 투어',
    description: '한양대학교 ERICA 캠퍼스를 둘러보며 대학 생활을 체험합니다.',
  },
];

/* ── maker activities ── */
const makerActivities = [
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_1_3d_printer.png',
    title: '디자인씽킹을 통한\n3D 창작품 만들기',
    description: '창의 사고 기법을 통해 아이디어를 생각해내고 실제 3D 프린터를 작동시켜 개별 작품을 제작',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_2_3d_pen.png',
    title: '3D 펜으로 설계하는\n나의 인생 좌우명',
    description: '3D펜 작동법과 원리를 배우고 이를 이용하여 자신의 인생 좌우명을 정하고 개별작품으로 제작',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_3_vr_movie.png',
    title: 'VR을 활용한\n나만의 프로필 영상 제작',
    description: '360도 카메라를 활용하여 개인 프로필 영상을 촬영한 뒤, VR카드보드 뷰어를 제작하여 감상',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_4_ar_contents.png',
    title: 'AR을 활용한 인터렉티브\n영상 콘텐츠 제작',
    description: '시청자와 상호작용하는 인터렉티브 영상을 제작한 뒤, AR 홀로그램 뷰어로 영상 콘텐츠 체험',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_5_drone_steam.png',
    title: '드론과 함께 하는\nSTEAM 교육',
    description: '기초 호버링 및 기압계 유무를 비교하며 드론을 체험하고, 팀을 나누어 \'드론 크러쉬 대회\' 진행',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_6_robot_coding.png',
    title: '융합 사고력을 키우는\n로봇코딩 교육',
    description: '마인드 맵을 통해 소프트웨어의 개념을 이해하고 스마트폰/앱/명령카드를 이용해 코딩로봇 제어',
  },
  {
    image: '/images/programs/detail/hanyang_convergence_camp/maker_activity_7_autonomous_car.png',
    title: '실습형 공학수업\n인공지능 자율주행자동차',
    description: '코딩을 통해 자율주행 알고리즘을 학습하고 통신을 통해 직접 제어함으로써 문제 해결 능력 향상',
  },
];

/* ── reviews ── */
const reviews = [
  {
    name: 'OO중학교 2학년\n김OO 학생',
    text: '캠프에서 3D프린터로 직접 작품을 만들어보니까 정말 신기했어요. 평소에 관심이 있었는데 이렇게 직접 해볼 수 있는 기회가 없었거든요. 선생님들도 친절하게 알려주시고, 다음에 또 오고 싶어요!',
    date: '4월 7일',
  },
  {
    name: 'OO고등학교 1학년\n박OO 학생',
    text: '드론 체험이 가장 재미있었어요! 직접 조종해보는 것도 좋았고, 드론이 어떤 원리로 날아가는지 배울 수 있어서 유익했습니다. 친구들이랑 드론 크러쉬 대회도 했는데 정말 즐거웠어요.',
    date: '7월 21일',
  },
  {
    name: 'OO초등학교 6학년\n이OO 학부모님',
    text: '아이가 캠프 다녀온 후에 과학에 대한 관심이 훨씬 높아졌어요. 특히 VR 체험을 통해 가상현실에 대한 개념을 잡은 것 같아 신청하길 잘했다는 생각이 듭니다. 감사합니다.',
    date: '9월 16일',
  },
  {
    name: 'OO중학교\n학부모님',
    text: '로봇코딩 수업이 아이 수준에 맞게 진행되어서 좋았습니다. 코딩이 어렵다고만 생각했었는데, 쉽고 재미있게 배울 수 있었다고 하네요. 캠퍼스 투어까지 해주셔서 아이가 대학 생활에 대한 꿈도 키운 것 같아요.',
    date: '11월 1일',
  },
];

/* ── FAQ ── */
const faqs = [
  {
    question: '캠프의 안전관리는 어떻게 진행 되고 있나요?',
    answer: '기숙사관리, 식단관리, 건강관리, 생활관리, 교우관리 등 학생들의 안전한 캠프 생활을 위해 전담 관리 인력을 배치하여 운영하고 있습니다. 또한, 모든 참가 학생은 상해보험에 가입됩니다.',
  },
  {
    question: '캠프가 진행되는 숙소는 어떤 환경인가요?',
    answer: '한양대학교 ERICA캠퍼스 기숙사를 이용하며, 2인 1실 기준으로 운영됩니다. 기숙사 내에 샤워실, 세탁실 등 편의시설을 이용할 수 있습니다.',
  },
  {
    question: '캠프를 운영하고 수업을 진행하는 멘토 선생님들은 어떤 분들이신가요?',
    answer: '교육 전문 자격증을 소유하고 200~300시간 이상의 교육을 받은 전문 강사진으로 구성되어 있습니다. 4차산업혁명 기술 분야의 전문가들이 직접 수업을 진행합니다.',
  },
  {
    question: '개인 준비물이 있나요?',
    answer: 'USB(8GB 이상), 필기도구, 여벌옷, 세면도구 등을 준비해 주시면 됩니다. 자세한 안내는 캠프 신청 후 별도로 안내드립니다.',
  },
  {
    question: '궁금한 점은 어디로 문의하면 되나요?',
    answer: '전화 070-8064-0829 또는 카카오톡 채널 "한양미래연구소"로 문의해 주세요. 평일 오전 9시~오후 6시(점심 12시~1시 제외)에 상담 가능합니다.',
  },
];

/* ── education features ── */
const features = [
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_1_technology_education.png',
    title: '기술직업 체험교육',
    description: '3D게임 캐릭터 디자이너, 드론조종사 등 4차산업혁명 기술을 이용한 미래 유망 직업을 탐색하고 기업가 정신을 함양',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_2_pbl_class.png',
    title: '사고력을 기르는 PBL 수업',
    description: '문제를 해결하는 역량을 키워나감과 동시에 자기주도적 학습을 바탕으로 생각하는 힘을 기르는 수업',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_3_collaborate_troubleshoot.png',
    title: '협동하며 문제해결',
    description: '그룹학습을 통해 팀원들과의 정보공유 및 상호작용으로 문제를 해결하며 배려와 존중의 정신을 배움',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_4_individual_portfolio.png',
    title: '개별 결과물과 포트폴리오',
    description: '메이커 액티비티 활동을 통해 개별 결과물을 제작하고 메이커 활동 포트폴리오를 만들 수 있음',
  },
];

export default async function CampPage({
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
          { name: '캠프', href: `/${locale}/camp` },
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="bg-[#336666] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-white">
              <span className="text-sm tracking-widest opacity-80 uppercase">Youth Camp</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">청소년 캠프</h1>
              <p className="text-lg leading-relaxed opacity-90">
                융합형 창의인재 양성을 위한
                <br />
                탐구·체험 중심의 캠프입니다
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={`/${locale}/contact`}
                  className="inline-block bg-white text-[#336666] font-semibold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors text-sm"
                >
                  교육 신청하기
                </a>
                <a
                  href="https://drive.google.com/file/d/1dUVYRHxN3hCptN1VLIN8h_9yV1nuwioT/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white text-white font-semibold px-6 py-2.5 rounded hover:bg-white/10 transition-colors text-sm"
                >
                  커리큘럼 보기
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <ul className="flex flex-wrap gap-3 justify-center md:justify-end">
                {['3D프린팅', 'VR/AR', '드론', '로봇 코딩', '자율주행자동차', '기업가정신'].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full border border-white/30"
                    >
                      {tag}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 캠프 소개 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            캠프 소개
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              <span className="text-point">한양청소년캠프</span>
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              기업가 정신을 바탕으로 미래 기술의 원리를 이해하고 체험합니다.
              <br className="hidden md:block" />
              3D프린팅, VR/AR, 드론, 로봇코딩, 자율주행자동차 등
              <br className="hidden md:block" />
              다양한 4차산업혁명 기술을 직접 체험하는 융합형 캠프입니다.
            </p>
          </div>

          {/* 기술 아이콘 */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-12 max-w-3xl mx-auto">
            {techItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <span className="text-xs md:text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* 캠프 유형 비교 테이블 */}
          <div className="mt-16">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center">캠프 유형 안내</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-center border border-gray-300 w-24 md:w-32">
                      구분
                    </th>
                    {campTypes.map((ct) => (
                      <th
                        key={ct.label}
                        className="bg-[#336666] text-white font-semibold px-4 py-3 text-center border border-gray-300"
                      >
                        {ct.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['내용', '운영방식', '장소', '비용'] as const).map((rowLabel) => {
                    const keyMap = {
                      내용: 'content',
                      운영방식: 'mode',
                      장소: 'location',
                      비용: 'cost',
                    } as const;
                    const key = keyMap[rowLabel];
                    return (
                      <tr key={rowLabel} className="border-t border-gray-200">
                        <th className="bg-gray-50 text-[#336666] font-semibold px-4 py-3 text-center border border-gray-200 whitespace-nowrap">
                          {rowLabel}
                        </th>
                        {campTypes.map((ct) => (
                          <td
                            key={ct.label}
                            className="px-4 py-3 text-gray-700 text-center border border-gray-200 whitespace-pre-line"
                          >
                            {ct[key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 요금 안내 */}
          <div className="mt-12 max-w-lg mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 text-center">요금 안내</h3>
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">일일 캠프</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    120,000원 (1인 기준)
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">1박 2일</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    300,000원
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">2박 3일</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    450,000원
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-500 mt-3 text-center">
              ※ 최소 인원 25명 기준 / 단체 신청
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 캠프 프로그램 목록 (youth_camp_all) ───────── */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            캠프 프로그램
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <article
                key={camp.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={camp.image}
                    alt={camp.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded ${categoryColors[camp.category]}`}
                  >
                    {camp.categoryLabel}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{camp.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{camp.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{camp.target}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{camp.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-point">{camp.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 프로그램 안내 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative pl-4 border-l-4 border-[#336666]">
            프로그램 안내
          </h2>

          {/* 프로그램 구성 */}
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mt-8 mb-10">
            프로그램 구성
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={program.image}
                    alt={program.title.replace('\n', ' ')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-2 whitespace-pre-line leading-snug">
                    {program.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 메이커 액티비티 */}
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mt-16 mb-10">
            메이커 액티비티
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {makerActivities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={activity.image}
                    alt={activity.title.replace('\n', ' ')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-2 whitespace-pre-line leading-snug">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 프로그램 진행 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            프로그램 진행
          </h2>
          <div className="max-w-2xl mx-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-4 text-center w-20 md:w-28 align-top">
                    도입
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-700">
                    <p className="font-semibold text-gray-900 mb-2">미래 기술의 원리 이해 및 체험</p>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>4차 산업혁명 기술의 역사, 종류, 구성 부품, 작동원리 알아보기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>첨단 장비를 활용하여 미래 기술 체험하기</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-4 text-center align-top">
                    전개
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-700">
                    <p className="font-semibold text-gray-900 mb-2">
                      미래 기술 실습을 통해 나만의 창작물 제작하기
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>첨단 장비와 소프트웨어를 활용하여 미래 기술 실습하기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>학생이 능동적으로 참여하여 나만의 창작물 제작</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-t border-b border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-4 text-center align-top">
                    마무리
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-700">
                    <p className="font-semibold text-gray-900 mb-2">
                      미래 기술 관련 미래유망직업 진로설계
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>미래 기술의 사업 발전 가능성에 대해 논의하기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>
                          미래 기술을 활용한 유망직업을 배우며 진로 설계의 폭 넓혀가기
                        </span>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───────── 교육 특징 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            교육 특징
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-lg p-5 text-center">
                <div className="relative w-full aspect-square max-w-[180px] mx-auto mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 교육 후기 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            교육 후기
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.date}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-8 border border-gray-200 rounded-lg p-5 md:p-6 bg-white"
              >
                <div className="flex-shrink-0 text-center w-full md:w-48">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 whitespace-pre-line">
                    {review.name}
                  </p>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="flex-1 text-sm md:text-base text-gray-600 leading-relaxed">
                  {review.text}
                </p>
                <div className="flex-shrink-0 text-sm text-gray-400 md:self-start">
                  {review.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                  <span>Q. {faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 py-4 text-gray-600 leading-relaxed text-sm md:text-base bg-white">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 오시는 길 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            오시는 길
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.944032697291!2d126.83237666564264!3d37.29646024730607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6ef2f5a7cb73%3A0x26b59cb3d9af4a46!2z7ZWc7JaR64yA7ZWZ6rWQIEVSSUNB7Lqg7Y287Iqk!5e0!3m2!1sko!2skr!4v1556386346348!5m2!1sko!2skr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="한양대학교 ERICA 위치"
              />
            </div>
            <div className="md:w-1/2 flex items-center">
              <div>
                <h3 className="font-bold text-point text-lg mb-2">캠프 장소</h3>
                <p className="text-gray-700 leading-relaxed">
                  경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA
                </p>
                <div className="mt-4 text-gray-600 text-sm space-y-1">
                  <p>문의 : 070-8064-0829</p>
                  <p>평일 오전 9:00~오후 6:00 (점심 12:00~13:00)</p>
                  <p>주말·공휴일 휴무</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 취소 환불 규정 ───────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative pl-4 border-l-4 border-[#336666]">
            취소 환불 규정
          </h2>
          <div className="max-w-md mx-auto mb-8">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">
                    수업 15일 전 취소
                  </th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    100% 환불
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">
                    수업 12일 전 취소
                  </th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    50% 환불
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">
                    수업 10일 전 취소
                  </th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">
                    30% 환불
                  </td>
                </tr>
                <tr className="border-t border-b border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">
                    수업 7일 이내
                  </th>
                  <td className="px-4 py-3 text-red-600 bg-white text-center font-semibold">
                    취소·환불 불가
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">-</span>
                <span>환불 업무시간 : 평일 오전 10:00~오후 06:00 (점심시간 : 오후 12:00~13:00)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">-</span>
                <span>
                  토·일요일 및 국·공휴일은 취소 및 변경신청이 접수 되지 않으며 취소 일수에서
                  제외됩니다.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">-</span>
                <span>업무시간 이후 취소요청시 익일 기준으로 처리됩니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
