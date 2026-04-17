'use client';

import { useState } from 'react';

export default function PhoneCopyButton({ phone, isKo }: { phone: string; isKo: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center justify-center gap-2 bg-white text-point font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition-all"
      >
        {isKo ? '전화 걸기' : 'Call Now'}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/40 text-white font-semibold rounded-xl px-6 py-3 hover:bg-white/20 transition-all"
      >
        {copied
          ? isKo
            ? '복사됨!'
            : 'Copied!'
          : isKo
            ? '번호 복사'
            : 'Copy Number'}
      </button>
    </div>
  );
}
