'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { navigationItems } from '@/data/navigation';
import { NavItem } from '@/types';

export default function Navigation() {
  const locale = useLocale();
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const buildHref = (href: string) => `/${locale}${href}`;

  const toggleMobileItem = (labelKey: string) => {
    setMobileExpanded((prev) => (prev === labelKey ? null : labelKey));
  };

  return (
    <nav>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-1">
        {navigationItems.map((item: NavItem) => (
          <li key={item.labelKey} className="relative group">
            {item.href ? (
              <Link
                href={buildHref(item.href)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <button
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                aria-haspopup="true"
              >
                {t(item.labelKey)}
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Desktop Dropdown */}
            {item.children && (
              <ul className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {item.children.map((child: NavItem) => (
                  <li key={child.labelKey}>
                    <Link
                      href={buildHref(child.href!)}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {t(child.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
          <ul className="py-2">
            {navigationItems.map((item: NavItem) => (
              <li key={item.labelKey}>
                {item.href ? (
                  <Link
                    href={buildHref(item.href)}
                    className="block px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                ) : (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => toggleMobileItem(item.labelKey)}
                      aria-expanded={mobileExpanded === item.labelKey}
                    >
                      {t(item.labelKey)}
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileExpanded === item.labelKey ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileExpanded === item.labelKey && item.children && (
                      <ul className="bg-gray-50 border-t border-gray-100">
                        {item.children.map((child: NavItem) => (
                          <li key={child.labelKey}>
                            <Link
                              href={buildHref(child.href!)}
                              className="block px-10 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {t(child.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
