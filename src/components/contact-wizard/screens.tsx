'use client';

/**
 * 연락처 화면(S15)과 결과 화면들: 완료, 시험 모드(보내지 않음), 오류, 개인 참가 분기, 요약 목록.
 * 사양 §3 S15, §5.4 ~ §5.6.
 */
import {
  CALL_TIMES,
  KAKAO_CHANNEL_URL,
  KAKAO_CHAT_URL,
  LIMITS,
  NAVER_BOOKING_URL,
  PHONE,
  PREVIEW,
  REPLY_EMAIL,
  REPLY_KAKAO,
  REPLY_OPTIONS,
  STEP_COPY,
  TEST_CONTACT,
  UI,
} from '@/data/contact-wizard';
import { visibleSteps } from '@/lib/contact-wizard/flow';
import { answerText, formatMobile } from '@/lib/contact-wizard/format';
import type { Answers, ContactForm, InquiryPayload, Lang, StepId, WizardMode } from '@/lib/contact-wizard/types';
import { ChipGroup, CopyButton, FieldBlock, Notice, inputClass, optLabel, t } from './ui';

// ─── 요약 목록 (패널 · 시트 · 완료 화면 공용) ───────────────────────

export function SummaryList({ answers, lang, onPick }: { answers: Answers; lang: Lang; onPick?: (step: StepId) => void }) {
  const rows = visibleSteps(answers).flatMap((s) => {
    const text = s === 'contact' ? null : answerText(answers, s, lang);
    return text ? [{ step: s, text }] : [];
  });
  if (!rows.length) return <p className="text-sm text-gray-500 break-keep">{t(UI.summaryEmpty, lang)}</p>;
  return (
    <ul className="divide-y divide-gray-100">
      {rows.map((r) => {
        const body = (
          <>
            <span className="block text-xs font-semibold text-gray-500">{STEP_COPY[r.step].short[lang]}</span>
            <span className="mt-0.5 block text-sm text-gray-900 break-keep">{r.text}</span>
          </>
        );
        return (
          <li key={r.step}>
            {onPick ? (
              <button type="button" onClick={() => onPick(r.step)} className="block w-full py-2.5 text-left hover:bg-gray-50 rounded-lg px-2 -mx-2">
                {body}
              </button>
            ) : (
              <div className="py-2.5">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ─── S15 연락처 ──────────────────────────────────────────────────

export type ContactErrors = Partial<Record<'org.name' | 'contact.name' | 'contact.mobile' | 'contact.email' | 'consent' | 'feedback', string>>;

export function ContactStep({
  lang,
  mode,
  contact,
  setContact,
  errors,
  overallFeedback,
  setOverallFeedback,
}: {
  lang: Lang;
  mode: WizardMode;
  contact: ContactForm;
  setContact: (patch: Partial<ContactForm>) => void;
  errors: ContactErrors;
  overallFeedback: string;
  setOverallFeedback: (v: string) => void;
}) {
  const ko = lang === 'ko';
  const err = (k: keyof ContactErrors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-1.5 text-sm text-red-600">
        {errors[k]}
      </p>
    ) : null;
  const invalid = (k: keyof ContactErrors) => (errors[k] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '');

  return (
    <div className="space-y-5">
      {mode === 'preview' && (
        <button
          type="button"
          onClick={() => setContact({ ...TEST_CONTACT })}
          className="rounded-xl border border-dashed border-secondary px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-secondary/10"
        >
          {t(PREVIEW.fillTestContact, lang)}
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldBlock label={`${ko ? '기관명' : 'Organization'} *`} htmlFor="ct-org">
          <input
            id="ct-org"
            className={`${inputClass} ${invalid('org.name')}`}
            autoComplete="organization"
            maxLength={LIMITS.orgName}
            value={contact.orgName}
            onChange={(e) => setContact({ orgName: e.target.value })}
            aria-invalid={!!errors['org.name']}
            aria-describedby={errors['org.name'] ? 'err-org.name' : undefined}
          />
          {err('org.name')}
        </FieldBlock>
        <FieldBlock label={`${ko ? '담당자 성함' : 'Your name'} *`} htmlFor="ct-name">
          <input
            id="ct-name"
            className={`${inputClass} ${invalid('contact.name')}`}
            autoComplete="name"
            maxLength={LIMITS.name}
            value={contact.name}
            onChange={(e) => setContact({ name: e.target.value })}
            aria-invalid={!!errors['contact.name']}
            aria-describedby={errors['contact.name'] ? 'err-contact.name' : undefined}
          />
          {err('contact.name')}
        </FieldBlock>
        <FieldBlock label={`${ko ? '휴대폰' : 'Mobile'} *`} htmlFor="ct-mobile">
          <input
            id="ct-mobile"
            className={`${inputClass} ${invalid('contact.mobile')}`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-0000-0000"
            value={contact.mobile}
            onChange={(e) => setContact({ mobile: formatMobile(e.target.value) })}
            aria-invalid={!!errors['contact.mobile']}
            aria-describedby={errors['contact.mobile'] ? 'err-contact.mobile' : undefined}
          />
          {err('contact.mobile')}
        </FieldBlock>
        <FieldBlock
          label={ko ? '이메일' : 'Email'}
          hint={contact.replyPreference === REPLY_EMAIL ? t(UI.required, lang) : t(UI.optional, lang)}
          htmlFor="ct-email"
        >
          <input
            id="ct-email"
            className={`${inputClass} ${invalid('contact.email')}`}
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={contact.email}
            onChange={(e) => setContact({ email: e.target.value })}
            aria-invalid={!!errors['contact.email']}
            aria-describedby={errors['contact.email'] ? 'err-contact.email' : undefined}
          />
          {err('contact.email')}
        </FieldBlock>
        <FieldBlock label={ko ? '학교 · 기관 전화' : 'Office phone'} hint={t(UI.optional, lang)} htmlFor="ct-phone">
          <input
            id="ct-phone"
            className={inputClass}
            type="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
            value={contact.phone}
            onChange={(e) => setContact({ phone: e.target.value })}
          />
        </FieldBlock>
      </div>

      <ChipGroup
        label={ko ? '회신 방법 (선택)' : 'How should we reply? (optional)'}
        options={REPLY_OPTIONS}
        value={contact.replyPreference}
        onChange={(v) => setContact({ replyPreference: v as string })}
        lang={lang}
      />
      {contact.replyPreference === REPLY_KAKAO && (
        <Notice>
          {ko
            ? "카카오톡은 고객님이 먼저 말을 걸어 주셔야 대화가 열려요. 접수 후 카카오톡 채널 '한양미래연구소'에 접수번호를 보내 주세요. 그 채팅으로 답변드릴게요."
            : "On KakaoTalk, you need to message us first. After submitting, send your receipt number to our channel '한양미래연구소' and we'll reply there."}
        </Notice>
      )}
      <ChipGroup
        label={ko ? '통화 편한 시간 (선택)' : 'Best time to call (optional)'}
        options={CALL_TIMES}
        value={contact.callTime}
        onChange={(v) => setContact({ callTime: v as string })}
        lang={lang}
      />

      {/* 허니팟: 사람에게는 보이지 않는 칸. 채워져 오면 수신 측이 버린다. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="ct-hp">Leave this empty</label>
        <input id="ct-hp" tabIndex={-1} autoComplete="off" value={contact.hp} onChange={(e) => setContact({ hp: e.target.value })} />
      </div>

      <ConsentBox lang={lang} checked={contact.consent} onChange={(v) => setContact({ consent: v })} error={errors.consent} />

      {mode === 'preview' && (
        <FieldBlock label={t(PREVIEW.feedbackOverall, lang)} hint={`${overallFeedback.length}/${LIMITS.feedbackOverall}`} htmlFor="fb-overall">
          <textarea
            id="fb-overall"
            rows={3}
            className={`${inputClass} border-secondary/60 bg-secondary/5`}
            maxLength={LIMITS.feedbackOverall}
            placeholder={t(PREVIEW.feedbackOverallPlaceholder, lang)}
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
          />
          {err('feedback')}
        </FieldBlock>
      )}
    </div>
  );
}

/** 동의 고지. 문구는 처리방침 초안 부록 A. */
function ConsentBox({ lang, checked, onChange, error }: { lang: Lang; checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  const ko = lang === 'ko';
  return (
    <div className={`rounded-2xl border p-4 md:p-5 ${error ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 accent-[#336666]"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby="consent-text"
        />
        <span className="text-[15px] font-semibold text-gray-900">{ko ? '[필수] 개인정보 수집 · 이용에 동의합니다' : '[Required] I agree to the collection and use of personal information'}</span>
      </label>
      <div id="consent-text" className="mt-3 space-y-1.5 text-sm text-gray-600 break-keep">
        {ko ? (
          <>
            <p>· 이용 목적: 교육 문의 상담과 회신, 견적서 · 교육계획안 발송, 교육 일정 조율, 같은 기관이 다시 문의하실 때 이전 상담 확인</p>
            <p>· 필수 항목: 기관명, 담당자 성명, 휴대폰 번호, 문의 내용(이 화면에서 답하신 내용)</p>
            <p>· 선택 항목: 이메일, 기관 전화번호, 회신 방법, 통화 가능 시간. 입력하지 않아도 접수됩니다(회신 방법을 이메일로 고르시면 이메일은 필요합니다).</p>
            <p>· 보유 기간: 문의 접수일로부터 3년 (계약으로 이어지면 계약 종료 후 5년)</p>
            <p>· 동의하지 않으실 수 있습니다. 동의하지 않으시면 홈페이지로 문의를 접수할 수 없으니, 전화({PHONE})나 카카오톡 채널로 문의해 주세요.</p>
            <p>· 문의 내용은 n8n(독일), Airtable(미국), Google(미국 등)의 시스템에서 처리 · 보관됩니다.</p>
            <p className="text-gray-400">개인정보 처리방침 페이지는 준비 중입니다.</p>
          </>
        ) : (
          <>
            <p>· Purpose: responding to your inquiry, sending quotes and lesson plans, scheduling, and checking past consultations if you contact us again</p>
            <p>· Required: organization, name, mobile number, and your answers on this page</p>
            <p>· Optional: email, office phone, reply method, best time to call. You can submit without them (email is needed if you choose to be contacted by email).</p>
            <p>· Retention: 3 years from the inquiry (5 years after the contract ends if it leads to a contract)</p>
            <p>· You may refuse. If you do, we cannot accept the inquiry online; please call us ({PHONE}) or use KakaoTalk.</p>
            <p>· Your inquiry is processed and stored on systems run by n8n (Germany), Airtable (USA) and Google (USA and others).</p>
            <p className="text-gray-400">The privacy policy page is being prepared. The Korean version prevails.</p>
          </>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// ─── 결과 화면 ───────────────────────────────────────────────────

function ContactButtons({ lang }: { lang: Lang }) {
  const ko = lang === 'ko';
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl bg-[#FEE500] px-5 py-3 text-sm font-bold text-gray-900 hover:opacity-90"
      >
        {ko ? '카카오톡으로 문의' : 'Ask on KakaoTalk'}
      </a>
      <a
        href={`tel:${PHONE}`}
        className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 hover:border-point hover:text-point"
      >
        {ko ? `전화 ${PHONE}` : `Call ${PHONE}`}
      </a>
    </div>
  );
}

export function CompletionScreen({
  lang,
  receipt,
  answers,
  contact,
  copyText,
  onRestart,
}: {
  lang: Lang;
  receipt: string;
  answers: Answers;
  contact: ContactForm;
  copyText: () => string;
  onRestart: () => void;
}) {
  const ko = lang === 'ko';
  const pref = REPLY_OPTIONS.find((o) => o.value === contact.replyPreference);
  const via = pref ? optLabel(pref, lang) : ko ? '전화나 문자' : 'phone or text';
  return (
    <div className="space-y-6">
      {contact.replyPreference === REPLY_KAKAO && (
        <div className="rounded-2xl bg-[#FEE500]/30 p-4 md:p-5">
          <p className="font-semibold text-gray-900 break-keep">
            {ko ? '카카오톡 채널 채팅에 접수번호를 보내 주세요. 그 채팅으로 답변드릴게요.' : "Send your receipt number in our KakaoTalk channel chat and we'll reply there."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton text={() => receipt} label={ko ? '접수번호 복사' : 'Copy receipt number'} doneLabel={t(UI.copied, lang)} />
            <a
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#FEE500] px-4 py-2.5 text-sm font-bold text-gray-900"
            >
              {ko ? '채널 채팅 열기' : 'Open channel chat'}
            </a>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-point/40 bg-point/5 p-6 text-center">
        <p className="text-sm text-gray-600">{ko ? '접수번호' : 'Receipt number'}</p>
        <p className="mt-1 text-3xl md:text-4xl font-bold tracking-wider text-point">{receipt}</p>
        <p className="mt-2 text-sm text-gray-600">{ko ? '문의하실 때 이 번호를 알려 주세요.' : 'Please mention this number when you contact us.'}</p>
        <div className="mt-3">
          <CopyButton text={() => receipt} label={ko ? '접수번호 복사' : 'Copy receipt number'} doneLabel={t(UI.copied, lang)} />
        </div>
      </div>
      <p className="text-[15px] text-gray-800 break-keep">
        {ko
          ? `운영 시간(평일 9~18시, 점심 12~13시) 기준 1영업일 안에 최대한 빠르게 ${via}(으)로 연락드릴게요.`
          : `We'll contact you by ${via} as soon as possible, within one business day (weekdays 9:00–18:00 KST, lunch 12:00–13:00).`}
      </p>
      <div className="rounded-2xl border border-gray-200 p-4 md:p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="font-semibold text-gray-900">{t(UI.summaryTitle, lang)}</p>
          <CopyButton text={copyText} label={t(UI.copy, lang)} doneLabel={t(UI.copied, lang)} />
        </div>
        <SummaryList answers={answers} lang={lang} />
      </div>
      <ContactButtons lang={lang} />
      <button type="button" onClick={onRestart} className="text-sm text-gray-500 underline hover:text-point">
        {ko ? '새 문의 작성하기' : 'Start a new inquiry'}
      </button>
    </div>
  );
}

/** 미리보기 · 중계 미연결: 보내지 않고 보낼 내용을 보여 준다. */
export function NoSendScreen({
  lang,
  payload,
  feedbackText,
  onBack,
}: {
  lang: Lang;
  payload: InquiryPayload;
  feedbackText: () => string;
  onBack: () => void;
}) {
  const q = payload.inquiry;
  const rows: [string, string][] = [
    ['교육 유형', q.eduType ?? '(빈칸)'],
    ['관심 프로그램', q.interestPrograms.join(', ')],
    ['희망 일정', q.schedule],
    ['대상 및 인원', q.audience],
    ['예산', q.budget],
    ['진행 방식', q.mode],
    ['교육장소', q.venue],
    ['기타', q.extra],
    ['기관', `${payload.org.name} (${payload.org.type})`],
    ['담당자', `${payload.contact.name} · ${payload.contact.mobile}${payload.contact.email ? ` · ${payload.contact.email}` : ''}`],
    ['회신 방법', payload.contact.replyPreference || '-'],
  ];
  return (
    <div className="space-y-5">
      <Notice tone="warn">
        <strong className="block">{t(PREVIEW.noEndpointTitle, lang)}</strong>
        {t(PREVIEW.noEndpointBody, lang)}
      </Notice>
      <dl className="divide-y divide-gray-100 rounded-2xl border border-gray-200">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-1 sm:grid-cols-[8rem_minmax(0,1fr)]">
            <dt className="bg-gray-50 px-4 pt-2.5 pb-1 sm:py-2.5 text-sm font-semibold text-gray-600">{k}</dt>
            <dd className="px-4 pb-2.5 pt-1 sm:py-2.5 text-sm whitespace-pre-wrap break-keep text-gray-900">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        <CopyButton
          text={feedbackText}
          label={t(PREVIEW.copyFeedback, lang)}
          doneLabel={t(UI.copied, lang)}
          className="inline-flex items-center gap-2 rounded-xl bg-point px-5 py-3 text-sm font-bold text-white hover:opacity-90"
        />
        <button type="button" onClick={onBack} className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-point hover:text-point">
          {lang === 'ko' ? '연락처 화면으로 돌아가기' : 'Back to contact form'}
        </button>
      </div>
    </div>
  );
}

export function ErrorScreen({
  lang,
  kind,
  sending,
  onRetry,
  onBack,
  copyText,
}: {
  lang: Lang;
  kind: 'save_failed' | 'unknown' | 'error';
  sending: boolean;
  onRetry: () => void;
  onBack: () => void;
  copyText: () => string;
}) {
  const ko = lang === 'ko';
  const message =
    kind === 'save_failed'
      ? ko
        ? '접수 저장에 실패했어요. 적어 주신 내용은 그대로 있어요.'
        : "We couldn't save your inquiry. Your answers are still here."
      : kind === 'unknown'
        ? ko
          ? '접수 결과를 확인하지 못했어요. 적어 주신 내용은 그대로 있어요.'
          : "We couldn't confirm whether your inquiry was received. Your answers are still here."
        : ko
          ? '접수를 마치지 못했어요. 적어 주신 내용은 그대로 있어요.'
          : "We couldn't complete your inquiry. Your answers are still here.";
  return (
    <div className="space-y-5">
      <Notice tone="warn">{message}</Notice>
      <p className="text-sm text-gray-600 break-keep">
        {ko
          ? '다시 보내 보시거나, 내용을 복사해 카카오톡으로 보내 주셔도 돼요. 급하시면 전화 주세요.'
          : 'Try again, or copy your answers and send them via KakaoTalk. Call us if it is urgent.'}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          disabled={sending}
          className="rounded-xl bg-point px-5 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
        >
          {sending ? t(UI.submitting, lang) : ko ? '다시 보내기' : 'Try again'}
        </button>
        <CopyButton text={copyText} label={t(UI.copy, lang)} doneLabel={t(UI.copied, lang)} />
        <button type="button" onClick={onBack} className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-point hover:text-point">
          {ko ? '돌아가서 고치기' : 'Go back and edit'}
        </button>
      </div>
      <ContactButtons lang={lang} />
    </div>
  );
}

export function IndividualScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const ko = lang === 'ko';
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="font-semibold text-gray-900 break-keep">
          {ko ? '토요캠프 · 경진대회 대비반은 네이버 예약에서 바로 신청하실 수 있어요.' : 'Saturday camps and competition prep classes can be booked on Naver.'}
        </p>
        <a
          href={NAVER_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center rounded-xl bg-[#03C75A] px-5 py-3 text-sm font-bold text-white hover:opacity-90"
        >
          {ko ? '네이버 예약 바로가기' : 'Book on Naver'}
        </a>
      </div>
      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="font-semibold text-gray-900 break-keep">
          {ko ? '방학 캠프 개인 참가는 카카오톡 채널에서 문의해 주세요. 일정이 열리면 안내드려요.' : "For vacation camps, ask us on KakaoTalk. We'll let you know when registration opens."}
        </p>
        <a
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center rounded-xl bg-[#FEE500] px-5 py-3 text-sm font-bold text-gray-900 hover:opacity-90"
        >
          {ko ? '카카오톡 채널 열기' : 'Open KakaoTalk channel'}
        </a>
      </div>
      <button type="button" onClick={onBack} className="text-sm font-semibold text-point hover:underline">
        {ko ? '← 단체 문의로 돌아가기' : '← Back to group inquiry'}
      </button>
    </div>
  );
}
