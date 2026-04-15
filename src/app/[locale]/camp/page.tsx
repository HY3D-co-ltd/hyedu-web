import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd, FAQJsonLd, ReviewsJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '한양청소년캠프 | 4차산업혁명 체험 중심 캠프'
        : 'Hanyang Convergence Engineering Camp | Hanyang Future Lab',
    description:
      locale === 'ko'
        ? '융합형 창의인재 양성을 위한 탐구·체험 중심의 한양청소년캠프. 3D프린팅·VR·AR·드론·로봇코딩·자율주행·기업가정신 교육을 일일/1박2일/2박3일로 제공합니다.'
        : 'Hanyang Convergence Engineering Camp for creative talent development. 3D printing, VR/AR, drones, robot coding, autonomous driving, and entrepreneurship programs in 1-day / 1-night 2-day / 2-night 3-day formats.',
    keywords:
      locale === 'ko'
        ? ['한양청소년캠프', '청소년 캠프', '4차산업 캠프', '3D프린팅 캠프', 'VR 캠프', '드론 캠프', '로봇코딩 캠프', '경진대회 대비 캠프', '토요캠프']
        : ['Hanyang youth camp', 'convergence engineering camp', '3D printing camp', 'drone camp', 'robot coding camp', 'competition camp', 'Saturday camp'],
  };
}

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

// 교육 후기 (원본 4건)
const campReviews: { author: Bi; content: Bi; date: Bi }[] = [
  {
    author: { ko: '대전이*고 1학년 정○○', en: 'Daejeon Y** High School, 1st year, Jung' },
    content: {
      ko: '4차 산업혁명이라는 것에 대해서 잘 알지 못했는데 이번 캠프를 통해서 알게 되었습니다. 체험 위주로 개념과 원리를 이해할 수 있어서 좋았고 가장 좋았던 체험은 VR 체험이었어요. 캠프에서 만든 카드보드 뷰어로 집에서도 VR 체험을 계속 할 수 있을 것 같고 다음에도 이런 기회가 있으면 또 참여하고 싶어요!!!',
      en: 'I didn\'t know much about the 4th industrial revolution, but this camp introduced me to it. Learning concepts through hands-on activities was great, and my favorite was the VR experience. I can keep using the cardboard viewer I made at home, and I\'d love to join again next time!',
    },
    date: { ko: '4월 7일', en: 'April 7' },
  },
  {
    author: { ko: '서울**고 1학년 김○○', en: 'Seoul ** High School, 1st year, Kim' },
    content: {
      ko: '이번 캠프를 통해 직접 3D 프린팅을 해본 것이 가장 재밌었습니다. 미래에는 사람들이 원하는 제품들을 프린터기로 뽑을 수 있다는게 신기했습니다. 3D 프린팅으로 만든 제품들도 직접 만져볼 수 있어서 좋았어요. 캠프가 너무 빨리 지나간 것 같아요ㅠㅠ',
      en: 'Doing 3D printing myself was the most fun part of the camp. It\'s amazing that in the future people will be able to print out any product they want. I loved being able to touch the things I printed. The camp went by way too fast!',
    },
    date: { ko: '7월 21일', en: 'July 21' },
  },
  {
    author: { ko: '경기**중 2학년 성○○', en: 'Gyeonggi ** Middle School, 2nd year, Sung' },
    content: {
      ko: '한 가지 기술만 체험할 수 있는게 아니라 다양한 기술을 체험할 수 있어서 좋았어요. 4차산업혁명이 원지 몰랐는데 이 캠프를 통해서 우리가 많이 배워야 한다는 걸 깨달았습니다. 선생님들도 너무 재밌고 친구들하고 같이 조를 짜서 문제 푸는 것도 좋았아요!',
      en: 'I loved being able to try many different technologies instead of just one. I didn\'t know what the 4th industrial revolution was, but the camp made me realize how much we have to learn. The teachers were fun and I enjoyed solving problems together with my teammates!',
    },
    date: { ko: '9월 16일', en: 'September 16' },
  },
  {
    author: { ko: '서울**중 3학년 이○○', en: 'Seoul ** Middle School, 3rd year, Lee' },
    content: {
      ko: '캠프에서 사용한 장비랑 시설이 좋아서 재밌게 지냈습니다. 선생님들이 재밌게 알려주셔 하나도 안 지루했고 같은 팀 친구들이랑도 금방 친해져서 좋았어요. 프로젝트 발표 준비할 때 같은 팀 친구들이랑 함께 노력했던게 제일 기억에 남아요. 가장 재미있었던 것은 드론이었어요~하나 사서 집에서도 드론 가지고 놀아야겠어요!',
      en: 'The equipment and facilities were great, so I had a lot of fun. The teachers were engaging and I quickly became friends with my team. Preparing the project presentation together is my favorite memory. Drones were the most fun — I want to buy one and keep playing at home!',
    },
    date: { ko: '11월 1일', en: 'November 1' },
  },
];

// FAQ (원본 5개)
const campFaqs: { question: Bi; answer: Bi }[] = [
  {
    question: {
      ko: '캠프의 안전관리는 어떻게 진행 되고 있나요?',
      en: 'How is camp safety managed?',
    },
    answer: {
      ko: '저희는 캠프 안전관리의 노하우를 보유하고 있는 청소년캠프 전문가들입니다. 운영본부는 학생들의 캠프생활을 종합적으로 점검하여 안전관리에 만전을 기하고있습니다.\n\n1) 기숙사관리: 남/녀 분리배정하고 선생님이 같은 층에서 기숙하며 생활 관리를 합니다.\n2) 식단관리: 한양대학교 구내 식당에서 식사를 제공합니다.\n3) 건강관리: 아침, 저녁 점호 시간에 담당 멘토 선생님들이 학생들의 건강 상태를 꼼꼼히 체크하고 상비약을 지급하거나 외래병원 진료를 받도록 합니다. 응급상황을 대비하여 가까운 종합병원 응급실과 연락체제를 구축하고 있으며 학생전원은 청소년활동 배상책임 보험에 가입됩니다.\n4) 생활관리: 점호 시간에 청소, 샤워 등 생활상태를 매일 확인 점검합니다.\n5) 교우관리: 따돌림이나 싸움이 발생하지 않도록 예방교육을 실시합니다.',
      en: 'We are youth camp specialists with extensive safety-management know-how. Our operations team monitors every aspect of the students\' camp life.\n\n1) Dormitory: Male and female students are separated and teachers stay on the same floor to supervise.\n2) Meals: Served at Hanyang University\'s dining hall.\n3) Health: Mentors check students\' health at morning and evening roll call, provide over-the-counter medicine or arrange hospital visits if needed. Every student is covered by youth-activity liability insurance and we maintain a direct line to the nearest emergency room.\n4) Daily care: Cleaning, showering, and other routines are checked daily at roll call.\n5) Peer relations: Preventive education to avoid bullying and conflicts is provided.',
    },
  },
  {
    question: {
      ko: '캠프가 진행되는 숙소는 어떤 환경인가요?',
      en: 'What is the camp accommodation like?',
    },
    answer: {
      ko: '캠프 기간 중 학생들은 한양대학교 ERICA캠퍼스의 기숙사를 이용하게 됩니다. 숙소 안에 화장실과 샤워장, 옷장, 신발장, 책상, 침대가 갖추어져 있습니다. 개인 침구류와 냉난방 시설이 완비되어 있으며, 매일 아침 저녁 점호 시간에 멘토선생님들이 숙소의 위생상태와 기타관리를 점검하기 때문에 학생들은 편안하고 안전한 숙소 생활을 할 수 있습니다.',
      en: 'Students stay in the dormitories of Hanyang University ERICA Campus. Each room has a bathroom, shower, wardrobe, shoe cabinet, desk, and bed. Bedding and HVAC are provided, and mentors check hygiene and other conditions at morning and evening roll call, so students can stay comfortably and safely.',
    },
  },
  {
    question: {
      ko: '캠프를 운영하고 수업을 진행하는 멘토 선생님들은 어떤 분들이신가요?',
      en: 'Who are the mentors running the camp and teaching the classes?',
    },
    answer: {
      ko: '교육 선생님들은 모두 교육 전문 자격증을 소유하고 200-300시간 이상 교육을 받은 전문 강사님들입니다. 생활 멘토 선생님들은 모두 한양대학교 ERICA 재학생 또는 졸업생으로 공학 분야 외 다양한 전공과 이력을 가진 분들로 선발합니다. 선발된 멘토들은 별도의 멘토링 교육을 수료하고 캠프에 참여하게 됩니다.',
      en: 'All instructors hold teaching certifications and have completed 200–300+ hours of training. Life mentors are current students or alumni of Hanyang University ERICA selected from diverse engineering and non-engineering backgrounds. Selected mentors complete a separate mentoring program before joining the camp.',
    },
  },
  {
    question: { ko: '개인 준비물이 있나요?', en: 'What personal items should I bring?' },
    answer: {
      ko: '필요한 개인 준비물은 다음과 같습니다.\n1) 개인 USB (8GB 이상)\n2) 필기도구\n3) 여벌의 옷, 속옷, 양말\n4) 세면도구 (수건/칫솔/치약/비누)\n5) 접이식 우산 (우천시)\n6) 휴대폰 배터리 충전기\n7) 캠프 시 필기구 및 교재를 넣을 수 있는 보조가방을 준비해 주세요 :)',
      en: 'Please bring the following.\n1) Personal USB drive (8 GB or larger)\n2) Writing tools\n3) Extra clothes, underwear, and socks\n4) Toiletries (towel, toothbrush, toothpaste, soap)\n5) Folding umbrella (in case of rain)\n6) Phone charger\n7) A small bag to carry writing tools and textbooks during the camp.',
    },
  },
  {
    question: {
      ko: '궁금한 점은 어디로 문의하면 되나요?',
      en: 'Where can I ask additional questions?',
    },
    answer: {
      ko: '문의: 한양미래연구소 (하이스타터) 070-8064-0829',
      en: 'Contact: Hanyang Future Lab (Histarter co.,ltd) +82-70-8064-0829',
    },
  },
];

// 캠프 유형별 상세 (탭)
const campTypes: {
  id: string;
  label: Bi;
  color: string;
  youtube: string;
  price: Bi;
  priceNote: Bi;
  composition: Bi;
  compositionNote: Bi;
  note: Bi;
  timetableImg: string;
}[] = [
  {
    id: '1day',
    label: { ko: '일일 캠프', en: '1-Day Camp' },
    color: 'bg-point',
    youtube: 'https://www.youtube.com/embed/NyI5yza1k0o',
    price: { ko: '120,000원', en: 'KRW 120,000' },
    priceNote: {
      ko: '최소 인원 25명 / 교육비, 교재비, 관리비, 식비 등 기타 제반비용 모두 포함 / 변동 가능',
      en: 'Minimum 25 participants / includes tuition, materials, operations, and meals / subject to change',
    },
    composition: {
      ko: '2가지 메이커 액티비티 선택 가능',
      en: 'Choose 2 maker activities',
    },
    compositionNote: {
      ko: '메이커 액티비티 별로 1인 1 결과물을 가져갈 수 있습니다. (상세 내용 프로그램 안내 참고)',
      en: 'Each student takes home 1 project per maker activity. (See program details)',
    },
    note: {
      ko: '캠프 이수자에게는 포트폴리오(사진, 영상) 제공\n캠프 이수자에게는 수료증(한양미래연구소 대표) 수여',
      en: 'Portfolio (photos, video) provided to camp graduates\nCertificate (from the CEO of Hanyang Future Lab) awarded to graduates',
    },
    timetableImg: '/images/sub/edu01_3_1n.png',
  },
  {
    id: '2day',
    label: { ko: '1박 2일', en: '1 Night / 2 Days' },
    color: 'bg-[#e8a030]',
    youtube: 'https://www.youtube.com/embed/wFtwPmdlL2c',
    price: { ko: '300,000원', en: 'KRW 300,000' },
    priceNote: {
      ko: '최소 인원 25명 / 교육비, 교재비, 관리비, 식비, 숙박비, 보험료 등 기타 제반비용 모두 포함 / 변동 가능',
      en: 'Minimum 25 participants / includes tuition, materials, operations, meals, lodging, and insurance / subject to change',
    },
    composition: { ko: '2가지 메이커 액티비티 선택 가능', en: 'Choose 2 maker activities' },
    compositionNote: {
      ko: '메이커 액티비티 별로 1인 1 결과물을 가져갈 수 있습니다. (상세 내용 프로그램 안내 참고)',
      en: 'Each student takes home 1 project per maker activity. (See program details)',
    },
    note: {
      ko: '캠프 이수자에게는 개인 포트폴리오(사진, 영상) 제공\n캠프 이수자에게는 수료증(한양미래연구소 대표) 수여',
      en: 'Personal portfolio (photos, video) provided to camp graduates\nCertificate (from the CEO of Hanyang Future Lab) awarded to graduates',
    },
    timetableImg: '/images/sub/edu01_2_1n.png',
  },
  {
    id: '3day',
    label: { ko: '2박 3일', en: '2 Nights / 3 Days' },
    color: 'bg-[#e05050]',
    youtube: 'https://www.youtube.com/embed/iqCtVrqByNs',
    price: { ko: '450,000원', en: 'KRW 450,000' },
    priceNote: {
      ko: '최소 인원 25명 / 교육비, 교재비, 관리비, 식비, 숙박비, 보험료 등 기타 제반비용 모두 포함 / 변동 가능',
      en: 'Minimum 25 participants / includes tuition, materials, operations, meals, lodging, and insurance / subject to change',
    },
    composition: { ko: '3가지 메이커 액티비티 선택 가능', en: 'Choose 3 maker activities' },
    compositionNote: {
      ko: '메이커 액티비티 별로 1인 1 결과물을 가져갈 수 있습니다. (상세 내용 프로그램 안내 참고)',
      en: 'Each student takes home 1 project per maker activity. (See program details)',
    },
    note: {
      ko: '캠프 이수자에게는 개인 포트폴리오(사진, 영상) 제공\n캠프 이수자에게는 수료증(한양미래연구소 대표) 수여',
      en: 'Personal portfolio (photos, video) provided to camp graduates\nCertificate (from the CEO of Hanyang Future Lab) awarded to graduates',
    },
    timetableImg: '/images/sub/edu01_1_16n.png',
  },
];

// 세부 프로그램 (기본) 4개
const basicPrograms: { image: string; title: Bi; description: Bi }[] = [
  {
    image: '/images/sub/program_figure_1_4th_industrial_and_youth_entrepreneurship.png',
    title: {
      ko: '4차 산업혁명과 청소년 기업가정신',
      en: '4th Industrial Revolution & Youth Entrepreneurship',
    },
    description: {
      ko: '창업에 대한 개념 이해 및 기업가 정신을 학습하고 질의응답을 통해 미래 산업 발전에 대하여 토론',
      en: 'Understand entrepreneurship concepts, learn entrepreneurial mindset, and discuss the future of industry through Q&A.',
    },
  },
  {
    image: '/images/sub/program_figure_2_relationship_traning.png',
    title: { ko: '관계 형성 트레이닝', en: 'Relationship Training' },
    description: {
      ko: '학생 개별 성향 검사 진행 후, 다양한 팀빌딩 활동을 통해 배려와 공존의 정신을 배우고 관계를 형성',
      en: 'Individual personality assessment followed by various team-building activities that foster consideration, coexistence, and relationship-building.',
    },
  },
  {
    image: '/images/sub/program_figure_3_pbl_class.png',
    title: {
      ko: '융합형 창의 인재를 양성하는 PBL 클래스',
      en: 'PBL Class for Convergent Creative Talent',
    },
    description: {
      ko: '실생활에서 발생하는 문제에 대해 스스로 해결법을 찾아가는 PBL(Project Based Learning) 클래스',
      en: 'A Project Based Learning class where students find their own solutions to real-life problems.',
    },
  },
  {
    image: '/images/sub/program_figure_4_campus_tour.png',
    title: { ko: '한양대 캠퍼스 투어', en: 'Hanyang University Campus Tour' },
    description: {
      ko: '한양대학교 재학생 홍보대사 "사랑한대"의 안내에 따라 에리카캠퍼스 투어를 진행하는 프로그램',
      en: 'Campus tour at ERICA Campus guided by Hanyang University student ambassadors "Saranghandae".',
    },
  },
];

// 메이커 액티비티 (2가지 선택) 7개
const makerActivities: { image: string; title: Bi; description: Bi }[] = [
  {
    image: '/images/sub/maker_activity_1_3d_printer.png',
    title: {
      ko: '디자인씽킹을 통한 3D 창작품 만들기',
      en: '3D Creations Through Design Thinking',
    },
    description: {
      ko: '창의 사고 기법을 통해 아이디어를 생각해내고 실제 3D 프린터를 작동시켜 개별 작품을 제작',
      en: 'Generate ideas with creative thinking techniques and produce individual works using real 3D printers.',
    },
  },
  {
    image: '/images/sub/maker_activity_2_3d_pen.png',
    title: {
      ko: '3D 펜으로 설계하는 나의 인생 좌우명',
      en: 'My Life Motto Designed with a 3D Pen',
    },
    description: {
      ko: '3D펜 작동법과 원리를 배우고 이를 이용하여 자신의 인생 좌우명을 정하고 개별작품으로 제작',
      en: 'Learn how 3D pens work, then design and build an individual piece expressing your life motto.',
    },
  },
  {
    image: '/images/sub/maker_activity_3_vr_movie.png',
    title: {
      ko: 'VR을 활용한 나만의 프로필 영상 제작',
      en: 'Your Own Profile Video Using VR',
    },
    description: {
      ko: '360도 카메라를 활용하여 개인 프로필 영상을 촬영한 뒤, VR카드보드 뷰어를 제작하여 감상',
      en: 'Shoot a personal profile video with a 360° camera, then build a VR cardboard viewer to watch it.',
    },
  },
  {
    image: '/images/sub/maker_activity_4_ar_contents.png',
    title: {
      ko: 'AR을 활용한 인터렉티브 영상 콘텐츠 제작',
      en: 'Interactive Video Content with AR',
    },
    description: {
      ko: '시청자와 상호작용하는 인터렉티브 영상을 제작한 뒤, AR 홀로그램 뷰어로 영상 콘텐츠 체험',
      en: 'Produce interactive videos that respond to the viewer and experience the content through an AR hologram viewer.',
    },
  },
  {
    image: '/images/sub/maker_activity_5_drone_steam.png',
    title: { ko: '드론과 함께 하는 STEAM 교육', en: 'STEAM Education with Drones' },
    description: {
      ko: '기초 호버링 및 기압계 유무를 비교하며 드론을 체험하고, 팀을 나누어 미션 수행',
      en: 'Experience basic hovering and compare drones with and without barometers, then complete missions in teams.',
    },
  },
  {
    image: '/images/sub/maker_activity_6_robot_coding.png',
    title: {
      ko: '융합 사고력을 키우는 로봇코딩 교육',
      en: 'Robot Coding to Build Convergent Thinking',
    },
    description: {
      ko: '마인드 맵을 통해 소프트웨어의 개념을 이해하고 스마트폰/앱/명령카드를 이용해 코딩로봇 제어',
      en: 'Understand software concepts through mind mapping and control a coding robot via smartphone, app, and command cards.',
    },
  },
  {
    image: '/images/sub/maker_activity_7_autonomous_car.png',
    title: {
      ko: '실습형 공학수업 인공지능 자율주행자동차',
      en: 'Hands-on AI Autonomous Driving Engineering',
    },
    description: {
      ko: '코딩을 통해 자율주행 알고리즘을 학습하고 통신을 통해 직접 제어함으로써 문제 해결 능력 향상',
      en: 'Learn autonomous-driving algorithms through coding and directly control the car via communications to strengthen problem-solving skills.',
    },
  },
];

export default async function CampPage({
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
        ]}
      />
      <FAQJsonLd faqs={campFaqs.map((f) => ({ question: pick(f.question, isKo), answer: pick(f.answer, isKo) }))} />
      <ReviewsJsonLd
        itemName={isKo ? '한양청소년캠프' : 'Hanyang Convergence Engineering Camp'}
        reviews={campReviews.map((r) => ({ author: pick(r.author, isKo), rating: 5, content: pick(r.content, isKo) }))}
      />

      {/* 캠프 종류 탭 */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
          <ul className="flex overflow-x-auto text-[13px] md:text-[14px]">
            <li>
              <span className="block px-5 py-4 font-bold text-point border-b-2 border-point whitespace-nowrap">
                {isKo ? '한양청소년캠프' : 'Hanyang Youth Camp'}
              </span>
            </li>
            <li>
              <Link href={`/${locale}/camp/saturday`} className="block px-5 py-4 font-semibold text-gray-600 hover:text-point whitespace-nowrap">
                {isKo ? '토요 캠프' : 'Saturday Camp'}
              </Link>
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
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[12px] md:text-[14px] tracking-[0.2em] uppercase opacity-80 mb-2">
                Hanyang Convergence Engineering Camp
              </p>
              <h1 className="text-[28px] md:text-[40px] font-bold mb-4 leading-tight">
                {isKo ? '청소년캠프' : 'Youth Camp'}
              </h1>
              <p className="text-[14px] md:text-[16px] leading-relaxed opacity-95 mb-6">
                {isKo ? (
                  <>
                    융합형 창의인재 양성을 위한 탐구·체험 중심의 캠프<br />
                    기업가 정신을 바탕으로 미래 기술의 원리를 이해하고 체험합니다.
                  </>
                ) : (
                  <>
                    An exploration- and experience-based camp that nurtures convergent, creative talent.<br />
                    Built on an entrepreneurial mindset, students understand and experience the principles of future technology.
                  </>
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-block bg-white text-point font-bold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors text-sm"
                >
                  {isKo ? '교육 신청하기' : 'Apply'}
                </Link>
                <a
                  href="https://drive.google.com/file/d/1rjt2OWqfIieT6ifW2gvEP95oxj6VSL7f/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white text-white font-semibold px-6 py-2.5 rounded hover:bg-white/10 transition-colors text-sm"
                >
                  {isKo ? '커리큘럼 보기' : 'View Curriculum'}
                </a>
              </div>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2.5 md:justify-end">
                {(isKo
                  ? ['3D프린팅/3D펜', 'VR/AR', '드론', '로봇 코딩', '자율주행자동차', '기업가정신 교육·스타트업CEO 특강']
                  : ['3D Printing / 3D Pen', 'VR / AR', 'Drones', 'Robot Coding', 'Autonomous Driving', 'Entrepreneurship · Startup CEO Lecture']
                ).map((tag) => (
                  <li
                    key={tag}
                    className="inline-block bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-[13px] font-medium"
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
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8">
            {isKo ? '교육 소개' : 'About the Camp'}
          </h2>
          <p className="text-[18px] md:text-[22px] font-bold text-point mb-4">
            <strong>{isKo ? '한양청소년캠프' : 'Hanyang Convergence Engineering Camp'}</strong>
            {isKo ? '는' : ''}
          </p>
          <p className="text-[14px] md:text-[16px] text-gray-700 leading-loose">
            {isKo ? (
              <>
                4차산업혁명의 새로운 시대를 주도하는 융합형 창의인재 양성을 위한 탐구·체험중심의 캠프입니다.
                <br />
                기업가 정신 함양을 바탕으로 4차 산업혁명 시대에 대표적인 미래기술들의 원리를 이해하고 체험하며, 탐구하는 능력을 기르고자 합니다.
                <br />
                창업 교육을 비롯하여 4차 산업혁명 기술이 적용되는 미래 직업에 대해 배우며 진로 선택에 시야를 넓힐 수 있습니다.
              </>
            ) : (
              <>
                An exploration- and experience-driven camp that develops convergent, creative talent for the 4th Industrial Revolution.
                <br />
                Grounded in an entrepreneurial mindset, students understand and experience the principles of representative future technologies and build their inquiry skills.
                <br />
                Along with entrepreneurship education, students explore future careers enabled by 4th Industrial Revolution technologies, broadening their career perspectives.
              </>
            )}
          </p>
        </div>
      </section>

      {/* 캠프 구분과 내용 */}
      <section className="py-10 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-6 text-center">
            {isKo ? '캠프 구분과 내용' : 'Camp Types & Details'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white text-[13px] md:text-[14px]">
              <thead>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-3 py-3 font-bold text-gray-800 w-[100px]">
                    {isKo ? '구분' : 'Category'}
                  </th>
                  <th className="bg-point/10 border border-gray-300 px-3 py-3 font-bold text-point">
                    {isKo ? '한양청소년 캠프' : 'Hanyang Youth Camp'}
                  </th>
                  <th className="bg-[#e8a030]/10 border border-gray-300 px-3 py-3 font-bold text-[#b87616]">
                    {isKo ? '한양청소년 토요캠프' : 'Hanyang Saturday Camp'}
                  </th>
                  <th className="bg-[#e05050]/10 border border-gray-300 px-3 py-3 font-bold text-[#c73030]">
                    {isKo ? '프리미엄 경진대회 대비 캠프' : 'Premium Competition Prep Camp'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-3 py-3 font-bold text-gray-800">
                    {isKo ? '내용' : 'Content'}
                  </th>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo
                      ? '4차산업기술 체험과 비전 수립을 위한 특강으로 단체만 신청 가능'
                      : 'Experience in 4th Industrial Revolution tech plus a vision-setting lecture — group applications only.'}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo
                      ? '토요일 1일 집중하여 4차산업 기술 다분야 융합 체험'
                      : 'A single-day Saturday program with intensive multi-field convergence experiences.'}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo
                      ? '코딩, 로봇 등 4차산업기술 관련 경진대회 장/단기 대비'
                      : 'Short- and long-term preparation for coding, robotics, and other 4th-IR competitions.'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-3 py-3 font-bold text-gray-800">
                    {isKo ? '운영방식' : 'Format'}
                  </th>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li>{isKo ? '학교/기업 등 단체의 요청 시 맞춤형 일정과 내용으로 진행' : 'Customized schedules and content on request from schools or organizations'}</li>
                      <li>{isKo ? '특강 + 엑티비티로 구성' : 'Lecture + activity format'}</li>
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li>{isKo ? '개인이 네이버 예약을 통해 원하는 프로그램을 신청' : 'Individuals apply via Naver Booking'}</li>
                      <li>{isKo ? '엑티비티로만 구성' : 'Activities only'}</li>
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li>{isKo ? '개인이 네이버 예약을 통해 희망 프로그램을 신청' : 'Individuals apply via Naver Booking'}</li>
                      <li>{isKo ? '대회 대비를 위한 맞춤형 프로젝트 + 비법 전수 등으로 구성' : 'Custom competition-prep projects + know-how transfer'}</li>
                      <li>{isKo ? '대회 유경험 강사로만 구성' : 'Instructors with competition experience only'}</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-3 py-3 font-bold text-gray-800">
                    {isKo ? '장소' : 'Location'}
                  </th>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo ? '한양대 ERICA 캠퍼스 또는 단체가 요청하는 곳' : 'Hanyang ERICA Campus or requested location'}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo
                      ? '한양대 ERICA 캠퍼스 또는 한양미래연구소 협력기관(지방)'
                      : 'Hanyang ERICA Campus or a partner institution (regional)'}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo
                      ? '한양대 ERICA 캠퍼스 또는 한양미래연구소 협력기관(지방)'
                      : 'Hanyang ERICA Campus or a partner institution (regional)'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-3 py-3 font-bold text-gray-800">
                    {isKo ? '비용' : 'Fee'}
                  </th>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo ? (
                      <>일일 120,000원<br />1박 2일 300,000원<br />2박 3일 450,000원</>
                    ) : (
                      <>1-day KRW 120,000<br />1N/2D KRW 300,000<br />2N/3D KRW 450,000</>
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo ? (
                      <>1일 체험 120,000원<br />(1일 5시간 1회)</>
                    ) : (
                      <>1-day experience KRW 120,000<br />(5 hours, 1 session)</>
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 align-top">
                    {isKo ? (
                      <>4회 399,000원 (재료비 별도)<br />(4회 각 6시간 총 24시간)</>
                    ) : (
                      <>4 sessions KRW 399,000 (materials excluded)<br />(6 hours × 4 sessions = 24 hours)</>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 오프라인 캠프 개요 (예시안) */}
      <section className="py-10 px-4 bg-white">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-6 text-center">
            {isKo ? '오프라인 캠프 개요' : 'Offline Camp Overview'}{' '}
            <span className="text-gray-500 text-[15px] font-medium">
              ({isKo ? '예시안' : 'sample'})
            </span>
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-[13px] md:text-[14px]">
              <thead>
                <tr>
                  <th className="bg-point text-white border border-gray-300 px-4 py-3" colSpan={4}>
                    {isKo
                      ? '4차산업 혁명시대를 이끌어 나갈 [한양청소년캠프]'
                      : '[Hanyang Youth Camp] — Leading the 4th Industrial Revolution era'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 font-bold text-left w-[120px]">
                    {isKo ? '대상' : 'Target'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo
                      ? '초·중·고등학생 (최소 인원 25명 이상)'
                      : 'Elementary / middle / high school students (min. 25 participants)'}
                  </td>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 font-bold text-left w-[100px]">
                    {isKo ? '유형' : 'Type'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo ? '일일 / 1박 2일 / 2박 3일 캠프' : '1-day / 1N 2D / 2N 3D camps'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 font-bold text-left">
                    {isKo ? '1인 비용' : 'Per-person Fee'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo ? '1박 2일 300,000원' : '1N 2D: KRW 300,000'}
                  </td>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 font-bold text-left">
                    {isKo ? '교육장소' : 'Venue'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3">
                    {isKo ? '한양대 ERICA 캠퍼스 내 강의실' : 'Classrooms on Hanyang ERICA Campus'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 font-bold text-left">
                    {isKo ? '프로그램 구성' : 'Program'}
                  </th>
                  <td className="border border-gray-300 px-4 py-3" colSpan={3}>
                    {isKo
                      ? '특강(창의융합 인재, PBL 프로젝트) + 액티비티(전통 문양 LED 무드등, 전도성회로 테이프로 만드는 예술과 수학, 인공지능 웹툰 만들기)'
                      : 'Lectures (convergent-creative talent, PBL projects) + Activities (traditional-pattern LED mood lamp, art & math with conductive-tape circuits, AI webtoon creation)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 text-[13px] md:text-[14px] text-gray-700">
            {(isKo
              ? [
                  '비용은 물가상승에 따라 변동될 수 있으므로 유선으로 문의 부탁드립니다.',
                  '숙박형 캠프는 별도 문의 부탁드립니다.',
                  '한 학급 기준 최소 인원은 25명이며, 총 인원이 25명 이하일 경우, 비용이 변동될 수 있습니다.',
                  '1인 비용에는 교육비, 교재비, 관리비, 식비, 숙박비 등 기타 제반비용이 모두 포함되어 있습니다.',
                  '차량 대절이 필요하신 경우, 별도 비용이 소요됩니다.',
                  '우천시 캠퍼스 투어는 취소 또는 다른 프로그램으로 대체될 수 있습니다.',
                  '단체의 요청 시 온라인 캠프로도 진행이 가능하며, 별도 견적 요청해야 합니다.',
                  '캠프 중 식사는 다음의 방식을 통해 진행됩니다: 한양대학교 ERICA 학생식당(주중 점심·저녁), 도시락(주말 점심·저녁, 모든 아침)',
                ]
              : [
                  'Fees may change with inflation — please inquire by phone.',
                  'Overnight camps are quoted separately on request.',
                  'Minimum enrollment is 25 students per class; fees may change when total enrollment is below 25.',
                  'Per-person fee includes tuition, materials, operations, meals, lodging, and other fees.',
                  'Chartered transportation incurs an additional fee.',
                  'The campus tour may be canceled or replaced in case of rain.',
                  'Online camps are available on request with a separate quote.',
                  'Meals during the camp: Hanyang ERICA student cafeteria (weekday lunch/dinner); boxed meals (weekend lunch/dinner, all breakfasts).',
                ]
            ).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 text-point font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 캠프 유형 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '캠프 유형' : 'Camp Formats'}
          </h3>

          <div className="space-y-14">
            {campTypes.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    src={t.youtube}
                    title={pick(t.label, isKo)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`${t.color} text-white font-bold px-4 py-2 rounded-lg text-[15px]`}>
                      {pick(t.label, isKo)}
                    </span>
                    <h4 className="text-[17px] md:text-[20px] font-bold text-gray-900">
                      {isKo ? '상세 정보' : 'Details'}
                    </h4>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-200 text-[13px] md:text-[14px]">
                      <tbody>
                        <tr>
                          <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold text-gray-800 w-[140px] md:w-[180px]">
                            {isKo ? '비용 (1인 기준)' : 'Fee (per person)'}
                          </th>
                          <td className="border border-gray-200 px-4 py-3 align-top">
                            <span className="font-bold text-point text-[16px]">{pick(t.price, isKo)}</span>
                            <span className="block text-[12px] text-gray-500 mt-1">{pick(t.priceNote, isKo)}</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">
                            {isKo ? '프로그램 구성' : 'Program'}
                          </th>
                          <td className="border border-gray-200 px-4 py-3 align-top">
                            <span className="font-semibold text-gray-800">{pick(t.composition, isKo)}</span>
                            <span className="block text-[12px] text-gray-500 mt-1">{pick(t.compositionNote, isKo)}</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="bg-[#f5f5f5] border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">
                            {isKo ? '참고사항' : 'Notes'}
                          </th>
                          <td className="border border-gray-200 px-4 py-3 align-top whitespace-pre-line text-gray-700">
                            {pick(t.note, isKo)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h5 className="text-[15px] md:text-[16px] font-bold text-gray-900 mb-3">
                      {isKo ? '타임 테이블' : 'Time Table'}
                    </h5>
                    <div className="flex justify-center bg-[#fafafa] rounded-lg p-4">
                      <Image
                        src={t.timetableImg}
                        alt={`${pick(t.label, isKo)} ${isKo ? '타임 테이블' : 'time table'}`}
                        width={900}
                        height={600}
                        sizes="(max-width: 900px) 100vw, 900px"
                        className="w-full h-auto max-w-[900px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <Link
              href={`/${locale}/camp/competition`}
              className="group block rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-[#c73030] transition-all text-center"
            >
              <div className="text-[13px] text-gray-500 mb-1">{isKo ? '개인 캠프' : 'Individual Camp'}</div>
              <div className="text-[18px] font-bold text-gray-900 group-hover:text-[#c73030]">
                {isKo ? '경진대회 대비 캠프' : 'Competition Prep Camp'}
              </div>
              <div className="text-[13px] text-gray-500 mt-2">{isKo ? '자세히 보러 가기 →' : 'Learn more →'}</div>
            </Link>
            <Link
              href={`/${locale}/camp/saturday`}
              className="group block rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-point transition-all text-center"
            >
              <div className="text-[13px] text-gray-500 mb-1">{isKo ? '개인 캠프' : 'Individual Camp'}</div>
              <div className="text-[18px] font-bold text-gray-900 group-hover:text-point">
                {isKo ? '한양미래 청소년 토요캠프' : 'Hanyang Future Saturday Youth Camp'}
              </div>
              <div className="text-[13px] text-gray-500 mt-2">{isKo ? '자세히 보러 가기 →' : 'Learn more →'}</div>
            </Link>
          </div>
        </div>
      </section>

      {/* 프로그램 안내 - 세부 프로그램(기본) */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '프로그램 안내' : 'Program Guide'}
          </h3>
          <h4 className="text-[16px] md:text-[18px] font-bold text-gray-800 text-center mb-8">
            {isKo ? '세부 프로그램' : 'Core Programs'}{' '}
            <span className="text-gray-500 font-medium">({isKo ? '기본' : 'base'})</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {basicPrograms.map((p) => (
              <div key={p.image} className="text-center">
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                  <Image src={p.image} alt={pick(p.title, isKo)} fill sizes="100px" className="object-contain" />
                </div>
                <h5 className="text-[14px] md:text-[15px] font-bold text-gray-900 mb-2 leading-snug">
                  {pick(p.title, isKo)}
                </h5>
                <p className="text-[12px] md:text-[13px] text-gray-600 leading-relaxed">
                  {pick(p.description, isKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메이커 액티비티 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h4 className="text-[16px] md:text-[20px] font-bold text-gray-800 text-center mb-8">
            {isKo ? '메이커 액티비티' : 'Maker Activities'}{' '}
            <span className="text-point font-semibold">
              ({isKo ? '2가지 선택' : 'choose 2'})
            </span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {makerActivities.map((a) => (
              <div
                key={a.image}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm text-center flex flex-col"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                  <Image src={a.image} alt={pick(a.title, isKo)} fill sizes="100px" className="object-contain" />
                </div>
                <h5 className="text-[13px] md:text-[14px] font-bold text-gray-900 mb-2 leading-snug">
                  {pick(a.title, isKo)}
                </h5>
                <p className="text-[12px] text-gray-600 leading-relaxed">{pick(a.description, isKo)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교육 후기 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '교육 후기' : 'Reviews'}
          </h3>
          <div className="space-y-5">
            {campReviews.map((r, i) => (
              <article
                key={i}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl bg-[#fafafa] border border-gray-100 p-5 md:p-6"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:w-[160px] flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white">
                    <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
                    </svg>
                  </div>
                  <div className="text-[12px] md:text-[13px] font-semibold text-gray-800 text-center leading-snug">
                    {pick(r.author, isKo)}
                  </div>
                  <div className="text-[#f5b800] text-[13px]" aria-label={isKo ? '별점 5점' : '5 stars'}>
                    ★★★★★
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                    {pick(r.content, isKo)}
                  </p>
                  <p className="text-[12px] text-gray-400 mt-3">{pick(r.date, isKo)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[900px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">FAQ</h3>
          <div className="space-y-4">
            {campFaqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="flex items-start gap-3 p-5 cursor-pointer list-none">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-point text-white font-bold text-[14px] flex items-center justify-center">
                    Q
                  </span>
                  <span className="flex-1 font-bold text-[14px] md:text-[16px] text-gray-900 leading-snug pt-0.5">
                    {pick(f.question, isKo)}
                  </span>
                  <span className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                  <div className="flex items-start gap-3 pt-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-[14px] flex items-center justify-center">
                      A
                    </span>
                    <p className="flex-1 text-[13px] md:text-[14px] text-gray-700 leading-relaxed whitespace-pre-line pt-0.5">
                      {pick(f.answer, isKo)}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '오시는 길' : 'Location'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '16 / 10' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.944032697291!2d126.83237666564264!3d37.29646024730607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6ef2f5a7cb73%3A0x26b59cb3d9af4a46!2z7ZWc7JaR64yA7ZWZ6rWQIEVSSUNB7Lqg7Y287Iqk!5e0!3m2!1sko!2skr!4v1556386346348!5m2!1sko!2skr"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={isKo ? '한양미래연구소 위치' : 'Hanyang Future Lab location'}
              />
            </div>
            <div className="flex flex-col justify-center gap-4 bg-[#fafafa] rounded-xl p-6 border border-gray-100">
              <div>
                <dt className="text-[12px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                  {isKo ? '본사' : 'Headquarters'}
                </dt>
                <dd className="text-[14px] md:text-[15px] text-gray-800 leading-relaxed">
                  {isKo
                    ? '경기도 안산시 상록구 한양대학로 55 5공학관 창업실'
                    : '55 Hanyangdaehak-ro, Engineering Bldg. 5 Startup Room, Sangnok-gu, Ansan, Gyeonggi-do'}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-widest text-gray-500 font-semibold mb-1">TEL</dt>
                <dd className="text-[14px] md:text-[15px] text-gray-800">
                  {isKo ? '070-8064-0829' : '+82-70-8064-0829'}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-widest text-gray-500 font-semibold mb-1">EMAIL</dt>
                <dd className="text-[14px] md:text-[15px] text-gray-800">hyedu0829@gmail.com</dd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '공지사항' : 'Notices'}
          </h3>
          <ul className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-4 text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
            {(isKo
              ? [
                  { main: '체험 신청 마감은 해당 수업 일자 30일 전 오후 2시입니다.', sub: '※ 정원이 찼을 경우, 일찍 마감될 수 있습니다.' },
                  { main: '본 프로그램은 최소 인원 25명을 기준으로 진행됩니다.', sub: '※ 프로그램 진행 인원이 25명 이하일 경우, 추가 요금이 발생할 수 있습니다.' },
                  { main: '프로그램 안내 문자(수업 일시, 주소)는 프로그램 기준 1-2일 전 오후 6시까지 체험 교육 담당자에게 발송됩니다.', sub: '' },
                  { main: '수업 10분전까지 입장 부탁드리며, 늦을 경우 일부 프로그램 체험이 제한될 수 있습니다.', sub: '' },
                  { main: '체험 교육 당일, 사전 연락 없이 지각 및 불참하실 경우, 당일 불참으로 처리되며 취소/보충/환불이 불가합니다.', sub: '' },
                  { main: '문의 : 070-8064-0829', sub: '' },
                ]
              : [
                  { main: 'Applications close at 2 p.m. 30 days before the class date.', sub: '※ May close earlier if full.' },
                  { main: 'Programs run based on a minimum of 25 participants.', sub: '※ Additional fees may apply if the number of participants is below 25.' },
                  { main: 'A program guide SMS (date/time, address) is sent to the program coordinator by 6 p.m. 1–2 days before the program.', sub: '' },
                  { main: 'Please arrive 10 minutes before class — late arrivals may miss parts of the program.', sub: '' },
                  { main: 'No-shows or late arrivals without prior notice are treated as absent — no cancellation, make-up, or refund.', sub: '' },
                  { main: 'Inquiries: +82-70-8064-0829', sub: '' },
                ]
            ).map((n, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-point" />
                <span className={i === 5 ? 'font-semibold' : ''}>
                  {n.main}
                  {n.sub && (
                    <>
                      <br />
                      <span className="text-gray-500">{n.sub}</span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 취소 환불 규정 */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[700px]">
          <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-8 text-center">
            {isKo ? '취소 환불 규정' : 'Cancellation & Refund Policy'}
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-[14px] mb-6">
            <tbody>
              {[
                { ko: '수업 15일 전 취소', en: '15+ days before class', refundKo: '100% 환불', refundEn: '100% refund', color: 'text-point' },
                { ko: '수업 12일 전 취소', en: '12 days before class', refundKo: '50% 환불', refundEn: '50% refund', color: 'text-[#e8a030]' },
                { ko: '수업 10일 전 취소', en: '10 days before class', refundKo: '30% 환불', refundEn: '30% refund', color: 'text-[#e8a030]' },
                { ko: '수업 7일 이내', en: 'Within 7 days', refundKo: '취소·환불 불가', refundEn: 'No cancellation / refund', color: 'text-[#c73030]' },
              ].map((row, i) => (
                <tr key={i}>
                  <th className="bg-[#f5f5f5] border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 w-[55%]">
                    {isKo ? row.ko : row.en}
                  </th>
                  <td className={`border border-gray-300 px-4 py-3 font-semibold ${row.color}`}>
                    {isKo ? row.refundKo : row.refundEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="space-y-2 text-[13px] text-gray-600 leading-relaxed">
            {(isKo
              ? [
                  '환불 업무시간 : 평일 오전 10:00 ~ 오후 06:00 (점심시간 : 오후 12:00 ~ 13:00)',
                  '토·일요일 및 국·공휴일은 취소 및 변경신청이 접수 되지 않으며 취소 일수에서 제외됩니다.',
                  '업무시간 이후 취소요청시 익일 기준으로 처리됩니다.',
                ]
              : [
                  'Refund hours: weekdays 10:00 a.m. – 6:00 p.m. (lunch 12:00 – 13:00)',
                  'Cancellations and changes are not accepted on weekends or public holidays, and those days are excluded from the cancellation window.',
                  'Cancellation requests received after business hours are processed the next business day.',
                ]
            ).map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 text-gray-400">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
