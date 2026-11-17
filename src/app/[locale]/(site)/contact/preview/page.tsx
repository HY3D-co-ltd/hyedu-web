import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ContactWizard, { WizardSkeleton } from '@/components/contact-wizard/ContactWizard';

/**
 * 교육 신청 위저드 내부 시험용 미리보기. 사양 §8.
 * - 메뉴 · 사이트맵 · 다른 페이지 링크에 넣지 않고 검색 노출을 막는다(접근 통제는 아니다).
 * - 항상 test:true로 보내고, 접수 중계가 없으면 보내지 않는 시험 모드로 동작한다.
 * - 지금 /contact 는 그대로 두고, 공개(커트오버) 때 이 위저드를 /contact 로 옮긴다.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '교육 신청 (시험) | 한양미래연구소' : 'Apply (test) | Hanyang Future Lab',
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function ContactPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <section className="bg-white pt-10 pb-16 md:pt-14">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4 mb-8 text-center">
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">Education Application</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{isKo ? '교육 신청' : 'Apply for a program'}</h1>
        <p className="mt-3 text-[15px] text-gray-500 break-keep">
          {isKo ? '몇 가지만 골라 주시면 담당자가 견적과 교육계획안을 준비해 연락드려요.' : "Answer a few questions and we'll get back to you with a quote and lesson plan."}
        </p>
      </div>
      <Suspense fallback={<WizardSkeleton />}>
        <ContactWizard mode="preview" locale={locale} />
      </Suspense>
    </section>
  );
}
