'use client';

/**
 * 교육 신청 위저드 본체.
 * 사양: docs/superpowers/specs/2026-11-17-contact-wizard-questions.md
 *
 * - 한 화면에 질문 하나. 답은 Answers 하나에 모으고, 보이는 질문은 답으로 정한다(flow.ts).
 * - 질문마다 history.pushState를 남겨 브라우저 뒤로가기가 이전 질문으로 간다.
 * - 제출할 때 답을 묶음(payload)으로 고정하고, 같은 submissionId로 다시 보내는 것은 그 묶음일 때만이다.
 *   답이나 연락처를 고치면 묶음을 버리고 다음 제출 때 새 번호를 만든다(사양 §5.4).
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { LIMITS, PHASES, PREVIEW, REPLY_EMAIL, STEP_COPY, UI } from '@/data/contact-wizard';
import { clearDraft, loadDraft, saveDraft } from '@/lib/contact-wizard/draft';
import { firstUnanswered, applyAnswer, prefillFromQuery, visibleSteps } from '@/lib/contact-wizard/flow';
import { buildPayload, digitsOnly, feedbackForCopy, feedbackLength, summaryForCopy, type Feedback } from '@/lib/contact-wizard/format';
import { INQUIRY_ENDPOINT, submitInquiry } from '@/lib/contact-wizard/submit';
import type { Answers, ContactForm, InquiryPayload, Lang, StepId, WizardMode } from '@/lib/contact-wizard/types';
import {
  AudienceStep,
  BoothStep,
  BudgetStep,
  EduTypeStep,
  FacilityStep,
  FieldStep,
  HeadcountStep,
  OrgTypeStep,
  PlaceStep,
  ProgramsStep,
  RegionStep,
  RequestStep,
  ScheduleStep,
  SchoolSlotStep,
  isEmptyOptional,
  scheduleReady,
  type SetAnswer,
} from './steps';
import { CompletionScreen, ContactStep, ErrorScreen, IndividualScreen, NoSendScreen, SummaryList, type ContactErrors } from './screens';
import { CopyButton, InfoIcon, Tile, inputClass, t } from './ui';

type View = StepId | 'individual' | 'result';

type Result = { kind: 'ok'; receipt: string } | { kind: 'nosend'; payload: InquiryPayload } | { kind: 'save_failed' | 'unknown' | 'error' };

type Escape = 'unknown' | 'skip' | 'notDecided';

/** 「모르겠어요」 · 「건너뛰기」 버튼을 두는 질문. S1 · S12는 보기 안에 「모르겠어요」가 있다. */
const ESCAPE: Partial<Record<StepId, Escape>> = {
  schoolSlot: 'unknown',
  audience: 'unknown',
  headcount: 'notDecided',
  field: 'unknown',
  programs: 'skip',
  place: 'unknown',
  region: 'unknown',
  facility: 'unknown',
  budget: 'unknown',
};

const EMPTY_CONTACT: ContactForm = {
  orgName: '',
  name: '',
  mobile: '',
  email: '',
  phone: '',
  replyPreference: '',
  callTime: '',
  consent: false,
  hp: '',
};

const EMPTY_FEEDBACK: Feedback = { steps: {}, overall: '' };

function canProceed(step: StepId, a: Answers): boolean {
  switch (step) {
    case 'eduType':
      return a.eduType !== undefined;
    case 'orgType':
      return !!a.orgType && (a.orgType.value !== '기타' || a.orgType.other.trim() !== '');
    case 'schoolSlot':
      return a.schoolSlot !== undefined;
    case 'audience':
      return a.audience === null || (a.audience?.grades.length ?? 0) > 0;
    case 'headcount':
      return a.headcount === null || a.headcount?.count != null;
    case 'field':
      return a.field === null || (a.field?.length ?? 0) > 0;
    case 'programs':
      return a.programs === null || !!(a.programs && (a.programs.picked.length || a.programs.other.trim() || a.programs.recommend));
    case 'place':
      return a.place !== undefined;
    case 'region':
      return a.region === null || !!a.region?.sido;
    case 'facility':
      return a.facility === null || !!(a.facility && (a.facility.rooms.length || a.facility.devices.length));
    case 'booth':
    case 'request':
      return true;
    case 'schedule':
      return scheduleReady(a.schedule);
    case 'budget':
      return a.budget !== undefined;
    default:
      return false;
  }
}

function validateContact(c: ContactForm, lang: Lang): ContactErrors {
  const ko = lang === 'ko';
  const e: ContactErrors = {};
  if (!c.orgName.trim()) e['org.name'] = ko ? '기관명을 적어 주세요.' : 'Please enter your organization.';
  if (!c.name.trim()) e['contact.name'] = ko ? '담당자 성함을 적어 주세요.' : 'Please enter your name.';
  if (!/^01[016789][0-9]{7,8}$/.test(digitsOnly(c.mobile)))
    e['contact.mobile'] = ko ? '휴대폰 번호를 확인해 주세요. (010으로 시작하는 10~11자리)' : 'Please check your mobile number (10–11 digits starting with 01).';
  const email = c.email.trim();
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e['contact.email'] = ko ? '이메일 주소를 확인해 주세요.' : 'Please check your email address.';
  else if (!email && c.replyPreference === REPLY_EMAIL)
    e['contact.email'] = ko ? '이메일로 회신받으시려면 이메일 주소가 필요해요.' : 'Please enter an email address to be contacted by email.';
  if (!c.consent) e.consent = ko ? '개인정보 수집 · 이용에 동의해 주셔야 접수할 수 있어요.' : 'You need to agree to submit the inquiry.';
  return e;
}

function phaseIndex(view: View): number {
  if (view === 'result') return PHASES.length;
  const i = PHASES.findIndex((p) => p.steps.includes(view as StepId));
  return i < 0 ? 0 : i;
}

export default function ContactWizard({ mode, locale }: { mode: WizardMode; locale: string }) {
  const lang: Lang = locale === 'en' ? 'en' : 'ko';
  const ko = lang === 'ko';
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Answers>({});
  const answersRef = useRef<Answers>({});
  const [view, setView] = useState<View>('eduType');
  const [programSlug, setProgramSlug] = useState<string | null>(null);
  const [contact, setContactState] = useState<ContactForm>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(EMPTY_FEEDBACK);
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<Result | null>(null);
  const [sending, setSending] = useState(false);
  const snapshotRef = useRef<InquiryPayload | null>(null);
  const [ready, setReady] = useState(false);
  const [resume, setResume] = useState<ReturnType<typeof loadDraft>>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // ─── 이동 ─────────────────────────────────────────────────────

  const go = useCallback((next: View, push = true) => {
    setView(next);
    setSheetOpen(false);
    if (push) window.history.pushState({ ...(window.history.state ?? {}), hyeduWizard: next }, '');
  }, []);

  const nextAfter = useCallback((from: StepId, a: Answers): View => {
    const steps = visibleSteps(a);
    if (a.eduType === 'individual') return 'individual';
    const i = steps.indexOf(from);
    return steps[i + 1] ?? 'contact';
  }, []);

  const prevOf = (from: View): StepId | null => {
    if (from === 'individual') return 'eduType';
    const steps = visibleSteps(answers);
    const i = steps.indexOf(from as StepId);
    return i > 0 ? steps[i - 1] : null;
  };

  // ─── 답 쓰기 ──────────────────────────────────────────────────

  const commit = useCallback((next: Answers) => {
    answersRef.current = next;
    setAnswers(next);
    snapshotRef.current = null; // 답을 고치면 고정된 묶음을 버린다
  }, []);

  const set: SetAnswer = useCallback(
    (step, value) => {
      commit(applyAnswer(answersRef.current, step, value));
    },
    [commit],
  );

  const setAndNext: SetAnswer = useCallback(
    (step, value) => {
      const next = applyAnswer(answersRef.current, step, value);
      commit(next);
      go(nextAfter(step as StepId, next));
    },
    [commit, go, nextAfter],
  );

  const setContact = useCallback((patch: Partial<ContactForm>) => {
    setContactState((c) => ({ ...c, ...patch }));
    snapshotRef.current = null;
    setErrors((e) => {
      const n = { ...e };
      if ('orgName' in patch) delete n['org.name'];
      if ('name' in patch) delete n['contact.name'];
      if ('mobile' in patch) delete n['contact.mobile'];
      if ('email' in patch || 'replyPreference' in patch) delete n['contact.email'];
      if ('consent' in patch) delete n.consent;
      return n;
    });
  }, []);

  const setStepFeedback = (step: StepId, text: string) => {
    setFeedback((f) => ({ ...f, steps: { ...f.steps, [step]: text } }));
    snapshotRef.current = null;
  };

  // ─── 시작: 임시 저장 · 진입 파라미터 ──────────────────────────

  const applyPrefill = useCallback(() => {
    const pre = prefillFromQuery(new URLSearchParams(searchParams.toString()));
    if (!pre) return;
    commit(pre.answers);
    setProgramSlug(pre.programSlug);
    const first = firstUnanswered(pre.answers);
    setView(first);
    window.history.replaceState({ ...(window.history.state ?? {}), hyeduWizard: first }, '');
  }, [searchParams, commit]);

  useEffect(() => {
    window.history.replaceState({ ...(window.history.state ?? {}), hyeduWizard: 'eduType' }, '');
    const draft = loadDraft(mode);
    if (draft) setResume(draft);
    else applyPrefill();
    setReady(true);

    const onPop = (e: PopStateEvent) => {
      const v = (e.state as { hyeduWizard?: View } | null)?.hyeduWizard;
      if (!v) return;
      if (resultRef.current?.kind === 'ok') return; // 접수가 끝났으면 결과 화면에 머문다
      if (v === 'result' && !resultRef.current) {
        setView('contact');
        return;
      }
      const a = answersRef.current;
      if (v !== 'result' && v !== 'individual' && !visibleSteps(a).includes(v)) {
        setView(firstUnanswered(a));
        return;
      }
      setView(v);
      setSheetOpen(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // 처음 한 번만 (searchParams는 정적 페이지에서 바뀌지 않는다)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptResume = () => {
    if (!resume) return;
    commit(resume.answers);
    setProgramSlug(resume.programSlug);
    const steps = visibleSteps(resume.answers);
    const target = steps.includes(resume.step) ? resume.step : firstUnanswered(resume.answers);
    setResume(null);
    go(target, false);
    window.history.replaceState({ ...(window.history.state ?? {}), hyeduWizard: target }, '');
  };

  const declineResume = () => {
    clearDraft(mode);
    setResume(null);
    applyPrefill();
  };

  // 임시 저장 (허용 목록은 draft.ts)
  useEffect(() => {
    if (!ready || resume || result?.kind === 'ok') return;
    if (view === 'result' || view === 'individual') return;
    if (Object.keys(answers).length === 0) return;
    saveDraft(mode, view, answers, programSlug);
  }, [answers, view, programSlug, ready, resume, result, mode]);

  // 질문이 바뀌면 질문 제목으로 초점을 옮기고, 위저드 머리가 화면 위로 벗어났으면 끌어온다.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [view]);

  // ─── 처음부터 다시 ────────────────────────────────────────────

  const restart = (ask = true) => {
    if (ask && !window.confirm(t(UI.restartConfirm, lang))) return;
    commit({});
    setContactState(EMPTY_CONTACT);
    setFeedback(EMPTY_FEEDBACK);
    setErrors({});
    setResult(null);
    resultRef.current = null;
    setProgramSlug(null);
    clearDraft(mode);
    go('eduType');
  };

  // ─── 제출 ─────────────────────────────────────────────────────

  const showResult = (r: Result) => {
    setResult(r);
    resultRef.current = r;
    go('result');
  };

  const submit = async () => {
    const errs = validateContact(contact, lang);
    if (mode === 'preview' && feedbackLength(feedback) > LIMITS.feedbackTotal) errs.feedback = t(PREVIEW.feedbackTooLong, lang);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      const id = { 'org.name': 'ct-org', 'contact.name': 'ct-name', 'contact.mobile': 'ct-mobile', 'contact.email': 'ct-email', consent: 'consent-text', feedback: 'fb-overall' }[firstKey];
      if (id) document.getElementById(id)?.focus();
      return;
    }

    if (!snapshotRef.current) {
      snapshotRef.current = buildPayload({
        answers,
        contact,
        submissionId: crypto.randomUUID(),
        test: mode === 'preview',
        page: window.location.pathname,
        programSlug,
        feedback: mode === 'preview' ? feedback : undefined,
      });
    }
    const payload = snapshotRef.current;

    if (!INQUIRY_ENDPOINT) {
      // 미리보기는 중계가 없을 때 보내지 않는 시험 모드로 동작한다(사양 §8).
      showResult(mode === 'preview' ? { kind: 'nosend', payload } : { kind: 'error' });
      return;
    }

    setSending(true);
    const r = await submitInquiry(INQUIRY_ENDPOINT, payload, mode);
    setSending(false);
    if (r.kind === 'ok') {
      clearDraft(mode);
      showResult({ kind: 'ok', receipt: r.receipt });
    } else if (r.kind === 'invalid') {
      // 수신 측이 거절한 칸을 표시한다. 클라이언트 검사를 통과했는데 거절됐으므로 문구는 일반 안내로 둔다.
      const e: ContactErrors = {};
      for (const f of r.fields) e[f as keyof ContactErrors] = ko ? '입력 내용을 확인해 주세요.' : 'Please check this field.';
      setErrors(e);
      if (view !== 'contact') go('contact');
    } else {
      showResult({ kind: r.kind });
    }
  };

  const copyText = () => summaryForCopy(answers, contact, lang);
  const feedbackText = () => feedbackForCopy(answersRef.current, feedback);

  // ─── 화면 ─────────────────────────────────────────────────────

  if (!ready) return <WizardSkeleton />;

  const steps = visibleSteps(answers);
  const stepProps = { lang, answers, set, setAndNext };
  const answeredCount = steps.filter((s) => s !== 'contact' && answers[s as keyof Answers] !== undefined).length;
  const totalCount = steps.filter((s) => s !== 'contact').length;
  const isStep = view !== 'individual' && view !== 'result';
  const step = view as StepId;
  /** 답 키로 쓸 때 (연락처 화면은 답 키가 없다 — 그 화면에서는 쓰지 않는다) */
  const answerKey = step as keyof Answers;
  const prev = prevOf(view);

  let title = '';
  let why = '';
  if (isStep) {
    title = t(STEP_COPY[step].title, lang);
    why = t(STEP_COPY[step].why, lang);
    if (step === 'headcount' && answers.eduType === 'booth') title = ko ? '부스를 체험할 전체 인원은요?' : 'How many people will visit the booths?';
  } else if (view === 'individual') {
    title = ko ? '자녀(개인) 참가 신청' : 'Individual registration';
    why = ko ? '개인 참가는 아래에서 바로 신청하실 수 있어요.' : 'Individual registration is handled below.';
  } else if (result?.kind === 'ok') {
    title = ko ? '접수되었습니다' : 'Your inquiry has been received';
  } else if (result?.kind === 'nosend') {
    title = ko ? '시험 접수 결과' : 'Test submission';
  } else {
    title = ko ? '접수를 마치지 못했어요' : "We couldn't complete your inquiry";
  }

  let body: ReactNode = null;
  switch (view) {
    case 'eduType':
      body = <EduTypeStep {...stepProps} />;
      break;
    case 'orgType':
      body = <OrgTypeStep {...stepProps} />;
      break;
    case 'schoolSlot':
      body = <SchoolSlotStep {...stepProps} />;
      break;
    case 'audience':
      body = <AudienceStep {...stepProps} />;
      break;
    case 'headcount':
      body = <HeadcountStep {...stepProps} />;
      break;
    case 'field':
      body = <FieldStep {...stepProps} />;
      break;
    case 'programs':
      body = <ProgramsStep {...stepProps} />;
      break;
    case 'place':
      body = <PlaceStep {...stepProps} />;
      break;
    case 'region':
      body = <RegionStep {...stepProps} />;
      break;
    case 'facility':
      body = <FacilityStep {...stepProps} />;
      break;
    case 'booth':
      body = <BoothStep {...stepProps} />;
      break;
    case 'schedule':
      body = <ScheduleStep {...stepProps} />;
      break;
    case 'budget':
      body = <BudgetStep {...stepProps} />;
      break;
    case 'request':
      body = <RequestStep {...stepProps} />;
      break;
    case 'contact':
      body = (
        <ContactStep
          lang={lang}
          mode={mode}
          contact={contact}
          setContact={setContact}
          errors={errors}
          overallFeedback={feedback.overall}
          setOverallFeedback={(v) => {
            setFeedback((f) => ({ ...f, overall: v }));
            snapshotRef.current = null;
          }}
        />
      );
      break;
    case 'individual':
      body = (
        <IndividualScreen
          lang={lang}
          onBack={() => {
            commit({});
            go('eduType');
          }}
        />
      );
      break;
    case 'result':
      if (result?.kind === 'ok')
        body = <CompletionScreen lang={lang} receipt={result.receipt} answers={answers} contact={contact} copyText={copyText} onRestart={() => restart(false)} />;
      else if (result?.kind === 'nosend') body = <NoSendScreen lang={lang} payload={result.payload} feedbackText={feedbackText} onBack={() => go('contact')} />;
      else if (result)
        body = <ErrorScreen lang={lang} kind={result.kind} sending={sending} onRetry={submit} onBack={() => go('contact')} copyText={copyText} />;
      break;
  }

  const escape = isStep ? ESCAPE[step] : undefined;
  const escapeLabel = escape === 'skip' ? t(UI.skip, lang) : escape === 'notDecided' ? t(UI.notDecided, lang) : t(UI.unknown, lang);
  const optionalEmpty = (step === 'booth' || step === 'request') && isEmptyOptional(step, answers);
  const onNext = () => {
    if (!isStep) return;
    if (step === 'contact') {
      void submit();
      return;
    }
    if (optionalEmpty) {
      setAndNext(answerKey, null);
      return;
    }
    go(nextAfter(step, answersRef.current));
  };
  const nextLabel = step === 'contact' ? (sending ? t(UI.submitting, lang) : t(UI.submit, lang)) : optionalEmpty ? t(UI.skip, lang) : t(UI.next, lang);
  const nextDisabled = sending || (isStep && step !== 'contact' && !canProceed(step, answers));
  const phase = phaseIndex(view);

  return (
    <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px] px-4">
      {mode === 'preview' && (
        <div className="mb-6 rounded-2xl border border-secondary/50 bg-secondary/10 p-4 md:flex md:items-center md:justify-between md:gap-4">
          <p className="text-sm text-amber-900 break-keep">{t(PREVIEW.banner, lang)}</p>
          <div className="mt-3 md:mt-0 shrink-0">
            <CopyButton text={feedbackText} label={t(PREVIEW.copyFeedback, lang)} doneLabel={t(UI.copied, lang)} />
          </div>
        </div>
      )}

      {resume ? (
        <div className="mx-auto max-w-[680px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-gray-900 break-keep">{t(UI.resumeTitle, lang)}</p>
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <SummaryList answers={resume.answers} lang={lang} />
          </div>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={acceptResume} className="rounded-xl bg-point px-6 py-3 font-bold text-white hover:opacity-90">
              {t(UI.resumeYes, lang)}
            </button>
            <button type="button" onClick={declineResume} className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:border-point hover:text-point">
              {t(UI.resumeNo, lang)}
            </button>
          </div>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <div ref={topRef} className="min-w-0 scroll-mt-24">
            {/* 진행 4단계 */}
            <ol className="mb-4 grid grid-cols-4 gap-2" aria-label={ko ? '진행 단계' : 'Progress'}>
              {PHASES.map((p, i) => (
                <li key={i} aria-current={i === phase ? 'step' : undefined}>
                  <span className={`block h-1.5 rounded-full ${i < phase ? 'bg-point' : i === phase ? 'bg-point/60' : 'bg-gray-200'}`} />
                  <span className={`mt-1.5 hidden sm:block text-xs ${i === phase ? 'font-semibold text-point' : 'text-gray-400'}`}>{t(p.label, lang)}</span>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-8 shadow-sm">
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl md:text-3xl font-bold text-gray-900 break-keep outline-none">
                {title}
              </h2>
              {why && (
                <p className="mt-2 flex items-start gap-1.5 text-sm md:text-[15px] text-gray-500 break-keep">
                  <span className="mt-0.5 shrink-0">
                    <InfoIcon />
                  </span>
                  <span>
                    <span className="sr-only">{t(UI.whyPrefix, lang)} </span>
                    {why}
                  </span>
                </p>
              )}

              <div key={`body-${view}`} className="mt-6 animate-wizard-in motion-reduce:animate-none">
                {body}
                {escape && (
                  <div className="mt-4">
                    <Tile
                      selected={answers[answerKey] === null}
                      onClick={() => setAndNext(answerKey, null)}
                      title={escapeLabel}
                      dashed
                    />
                  </div>
                )}
              </div>

              {mode === 'preview' && isStep && step !== 'contact' && (
                <FeedbackBox key={`feedback-${step}`} lang={lang} value={feedback.steps[step] ?? ''} onChange={(v) => setStepFeedback(step, v)} />
              )}

              {isStep && (
                <div className="mt-8 hidden lg:flex items-center justify-between gap-3">
                  {prev ? (
                    <button type="button" onClick={() => go(prev)} className="rounded-xl px-4 py-3 font-semibold text-gray-600 hover:text-point">
                      ← {t(UI.prev, lang)}
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={nextDisabled}
                    className="rounded-xl bg-point px-8 py-3 font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {nextLabel}
                  </button>
                </div>
              )}
              {view === 'individual' && (
                <div className="mt-6 hidden lg:block">
                  <button type="button" onClick={() => go('eduType')} className="rounded-xl px-4 py-3 font-semibold text-gray-600 hover:text-point">
                    ← {t(UI.prev, lang)}
                  </button>
                </div>
              )}
            </div>

            {isStep && answeredCount > 0 && (
              <div className="mt-3 text-right">
                <button type="button" onClick={() => restart()} className="text-sm text-gray-400 underline hover:text-point">
                  {t(UI.restart, lang)}
                </button>
              </div>
            )}

            {/* 모바일 하단 고정 바 */}
            {(isStep || view === 'individual') && (
              <div className="sticky bottom-0 z-30 -mx-4 mt-4 border-t border-gray-200 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => prev && go(prev)}
                    disabled={!prev}
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 disabled:opacity-30"
                  >
                    {t(UI.prev, lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-600"
                  >
                    {t(UI.summaryTitle, lang)} ({answeredCount})
                  </button>
                  {isStep && (
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={nextDisabled}
                      className="rounded-xl bg-point px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
                    >
                      {nextLabel}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 데스크톱 요약 패널 */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SummaryHeader lang={lang} answered={answeredCount} total={totalCount} />
              <SummaryList answers={answers} lang={lang} onPick={view === 'result' && result?.kind === 'ok' ? undefined : (s) => go(s)} />
            </div>
          </aside>
        </div>
      )}

      {/* 모바일 요약 시트 */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t(UI.summaryTitle, lang)}>
          <button type="button" className="absolute inset-0 bg-black/40" aria-label={t(UI.close, lang)} onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-2xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <SummaryHeader lang={lang} answered={answeredCount} total={totalCount} />
              <button type="button" onClick={() => setSheetOpen(false)} className="rounded-lg px-3 py-1.5 text-sm text-gray-500">
                {t(UI.close, lang)}
              </button>
            </div>
            <SummaryList answers={answers} lang={lang} onPick={(s) => go(s)} />
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryHeader({ lang, answered, total }: { lang: Lang; answered: number; total: number }) {
  const pct = total ? Math.round((answered / total) * 100) : 0;
  return (
    <div className="mb-3 min-w-0 flex-1">
      <p className="font-semibold text-gray-900">{t(UI.summaryTitle, lang)}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="h-1.5 flex-1 rounded-full bg-gray-100">
          <span className="block h-1.5 rounded-full bg-point" style={{ width: `${pct}%` }} />
        </span>
        <span className="text-xs text-gray-500">
          {t(UI.summaryFill, lang)} {answered}/{total}
        </span>
      </div>
    </div>
  );
}

function FeedbackBox({ lang, value, onChange }: { lang: Lang; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(value !== '');
  return (
    <div className="mt-6 border-t border-dashed border-secondary/60 pt-4">
      {open ? (
        <label className="block">
          <span className="mb-2 flex justify-between text-sm font-semibold text-amber-800">
            {t(PREVIEW.feedbackToggle, lang)}
            <span className="font-normal text-gray-400">
              {value.length}/{LIMITS.feedbackPerStep}
            </span>
          </span>
          <textarea
            rows={2}
            className={`${inputClass} border-secondary/60 bg-secondary/5`}
            maxLength={LIMITS.feedbackPerStep}
            placeholder={t(PREVIEW.feedbackPlaceholder, lang)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="text-sm font-semibold text-amber-700 hover:underline">
          💬 {t(PREVIEW.feedbackToggle, lang)}
        </button>
      )}
    </div>
  );
}

export function WizardSkeleton() {
  return (
    <div className="mx-auto max-w-[1170px] px-4" aria-hidden="true">
      <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-gray-50" />
    </div>
  );
}
