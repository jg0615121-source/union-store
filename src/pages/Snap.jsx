import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GROUP, byId, looks, won } from '../data.js';
import { Heart, LookArt } from '../components.jsx';
import { useStore } from '../store.jsx';

const FILTERS = [['all', '전체'], ['street', '스트릿'], ['clean', '깔끔'], ['bold', '컬러 포인트'], ['mono', '무채색']];
// Fixed base counts so the page looks lived-in; the viewer's own like adds one.
const BASE = Object.fromEntries(looks.map((l, i) => [l.id, 40 + ((i * 37) % 180)]));

export default function Snap() {
  const { addToCart } = useStore();
  const [f, setF] = useState('all');
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('union.likes') || '[]'); } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem('union.likes', JSON.stringify(liked)); } catch { /* ignore */ } }, [liked]);
  const { hash } = useLocation();
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center' }); }, [hash]);
  const list = looks.filter((l) => f === 'all' || l.tags.includes(f));

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">SNAP</p>
        <h1>이렇게들 입어요</h1>
      </header>
      <div className="tabs" role="tablist" aria-label="스타일">
        {FILTERS.map(([k, l]) => <button key={k} role="tab" aria-selected={f === k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>)}
      </div>
      <div className="snap-grid">
        {list.map((l) => {
          const on = liked.includes(l.id);
          const total = l.items.reduce((a, [id]) => a + byId[id].price, 0);
          return (
            <article key={l.id} id={l.id} className="snap">
              <LookArt look={l} />
              <div className="snap-meta">
                <div className="snap-top">
                  <strong>{l.name}</strong>
                  <button className={`like ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => setLiked((xs) => (on ? xs.filter((x) => x !== l.id) : [...xs, l.id]))}>
                    <Heart on={on} /> {BASE[l.id] + (on ? 1 : 0)}
                  </button>
                </div>
                <span className="muted">{l.who}</span>
                <ul>{l.items.map(([id]) => <li key={id}><Link to={`/product/${id}`}>{byId[id].ko}</Link></li>)}</ul>
                <button className="btn small" onClick={() => l.items.forEach(([id, c]) => addToCart(id, c, GROUP[byId[id].cat] === 'acc' ? 'FREE' : 'M'))}>세트 담기 · {won(total)}</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
