import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles, byId } from '../data.js';
import { Photo, ProductImage } from '../media.jsx';

const ISSUE = 'Issue 01';
const CATS = ['All', ...new Set(articles.map((a) => a.kicker))];

// Story card, modelled on print-magazine indexes: picture, category and issue, title, one-line dek.
function Card({ a, lead }) {
  return (
    <Link to={`/magazine/${a.id}`} className={`jc ${lead ? 'jc-lead' : ''}`}>
      <div className="jc-img" style={{ background: a.tone }}>
        <Photo name={`journal-${a.id}`} alt={a.title} fallback={null} />
      </div>
      <p className="jc-meta">{a.kicker} · {ISSUE}</p>
      <h2 className="jc-title">{a.title}</h2>
      <p className="jc-dek">{a.lede}</p>
    </Link>
  );
}

export default function Magazine() {
  const [cat, setCat] = useState('All');
  const list = articles.filter((a) => cat === 'All' || a.kicker === cat);
  const [lead, ...rest] = list;
  return (
    <div className="wrap journal">
      <header className="jr-head">
        <h1 className="jr-mast">Journal</h1>
        <nav className="jr-cats" aria-label="카테고리">
          {CATS.map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
        </nav>
      </header>
      {lead && <Card a={lead} lead />}
      <div className="jc-grid">{rest.map((a) => <Card key={a.id} a={a} />)}</div>
    </div>
  );
}

export function Article() {
  const { id } = useParams();
  const a = articles.find((x) => x.id === id);
  if (!a) return <div className="wrap page"><h1>없는 글이에요</h1><Link to="/magazine" className="btn">저널로</Link></div>;
  const related = articles.filter((x) => x.id !== a.id).slice(0, 3);
  const mid = Math.ceil(a.body.length / 2);
  const para = (t, k) => (t.startsWith('## ') ? <h2 key={k}>{t.slice(3)}</h2> : <p key={k}>{t}</p>);
  const credits = [['Words', 'UNION Editorial'], ['Photography', 'UNION Studio'], ['Clothing', 'UNION FW26']];

  return (
    <article className="article">
      <figure className="art-hero">
        <div className="art-hero-img" style={{ background: a.tone }}>
          <Photo name={`journal-${a.id}`} alt={a.title} eager fallback={null} />
        </div>
      </figure>
      <header className="art-head-in">
        <p className="art-k">{a.kicker} · {ISSUE}</p>
        <h1>{a.title}</h1>
        <p className="art-lede">{a.lede}</p>
        <dl className="art-credits">
          {credits.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </header>
      <div className="art-body">
        {a.body.slice(0, mid).map(para)}
      </div>
      <div className="art-figs">
        {a.shop.slice(0, 2).map((pid) => (
          <figure key={pid}>
            <Link to={`/product/${pid}`} className="art-fig-img"><ProductImage p={byId[pid]} /></Link>
            <figcaption>{byId[pid].ko} — UNION {byId[pid].name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="art-body">
        <blockquote className="art-quote">{a.quote}</blockquote>
        {a.body.slice(mid).map((t, k) => para(t, k + mid))}
      </div>
      <section className="wrap art-related">
        <h2>More from the Journal</h2>
        <div className="jc-grid three">{related.map((r) => <Card key={r.id} a={r} />)}</div>
      </section>
    </article>
  );
}
