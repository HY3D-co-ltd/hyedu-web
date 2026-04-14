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
        ? '창의체험 부스 운영 | 3D프린팅·VR·AR·드론·로봇 체험 부스'
        : 'Creative Experience Booth Operation | 3D Printing · VR · AR · Drone · Robot',
    description:
      locale === 'ko'
        ? '한양미래연구소 창의체험 부스 운영: 4차산업 혁명 메이커엑티비티 프로그램을 행사나 축제에서 부스 형식으로 운영합니다. 3D프린팅, 3D펜, VR, AR, 드론, 로봇코딩, 자율주행 체험 부스.'
        : 'Hanyang Future Lab booth operation: 4th industrial revolution maker activity programs operated as booths at events and festivals.',
    keywords:
      locale === 'ko'
        ? ['창의체험 부스', '부스 운영', '3D프린팅 부스', 'VR 부스', 'AR 부스', '드론 부스', '로봇코딩 부스', '자율주행 부스', '메이커 액티비티']
        : ['experience booth', 'booth operation', '3D printing booth', 'VR booth', 'AR booth', 'drone booth', 'robot coding booth'],
  };
}

const activities = [
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_1_3d_printer.png',
    title: '디자인씽킹을 통한\n3D 창작품 만들기',
    description: '창의 사고 기법을 통해 아이디어를 생각해내고 실제 3D 프린터를 작동시켜 개별 작품을 제작',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_2_3d_pen.png',
    title: '3D 펜으로 설계하는\n나의 인생 좌우명',
    description: '3D펜 작동법과 원리를 배우고 이를 이용하여 자신의 인생 좌우명을 정하고 개별작품으로 제작',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_3_vr_movie.png',
    title: 'VR을 활용한\n나만의 프로필 영상 제작',
    description: '360도 카메라를 활용하여 개인 프로필 영상을 촬영한 뒤, VR카드보드 뷰어를 제작하여 감상',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_4_ar_contents.png',
    title: 'AR을 활용한 인터렉티브\n영상 콘텐츠 제작',
    description: '시청자와 상호작용하는 인터렉티브 영상을 제작한 뒤, AR 홀로그램 뷰어로 영상 콘텐츠 체험',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_5_drone_steam.png',
    title: '드론과 함께 하는\nSTEAM 교육',
    description: '기초 호버링 및 기압계 유무를 비교하며 드론을 체험하고, 팀을 나누어 \'드론 크러쉬 대회\' 진행',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_6_robot_coding.png',
    title: '융합 사고력을 키우는\n로봇코딩 교육',
    description: '마인드 맵을 통해 소프트웨어의 개념을 이해하고 스마트폰/앱/명령카드를 이용해 코딩로봇 제어',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/maker_activity_7_autonomous_car.png',
    title: '실습형 공학수업\n인공지능 자율주행자동차',
    description: '코딩을 통해 자율주행 알고리즘을 학습하고 통신을 통해 직접 제어함으로써 문제 해결 능력 향상',
  },
];

const features = [
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_1_technology_education.png',
    title: '기술직업 체험교육',
    description: '3D게임 캐릭터 디자이너, 드론조종사 등 4차산업혁명 기술을 이용한 미래 유망 직업을 탐색하고 기술 이해를 바탕으로 기업가 정신을 함양할 수 있도록 함',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_2_pbl_class.png',
    title: '사고력을 기르는 PBL 수업',
    description: '단순히 정답을 맞히는 것이 아니라 문제를 해결하는 역량을 키워나감과 동시에 자기주도적 학습을 바탕으로 생각하는 힘을 기를 수 있도록 하는 수업',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_3_collaborate_troubleshoot.png',
    title: '협동하며 문제해결',
    description: '혼자 해결할 수 없는 문제를 그룹학습을 통해 팀원들과의 정보공유 및 상호작용으로 해결할 수 있으며 이러한 과정을 통해 배려와 존중의 정신을 배울 수 있음',
  },
  {
    image: '/images/programs/detail/maker_booth_operation/education_feature_4_individual_portfolio.png',
    title: '개별 결과물과 포트폴리오',
    description: '캠프 내 모든 메이커 액티비티는 프로그램 활동을 통해 개별 결과물을 제작하고 참여 학생은 이를 제공받아 메이커 활동 포트폴리오를 만들 수 있음',
  },
];

const reviews = [
  {
    name: 'OO초등학교5학년 정OO 학부모님',
    text: '엄마랑 아빠랑 VR체험부스에 참여했던 정OO(엄마 이OO)입니다. 이 체험을 통해서 아들이 가상현실에 대한 개념을 제대로 잡은 것 같아요. 설명 듣기 전에 책으로만 대할 때는 무슨 이야기인지 흥미를 느끼지 못했는데 VR체험을 통해 흥미와 개념을 동시에 잡은 것 같아 신청 잘 했다는 생각이 듭니다. 열정적으로 설명해주신 선생님의 노력을 먼저 빼놓을 수 없겠지요. 다시 한 번 감사드립니다. 참 유치부 동생도 엄마 따라서 한 번 다녀왔는데 자기도 신청해 달라고 계속 조릅니다. 어쩌죠? 유치부 체험도 개강하셔야 할 것 같습니다.ㅎㅎ 아들은 부스체험이 언제 다시 열리냐고 묻곤 합니다. 수고하세요. 다음 체험 시간에 뵙도록 하겠습니다.',
    date: '11월 2일',
  },
  {
    name: '00초등학교 2학년\n000 학생',
    text: '엄마랑 아빠랑 체험 같이 해서 좋아요. 3D펜이 제일 재미있었어요. 직접 반지도 만들고 제가 좋아하는 캐릭터도 만들고 하는데 너무 재미있어서 3D펜 하나 갖고 싶었어요! 엄마한테 사달라고 얘기하고 있어요.',
    date: '7월 28일',
  },
  {
    name: '00초등학교\n학부모님',
    text: '우리 아이가 평소에는 장난감만 사달라고 하는데, 부스에서 체험하고 난 이후에는 3D펜을 사달라고 해요. 너무 기특하네요^^ 3D펜은 아이들 창의력 개발에도 좋고, 교육으로도 사용할 수 있으니 얼마든지 사줄 수 있어요. 그때 그냥 지나가지 않고 부스에서 3D펜 체험하고 가길 너무 잘한 것 같아요. 앞으로도 이런 기회 많이 있었으면 좋겠네요. 그때는 주변 엄마들도 같이 데리고 가야겠어요....^^',
    date: '5월 15일',
  },
];

export default async function BoothPage({
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
          { name: '창의체험 부스 운영', href: `/${locale}/booth` },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#336666] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-white">
              <span className="text-sm tracking-widest opacity-80 uppercase">Maker Booth Operation</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">창의체험 부스 운영</h1>
              <p className="text-lg leading-relaxed opacity-90">
                현장에서 가족과 함께, 친구와 함께
                <br />
                생생하게 체험하는 4차 산업혁명 메이커 액티비티 프로그램
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
                {['3D프린팅', '3D펜', 'VR/AR', '드론', '로봇 코딩', '자율주행자동차'].map((tag) => (
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            교육 소개
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              <span className="text-[#336666]">창의체험 부스 운영</span>은
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              4차산업 혁명 메이커엑티비티 프로그램을 행사나 축제에서 부스 형식으로 운영합니다.
              <br className="hidden md:block" />
              학생들은 선생님의 친절한 설명과 흥미로운 엑티비티 워크샵을 통해 실제로
              <br className="hidden md:block" />
              창작물을 만들어내며 4차 산업혁명의 기술과 개념에 대해 이해합니다.
            </p>
          </div>

          {/* 프로그램 개요 */}
          <div className="max-w-3xl mx-auto mt-12">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">프로그램 개요</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <tbody>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-[#336666] font-semibold px-4 py-3 text-left w-24 md:w-32 align-top whitespace-nowrap">
                      대상
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">-</span>
                          <span>4차 산업혁명을 이끌어나갈 창업 메이커를 꿈꾸는 초·중·고등학생</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">-</span>
                          <span>교내 행사나 축제로 특별한 교육부스 운영을 기획하는 학교</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">-</span>
                          <span>관내 학교를 대상으로, 지역 특색에 맞는 통합 프로그램을 지원하려는 지자체나 교육청</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-[#336666] font-semibold px-4 py-3 text-left whitespace-nowrap">
                      시간
                    </th>
                    <td className="px-4 py-3 text-gray-700">주7일 모두 가능</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="bg-gray-50 text-[#336666] font-semibold px-4 py-3 text-left whitespace-nowrap">
                      장소
                    </th>
                    <td className="px-4 py-3 text-gray-700">각 학교/청수관/문화센터/연수원/대학교 등</td>
                  </tr>
                  <tr className="border-t border-b border-gray-200">
                    <th className="bg-gray-50 text-[#336666] font-semibold px-4 py-3 text-left whitespace-nowrap">
                      문의
                    </th>
                    <td className="px-4 py-3 text-gray-700">한양 미래 연구소 / 070-8064-0829</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 안내 - 창의체험 액티비티 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative pl-4 border-l-4 border-[#336666]">
            프로그램 안내
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mt-8 mb-10">
            창의체험 액티비티
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activity.description}
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
            프로그램 진행
          </h3>
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
                    <p className="font-semibold text-gray-900 mb-2">미래 기술 실습을 통해 나만의 창작물 제작하기</p>
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
                    <p className="font-semibold text-gray-900 mb-2">미래 기술 관련 미래유망직업 진로설계</p>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>미래 기술의 사업 발전 가능성에 대해 논의하기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">-</span>
                        <span>미래 기술을 활용한 유망직업을 배우며 진로 설계의 폭 넓혀가기</span>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 교육 특징 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            교육 특징
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg p-5 text-center shadow-sm">
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

      {/* 교육 후기 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 relative pl-4 border-l-4 border-[#336666]">
            교육 후기
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.date}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-8 border border-gray-200 rounded-lg p-5 md:p-6"
              >
                <div className="flex-shrink-0 text-center w-full md:w-48">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 whitespace-pre-line">{review.name}</p>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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

      {/* 오시는 길 */}
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
                <h3 className="font-bold text-[#336666] text-lg mb-2">본사</h3>
                <p className="text-gray-700 leading-relaxed">
                  경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA
                  <br />
                  학연산클러스터 4층 407호
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative pl-4 border-l-4 border-[#336666]">
            공지사항
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            <ul className="space-y-4 text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <div>
                  체험 신청 마감은 해당 수업 일자 1주일 전 오후 2시입니다.
                  <br />
                  <span className="text-gray-500 text-sm">※ 정원이 찼을 경우, 일찍 마감될 수 있습니다.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <div>
                  본 프로그램은 최소 인원 20명을 기준으로 진행됩니다.
                  <br />
                  <span className="text-gray-500 text-sm">※ 프로그램 진행 인원이 20명 이하일 경우, 추가 요금이 발생할 수 있습니다.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <span>
                  프로그램 안내 문자(수업 일시, 주소)는 프로그램 기준 1-2일 전 오후 6시까지 체험 교육 담당자에게 발송됩니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <span>수업 10분전까지 입장 부탁드리며, 늦을 경우 일부 프로그램 체험이 제한될 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <span>
                  체험 교육 당일, 사전 연락 없이 지각 및 불참하실 경우, 당일 불참으로 처리되며 취소/보충/환불이 불가합니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#336666] flex-shrink-0 mt-2" />
                <span>문의 : 070-8064-0829</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 취소 환불 규정 */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative pl-4 border-l-4 border-[#336666]">
            취소 환불 규정
          </h2>
          <div className="max-w-md mx-auto mb-8">
            <table className="w-full border-collapse text-sm md:text-base">
              <tbody>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">수업 15일 전 취소</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">100% 환불</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">수업 12일 전 취소</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">50% 환불</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">수업 10일 전 취소</th>
                  <td className="px-4 py-3 text-gray-700 bg-white text-center font-semibold">30% 환불</td>
                </tr>
                <tr className="border-t border-b border-gray-200">
                  <th className="bg-[#336666] text-white font-semibold px-4 py-3 text-left">수업 7일 이내</th>
                  <td className="px-4 py-3 text-red-600 bg-white text-center font-semibold">취소·환불 불가</td>
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
                <span>토·일요일 및 국·공휴일은 취소 및 변경신청이 접수 되지 않으며 취소 일수에서 제외됩니다.</span>
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
