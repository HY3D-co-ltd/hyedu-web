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
  href: string;
}

const tabs = ['초등', '중등', '고등'] as const;

const tabData: Record<string, ProgramCard[]> = {
  초등: [
    { image: '/images/programs/detail/main/main-grade01_01.png', category: '언플러그드 코딩', title: '로봇 코딩 전문가', price: '30,000원', href: '/programs/robot-coding' },
    { image: '/images/programs/detail/main/main-grade01_02.png', category: '메이커 융합', title: 'VR/AR 디자이너', price: '26,000원', href: '/programs/vr-ar-designer' },
    { image: '/images/programs/detail/main/main-grade01_03.png', category: '메이커 융합', title: '블루투스 스피커 만들기', price: '33,000원', href: '/programs/bluetooth-speaker' },
  ],
  중등: [
    { image: '/images/programs/detail/main/main-grade02_01.png', category: '피지컬 코딩', title: '마이크로비트 아케이드 게임', price: '28,500원', href: '/programs/microbit-arcade-game' },
    { image: '/images/programs/detail/main/main-grade02_02.png', category: '인공지능', title: 'AI 음악 프로듀서', price: '24,000원', href: '/programs/ai-music-producer' },
    { image: '/images/programs/detail/main/main-grade02_03.png', category: 'STEAM', title: 'ChatGPT LED 무드등', price: '45,000원', href: '/programs/chatgpt-led-mood-light' },
  ],
  고등: [
    { image: '/images/programs/detail/main/main-grade03_01.png', category: '인공지능', title: '빅데이터 인공지능', price: '24,000원', href: '/programs/bigdata-ai' },
    { image: '/images/programs/detail/main/main-grade03_02.png', category: 'IoT', title: '스마트팜 전문가', price: '99,000원', href: '/programs/smart-farm' },
    { image: '/images/programs/detail/main/main-grade03_03.png', category: 'STEAM', title: 'ChatGPT LED 무드등', price: '45,000원', href: '/programs/chatgpt-led-mood-light' },
  ],
};

export default function AgeRecommendation() {
  const [activeTab, setActiveTab] = useState<string>('초등');
  const locale = useLocale();
  const cards = tabData[activeTab];

  return (
    <section className="py-16 px-6 bg-gray-50" aria-label="연령대별 맞춤 교육 추천">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-sm text-primary font-semibold">연령대별</span>
          <div className="flex items-center justify-between mt-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              맞춤 교육 추천
            </h2>
          </div>
        </div>

        {/* Tabs row with "모든 교육 보기" link */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-semibold border transition-colors duration-200 first:rounded-l-md last:rounded-r-md ${
                  activeTab === tab
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            href={`/${locale}/programs`}
            className="text-sm text-primary font-semibold hover:underline whitespace-nowrap"
          >
            모든 교육 보기 &gt;
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={`/${locale}${card.href}`}
              className="block rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
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
                <small className="text-xs text-gray-500">{card.category}</small>
                <h5 className="text-base font-bold text-gray-900 mt-1 mb-1">{card.title}</h5>
                <p className="text-sm font-semibold text-primary">{card.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
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
