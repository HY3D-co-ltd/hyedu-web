'use client';

import { useLocale } from 'next-intl';

export default function RecommendSection() {
  const isKo = useLocale() === 'ko';
  const questions = isKo
    ? [
        '4차산업 기술 체험교육을 계획 중인데...',
        '지역사회와 연계한 체험교육은 없을까?',
        '청소년동아리 활동은 뭘 해야 하지?',
        '여러 가지 교육을 동시에 진행하고 싶어',
        '이런 교육 어디 없을까?',
      ]
    : [
        "We're planning a 4th-IR hands-on class...",
        'Are there experience programs tied to the local community?',
        'What should we do for youth-club activities?',
        'We want to run several programs at once',
        'Where can we find classes like this?',
      ];

  return (
    <section className="py-14 px-4 bg-white">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900 mb-10 text-center">
          {isKo
            ? '한양미래연구소 이런 분들께 강력 추천드립니다'
            : 'Hanyang Future Lab is a strong fit for these people'}
        </h2>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex flex-col items-center flex-shrink-0 w-full sm:w-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 md:w-14 md:h-14 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
              </svg>
            </div>
            <p className="text-[13px] md:text-[14px] font-semibold text-gray-700 mt-2 text-center whitespace-nowrap">
              {isKo ? '학교 및 기관 선생님' : 'School & Institution Teachers'}
            </p>
          </div>

          <div className="flex-1 w-full space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="flex">
                <p className="inline-block max-w-[85%] bg-gray-100 text-gray-800 text-[14px] md:text-[15px] px-5 py-3 rounded-2xl rounded-tl-sm">
                  {q}
                </p>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <p className="inline-block bg-primary text-white font-bold text-[15px] md:text-[17px] px-6 py-3.5 rounded-2xl rounded-tr-sm shadow-sm">
                {isKo ? '모두 한양미래연구소에 있습니다!' : "All of it is at Hanyang Future Lab!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
