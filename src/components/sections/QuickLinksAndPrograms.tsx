'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const ALL: Bi = { ko: '전체 보기', en: 'View all' };

const quickLinkGroups: { title: Bi; links: { label: Bi; href: string }[] }[] = [
  {
    title: { ko: '찾아가는 체험교실', en: 'On-site Experience Classes' },
    links: [
      { label: { ko: 'AI 인공지능 교육', en: 'AI Education' }, href: '/programs' },
      { label: { ko: '코딩 교육', en: 'Coding' }, href: '/programs' },
      { label: { ko: '메이커 융합 교육', en: 'Maker Convergence' }, href: '/programs' },
      { label: { ko: 'STEAM 교육', en: 'STEAM' }, href: '/programs' },
      { label: ALL, href: '/programs' },
    ],
  },
  {
    title: { ko: '한양 청소년 캠프', en: 'Hanyang Youth Camp' },
    links: [
      { label: { ko: '한양 청소년 캠프', en: 'Hanyang Youth Camp' }, href: '/camp' },
      { label: { ko: '한양 3D 메이커톤', en: 'Hanyang 3D Makerthon' }, href: '/camp' },
      { label: { ko: '한양 STEAM 캠프', en: 'Hanyang STEAM Camp' }, href: '/camp' },
      { label: { ko: '한양 창업 아이디어톤', en: 'Hanyang Startup Ideathon' }, href: '/camp' },
      { label: ALL, href: '/camp' },
    ],
  },
  {
    title: { ko: '청소년 동아리', en: 'Youth Clubs' },
    links: [
      { label: { ko: '메이커 융합 교육', en: 'Maker Convergence' }, href: '/youth-club' },
      { label: { ko: '코딩 교육', en: 'Coding' }, href: '/youth-club' },
      { label: ALL, href: '/youth-club' },
    ],
  },
  {
    title: { ko: '창의 체험 부스', en: 'Creative Experience Booth' },
    links: [
      { label: { ko: '창의 체험 부스', en: 'Creative Experience Booth' }, href: '/booth' },
      { label: ALL, href: '/booth' },
    ],
  },
  {
    title: { ko: '전문인 특강', en: 'Specialist Lectures' },
    links: [
      { label: { ko: '4차산업혁명 특강', en: '4th Industrial Revolution Lecture' }, href: '/special-lecture' },
      { label: { ko: '창업 교육', en: 'Entrepreneurship' }, href: '/special-lecture' },
      { label: ALL, href: '/special-lecture' },
    ],
  },
];

const programs: { image: string; title: Bi; category: Bi; price: Bi; href: string }[] = [
  {
    image: '/images/programs/detail/main/main-pro01.png',
    title: { ko: '자율주행자동차 엔지니어', en: 'Autonomous Driving Engineer' },
    category: { ko: '인공지능', en: 'AI' },
    price: { ko: '30,000원', en: 'KRW 30,000' },
    href: '/programs/autonomous-driving',
  },
  {
    image: '/images/programs/detail/main/main-pro02.png',
    title: { ko: '유튜브 크리에이터', en: 'YouTube Creator' },
    category: { ko: '메이커 융합', en: 'Maker Convergence' },
    price: { ko: '22,000원', en: 'KRW 22,000' },
    href: '/programs/youtube-creator',
  },
  {
    image: '/images/programs/detail/main/main-pro03.png',
    title: { ko: 'AI 인공지능 음악 프로듀서', en: 'AI Music Producer' },
    category: { ko: '인공지능', en: 'AI' },
    price: { ko: '24,000원', en: 'KRW 24,000' },
    href: '/programs/ai-music-producer',
  },
  {
    image: '/images/programs/detail/main/main-pro04.png',
    title: {
      ko: 'ChatGPT로 노래하는 LED 무드등 만들기',
      en: 'Singing LED Mood Lamp with ChatGPT',
    },
    category: { ko: 'STEAM', en: 'STEAM' },
    price: { ko: '45,000원', en: 'KRW 45,000' },
    href: '/programs/chatgpt-led-mood-light',
  },
  {
    image: '/images/programs/new-programai02.png',
    title: {
      ko: '마이크로비트로 만드는 아케이드 게임(대여)',
      en: 'Micro:bit Arcade Game (rental)',
    },
    category: { ko: '코딩 교육', en: 'Coding' },
    price: { ko: '30,000원', en: 'KRW 30,000' },
    href: '/programs/microbit-arcade-game',
  },
  {
    image: '/images/programs/new-programai02.png',
    title: {
      ko: '마이크로비트로 만드는 아케이드 게임(소장)',
      en: 'Micro:bit Arcade Game (take-home)',
    },
    category: { ko: '코딩 교육', en: 'Coding' },
    price: { ko: '82,500원', en: 'KRW 82,500' },
    href: '/programs/microbit-arcade-game',
  },
  {
    image: '/images/programs/maker_activity_2_3d_pen.png',
    title: { ko: '3D펜 디자이너', en: '3D Pen Designer' },
    category: { ko: '메이커 융합 교육', en: 'Maker Convergence' },
    price: { ko: '30,000원', en: 'KRW 30,000' },
    href: '/programs/3d-pen-designer',
  },
];

export default function QuickLinksAndPrograms() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section className="py-8 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        {/* Quick Links */}
        <div className="mb-8">
          {quickLinkGroups.map((group, gi) => (
            <div
              key={gi}
              className="flex flex-col sm:flex-row gap-2 sm:gap-[60px] py-2 border-b border-gray-200 last:border-b-0"
            >
              <p className="text-[18px] sm:text-[20px] font-bold text-gray-900 w-auto sm:w-[200px] shrink-0 leading-[1.2em] whitespace-nowrap">
                {pick(group.title, isKo)}
              </p>
              <ul className="flex flex-wrap items-center gap-[15px] sm:gap-[20px]">
                {group.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className={`text-[15px] font-medium ${
                        li === group.links.length - 1 ? 'text-point' : 'text-[#333]'
                      } hover:underline`}
                    >
                      {pick(link.label, isKo)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Program Slider */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-point text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>
            <h2 className="text-lg font-bold text-gray-900">
              {isKo ? '인기 프로그램' : 'Popular Programs'}
            </h2>
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
                  <div className="flex flex-col bg-[#ececeb] rounded-[10px] pt-[15px] h-[290px]">
                    <div className="flex justify-center">
                      <Image
                        src={prog.image}
                        alt={pick(prog.title, isKo)}
                        width={200}
                        height={130}
                        className="w-[200px] h-[130px] object-contain"
                      />
                    </div>
                    <div className="text-center p-4">
                      <h5 className="text-[20px] font-bold text-[#333] mt-[25px] mb-[7px] line-clamp-2">
                        {pick(prog.title, isKo)}
                      </h5>
                      <p className="text-[15px] font-bold text-[#777]">
                        {pick(prog.category, isKo)}
                      </p>
                      <p className="text-[20px] font-bold text-point mt-2">
                        {pick(prog.price, isKo)}
                      </p>
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
