import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { programs } from '@/data/programs';
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

      {/* Info Grid */}
      <section className="py-10 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {isKo ? '교육 대상' : 'Target'}
            </p>
            <p className="text-gray-800 font-semibold text-sm">
              {program.target
                .map((t) => (isKo ? targetLabelKo[t] : targetLabelEn[t]))
                .join(', ')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {isKo ? '가격' : 'Price'}
            </p>
            <p className="text-primary font-semibold text-sm">
              {isKo ? program.price : program.priceEn}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {isKo ? '소요시간' : 'Duration'}
            </p>
            <p className="text-gray-800 font-semibold text-sm">{program.duration}</p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {program.images.length > 0 && (
        <section className="py-14 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isKo ? '교육 활동 사진' : 'Program Gallery'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {program.images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
                  <Image
                    src={img}
                    alt={`${title} ${isKo ? '활동 사진' : 'activity photo'} ${idx + 1}`}
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

      {/* Curriculum */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isKo ? '커리큘럼' : 'Curriculum'}
          </h2>
          <ol className="space-y-3">
            {curriculum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-gray-700 pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      {program.faq.length > 0 && (
        <section className="py-14 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isKo ? '자주 묻는 질문' : 'FAQ'}
            </h2>
            <div className="space-y-4">
              {program.faq.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Q. {isKo ? item.question : item.questionEn}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A. {isKo ? item.answer : item.answerEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-6 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isKo ? '교육 신청 및 문의' : 'Apply & Inquire'}
          </h2>
          <p className="opacity-90 mb-8">
            {isKo
              ? '지금 바로 신청하거나 궁금한 점을 문의해 주세요.'
              : 'Apply now or feel free to ask any questions.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isKo ? '교육 신청/문의하기' : 'Apply / Contact'}
          </Link>
        </div>
      </section>
    </>
  );
}
