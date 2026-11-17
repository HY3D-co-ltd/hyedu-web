'use client';

/**
 * 위저드 공통 UI 조각. 기존 사이트 디자인(카드: rounded-2xl + gray-200 테두리 + shadow-sm,
 * 강조색: point 청록)을 따른다. 사양 §6.2.
 */
import { useState, type ReactNode } from 'react';
import type { EduIcon, Opt } from '@/data/contact-wizard';
import type { Lang, Loc } from '@/lib/contact-wizard/types';

export function t(loc: Loc, lang: Lang): string {
  return loc[lang];
}

export function optLabel(opt: Opt, lang: Lang): string {
  return lang === 'ko' ? opt.value : opt.en;
}

const tileBase =
  'w-full text-left rounded-2xl border bg-white p-4 md:p-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-point';

export function Tile({
  selected,
  onClick,
  title,
  desc,
  icon,
  dashed,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  icon?: EduIcon;
  dashed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${tileBase} ${
        selected
          ? 'border-point bg-point/5 ring-1 ring-point'
          : dashed
            ? 'border-dashed border-gray-300 hover:border-point/60'
            : 'border-gray-200 shadow-sm hover:border-point/60'
      }`}
    >
      <span className="flex items-start gap-3">
        {icon && (
          <span className={`mt-0.5 shrink-0 ${selected ? 'text-point' : 'text-gray-500'}`}>
            <WizardIcon name={icon} />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-base md:text-[17px] font-semibold text-gray-900 break-keep">{title}</span>
          {desc && <span className="mt-1 block text-sm text-gray-500 break-keep">{desc}</span>}
        </span>
        {selected && (
          <span className="shrink-0 text-point" aria-hidden="true">
            <CheckIcon />
          </span>
        )}
      </span>
    </button>
  );
}

export function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[15px] transition-colors break-keep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-point ${
        selected ? 'border-point bg-point text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-point/60'
      }`}
    >
      {children}
    </button>
  );
}

/** 보기 칩 묶음. multi면 여러 개, 아니면 하나(다시 누르면 해제). */
export function ChipGroup({
  options,
  value,
  onChange,
  lang,
  label,
}: {
  options: Opt[];
  value: string | string[];
  onChange: (next: string | string[]) => void;
  lang: Lang;
  label?: string;
}) {
  const multi = Array.isArray(value);
  const isOn = (v: string) => (multi ? (value as string[]).includes(v) : value === v);
  const toggle = (v: string) => {
    if (multi) {
      const cur = value as string[];
      onChange(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
    } else {
      onChange(value === v ? '' : v);
    }
  };
  return (
    <div>
      {label && <p className="mb-2 text-sm font-semibold text-gray-700">{label}</p>}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => (
          <Chip key={o.value} selected={isOn(o.value)} onClick={() => toggle(o.value)}>
            {optLabel(o, lang)}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function FieldBlock({ label, hint, children, htmlFor }: { label: string; hint?: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {hint && <span className="ml-2 font-normal text-gray-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-point focus:outline-none focus:ring-1 focus:ring-point';

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn'; children: ReactNode }) {
  return (
    <p
      role={tone === 'warn' ? 'status' : undefined}
      className={`rounded-xl px-4 py-3 text-sm break-keep ${tone === 'warn' ? 'bg-secondary/10 text-amber-800' : 'bg-gray-50 text-gray-600'}`}
    >
      {children}
    </p>
  );
}

export function CopyButton({ text, label, doneLabel, className }: { text: () => string; label: string; doneLabel: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    const value = text();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // 클립보드 API를 못 쓰는 환경(오래된 브라우저 · http)에서는 선택 후 복사로 대신한다.
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-point hover:text-point'
      }
    >
      <CopyIcon />
      {done ? doneLabel : label}
    </button>
  );
}

// ─── 아이콘 (인라인 SVG, 새 패키지 없음) ───────────────────────────

const svg = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function WizardIcon({ name }: { name: EduIcon }) {
  switch (name) {
    case 'class':
      return (
        <svg {...svg}>
          <path d="M3 10l9-5 9 5-9 5-9-5z" />
          <path d="M7 12.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-3.5" />
        </svg>
      );
    case 'club':
      return (
        <svg {...svg}>
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3.5 18c.6-2.5 2.4-4 4.5-4s3.9 1.5 4.5 4" />
          <path d="M11.5 18c.6-2.5 2.4-4 4.5-4s3.9 1.5 4.5 4" />
        </svg>
      );
    case 'lecture':
      return (
        <svg {...svg}>
          <rect x="9" y="3" width="6" height="10" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0013 0" />
          <path d="M12 17.5V21" />
        </svg>
      );
    case 'booth':
      return (
        <svg {...svg}>
          <path d="M4 9l2-5h12l2 5" />
          <path d="M4 9h16v1.5a2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0V9" />
          <path d="M5.5 13v7h13v-7" />
        </svg>
      );
    case 'camp':
      return (
        <svg {...svg}>
          <path d="M12 4L3 20h18L12 4z" />
          <path d="M12 12l-3 8M12 12l3 8" />
        </svg>
      );
    case 'online':
      return (
        <svg {...svg}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
          <path d="M10.5 8.5l3.5 1.5-3.5 1.5v-3z" />
        </svg>
      );
    case 'family':
      return (
        <svg {...svg}>
          <circle cx="9" cy="7" r="2.5" />
          <circle cx="16.5" cy="10" r="2" />
          <path d="M4.5 19c.5-3 2.3-5 4.5-5s4 2 4.5 5" />
          <path d="M13.5 19c.3-2 1.5-3.5 3-3.5s2.7 1.5 3 3.5" />
        </svg>
      );
    default:
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.2" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}

export function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}
