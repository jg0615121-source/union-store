import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATS, DETAILS, GROUP, INFO_SCALE, SIZES, byId, won } from '../data.js';
import { Photo, ProductImage } from '../media.jsx';
import { photo, shownColors } from '../photos.js';
import { Grid, Heart } from '../components.jsx';
import { useStore } from '../store.jsx';
import { recommendSize } from '../sizing.js';
import { askAI } from '../ai.js';
import { similar } from '../recommend.js';


function SizeFinder({ p, onPick }) {
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [fit, setFit] = useState(0);
  const s = recommendSize({ height: +h, weight: +w, fit, oversize: p.tags.includes('oversize') });
  return (
    <div className="sizefinder">
      <div className="sf-row">
        <label>키<input id="sf-h" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value.replace(/\D/g, ''))} placeholder="170" /><span>cm</span></label>
        <label>몸무게<input id="sf-w" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value.replace(/\D/g, ''))} placeholder="62" /><span>kg</span></label>
      </div>
      <div className="seg" role="radiogroup" aria-label="원하는 핏">
        {[[-1, '딱 맞게'], [0, '보통'], [1, '넉넉하게']].map(([v, l]) => (
          <button key={v} role="radio" aria-checked={fit === v} className={fit === v ? 'on' : ''} onClick={() => setFit(v)}>{l}</button>
        ))}
      </div>
      {s ? (
        <p className="sf-out">추천 사이즈 <b>{s}</b>{p.tags.includes('oversize') && fit <= 0 && ' · 원래 크게 나온 옷이라 한 치수 내렸어요'} <button className="link" onClick={() => onPick(s)}>이 사이즈로 선택</button></p>
      ) : null}
    </div>
  );
}

// Reviews written by shoppers. shortcut: stored in this browser only, move to a shared store when the shop goes live.
function useReviews(id) {
  const key = `union.reviews.${id}`;
  const [list, setList] = useState(() => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } });
  useEffect(() => { try { setList(JSON.parse(localStorage.getItem(key) || '[]')); } catch { setList([]); } }, [key]);
  const add = (r) => setList((xs) => { const next = [r, ...xs]; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* keep in memory */ } return next; });
  return [list, add];
}

function Reviews({ p }) {
  const [rs, add] = useReviews(p.id);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ rating: 5, size: GROUP[p.cat] === 'acc' ? 'FREE' : 'M', body: '', text: '' });
  const [sum, setSum] = useState(null);
  useEffect(() => {
    setSum(null);
    if (rs.length < 3) return;
    let live = true;
    askAI('reviews', { reviews: rs.map((r) => `[${r.body || '-'}, ${r.size}, ${r.rating}점] ${r.text}`).join('\n') }).then((r) => live && r?.summary && setSum(r));
    return () => { live = false; };
  }, [p.id, rs.length]);
  const submit = (e) => {
    e.preventDefault();
    if (f.text.trim().length < 5) return;
    add({ ...f, text: f.text.trim(), date: new Date().toISOString().slice(0, 10) });
    setF({ ...f, text: '', body: '' });
    setOpen(false);
  };
  return (
    <section className="reviews">
      <header className="rv-head">
        <h2>후기 {rs.length > 0 && <span>{rs.length}</span>}</h2>
        <button className="btn ghost small" onClick={() => setOpen(!open)}>{open ? '닫기' : '후기 쓰기'}</button>
      </header>
      {open && (
        <form className="rv-form" onSubmit={submit}>
          <div className="rv-stars" role="radiogroup" aria-label="별점">
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} role="radio" aria-checked={f.rating === n} className={n <= f.rating ? 'on' : ''} onClick={() => setF({ ...f, rating: n })}>★</button>
            ))}
          </div>
          <div className="rv-row">
            <label>구매 사이즈
              <select id="rv-size" value={f.size} onChange={(e) => setF({ ...f, size: e.target.value })}>
                {(GROUP[p.cat] === 'acc' ? ['FREE'] : SIZES).map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>키 / 몸무게 (선택)
              <input id="rv-body" value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} placeholder="170 / 60" maxLength={20} />
            </label>
          </div>
          <label className="rv-text">후기
            <textarea id="rv-text" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} rows={4} maxLength={500} placeholder="핏, 두께, 색감은 어땠나요?" />
          </label>
          <button className="btn" disabled={f.text.trim().length < 5}>후기 남기기</button>
        </form>
      )}
      {sum && (
        <div className="rsum">
          <p className="kicker">AI 후기 요약</p>
          <p className="rsum-main">{sum.summary}</p>
          {sum.sizeTip && <p><b>사이즈 팁</b> {sum.sizeTip}</p>}
        </div>
      )}
      {rs.length === 0 && !open && <p className="rv-empty">아직 후기가 없어요. 첫 후기를 남겨주세요.</p>}
      <ul className="rlist">
        {rs.map((r, i) => (
          <li key={i}>
            <div className="rmeta"><span aria-label={`별점 ${r.rating}점`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span><span>{r.size}{r.body && ` · ${r.body}`}</span><span>{r.date}</span></div>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Product() {
  const { id } = useParams();
  const p = byId[id];
  const { addToCart, wish, toggleWish, markViewed, viewed } = useStore();
  const [c, setC] = useState(0);
  const [zoom, setZoom] = useState(null);
  const [size, setSize] = useState(GROUP[p?.cat] === 'acc' ? 'FREE' : '');
  const [warn, setWarn] = useState(false);

  useEffect(() => {
    if (!p) return;
    markViewed(p.id);
    setC(0); setZoom(null); setWarn(false);
    setSize(GROUP[p.cat] === 'acc' ? 'FREE' : '');
  }, [id]);

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  if (!p) return <div className="wrap page"><h1>없는 상품이에요</h1><Link to="/shop" className="btn">상품 보기</Link></div>;

  const isAcc = GROUP[p.cat] === 'acc';
  const dt = DETAILS[p.id];
  const on = wish.includes(p.id);
  // With a real photo, show only photos; the drawn back/detail views are for products that have none yet.
  const views = photo[`${p.id}-${c}`] ? ['front'] : isAcc || GROUP[p.cat] === 'bottom' ? ['front', 'detail'] : ['front', 'back', 'detail'];
  const add = () => (size ? addToCart(p.id, c, size) : setWarn(true));

  return (
    <div className="wrap page">
      <nav className="crumbs" aria-label="위치"><Link to="/shop">SHOP</Link> / <Link to={`/shop?cat=${GROUP[p.cat]}`}>{CATS[p.cat]}</Link></nav>
      <div className="pdp">
        <div className="gallery">
          {views.map((v) => (
            <button key={v} className="shot" onClick={() => setZoom(v)} aria-label={`${{ front: '앞면', back: '뒷면', detail: '프린트' }[v]} 크게 보기`}>
              <ProductImage p={p} c={c} view={v} eager={v === 'front'} />
            </button>
          ))}
          {dt?.models.map(([who, body, wear], k) => (
            <Photo key={who} name={`${p.id}-model-${k + 1}`} alt={`${who} ${body} ${wear}`} className="shot-model" fallback={null} />
          )).filter(Boolean)}
        </div>

        <div className="pinfo">
          <h1>{p.name}</h1>
          <p className="pinfo-ko">{p.ko}</p>
          <p className="pinfo-price">{won(p.price)}</p>

          <fieldset>
            <legend>색상 <span>{p.colors[c].name}</span></legend>
            <div className="colors">
              {shownColors(p).map((i) => p.colors[i]).map((col, k) => { const i = shownColors(p)[k]; return (
                <button key={col.name} className={i === c ? 'on' : ''} style={{ '--sw': col.hex }} onClick={() => setC(i)} aria-label={col.name} aria-pressed={i === c} />
              ); })}
            </div>
          </fieldset>

          {!isAcc && (
            <fieldset>
              <legend>사이즈 {warn && !size && <span className="err">사이즈를 골라주세요</span>}</legend>
              <div className="sizes">
                {SIZES.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)} aria-pressed={size === s}>{s}</button>)}
              </div>
              <details className="sf">
                <summary>내 사이즈 찾기</summary>
                <SizeFinder p={p} onPick={setSize} />
              </details>
            </fieldset>
          )}

          <div className="buy">
            <button className="btn full" onClick={add}>장바구니 담기</button>
            <button className={`btn ghost sq ${on ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-pressed={on} aria-label="찜하기"><Heart on={on} /></button>
          </div>

          {dt && (
            <div className="pd">
              {!isAcc && <table className="pd-matrix">
                <tbody>
                  {INFO_SCALE.map(([label, levels], r) => (
                    <tr key={label}>
                      <th>{label}</th>
                      {levels.map((l, k) => <td key={l} className={dt.info[r] === k ? 'on' : ''}>{l}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>}
              <dl className="specs">
                <div><dt>소재</dt><dd>{dt.fabric}</dd></div>
                <div><dt>계절</dt><dd>{dt.season}</dd></div>
                {photo[`${p.id}-model-1`] && <div><dt>모델</dt><dd>{dt.models.map(([who, body, wear]) => <p key={who}>{who} {body} · {wear}</p>)}</dd></div>}
              </dl>
              <details className="pd-size">
                <summary>실측 사이즈 (cm)</summary>
                <div className="pd-table">
                  <table>
                    <thead><tr>{dt.size.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{dt.size.rows.map((r) => <tr key={r[0]}>{r.map((v, k) => <td key={k}>{v}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>

      {zoom && (
        <div className="zoom" role="dialog" aria-label="크게 보기" onClick={() => setZoom(null)}
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--zx', `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty('--zy', `${((e.clientY - r.top) / r.height) * 100}%`); }}>
          <ProductImage p={p} c={c} view={zoom} eager />
          <button className="zoom-x" onClick={() => setZoom(null)}>닫기</button>
        </div>
      )}


      <Reviews p={p} />

      <section>
        <h2 className="h2">비슷한 무드</h2>
        <Grid ids={similar(p)} />
      </section>
      {viewed.length > 1 && (
        <section>
          <h2 className="h2">최근 본 옷</h2>
          <Grid ids={viewed.filter((x) => x !== p.id).slice(0, 4)} />
        </section>
      )}
    </div>
  );
}
