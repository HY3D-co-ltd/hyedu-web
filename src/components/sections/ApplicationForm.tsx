'use client';

import { useState, FormEvent } from 'react';

/**
 * 교육 신청 폼.
 *
 * 백엔드 없이 정적 사이트에서 이메일 전송을 위해 FormSubmit.co 를 사용한다.
 * 첫 제출 시 hyedu0829@gmail.com 으로 인증 메일이 발송되며, 그 메일의
 * 링크를 한 번 클릭하면 이후 모든 제출이 자동으로 hyedu0829@gmail.com 으로 도착한다.
 *
 * https://formsubmit.co/  (가입 불필요, 무료, API 키 불필요)
 */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/hyedu0829@gmail.com';

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; message: string };

export default function ApplicationForm({ isKo }: { isKo: boolean }) {
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: 'submitting' });

    const form = e.currentTarget;
    const formData = new FormData(form);

    // FormSubmit.co 전용 옵션
    formData.append('_subject', '[홈페이지] 교육 신청서');
    formData.append('_template', 'table'); // 메일 본문을 표 형태로
    formData.append('_captcha', 'false'); // 자동 reCAPTCHA 비활성 (간소화)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = (await res.json()) as { success?: string | boolean };
      if (json.success !== 'true' && json.success !== true) {
        throw new Error('전송 실패 응답');
      }
      setStatus({ type: 'success' });
      form.reset();
    } catch {
      setStatus({
        type: 'error',
        message: isKo
          ? '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          : 'An error occurred. Please try again shortly.',
      });
    }
  }

  if (status.type === 'success') {
    return (
      <div className="rounded-2xl bg-white border border-green-200 p-10 text-center shadow-sm">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isKo ? '신청이 완료되었습니다!' : 'Submission complete'}
        </h3>
        <p className="text-sm text-gray-600">
          {isKo
            ? '담당자가 확인 후 빠르게 연락드리겠습니다.'
            : 'Our team will get back to you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: 'idle' })}
          className="mt-6 inline-block text-sm text-point hover:underline"
        >
          {isKo ? '추가 신청 작성하기' : 'Submit another'}
        </button>
      </div>
    );
  }

  const submitting = status.type === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm text-left max-w-[760px] mx-auto"
    >
      <div className="mb-5 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {isKo ? '교육 신청서' : 'Education Application'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {isKo
            ? '아래 정보를 작성해 주시면 담당자가 빠르게 연락드립니다.'
            : 'Fill in the form below and our team will reach out.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={isKo ? '학교/기관명' : 'School / Organization'} required>
          <input
            type="text"
            name="학교/기관명"
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '담당자 이름' : 'Contact Person'} required>
          <input
            type="text"
            name="담당자 이름"
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '연락처' : 'Phone'} required>
          <input
            type="tel"
            name="연락처"
            placeholder="010-1234-5678"
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '이메일' : 'Email'} required>
          <input
            type="email"
            name="이메일"
            placeholder="example@email.com"
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '대상 및 인원' : 'Target & Number'} required>
          <input
            type="text"
            name="대상 및 인원"
            placeholder={isKo ? '예) 초등 4학년 30명' : 'e.g., 30 4th-graders'}
            required
            disabled={submitting}
            className="form-input"
          />
        </Field>

        <Field label={isKo ? '희망 일정' : 'Preferred Schedule'}>
          <input
            type="text"
            name="희망 일정"
            placeholder={isKo ? '예) 2026년 5월 둘째 주' : 'e.g., 2nd week of May 2026'}
            disabled={submitting}
            className="form-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={isKo ? '관심 프로그램' : 'Programs of Interest'}>
          <textarea
            name="관심 프로그램"
            rows={2}
            placeholder={
              isKo
                ? '예) AI 인공지능 교육, 자율주행 자동차, 드론 코딩'
                : 'e.g., AI education, autonomous driving, drone coding'
            }
            disabled={submitting}
            className="form-input resize-y"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={isKo ? '기타 요청사항' : 'Additional Notes'}>
          <textarea
            name="기타 요청사항"
            rows={3}
            placeholder={
              isKo
                ? '특별히 요청하실 사항이나 궁금한 점을 자유롭게 적어주세요.'
                : 'Anything else you want us to know?'
            }
            disabled={submitting}
            className="form-input resize-y"
          />
        </Field>
      </div>

      {status.type === 'error' && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {status.message}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={submitting}
          className="bg-point text-white font-semibold rounded-xl px-10 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
        >
          {submitting
            ? isKo
              ? '전송 중...'
              : 'Sending...'
            : isKo
              ? '신청서 보내기'
              : 'Submit'}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        {isKo
          ? '제출하신 정보는 hyedu0829@gmail.com 으로 전송되며, 문의 응대 외 다른 용도로 사용되지 않습니다.'
          : 'Your information is sent to hyedu0829@gmail.com and used solely for responding to your inquiry.'}
      </p>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: #336666;
          box-shadow: 0 0 0 2px rgba(51, 102, 102, 0.15);
        }
        :global(.form-input:disabled) {
          background: #f9fafb;
          color: #9ca3af;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
