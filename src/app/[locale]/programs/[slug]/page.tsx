import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { programs } from '@/data/programs';
import { cancellationPolicies } from '@/data/cancellation-policy';
import { CourseJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const targetLabelKo: Record<string, string> = {
  elementary: '초등학생',
  middle: '중학생',
  high: '고등학생',
  adult: '성인',
};

const targetLabelEn: Record<string, string> = {
  elementary: 'Elementary School Students',
  middle: 'Middle School Students',
  high: 'High School Students',
  adult: 'Adults',
};

const categoryLabelKo: Record<string, string> = {
  ai: 'AI 인공지능',
  coding: '코딩',
  maker: '메이커 융합',
  steam: 'STEAM',
};

const categoryLabelEn: Record<string, string> = {
  ai: 'AI',
  coding: 'Coding',
  maker: 'Maker',
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

  const isKo = locale === 'ko';
  const title = isKo ? program.title : program.titleEn;
  const description = isKo ? program.description : program.descriptionEn;
  const curriculum = isKo ? program.curriculum : program.curriculumEn;
  const categoryLabel = isKo
    ? categoryLabelKo[program.category]
    : categoryLabelEn[program.category];

  const faqsForJsonLd = program.faq.map((f) => ({
    question: isKo ? f.question : f.questionEn,
    answer: isKo ? f.answer : f.answerEn,
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

  // Limit images to 6 for the photo grid
  const displayImages = program.images.slice(0, 6);

  return (
    <>
      {/* JSON-LD */}
      <CourseJsonLd program={program} locale={locale} />
      {program.faq.length > 0 && <FAQJsonLd faqs={faqsForJsonLd} />}
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '찾아가는 체험교실' : 'Experience Classes', href: `/${locale}/programs` },
          { name: title, href: `/${locale}/programs/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {categoryLabel}
            </span>
            {program.target.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
              >
                {isKo ? targetLabelKo[t] : targetLabelEn[t]}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90 max-w-2xl">{description}</p>
        </div>
      </section>

      {/* SECTION 1: 추천드립니다 */}
      <section className="py-14 px-6 bg-[#f0f4ff]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isKo ? '추천드립니다' : 'We Recommend'}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <span className="text-gray-800">
                <span className="text-primary font-bold">
                  {isKo
                    ? '4차산업혁명을 이끌어나갈 메이커를 꿈꾸는 초·중·고등학생'
                    : 'Elementary, middle, and high school students dreaming of becoming makers leading the 4th Industrial Revolution'}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-400" />
              <span className="text-gray-700">
                {isKo
                  ? '진로·학습·인성 영역과 연계한 체험 프로그램을 고민하는 학교'
                  : 'Schools considering experience programs linked to career, learning, and character development'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-400" />
              <span className="text-gray-700">
                {isKo
                  ? '특강, 워크샵, 연수, 멘토링 등 다양한 프로그램을 진행하려는 기관'
                  : 'Institutions planning to conduct various programs such as special lectures, workshops, training, and mentoring'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-400" />
              <span className="text-gray-700">
                {isKo
                  ? '지역 특색에 맞는 프로그램을 지원하려는 지자체 또는 교육청'
                  : 'Local governments or education offices looking to support programs tailored to regional characteristics'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 2: 교육소개 */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isKo ? '교육소개' : 'Education Introduction'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '과정' : 'Course'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {categoryLabel}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '난도' : 'Difficulty'}
                  </th>
                  <td className="px-4 py-3">
                    <Image
                      src="/images/sub/star3.png"
                      alt={isKo ? '난이도 3' : 'Difficulty 3'}
                      width={80}
                      height={16}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '추천' : 'Recommended'}
                  </th>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-gray-700">
                        <Image
                          src={hasElementary ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasElementary ? 'checked' : 'unchecked'}
                          width={20}
                          height={20}
                        />
                        {isKo ? '초등' : 'Elementary'}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-700">
                        <Image
                          src={hasMiddle ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasMiddle ? 'checked' : 'unchecked'}
                          width={20}
                          height={20}
                        />
                        {isKo ? '중등' : 'Middle'}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-700">
                        <Image
                          src={hasHigh ? '/images/sub/check1.png' : '/images/sub/check0.png'}
                          alt={hasHigh ? 'checked' : 'unchecked'}
                          width={20}
                          height={20}
                        />
                        {isKo ? '고등' : 'High'}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '시간' : 'Duration'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {program.duration}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '인원' : 'Capacity'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {isKo ? '최소 인원 20명' : 'Minimum 20 students'}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '비용' : 'Price'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {isKo ? program.price : program.priceEn}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200">
                    {isKo ? '장소' : 'Venue'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {isKo
                      ? '학교 교실, 강당 또는 기관 내 교육 공간 (빔 프로젝터, 와이파이 필요)'
                      : 'School classroom, auditorium, or institutional training space (beam projector and Wi-Fi required)'}
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 border-r border-gray-200 align-top">
                    {isKo ? '수업목표' : 'Objectives'}
                  </th>
                  <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                    {description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 3: 학습 단계 */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isKo ? '학습 단계' : 'Learning Stages'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 도입 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">STEP 1</span>
                <h3 className="font-bold text-gray-900">{isKo ? '도입' : 'Introduction'}</h3>
              </div>
              <ul className="space-y-2">
                {introItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 전개 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">STEP 2</span>
                <h3 className="font-bold text-gray-900">{isKo ? '전개' : 'Development'}</h3>
              </div>
              <ul className="space-y-2">
                {devItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 마무리 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">STEP 3</span>
                <h3 className="font-bold text-gray-900">{isKo ? '마무리' : 'Wrap-up'}</h3>
              </div>
              <ul className="space-y-2">
                {wrapItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 교육사진 */}
      {displayImages.length > 0 && (
        <section className="py-14 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {isKo ? '교육사진' : 'Program Photos'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={`${title} ${isKo ? '교육사진' : 'program photo'} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: 인재 양성 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">
            {isKo
              ? '4차산업혁명 기술교육, 어떻게 시작하는게 좋을까?'
              : 'How should you start 4th Industrial Revolution technology education?'}
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-10">
            {isKo
              ? '인재 양성을 위한 필수 학습 한양미래연구소 대표 교육으로 시작하세요!'
              : 'Start with Hanyang Future Lab\'s flagship education for essential talent development!'}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex justify-center">
                <Image
                  src={`/images/sub/talent_icon01_0${n}.png`}
                  alt={`${isKo ? '인재 양성 아이콘' : 'talent icon'} ${n}`}
                  width={100}
                  height={100}
                  className="w-full max-w-[100px] h-auto"
                />
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-primary text-white font-bold px-10 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            {isKo ? '신청하기' : 'Apply Now'}
          </Link>
        </div>
      </section>

      {/* SECTION 6: 리뷰 & 만족도 */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/sub/true_review01_01.png"
                alt={isKo ? '리뷰' : 'Reviews'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/sub/true_review01_02.png"
                alt={isKo ? '만족도 설문조사' : 'Satisfaction Survey'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/sub/true_review01_03.png"
                alt={isKo ? '커리큘럼' : 'Curriculum'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: 4차산업기술교육 특징 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {isKo
              ? '4차산업기술교육 답은 한양미래연구소에 있습니다.'
              : 'The answer to 4th Industrial Revolution education is at Hanyang Future Lab.'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: '/images/main/feature01_01.png',
                title: isKo ? '맞춤형 교육' : 'Customized Education',
                description: isKo ? '학교, 기관의 니즈에 맞춘 맞춤형 커리큘럼을 제공합니다.' : 'We provide customized curricula tailored to the needs of schools and institutions.',
              },
              {
                image: '/images/main/feature01_02.png',
                title: isKo ? '교육의 다양성' : 'Educational Diversity',
                description: isKo ? 'AI, 로봇, IoT, 메이커 등 다양한 4차 산업 기술 교육을 제공합니다.' : 'We offer diverse 4th industrial technology education including AI, robots, IoT, and maker.',
              },
              {
                image: '/images/main/feature01_03.png',
                title: isKo ? '베테랑 강사진' : 'Veteran Instructors',
                description: isKo ? '검증된 전문 강사진이 최고 수준의 교육을 진행합니다.' : 'Verified expert instructors deliver the highest level of education.',
              },
              {
                image: '/images/main/feature01_04.png',
                title: isKo ? '기술직업 체험교육' : 'Tech Career Experience',
                description: isKo ? '미래 기술 직업을 직접 체험하며 진로를 탐색합니다.' : 'Explore career paths by directly experiencing future technology jobs.',
              },
              {
                image: '/images/main/feature01_05.png',
                title: isKo ? '사고력을 기르는 PBL 수업' : 'PBL Classes for Critical Thinking',
                description: isKo ? '문제 기반 학습으로 창의적 사고력을 키웁니다.' : 'Develop creative thinking through problem-based learning.',
              },
              {
                image: '/images/main/feature01_06.png',
                title: isKo ? '협동하며 문제해결' : 'Collaborative Problem Solving',
                description: isKo ? '팀 프로젝트를 통해 협업 능력과 문제해결 능력을 기릅니다.' : 'Build collaboration and problem-solving skills through team projects.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: 연령별 추천 교육 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            {isKo ? '연령별 추천 교육' : 'Age-based Recommended Programs'}
          </h2>

          {/* 초등 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isKo ? '초등' : 'Elementary'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_01', 'class01_02', 'class01_03'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt={isKo ? '초등 추천 교육' : 'Elementary recommended program'}
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isKo ? '중등' : 'Middle School'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_04', 'class01_05', 'class01_06'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt={isKo ? '중등 추천 교육' : 'Middle school recommended program'}
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isKo ? '고등' : 'High School'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['class01_07', 'class01_08', 'class01_09'].map((img) => (
                <div key={img} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={`/images/sub/${img}.png`}
                    alt={isKo ? '고등 추천 교육' : 'High school recommended program'}
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

      {/* SECTION 9: 필독사항 & 취소·변경 규정 */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 필독사항 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_01.png"
                alt={isKo ? '필독사항' : 'Must-read'}
                width={40}
                height={40}
              />
              <h3 className="text-lg font-bold text-gray-900">
                {isKo ? '필독사항' : 'Must-Read Information'}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
                {isKo
                  ? '최소 인원은 20명이며, 20명 미만 시 별도 협의가 필요합니다.'
                  : 'Minimum 20 students; separate consultation required for fewer than 20.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
                {isKo
                  ? '교육 희망일로부터 최소 3주 전에 예약해 주세요.'
                  : 'Please book at least 3 weeks before the desired education date.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
                {isKo
                  ? '교육 장소에 빔 프로젝터와 와이파이가 준비되어야 합니다.'
                  : 'A beam projector and Wi-Fi must be available at the education venue.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
                {isKo
                  ? '교육 교구는 수업 종료 후 반납하며, 파손 시 배상 책임이 있습니다.'
                  : 'Teaching aids must be returned after class; students are liable for damages.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
                {isKo
                  ? '커리큘럼은 학교/기관의 요청에 따라 조정될 수 있습니다.'
                  : 'The curriculum can be adjusted according to school/institution requests.'}
              </li>
            </ul>
          </div>

          {/* 취소·변경 규정 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/sub/rule01_02.png"
                alt={isKo ? '취소·변경 규정' : 'Cancellation Policy'}
                width={40}
                height={40}
              />
              <h3 className="text-lg font-bold text-gray-900">
                {isKo ? '취소·변경 규정' : 'Cancellation & Change Policy'}
              </h3>
            </div>
            {policy && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                        {isKo ? '시기' : 'Timing'}
                      </th>
                      <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                        {isKo ? '취소' : 'Cancellation'}
                      </th>
                      <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                        {isKo ? '변경' : 'Changes'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {policy.rules.map((rule, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="border border-gray-200 px-3 py-2 text-gray-700">
                          {isKo ? rule.timing : rule.timingEn}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-700">
                          {isKo ? rule.cancellation : rule.cancellationEn}
                        </td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-700">
                          {isKo ? rule.changes : rule.changesEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 10: 교육 신청 방법 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/images/sub/how01_01.png"
              alt={isKo ? '교육 신청 방법' : 'How to Apply'}
              width={40}
              height={40}
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {isKo ? '교육 신청 방법' : 'How to Apply'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: '/images/sub/howImg01_01.png', label: isKo ? '교육 문의' : 'Inquiry', step: '01' },
              { img: '/images/sub/howImg01_02.png', label: isKo ? '교육 확정' : 'Confirmation', step: '02' },
              { img: '/images/sub/howImg01_04.png', label: isKo ? '서류 송부' : 'Documents', step: '03' },
              { img: '/images/sub/howImg01_03.png', label: isKo ? '교육 진행' : 'Education', step: '04' },
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
                <span className="text-xs text-primary font-bold mb-1">STEP {item.step}</span>
                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: 교육 문의하기 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/sub/inqury1_01.png"
              alt={isKo ? '교육 문의하기' : 'Contact Us'}
              width={48}
              height={48}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {isKo ? '교육 문의하기' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 mb-10">
            {isKo
              ? '교육 일정, 가격 견적 등 교육 관련 질문이 있다면 편하신 방법으로 문의해주세요'
              : 'If you have questions about schedules, pricing, etc., feel free to contact us'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://pf.kakao.com/_fxbVcs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#FEE500] text-gray-900 font-semibold rounded-xl px-8 py-4 hover:brightness-95 transition-all duration-200 shadow-md"
            >
              <Image
                src="/images/main/kakao.png"
                alt={isKo ? '카카오톡' : 'KakaoTalk'}
                width={32}
                height={32}
              />
              {isKo ? '카카오톡 바로가기' : 'KakaoTalk'}
            </a>
            <a
              href="mailto:hyedu0829@gmail.com"
              className="flex items-center justify-center gap-3 bg-primary text-white font-semibold rounded-xl px-8 py-4 hover:bg-primary-dark transition-all duration-200 shadow-md"
            >
              <Image
                src="/images/main/mail.svg"
                alt={isKo ? '메일' : 'Email'}
                width={32}
                height={32}
              />
              {isKo ? '메일 전송하기' : 'Send Email'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
