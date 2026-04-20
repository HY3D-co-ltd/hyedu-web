'use client';

import Image from '@/components/ui/Img';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const SNS_LINKS = [
  {
    name: 'Naver Blog',
    url: 'https://m.blog.naver.com/hyhyedu/?tab=1',
    image: '/images/main/footer_sns01.png',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/channel/UC-k-dVuRwgf7OuIU5D8-54w',
    image: '/images/main/footer_sns02.png',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/hy_edu/',
    image: '/images/main/footer_sns03.png',
  },
];

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Company Info */}
          <div className="space-y-2">
            <p className="text-white font-semibold text-lg mb-3">{t('company')}</p>
            <p className="text-sm">{t('ceo')}</p>
            <p className="text-sm">{t('bizNo')}</p>
            <p className="text-sm">{t('address')}</p>
            <p className="text-sm">{t('tel')}</p>
            <p className="text-sm">{t('email')}</p>
          </div>

          {/* Column 2: Inquiry Hours */}
          <div className="space-y-2">
            <p className="text-white font-semibold text-lg mb-3">{t('operationInfo')}</p>
            <p className="text-sm">{t('hours')}</p>
            <p className="text-sm">{t('holiday')}</p>
            <p className="text-sm mt-4">{t('inquiry')}</p>
          </div>

          {/* Column 3: SNS Links */}
          <div>
            <p className="text-white font-semibold text-lg mb-4">SNS</p>
            <div className="flex items-center gap-4">
              {SNS_LINKS.map((sns) => (
                <Link
                  key={sns.name}
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sns.name}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={sns.image}
                    alt={sns.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                    unoptimized
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t('company')}. All rights reserved.
            {/* 관리자 전용 링크 — 의도적으로 눈에 띄지 않게 처리됨. */}
            <Link
              href="/admin/login/"
              aria-label="관리자"
              title="관리자"
              className="ml-3 inline-block align-middle text-gray-800 hover:text-gray-400 transition-colors select-none"
            >
              ·
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
