import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data.js';
import { Grid } from '../components.jsx';
import { askAI, localSearch } from '../ai.js';

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '';
  const [ai, setAi] = useState(null); // { productIds, summary, by }
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    const n = new URLSearchParams(sp);
    v ? n.set(k, v) : n.delete(k);
    setSp(n, { replace: true });
  };

  useEffect(() => {
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

  const ids = useMemo(() => (ai ? ai.productIds : products.map((p) => p.id)), [ai]);

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">Collection</p>
        <h1>{q ? `"${q}"` : 'FW26'}</h1>
      </header>

      {q && (
        <p className="ai-note">{loading ? '고르는 중…' : ai?.summary} <button className="link" onClick={() => set('q', '')}>검색 지우기</button></p>
      )}

      {ids.length ? <Grid ids={ids} cols={3} /> : <p className="empty">조건에 맞는 옷이 없어요. 카테고리를 전체로 바꿔보세요.</p>}
    </div>
  );
}
