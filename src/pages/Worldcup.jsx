import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GROUP, byId, looks, won } from '../data.js';
import { Grid, LookArt } from '../components.jsx';
import { useStore } from '../store.jsx';
import { scoreByTags } from '../recommend.js';

const ROUND = { 16: '16강', 8: '8강', 4: '준결승', 2: '결승' };
const TAG_KO = { street: '스트릿', clean: '깔끔', bold: '컬러 포인트', mono: '무채색', oversize: '넉넉한 핏', fitted: '딱 맞는 핏', trend: '트렌드', essential: '기본템' };
const shuffle = (xs) => xs.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

export default function Worldcup() {
  const { setProfile, addToCart } = useStore();
  const [pool, setPool] = useState(() => shuffle(looks));
  const [next, setNext] = useState([]);
  const [picked, setPicked] = useState([]);
  const [pick, setPick] = useState(null);

  const roundSize = pool.length + next.length * 2;
  const winner = pool.length === 1 && next.length === 0 ? pool[0] : null;

  const choose = (l) => {
    setPick(l.id);
    setTimeout(() => {
      const rest = pool.slice(2);
      const nx = [...next, l];
      const all = [...picked, l];
      setPicked(all);
      setPick(null);
      if (rest.length) { setPool(rest); setNext(nx); return; }
      setPool(nx);
      setNext([]);
      if (nx.length === 1) {
        const tally = all.flatMap((x) => x.tags);
        setProfile({ code: 'CUP', name: nx[0].name, tags: tally });
      }
    }, 260);
  };
  const reset = () => { setPool(shuffle(looks)); setNext([]); setPicked([]); };

  if (winner) {
    const count = {};
    for (const t of picked.flatMap((x) => x.tags)) count[t] = (count[t] || 0) + 1;
    const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 3);
    return (
      <div className="wrap page">
        <section className="cup-win">
          <LookArt look={winner} />
          <div>
            <p className="kicker">내 이상형 코디</p>
            <h1>{winner.name}</h1>
            <p>고른 15번을 모아보면 <b>{top.map(([t]) => TAG_KO[t]).join(', ')}</b> 쪽으로 기울어 있어요.</p>
            <ul className="cup-items">
              {winner.items.map(([id, c]) => <li key={id}><Link to={`/product/${id}`}>{byId[id].ko}</Link><span>{byId[id].colors[c].name}</span></li>)}
            </ul>
            <div className="hero-cta">
              <button className="btn" onClick={() => winner.items.forEach(([id, c]) => addToCart(id, c, GROUP[byId[id].cat] === 'acc' ? 'FREE' : 'M'))}>
                이 코디 담기 · {won(winner.items.reduce((a, [id]) => a + byId[id].price, 0))}
              </button>
              <button className="btn ghost" onClick={reset}>다시 하기</button>
            </div>
          </div>
        </section>
        <section><h2 className="h2">내 취향에 맞는 옷</h2><Grid ids={scoreByTags(picked.flatMap((x) => x.tags)).slice(0, 4)} /></section>
      </div>
    );
  }

  const round = ROUND[roundSize] || `${roundSize}강`;
  const match = (roundSize - pool.length) / 2 + 1;
  const [a, b] = pool;
  return (
    <div className="wrap page cup">
      <header className="page-head">
        <p className="kicker">코디 이상형 월드컵 · {round} {roundSize > 2 && `${match} / ${roundSize / 2}`}</p>
        <h1>둘 중에 더 끌리는 코디는?</h1>
      </header>
      <div className="cup-pair">
        {[a, b].map((l) => (
          <button key={l.id} className={`cup-card ${pick === l.id ? 'won' : pick ? 'lost' : ''}`} onClick={() => !pick && choose(l)}>
            <LookArt look={l} />
            <strong>{l.name}</strong>
            <span>{l.items.map(([id]) => byId[id].ko).join(' + ')}</span>
          </button>
        ))}
      </div>
      <p className="vs" aria-hidden="true">VS</p>
    </div>
  );
}
