'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { programs } from '@/data/programs';

type Category = 'all' | 'ai' | 'coding' | 'maker' | 'steam';

const categoryTabs: { value: Category; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'ai', label: 'AI 인공지능 교육' },
  { value: 'coding', label: '코딩 교육' },
  { value: 'maker', label: '메이커 융합 교육' },
  { value: 'steam', label: 'STEAM 교육' },
];

const targetLabelKo: Record<string, string> = {
  elementary: '초등',
  middle: '중등',
  high: '고등',
  adult: '성인',
};

const categoryBadgeClass: Record<string, string> = {
  ai: 'bg-blue-600',
  coding: 'bg-orange-500',
  maker: 'bg-green-600',
  steam: 'bg-purple-600',
};

const categoryLabelKo: Record<string, string> = {
  ai: 'AI 인공지능 교육',
  coding: '코딩 교육',
  maker: '메이커 융합 교육',
  steam: 'STEAM 교육',
};

export default function ProgramsClient({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const filtered = programs.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = searchKeyword === '' || p.title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* subTop: 히어로 + 버튼 */}
      <section className="bg-point text-white py-14 px-4 text-center">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          <span className="text-sm opacity-80">Visit Experience Class</span>
          <h1 className="text-[28px] md:text-[36px] font-bold mt-2">
            찾아가는 체험교실 <small className="text-[20px] md:text-[24px] font-normal opacity-80">(1회기)</small>
          </h1>
          <p className="text-[15px] mt-4 opacity-90 max-w-[600px] mx-auto leading-relaxed">
            각 지역별 청소년 수련관, 학교, 문화센터 등의 교육기관에 방문하여
            첨단 장비와 미래기술을 활용한 수준별 체험 프로그램
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-point font-bold text-[15px] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              교육 신청하기
            </Link>
            <a
              href="https://drive.google.com/file/d/1RTJPXvJd2IE_O_nKL_8qsMHqfCeSVwQH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#333] text-white font-bold text-[15px] px-8 py-3 rounded-full hover:bg-[#222] transition-colors"
            >
              커리큘럼 보기
            </a>
          </div>
        </div>
      </section>

      {/* 검색 + 탭 */}
      <section className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          {/* 검색바 */}
          <div className="flex justify-end mb-4">
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="px-3 py-2 text-sm outline-none w-[200px]"
              />
              <button className="bg-point text-white px-4 text-sm font-medium">검색</button>
            </div>
          </div>

          {/* 카테고리 탭 */}
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 카드 그리드 */}
      <section className="py-10 px-4 bg-white">
        <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">검색 결과가 없습니다.</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                전체 {programs.length}건 중 {filtered.length}건의 결과입니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/${locale}/programs/${program.slug}`}
                    className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {/* 이미지 */}
                    <div className="flex items-center justify-center p-4 bg-gray-50">
                      <Image
                        src={program.thumbnail}
                        alt={program.title}
                        width={200}
                        height={150}
                        className="w-full max-w-[180px] h-auto object-contain"
                      />
                    </div>
                    {/* 정보 */}
                    <div className="p-3">
                      <div className="mb-1">
                        <span className={`inline-block text-[11px] text-white font-bold px-2 py-0.5 rounded ${categoryBadgeClass[program.category]}`}>
                          {categoryLabelKo[program.category]}
                        </span>
                      </div>
                      <h3 className="text-[14px] font-bold text-[#333] line-clamp-2 mb-1">{program.title}</h3>
                      <p className="text-[12px] text-gray-500">
                        대상: {program.target.map((t) => targetLabelKo[t]).join('/')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
