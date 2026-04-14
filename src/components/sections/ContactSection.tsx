import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="py-16 px-6 bg-gray-50" aria-label="교육 문의하기">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          교육 문의하기
        </h2>
        <p className="text-gray-600 mb-10">
          교육 일정, 가격 견적 등 교육 관련 질문이 있다면 편하신 방법으로 문의해주세요
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* KakaoTalk */}
          <a
            href="https://pf.kakao.com/_fxbVcs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#FEE500] text-gray-900 font-semibold rounded-xl px-8 py-4 hover:brightness-95 transition-all duration-200 shadow-md"
          >
            <Image
              src="/images/main/kakao.png"
              alt="카카오톡"
              width={32}
              height={32}
            />
            카카오톡 바로가기
          </a>

          {/* Email */}
          <a
            href="mailto:hyedu0829@gmail.com"
            className="flex items-center gap-3 bg-primary text-white font-semibold rounded-xl px-8 py-4 hover:bg-primary-dark transition-all duration-200 shadow-md"
          >
            <Image
              src="/images/main/mail.svg"
              alt="메일"
              width={32}
              height={32}
            />
            메일 전송하기
          </a>
        </div>
      </div>
    </section>
  );
}
