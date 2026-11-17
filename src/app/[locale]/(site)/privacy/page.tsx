import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';
import {
  BUSINESS_INFO,
  PRIVACY_POLICY_DRAFT,
  policyInEffect,
  policyVersionId,
  previousPolicies,
  seoulDate,
  upcomingPolicies,
  type Bi,
  type PolicyBlock,
  type PrivacyPolicyVersion,
} from '@/data/privacy-policy';

/**
 * 개인정보 처리방침. 문안은 src/data/privacy-policy.ts.
 * 빌드한 날(서울 기준) 시행 중인 판을 본문으로 보인다. 시행 예정인 판은 위 「개정 안내」에,
 * 이전 판은 아래 「이전 처리방침」에 접어 둔다. deploy.yml이 매일 다시 빌드해 시행일에 바뀐다.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  return {
    alternates: buildAlternates(locale, 'privacy'),
    openGraph: buildOpenGraph(locale, 'privacy'),
    title: isKo ? '개인정보 처리방침 | 한양미래연구소' : 'Privacy Policy | Hanyang Future Lab',
    description: isKo
      ? '한양미래연구소 홈페이지 교육 신청으로 받는 개인정보의 처리 목적, 항목, 보유 기간, 위탁과 국외 이전, 정보주체의 권리를 안내합니다.'
      : 'How Hanyang Future Lab processes personal information received through the website application form: purposes, items, retention, outsourcing, transfer abroad and your rights.',
    ...(PRIVACY_POLICY_DRAFT ? { robots: { index: false, follow: false } } : {}),
  };
}

function formatDate(iso: string, isKo: boolean): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (isKo) return `${y}년 ${m}월 ${d}일`;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** 판을 부르는 날짜. 같은 날 고친 판이면 몇 번째 판인지 붙인다. */
function versionDate(v: PrivacyPolicyVersion, isKo: boolean): string {
  const date = formatDate(v.effectiveDate, isKo);
  const n = v.sameDayRevision;
  if (!n) return date;
  return isKo ? `${date} (같은 날 ${n}번째 판)` : `${date} (version ${n} of that day)`;
}

// 문단은 한국어 단어를 끊지 않되(break-keep), URL · 이메일처럼 공백 없는 긴 덩어리는 넘칠 때 끊는다(break-words).
// keep-all만 걸면 긴 URL이 360px 화면 밖으로 나간다.
function Block({ block, isKo }: { block: PolicyBlock; isKo: boolean }) {
  const tx = (b: Bi) => (isKo ? b.ko : b.en);
  if (block.kind === 'p') return <p className="text-[15px] leading-7 text-gray-700 break-keep break-words">{tx(block.text)}</p>;
  if (block.kind === 'list') {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-gray-700 break-keep break-words">
        {block.items.map((item, i) => (
          <li key={i}>
            {item.strong ? <strong className="font-semibold text-gray-900">{tx(item)}</strong> : tx(item)}
            {item.sub && (
              <ul className="mt-1 list-[circle] space-y-1 pl-5">
                {item.sub.map((s, j) => (
                  <li key={j}>{tx(s)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    // 모바일에서는 표를 줄이지 않고 가로로 스크롤한다(CLAUDE.md 표 규칙).
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-xl border border-gray-200">
      <table className="w-full border-collapse text-left text-sm text-gray-700" style={{ minWidth: block.minWidth }}>
        <thead className="bg-gray-50 text-gray-900">
          <tr>
            {block.head.map((h, i) => (
              <th key={i} scope="col" className="border-b border-gray-200 px-3 py-2.5 font-semibold whitespace-nowrap">
                {tx(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2.5 leading-6 break-keep break-words ${j === 0 ? 'font-medium text-gray-900' : ''}`}>
                  {tx(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * `idPrefix`: 현행본이 아닌 판에 붙인다. 한 페이지에 여러 판이 있어도 조항 id(#cookies 등)가
 * 겹치지 않아 목차 · 외부 링크가 늘 현행본으로 간다.
 */
function PolicyBody({ policy, isKo, idPrefix = '' }: { policy: PrivacyPolicyVersion; isKo: boolean; idPrefix?: string }) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        {policy.intro.map((b, i) => (
          <p key={i} className="text-[15px] leading-7 text-gray-700 break-keep break-words">
            {isKo ? b.ko : b.en}
          </p>
        ))}
      </div>
      {policy.sections.map((s) => (
        <section key={s.id} id={`${idPrefix}${s.id}`} className="scroll-mt-24 space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{isKo ? s.title.ko : s.title.en}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} isKo={isKo} />
          ))}
        </section>
      ))}
    </div>
  );
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === 'ko';
  const today = seoulDate();
  const current = policyInEffect(today);
  const upcoming = upcomingPolicies(today);
  const previous = previousPolicies(today);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isKo ? '홈' : 'Home', href: `/${locale}` },
          { name: isKo ? '개인정보 처리방침' : 'Privacy Policy', href: `/${locale}/privacy` },
        ]}
      />
      <article className="bg-white px-4 pt-10 pb-20 md:pt-14">
        <div className="mx-auto max-w-4xl">
          {PRIVACY_POLICY_DRAFT && (
            <p className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 break-keep break-words">
              {isKo ? '초안입니다. 아직 시행되지 않았습니다.' : 'Draft. Not yet in effect.'}
            </p>
          )}
          <header className="mb-10 border-b border-gray-200 pb-6">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">Privacy Policy</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{isKo ? '개인정보 처리방침' : 'Privacy Policy'}</h1>
            <p className="mt-3 text-sm text-gray-500">
              {isKo ? `시행일: ${versionDate(current, true)}` : `Effective: ${versionDate(current, false)}`}
            </p>
            {!isKo && (
              <p className="mt-2 text-sm text-gray-500">
                This is an English translation of the Korean privacy policy. If they differ, the Korean version prevails.
              </p>
            )}
          </header>

          {upcoming.map((v) => {
            const date = versionDate(v, isKo);
            const id = policyVersionId(v);
            return (
              <section
                key={id}
                aria-labelledby={`notice-${id}`}
                className="mb-10 rounded-2xl border border-point/30 bg-point/5 p-5 md:p-6"
              >
                <h2 id={`notice-${id}`} className="text-base md:text-lg font-bold text-gray-900 break-keep break-words">
                  {isKo ? '개인정보 처리방침 개정 안내' : 'Upcoming changes to this policy'}
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-gray-700 break-keep break-words">
                  {isKo
                    ? `${date}부터 개인정보 처리방침이 아래와 같이 바뀝니다. 그 전까지는 이 페이지의 현행 처리방침(${versionDate(current, true)} 시행)이 적용됩니다.`
                    : `This policy will change as follows from ${date}. Until then, the current policy on this page (effective ${versionDate(current, false)}) applies.`}
                </p>
                {v.changes && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-gray-700 break-keep break-words">
                    {v.changes.map((c, i) => (
                      <li key={i}>{isKo ? c.ko : c.en}</li>
                    ))}
                  </ul>
                )}
                <details className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-800 break-keep break-words">
                    {isKo ? `${date} 시행 처리방침 전문 보기` : `Read the full policy effective ${date}`}
                  </summary>
                  <div className="mt-6">
                    <PolicyBody policy={v} isKo={isKo} idPrefix={`v${policyVersionId(v)}-`} />
                  </div>
                </details>
              </section>
            );
          })}

          {/* 목차 */}
          <nav aria-label={isKo ? '목차' : 'Contents'} className="mb-10 rounded-2xl bg-gray-50 p-5">
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {current.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-gray-700 hover:text-point hover:underline break-keep break-words">
                    {isKo ? s.title.ko : s.title.en}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <PolicyBody policy={current} isKo={isKo} />

          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="text-base font-bold text-gray-900">{isKo ? '사업자 정보' : 'Business information'}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 break-keep break-words">{isKo ? BUSINESS_INFO.ko : BUSINESS_INFO.en}</p>
          </section>

          {previous.length > 0 && (
            <section className="mt-12 border-t border-gray-200 pt-6">
              <h2 className="text-base font-bold text-gray-900">{isKo ? '이전 처리방침' : 'Previous versions'}</h2>
              <div className="mt-4 space-y-3">
                {previous.map((v) => (
                  <details key={policyVersionId(v)} className="rounded-xl border border-gray-200 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                      {isKo ? `${versionDate(v, true)} 시행본` : `Effective ${versionDate(v, false)}`}
                    </summary>
                    <div className="mt-6">
                      <PolicyBody policy={v} isKo={isKo} idPrefix={`v${policyVersionId(v)}-`} />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
