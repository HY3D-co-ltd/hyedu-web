import type { Metadata } from 'next';
import Image from '@/components/ui/Img';
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
        ? '창의체험 부스 운영 | 3D프린팅·VR·AR·드론·로봇 체험 부스'
        : 'Creative Experience Booth Operation | 3D Printing · VR · AR · Drone · Robot',
    description:
      locale === 'ko'
        ? '한양미래연구소 창의체험 부스 운영: 4차산업 혁명 메이커엑티비티 프로그램을 행사나 축제에서 부스 형식으로 운영합니다. 3D프린팅, 3D펜, VR, AR, 드론, 로봇코딩, 자율주행 체험 부스.'
        : 'Hanyang Future Lab booth operation: 4th industrial revolution maker-activity programs operated as booths at events and festivals.',
    keywords:
      locale === 'ko'
        ? ['창의체험 부스', 'AI교육', '로봇교육', '부스 운영', '3D프린팅 부스', 'VR 부스', 'AR 부스', '드론 부스', '로봇코딩 부스', '메이커 액티비티']
        : ['experience booth', 'AI education', 'robot education', 'booth operation', '3D printing booth', 'VR booth', 'AR booth', 'drone booth', 'robot coding booth'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const activities: { image: string; title: Bi; description: Bi }[] = [
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_1_3d_printer.png',
    title: {
      ko: '디자인씽킹을 통한\n3D 창작품 만들기',
      en: '3D Creations Through\nDesign Thinking',
    },
    description: {
      ko: '창의 사고 기법을 통해 아이디어를 생각해내고 실제 3D 프린터를 작동시켜 개별 작품을 제작',
      en: 'Generate ideas via creative thinking and produce individual works on real 3D printers.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_2_3d_pen.png',
    title: {
      ko: '3D 펜으로 설계하는\n나의 인생 좌우명',
      en: 'My Life Motto\nDesigned with a 3D Pen',
    },
    description: {
      ko: '3D펜 작동법과 원리를 배우고 이를 이용하여 자신의 인생 좌우명을 정하고 개별작품으로 제작',
      en: 'Learn 3D-pen operation and principles, then design and build a personal piece expressing your life motto.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_3_vr_movie.png',
    title: { ko: 'VR을 활용한\n나만의 프로필 영상 제작', en: 'Your Own\nProfile Video with VR' },
    description: {
      ko: '360도 카메라를 활용하여 개인 프로필 영상을 촬영한 뒤, VR카드보드 뷰어를 제작하여 감상',
      en: 'Shoot a personal profile video with a 360° camera, then build and use a VR cardboard viewer.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_4_ar_contents.png',
    title: {
      ko: 'AR을 활용한 인터렉티브\n영상 콘텐츠 제작',
      en: 'Interactive Video Content\nwith AR',
    },
    description: {
      ko: '시청자와 상호작용하는 인터렉티브 영상을 제작한 뒤, AR 홀로그램 뷰어로 영상 콘텐츠 체험',
      en: 'Produce interactive videos that respond to the viewer and experience them on an AR hologram viewer.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_5_drone_steam.png',
    title: { ko: '드론과 함께 하는\nSTEAM 교육', en: 'STEAM Education\nwith Drones' },
    description: {
      ko: "기초 호버링 및 기압계 유무를 비교하며 드론을 체험하고, 팀을 나누어 '드론 크러쉬 대회' 진행",
      en: 'Experience basic hovering and compare drones with/without barometers, then run a team-based Drone Crush competition.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_6_robot_coding.png',
    title: {
      ko: '융합 사고력을 키우는\n로봇코딩 교육',
      en: 'Robot Coding\nfor Convergent Thinking',
    },
    description: {
      ko: '마인드 맵을 통해 소프트웨어의 개념을 이해하고 스마트폰/앱/명령카드를 이용해 코딩로봇 제어',
      en: 'Understand software concepts via mind-mapping and control coding robots via smartphone, app, and command cards.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_7_autonomous_car.png',
    title: {
      ko: '실습형 공학수업\n인공지능 자율주행자동차',
      en: 'Hands-on Engineering\nAI Autonomous Driving',
    },
    description: {
      ko: '코딩을 통해 자율주행 알고리즘을 학습하고 통신을 통해 직접 제어함으로써 문제 해결 능력 향상',
      en: 'Learn autonomous-driving algorithms through coding and control via communications — building problem-solving skills.',
    },
  },
];

const features: { image: string; title: Bi; description: Bi }[] = [
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_1_technology_education.png',
    title: { ko: '기술직업 체험교육', en: 'Tech Career Experience' },
    description: {
      ko: '3D게임 캐릭터 디자이너, 드론조종사 등 4차산업혁명 기술을 이용한 미래 유망 직업을 탐색하고 기술 이해를 바탕으로 기업가 정신을 함양할 수 있도록 함',
      en: 'Explore promising future careers powered by 4th-IR tech (3D-game character designer, drone pilot, etc.) and build an entrepreneurial mindset grounded in technical understanding.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_2_pbl_class.png',
    title: { ko: '사고력을 기르는 PBL 수업', en: 'PBL Classes That Grow Thinking Skills' },
    description: {
      ko: '단순히 정답을 맞히는 것이 아니라 문제를 해결하는 역량을 키워나감과 동시에 자기주도적 학습을 바탕으로 생각하는 힘을 기를 수 있도록 하는 수업',
      en: 'Beyond finding the right answer — classes that grow problem-solving skills and critical thinking through self-directed learning.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_3_collaborate_troubleshoot.png',
    title: { ko: '협동하며 문제해결', en: 'Collaborative Problem-solving' },
    description: {
      ko: '혼자 해결할 수 없는 문제를 그룹학습을 통해 팀원들과의 정보공유 및 상호작용으로 해결할 수 있으며 이러한 과정을 통해 배려와 존중의 정신을 배울 수 있음',
      en: 'Solve problems collaboratively through group learning, sharing information, and interacting — building a spirit of care and respect along the way.',
    },
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_4_individual_portfolio.png',
    title: { ko: '개별 결과물과 포트폴리오', en: 'Individual Outputs & Portfolios' },
    description: {
      ko: '캠프 내 모든 메이커 액티비티는 프로그램 활동을 통해 개별 결과물을 제작하고 참여 학생은 이를 제공받아 메이커 활동 포트폴리오를 만들 수 있음',
      en: 'Every maker activity produces an individual output, which students take home to build a maker-activity portfolio.',
    },
  },
];

const reviews: { name: Bi; text: Bi; date: Bi }[] = [
  {
    name: {
      ko: 'OO초등학교 5학년 정OO 학부모님',
      en: 'Parent of a 5th-grade elementary student (Jung)',
    },
    text: {
      ko: '엄마랑 아빠랑 VR체험부스에 참여했던 정OO(엄마 이OO)입니다. 이 체험을 통해서 아들이 가상현실에 대한 개념을 제대로 잡은 것 같아요. 설명 듣기 전에 책으로만 대할 때는 무슨 이야기인지 흥미를 느끼지 못했는데 VR체험을 통해 흥미와 개념을 동시에 잡은 것 같아 신청 잘 했다는 생각이 듭니다. 열정적으로 설명해주신 선생님의 노력을 먼저 빼놓을 수 없겠지요. 다시 한 번 감사드립니다. 참 유치부 동생도 엄마 따라서 한 번 다녀왔는데 자기도 신청해 달라고 계속 조릅니다. 어쩌죠? 유치부 체험도 개강하셔야 할 것 같습니다.ㅎㅎ 아들은 부스체험이 언제 다시 열리냐고 묻곤 합니다. 수고하세요. 다음 체험 시간에 뵙도록 하겠습니다.',
      en: 'We joined the VR booth as a family and my son finally grasped the concept of virtual reality. Before, he wasn\'t interested reading about it, but the hands-on VR experience sparked both interest and understanding at the same time. The instructor\'s enthusiastic explanation made all the difference. Thank you! His little sibling came along and keeps asking to sign up too — maybe you should open a kindergarten session! My son keeps asking when the booth comes back. See you next time.',
    },
    date: { ko: '11월 2일', en: 'November 2' },
  },
  {
    name: {
      ko: '00초등학교 2학년\n000 학생',
      en: '2nd-grade elementary student',
    },
    text: {
      ko: '엄마랑 아빠랑 체험 같이 해서 좋아요. 3D펜이 제일 재미있었어요. 직접 반지도 만들고 제가 좋아하는 캐릭터도 만들고 하는데 너무 재미있어서 3D펜 하나 갖고 싶었어요! 엄마한테 사달라고 얘기하고 있어요.',
      en: 'I loved doing the activity together with mom and dad. The 3D pen was the most fun — I made a ring and my favorite character. It was so fun I really want a 3D pen of my own! I keep asking mom to get me one.',
    },
    date: { ko: '7월 28일', en: 'July 28' },
  },
  {
    name: { ko: '00초등학교\n학부모님', en: 'Elementary school\nparent' },
    text: {
      ko: '우리 아이가 평소에는 장난감만 사달라고 하는데, 부스에서 체험하고 난 이후에는 3D펜을 사달라고 해요. 너무 기특하네요^^ 3D펜은 아이들 창의력 개발에도 좋고, 교육으로도 사용할 수 있으니 얼마든지 사줄 수 있어요. 그때 그냥 지나가지 않고 부스에서 3D펜 체험하고 가길 너무 잘한 것 같아요. 앞으로도 이런 기회 많이 있었으면 좋겠네요. 그때는 주변 엄마들도 같이 데리고 가야겠어요....^^',
      en: 'My child usually only asks for toys, but after the booth experience they started asking for a 3D pen. So proud! A 3D pen helps with creativity and works for learning too — I\'m happy to buy one. I\'m so glad we stopped at the booth instead of walking past. Hoping for many more opportunities like this — I\'ll bring the other parents along next time!',
    },
    date: { ko: '5월 15일', en: 'May 15' },
  },
];

export default async function BoothPage({
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
          { name: isKo ? '창의체험 부스 운영' : 'Creative Experience Booth', href: `/${locale}/booth` },
        ]}
      />

      {/* Hero */}
      <section className="bg-point py-16 md:py-24 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-white">
              <span className="text-sm tracking-widest opacity-80 uppercase">
                Maker Booth Operation
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {isKo ? '창의체험 부스 운영' : 'Creative Experience Booth'}
              </h1>
              <p className="text-lg leading-relaxed opacity-90">
                {isKo ? (
                  <>
                    현장에서 가족과 함께, 친구와 함께
                    <br />
                    생생하게 체험하는 4차 산업혁명 메이커 액티비티 프로그램
                  </>
                ) : (
                  <>
                    On-site experiences for families and friends
                    <br />
                    — 4th-IR maker-activity programs, live and hands-on.
                  </>
                )}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={`/${locale}/contact`}
                  className="inline-block bg-white text-point font-semibold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors text-sm"
                >
                  {isKo ? '교육 신청하기' : 'Apply'}
                </a>
                <a
                  href="https://drive.google.com/file/d/1dUVYRHxN3hCptN1VLIN8h_9yV1nuwioT/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white text-white font-semibold px-6 py-2.5 rounded hover:bg-white/10 transition-colors text-sm"
                >
                  {isKo ? '커리큘럼 보기' : 'View Curriculum'}
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <ul className="flex flex-wrap gap-3 justify-center md:justify-end">
                {(isKo
                  ? ['3D프린팅', '3D펜', 'VR/AR', '드론', '로봇 코딩', '자율주행자동차']
                  : ['3D Printing', '3D Pen', 'VR/AR', 'Drones', 'Robot Coding', 'Autonomous Driving']
                ).map((tag) => (
                  <li
                    key={tag}
                    className="bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full border border-white/30"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 소개 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-point">
            {isKo ? '교육 소개' : 'About the Booth'}
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              <span className="text-point">
                {isKo ? '창의체험 부스 운영' : 'Creative Experience Booth'}
              </span>
              {isKo ? '은' : ''}
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {isKo ? (
                <>
                  4차산업 혁명 메이커엑티비티 프로그램을 행사나 축제에서 부스 형식으로 운영합니다.
                  <br className="hidden md:block" />
                  학생들은 선생님의 친절한 설명과 흥미로운 엑티비티 워크샵을 통해 실제로
                  <br className="hidden md:block" />
                  창작물을 만들어내며 4차 산업혁명의 기술과 개념에 대해 이해합니다.
                </>
              ) : (
                <>
                  We bring 4th-IR maker-activity programs to events and festivals as booths.
                  <br className="hidden md:block" />
                  Through friendly guidance and engaging workshops, students build real creations
                  <br className="hidden md:block" />
                  while learning the technology and concepts of the 4th Industrial Revolution.
                </>
              )}
            </p>
          </div>

          {/* 프로그램 개요 */}
          <div className="max-w-3xl mx-auto mt-12">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              {isKo ? '프로그램 개요' : 'Program Overview'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <tbody>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-point font-semibold px-4 py-3 text-left w-24 md:w-32 align-top whitespace-nowrap">
                      {isKo ? '대상' : 'Target'}
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      <ul className="space-y-1">
                        {(isKo
                          ? [
                              '4차 산업혁명을 이끌어나갈 창업 메이커를 꿈꾸는 초·중·고등학생',
                              '교내 행사나 축제로 특별한 교육부스 운영을 기획하는 학교',
                              '관내 학교를 대상으로, 지역 특색에 맞는 통합 프로그램을 지원하려는 지자체나 교육청',
                            ]
                          : [
                              'K-12 students aspiring to be startup-makers for the 4th Industrial Revolution',
                              'Schools planning special education booths for in-school events or festivals',
                              'Local governments or education offices offering region-specific integrated programs to local schools',
                            ]
                        ).map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">-</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-point font-semibold px-4 py-3 text-left whitespace-nowrap">
                      {isKo ? '시간' : 'Schedule'}
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo ? '주7일 모두 가능' : 'Available 7 days a week'}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-point font-semibold px-4 py-3 text-left whitespace-nowrap">
                      {isKo ? '장소' : 'Location'}
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo
                        ? '각 학교/청수관/문화센터/연수원/대학교 등'
                        : 'Schools, youth centers, culture centers, training centers, universities, etc.'}
                    </td>
                  </tr>
                  <tr className="border-t border-b border-gray-200">
                    <th className="bg-gray-50 text-point font-semibold px-4 py-3 text-left whitespace-nowrap">
                      {isKo ? '문의' : 'Contact'}
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo
                        ? '한양 미래 연구소 / 070-8064-0829'
                        : 'Hanyang Future Lab / +82-70-8064-0829'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 안내 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative pl-4 border-l-4 border-point">
            {isKo ? '프로그램 안내' : 'Program Guide'}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mt-8 mb-10">
            {isKo ? '창의체험 액티비티' : 'Creative Experience Activities'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.title.ko}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={activity.image}
                    alt={pick(activity.title, isKo).replace('\n', ' ')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-2 whitespace-pre-line leading-snug">
                    {pick(activity.title, isKo)}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pick(activity.description, isKo)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 진행 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-10">
            {isKo ? '프로그램 진행' : 'Program Flow'}
          </h3>
          <div className="max-w-2xl mx-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                {[
                  {
                    labelKo: '도입',
                    labelEn: 'Intro',
                    titleKo: '미래 기술의 원리 이해 및 체험',
                    titleEn: 'Understand and experience future-tech principles',
                    bulletsKo: [
                      '4차 산업혁명 기술의 역사, 종류, 구성 부품, 작동원리 알아보기',
                      '첨단 장비를 활용하여 미래 기술 체험하기',
                    ],
                    bulletsEn: [
                      'Explore history, types, components, and operating principles of 4th-IR tech',
                      'Experience future tech through advanced equipment',
                    ],
                  },
                  {
                    labelKo: '전개',
                    labelEn: 'Develop',
                    titleKo: '미래 기술 실습을 통해 나만의 창작물 제작하기',
                    titleEn: 'Build your own creation with future-tech practice',
                    bulletsKo: [
                      '첨단 장비와 소프트웨어를 활용하여 미래 기술 실습하기',
                      '학생이 능동적으로 참여하여 나만의 창작물 제작',
                    ],
                    bulletsEn: [
                      'Hands-on practice using advanced equipment and software',
                      'Students actively participate and build individual creations',
                    ],
                  },
                  {
                    labelKo: '마무리',
                    labelEn: 'Wrap-up',
                    titleKo: '미래 기술 관련 미래유망직업 진로설계',
                    titleEn: 'Career planning in future-tech professions',
                    bulletsKo: [
                      '미래 기술의 사업 발전 가능성에 대해 논의하기',
                      '미래 기술을 활용한 유망직업을 배우며 진로 설계의 폭 넓혀가기',
                    ],
                    bulletsEn: [
                      'Discuss future-tech business growth potential',
                      'Broaden career horizons by learning promising future-tech professions',
                    ],
                  },
                ].map((stage, i) => (
                  <tr key={i} className={`border-t border-gray-200 ${i === 2 ? 'border-b' : ''}`}>
                    <th className="bg-point text-white font-semibold px-4 py-4 text-center w-20 md:w-28 align-top">
                      {isKo ? stage.labelKo : stage.labelEn}
                    </th>
                    <td className="px-4 md:px-6 py-4 text-gray-700">
                      <p className="font-semibold text-gray-900 mb-2">
                        {isKo ? stage.titleKo : stage.titleEn}
                      </p>
                      <ul className="space-y-1 text-gray-600">
                        {(isKo ? stage.bulletsKo : stage.bulletsEn).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">-</span>
                            <span>{b}</span>
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
      </section>

      {/* 교육 특징 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-point">
            {isKo ? '교육 특징' : 'Education Features'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title.ko} className="bg-white rounded-lg p-5 text-center shadow-sm">
                <div className="relative w-full aspect-square max-w-[180px] mx-auto mb-4">
                  <Image
                    src={feature.image}
                    alt={pick(feature.title, isKo)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{pick(feature.title, isKo)}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pick(feature.description, isKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 후기 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-point">
            {isKo ? '교육 후기' : 'Reviews'}
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.date.ko}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-8 border border-gray-200 rounded-lg p-5 md:p-6"
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
                    {pick(review.name, isKo)}
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
                  {pick(review.text, isKo)}
                </p>
                <div className="flex-shrink-0 text-sm text-gray-400 md:self-start">
                  {pick(review.date, isKo)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-point">
            {isKo ? '오시는 길' : 'Location'}
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
                title={isKo ? '한양대학교 ERICA 위치' : 'Hanyang University ERICA location'}
              />
            </div>
            <div className="md:w-1/2 flex items-center">
              <div>
                <h3 className="font-bold text-point text-lg mb-2">
                  {isKo ? '본사' : 'Headquarters'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isKo
                    ? '경기도 안산시 상록구 한양대학로 55 5공학관 창업실'
                    : '55 Hanyangdaehak-ro, Engineering Bldg. 5 Startup Room, Sangnok-gu, Ansan, Gyeonggi-do'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative pl-4 border-l-4 border-point">
            {isKo ? '공지사항' : 'Notices'}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            <ul className="space-y-4 text-sm md:text-base text-gray-700">
              {(isKo
                ? [
                    { main: '체험 신청 마감은 해당 수업 일자 1주일 전 오후 2시입니다.', sub: '※ 정원이 찼을 경우, 일찍 마감될 수 있습니다.' },
                    { main: '본 프로그램은 최소 인원 20명을 기준으로 진행됩니다.', sub: '※ 프로그램 진행 인원이 20명 이하일 경우, 추가 요금이 발생할 수 있습니다.' },
                    { main: '프로그램 안내 문자(수업 일시, 주소)는 프로그램 기준 1-2일 전 오후 6시까지 체험 교육 담당자에게 발송됩니다.', sub: '' },
                    { main: '수업 10분전까지 입장 부탁드리며, 늦을 경우 일부 프로그램 체험이 제한될 수 있습니다.', sub: '' },
                    { main: '체험 교육 당일, 사전 연락 없이 지각 및 불참하실 경우, 당일 불참으로 처리되며 취소/보충/환불이 불가합니다.', sub: '' },
                    { main: '문의 : 070-8064-0829', sub: '' },
                  ]
                : [
                    { main: 'Applications close at 2 p.m. one week before the class date.', sub: '※ May close earlier if full.' },
                    { main: 'Programs run based on a minimum of 20 participants.', sub: '※ Additional fees may apply if fewer than 20 participants.' },
                    { main: 'A program guide SMS (date/time, address) is sent to the program coordinator by 6 p.m. 1–2 days before the program.', sub: '' },
                    { main: 'Please arrive 10 minutes before class — late arrivals may miss parts of the program.', sub: '' },
                    { main: 'No-shows or late arrivals without prior notice are treated as absent — no cancellation, make-up, or refund.', sub: '' },
                    { main: 'Inquiries: +82-70-8064-0829', sub: '' },
                  ]
              ).map((n, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-point flex-shrink-0 mt-2" />
                  <div>
                    {n.main}
                    {n.sub && (
                      <>
                        <br />
                        <span className="text-gray-500 text-sm">{n.sub}</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 취소 환불 규정 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative pl-4 border-l-4 border-point">
            {isKo ? '취소 환불 규정' : 'Cancellation & Refund Policy'}
          </h2>
          <div className="max-w-md mx-auto mb-8">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                {[
                  { ko: '수업 15일 전 취소', en: '15+ days before class', refundKo: '100% 환불', refundEn: '100% refund', highlight: false },
                  { ko: '수업 12일 전 취소', en: '12 days before class', refundKo: '50% 환불', refundEn: '50% refund', highlight: false },
                  { ko: '수업 10일 전 취소', en: '10 days before class', refundKo: '30% 환불', refundEn: '30% refund', highlight: false },
                  { ko: '수업 7일 이내', en: 'Within 7 days', refundKo: '취소·환불 불가', refundEn: 'No cancellation / refund', highlight: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-200 ${i === 3 ? 'border-b' : ''}`}
                  >
                    <th className="bg-point text-white font-semibold px-4 py-3 text-left">
                      {isKo ? row.ko : row.en}
                    </th>
                    <td className={`px-4 py-3 bg-white text-center font-semibold ${row.highlight ? 'text-red-600' : 'text-gray-700'}`}>
                      {isKo ? row.refundKo : row.refundEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-2 text-sm text-gray-500">
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
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
