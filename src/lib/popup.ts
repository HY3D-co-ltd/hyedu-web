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
 * (과거에는 Firestore에서 조회했지만, 관리자 페이지가 JSON 파일을
 *  직접 편집하도록 전환되어 Firestore는 더 이상 사용하지 않습니다.)
 */
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
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate),
          createdAt: new Date(p.createdAt),
        }) as Popup,
    )
    .filter((popup) => now >= popup.startDate && now <= popup.endDate);
}
