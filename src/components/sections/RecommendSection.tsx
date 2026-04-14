import Image from 'next/image';

export default function RecommendSection() {
  return (
    <section className="py-16 px-6 bg-white" aria-label="강력 추천">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          한양미래연구소 이런 분들께 강력 추천드립니다
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
            <Image
              src="/images/main/msg01.png"
              alt="추천 대상 1"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
            <Image
              src="/images/main/msg02.png"
              alt="추천 대상 2"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
