import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../media.jsx';
import { photo } from '../photos.js';

// Wordmark letters split out so they can rise in one by one.
const LETTERS = [
  <path key="u" d="M0 0h26v62a24 24 0 0 0 48 0V0h26v62a50 50 0 0 1-100 0Z" />,
  <path key="n" transform="translate(114 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />,
  <rect key="i" x="228" y="0" width="26" height="100" />,
  <ellipse key="o" cx="318" cy="50" rx="37" ry="37" fill="none" stroke="#1B1B1A" strokeWidth="26" />,
  <path key="n2" transform="translate(382 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />,
];

export default function Home() {
  const label = useRef(null);
  // Subtle tilt toward the pointer; skipped on touch and for reduced motion.
  const tilt = (e) => {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    label.current?.style.setProperty('transform', `translate(-50%, -50%) perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`);
  };
  return (
    <>
    <section className="hero home-hero" onPointerMove={tilt}>
      <Photo name="look-l03" alt="UNION FW26 캠페인" className="hero-photo" eager fallback={
        <div className="hero-fallback" aria-hidden="true">
          <svg className="hf-label" ref={label} viewBox="-8 -8 656 176">
            <defs>
              <pattern id="weave" width="6" height="3" patternUnits="userSpaceOnUse"><rect width="6" height="1" fill="#000" opacity=".05" /></pattern>
            </defs>
            <line className="hm-thread" x1="600" y1="-1400" x2="600" y2="1560" pathLength="1" />
            <rect className="hm-outline" width="640" height="160" rx="12" pathLength="1" />
            <rect className="hm-fill" width="640" height="160" rx="12" />
            <rect className="hm-fill" width="640" height="160" rx="12" fill="url(#weave)" />
            <path className="hm-tab" d="M560 0h68a12 12 0 0 1 12 12v136a12 12 0 0 1-12 12h-68Z" />
            <g transform="translate(50 38) scale(0.84)">
              {LETTERS.map((d, i) => <g key={i} className="hm-letter" style={{ animationDelay: `${0.9 + i * 0.09}s` }}>{d}</g>)}
            </g>
          </svg>
        </div>
      } />
      <p className="hh-corner hh-left">FW26 COLLECTION</p>
      <nav className="hh-corner hh-right" aria-label="바로가기">
        <Link to="/shop">Shop</Link>
        <Link to="/lookbook">Lookbook</Link>
      </nav>
    </section>
    {photo['lookbook-1'] && (
      <Link to="/lookbook" className="home-look" aria-label="룩북 보기">
        <Photo name="lookbook-1" alt="Lookbook FW26" />
        <span className="home-look-cap">Lookbook · FW26<span aria-hidden="true">→</span></span>
      </Link>
    )}
    </>
  );
}
