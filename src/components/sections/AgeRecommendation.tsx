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
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        <div className="relative mb-6">
          <div className="text-center mb-5">
            <span className="text-xs font-semibold text-point">연령대별</span>
            <h2 className="text-xl font-bold text-gray-900">맞춤 교육 추천</h2>
          </div>

          {/* Tabs - pill style */}
          <div className="flex justify-center mb-4">
            <div className="flex w-fit bg-[#ddd] py-[10px] px-[20px] rounded-[30px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-[35px] py-[5px] rounded-[20px] text-[18px] font-semibold transition-colors ${
                    activeTab === tab
                      ? 'bg-[#333] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* "모든 교육 보기" - absolute right top */}
          <Link
            href={`/${locale}/programs`}
            className="absolute right-0 top-0 text-sm text-gray-500 hover:text-point flex items-center gap-1"
          >
            모든 교육 보기 <span>&rsaquo;</span>
          </Link>
        </div>

        {/* Tab content - 3 col grid, each item is horizontal (image left, info right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-[60px] pt-[35px]">
          {cards.map((card) => (
            <Link
              key={card.title + card.category}
              href={`/${locale}${card.href}`}
              className="flex gap-[20px] items-start hover:opacity-80 transition-opacity"
            >
              <Image
                src={card.image}
                alt={card.title}
                width={95}
                height={95}
                className="w-[95px] h-[95px] object-contain shrink-0"
              />
              <div>
                <span className="text-[15px] font-bold text-[#777]">{card.category}</span>
                <h5 className="text-[20px] font-bold text-[#333] my-[10px] leading-tight">{card.title}</h5>
                <p className="text-[18px] font-bold text-point">{card.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA button */}
        <div className="flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="block w-[200px] py-[10px] bg-[#333] text-white text-[20px] font-bold text-center rounded-[30px] hover:bg-[#222] transition-colors"
          >
            교육 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
