import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { programs } from '@/data/programs';
import { cancellationPolicies } from '@/data/cancellation-policy';
import { CourseJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import AgeRecommendation from '@/components/sections/AgeRecommendation';
import ContactSection from '@/components/sections/ContactSection';
import MapSection from '@/components/sections/MapSection';

const categoryLabelKo: Record<string, string> = {
  ai: 'AI 인공지능',
  coding: '코딩',
  maker: '메이커 융합',
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
    title: `${title} | 한양미래연구소`,
    description: desc,
    keywords: [title, 'AI교육', '체험교실', '한양미래연구소'],
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const title = program.title;
  const description = program.description;
  const curriculum = program.curriculum;
  const categoryLabel = categoryLabelKo[program.category];

  const faqsForJsonLd = program.faq.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Split curriculum into 3 stages for the learning stages section
  const totalItems = curriculum.length;
  const stage1End = Math.ceil(totalItems / 3);
  const stage2End = Math.ceil((totalItems * 2) / 3);
  const introItems = curriculum.slice(0, stage1End);
  const devItems = curriculum.slice(stage1End, stage2End);
  const wrapItems = curriculum.slice(stage2End);

  // Check targets for the recommendation table
  const hasElementary = program.target.includes('elementary');
  const hasMiddle = program.target.includes('middle');
  const hasHigh = program.target.includes('high');

  // Cancellation policy for experience type
  const policy = cancellationPolicies.find((p) => p.type === 'experience');

  // Use all images for the photo section
  const displayImages = program.images;

  return (
    <>
      {/* JSON-LD */}
      <CourseJsonLd program={program} locale={locale} />
      {program.faq.length > 0 && <FAQJsonLd faqs={faqsForJsonLd} />}
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: `/${locale}` },
          { name: '찾아가는 체험교실', href: `/${locale}/programs` },
          { name: title, href: `/${locale}/programs/${slug}` },
        ]}
      />

      {/* ============================================ */}
      {/* con00: 히어로 배너 */}
      {/* ============================================ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[200px] md:h-[280px]">
          <Image
            src="/images/sub/subTop.png"
            alt="배경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="inline-block bg-point text-white text-[12px] md:text-[14px] font-bold px-4 py-1.5 rounded-full mb-3">
              {categoryLabel}
            </span>
            <h1 className="text-[22px] md:text-[32px] lg:text-[38px] font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-[13px] md:text-[16px] text-gray-600 mt-2">
              {locale === 'ko' ? program.titleEn : program.title}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con01: 추천드립니다 */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
            추천드립니다
          </h2>
          <ul className="space-y-4 max-w-[800px] mx-auto">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-point" />
              <span className="text-[15px] md:text-[17px] text-point font-bold">
                4차산업혁명을 이끌어나갈 메이커를 꿈꾸는 초·중·고등학생
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-gray-400" />
              <span className="text-[15px] md:text-[17px] text-gray-700">
                진로·학습·인성 영역과 연계한 체험 프로그램을 고민하는 학교
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-gray-400" />
              <span className="text-[15px] md:text-[17px] text-gray-700">
                특강, 워크샵, 연수, 멘토링 등 다양한 프로그램을 진행하려는 기관
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-gray-400" />
              <span className="text-[15px] md:text-[17px] text-gray-700">
                지역 특색에 맞는 프로그램을 지원하려는 지자체 또는 교육청
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================ */}
      {/* con02: 교육소개 (table) */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
            교육소개
          </h2>
          <div className="overflow-x-auto max-w-[800px] mx-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    과정
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {title}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    분류
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {categoryLabel}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    난도
                  </th>
                  <td className="px-5 py-3.5">
                    <Image
                      src="/images/sub/star3.png"
                      alt="난이도"
                      width={80}
                      height={16}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    추천
                  </th>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 text-[14px] text-gray-700">
                        <Image
                          src={hasElementary ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasElementary ? '선택' : '미선택'}
                          width={20}
                          height={20}
                        />
                        초등
                      </span>
                      <span className="flex items-center gap-1.5 text-[14px] text-gray-700">
                        <Image
                          src={hasMiddle ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasMiddle ? '선택' : '미선택'}
                          width={20}
                          height={20}
                        />
                        중등
                      </span>
                      <span className="flex items-center gap-1.5 text-[14px] text-gray-700">
                        <Image
                          src={hasHigh ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasHigh ? '선택' : '미선택'}
                          width={20}
                          height={20}
                        />
                        고등
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    시간
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {program.duration}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    인원
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    최소 인원 20명
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    비용
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    {program.price}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300">
                    장소
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700">
                    시청각 시설(빔프로젝터 &amp; 스크린 또는 스마트TV, 음향)
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f5f5f5] px-5 py-3.5 text-left text-[14px] font-bold text-gray-800 w-[120px] border-r border-gray-300 align-top">
                    수업목표
                  </th>
                  <td className="px-5 py-3.5 text-[14px] text-gray-700 leading-relaxed">
                    {description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con03: 학습 단계 */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-10 text-center">
            학습 단계
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {/* 도입 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-point text-white text-[12px] font-bold px-3 py-1 rounded-full">STEP 1</span>
                <h3 className="font-bold text-[16px] text-gray-900">도입</h3>
              </div>
              <ul className="space-y-2.5">
                {introItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Arrow on mobile */}
              <div className="md:hidden flex justify-center mt-4">
                <span className="text-point text-2xl font-bold">&#8595;</span>
              </div>
            </div>

            {/* 전개 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-[#e8a030] text-white text-[12px] font-bold px-3 py-1 rounded-full">STEP 2</span>
                <h3 className="font-bold text-[16px] text-gray-900">전개</h3>
              </div>
              <ul className="space-y-2.5">
                {devItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-[#e8a030]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="md:hidden flex justify-center mt-4">
                <span className="text-[#e8a030] text-2xl font-bold">&#8595;</span>
              </div>
            </div>

            {/* 마무리 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-[#e05050] text-white text-[12px] font-bold px-3 py-1 rounded-full">STEP 3</span>
                <h3 className="font-bold text-[16px] text-gray-900">마무리</h3>
              </div>
              <ul className="space-y-2.5">
                {wrapItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-[#e05050]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con03-plus: 교육사진 */}
      {/* ============================================ */}
      {displayImages.length > 0 && (
        <section className="py-14 px-4 bg-white">
          <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8 text-center">
              교육사진
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              {displayImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={`${title} 교육사진 ${idx + 1}`}
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

      {/* ============================================ */}
      {/* con04: 인재 양성 */}
      {/* ============================================ */}
      <section className="py-16 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <p className="text-[14px] text-gray-500 mb-2">
            4차산업혁명 기술교육, 어떻게 시작하는게 좋을까?
          </p>
          <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-10">
            인재 양성을 위한 필수 학습 <span className="text-point">한양미래연구소</span> 대표 교육으로 시작하세요!
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10 max-w-[700px] mx-auto">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex justify-center">
                <Image
                  src={`/images/sub/talent_icon01_0${n}.png`}
                  alt={`인재 양성 아이콘 ${n}`}
                  width={100}
                  height={100}
                  className="w-full max-w-[100px] h-auto"
                />
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-point text-white font-bold px-10 py-3 rounded-full text-[16px] hover:opacity-90 transition-opacity"
          >
            신청하기
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* con05: 고객 만족도 & 리뷰 (세로 나열 - 원본 상품상세 스타일) */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[800px] flex flex-col items-center gap-0">
          {/* 고객 만족도 UP 배너 */}
          <Image
            src="/images/sub/true_review01_03.png"
            alt="탄탄한 커리큘럼과 맞춤 전문 케어로 고객 만족도 UP!"
            width={800}
            height={400}
            className="w-full h-auto"
          />
          {/* 만족도 설문조사 */}
          <Image
            src="/images/sub/true_review01_02.png"
            alt="한양미래연구소 교육 만족도 설문조사"
            width={800}
            height={400}
            className="w-full h-auto"
          />
          {/* 솔직 리뷰 */}
          <Image
            src="/images/sub/true_review01_01.png"
            alt="솔직 리뷰"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* con06: 배경 (questions) */}
      {/* ============================================ */}
      <section className="relative w-full">
        <div className="relative w-full aspect-[16/4]">
          <Image
            src="/images/main/sec03bg.png"
            alt="한양미래연구소 배경"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium leading-relaxed">
              빠르게 변해가는 시대, 우리 아이 교육은 어떻게 준비해야 하나요?
            </p>
            <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium leading-relaxed mt-1">
              과학 기술을 재미있게 경험하려면 어떻게 교육해야 할까요?
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con07: Ready - 강력 추천 */}
      {/* ============================================ */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-6">
            한양미래연구소 이런 분들께 강력 추천드립니다
          </h2>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[800px]">
              <Image
                src="/images/main/msg02.png"
                alt="추천 대상"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con08: 4차산업기술교육 특징 (6 features) */}
      {/* ============================================ */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-bold text-center text-gray-900 mb-8">
            4차산업기술교육 답은 <span className="text-point">한양미래연구소</span>에 있습니다
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-[30px]">
            {[
              { image: '/images/main/feature01_01.png', title: '맞춤형 교육', description: '원하는 연령과 회기수에 맞춰서 기획 및 운영 가능' },
              { image: '/images/main/feature01_02.png', title: '교육의 다양성', description: '코딩 교육 메이커 융합 교육 STEAM 교육 인공지능 교육 특강까지' },
              { image: '/images/main/feature01_03.png', title: '베테랑 강사진', description: '경력 3년 이상의 전문 강사진들이 진행하는 교육' },
              { image: '/images/main/feature01_04.png', title: '기술직업 체험교육', description: '기술 이해를 바탕으로 기업가 정신 함양 / 4차산업혁명 기술을 이용한 미래 유망 직업 탐색' },
              { image: '/images/main/feature01_05.png', title: '사고력을 기르는 PBL 수업', description: '문제해결 역량 강화 / 자기주도적 학습을 통한 사고력 향상' },
              { image: '/images/main/feature01_06.png', title: '협동하며 문제해결', description: '친구와 정보 공유및 상호작용으로 문제 해결 / 상호작용 과정을 통해 배려와 존중 정신 함양' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="relative w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-md overflow-hidden"
                style={{
                  backgroundImage: 'url(/images/main/feature-bg.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%',
                }}
              >
                <div className="relative w-full flex-1 flex items-center justify-center px-2">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={200}
                    height={130}
                    className="w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-bold text-gray-900 text-center leading-tight">{feature.title}</h3>
                <p className="text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-medium text-gray-600 text-center leading-snug">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con10: 연령별 추천 교육 (reuse component) */}
      {/* ============================================ */}
      <AgeRecommendation />

      {/* ============================================ */}
      {/* con11: 연령별 추천 교육 이미지 */}
      {/* ============================================ */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-10 text-center">
            연령별 추천 교육
          </h2>

          {/* 초등 */}
          <div className="mb-8">
            <h3 className="text-[17px] font-bold text-gray-800 mb-4">초등</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_01', 'class01_02', 'class01_03'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt="초등 추천 교육"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 중등 */}
          <div className="mb-8">
            <h3 className="text-[17px] font-bold text-gray-800 mb-4">중등</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_04', 'class01_05', 'class01_06'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt="중등 추천 교육"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 고등 */}
          <div>
            <h3 className="text-[17px] font-bold text-gray-800 mb-4">고등</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_07', 'class01_08', 'class01_09'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt="고등 추천 교육"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con13: PC 미사용 교육 */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-3">
            PC 미사용 교육
          </h2>
          <p className="text-[14px] text-gray-600 mb-8">
            PC가 없어도 진행할 수 있는 프로그램을 소개합니다
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {programs
              .filter((p) => ['autonomous-driving', 'drone-expert', '3d-pen-designer', 'robot-coding-pingpong'].includes(p.slug))
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/programs/${p.slug}`}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
                >
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-[13px] md:text-[14px] font-bold text-gray-900">{p.title}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con15: 필독사항 & 취소·변경 규정 */}
      {/* ============================================ */}
      <section className="py-14 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 필독사항 */}
          <div className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_01.png"
                alt="필독사항"
                width={40}
                height={40}
              />
              <h3 className="text-[17px] font-bold text-gray-900">필독사항</h3>
            </div>
            <ul className="space-y-3 text-[13px] text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                교육 인원이 20명 이하일 경우, 인당 교육비 단가가 상승됩니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                원활한 교육 진행을 위해 최소 30일 전 문의바랍니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                교육 당일, 인원 변동으로 인한 교육비 변경은 불가합니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                출장비는 별도 책정되며, 서울/경기 외 지역은 추가 비용이 발생할 수 있습니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                교육 장소에 빔 프로젝터와 와이파이가 준비되어야 합니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                교육 교구는 수업 종료 후 반납하며, 파손 시 배상 책임이 있습니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-point" />
                커리큘럼은 학교/기관의 요청에 따라 조정될 수 있습니다.
              </li>
            </ul>
          </div>

          {/* 취소·변경 규정 */}
          <div className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_02.png"
                alt="취소·변경 규정"
                width={40}
                height={40}
              />
              <h3 className="text-[17px] font-bold text-gray-900">취소·변경 규정</h3>
            </div>
            {policy && (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#eee]">
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">시기</th>
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">취소</th>
                      <th className="border border-gray-300 px-3 py-2.5 text-left font-bold text-gray-800">변경</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policy.rules.map((rule, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">{rule.timing}</td>
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">{rule.cancellation}</td>
                        <td className="border border-gray-300 px-3 py-2.5 text-gray-700">{rule.changes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con16: 교육 신청 방법 */}
      {/* ============================================ */}
      <section className="py-16 px-4 bg-[#f7f8fc]">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/images/sub/how01_01.png"
              alt="교육 신청 방법"
              width={40}
              height={40}
            />
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900">
              교육 신청 방법
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto">
            {[
              { img: '/images/sub/howImg01_01.png', label: '교육 문의', step: '01' },
              { img: '/images/sub/howImg01_02.png', label: '교육 확정', step: '02' },
              { img: '/images/sub/howImg01_04.png', label: '서류 송부', step: '03' },
              { img: '/images/sub/howImg01_03.png', label: '교육 진행', step: '04' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] text-point font-bold mb-1">STEP {item.step}</span>
                <span className="text-[14px] font-semibold text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* con17: 교육 문의하기 (reuse component) */}
      {/* ============================================ */}
      <ContactSection />

      {/* ============================================ */}
      {/* con18: 오시는 길 (reuse component) */}
      {/* ============================================ */}
      <MapSection />
    </>
  );
}
