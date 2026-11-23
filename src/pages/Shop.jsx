import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GROUP, SHOP_FILTERS, products } from '../data.js';
import { Grid } from '../components.jsx';
import { askAI, localSearch } from '../ai.js';

const SORTS = [['rec', '추천순'], ['new', '신상품'], ['rank', '판매순'], ['low', '낮은 가격'], ['high', '높은 가격']];
const EXAMPLES = ['비 오는 날 데이트', '면접 끝나고 친구 만나는 날', '주말 피크닉', '추위 많이 타는 사람 선물'];

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get('cat') || 'all';
  const sort = sp.get('sort') || 'rec';
  const q = sp.get('q') || '';
  const [input, setInput] = useState(q);
  const [ai, setAi] = useState(null); // { productIds, summary, by }
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    const n = new URLSearchParams(sp);
    v ? n.set(k, v) : n.delete(k);
    setSp(n, { replace: true });
  };

  useEffect(() => {
    setInput(q);
    if (!q) return setAi(null);
    let live = true;
    setLoading(true);
    askAI('search', { query: q }).then((r) => {
      if (!live) return;
      setAi(r?.productIds ? { ...r, by: 'ai' } : { ...localSearch(q), by: 'local' });
      setLoading(false);
    });
    return () => { live = false; };
  }, [q]);

  const ids = useMemo(() => {
    let list = ai ? ai.productIds.map((id) => products.find((p) => p.id === id)) : [...products];
    if (cat !== 'all') list = list.filter((p) => GROUP[p.cat] === cat);
    const by = { new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0), rank: (a, b) => a.rank - b.rank, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price };
    if (by[sort]) list.sort(by[sort]);
    return list.map((p) => p.id);
  }, [ai, cat, sort]);

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">SHOP</p>
        <h1>{q ? `"${q}"` : sort === 'new' ? '신상품' : sort === 'rank' ? '랭킹' : '전체 상품'}</h1>
      </header>

      <form className="aisearch" onSubmit={(e) => { e.preventDefault(); set('q', input.trim()); }}>
        <label htmlFor="aiq">상황으로 찾기</label>
        <div className="aisearch-row">
          <input id="aiq" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 비 오는 날 데이트, 키 160 여자 편한 바지" />
          <button className="btn">찾기</button>
        </div>
        <div className="chips">
          {EXAMPLES.map((ex) => <button type="button" key={ex} className="chip" onClick={() => set('q', ex)}>{ex}</button>)}
          {q && <button type="button" className="chip on" onClick={() => set('q', '')}>검색 지우기 ×</button>}
        </div>
        {loading && <p className="muted">고르는 중…</p>}
        {ai && !loading && <p className="ai-note"><b>{ai.by === 'ai' ? 'AI가 고른 결과' : '키워드로 고른 결과'}</b> {ai.summary}</p>}
      </form>

      <div className="toolbar">
        <div className="tabs" role="tablist" aria-label="카테고리">
          {SHOP_FILTERS.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={cat === k} className={cat === k ? 'on' : ''} onClick={() => set('cat', k === 'all' ? '' : k)}>{l}</button>
          ))}
        </div>
        <label className="sort">
          <span className="sr">정렬</span>
          <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value === 'rec' ? '' : e.target.value)}>
            {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
      <p className="count">{ids.length}개</p>
      {ids.length ? <Grid ids={ids} ranked={sort === 'rank'} /> : <p className="empty">조건에 맞는 옷이 없어요. 카테고리를 전체로 바꿔보세요.</p>}
    </div>
  );
}
