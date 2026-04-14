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
    { image: '/images/programs/detail/main/main-grade02_01.png', category: '피지컬 코딩', title: '마이크로비트로 만드는 아케이드 게임', price: '28,500원', href: '/programs/microbit-arcade-game' },
    { image: '/images/programs/detail/main/main-grade02_02.png', category: '인공지능', title: 'AI 인공지능 음악 프로듀서', price: '24,000원', href: '/programs/ai-music-producer' },
    { image: '/images/programs/detail/main/main-grade02_03.png', category: 'STEAM', title: 'ChatGPT로 노래하는 LED 무드등 만들기', price: '45,000원', href: '/programs/chatgpt-led-mood-light' },
  ],
  고등: [
    { image: '/images/programs/detail/main/main-grade03_01.png', category: '인공지능', title: '빅데이터로 만드는 나만의 인공지능', price: '24,000원', href: '/programs/bigdata-ai' },
    { image: '/images/programs/detail/main/main-grade03_02.png', category: 'IoT(사물인터넷)', title: '스마트팜 전문가', price: '99,000원', href: '/programs/smart-farm' },
    { image: '/images/programs/detail/main/main-grade03_03.png', category: 'STEAM', title: 'ChatGPT로 노래하는 LED 무드등 만들기', price: '45,000원', href: '/programs/chatgpt-led-mood-light' },
  ],
};

export default function AgeRecommendation() {
  const [activeTab, setActiveTab] = useState<string>('초등');
  const locale = useLocale();
  const cards = tabData[activeTab];

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <span className="text-xs font-semibold text-primary">연령대별</span>
          <h2 className="text-xl font-bold text-gray-900">맞춤 교육 추천</h2>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-semibold border transition-colors first:rounded-l-md last:rounded-r-md ${
                  activeTab === tab ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link href={`/${locale}/programs`} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
            모든 교육 보기 <span>›</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {cards.map((card) => (
            <Link key={card.title + card.category} href={`/${locale}${card.href}`} className="block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image src={card.image} alt={card.title} fill className="object-contain bg-gray-50" sizes="(max-width: 768px) 33vw, 280px" />
              </div>
              <div className="p-3">
                <span className="text-[10px] text-gray-400">{card.category}</span>
                <h5 className="text-sm font-bold text-gray-900 line-clamp-2">{card.title}</h5>
                <p className="text-sm font-semibold text-primary mt-1">{card.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/contact`} className="inline-block bg-primary text-white font-semibold rounded px-6 py-2 text-sm hover:bg-primary-dark">
            교육 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
