'use client';

import Image from '@/components/ui/Img';
import { useLocale } from 'next-intl';
import type { MouseEvent } from 'react';

export default function ContactSection() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  const handlePhoneClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${locale}/phone/`;
    }
  };
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
        <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-2">
          {isKo ? '교육 문의하기' : 'Contact Us'}
        </h2>
        <p className="text-[15px] text-gray-600 mb-8">
          {isKo ? (
            <>
              교육 일정, 가격 견적 등 교육 관련 질문이 있다면 편하신 방법으로 문의해주세요
              <br />
              빠른 답변을 원하신다면 전화 문의 부탁드립니다
            </>
          ) : (
            <>
              For questions about schedules, pricing, or anything else, please reach out the way you prefer.
              <br />
              For the fastest response, please contact us by phone.
            </>
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 sm:gap-5 md:gap-6">
          {/* 카카오톡 */}
          <a
            href="https://pf.kakao.com/_fxbVcs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#FEE500] text-gray-900 font-semibold rounded-xl px-8 py-4 hover:brightness-95 transition-all shadow-md"
          >
            <Image src="/images/main/kakao.png" alt={isKo ? '카카오톡' : 'KakaoTalk'} width={32} height={32} />
            {isKo ? '카카오톡 바로가기' : 'Open KakaoTalk'}
          </a>

          {/* 전화 */}
          <a
            href="tel:070-8064-0829"
            onClick={handlePhoneClick}
            className="flex items-center justify-center gap-3 bg-point text-white font-semibold rounded-xl px-8 py-4 hover:opacity-90 transition-all shadow-md"
          >
            <Image src="/images/main/phone.svg" alt={isKo ? '전화' : 'Phone'} width={32} height={32} />
            {isKo ? '전화 문의하기' : 'Call Us'}
          </a>

          {/* 이메일 (Gmail) */}
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold rounded-xl px-8 py-4 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-md"
          >
            {/* Gmail 로고 (인라인 SVG, 컬러 유지) */}
            <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
              <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
              <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
              <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8h0C4.924 8 3 9.924 3 12.298z"/>
              <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8h0C43.076 8 45 9.924 45 12.298z"/>
            </svg>
            {isKo ? '이메일로 문의하기' : 'Email Us'}
          </a>
        </div>
      </div>
    </section>
  );
}
