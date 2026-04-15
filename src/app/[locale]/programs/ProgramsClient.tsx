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

  const filtered = programs.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const title = isKo ? p.title : p.titleEn;
    const matchSearch =
      searchKeyword === '' || title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-point text-white py-14 px-4 text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <span className="text-sm opacity-80">Visit Experience Class</span>
          <h1 className="text-[28px] md:text-[36px] font-bold mt-2">
            {isKo ? '찾아가는 체험교실' : 'On-site Experience Classes'}{' '}
            <small className="text-[20px] md:text-[24px] font-normal opacity-80">
              ({isKo ? '1회기' : 'single-session'})
            </small>
          </h1>
          <p className="text-[15px] mt-4 opacity-90 max-w-[600px] mx-auto leading-relaxed">
            {isKo
              ? '각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여 첨단 장비와 미래기술을 활용한 수준별 체험 프로그램'
              : 'On-site visits to regional youth training centers, schools, and culture centers — leveled hands-on programs using advanced equipment and future technologies.'}
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-point font-bold text-[15px] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isKo ? '교육 신청하기' : 'Apply'}
            </Link>
            <a
              href="https://drive.google.com/file/d/1RTJPXvJd2IE_O_nKL_8qsMHqfCeSVwQH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#333] text-white font-bold text-[15px] px-8 py-3 rounded-full hover:bg-[#222] transition-colors"
            >
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
                  ? `전체 ${programs.length}건 중 ${filtered.length}건의 결과입니다.`
                  : `${filtered.length} of ${programs.length} programs match.`}
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
                      <div className="flex items-center justify-center p-4 bg-gray-50">
                        <Image
                          src={program.thumbnail}
                          alt={title}
                          width={200}
                          height={150}
                          className="w-full max-w-[180px] h-auto object-contain"
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
