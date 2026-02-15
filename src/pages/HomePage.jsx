import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuctionItems, syncAuctionItems } from '../services/auctionService';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function loadData() {
    setLoading(true);
    const list = await getAuctionItems();
    setItems(list);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSync() {
    setSyncing(true);
    await syncAuctionItems();
    await loadData();
    setSyncing(false);
  }

  return (
    <section>
      <div className="page-title-row">
        <h2>부동산 경매 물건</h2>
        <button onClick={handleSync} disabled={syncing}>
          {syncing ? '동기화 중...' : 'CODEF에서 물건 가져오기'}
        </button>
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : items.length === 0 ? (
        <p>등록된 경매 물건이 없습니다. 동기화 또는 관리자 등록을 이용해 주세요.</p>
      ) : (
        <ul className="card-grid">
          {items.map((item) => (
            <li key={item.id} className="card">
              <h3>{item.title}</h3>
              <p>{item.address || '주소 정보 없음'}</p>
              <p>최저 입찰가: {item.minimumBid || '-'}</p>
              <Link to={`/detail/${item.id}`}>상세 보기</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
