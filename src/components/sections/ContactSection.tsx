import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] text-center">
        <h2 className="text-[25px] md:text-[30px] font-bold text-gray-900 mb-2">
          교육 문의하기
        </h2>
        <p className="text-[15px] text-gray-600 mb-8">
          교육 일정, 가격 견적 등 교육 관련 질문이 있다면 편하신 방법으로 문의해주세요<br />
          빠른 답변을 원하신다면 전화 문의 부탁드립니다
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <a
            href="https://pf.kakao.com/_fxbVcs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#FEE500] text-gray-900 font-semibold rounded-xl px-8 py-4 hover:brightness-95 transition-all shadow-md"
          >
            <Image src="/images/main/kakao.png" alt="카카오톡" width={32} height={32} />
            카카오톡 바로가기
          </a>
          <a
            href="mailto:hyedu0829@gmail.com"
            className="flex items-center gap-3 bg-point text-white font-semibold rounded-xl px-8 py-4 hover:opacity-90 transition-all shadow-md"
          >
            <Image src="/images/main/mail.svg" alt="메일" width={32} height={32} />
            메일 전송하기
          </a>
        </div>
        {/* 전화번호/업무시간 이미지 */}
        <div className="flex justify-center">
          <Image
            src="/images/main/inquiry01_02.png"
            alt="교육 문의 전화번호 070-8064-0829 업무시간 안내"
            width={600}
            height={200}
            className="w-full max-w-[600px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
