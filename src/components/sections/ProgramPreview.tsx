'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const programs = [
  {
    image: '/images/programs/detail/main/main-pro01.png',
    title: '자율주행자동차 엔지니어',
    category: '인공지능',
    price: '30,000원',
    href: '/programs/autonomous-driving',
  },
  {
    image: '/images/programs/detail/main/main-pro02.png',
    title: '유튜브 크리에이터',
    category: '메이커 융합',
    price: '22,000원',
    href: '/programs/youtube-creator',
  },
  {
    image: '/images/programs/detail/main/main-pro03.png',
    title: 'AI 인공지능 음악 프로듀서',
    category: '인공지능',
    price: '24,000원',
    href: '/programs/ai-music-producer',
  },
  {
    image: '/images/programs/detail/main/main-pro04.png',
    title: 'ChatGPT로 노래하는 LED 무드등 만들기',
    category: 'STEAM',
    price: '45,000원',
    href: '/programs/chatgpt-led-mood-light',
  },
];

export default function ProgramPreview() {
  const locale = useLocale();

  return (
    <section className="py-16 px-6 bg-white" aria-label="인기 프로그램">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          BEST 인기 프로그램
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {programs.map((prog) => (
            <SwiperSlide key={prog.href}>
              <Link
                href={`/${locale}${prog.href}`}
                className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-semibold text-white bg-primary rounded-full px-3 py-1 mb-2">
                    {prog.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
                    {prog.title}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{prog.price}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
