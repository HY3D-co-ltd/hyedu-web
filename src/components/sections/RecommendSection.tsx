import Image from 'next/image';

export default function RecommendSection() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          한양미래연구소 이런 분들께 강력 추천드립니다
        </h2>
        {/* Images stacked vertically with 100px gap */}
        <div className="flex flex-col items-center gap-0">
          <div className="relative w-full max-w-[600px]">
            <Image
              src="/images/main/msg01.png"
              alt="추천 대상 1"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div className="relative w-full max-w-[600px] mt-[100px]">
            <Image
              src="/images/main/msg02.png"
              alt="추천 대상 2"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
