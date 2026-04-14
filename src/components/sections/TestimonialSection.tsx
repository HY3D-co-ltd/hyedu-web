'use client';

import Slider from '@/components/ui/Slider';

const testimonials = [
  {
    quote:
      '이전에는 알지 못했던 분야를 배우며 새로운 꿈이 생겼습니다. 교육 받기 전과 비교하면 인생이 바뀐 기분입니다!',
    author: '참여 학생',
  },
  {
    quote:
      '4차 산업혁명이라는 것에 대해서 잘 알지 못했는데 이번 캠프를 통해서 알게 되었습니다.',
    author: '참여 학생',
  },
  {
    quote:
      '한 가지 기술만 체험할 수 있는게 아니라 다양한 기술을 체험할 수 있어서 좋았어요.',
    author: '참여 학생',
  },
];

function QuoteIcon() {
  return (
    <svg
      className="w-10 h-10 text-primary/30 mb-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function TestimonialSection() {
  return (
    <section className="bg-gray-50 py-16 px-6" aria-label="참여자 후기">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          참여자 후기
        </h2>
        <Slider autoplay loop slidesPerView={1} spaceBetween={0}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center mx-2"
            >
              <QuoteIcon />
              <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
