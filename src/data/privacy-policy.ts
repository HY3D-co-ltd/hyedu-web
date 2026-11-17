/**
 * 개인정보 처리방침 문안. 페이지는 src/app/[locale]/(site)/privacy/page.tsx.
 *
 * - 범위는 홈페이지 「교육 신청」(/contact 위저드)으로 받는 개인정보와, 10장의 이용 통계 쿠키다.
 * - 시행일마다 한 판씩 `privacyPolicies`에 더한다. 시행된 판은 고치지 않는다 — 바꿀 것이 있으면 `revise`로 새 판을 만든다.
 *   이미 시행한 날에 다시 고친 판은 같은 시행일에 `sameDayRevision`(2부터)을 붙인다.
 * - 어느 판을 보일지는 서울 날짜로 고른다(`policyInEffect`). 시행일이 아직 안 온 판은 페이지 위 「개정 안내」로,
 *   시행 중인 판보다 오래된 판은 아래 「이전 처리방침」으로 보인다. 개정판은 시행 7일 전부터 알린다(14장).
 * - 위저드가 보내는 `consent.version`은 제출하는 날 시행 중인 판의 `policyVersionId`다(src/data/contact-wizard.ts).
 * - GA4는 시행 중인 판의 `analyticsCookies`가 true일 때만 켜진다(src/components/analytics/GoogleAnalytics.tsx).
 * - 한국어가 원문이고 영어는 번역이다.
 */

export interface Bi {
  ko: string;
  en: string;
}

export interface PolicyItem extends Bi {
  strong?: boolean;
  sub?: Bi[];
}

export type PolicyBlock =
  | { kind: 'p'; text: Bi }
  | { kind: 'list'; items: PolicyItem[] }
  | { kind: 'table'; head: Bi[]; rows: Bi[][]; minWidth: number };

export interface PolicySection {
  id: string;
  title: Bi;
  blocks: PolicyBlock[];
}

export interface PrivacyPolicyVersion {
  /** 시행일 (YYYY-MM-DD). */
  effectiveDate: string;
  /**
   * 같은 시행일에 앞서 시행한 판을 고친 판이면 그날의 몇 번째 판인지(2, 3, …). 그날 첫 판에는 없다.
   * 판의 식별자는 `policyVersionId`다.
   */
  sameDayRevision?: number;
  /** 이 판이 이용 분석 쿠키(Google Analytics)를 안내하는가. 시행 중인 판이 true여야 GA4 태그가 들어간다. */
  analyticsCookies: boolean;
  /** 이전 판과 달라진 점. 시행 전 「개정 안내」에 보인다. 첫 판에는 없다. */
  changes?: Bi[];
  intro: Bi[];
  sections: PolicySection[];
}

/**
 * 켜면 「초안」 띠와 noindex를 달고 Footer · 사이트맵에서 뺀다(위저드 사양 §8).
 * 2026-11-17 공개 결정으로 끈다. 법무 검토 결과가 나오면 문안을 고쳐 새 판으로 더한다.
 */
export const PRIVACY_POLICY_DRAFT = false;

const PHONE = '070-8064-0829';
const EMAIL = 'hyedu0829@gmail.com';

const p = (ko: string, en: string): PolicyBlock => ({ kind: 'p', text: { ko, en } });

/** 10장: 위저드 초안을 브라우저에 임시 저장한다는 안내. 2026-11-17 판부터 같은 문안. */
const WIZARD_DRAFT_STORAGE: PolicyItem = {
  ko: '교육 신청을 작성하는 동안 보기에서 고르신 답을 이용자 브라우저(localStorage)에 임시 저장해 이어서 작성하실 수 있게 합니다.',
  en: 'While you fill in the "Apply" form, the options you pick are saved temporarily in your browser (localStorage) so you can continue later.',
  sub: [
    { ko: '기관명, 성명, 연락처와 자유 입력 내용은 저장하지 않습니다.', en: 'Organization name, your name, contact details and free-text comments are not saved.' },
    { ko: '작성하는 동안에는 회사로 보내지 않으며, 「제출」을 누르실 때 보냅니다.', en: 'Nothing is sent to the Company until you press "Submit".' },
    { ko: '접수가 끝나면 바로 지우고, 7일이 지난 초안은 다음 접속 때 지웁니다.', en: 'The draft is deleted right after submission, and drafts older than 7 days are deleted on your next visit.' },
    { ko: '브라우저의 사이트 데이터 삭제로 언제든 지울 수 있습니다.', en: 'You can delete it at any time by clearing the site data in your browser.' },
  ],
};

/** 2026-11-17 시행본. 시행된 판은 고치지 않는다 — 바꿀 것이 있으면 아래처럼 새 판을 만든다. */
const POLICY_2026_11_17: PrivacyPolicyVersion = {
  effectiveDate: '2026-11-17',
  analyticsCookies: false,
  intro: [
    {
      ko: '(주)하이스타터(이하 「회사」)는 한양미래연구소 홈페이지(https://hyedu.kr)를 운영하면서 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 고충을 신속하고 원활하게 처리하기 위해 다음과 같이 개인정보 처리방침을 수립 · 공개합니다.',
      en: 'Histarter co.,ltd (the "Company") operates the Hanyang Future Lab website (https://hyedu.kr). In accordance with Article 30 of the Personal Information Protection Act of Korea, the Company establishes and discloses this privacy policy to protect personal information and to handle related complaints promptly and smoothly.',
    },
    {
      ko: '이 처리방침은 홈페이지 「교육 신청」으로 받는 개인정보에 적용됩니다.',
      en: 'This policy applies to personal information received through the "Apply" form on the website.',
    },
  ],
  sections: [
    {
      id: 'purpose',
      title: { ko: '1. 개인정보의 처리 목적', en: '1. Purposes of processing' },
      blocks: [
        p(
          '회사는 다음 목적을 위해 개인정보를 처리합니다. 목적이 바뀌면 「개인정보 보호법」 제18조에 따라 별도 동의를 받는 등 필요한 조치를 하겠습니다.',
          'The Company processes personal information for the following purposes. If a purpose changes, the Company will take the necessary measures, such as obtaining separate consent under Article 18 of the Act.',
        ),
        {
          kind: 'list',
          items: [
            { ko: '교육 문의 상담과 회신', en: 'Consulting on and replying to program inquiries' },
            { ko: '견적서 · 교육계획안 등 요청하신 자료 발송', en: 'Sending requested materials such as quotes and lesson plans' },
            { ko: '교육 일정 · 장소 · 인원 조율과 계약 체결 준비', en: 'Arranging schedule, venue and headcount, and preparing a contract' },
            { ko: '같은 기관이 다시 문의하실 때 이전 상담 내용 확인', en: 'Checking past consultations when the same organization contacts us again' },
          ],
        },
        p(
          '회사는 문의하신 개인정보를 광고 · 마케팅 목적으로 쓰지 않습니다.',
          'The Company does not use the personal information for advertising or marketing.',
        ),
      ],
    },
    {
      id: 'items',
      title: { ko: '2. 처리하는 개인정보 항목', en: '2. Personal information processed' },
      blocks: [
        p('홈페이지 「교육 신청」에서 다음 항목을 받습니다.', 'The "Apply" form collects the following items.'),
        {
          kind: 'table',
          minWidth: 560,
          head: [
            { ko: '구분', en: 'Type' },
            { ko: '항목', en: 'Items' },
          ],
          rows: [
            [
              { ko: '필수', en: 'Required' },
              { ko: '기관명, 담당자 성명, 휴대폰 번호', en: 'Organization name, contact person name, mobile number' },
            ],
            [
              { ko: '선택', en: 'Optional' },
              {
                ko: '이메일 주소(회신 방법을 이메일로 고르시면 필수), 기관 전화번호, 회신 방법, 통화 가능 시간',
                en: 'Email address (required if you choose to be contacted by email), office phone, reply method, best time to call',
              },
            ],
            [
              { ko: '문의 내용', en: 'Inquiry' },
              {
                ko: '교육 형태, 기관 구분, 대상 학년 · 인원, 진행에 상의할 점, 관심 프로그램, 희망 일정, 교육 장소(시 · 군 · 구까지), 공간 · 기기 현황, 예산, 필요 자료, 자유 입력 내용',
                en: 'Program type, organization type, target grade and headcount, support needs, programs of interest, preferred schedule, venue (down to city/district), room and devices, budget, materials needed, free-text comments',
              },
            ],
            [
              { ko: '자동 생성', en: 'Generated automatically' },
              {
                ko: '접수 일시, 접수번호, 제출 식별 번호(무작위로 만든 번호), 문의를 시작한 페이지, 개인정보 수집 · 이용 동의 여부와 동의한 처리방침 버전',
                en: 'Date and time received, receipt number, submission ID (a random number), the page where the inquiry started, whether you consented and the policy version you consented to',
              },
            ],
          ],
        },
        {
          kind: 'list',
          items: [
            {
              ko: '「진행에 상의할 점」은 보조 인력 · 통역 같은 필요한 지원만 묻습니다. 학생 개인을 알아볼 수 있는 정보는 받지 않습니다.',
              en: '"Support needs" only asks about support such as assistants or interpreters. We do not collect information that identifies individual students.',
            },
            {
              ko: '자유 입력란에도 학생 이름이나 건강 정보 같은 개인정보를 적지 말아 주세요. 이런 정보가 들어온 것을 알게 되면 지체 없이 지웁니다.',
              en: 'Please do not write personal information such as student names or health information in the free-text field. If we find such information, we delete it without delay.',
            },
            {
              ko: '문의를 보내는 과정에서 접속 IP 주소 등 접속 기록이 접수 중계 시스템에 일시적으로 남을 수 있습니다.',
              en: 'Access records such as your IP address may be kept temporarily by the relay system while the inquiry is sent.',
            },
          ],
        },
      ],
    },
    {
      id: 'retention',
      title: { ko: '3. 개인정보의 처리 및 보유 기간', en: '3. Retention period' },
      blocks: [
        {
          kind: 'table',
          minWidth: 560,
          head: [
            { ko: '기록', en: 'Record' },
            { ko: '보유 기간', en: 'Retention' },
          ],
          rows: [
            [
              { ko: '문의 · 상담 기록 (계약으로 이어지지 않은 경우)', en: 'Inquiry and consultation records (no contract)' },
              { ko: '문의 접수일로부터 3년', en: '3 years from the date the inquiry was received' },
            ],
            [
              { ko: '문의 · 상담 기록 (계약으로 이어진 경우)', en: 'Inquiry and consultation records (led to a contract)' },
              { ko: '계약 종료 후 5년', en: '5 years after the contract ends' },
            ],
            [
              { ko: '접수 중계에 실패한 건의 오류 기록', en: 'Error records of inquiries the relay failed to save' },
              {
                ko: '담당자가 상담 기록으로 옮긴 뒤 바로 지우며, 늦어도 7일 안에 자동 삭제',
                en: 'Deleted as soon as staff move the inquiry into the consultation records, and automatically within 7 days at the latest',
              },
            ],
          ],
        },
        {
          kind: 'list',
          items: [
            {
              ko: '위 기간은 회사가 처리 목적(재문의 대응, 계약 이행과 사후 관리)에 맞춰 정한 기간입니다.',
              en: 'These periods are set by the Company to fit the purposes of processing (handling repeat inquiries, performing and following up on contracts).',
            },
            {
              ko: '같은 문의의 사본(담당자 알림 메일 등)도 같은 기간이 지나면 함께 파기합니다.',
              en: 'Copies of the same inquiry (such as notification emails to staff) are destroyed after the same period.',
            },
            {
              ko: '법령이 보존을 요구하는 거래 증빙(예: 「국세기본법」에 따른 장부 · 증빙서류)은 해당 법령이 정한 대상과 기간에 따라 다른 정보와 분리해 보관합니다.',
              en: 'Transaction records that laws require us to keep (e.g. books and vouchers under the Framework Act on National Taxes) are stored separately for the period those laws set.',
            },
            {
              ko: '정보주체가 삭제를 요청하시면 법령상 보존 의무가 있는 경우를 빼고 지체 없이 삭제합니다.',
              en: 'If you request deletion, we delete the information without delay unless a law requires us to keep it.',
            },
          ],
        },
      ],
    },
    {
      id: 'destruction',
      title: { ko: '4. 개인정보의 파기 절차 및 방법', en: '4. Destruction' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '보유 기간이 지나거나 처리 목적을 이룬 개인정보는 지체 없이 파기합니다.',
              en: 'Personal information whose retention period has passed or whose purpose has been achieved is destroyed without delay.',
            },
            {
              ko: '법령에 따라 보존해야 하는 정보는 다른 정보와 분리해 보관합니다.',
              en: 'Information that must be kept under law is stored separately from other information.',
            },
            {
              ko: '전자 파일은 복구할 수 없는 방법으로 지우고, 종이 문서는 분쇄하거나 소각합니다. 외부 서비스의 백업에 남은 사본은 그 서비스의 백업 보관 주기에 따라 지워집니다.',
              en: 'Electronic files are deleted so that they cannot be recovered, and paper documents are shredded or incinerated. Copies remaining in an external service’s backups are erased according to that service’s backup cycle.',
            },
            {
              ko: '파기는 개인정보 보호책임자가 매년 1회 정기 점검 때 보유 기간이 지난 기록을 확인해 진행합니다. 삭제 요청은 이 주기와 관계없이 처리합니다(8장).',
              en: 'The privacy officer checks for records past their retention period at an annual review and destroys them. Deletion requests are handled regardless of this cycle (Section 8).',
            },
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: { ko: '5. 개인정보의 제3자 제공', en: '5. Provision to third parties' },
      blocks: [
        p(
          '회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 정보주체가 동의하신 경우나 법률에 특별한 규정이 있는 경우는 예외입니다.',
          'The Company does not provide personal information to third parties, except where you have consented or a law specifically provides otherwise.',
        ),
      ],
    },
    {
      id: 'outsourcing',
      title: { ko: '6. 개인정보 처리 업무의 위탁', en: '6. Outsourcing of processing' },
      blocks: [
        p(
          '회사는 원활한 문의 처리를 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.',
          'To handle inquiries smoothly, the Company outsources processing as follows.',
        ),
        {
          kind: 'table',
          minWidth: 560,
          head: [
            { ko: '수탁자', en: 'Processor' },
            { ko: '위탁 업무', en: 'Outsourced task' },
          ],
          rows: [
            [
              { ko: 'n8n GmbH', en: 'n8n GmbH' },
              { ko: '홈페이지 문의 접수 중계 (입력 확인 후 저장 시스템으로 전달)', en: 'Relaying website inquiries (checking the input and passing it to the storage system)' },
            ],
            [
              { ko: 'Formagrid Inc. (Airtable)', en: 'Formagrid Inc. (Airtable)' },
              { ko: '문의 · 상담 기록의 저장과 관리', en: 'Storing and managing inquiry and consultation records' },
            ],
            [
              { ko: 'Google LLC', en: 'Google LLC' },
              { ko: '담당자 알림 메일 수신과 보관 (Gmail)', en: 'Receiving and storing notification emails to staff (Gmail)' },
            ],
          ],
        },
        p(
          '위탁 계약(서비스 약관 · 데이터 처리 부속서)에 위탁 업무 외 처리 금지, 기술적 · 관리적 보호 조치, 재위탁 제한, 손해배상 등 책임에 관한 사항이 들어 있는지 확인하고, 수탁자가 개인정보를 안전하게 처리하는지 감독합니다. 수탁자나 위탁 업무가 바뀌면 이 처리방침으로 알리겠습니다.',
          'The Company checks that the outsourcing agreements (terms of service and data processing addenda) cover a ban on processing beyond the outsourced task, technical and administrative safeguards, limits on sub-processing, and liability such as damages, and supervises the processors to ensure they handle personal information safely. Any change of processor or task will be announced through this policy.',
        ),
      ],
    },
    {
      id: 'overseas',
      title: { ko: '7. 개인정보의 국외 이전', en: '7. Transfer abroad' },
      blocks: [
        p('위 수탁자들은 국외에서 개인정보를 처리 · 보관합니다.', 'The processors above process and store personal information outside Korea.'),
        {
          kind: 'table',
          minWidth: 880,
          head: [
            { ko: '이전받는 자 (연락처)', en: 'Recipient (contact)' },
            { ko: '이전 국가', en: 'Country' },
            { ko: '이전 항목', en: 'Items' },
            { ko: '이전 시기 · 방법', en: 'When and how' },
            { ko: '이용 목적', en: 'Purpose' },
            { ko: '보유 · 이용 기간', en: 'Retention' },
          ],
          rows: [
            [
              { ko: 'n8n GmbH (privacy@n8n.io)', en: 'n8n GmbH (privacy@n8n.io)' },
              { ko: '독일 (EU)', en: 'Germany (EU)' },
              { ko: '2번의 모든 항목', en: 'All items in Section 2' },
              { ko: '문의를 제출할 때 암호화된 네트워크로 전송', en: 'Sent over an encrypted network when you submit the inquiry' },
              { ko: '접수 중계', en: 'Relaying the inquiry' },
              { ko: '3번의 「접수 중계 오류 기록」 기간', en: 'The period for relay error records in Section 3' },
            ],
            [
              { ko: 'Formagrid Inc. (privacy@airtable.com)', en: 'Formagrid Inc. (privacy@airtable.com)' },
              { ko: '미국', en: 'USA' },
              { ko: '2번의 모든 항목', en: 'All items in Section 2' },
              { ko: '접수 중계 직후 암호화된 네트워크로 전송', en: 'Sent over an encrypted network right after relaying' },
              { ko: '문의 · 상담 기록 저장과 관리', en: 'Storing and managing inquiry and consultation records' },
              { ko: '3번의 문의 · 상담 기록 기간', en: 'The period for inquiry and consultation records in Section 3' },
            ],
            [
              { ko: 'Google LLC (googlekrsupport@google.com)', en: 'Google LLC (googlekrsupport@google.com)' },
              { ko: '미국 등 Google이 서버를 운영하는 국가', en: 'USA and other countries where Google operates servers' },
              {
                ko: '기관명, 담당자 성명 · 휴대폰 번호 · 이메일 주소, 교육 형태, 문의 내용',
                en: 'Organization name, contact person name, mobile number and email address, program type, inquiry',
              },
              { ko: '상담 기록이 만들어지면 알림 메일로 전송', en: 'Sent as a notification email when a consultation record is created' },
              { ko: '담당자 알림', en: 'Notifying staff' },
              { ko: '3번의 문의 · 상담 기록 기간', en: 'The period for inquiry and consultation records in Section 3' },
            ],
          ],
        },
        {
          kind: 'list',
          items: [
            {
              ko: '이전 근거:',
              en: 'Legal basis:',
              sub: [
                {
                  ko: 'Formagrid Inc.와 Google LLC: 「개인정보 보호법」 제28조의8 제1항 제3호. 계약을 맺고 이행하는 데 필요한 처리 위탁 · 보관이며, 그 사항을 이 처리방침에 공개합니다.',
                  en: 'Formagrid Inc. and Google LLC: Article 28-8(1)(3) of the Act. The outsourcing and storage are necessary to conclude and perform a contract, and the details are disclosed in this policy.',
                },
                {
                  ko: 'n8n GmbH: 같은 항 제5호. 개인정보보호위원회가 2025년 9월 EU의 개인정보 보호 수준이 이 법과 실질적으로 같다고 인정했습니다.',
                  en: 'n8n GmbH: Article 28-8(1)(5). In September 2025 the Personal Information Protection Commission recognized the EU’s level of protection as substantially equivalent to the Act.',
                },
              ],
            },
            {
              ko: '국외 이전을 원하지 않으시면 홈페이지 문의를 보내지 마시고 개인정보 보호책임자에게 알려 주세요. 다만 회사의 상담 기록 시스템이 국외에 있어 상담을 진행하기 어려울 수 있습니다.',
              en: 'If you do not want your information transferred abroad, please do not submit the website form and let the privacy officer know. Because the Company’s consultation records system is located abroad, it may be difficult to proceed with the consultation.',
            },
          ],
        },
      ],
    },
    {
      id: 'rights',
      title: { ko: '8. 정보주체와 법정대리인의 권리 · 의무 및 행사 방법', en: '8. Your rights and how to exercise them' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '정보주체는 회사에 언제든지 개인정보 열람, 정정 · 삭제, 처리 정지, 동의 철회를 요구할 수 있습니다.',
              en: 'You may at any time ask the Company to let you access, correct or delete your personal information, suspend its processing, or withdraw consent.',
            },
            {
              ko: '서면, 전화, 이메일로 요구하실 수 있으며 회사는 10일 안에 조치하고 결과를 알려 드립니다.',
              en: 'You can make a request in writing, by phone or by email. The Company will act within 10 days and tell you the result.',
            },
            {
              ko: '법정대리인이나 위임을 받은 사람 등 대리인을 통해서도 요구하실 수 있습니다. 이때는 위임장을 내셔야 합니다.',
              en: 'You may also make a request through a representative such as a legal guardian or an authorized person, who must submit a power of attorney.',
            },
            {
              ko: '다른 법령에서 수집 대상으로 정한 개인정보는 삭제를 요구하실 수 없습니다.',
              en: 'You cannot request deletion of personal information that other laws require to be collected.',
            },
            {
              ko: '요구하신 분이 본인이거나 정당한 대리인인지 확인합니다.',
              en: 'The Company verifies that the requester is you or your legitimate representative.',
            },
          ],
        },
      ],
    },
    {
      id: 'security',
      title: { ko: '9. 개인정보의 안전성 확보 조치', en: '9. Security measures' },
      blocks: [
        {
          kind: 'table',
          minWidth: 560,
          head: [
            { ko: '구분', en: 'Type' },
            { ko: '조치', en: 'Measures' },
          ],
          rows: [
            [
              { ko: '관리적', en: 'Administrative' },
              { ko: '개인정보 취급자를 업무에 필요한 사람으로 제한', en: 'Limiting staff who handle personal information to those who need it for their work' },
            ],
            [
              { ko: '기술적', en: 'Technical' },
              {
                ko: '전송 구간 암호화(HTTPS), 상담 기록 시스템의 계정 · 권한 관리, 접수 중계 전용 접근 키를 따로 발급해 쓰기 범위를 한 곳으로 제한, 입력 형식 검사, 자동 입력 방지 장치, 중계 실패 알림에 개인정보를 싣지 않음',
                en: 'Encryption in transit (HTTPS), account and permission management for the consultation records system, a separate access key for the relay that can write to one place only, input validation, anti-bot measures, and no personal information in relay failure alerts',
              },
            ],
            [
              { ko: '물리적', en: 'Physical' },
              { ko: '수탁자 데이터센터의 출입 통제 등 물리 보안 (수탁자 보안 정책에 따름)', en: 'Physical security such as access control at the processors’ data centers (under the processors’ security policies)' },
            ],
          ],
        },
      ],
    },
    {
      id: 'cookies',
      title: { ko: '10. 개인정보 자동 수집 장치의 설치 · 운영 및 거부', en: '10. Cookies and similar technologies' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '회사는 광고나 이용 분석을 위한 쿠키를 설치하지 않습니다. 다만 홈페이지에 넣은 YouTube 영상을 재생하면 Google(YouTube)이 자체 쿠키를 설치할 수 있으며, 이는 Google의 개인정보처리방침을 따릅니다. 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.',
              en: 'The Company does not set cookies for advertising or analytics. If you play a YouTube video embedded on the website, Google (YouTube) may set its own cookies under Google’s privacy policy. You can refuse cookies in your browser settings.',
            },
            WIZARD_DRAFT_STORAGE,
          ],
        },
      ],
    },
    {
      id: 'children',
      title: { ko: '11. 만 14세 미만 아동의 개인정보', en: '11. Children under 14' },
      blocks: [
        p(
          '홈페이지 교육 신청은 기관 담당자를 위한 것이며 만 14세 미만 아동의 개인정보를 받지 않습니다. 만 14세 미만 아동이 보낸 문의임을 알게 되면 지체 없이 파기합니다. 자녀 개인 참가(토요캠프 · 경진대회 대비반)는 보호자가 네이버 예약에서 신청하시며, 이때는 네이버의 개인정보 처리방침이 적용됩니다.',
          'The "Apply" form is for staff of organizations and does not collect personal information of children under 14. If we learn that an inquiry was sent by a child under 14, we destroy it without delay. For individual participation (Saturday Camp, Competition Prep), parents apply through Naver Booking, where Naver’s privacy policy applies.',
        ),
      ],
    },
    {
      id: 'officer',
      title: { ko: '12. 개인정보 보호책임자', en: '12. Privacy officer' },
      blocks: [
        {
          kind: 'table',
          minWidth: 560,
          head: [
            { ko: '구분', en: 'Role' },
            { ko: '내용', en: 'Details' },
          ],
          rows: [
            [
              { ko: '개인정보 보호책임자', en: 'Privacy officer' },
              { ko: `이정욱 (대표) · 전화 ${PHONE} · 이메일 ${EMAIL}`, en: `Lee Jeong Uk (CEO) · Phone +82-70-8064-0829 · Email ${EMAIL}` },
            ],
            [
              { ko: '개인정보 열람 청구 접수 · 처리', en: 'Access requests' },
              { ko: '개인정보 보호책임자가 직접 접수 · 처리합니다 (연락처는 위와 같습니다)', en: 'Received and handled directly by the privacy officer (same contact details as above)' },
            ],
          ],
        },
        p(
          '개인정보 처리와 관련한 문의, 불만, 피해 구제는 위 연락처로 알려 주세요. 지체 없이 답변하고 처리하겠습니다.',
          'Please send any questions, complaints or requests for remedy about personal information to the contact above. We will respond and act without delay.',
        ),
      ],
    },
    {
      id: 'remedies',
      title: { ko: '13. 권익침해 구제 방법', en: '13. Remedies' },
      blocks: [
        p(
          '개인정보 침해로 인한 구제를 받기 위해 다음 기관에 분쟁 해결이나 상담을 신청하실 수 있습니다.',
          'You may apply to the following bodies for dispute resolution or advice on infringement of personal information.',
        ),
        {
          kind: 'list',
          items: [
            { ko: '개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)', en: 'Personal Information Dispute Mediation Committee: 1833-6972 (www.kopico.go.kr)' },
            { ko: '개인정보침해신고센터: 118 (privacy.kisa.or.kr)', en: 'Personal Information Infringement Report Center: 118 (privacy.kisa.or.kr)' },
            { ko: '대검찰청: 1301 (www.spo.go.kr)', en: 'Supreme Prosecutors’ Office: 1301 (www.spo.go.kr)' },
            { ko: '경찰청: 182 (ecrm.police.go.kr)', en: 'Korean National Police Agency: 182 (ecrm.police.go.kr)' },
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: { ko: '14. 처리방침의 변경', en: '14. Changes to this policy' },
      blocks: [
        {
          kind: 'list',
          items: [
            { ko: '이 처리방침은 2026년 11월 17일부터 적용합니다.', en: 'This policy takes effect on November 17, 2026.' },
            {
              ko: '내용이 바뀌면 시행 7일 전부터 홈페이지로 알리며, 이전 처리방침은 이 페이지에서 볼 수 있습니다.',
              en: 'Any change will be announced on the website at least 7 days before it takes effect, and previous versions remain available on this page.',
            },
          ],
        },
      ],
    },
  ],
};

/**
 * 이전 판에서 조항을 id로 바꿔 끼워 새 판을 만든다. 바꾸지 않은 조항은 이전 판 그대로다.
 * 이전 판에 없는 id를 넘기면 오타로 보고 멈춘다(새 조항을 더하려면 이 함수를 넓힌다).
 */
function revise(
  base: PrivacyPolicyVersion,
  next: Omit<PrivacyPolicyVersion, 'intro' | 'sections'> & { intro?: Bi[]; sections: PolicySection[] },
): PrivacyPolicyVersion {
  const baseIds = new Set(base.sections.map((s) => s.id));
  const unknown = next.sections.filter((s) => !baseIds.has(s.id)).map((s) => s.id);
  if (unknown.length > 0) {
    throw new Error(`개인정보 처리방침 ${next.effectiveDate} 판: 이전 판에 없는 조항 id ${unknown.join(', ')}`);
  }
  const replaced = new Map(next.sections.map((s) => [s.id, s]));
  return {
    ...next,
    intro: next.intro ?? base.intro,
    sections: base.sections.map((s) => replaced.get(s.id) ?? s),
  };
}

/**
 * 2026-11-18 시행본. 홈페이지 이용 통계(Google Analytics)를 10장에 더한다.
 * 2026-11-17에 「11-24 시행」으로 알렸다가, GA4 수집을 바로 시작하려고 운영자 결정으로 시행일을 11-18로 당겼다.
 * 같은 날 POLICY_2026_11_18_2로 다시 고쳐 시행했다(Google Ads 광고 성과 측정 안내).
 */
const POLICY_2026_11_18 = revise(POLICY_2026_11_17, {
  effectiveDate: '2026-11-18',
  analyticsCookies: true,
  changes: [
    {
      ko: '10번 「개인정보 자동 수집 장치」에 홈페이지 이용 통계를 위한 Google Analytics 쿠키 사용과 수집하는 정보, 보관 기간, 거부 방법을 더했습니다.',
      en: 'Section 10 (Cookies) now describes the use of Google Analytics cookies for website usage statistics: what is collected, how long it is kept and how to refuse.',
    },
    {
      ko: '처리방침의 적용 범위 안내에, 쿠키로 수집하는 정보는 10번에서 안내한다는 내용을 더했습니다.',
      en: 'The scope statement now notes that information collected through cookies is described in Section 10.',
    },
  ],
  intro: [
    POLICY_2026_11_17.intro[0],
    {
      ko: '이 처리방침은 홈페이지 「교육 신청」으로 받는 개인정보에 적용됩니다. 홈페이지 이용 통계를 위해 쿠키로 수집하는 정보는 10번에서 안내합니다.',
      en: 'This policy applies to personal information received through the "Apply" form on the website. Information collected through cookies for website usage statistics is described in Section 10.',
    },
  ],
  sections: [
    {
      id: 'cookies',
      title: { ko: '10. 개인정보 자동 수집 장치의 설치 · 운영 및 거부', en: '10. Cookies and similar technologies' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '회사는 홈페이지 이용 통계를 내고 홈페이지를 개선하기 위해 Google LLC의 Google Analytics를 씁니다. Google Analytics는 이용자 브라우저에 쿠키(_ga 등)를 저장해 다시 방문한 브라우저를 구별합니다.',
              en: 'The Company uses Google Analytics, a service of Google LLC, to compile website usage statistics and improve the website. Google Analytics stores cookies (such as _ga) in your browser to recognize a returning browser.',
              sub: [
                {
                  ko: '수집하는 정보: 쿠키에 저장된 무작위 식별값, 방문한 페이지와 머문 시간, 들어온 경로, 페이지 안에서의 행동(스크롤, 누른 버튼과 링크, 내려받은 파일, 양식 작성 시작 · 제출 여부), 브라우저 · 운영체제 · 기기 종류, 화면 크기, 언어, 접속 지역(국가 · 도시 수준)',
                  en: 'Information collected: a random identifier stored in the cookie, pages visited and time spent, how you arrived, actions on the page (scrolling, buttons and links clicked, files downloaded, whether a form was started or submitted), browser, operating system and device type, screen size, language, and approximate location (country and city level)',
                },
                {
                  ko: '접속 IP 주소는 접속 지역을 추정하는 데 쓰입니다. Google은 Google Analytics가 IP 주소를 기록하거나 저장하지 않는다고 밝히고 있습니다.',
                  en: 'Your IP address is used to estimate your location. Google states that Google Analytics does not log or store IP addresses.',
                },
                {
                  ko: '회사는 이 정보로 이용자 개인을 알아보지 않고, 교육 신청으로 받은 개인정보와 연결하지 않으며, 광고에 쓰지 않습니다.',
                  en: 'The Company does not use this information to identify you, does not link it to personal information received through the "Apply" form, and does not use it for advertising.',
                },
                {
                  ko: '이 정보는 미국 등 Google이 서버를 운영하는 국가에서 처리됩니다. 개별 이용 기록은 수집일로부터 14개월이 지나면 지워지도록 설정했으며, 그 뒤에는 개인을 구별할 수 없는 집계 통계만 남습니다. 쿠키는 마지막 방문일로부터 최대 2년 동안 브라우저에 남습니다.',
                  en: 'This information is processed in the USA and other countries where Google operates servers. Individual usage records are set to be deleted 14 months after collection, after which only aggregated statistics that cannot distinguish individuals remain. The cookies remain in your browser for up to 2 years from your last visit.',
                },
              ],
            },
            {
              ko: '거부 방법: 브라우저 설정에서 쿠키를 차단하거나 지울 수 있고, Google Analytics 차단 부가 기능(https://tools.google.com/dlpage/gaoptout)을 설치해 수집을 막을 수 있습니다. 쿠키를 거부해도 홈페이지를 보거나 교육을 신청하는 데 지장이 없습니다.',
              en: 'How to refuse: you can block or delete cookies in your browser settings, or install the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout). Refusing cookies does not affect browsing the website or applying for programs.',
            },
            {
              ko: '회사는 광고를 위한 쿠키를 설치하지 않습니다. 다만 홈페이지에 넣은 YouTube 영상을 재생하면 Google(YouTube)이 자체 쿠키를 설치할 수 있으며, 이는 Google의 개인정보처리방침을 따릅니다.',
              en: 'The Company does not set cookies for advertising. If you play a YouTube video embedded on the website, Google (YouTube) may set its own cookies under Google’s privacy policy.',
            },
            WIZARD_DRAFT_STORAGE,
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: { ko: '14. 처리방침의 변경', en: '14. Changes to this policy' },
      blocks: [
        {
          kind: 'list',
          items: [
            { ko: '이 처리방침은 2026년 11월 18일부터 적용합니다.', en: 'This policy takes effect on November 18, 2026.' },
            {
              ko: '내용이 바뀌면 시행 7일 전부터 홈페이지로 알리며, 이전 처리방침은 이 페이지에서 볼 수 있습니다.',
              en: 'Any change will be announced on the website at least 7 days before it takes effect, and previous versions remain available on this page.',
            },
          ],
        },
      ],
    },
  ],
});

/**
 * 2026-11-18 같은 날 두 번째 판. 10장에 Google Ads 광고 성과 측정을 더한다.
 * GA4 속성이 Google Ads(계정 250-662-4033)에 연결돼 있는데 앞 판이 「광고에 쓰지 않는다」고 적고 있어,
 * 운영자 결정으로 같은 날 고쳐 시행했다. 맞춤형 광고(리마케팅)는 하지 않는다 — GA4의 Ads 연결과
 * 태그(allow_ad_personalization_signals: false) 모두에서 꺼 두었다.
 */
const POLICY_2026_11_18_2 = revise(POLICY_2026_11_18, {
  effectiveDate: '2026-11-18',
  sameDayRevision: 2,
  analyticsCookies: true,
  changes: [
    {
      ko: '10번에, 어떤 광고가 문의로 이어졌는지 알기 위해 Google Analytics를 Google Ads와 연결해 광고 성과를 잰다는 내용을 더했습니다.',
      en: 'Section 10 now states that Google Analytics is linked to Google Ads to measure which ads lead to inquiries.',
    },
    {
      ko: '10번의 「이용 통계를 광고에 쓰지 않는다」는 문구를 「맞춤형 광고(리마케팅)에 쓰지 않는다」로 고쳤습니다.',
      en: 'In Section 10, "not used for advertising" now reads "not used for personalized advertising (remarketing)".',
    },
  ],
  sections: [
    {
      id: 'cookies',
      title: { ko: '10. 개인정보 자동 수집 장치의 설치 · 운영 및 거부', en: '10. Cookies and similar technologies' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '회사는 홈페이지 이용 통계를 내고 홈페이지를 개선하기 위해 Google LLC의 Google Analytics를 씁니다. Google Analytics는 이용자 브라우저에 쿠키(_ga 등)를 저장해 다시 방문한 브라우저를 구별합니다.',
              en: 'The Company uses Google Analytics, a service of Google LLC, to compile website usage statistics and improve the website. Google Analytics stores cookies (such as _ga) in your browser to recognize a returning browser.',
              sub: [
                {
                  ko: '수집하는 정보: 쿠키에 저장된 무작위 식별값, 방문한 페이지와 머문 시간, 들어온 경로(광고를 누르고 들어온 경우 어떤 광고인지 포함), 페이지 안에서의 행동(스크롤, 누른 버튼과 링크, 내려받은 파일, 양식 작성 시작 · 제출 여부), 브라우저 · 운영체제 · 기기 종류, 화면 크기, 언어, 접속 지역(국가 · 도시 수준)',
                  en: 'Information collected: a random identifier stored in the cookie, pages visited and time spent, how you arrived (including which ad, if you arrived by clicking an ad), actions on the page (scrolling, buttons and links clicked, files downloaded, whether a form was started or submitted), browser, operating system and device type, screen size, language, and approximate location (country and city level)',
                },
                {
                  ko: '접속 IP 주소는 접속 지역을 추정하는 데 쓰입니다. Google은 Google Analytics가 IP 주소를 기록하거나 저장하지 않는다고 밝히고 있습니다.',
                  en: 'Your IP address is used to estimate your location. Google states that Google Analytics does not log or store IP addresses.',
                },
                {
                  ko: '회사는 이 정보로 이용자 개인을 알아보지 않고, 교육 신청으로 받은 개인정보와 연결하지 않습니다.',
                  en: 'The Company does not use this information to identify you and does not link it to personal information received through the "Apply" form.',
                },
                {
                  ko: '이 정보는 미국 등 Google이 서버를 운영하는 국가에서 처리됩니다. 개별 이용 기록은 수집일로부터 14개월이 지나면 지워지도록 설정했으며, 그 뒤에는 개인을 구별할 수 없는 집계 통계만 남습니다. 쿠키는 마지막 방문일로부터 최대 2년 동안 브라우저에 남습니다.',
                  en: 'This information is processed in the USA and other countries where Google operates servers. Individual usage records are set to be deleted 14 months after collection, after which only aggregated statistics that cannot distinguish individuals remain. The cookies remain in your browser for up to 2 years from your last visit.',
                },
              ],
            },
            {
              ko: '광고 성과 측정: 회사는 Google Ads로 홈페이지를 광고하며, 어떤 광고가 문의로 이어졌는지 알기 위해 Google Analytics를 Google Ads와 연결해 둡니다. 이에 따라 광고를 누르고 들어온 방문의 이용 통계(본 페이지, 문의 버튼(전화 · 카카오톡 채널 · 네이버 예약 · 이메일)을 눌렀는지 등)가 Google Ads로 전달되어 광고 성과를 재는 데 쓰입니다.',
              en: 'Measuring advertising: The Company advertises the website through Google Ads and links Google Analytics to Google Ads to learn which ads lead to inquiries. Usage statistics from visits that arrive by clicking an ad (pages viewed, whether an inquiry button for phone, KakaoTalk channel, Naver booking or email was clicked, etc.) are therefore shared with Google Ads and used to measure ad performance.',
              sub: [
                {
                  ko: '회사는 홈페이지 방문 기록을 이용해 다른 사이트나 앱에서 방문자에게 광고를 다시 보여 주는 맞춤형 광고(리마케팅)를 하지 않습니다. 이를 위해 Google Analytics의 개인 맞춤 광고 기능을 꺼 두었습니다.',
                  en: 'The Company does not use your visits to this website to show you ads elsewhere (personalized advertising or remarketing). Ad personalization is turned off in Google Analytics for this purpose.',
                },
              ],
            },
            {
              ko: '거부 방법: 브라우저 설정에서 쿠키를 차단하거나 지울 수 있고, Google Analytics 차단 부가 기능(https://tools.google.com/dlpage/gaoptout)을 설치해 수집을 막을 수 있습니다. 쿠키를 거부해도 홈페이지를 보거나 교육을 신청하는 데 지장이 없습니다.',
              en: 'How to refuse: you can block or delete cookies in your browser settings, or install the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout). Refusing cookies does not affect browsing the website or applying for programs.',
            },
            {
              ko: '회사는 맞춤형 광고를 위한 쿠키를 설치하지 않습니다. 다만 홈페이지에 넣은 YouTube 영상을 재생하면 Google(YouTube)이 자체 쿠키를 설치할 수 있으며, 이는 Google의 개인정보처리방침을 따릅니다.',
              en: 'The Company does not set cookies for personalized advertising. If you play a YouTube video embedded on the website, Google (YouTube) may set its own cookies under Google’s privacy policy.',
            },
            WIZARD_DRAFT_STORAGE,
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: { ko: '14. 처리방침의 변경', en: '14. Changes to this policy' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              ko: '이 처리방침은 2026년 11월 18일부터 적용합니다. 같은 날 앞서 시행한 처리방침의 10번에 광고 성과 측정 안내를 더한 것입니다.',
              en: 'This policy takes effect on November 18, 2026. It adds the advertising measurement notice to Section 10 of the version that took effect earlier the same day.',
            },
            {
              ko: '내용이 바뀌면 시행 7일 전부터 홈페이지로 알리며, 이전 처리방침은 이 페이지에서 볼 수 있습니다.',
              en: 'Any change will be announced on the website at least 7 days before it takes effect, and previous versions remain available on this page.',
            },
          ],
        },
      ],
    },
  ],
});

export const privacyPolicies: PrivacyPolicyVersion[] = [POLICY_2026_11_18_2, POLICY_2026_11_18, POLICY_2026_11_17];

// ─── 시행일로 판 고르기 ──────────────────────────────────────────

/** 판의 식별자. 그날 첫 판은 시행일 그대로, 같은 날 고친 판은 「시행일-순번」(예: 2026-11-18-2). */
export function policyVersionId(v: PrivacyPolicyVersion): string {
  return v.sameDayRevision ? `${v.effectiveDate}-${v.sameDayRevision}` : v.effectiveDate;
}

/** 최근 판이 앞. 시행일이 같으면 순번이 큰 판이 앞이다. */
const byNewest = [...privacyPolicies].sort(
  (a, b) => b.effectiveDate.localeCompare(a.effectiveDate) || (b.sameDayRevision ?? 1) - (a.sameDayRevision ?? 1),
);

{
  const ids = privacyPolicies.map(policyVersionId);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length > 0) {
    throw new Error(`개인정보 처리방침 판이 겹칩니다: ${dup.join(', ')} (같은 날 고친 판에는 sameDayRevision을 붙이세요).`);
  }
}

/**
 * 서울 기준 날짜(YYYY-MM-DD).
 * 페이지는 정적 빌드라 빌드한 날이 기준이다 — deploy.yml이 매일 0시 5분(KST)에 다시 빌드해 시행일에 맞춰 바뀐다.
 * 위저드처럼 브라우저에서 부르면 그 순간의 날짜다.
 */
export function seoulDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
}

/** 그날 시행 중인 판 = 시행일이 그날이거나 그 전인 판 중 가장 최근 것. */
export function policyInEffect(date: string): PrivacyPolicyVersion {
  const policy = byNewest.find((v) => v.effectiveDate <= date);
  if (!policy) throw new Error(`${date}에 시행 중인 개인정보 처리방침이 없습니다 (privacyPolicies의 시행일 확인).`);
  return policy;
}

/** 시행일이 아직 오지 않은 판(개정 안내로 보인다). 최근 것이 앞이다. */
export function upcomingPolicies(date: string): PrivacyPolicyVersion[] {
  return byNewest.filter((v) => v.effectiveDate > date);
}

/** 시행 중인 판보다 오래된 판(「이전 처리방침」). 최근 것이 앞이다. */
export function previousPolicies(date: string): PrivacyPolicyVersion[] {
  // 시행일로 거르지 않고 순서로 자른다 — 같은 날 앞서 시행한 판도 「이전」에 들어가야 한다.
  return byNewest.slice(byNewest.indexOf(policyInEffect(date)) + 1);
}

export const BUSINESS_INFO: Bi = {
  ko: `(주)하이스타터 · 대표 이정욱 · 사업자등록번호 831-88-01997 · 경기도 안산시 상록구 한양대학로 55 5공학관 창업실 · ${PHONE}`,
  en: 'Histarter co.,ltd · CEO Lee Jeong Uk · Business Registration 831-88-01997 · 55 Hanyangdaehak-ro, Engineering Bldg. 5 Startup Room, Sangnok-gu, Ansan, Gyeonggi-do · +82-70-8064-0829',
};
