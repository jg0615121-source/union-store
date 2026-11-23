import { Link, useParams } from 'react-router-dom';
import { articles } from '../data.js';

export default function Magazine() {
  const [lead, ...rest] = articles;
  return (
    <div className="wrap page">
      <header className="page-head"><p className="kicker">MAGAZINE</p><h1>읽을거리</h1></header>
      <Link to={`/magazine/${lead.id}`} className="mag-lead">
        <p className="kicker">{lead.kicker} · {lead.minutes}분</p>
        <h2>{lead.title}</h2>
        <p>{lead.lede}</p>
      </Link>
      <div className="mag-row">
        {rest.map((a) => (
          <Link key={a.id} to={`/magazine/${a.id}`} className="mag-card">
            <p className="kicker">{a.kicker} · {a.minutes}분</p>
            <h3>{a.title}</h3>
            <p>{a.lede}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Article() {
  const { id } = useParams();
  const a = articles.find((x) => x.id === id);
  if (!a) return <div className="wrap page"><h1>없는 글이에요</h1><Link to="/magazine" className="btn">매거진으로</Link></div>;
  return (
    <article className="wrap page article">
      <p className="kicker">{a.kicker} · {a.minutes}분 읽기</p>
      <h1>{a.title}</h1>
      <p className="lede">{a.lede}</p>
      {a.body.map((t) => <p key={t}>{t}</p>)}
      <div className="article-end">
        <Link to="/shop" className="btn">컬렉션 보기</Link>
        <Link to="/magazine" className="btn ghost">다른 글 읽기</Link>
      </div>
    </article>
  );
}
