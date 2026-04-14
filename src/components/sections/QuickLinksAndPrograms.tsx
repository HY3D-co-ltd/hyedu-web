'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const quickLinkGroups = [
  {
    title: '찾아가는 체험교실',
    links: [
      { label: 'AI 인공지능 교육', href: '/programs' },
      { label: '코딩 교육', href: '/programs' },
      { label: '메이커 융합 교육', href: '/programs' },
      { label: 'STEAM 교육', href: '/programs' },
      { label: '전체 보기', href: '/programs' },
    ],
  },
  {
    title: '한양 청소년 캠프',
    links: [
      { label: '한양 청소년 캠프', href: '/camp' },
      { label: '한양 3D 메이커톤', href: '/camp' },
      { label: '한양 STEAM 캠프', href: '/camp' },
      { label: '한양 창업 아이디어톤', href: '/camp' },
      { label: '전체 보기', href: '/camp' },
    ],
  },
  {
    title: '청소년 동아리',
    links: [
      { label: '메이커 융합 교육', href: '/youth-club' },
      { label: '코딩 교육', href: '/youth-club' },
      { label: '전체 보기', href: '/youth-club' },
    ],
  },
  {
    title: '창의 체험 부스',
    links: [
      { label: '창의 체험 부스', href: '/booth' },
      { label: '전체 보기', href: '/booth' },
    ],
  },
  {
    title: '전문인 특강',
    links: [
      { label: '4차산업혁명 특강', href: '/special-lecture' },
      { label: '창업 교육', href: '/special-lecture' },
      { label: '전체 보기', href: '/special-lecture' },
    ],
  },
];

const programs = [
  { image: '/images/programs/detail/main/main-pro01.png', title: '자율주행자동차 엔지니어', category: '인공지능', price: '30,000원', href: '/programs/autonomous-driving' },
  { image: '/images/programs/detail/main/main-pro02.png', title: '유튜브 크리에이터', category: '메이커 융합', price: '22,000원', href: '/programs/youtube-creator' },
  { image: '/images/programs/detail/main/main-pro03.png', title: 'AI 인공지능 음악 프로듀서', category: '인공지능', price: '24,000원', href: '/programs/ai-music-producer' },
  { image: '/images/programs/detail/main/main-pro04.png', title: 'ChatGPT로 노래하는 LED 무드등 만들기', category: 'STEAM', price: '45,000원', href: '/programs/chatgpt-led-mood-light' },
  { image: '/images/programs/new-programai02.png', title: '마이크로비트로 만드는 아케이드 게임(대여)', category: '코딩 교육', price: '30,000원', href: '/programs/microbit-arcade-game' },
  { image: '/images/programs/new-programai02.png', title: '마이크로비트로 만드는 아케이드 게임(소장)', category: '코딩 교육', price: '82,500원', href: '/programs/microbit-arcade-game' },
  { image: '/images/programs/maker_activity_2_3d_pen.png', title: '3D펜 디자이너', category: '메이커 융합 교육', price: '30,000원', href: '/programs/3d-pen-designer' },
];

export default function QuickLinksAndPrograms() {
  const locale = useLocale();

  return (
    <section className="py-8 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* Quick Links - horizontal rows stacked vertically */}
        <div className="mb-8">
          {quickLinkGroups.map((group, gi) => (
            <div
              key={gi}
              className="flex flex-col sm:flex-row gap-2 sm:gap-[60px] py-2 border-b border-gray-200 last:border-b-0"
            >
              <p className="text-[20px] font-bold text-gray-900 w-auto sm:w-[145px] shrink-0 leading-[1em]">
                {group.title}
              </p>
              <ul className="flex flex-wrap items-center gap-[15px] sm:gap-[20px]">
                {group.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className={`text-[15px] font-medium ${
                        li === group.links.length - 1
                          ? 'text-point'
                          : 'text-[#333]'
                      } hover:underline`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Program Slider - BELOW the links (con02) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-point text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>
            <h2 className="text-lg font-bold text-gray-900">인기 프로그램</h2>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          >
            {programs.map((prog, i) => (
              <SwiperSlide key={`${prog.href}-${i}`}>
                <Link href={`/${locale}${prog.href}`} className="block mx-[20px]">
                  <div className="flex flex-col bg-[#ececeb] rounded-[10px] pt-[15px] min-h-[290px]">
                    <div className="flex justify-center">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        width={200}
                        height={130}
                        className="w-[200px] h-[130px] object-contain"
                      />
                    </div>
                    <div className="text-center p-4">
                      <h5 className="text-[20px] font-bold text-[#333] mt-[25px] mb-[7px] line-clamp-2">
                        {prog.title}
                      </h5>
                      <p className="text-[15px] font-bold text-[#777]">{prog.category}</p>
                      <p className="text-[20px] font-bold text-point mt-2">{prog.price}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
