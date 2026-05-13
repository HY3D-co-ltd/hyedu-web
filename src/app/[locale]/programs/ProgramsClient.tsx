'use client';

import { useState } from 'react';
import Image from '@/components/ui/Img';
import Link from 'next/link';
import { programs } from '@/data/programs';

type Category = 'all' | 'ai' | 'coding' | 'maker' | 'steam';
type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const categoryTabs: { value: Category; label: Bi }[] = [
  { value: 'all', label: { ko: 'ALL', en: 'ALL' } },
  { value: 'ai', label: { ko: 'AI 인공지능 교육', en: 'AI' } },
  { value: 'coding', label: { ko: '코딩 교육', en: 'Coding' } },
  { value: 'maker', label: { ko: '메이커 융합 교육', en: 'Maker Convergence' } },
  { value: 'steam', label: { ko: 'STEAM 교육', en: 'STEAM' } },
];

const targetLabel: Record<string, Bi> = {
  elementary: { ko: '초등', en: 'Elementary' },
  middle: { ko: '중등', en: 'Middle' },
  high: { ko: '고등', en: 'High' },
  adult: { ko: '성인', en: 'Adult' },
};

const categoryBadgeClass: Record<string, string> = {
  ai: 'bg-blue-600',
  coding: 'bg-orange-500',
  maker: 'bg-green-600',
  steam: 'bg-purple-600',
};

const categoryLabel: Record<string, Bi> = {
  ai: { ko: 'AI 인공지능 교육', en: 'AI Education' },
  coding: { ko: '코딩 교육', en: 'Coding' },
  maker: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
  steam: { ko: 'STEAM 교육', en: 'STEAM' },
};

export default function ProgramsClient({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const isKo = locale === 'ko';

  // hidden:true 인 프로그램은 모든 노출에서 제외
  const visiblePrograms = programs.filter((p) => !p.hidden);

  const filtered = visiblePrograms.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const title = isKo ? p.title : p.titleEn;
    const matchSearch =
      searchKeyword === '' || title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Hero — 밝은 파스텔 디자인 */}
      <section className="relative py-16 md:py-20 px-4 text-center overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
        {/* 배경 장식 */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-12 w-80 h-80 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-sky-200/30 blur-2xl" />
        </div>
        {/* 도트 패턴 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(51,102,102,0.18) 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          {/* 라벨 */}
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.2em] text-point uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-point animate-pulse" />
            Visit Experience Class
          </span>

          {/* 메인 헤드라인 */}
          <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold mt-2 text-slate-900 leading-tight">
            {isKo ? (
              <>
                <span className="text-point">찾아가는</span> 체험교실
              </>
            ) : (
              <>
                <span className="text-point">On-site</span> Experience Classes
              </>
            )}{' '}
            <small className="text-[18px] md:text-[22px] lg:text-[26px] font-bold text-slate-500 align-middle">
              ({isKo ? '1회기' : 'single-session'})
            </small>
          </h1>

          {/* 서브카피 */}
          <p className="text-base md:text-lg mt-5 text-slate-700 max-w-[680px] mx-auto leading-relaxed font-medium">
            {isKo
              ? '각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여 첨단 장비와 미래기술을 활용한 수준별 체험 프로그램'
              : 'On-site visits to regional youth training centers, schools, and culture centers — leveled hands-on programs using advanced equipment and future technologies.'}
          </p>

          {/* 큰 CTA 버튼 2개 */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-point text-white font-extrabold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:scale-105 hover:shadow-2xl transition-all"
              style={{ boxShadow: '0 10px 30px rgba(51,102,102,0.35)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isKo ? '교육 신청하기' : 'Apply Now'}
            </Link>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/files/2026-programs-curriculum.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-point font-extrabold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-point hover:bg-point hover:text-white hover:scale-105 transition-all"
              style={{ boxShadow: '0 8px 24px rgba(51,102,102,0.15)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isKo ? '커리큘럼 보기' : 'View Curriculum'}
            </a>
          </div>
        </div>
      </section>

      {/* 검색 + 탭 */}
      <section className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <div className="flex justify-end mb-4">
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder={isKo ? '검색어를 입력하세요.' : 'Enter a keyword.'}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="px-3 py-2 text-sm outline-none w-[200px]"
              />
              <button className="bg-point text-white px-4 text-sm font-medium">
                {isKo ? '검색' : 'Search'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-4 py-2 text-[14px] font-semibold border-b-2 transition-colors ${
                  activeCategory === tab.value
                    ? 'border-point text-point'
                    : 'border-transparent text-gray-500 hover:text-point'
                }`}
              >
                {pick(tab.label, isKo)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 카드 그리드 */}
      <section className="py-10 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              {isKo ? '검색 결과가 없습니다.' : 'No results found.'}
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {isKo
                  ? `전체 ${visiblePrograms.length}건 중 ${filtered.length}건의 결과입니다.`
                  : `${filtered.length} of ${visiblePrograms.length} programs match.`}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map((program) => {
                  const title = isKo ? program.title : program.titleEn;
                  return (
                    <Link
                      key={program.slug}
                      href={`/${locale}/programs/${program.slug}`}
                      className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                        <Image
                          src={program.thumbnail}
                          alt={title}
                          width={400}
                          height={300}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="p-3">
                        <div className="mb-1">
                          <span
                            className={`inline-block text-[11px] text-white font-bold px-2 py-0.5 rounded ${categoryBadgeClass[program.category]}`}
                          >
                            {pick(categoryLabel[program.category], isKo)}
                          </span>
                        </div>
                        <h3 className="text-[14px] font-bold text-[#333] line-clamp-2 mb-1">
                          {title}
                        </h3>
                        <p className="text-[12px] text-gray-500">
                          {isKo ? '대상: ' : 'Target: '}
                          {program.target.map((t) => pick(targetLabel[t], isKo)).join('/')}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
