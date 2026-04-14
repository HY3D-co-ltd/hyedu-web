import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { cancellationPolicies } from '@/data/cancellation-policy';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ko'
        ? '교육 신청/문의 | 한양미래연구소'
        : 'Contact / Apply | Hanyang Future Lab',
    description:
      locale === 'ko'
        ? '한양미래연구소 교육 신청 및 문의. 카카오톡, 이메일(hyedu0829@gmail.com), 전화(070-8064-0829)로 문의하세요. 취소/환불 규정 안내.'
        : 'Apply for Hanyang Future Lab education programs. Contact via KakaoTalk, email (hyedu0829@gmail.com), or phone (070-8064-0829). Cancellation and refund policies included.',
    keywords:
      locale === 'ko'
        ? ['한양미래연구소 문의', '교육 신청', '카카오톡 문의', '취소 환불 규정', '교육 예약']
        : ['Hanyang Future Lab contact', 'education apply', 'cancellation policy', 'refund policy'],
  };
}

const faqsKo = [
  {
    question: '교육 신청은 어떻게 하나요?',
    answer: '카카오톡 채널, 이메일(hyedu0829@gmail.com), 또는 전화(070-8064-0829)로 문의해 주시면 안내드립니다. 구글 폼을 통해 신청서를 작성하실 수도 있습니다.',
  },
  {
    question: '취소/환불은 어떻게 되나요?',
    answer: '체험교실은 15일 이전 무료 취소 가능하며, 7일 이내 취소 불가합니다. 캠프/부스는 15일 이전 100% 환불, 7일 이내 취소/환불 불가입니다. 자세한 사항은 취소/환불 규정 표를 참고해 주세요.',
  },
  {
    question: '단체 할인이 있나요?',
    answer: '단체 규모와 프로그램에 따라 별도 협의가 가능합니다. 카카오톡 또는 전화로 문의해 주세요.',
  },
  {
    question: '어떤 학교나 기관에서 신청할 수 있나요?',
    answer: '초등학교, 중학교, 고등학교, 지역아동센터, 청소년센터, 도서관 등 다양한 교육기관에서 신청 가능합니다.',
  },
];

const faqsEn = [
  {
    question: 'How do I apply for education programs?',
    answer: 'Contact us via KakaoTalk channel, email (hyedu0829@gmail.com), or phone (070-8064-0829). You can also submit an application form via Google Forms.',
  },
  {
    question: 'What is the cancellation/refund policy?',
    answer: 'For experience classes: free cancellation 15+ days before, no cancellation within 7 days. For camps/booths: 100% refund 15+ days before, no cancellation/refund within 7 days. Please see the policy table for details.',
  },
  {
    question: 'Are there group discounts?',
    answer: 'Group discounts can be negotiated depending on group size and program. Please contact us via KakaoTalk or phone.',
  },
  {
    question: 'What schools or institutions can apply?',
    answer: 'Elementary schools, middle schools, high schools, local children centers, youth centers, libraries, and various other educational institutions can apply.',
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';

  const faqs = isKo ? faqsKo : faqsEn;

  const experiencePolicy = cancellationPolicies.find((p) => p.type === 'experience');
  const campPolicy = cancellationPolicies.find((p) => p.type === 'camp');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '교육 신청/문의' : 'Contact', href: `/${locale}/contact` },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            {isKo ? '교육 신청/문의' : 'Apply / Contact'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isKo ? '교육 신청 / 문의' : 'Apply / Contact'}
          </h1>
          <p className="text-xl opacity-90">
            {isKo
              ? '궁금한 점이 있으시면 언제든지 문의해 주세요'
              : 'Feel free to contact us anytime with your questions'}
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '문의 방법' : 'Contact Methods'}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {isKo ? '문의 방법' : 'Contact Methods'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isKo
              ? '아래 방법으로 언제든 문의해 주세요'
              : 'Contact us through any of the methods below'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KakaoTalk */}
            <a
              href="https://pf.kakao.com/_xoVxmxj"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-6 text-center hover:shadow-lg hover:border-yellow-400 transition-all duration-200"
              aria-label={isKo ? '카카오톡 채널 바로가기' : 'Go to KakaoTalk Channel'}
            >
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isKo ? '카카오톡 문의' : 'KakaoTalk'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isKo
                  ? '카카오톡 채널로 실시간 문의하세요'
                  : 'Chat with us in real-time via KakaoTalk channel'}
              </p>
              <span className="inline-block px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 font-semibold text-sm group-hover:bg-yellow-500 transition-colors">
                {isKo ? '채널 바로가기' : 'Open Channel'}
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hyedu0829@gmail.com"
              className="group rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 text-center hover:shadow-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
              aria-label="hyedu0829@gmail.com"
            >
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isKo ? '이메일 문의' : 'Email'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isKo
                  ? '자세한 문의는 이메일로 보내주세요'
                  : 'Send detailed inquiries via email'}
              </p>
              <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                hyedu0829@gmail.com
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:070-8064-0829"
              className="group rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 text-center hover:shadow-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200"
              aria-label="070-8064-0829"
            >
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isKo ? '전화 문의' : 'Phone'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isKo
                  ? '전화로 빠르게 문의하세요'
                  : 'Call us for a quick response'}
              </p>
              <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                070-8064-0829
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Application form link */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '교육 신청서' : 'Application Form'}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isKo ? '교육 신청서 작성' : 'Fill Out Application Form'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isKo
              ? '아래 버튼을 클릭하여 교육 신청서를 작성해 주세요. 담당자가 확인 후 연락드립니다.'
              : 'Click the button below to fill out the education application form. Our staff will contact you after reviewing.'}
          </p>
          <a
            href="https://forms.gle/MMxBhw7PHCphfs1w9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span>📝</span>
            <span>{isKo ? '신청서 작성하기' : 'Fill Out Application'}</span>
          </a>
          <p className="mt-4 text-sm text-gray-400">
            {isKo
              ? '신청서 작성 후 카카오톡 또는 전화로 추가 확인 연락을 드립니다.'
              : 'After submitting, we will follow up via KakaoTalk or phone.'}
          </p>
        </div>
      </section>

      {/* Cancellation policies */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '취소/환불 규정' : 'Cancellation & Refund Policy'}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {isKo ? '취소/환불 규정' : 'Cancellation & Refund Policy'}
          </h2>

          {/* Experience classroom policy */}
          {experiencePolicy && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {isKo ? '체험교실 취소/변경 규정' : 'Experience Class Cancellation & Change Policy'}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        {isKo ? '취소/변경 시점' : 'Timing'}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        {isKo ? '취소 규정' : 'Cancellation'}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        {isKo ? '변경 규정' : 'Changes'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiencePolicy.rules.map((rule, i) => (
                      <tr
                        key={rule.timing}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {isKo ? rule.timing : rule.timingEn}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {isKo ? rule.cancellation : rule.cancellationEn}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {isKo ? rule.changes : rule.changesEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Camp / booth policy */}
          {campPolicy && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {isKo ? '캠프/부스 환불 규정' : 'Camp / Booth Refund Policy'}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        {isKo ? '취소 시점' : 'Timing'}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        {isKo ? '환불 규정' : 'Refund Policy'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campPolicy.rules.map((rule, i) => (
                      <tr
                        key={rule.timing}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {isKo ? rule.timing : rule.timingEn}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {isKo ? rule.cancellation : rule.cancellationEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            {isKo
              ? '※ 천재지변, 기상이변 등 불가항력적 사유로 인한 취소 시 별도 협의됩니다.'
              : '※ Cancellations due to force majeure (natural disasters, extreme weather, etc.) will be handled separately.'}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '자주 묻는 질문' : 'FAQ'}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location info */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '오시는 길' : 'Location'}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isKo ? '오시는 길' : 'Location'}
          </h2>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {isKo ? '주소' : 'Address'}
                </div>
                <div className="text-gray-800 font-medium">
                  {isKo
                    ? '경기도 안산시 상록구 한양대학로 55 5공학관 창업실'
                    : '55 Hanyang University Road, 5th Engineering Building Startup Room, Sangnok-gu, Ansan, Gyeonggi-do'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {isKo ? '전화' : 'Phone'}
                </div>
                <div className="text-gray-800 font-medium">070-8064-0829</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {isKo ? '이메일' : 'Email'}
                </div>
                <div className="text-gray-800 font-medium">hyedu0829@gmail.com</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {isKo ? '운영시간' : 'Business Hours'}
                </div>
                <div className="text-gray-800 font-medium">
                  {isKo ? '평일 09:00 - 18:00' : 'Weekdays 09:00 - 18:00'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
