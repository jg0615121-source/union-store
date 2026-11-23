import { Link } from 'react-router-dom';
import { looks, products } from '../data.js';
import { Grid, LookArt } from '../components.jsx';
import { Photo, Reveal } from '../media.jsx';

// Wordmark letters split out so they can rise in one by one.
const LETTERS = [
  <path key="u" d="M0 0h26v62a24 24 0 0 0 48 0V0h26v62a50 50 0 0 1-100 0Z" />,
  <path key="n" transform="translate(114 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />,
  <rect key="i" x="228" y="0" width="26" height="100" />,
  <ellipse key="o" cx="318" cy="50" rx="37" ry="37" fill="none" stroke="#1B1B1A" strokeWidth="26" />,
  <path key="n2" transform="translate(382 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />,
];

export default function Home() {
  const editorial = [looks.find((l) => l.id === 'l01'), looks.find((l) => l.id === 'l02')];
  return (
    <>
      <section className="hero">
        <Photo name="look-l03" alt="UNION FW26 캠페인" className="hero-photo" eager fallback={
          <div className="hero-fallback" aria-hidden="true">
            <svg className="hf-label" viewBox="-8 -8 656 176">
              <rect className="hm-outline" width="640" height="160" rx="12" pathLength="1" />
              <rect className="hm-fill" width="640" height="160" rx="12" />
              <path className="hm-tab" d="M560 0h68a12 12 0 0 1 12 12v136a12 12 0 0 1-12 12h-68Z" />
              <g transform="translate(50 38) scale(0.84)">
                {LETTERS.map((d, i) => <g key={i} className="hm-letter" style={{ animationDelay: `${0.9 + i * 0.09}s` }}>{d}</g>)}
              </g>
            </svg>
          </div>
        } />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker">Collection</p>
          <h1>FW26</h1>
          <div className="hero-links">
            <Link to="/shop">컬렉션 보기</Link>
            <Link to="/lookbook">룩북 보기</Link>
          </div>
        </div>
      </section>

      <div className="wrap home-shop">
        <header className="shead">
          <h2>FW26</h2>
          <Link to="/shop" className="more">전체 보기</Link>
        </header>
        <Grid ids={[...products].sort((a, b) => a.rank - b.rank).slice(0, 8).map((p) => p.id)} />
      </div>

      <section className="edit2">
        {editorial.map((l) => (
          <Reveal key={l.id} as={Link} to="/lookbook" className="edit-tile">
            <LookArt look={l} />
            <div className="edit-cap">
              <span>{l.name}</span>
              <span className="u">룩북 보기</span>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
