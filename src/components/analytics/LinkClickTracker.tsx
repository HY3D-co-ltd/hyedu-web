'use client';

import { useEffect } from 'react';
import { classifyLink } from '@/lib/analytics';

/**
 * 문서 전체의 링크 클릭을 한곳에서 받아 GA4 이벤트로 보낸다.
 * 링크마다 onClick을 달지 않는 것은 게시판 본문 HTML(dangerouslySetInnerHTML) 속 링크도
 * 같이 세기 위해서다. 어떤 링크를 세는지는 src/lib/analytics.ts의 classifyLink가 정한다.
 */
export default function LinkClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      const link = e.target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const name = classifyLink(link);
      if (!name) return;
      window.gtag?.('event', name, {
        link_url: link.href,
        link_text: linkText(link),
      });
    }
    // 캡처 단계에서 받아, 링크 쪽 핸들러가 전파를 막아도 센다.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}

function linkText(link: HTMLAnchorElement): string {
  // innerText는 화면에 보이는 대로 줄을 나눠 준다(textContent는 블록 사이 공백 없이 붙음).
  const text = link.getAttribute('aria-label') || link.innerText || link.textContent || '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 100);
}
