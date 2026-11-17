'use client';

/**
 * 질문 화면(S1~S14). 사양 §3. 각 화면은 답을 바로 Answers에 쓰고,
 * 넘어가기(다음 · 모르겠어요)는 ContactWizard가 맡는다.
 */
import Image from '@/components/ui/Img';
import {
  BOOTH_AREAS,
  BOOTH_LUNCH,
  BOOTH_NEEDS,
  BOOTH_SUPPORT,
  BUDGET_SOURCES,
  CAMP_LENGTHS,
  DEVICES,
  DOCS,
  EDU_OPTIONS,
  EVENT_DAYS,
  FIELD_OPTIONS,
  LIMITS,
  ORG_OTHER,
  ORG_TYPES,
  PERIOD_COUNTS,
  PERIOD_MINUTES,
  PLACE_LABEL,
  PLACE_OPTIONS,
  PURCHASE,
  ROOMS,
  ROUGH_PERIODS,
  SCHOOL_SLOTS,
  SESSION_COUNTS,
  SIDO,
  SUPPORT_OPTIONS,
  TEACHER,
  TEACHER_TRAINING,
  TIME_OF_DAY,
  UI,
  VAT_OPTIONS,
  WEEKDAYS,
  gradeOptions,
} from '@/data/contact-wizard';
import { catalogFor, findItem } from '@/lib/contact-wizard/catalog';
import { facilityGroups, fieldsOf, targetsOf } from '@/lib/contact-wizard/flow';
import { isSoon } from '@/lib/contact-wizard/format';
import type {
  Answers,
  BoothAnswer,
  BudgetAnswer,
  FacilityAnswer,
  FieldKey,
  Lang,
  ProgramsAnswer,
  RegionAnswer,
  RequestAnswer,
  ScheduleAnswer,
} from '@/lib/contact-wizard/types';
import { Chip, ChipGroup, CheckIcon, FieldBlock, Notice, Tile, inputClass, optLabel, t } from './ui';

export type SetAnswer = <K extends keyof Answers>(step: K, value: Answers[K]) => void;

export interface StepProps {
  lang: Lang;
  answers: Answers;
  set: SetAnswer;
  setAndNext: SetAnswer;
}

const grid2 = 'grid grid-cols-1 sm:grid-cols-2 gap-3';

// ─── S1 ─────────────────────────────────────────────────────────

export function EduTypeStep({ lang, answers, setAndNext }: StepProps) {
  return (
    <div className={grid2}>
      {EDU_OPTIONS.map((e) => (
        <Tile
          key={e.key}
          selected={answers.eduType === e.key}
          onClick={() => setAndNext('eduType', e.key)}
          title={t(e.label, lang)}
          desc={t(e.desc, lang)}
          icon={e.icon}
          dashed={e.key === 'unknown'}
        />
      ))}
    </div>
  );
}

// ─── S2 ─────────────────────────────────────────────────────────

export function OrgTypeStep({ lang, answers, set, setAndNext }: StepProps) {
  const cur = answers.orgType;
  return (
    <div className="space-y-4">
      <div className={grid2}>
        {ORG_TYPES.map((o) => (
          <Tile
            key={o.value}
            selected={cur?.value === o.value}
            onClick={() =>
              o.value === ORG_OTHER ? set('orgType', { value: ORG_OTHER, other: cur?.other ?? '' }) : setAndNext('orgType', { value: o.value, other: '' })
            }
            title={optLabel(o, lang)}
          />
        ))}
      </div>
      {cur?.value === ORG_OTHER && (
        <FieldBlock label={lang === 'ko' ? '어떤 곳인지 적어 주세요' : 'Please describe your organization'} htmlFor="org-other">
          <input
            id="org-other"
            className={inputClass}
            maxLength={LIMITS.orgOther}
            value={cur.other}
            onChange={(e) => set('orgType', { value: ORG_OTHER, other: e.target.value })}
            autoFocus
          />
        </FieldBlock>
      )}
    </div>
  );
}

// ─── S3 ─────────────────────────────────────────────────────────

export function SchoolSlotStep({ lang, answers, setAndNext, set }: StepProps) {
  return (
    <div className={grid2}>
      {SCHOOL_SLOTS.map((o) => (
        <Tile
          key={o.value}
          selected={answers.schoolSlot === o.value}
          onClick={() => {
            // 교사 연수면 S4에서 「교사」를 미리 골라 둔다.
            if (o.value === TEACHER_TRAINING && !answers.audience) set('audience', { grades: [TEACHER], support: [] });
            setAndNext('schoolSlot', o.value);
          }}
          title={optLabel(o, lang)}
        />
      ))}
    </div>
  );
}

// ─── S4 ─────────────────────────────────────────────────────────

export function AudienceStep({ lang, answers, set }: StepProps) {
  const cur = answers.audience ?? { grades: [], support: [] };
  return (
    <div className="space-y-6">
      <ChipGroup options={gradeOptions(answers.orgType?.value)} value={cur.grades} onChange={(v) => set('audience', { ...cur, grades: v as string[] })} lang={lang} />
      <div className="space-y-2">
        <ChipGroup
          label={lang === 'ko' ? '진행에 상의할 점 (선택)' : 'Anything to discuss about running the class? (optional)'}
          options={SUPPORT_OPTIONS}
          value={cur.support}
          onChange={(v) => set('audience', { ...cur, support: v as string[] })}
          lang={lang}
        />
        <p className="text-sm text-gray-500 break-keep">{t(UI.noPrivateInfo, lang)}</p>
      </div>
    </div>
  );
}

// ─── S5 ─────────────────────────────────────────────────────────

function toInt(v: string): number | null {
  const n = parseInt(v.replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function HeadcountStep({ lang, answers, set }: StepProps) {
  const cur = answers.headcount ?? { count: null, classes: null };
  const small = cur.count != null && cur.count < 20 && (answers.eduType === 'class' || answers.eduType === 'club');
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldBlock label={lang === 'ko' ? '인원 (명)' : 'Participants'} htmlFor="hc-count">
          <input
            id="hc-count"
            className={inputClass}
            inputMode="numeric"
            placeholder={lang === 'ko' ? '예) 60' : 'e.g. 60'}
            value={cur.count ?? ''}
            onChange={(e) => set('headcount', { ...cur, count: toInt(e.target.value) })}
          />
        </FieldBlock>
        {answers.eduType !== 'booth' && (
          <FieldBlock label={lang === 'ko' ? '학급(반) 수' : 'Number of classes'} hint={t(UI.optional, lang)} htmlFor="hc-classes">
            <input
              id="hc-classes"
              className={inputClass}
              inputMode="numeric"
              placeholder={lang === 'ko' ? '예) 3' : 'e.g. 3'}
              value={cur.classes ?? ''}
              onChange={(e) => set('headcount', { ...cur, classes: toInt(e.target.value) })}
            />
          </FieldBlock>
        )}
      </div>
      {small && (
        <Notice tone="warn">
          {lang === 'ko'
            ? '체험교실은 20명 기준 단가예요. 20명보다 적으면 1인 금액이 달라질 수 있어요.'
            : 'Prices are based on 20 participants. With fewer than 20, the per-person price may change.'}
        </Notice>
      )}
    </div>
  );
}

// ─── S6 ─────────────────────────────────────────────────────────

export function FieldStep({ lang, answers, set }: StepProps) {
  const cur = answers.field ?? [];
  const toggle = (k: FieldKey) => set('field', cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]);
  return (
    <div className={grid2}>
      {FIELD_OPTIONS.map((f) => (
        <Tile key={f.key} selected={cur.includes(f.key)} onClick={() => toggle(f.key)} title={lang === 'ko' ? f.value : f.en} dashed={f.key === 'recommend'} />
      ))}
    </div>
  );
}

// ─── S7 ─────────────────────────────────────────────────────────

export function ProgramsStep({ lang, answers, set }: StepProps) {
  const cur: ProgramsAnswer = answers.programs ?? { picked: [], other: '', recommend: false };
  const { items, relaxed } = catalogFor(answers.eduType, fieldsOf(answers), targetsOf(answers));
  const toggle = (id: string) => set('programs', { ...cur, picked: cur.picked.includes(id) ? cur.picked.filter((x) => x !== id) : [...cur.picked, id] });
  return (
    <div className="space-y-5">
      {relaxed !== 'none' && (
        <Notice>
          {lang === 'ko'
            ? '조건에 딱 맞는 프로그램이 없어 비슷한 프로그램을 보여 드려요.'
            : 'No program matches exactly, so here are similar ones.'}
        </Notice>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const on = cur.picked.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(item.id)}
              className={`relative overflow-hidden rounded-2xl border bg-white text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-point ${
                on ? 'border-point ring-1 ring-point' : 'border-gray-200 shadow-sm hover:border-point/60'
              }`}
            >
              <span className="block aspect-[16/9] w-full bg-gray-100">
                <Image src={item.thumbnail} alt="" width={480} height={270} className="h-full w-full object-cover" />
              </span>
              <span className="block p-3">
                <span className="block text-[15px] font-semibold text-gray-900 break-keep">{item.title[lang]}</span>
                {item.price[lang] && <span className="mt-1 block text-xs text-gray-500 break-keep">{item.price[lang]}</span>}
              </span>
              {on && (
                <span className="absolute right-2 top-2 rounded-full bg-point p-1 text-white" aria-hidden="true">
                  <CheckIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:items-end">
        <FieldBlock label={lang === 'ko' ? '목록에 없는 프로그램' : 'A program not on the list'} hint={t(UI.optional, lang)} htmlFor="prog-other">
          <input
            id="prog-other"
            className={inputClass}
            maxLength={LIMITS.programOther}
            placeholder={lang === 'ko' ? '예) AI 웹툰 만들기' : 'e.g. AI webtoon'}
            value={cur.other}
            onChange={(e) => set('programs', { ...cur, other: e.target.value })}
          />
        </FieldBlock>
        <Chip selected={cur.recommend} onClick={() => set('programs', { ...cur, recommend: !cur.recommend })}>
          {lang === 'ko' ? '추천해 주세요' : 'Recommend for me'}
        </Chip>
      </div>
    </div>
  );
}

// ─── S8 ─────────────────────────────────────────────────────────

export function PlaceStep({ lang, answers, set, setAndNext }: StepProps) {
  const edu = answers.eduType ?? 'unknown';
  const cur = answers.place;
  const isCamp = edu === 'camp';
  const options = PLACE_OPTIONS.filter((p) => p.for.includes(edu));

  // 온라인 과정마다 가능한 방식이 다르다. 고른 방식을 지원하지 않는 과정을 알려 준다(막지 않음).
  const mismatch =
    edu === 'online' && cur && (cur.value === 'live' || cur.value === 'video')
      ? (answers.programs?.picked ?? [])
          .map((id) => findItem(id))
          .filter((i) => i?.modes && !i.modes.includes(cur.value as 'live' | 'video'))
          .map((i) => i!.title[lang])
      : [];

  return (
    <div className="space-y-5">
      <div className={grid2}>
        {options.map((p) => (
          <Tile
            key={p.key}
            selected={cur?.value === p.key}
            onClick={() => {
              const value = { value: p.key, campLength: cur?.campLength ?? '' };
              if (isCamp) set('place', value);
              else setAndNext('place', value);
            }}
            title={t(PLACE_LABEL[p.key], lang)}
          />
        ))}
      </div>
      {isCamp && cur && (
        <ChipGroup
          label={lang === 'ko' ? '캠프 기간' : 'Camp length'}
          options={CAMP_LENGTHS}
          value={cur.campLength}
          onChange={(v) => set('place', { ...cur, campLength: v as string })}
          lang={lang}
        />
      )}
      {mismatch.length > 0 && (
        <Notice tone="warn">
          {lang === 'ko'
            ? `${mismatch.join(', ')}: 이 방식으로는 진행하지 않는 과정이에요. 상담하면서 맞춰 드릴게요.`
            : `${mismatch.join(', ')}: not offered in this format. We'll work it out together.`}
        </Notice>
      )}
    </div>
  );
}

// ─── S9 ─────────────────────────────────────────────────────────

export function RegionStep({ lang, answers, set }: StepProps) {
  const cur: RegionAnswer = answers.region ?? { sido: '', sigungu: '', place: '' };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldBlock label={lang === 'ko' ? '시 · 도' : 'Province / city'} htmlFor="rg-sido">
          <select id="rg-sido" className={inputClass} value={cur.sido} onChange={(e) => set('region', { ...cur, sido: e.target.value })}>
            <option value="">{lang === 'ko' ? '고르세요' : 'Select'}</option>
            {SIDO.map((s) => (
              <option key={s.value} value={s.value}>
                {optLabel(s, lang)}
              </option>
            ))}
          </select>
        </FieldBlock>
        <FieldBlock label={lang === 'ko' ? '시 · 군 · 구' : 'District'} hint={t(UI.optional, lang)} htmlFor="rg-sigungu">
          <input
            id="rg-sigungu"
            className={inputClass}
            maxLength={LIMITS.shortText}
            placeholder={lang === 'ko' ? '예) 안산시 상록구' : 'e.g. Ansan'}
            value={cur.sigungu}
            onChange={(e) => set('region', { ...cur, sigungu: e.target.value })}
          />
        </FieldBlock>
      </div>
      <FieldBlock label={lang === 'ko' ? '장소 이름' : 'Venue name'} hint={t(UI.optional, lang)} htmlFor="rg-place">
        <input
          id="rg-place"
          className={inputClass}
          maxLength={LIMITS.shortText}
          placeholder={lang === 'ko' ? '예) 체육관, ○○연수원' : 'e.g. gym, retreat center'}
          value={cur.place}
          onChange={(e) => set('region', { ...cur, place: e.target.value })}
        />
      </FieldBlock>
      <p className="text-sm text-gray-500">{lang === 'ko' ? '상세 주소는 계약할 때 여쭤볼게요.' : "We'll ask for the full address later."}</p>
    </div>
  );
}

// ─── S10 ────────────────────────────────────────────────────────

export function FacilityStep({ lang, answers, set }: StepProps) {
  const cur: FacilityAnswer = answers.facility ?? { rooms: [], devices: [] };
  const groups = facilityGroups(answers);
  return (
    <div className="space-y-6">
      {groups.rooms && (
        <ChipGroup label={lang === 'ko' ? '공간' : 'Room'} options={ROOMS} value={cur.rooms} onChange={(v) => set('facility', { ...cur, rooms: v as string[] })} lang={lang} />
      )}
      <ChipGroup
        label={lang === 'ko' ? '기기 (있는 것을 모두)' : 'Devices (all that apply)'}
        options={DEVICES}
        value={cur.devices}
        onChange={(v) => set('facility', { ...cur, devices: v as string[] })}
        lang={lang}
      />
    </div>
  );
}

// ─── S11 ────────────────────────────────────────────────────────

export const EMPTY_BOOTH: BoothAnswer = { count: null, start: '', end: '', lunch: '', area: '', size: '', support: [], needs: [] };

export function BoothStep({ lang, answers, set }: StepProps) {
  const cur: BoothAnswer = answers.booth ?? EMPTY_BOOTH;
  const upd = (patch: Partial<BoothAnswer>) => set('booth', { ...cur, ...patch });
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FieldBlock label={lang === 'ko' ? '부스 수' : 'Number of booths'} htmlFor="bt-count">
          <input id="bt-count" className={inputClass} inputMode="numeric" value={cur.count ?? ''} onChange={(e) => upd({ count: toInt(e.target.value) })} />
        </FieldBlock>
        <FieldBlock label={lang === 'ko' ? '운영 시작' : 'Start'} htmlFor="bt-start">
          <input id="bt-start" type="time" className={inputClass} value={cur.start} onChange={(e) => upd({ start: e.target.value })} />
        </FieldBlock>
        <FieldBlock label={lang === 'ko' ? '운영 끝' : 'End'} htmlFor="bt-end">
          <input id="bt-end" type="time" className={inputClass} value={cur.end} onChange={(e) => upd({ end: e.target.value })} />
        </FieldBlock>
      </div>
      <ChipGroup options={BOOTH_LUNCH} value={cur.lunch} onChange={(v) => upd({ lunch: v as string })} lang={lang} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChipGroup label={lang === 'ko' ? '장소' : 'Area'} options={BOOTH_AREAS} value={cur.area} onChange={(v) => upd({ area: v as string })} lang={lang} />
        <FieldBlock label={lang === 'ko' ? '부스 크기' : 'Booth size'} htmlFor="bt-size">
          <input id="bt-size" className={inputClass} maxLength={LIMITS.shortText} placeholder={lang === 'ko' ? '예) 3m × 2m' : 'e.g. 3m × 2m'} value={cur.size} onChange={(e) => upd({ size: e.target.value })} />
        </FieldBlock>
      </div>
      <ChipGroup
        label={lang === 'ko' ? '현장에서 지원 가능한 것' : 'What the venue can provide'}
        options={BOOTH_SUPPORT}
        value={cur.support}
        onChange={(v) => upd({ support: v as string[] })}
        lang={lang}
      />
      <ChipGroup label={lang === 'ko' ? '저희에게 필요한 것' : 'What you need from us'} options={BOOTH_NEEDS} value={cur.needs} onChange={(v) => upd({ needs: v as string[] })} lang={lang} />
    </div>
  );
}

// ─── S12 ────────────────────────────────────────────────────────

export const EMPTY_SCHEDULE: Omit<ScheduleAnswer, 'when'> = {
  dates: [''],
  timeOfDay: '',
  timeCustom: '',
  rough: '',
  roughCustom: '',
  periods: '',
  periodMinutes: '',
  sessions: '',
  sessionPeriods: '',
  weekdays: [],
  eventDays: '',
};

export function ScheduleStep({ lang, answers, set }: StepProps) {
  const cur = answers.schedule ?? null;
  const edu = answers.eduType;
  const ko = lang === 'ko';
  const pick = (when: ScheduleAnswer['when']) => set('schedule', { ...(cur ?? EMPTY_SCHEDULE), when });
  const upd = (patch: Partial<ScheduleAnswer>) => cur && set('schedule', { ...cur, ...patch });
  const whenTiles: { key: ScheduleAnswer['when']; label: string }[] = [
    { key: 'fixed', label: ko ? '날짜가 정해졌어요' : 'The date is set' },
    { key: 'rough', label: ko ? '대략적인 시기만 있어요' : 'Only a rough period' },
    { key: 'unknown', label: t(UI.unknown, lang) },
  ];
  const soon = isSoon(answers);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {whenTiles.map((w) => (
          <Tile key={w.key} selected={cur?.when === w.key} onClick={() => pick(w.key)} title={w.label} dashed={w.key === 'unknown'} />
        ))}
      </div>

      {cur?.when === 'fixed' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {cur.dates.map((d, i) => (
              <div key={i} className="flex items-end gap-2">
                <FieldBlock label={ko ? `${i + 1}순위 날짜` : `Choice #${i + 1}`} htmlFor={`sc-date-${i}`}>
                  <input
                    id={`sc-date-${i}`}
                    type="date"
                    className={inputClass}
                    value={d}
                    onChange={(e) => upd({ dates: cur.dates.map((x, j) => (j === i ? e.target.value : x)) })}
                  />
                </FieldBlock>
                {i > 0 && (
                  <button
                    type="button"
                    className="mb-1 rounded-lg px-3 py-2 text-sm text-gray-500 hover:text-red-600"
                    onClick={() => upd({ dates: cur.dates.filter((_, j) => j !== i) })}
                  >
                    {ko ? '빼기' : 'Remove'}
                  </button>
                )}
              </div>
            ))}
            {cur.dates.length < 3 && (
              <button type="button" className="text-sm font-semibold text-point hover:underline" onClick={() => upd({ dates: [...cur.dates, ''] })}>
                {ko ? '+ 후보 날짜 더하기' : '+ Add another date'}
              </button>
            )}
          </div>
          <ChipGroup label={ko ? '시간대' : 'Time of day'} options={TIME_OF_DAY} value={cur.timeOfDay} onChange={(v) => upd({ timeOfDay: v as string })} lang={lang} />
          <FieldBlock label={ko ? '시각을 정해 두셨다면' : 'Exact time, if known'} hint={t(UI.optional, lang)} htmlFor="sc-time">
            <input
              id="sc-time"
              className={inputClass}
              maxLength={LIMITS.shortText}
              placeholder={ko ? '예) 9:30~11:30' : 'e.g. 9:30–11:30'}
              value={cur.timeCustom}
              onChange={(e) => upd({ timeCustom: e.target.value })}
            />
          </FieldBlock>
        </div>
      )}

      {cur?.when === 'rough' && (
        <div className="space-y-4">
          <ChipGroup options={ROUGH_PERIODS} value={cur.rough} onChange={(v) => upd({ rough: v as string })} lang={lang} />
          <FieldBlock label={ko ? '직접 적기' : 'Or describe'} hint={t(UI.optional, lang)} htmlFor="sc-rough">
            <input
              id="sc-rough"
              className={inputClass}
              maxLength={LIMITS.shortText}
              placeholder={ko ? '예) 10월 말 ~ 11월 중' : 'e.g. late Oct to Nov'}
              value={cur.roughCustom}
              onChange={(e) => upd({ roughCustom: e.target.value })}
            />
          </FieldBlock>
        </div>
      )}

      {cur && (edu === 'class' || edu === 'lecture' || edu === 'unknown') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChipGroup label={ko ? '교시 수' : 'Periods'} options={PERIOD_COUNTS} value={cur.periods} onChange={(v) => upd({ periods: v as string })} lang={lang} />
          <ChipGroup label={ko ? '1교시 길이' : 'Period length'} options={PERIOD_MINUTES} value={cur.periodMinutes} onChange={(v) => upd({ periodMinutes: v as string })} lang={lang} />
        </div>
      )}
      {cur && edu === 'club' && (
        <div className="space-y-4">
          <ChipGroup label={ko ? '회기 수' : 'Sessions'} options={SESSION_COUNTS} value={cur.sessions} onChange={(v) => upd({ sessions: v as string })} lang={lang} />
          <ChipGroup label={ko ? '회기당 교시 수' : 'Periods per session'} options={PERIOD_COUNTS} value={cur.sessionPeriods} onChange={(v) => upd({ sessionPeriods: v as string })} lang={lang} />
          <ChipGroup label={ko ? '요일' : 'Days'} options={WEEKDAYS} value={cur.weekdays} onChange={(v) => upd({ weekdays: v as string[] })} lang={lang} />
        </div>
      )}
      {cur && edu === 'booth' && (
        <ChipGroup label={ko ? '행사 일수' : 'Event days'} options={EVENT_DAYS} value={cur.eventDays} onChange={(v) => upd({ eventDays: v as string })} lang={lang} />
      )}

      {soon && (
        <Notice tone="warn">
          {ko
            ? '한 달이 안 남은 일정이에요. 접수하시면 가능 여부부터 바로 확인해 드릴게요.'
            : "That's less than a month away. We'll check availability first once you submit."}
        </Notice>
      )}
    </div>
  );
}

export function scheduleReady(s: ScheduleAnswer | null | undefined): boolean {
  if (s === null) return true;
  if (!s) return false;
  if (s.when === 'fixed') return s.dates.some(Boolean);
  if (s.when === 'rough') return !!(s.rough || s.roughCustom.trim());
  return true;
}

// ─── S13 ────────────────────────────────────────────────────────

export function BudgetStep({ lang, answers, set }: StepProps) {
  const cur = answers.budget ?? null;
  const ko = lang === 'ko';
  const pick = (mode: BudgetAnswer['mode']) => set('budget', { mode, amount: cur?.mode === mode ? cur.amount : null, vat: cur?.vat ?? '', source: cur?.source ?? '' });
  const upd = (patch: Partial<BudgetAnswer>) => cur && set('budget', { ...cur, ...patch });
  const modes: { key: BudgetAnswer['mode']; label: string }[] = [
    { key: 'total', label: ko ? '총액이 있어요' : 'We have a total budget' },
    { key: 'perHead', label: ko ? '1인당 기준이 있어요' : 'We have a per-person budget' },
    { key: 'quote', label: ko ? '견적을 먼저 받고 싶어요' : "We'd like a quote first" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((m) => (
          <Tile key={m.key} selected={cur?.mode === m.key} onClick={() => pick(m.key)} title={m.label} />
        ))}
      </div>
      {cur?.mode === 'total' && (
        <div className="space-y-4">
          <FieldBlock label={ko ? '총액 (만 원)' : 'Total (in 10,000 KRW)'} htmlFor="bg-total">
            <input id="bg-total" className={inputClass} inputMode="numeric" placeholder={ko ? '예) 300' : 'e.g. 300'} value={cur.amount ?? ''} onChange={(e) => upd({ amount: toInt(e.target.value) })} />
          </FieldBlock>
          <ChipGroup options={VAT_OPTIONS} value={cur.vat} onChange={(v) => upd({ vat: v as string })} lang={lang} />
        </div>
      )}
      {cur?.mode === 'perHead' && (
        <FieldBlock label={ko ? '1인당 (원)' : 'Per person (KRW)'} htmlFor="bg-head">
          <input id="bg-head" className={inputClass} inputMode="numeric" placeholder={ko ? '예) 30000' : 'e.g. 30000'} value={cur.amount ?? ''} onChange={(e) => upd({ amount: toInt(e.target.value) })} />
        </FieldBlock>
      )}
      {cur && (
        <ChipGroup label={ko ? '예산 출처 (선택)' : 'Budget source (optional)'} options={BUDGET_SOURCES} value={cur.source} onChange={(v) => upd({ source: v as string })} lang={lang} />
      )}
    </div>
  );
}

// ─── S14 ────────────────────────────────────────────────────────

export function RequestStep({ lang, answers, set }: StepProps) {
  const cur: RequestAnswer = answers.request ?? { docs: [], purchase: '', text: '' };
  const ko = lang === 'ko';
  return (
    <div className="space-y-6">
      <ChipGroup label={ko ? '필요한 자료' : 'Documents you need'} options={DOCS} value={cur.docs} onChange={(v) => set('request', { ...cur, docs: v as string[] })} lang={lang} />
      <ChipGroup
        label={ko ? '구매 방법 (선택)' : 'How you will pay (optional)'}
        options={PURCHASE}
        value={cur.purchase}
        onChange={(v) => set('request', { ...cur, purchase: v as string })}
        lang={lang}
      />
      <FieldBlock label={ko ? '더 하실 말씀' : 'Anything else'} hint={`${cur.text.length}/${LIMITS.freeText}`} htmlFor="rq-text">
        <textarea
          id="rq-text"
          rows={4}
          className={inputClass}
          maxLength={LIMITS.freeText}
          placeholder={ko ? '예) 결과물을 학생들이 가져갈 수 있으면 좋겠어요. 작년에 한 블루투스 스피커를 다시 하고 싶어요.' : 'e.g. Students would like to take their work home.'}
          value={cur.text}
          onChange={(e) => set('request', { ...cur, text: e.target.value })}
        />
        <p className="mt-2 text-sm text-gray-500 break-keep">{t(UI.noPrivateInfo, lang)}</p>
      </FieldBlock>
    </div>
  );
}

/** 비어 있는 선택 입력 화면인지 (부스 조건 · 요청 사항) */
export function isEmptyOptional(step: 'booth' | 'request', a: Answers): boolean {
  if (step === 'booth') {
    const b = a.booth;
    return !b || (b.count == null && !b.start && !b.end && !b.lunch && !b.area && !b.size.trim() && !b.support.length && !b.needs.length);
  }
  const r = a.request;
  return !r || (!r.docs.length && !r.purchase && !r.text.trim());
}
