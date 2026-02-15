import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fetchAuctionItemsFromCodef } from './codefApi';

const COLLECTION = 'auctionItems';

export async function syncAuctionItems() {
  try {
    const externalItems = await fetchAuctionItemsFromCodef();

    if (!externalItems.length) {
      return [];
    }

    await Promise.all(
      externalItems.map((item) =>
        addDoc(collection(db, COLLECTION), {
          source: 'codef',
          title: item?.goodsName || '경매 물건',
          address: item?.location || '',
          minimumBid: item?.minPrice || '',
          auctionDate: item?.auctionDate || '',
          court: item?.courtName || '',
          status: item?.status || '',
          detail: item,
          createdAt: serverTimestamp(),
        }),
      ),
    );

    return externalItems;
  } catch (error) {
    console.error('CODEF 동기화 실패:', error.message);
    return [];
  }
}

export async function getAuctionItems() {
  const snapshot = await getDocs(query(collection(db, COLLECTION), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

export async function getAuctionItemById(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id));
  if (!snapshot.exists()) {
    return null;
  }
  return { id: snapshot.id, ...snapshot.data() };
}

export async function registerAuctionItem(item) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...item,
    source: 'admin',
    createdAt: serverTimestamp(),
  });

  return ref.id;
}
