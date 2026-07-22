import popupsData from '@/data/boards/popups.json';
import { Popup } from '@/types';

interface RawPopup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

/**
 * JSON 파일(src/data/boards/popups.json)에서 활성화된 팝업을 반환합니다.
 * 관리자 페이지에서 편집된 내용이 커밋·배포되면 자동 반영됩니다.
 *
 * 시작일/종료일은 사용자의 로컬 시간대 기준으로 해석합니다.
 *  - startDate: 해당 날짜의 00:00 (하루 시작)
 *  - endDate:   해당 날짜의 23:59:59.999 (하루 끝, 포함)
 * (과거에는 Firestore에서 조회했지만, 관리자 페이지가 JSON 파일을
 *  직접 편집하도록 전환되어 Firestore는 더 이상 사용하지 않습니다.)
 */

// YYYY-MM-DD 문자열을 사용자의 로컬 시간대 기준 Date 로 변환한다.
// new Date("2026-07-22") 는 UTC 자정으로 해석돼 KST 사용자에게는 9 시간 늦게 시작되는 문제가 있어 직접 파싱한다.
function parseLocalDate(s: string, endOfDay = false): Date {
  const [y, m, d] = s.split('-').map(Number);
  if (endOfDay) return new Date(y, m - 1, d, 23, 59, 59, 999);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export async function getActivePopups(): Promise<Popup[]> {
  const now = new Date();
  const raw = popupsData as RawPopup[];
  return raw
    .filter((p) => p.isActive)
    .map(
      (p) =>
        ({
          id: p.id,
          title: p.title,
          content: p.content,
          imageUrl: p.imageUrl,
          linkUrl: p.linkUrl,
          isActive: p.isActive,
          startDate: parseLocalDate(p.startDate),
          endDate: parseLocalDate(p.endDate, true),
          createdAt: new Date(p.createdAt),
        }) as Popup,
    )
    .filter((popup) => now >= popup.startDate && now <= popup.endDate);
}
