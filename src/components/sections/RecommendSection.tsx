import Image from 'next/image';

export default function RecommendSection() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          한양미래연구소 이런 분들께 강력 추천드립니다
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative w-full md:w-1/2 max-w-[400px]">
            <Image
              src="/images/main/msg01.png"
              alt="추천 대상 1"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="relative w-full md:w-1/2 max-w-[400px]">
            <Image
              src="/images/main/msg02.png"
              alt="추천 대상 2"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
