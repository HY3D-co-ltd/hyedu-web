import Image from 'next/image';

const features = [
  {
    image: '/images/main/feature01_01.png',
    title: '맞춤형 교육',
    description: '학교, 기관의 니즈에 맞춘 맞춤형 커리큘럼을 제공합니다.',
  },
  {
    image: '/images/main/feature01_02.png',
    title: '교육의 다양성',
    description: 'AI, 로봇, IoT, 메이커 등 다양한 4차 산업 기술 교육을 제공합니다.',
  },
  {
    image: '/images/main/feature01_03.png',
    title: '베테랑 강사진',
    description: '검증된 전문 강사진이 최고 수준의 교육을 진행합니다.',
  },
  {
    image: '/images/main/feature01_04.png',
    title: '기술직업 체험교육',
    description: '미래 기술 직업을 직접 체험하며 진로를 탐색합니다.',
  },
  {
    image: '/images/main/feature01_05.png',
    title: '사고력을 기르는 PBL 수업',
    description: '문제 기반 학습으로 창의적 사고력을 키웁니다.',
  },
  {
    image: '/images/main/feature01_06.png',
    title: '협동하며 문제해결',
    description: '팀 프로젝트를 통해 협업 능력과 문제해결 능력을 기릅니다.',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 px-6 bg-white" aria-label="한양미래연구소 특징">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          4차산업기술교육 답은 한양미래연구소에 있습니다
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
