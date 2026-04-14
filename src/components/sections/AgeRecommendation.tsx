'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface ProgramCard {
  image: string;
  category: string;
  title: string;
  price: string;
}

const tabs = ['초등', '중등', '고등'] as const;

const tabData: Record<string, ProgramCard[]> = {
  초등: [
    { image: '/images/programs/detail/main/main-grade01_01.png', category: '언플러그드 코딩', title: '로봇 코딩 전문가', price: '30,000원' },
    { image: '/images/programs/detail/main/main-grade01_02.png', category: '메이커 융합', title: 'VR/AR 디자이너', price: '26,000원' },
    { image: '/images/programs/detail/main/main-grade01_03.png', category: '메이커 융합', title: '블루투스 스피커 만들기', price: '33,000원' },
  ],
  중등: [
    { image: '/images/programs/detail/main/main-grade02_01.png', category: '피지컬 코딩', title: '마이크로비트 아케이드 게임', price: '28,500원' },
    { image: '/images/programs/detail/main/main-grade02_02.png', category: '인공지능', title: 'AI 음악 프로듀서', price: '24,000원' },
    { image: '/images/programs/detail/main/main-grade02_03.png', category: 'STEAM', title: 'ChatGPT LED 무드등', price: '45,000원' },
  ],
  고등: [
    { image: '/images/programs/detail/main/main-grade03_01.png', category: '인공지능', title: '빅데이터 인공지능', price: '24,000원' },
    { image: '/images/programs/detail/main/main-grade03_02.png', category: 'IoT', title: '스마트팜 전문가', price: '99,000원' },
    { image: '/images/programs/detail/main/main-grade03_03.png', category: 'STEAM', title: 'ChatGPT LED 무드등', price: '45,000원' },
  ],
};

export default function AgeRecommendation() {
  const [activeTab, setActiveTab] = useState<string>('초등');
  const locale = useLocale();
  const cards = tabData[activeTab];

  return (
    <section className="py-16 px-6 bg-gray-50" aria-label="연령대별 맞춤 교육 추천">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          연령대별 맞춤 교육 추천
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl overflow-hidden shadow-md bg-white"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block text-xs font-semibold text-white bg-primary rounded-full px-3 py-1 mb-2">
                  {card.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm font-semibold text-primary">{card.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-primary text-white font-semibold rounded-lg px-8 py-3 hover:bg-primary-dark transition-colors duration-200"
          >
            교육 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
