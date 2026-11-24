import { Link, useParams } from 'react-router-dom';
import { articles, byId } from '../data.js';
import { ProductImage } from '../media.jsx';

const no = (i) => `No.${String(i + 1).padStart(2, '0')}`;

// Journal index: set like a magazine contents page, one story per row.
export default function Magazine() {
  return (
    <div className="journal">
      <header className="wrap jr-head">
        <p className="jr-mast">UNION JOURNAL</p>
        <p className="jr-issue">FW26 · {articles.length} stories</p>
      </header>
      <ol className="wrap jr-list">
        {articles.map((a, i) => (
          <li key={a.id}>
            <Link to={`/magazine/${a.id}`} className="jr-row" style={{ '--tone': a.tone, '--tfg': a.fg }}>
              <span className="jr-no">{no(i)}</span>
              <span className="jr-title">{a.title}</span>
              <span className="jr-meta">{a.kicker} · {a.minutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Article() {
  const { id } = useParams();
  const i = articles.findIndex((x) => x.id === id);
  const a = articles[i];
  if (!a) return <div className="wrap page"><h1>없는 글이에요</h1><Link to="/magazine" className="btn">저널로</Link></div>;
  const next = articles[(i + 1) % articles.length];
  const mid = Math.ceil(a.body.length / 2);
  const para = (t, k) => (t.startsWith('## ') ? <h2 key={k}>{t.slice(3)}</h2> : <p key={k}>{t}</p>);

  return (
    <article className="article">
      <header className="art-head">
        <div className="art-head-in">
          <p className="art-k"><span>{no(i)}</span><span>{a.kicker}</span><span>{a.minutes} min</span></p>
          <h1>{a.title}</h1>
          <p className="art-lede">{a.lede}</p>
        </div>
      </header>
      <div className="art-body">
        {a.body.slice(0, mid).map(para)}
        <blockquote className="art-quote">{a.quote}</blockquote>
        {a.body.slice(mid).map((t, k) => para(t, k + mid))}
      </div>
      <aside className="art-shop">
        {a.shop.map((pid) => (
          <Link key={pid} to={`/product/${pid}`} className="art-prod">
            <div className="art-prod-img"><ProductImage p={byId[pid]} /></div>
            <span>{byId[pid].name}</span>
          </Link>
        ))}
      </aside>
      <Link to={`/magazine/${next.id}`} className="art-next">
        <span className="jr-no">{no((i + 1) % articles.length)}</span>
        <span className="art-next-t">{next.title}</span>
      </Link>
    </article>
  );
}
