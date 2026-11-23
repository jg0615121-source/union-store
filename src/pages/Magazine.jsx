import { Link, useParams } from 'react-router-dom';
import { articles, byId, won } from '../data.js';
import { Garment } from '../garments.jsx';
import { ProductImage, Reveal } from '../media.jsx';

// Cover art for a story: the first featured garment's print, enlarged on the story's colour.
function Cover({ a, className = '' }) {
  const p = byId[a.shop[0]];
  return (
    <div className={`mag-cover ${className}`} style={{ background: a.tone, color: a.fg }}>
      <div className="mag-cover-art"><Garment product={p} c={0} view="detail" /></div>
      <span className="mag-cover-k">{a.kicker}</span>
    </div>
  );
}

export default function Magazine() {
  const [lead, ...rest] = articles;
  return (
    <div className="wrap page">
      <header className="page-head"><p className="kicker">Journal</p><h1>읽을거리</h1></header>
      <Link to={`/magazine/${lead.id}`} className="mag-lead">
        <Cover a={lead} />
        <div className="mag-lead-copy">
          <p className="kicker">{lead.kicker} · {lead.minutes}분</p>
          <h2>{lead.title}</h2>
          <p>{lead.lede}</p>
          <span className="more">읽기</span>
        </div>
      </Link>
      <div className="mag-grid">
        {rest.map((a) => (
          <Reveal key={a.id} as={Link} to={`/magazine/${a.id}`} className="mag-item">
            <Cover a={a} />
            <p className="kicker">{a.kicker} · {a.minutes}분</p>
            <h3>{a.title}</h3>
            <p>{a.lede}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Article() {
  const { id } = useParams();
  const i = articles.findIndex((x) => x.id === id);
  const a = articles[i];
  if (!a) return <div className="wrap page"><h1>없는 글이에요</h1><Link to="/magazine" className="btn">매거진으로</Link></div>;
  const next = articles[(i + 1) % articles.length];
  const mid = Math.ceil(a.body.length / 2);
  const para = (t, k) => (t.startsWith('## ') ? <h2 key={k}>{t.slice(3)}</h2> : <p key={k}>{t}</p>);

  return (
    <article className="article">
      <header className="art-head" style={{ background: a.tone, color: a.fg }}>
        <div className="art-head-in">
          <p className="art-k">{a.kicker} · {a.minutes}분 읽기 · UNION Journal</p>
          <h1>{a.title}</h1>
          <p className="art-lede">{a.lede}</p>
        </div>
      </header>
      <div className="art-body">
        {a.body.slice(0, mid).map(para)}
        <blockquote className="art-quote">{a.quote}</blockquote>
        {a.body.slice(mid).map((t, k) => para(t, k + mid))}
      </div>
      <section className="art-shop">
        <p className="kicker">Shop the story</p>
        <div className="art-shop-row">
          {a.shop.map((pid) => (
            <Link key={pid} to={`/product/${pid}`} className="art-prod">
              <div className="art-prod-img"><ProductImage p={byId[pid]} /></div>
              <span>{byId[pid].name}</span>
              <span className="muted">{won(byId[pid].price)}</span>
            </Link>
          ))}
        </div>
      </section>
      <Link to={`/magazine/${next.id}`} className="art-next" style={{ background: next.tone, color: next.fg }}>
        <span className="kicker" style={{ color: 'inherit', opacity: 0.7 }}>다음 글</span>
        <span className="art-next-t">{next.title}</span>
      </Link>
    </article>
  );
}
