import Image from 'next/image';

export default function BackgroundSection() {
  return (
    <section className="relative w-full" aria-label="배경 이미지">
      <div className="relative w-full aspect-[16/4]">
        <Image
          src="/images/main/sec03bg.png"
          alt="한양미래연구소 배경"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
