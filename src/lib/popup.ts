import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Popup } from '@/types';

export async function getActivePopups(): Promise<Popup[]> {
  const now = new Date();
  const popupsRef = collection(db, 'popups');
  const q = query(popupsRef, where('isActive', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
      startDate: d.data().startDate?.toDate?.() || new Date(),
      endDate: d.data().endDate?.toDate?.() || new Date(),
      createdAt: d.data().createdAt?.toDate?.() || new Date(),
    } as Popup))
    .filter((popup) => now >= popup.startDate && now <= popup.endDate);
}
