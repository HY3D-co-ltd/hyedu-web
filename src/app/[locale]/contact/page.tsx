import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
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
        ? '한양미래연구소 교육 신청 및 문의. 카카오톡, 이메일(hyedu0829@gmail.com), 전화(070-8064-0829)로 문의하세요.'
        : 'Apply for Hanyang Future Lab education programs. Contact via KakaoTalk, email (hyedu0829@gmail.com), or phone (070-8064-0829).',
    keywords:
      locale === 'ko'
        ? ['한양미래연구소 문의', '교육 신청', '카카오톡 문의', '교육 예약']
        : ['Hanyang Future Lab contact', 'education apply', 'kakaotalk inquiry'],
  };
}

const faqsKo = [
  {
    question: '교육 신청은 어떻게 하나요?',
    answer: '카카오톡 채널, 이메일(hyedu0829@gmail.com), 또는 전화(070-8064-0829)로 문의해 주시면 안내드립니다.',
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
    answer: 'Contact us via KakaoTalk channel, email (hyedu0829@gmail.com), or phone (070-8064-0829) and we will guide you through the process.',
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

      {/* Contact methods (mirrors homepage ContactSection) */}
      <section className="py-16 px-4 bg-gray-50" aria-label={isKo ? '문의 방법' : 'Contact Methods'}>
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
          <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-2">
            {isKo ? '교육 문의하기' : 'Contact Us'}
          </h2>
          <p className="text-[15px] text-gray-600 mb-8">
            {isKo ? (
              <>
                교육 일정, 가격 견적 등 교육 관련 질문이 있다면 편하신 방법으로 문의해주세요<br />
                빠른 답변을 원하신다면 전화 문의 부탁드립니다
              </>
            ) : (
              <>
                For questions about schedules, pricing, or anything else, please reach out the way you prefer.<br />
                For the fastest response, please contact us by phone.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a
              href="https://pf.kakao.com/_fxbVcs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#FEE500] text-gray-900 font-semibold rounded-xl px-8 py-4 hover:brightness-95 transition-all shadow-md"
              aria-label={isKo ? '카카오톡 채널 바로가기' : 'Open KakaoTalk Channel'}
            >
              <Image src="/images/main/kakao.png" alt="" width={32} height={32} />
              {isKo ? '카카오톡 바로가기' : 'Open KakaoTalk'}
            </a>
            <a
              href="mailto:hyedu0829@gmail.com"
              className="flex items-center justify-center gap-3 bg-point text-white font-semibold rounded-xl px-8 py-4 hover:opacity-90 transition-all shadow-md"
            >
              <Image src="/images/main/mail.svg" alt="" width={32} height={32} />
              {isKo ? '메일 전송하기' : 'Send Email'}
            </a>
          </div>

          {/* Phone number / business hours image (from main page) */}
          <div className="flex justify-center">
            <Image
              src="/images/main/inquiry01_02.png"
              alt={
                isKo
                  ? '교육 문의 전화번호 070-8064-0829 업무시간 안내'
                  : 'Inquiry phone 070-8064-0829 and business hours'
              }
              width={600}
              height={200}
              className="w-full max-w-[600px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white" aria-label={isKo ? '자주 묻는 질문' : 'FAQ'}>
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
      <section className="py-16 px-6 bg-gray-50" aria-label={isKo ? '오시는 길' : 'Location'}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isKo ? '오시는 길' : 'Location'}
          </h2>
          <div className="rounded-2xl bg-white border border-gray-200 p-6 text-left shadow-sm">
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
