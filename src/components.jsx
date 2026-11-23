import { useState } from 'react';
import { Link } from 'react-router-dom';
import { byId, won, GROUP, SIZES } from './data.js';
import { Garment } from './garments.jsx';
import { Photo, ProductImage } from './media.jsx';
import { photo } from './photos.js';
import { useStore } from './store.jsx';

export function Heart({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const TOP = new Set(['tee', 'hoodie', 'crew', 'longsleeve', 'jacket', 'varsity']);

export function ProductCard({ p, c = 0, rank }) {
  const { wish, toggleWish, addToCart } = useStore();
  const [added, setAdded] = useState('');
  const on = wish.includes(p.id);
  const acc = GROUP[p.cat] === 'acc';
  // Hover shows the second colourway when photographed, otherwise the back or the print.
  const alt = photo[`${p.id}-1`] ? <ProductImage p={p} c={1} /> : <Garment product={p} c={c} view={TOP.has(p.cat) ? 'back' : 'detail'} />;
  const quick = (s) => { addToCart(p.id, c, s); setAdded(s); };
  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/product/${p.id}`} className="pcard-img" aria-label={`${p.ko} 보기`}>
          <div className="pcard-a"><ProductImage p={p} c={c} /></div>
          <div className="pcard-b">{alt}</div>
        </Link>
        {rank && <span className="pcard-rank">{String(rank).padStart(2, '0')}</span>}
        {p.isNew && !rank && <span className="tag">New</span>}
        <button className={`wish ${on ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-pressed={on} aria-label={on ? '찜 해제' : '찜하기'}><Heart on={on} /></button>
        <div className="quick" aria-label="바로 담기">
          {acc ? <button onClick={() => quick('FREE')}>{added ? '담았어요' : '바로 담기'}</button>
            : SIZES.map((s) => <button key={s} onClick={() => quick(s)} className={added === s ? 'on' : ''}>{s}</button>)}
        </div>
      </div>
      <Link to={`/product/${p.id}`} className="pcard-meta">
        <span className="pcard-name">{p.name}</span>
        <span className="pcard-row">
          <span className="pcard-ko">{p.ko}</span>
          <span className="price">{won(p.price)}</span>
        </span>
        <span className="swatches" aria-label={`${p.colors.length}가지 색상`}>
          {p.colors.map((col) => <i key={col.name} style={{ background: col.hex }} title={col.name} />)}
        </span>
      </Link>
    </article>
  );
}

export function Grid({ ids, ranked, cols }) {
  return (
    <div className={`grid ${cols === 3 ? 'g3' : ''}`}>
      {ids.map((id, i) => <ProductCard key={id} p={byId[id]} rank={ranked ? i + 1 : undefined} />)}
    </div>
  );
}

export function Rail({ ids }) {
  return (
    <div className="rail">
      {ids.map((id) => <ProductCard key={id} p={byId[id]} />)}
    </div>
  );
}

// A look photo when one exists; otherwise a flat-lay composition of its items.
export function LookArt({ look, tone = 'var(--tile)' }) {
  const parts = look.items.map(([id, c]) => ({ p: byId[id], c }));
  const top = parts.find((x) => ['top', 'outer'].includes(GROUP[x.p.cat]));
  const bottom = parts.find((x) => GROUP[x.p.cat] === 'bottom');
  const acc = parts.find((x) => GROUP[x.p.cat] === 'acc');
  const label = `${look.name}: ${parts.map((x) => x.p.ko).join(', ')}`;
  return (
    <div className="lookart" style={{ background: tone }}>
      <Photo name={`look-${look.id}`} alt={label} className="lookphoto" fallback={
        <div role="img" aria-label={label}>
          {top && <div className="la-top"><ProductImage p={top.p} c={top.c} /></div>}
          {bottom && <div className="la-bottom"><ProductImage p={bottom.p} c={bottom.c} /></div>}
          {acc && <div className="la-acc"><ProductImage p={acc.p} c={acc.c} /></div>}
        </div>
      } />
    </div>
  );
}

export function SectionHead({ kicker, title, to, more = 'View all' }) {
  return (
    <header className="shead">
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
      </div>
      {to && <Link to={to} className="more">{more}</Link>}
    </header>
  );
}
