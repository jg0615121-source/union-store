import { useState } from 'react';
import { CUPS } from '../worldcup.js';
import { photo } from '../photos.js';

const ROUND = { 16: '16강', 8: '8강', 4: '준결승', 2: '결승' };
const shuffle = (xs) => xs.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);
const entries = (key) => CUPS[key].list.map(([name, line], i) => ({ id: `${key}-${i + 1}`, name, line }));

// Photos are optional: drop src/assets/photos/cup-<theme>-<n>.webp (n = 1..16, list order) and it shows up.
function Pic({ e }) {
  const src = photo[`cup-${e.id}`];
  return src ? <img src={src} alt={e.name} className="cup-photo" loading="lazy" decoding="async" /> : <p className="cup-text">{e.name}</p>;
}

function Intro({ onPick }) {
  return (
    <div className="wrap page cup-intro">
      <header className="page-head">
        <p className="kicker">Play · 이상형 월드컵</p>
        <h1>골라봐요</h1>
      </header>
      <div className="cup-themes">
        {Object.entries(CUPS).map(([key, c]) => (
          <button key={key} className="cup-theme" style={{ background: c.bg, color: c.fg }} onClick={() => onPick(key)}>
            <span className="cup-theme-n">16강</span>
            <span className="cup-theme-t">{c.title}<span aria-hidden="true">→</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Worldcup() {
  const [key, setKey] = useState(null);
  const [pool, setPool] = useState([]);
  const [next, setNext] = useState([]);
  const [last, setLast] = useState(null);
  const [pick, setPick] = useState(null);
  const [copied, setCopied] = useState(false);

  const start = (k) => { setKey(k); setPool(shuffle(entries(k))); setNext([]); setLast(null); setCopied(false); };
  if (!key) return <Intro onPick={start} />;

  const cup = CUPS[key];
  const roundSize = pool.length + next.length * 2;
  const winner = pool.length === 1 && next.length === 0 ? pool[0] : null;

  const choose = (e, other) => {
    setPick(e.id);
    setTimeout(() => {
      const rest = pool.slice(2);
      const nx = [...next, e];
      setPick(null);
      if (pool.length === 2 && next.length === 0) setLast(other);
      if (rest.length) { setPool(rest); setNext(nx); return; }
      setPool(nx);
      setNext([]);
    }, 260);
  };

  if (winner) {
    return (
      <div className="cup-stage" style={{ background: cup.bg, color: cup.fg }}>
        <div className="wrap cup-win">
          <div className="cup-win-fig" style={{ background: cup.card, color: '#1B1B1A' }}><Pic e={winner} /></div>
          <div>
            <p className="kicker">{cup.win}</p>
            <h1>{winner.name}</h1>
            <p className="cup-line">{winner.line}</p>
            {last && <p className="cup-runner">준우승 · {last.name}</p>}
            <div className="hero-cta">
              <button className="btn" style={{ background: cup.fg, color: cup.bg, borderColor: cup.fg }} onClick={() => navigator.clipboard?.writeText(`${cup.title} 내 1위: ${winner.name}`).then(() => setCopied(true), () => {})}>{copied ? '복사했어요' : '결과 복사하기'}</button>
              <button className="btn ghost" onClick={() => start(key)}>다시 하기</button>
              <button className="btn ghost" onClick={() => setKey(null)}>다른 월드컵</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const round = ROUND[roundSize] || `${roundSize}강`;
  const match = (roundSize - pool.length) / 2 + 1;
  const [a, b] = pool;
  return (
    <div className="cup-stage">
      <div className="wrap cup">
        <header className="cup-head">
          <p className="cup-round">{round}</p>
          <div className="cup-meta">
            <span className="kicker">{cup.title} · {cup.ask}</span>
            {roundSize > 2 && <span className="cup-dots">{Array.from({ length: roundSize / 2 }, (_, k) => <i key={k} className={k < match - 1 ? 'done' : k === match - 1 ? 'now' : ''} />)}</span>}
          </div>
        </header>
        <div className="cup-pair">
          {[[a, b], [b, a]].map(([e, other]) => (
            <button key={e.id} className={`cup-card ${pick === e.id ? 'won' : pick ? 'lost' : ''}`} onClick={() => !pick && choose(e, other)} style={{ '--cup-bg': cup.card }}>
              <div className="cup-fig"><Pic e={e} /></div>
              {photo[`cup-${e.id}`] && <strong>{e.name}</strong>}
            </button>
          ))}
        </div>
        <p className="vs" aria-hidden="true">VS</p>
      </div>
    </div>
  );
}
