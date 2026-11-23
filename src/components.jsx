import { Link } from 'react-router-dom';
import { byId, won, GROUP } from './data.js';
import { Garment } from './garments.jsx';
import { useStore } from './store.jsx';

export function Heart({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ProductCard({ p, c = 0, rank }) {
  const { wish, toggleWish } = useStore();
  const on = wish.includes(p.id);
  return (
    <article className="pcard">
      <Link to={`/product/${p.id}`} className="pcard-img" aria-label={`${p.ko} 보기`}>
        <Garment product={p} c={c} />
        <Garment product={p} c={c} view={['tee', 'hoodie', 'crew', 'longsleeve', 'jacket', 'varsity'].includes(p.cat) ? 'back' : 'detail'} className="alt" />
        {rank && <span className="pcard-rank">{rank}</span>}
        {p.isNew && !rank && <span className="tag">NEW</span>}
      </Link>
      <button className={`wish ${on ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-pressed={on} aria-label={on ? '찜 해제' : '찜하기'}>
        <Heart on={on} />
      </button>
      <div className="pcard-meta">
        <Link to={`/product/${p.id}`} className="pcard-name">{p.name}</Link>
        <span className="pcard-ko">{p.ko}</span>
        <span className="pcard-row">
          <span className="price">{won(p.price)}</span>
          <span className="swatches" aria-label={`${p.colors.length}가지 색상`}>
            {p.colors.map((col) => <i key={col.name} style={{ background: col.hex }} title={col.name} />)}
          </span>
        </span>
      </div>
    </article>
  );
}

export function Grid({ ids, ranked }) {
  return (
    <div className="grid">
      {ids.map((id, i) => <ProductCard key={id} p={byId[id]} rank={ranked ? i + 1 : undefined} />)}
    </div>
  );
}

// Flat-lay composition of a look: top large, bottom beside it, accessory tucked in a corner.
export function LookArt({ look, tone = 'var(--tile)' }) {
  const parts = look.items.map(([id, c]) => ({ p: byId[id], c }));
  const top = parts.find((x) => ['top', 'outer'].includes(GROUP[x.p.cat]));
  const bottom = parts.find((x) => GROUP[x.p.cat] === 'bottom');
  const acc = parts.find((x) => GROUP[x.p.cat] === 'acc');
  return (
    <div className="lookart" style={{ background: tone }} role="img" aria-label={`${look.name}: ${parts.map((x) => x.p.ko).join(', ')}`}>
      {top && <Garment product={top.p} c={top.c} className="la-top" />}
      {bottom && <Garment product={bottom.p} c={bottom.c} className="la-bottom" />}
      {acc && <Garment product={acc.p} c={acc.c} className="la-acc" />}
    </div>
  );
}

export function SectionHead({ kicker, title, to, more = '전체 보기' }) {
  return (
    <header className="shead">
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
      </div>
      {to && <Link to={to} className="more">{more} →</Link>}
    </header>
  );
}
