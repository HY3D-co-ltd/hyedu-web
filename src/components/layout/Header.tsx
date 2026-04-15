'use client';

import Image from '@/components/ui/Img';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navigation from './Navigation';
import LanguageSwitch from '@/components/ui/LanguageSwitch';

export default function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/images/logo/logo.jpg"
              alt="한양미래연구소"
              width={140}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* Navigation + Language Switch */}
          <div className="flex items-center gap-4">
            <Navigation />
            <div className="hidden md:block">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
