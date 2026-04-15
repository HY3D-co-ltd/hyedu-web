'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { withBasePath } from '@/lib/basePath';

type Bi = { ko: string; en: string };
const pick = (b: Bi, isKo: boolean) => (isKo ? b.ko : b.en);

const features: { image: string; title: Bi; description: Bi }[] = [
  {
    image: '/images/main/feature01_01.png',
    title: { ko: '맞춤형 교육', en: 'Tailored Education' },
    description: {
      ko: '원하는 연령과 회기수에 맞춰서 기획 및 운영 가능',
      en: 'Planning and operations customized to the target age group and number of sessions.',
    },
  },
  {
    image: '/images/main/feature01_02.png',
    title: { ko: '교육의 다양성', en: 'Diverse Topics' },
    description: {
      ko: '코딩 교육 메이커 융합 교육 STEAM 교육 인공지능 교육 특강까지',
      en: 'Coding, maker convergence, STEAM, AI education, and special lectures.',
    },
  },
  {
    image: '/images/main/feature01_03.png',
    title: { ko: '베테랑 강사진', en: 'Veteran Instructors' },
    description: {
      ko: '경력 3년 이상의 전문 강사진들이 진행하는 교육',
      en: 'Classes led by professional instructors with 3+ years of experience.',
    },
  },
  {
    image: '/images/main/feature01_04.png',
    title: { ko: '기술직업 체험교육', en: 'Tech Career Experience' },
    description: {
      ko: '기술 이해를 바탕으로 기업가 정신 함양 / 4차산업혁명 기술을 이용한 미래 유망 직업 탐색',
      en: 'Build entrepreneurial mindset based on tech understanding; explore promising future careers powered by 4th-IR technology.',
    },
  },
  {
    image: '/images/main/feature01_05.png',
    title: { ko: '사고력을 기르는 PBL 수업', en: 'PBL Classes That Grow Thinking Skills' },
    description: {
      ko: '문제해결 역량 강화 / 자기주도적 학습을 통한 사고력 향상',
      en: 'Strengthens problem-solving and grows thinking skills through self-directed learning.',
    },
  },
  {
    image: '/images/main/feature01_06.png',
    title: { ko: '협동하며 문제해결', en: 'Collaborative Problem-solving' },
    description: {
      ko: '친구와 정보 공유및 상호작용으로 문제 해결 / 상호작용 과정을 통해 배려와 존중 정신 함양',
      en: 'Solve problems by sharing information with peers; build care and respect through collaborative interactions.',
    },
  },
];

export default function FeatureSection() {
  const isKo = useLocale() === 'ko';
  return (
    <section className="py-12 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        <h2 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-bold text-center text-gray-900 mb-8">
          {isKo ? (
            <>
              4차산업기술교육 답은 <span className="text-point">한양미래연구소</span>에 있습니다
            </>
          ) : (
            <>
              The answer to 4th-IR tech education is at <span className="text-point">Hanyang Future Lab</span>
            </>
          )}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-[30px]">
          {features.map((feature) => (
            <div
              key={feature.image}
              className="relative w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-md overflow-hidden"
              style={{
                backgroundImage: `url(${withBasePath('/images/main/feature-bg.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100% 100%',
              }}
            >
              <div className="relative w-full flex-1 flex items-center justify-center px-2">
                <Image
                  src={feature.image}
                  alt={pick(feature.title, isKo)}
                  width={200}
                  height={130}
                  className="w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] h-auto object-contain"
                />
              </div>
              <h3 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-bold text-gray-900 text-center leading-tight">
                {pick(feature.title, isKo)}
              </h3>
              <p className="text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-medium text-gray-600 text-center leading-snug">
                {pick(feature.description, isKo)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
