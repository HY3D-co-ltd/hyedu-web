'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const programCategories = [
  {
    title: '찾아가는 체험교실',
    description: '학교·기관 직접 방문 교육',
    href: '/programs',
    gradient: 'from-blue-600 to-blue-800',
    backgroundImage: '/images/main/hyedu_program_2_visit_class.png',
  },
  {
    title: '체험 부스',
    description: '행사·축제 체험 부스 운영',
    href: '/booth',
    gradient: 'from-green-600 to-emerald-800',
    backgroundImage: '/images/main/hyedu_program_3_maker_booth.png',
  },
  {
    title: '캠프',
    description: '방학 특별 집중 캠프',
    href: '/camp',
    gradient: 'from-orange-500 to-orange-800',
    backgroundImage: '/images/main/hyedu_program_4_campus_tour.png',
  },
];

export default function ProgramPreview() {
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <section className="py-16 px-6 bg-white" aria-label="프로그램 소개">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          교육 프로그램
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programCategories.map((category) => (
            <Link
              key={category.href}
              href={buildHref(category.href)}
              className={`group relative flex flex-col items-center justify-center aspect-[3/2] rounded-xl bg-gradient-to-br ${category.gradient} text-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              {/* Background image */}
              {category.backgroundImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.backgroundImage})` }}
                />
              )}
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="relative z-10 text-center px-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm md:text-base text-white/80">{category.description}</p>
                <span className="inline-block mt-4 text-xs font-semibold tracking-widest uppercase border border-white/60 rounded-full px-4 py-1 group-hover:bg-white/20 transition-colors duration-300">
                  자세히 보기
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
