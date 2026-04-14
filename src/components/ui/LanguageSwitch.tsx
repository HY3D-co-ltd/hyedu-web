'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === 'ko' ? 'en' : 'ko';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
      aria-label="Switch language"
    >
      {locale === 'ko' ? 'EN' : '한'}
    </button>
  );
}
