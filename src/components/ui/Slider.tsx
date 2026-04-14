'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SliderProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
}

export default function Slider({
  children,
  autoplay = true,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = true,
  className = '',
}: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      pagination={{ clickable: true }}
      navigation
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      className={className}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
