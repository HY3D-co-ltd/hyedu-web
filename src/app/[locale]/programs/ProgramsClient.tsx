'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { programs } from '@/data/programs';

type Category = 'all' | 'ai' | 'coding' | 'maker' | 'steam';
type Target = 'all' | 'elementary' | 'middle' | 'high';

const categoryButtons: { value: Category; labelKo: string; labelEn: string }[] = [
  { value: 'all', labelKo: '전체', labelEn: 'All' },
  { value: 'ai', labelKo: 'AI 인공지능', labelEn: 'AI' },
  { value: 'coding', labelKo: '코딩', labelEn: 'Coding' },
  { value: 'maker', labelKo: '메이커 융합', labelEn: 'Maker' },
  { value: 'steam', labelKo: 'STEAM', labelEn: 'STEAM' },
];

const targetButtons: { value: Target; labelKo: string; labelEn: string }[] = [
  { value: 'all', labelKo: '전체', labelEn: 'All' },
  { value: 'elementary', labelKo: '초등', labelEn: 'Elementary' },
  { value: 'middle', labelKo: '중등', labelEn: 'Middle' },
  { value: 'high', labelKo: '고등', labelEn: 'High' },
];

const targetTagKo: Record<string, string> = {
  elementary: '초등',
  middle: '중등',
  high: '고등',
  adult: '성인',
};

const targetTagEn: Record<string, string> = {
  elementary: 'Elementary',
  middle: 'Middle',
  high: 'High',
  adult: 'Adult',
};

export default function ProgramsClient({ locale }: { locale: string }) {
  const isKo = locale === 'ko';
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeTarget, setActiveTarget] = useState<Target>('all');

  const filtered = programs.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchTarget = activeTarget === 'all' || p.target.includes(activeTarget);
    return matchCategory && matchTarget;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isKo ? '찾아가는 체험교실' : 'Experience Classes'}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            {isKo
              ? '학교로 찾아가는 AI·코딩·메이커 맞춤형 교육'
              : 'AI · Coding · Maker customized education that comes to your school'}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600 mr-1">
              {isKo ? '분야' : 'Category'}
            </span>
            {categoryButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setActiveCategory(btn.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === btn.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {isKo ? btn.labelKo : btn.labelEn}
              </button>
            ))}
          </div>

          {/* Target filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600 mr-1">
              {isKo ? '대상' : 'Grade'}
            </span>
            {targetButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setActiveTarget(btn.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTarget === btn.value
                    ? 'bg-secondary text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-secondary hover:text-secondary'
                }`}
              >
                {isKo ? btn.labelKo : btn.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Card Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-24">
              {isKo ? '해당 조건의 프로그램이 없습니다.' : 'No programs match the selected filters.'}
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                {isKo ? `총 ${filtered.length}개 프로그램` : `${filtered.length} programs`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((program) => (
                  <Card
                    key={program.slug}
                    title={isKo ? program.title : program.titleEn}
                    description={isKo ? program.description : program.descriptionEn}
                    thumbnail={program.thumbnail}
                    href={`/${locale}/programs/${program.slug}`}
                    tags={program.target.map((t) =>
                      isKo ? targetTagKo[t] : targetTagEn[t]
                    )}
                    price={isKo ? program.price : program.priceEn}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
