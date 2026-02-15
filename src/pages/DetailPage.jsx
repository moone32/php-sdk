import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAuctionItemById } from '../services/auctionService';

export default function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAuctionItemById(id);
      setItem(data);
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return <p>불러오는 중...</p>;
  }

  if (!item) {
    return (
      <section>
        <p>해당 물건을 찾을 수 없습니다.</p>
        <Link to="/">목록으로 돌아가기</Link>
      </section>
    );
  }

  return (
    <section className="detail">
      <h2>{item.title}</h2>
      <p><strong>주소:</strong> {item.address}</p>
      <p><strong>최저 입찰가:</strong> {item.minimumBid || '-'}</p>
      <p><strong>경매일:</strong> {item.auctionDate || '-'}</p>
      <p><strong>법원:</strong> {item.court || '-'}</p>
      <p><strong>진행 상태:</strong> {item.status || '-'}</p>
      <p><strong>등록 소스:</strong> {item.source}</p>

      <Link to="/">목록으로 돌아가기</Link>
    </section>
  );
}
