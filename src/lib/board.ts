import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { BoardPost } from '@/types';

const POSTS_PER_PAGE = 10;

export async function getBoardPosts(boardType: string, page: number = 1): Promise<{ posts: BoardPost[]; totalPages: number }> {
  const postsRef = collection(db, 'boards', boardType, 'posts');
  const countSnapshot = await getDocs(postsRef);
  const totalPages = Math.ceil(countSnapshot.size / POSTS_PER_PAGE);

  const postsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(POSTS_PER_PAGE * page));
  const snapshot = await getDocs(postsQuery);
  const allPosts = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.() || new Date(),
    updatedAt: d.data().updatedAt?.toDate?.() || new Date(),
  } as BoardPost));
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE);

  return { posts, totalPages };
}

export async function getBoardPost(boardType: string, postId: string): Promise<BoardPost | null> {
  const docRef = doc(db, 'boards', boardType, 'posts', postId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  } as BoardPost;
}
