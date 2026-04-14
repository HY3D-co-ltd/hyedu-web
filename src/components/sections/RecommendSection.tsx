import Image from 'next/image';

export default function RecommendSection() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          한양미래연구소 이런 분들께 강력 추천드립니다
        </h2>
        <div className="flex justify-center">
          <div className="relative w-full max-w-[800px]">
            <Image
              src="/images/main/msg02.png"
              alt="추천 대상"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
