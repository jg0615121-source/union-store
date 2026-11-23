import { Link } from 'react-router-dom';
import { looks, products } from '../data.js';
import { Logo } from '../garments.jsx';
import { Grid, LookArt } from '../components.jsx';
import { Photo, Reveal } from '../media.jsx';

export default function Home() {
  const editorial = [looks.find((l) => l.id === 'l01'), looks.find((l) => l.id === 'l02')];
  return (
    <>
      <section className="hero">
        <Photo name="look-l03" alt="UNION FW26 캠페인" className="hero-photo" eager fallback={
          <div className="hero-fallback" aria-hidden="true">
            <div className="hf-label"><Logo ink="#ECECEA" paper="#1B1B1A" height="100%" /></div>
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
