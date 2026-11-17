import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ContactWizard, { WizardSkeleton } from '@/components/contact-wizard/ContactWizard';

/**
 * 교육 신청 위저드 내부 시험용 미리보기. 사양 §8.
 * - 메뉴 · 사이트맵 · 다른 페이지 링크에 넣지 않고 검색 노출을 막는다(접근 통제는 아니다).
 * - 항상 test:true로 보낸다. 배포 빌드에는 접수 중계 주소가 들어 있으므로 시험 접수(T-)도 실제로 저장되고,
 *   수신 측은 이를 운영 상담 목록과 알림으로 보내지 않는다. 시험 기록은 사람이 지운다.
 *   중계 주소 없이 빌드하면(로컬 등) 보내지 않는 시험 모드로 동작한다.
 * - 공개본은 /contact 다(2026-11-17 공개). 이 경로는 질문을 고칠 때 다시 시험하도록 남겨 둔다(사양 §8 공개 6번).
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
