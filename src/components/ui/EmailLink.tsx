'use client';

import type { MouseEvent, ReactNode } from 'react';
import type { LinkClickEvent } from '@/lib/analytics';

// 이메일 문의 링크 — 받는 사람·제목이 채워진 메일 작성 화면을 연다.
// - PC: Gmail 작성 창(새 탭). PC는 mailto: 처리 프로그램이 설정되지 않은 경우가 많아
//   클릭해도 아무 일이 없거나 Outlook 설정 화면이 뜨기 때문에 Gmail 웹을 쓴다.
// - 모바일: mailto:. 휴대폰에는 기본 메일 앱이 항상 있어 가장 확실하게 작성 화면이 열린다.
// 기기 판별은 ContactSection 전화 버튼과 같은 userAgent 방식을 쓴다.
const MOBILE_UA = /Mobi|Android|iPhone|iPad|iPod/i;

// href가 Gmail 작성 창이라 주소만으로는 메일 문의인 줄 모르므로 GA4 이벤트 이름을 직접 밝힌다(src/lib/analytics.ts).
const TRACK_EVENT: LinkClickEvent = 'click_email';

export default function EmailLink({
  to,
  subject,
  className,
  ariaLabel,
  children,
}: {
  to: string;
  subject: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}`;
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (MOBILE_UA.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = mailtoUrl;
    }
  };

  return (
    <a
      href={gmailComposeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-track={TRACK_EVENT}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
