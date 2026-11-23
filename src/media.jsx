import { useEffect, useRef, useState } from 'react';
import { photo } from './photos.js';
import { Garment } from './garments.jsx';

// Photo when we have one, the illustration otherwise.
export function ProductImage({ p, c = 0, view = 'front', className = '', eager }) {
  const src = view === 'front' ? photo[`${p.id}-${c}`] : null;
  const [loaded, setLoaded] = useState(false);
  if (src) {
    return (
      <img src={src} alt={`${p.ko} ${p.colors[c].name}`} className={`photo ${loaded ? 'ready' : ''} ${className}`}
        loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} />
    );
  }
  return <Garment product={p} c={c} view={view} className={className} />;
}

export function Photo({ name, alt, className = '', eager, fallback = null }) {
  const [loaded, setLoaded] = useState(false);
  if (!photo[name]) return fallback;
  return <img src={photo[name]} alt={alt} className={`photo ${loaded ? 'ready' : ''} ${className}`} loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} />;
}

// Lifts a block into place the first time it scrolls into view. Content is never hidden at rest.
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return; // already on screen: leave it be
    setState('pre');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState('in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className} reveal ${state}`} {...rest}>{children}</Tag>;
}
