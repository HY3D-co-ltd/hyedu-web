import Image from 'next/image';

const features = [
  { image: '/images/main/feature01_01.png', title: '맞춤형 교육', description: '원하는 연령과 회기수에 맞춰서 기획 및 운영 가능' },
  { image: '/images/main/feature01_02.png', title: '교육의 다양성', description: '코딩 교육 메이커 융합 교육 STEAM 교육 인공지능 교육 특강까지' },
  { image: '/images/main/feature01_03.png', title: '베테랑 강사진', description: '경력 3년 이상의 전문 강사진들이 진행하는 교육' },
  { image: '/images/main/feature01_04.png', title: '기술직업 체험교육', description: '기술 이해를 바탕으로 기업가 정신 함양 / 4차산업혁명 기술을 이용한 미래 유망 직업 탐색' },
  { image: '/images/main/feature01_05.png', title: '사고력을 기르는 PBL 수업', description: '문제해결 역량 강화 / 자기주도적 학습을 통한 사고력 향상' },
  { image: '/images/main/feature01_06.png', title: '협동하며 문제해결', description: '친구와 정보 공유및 상호작용으로 문제 해결 / 상호작용 과정을 통해 배려와 존중 정신 함양' },
];

export default function FeatureSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-8">
          4차산업기술교육 답은 <span className="text-primary">한양미래연구소</span>에 있습니다
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="relative w-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={320}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
