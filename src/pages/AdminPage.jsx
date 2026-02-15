import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAuctionItem } from '../services/auctionService';

const initialForm = {
  title: '',
  address: '',
  minimumBid: '',
  auctionDate: '',
  court: '',
  status: '',
};

export default function AdminPage() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    const id = await registerAuctionItem(form);
    setSaving(false);
    setForm(initialForm);
    navigate(`/detail/${id}`);
  }

  return (
    <section>
      <h2>관리자 물건 등록</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>
          물건명
          <input name="title" value={form.title} onChange={onChange} required />
        </label>
        <label>
          주소
          <input name="address" value={form.address} onChange={onChange} required />
        </label>
        <label>
          최저 입찰가
          <input name="minimumBid" value={form.minimumBid} onChange={onChange} />
        </label>
        <label>
          경매일
          <input name="auctionDate" value={form.auctionDate} onChange={onChange} placeholder="2026-05-11" />
        </label>
        <label>
          법원
          <input name="court" value={form.court} onChange={onChange} />
        </label>
        <label>
          상태
          <input name="status" value={form.status} onChange={onChange} placeholder="진행중" />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? '저장 중...' : '등록'}
        </button>
      </form>
    </section>
  );
}
