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
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT: Quick Links - 가로형 리스트 */}
          <div className="lg:w-[240px] flex-shrink-0">
            <div className="flex flex-row flex-wrap lg:flex-col gap-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              {quickLinkGroups.map((group, gi) => (
                <div key={gi} className="border-b border-gray-200 last:border-b-0 px-3 py-2">
                  <p className="text-xs font-bold text-gray-800 mb-1">{group.title}</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-0">
                    {group.links.map((link, li) => (
                      <Link
                        key={li}
                        href={`/${locale}${link.href}`}
                        className="text-[11px] text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="px-3 py-2 bg-gray-100">
                <Link
                  href={`/${locale}/about`}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark"
                >
                  교육 소개 바로 가기 →
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: BEST Programs Slider */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>
              <h2 className="text-lg font-bold text-gray-900">인기 프로그램</h2>
            </div>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={12}
              slidesPerView={1}
              breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            >
              {programs.map((prog, i) => (
                <SwiperSlide key={`${prog.href}-${i}`}>
                  <Link href={`/${locale}${prog.href}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3]">
                      <Image src={prog.image} alt={prog.title} fill className="object-cover" />
                    </div>
                    <div className="p-2">
                      <h5 className="text-xs font-bold text-gray-900 line-clamp-2 mb-0.5">{prog.title}</h5>
                      <span className="text-[10px] text-gray-400">{prog.category}</span>
                      <p className="text-xs font-semibold text-primary mt-0.5">{prog.price}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
