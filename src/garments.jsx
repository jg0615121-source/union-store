import { useId } from 'react';

const GREEN = '#00A84D';
const DISPLAY = "'Archivo', 'Pretendard Variable', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const KR = "'Pretendard Variable', 'Pretendard', sans-serif";

export const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 140;
};

// UNION wordmark drawn from geometry so it never depends on a font loading. 482 x 100.
export function LogoMark({ ink = 'currentColor', ring = ink, dot = GREEN }) {
  return (
    <g>
      <path fill={ink} d="M0 0h26v62a24 24 0 0 0 48 0V0h26v62a50 50 0 0 1-100 0Z" />
      <path fill={ink} transform="translate(114 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />
      <rect fill={ink} x="228" y="0" width="26" height="100" />
      <circle cx="318" cy="50" r="37" fill="none" stroke={ring} strokeWidth="26" />
      <circle cx="344" cy="24" r="7" fill={dot} />
      <path fill={ink} transform="translate(382 0)" d="M0 100V0h26l48 58V0h26v100H74L26 42v58Z" />
    </g>
  );
}

export function Logo({ height = 22, ink = 'currentColor', ring, title = 'UNION' }) {
  return (
    <svg viewBox="0 0 482 100" height={height} role="img" aria-label={title} style={{ display: 'block' }}>
      <LogoMark ink={ink} ring={ring ?? ink} />
    </svg>
  );
}

// Each print sits in a ~200 x 200 box centred on (0,0).
const STATIONS = 20;
const PRINTS = {
  wordmark: ({ ink }) => (
    <g transform="translate(-96 -20) scale(0.4)">
      <LogoMark ink={ink} ring={ink} />
    </g>
  ),
  arch: ({ ink }) => {
    const id = 'arch-path';
    return (
      <g>
        <defs><path id={id} d="M-96 30a96 96 0 0 1 192 0" /></defs>
        <text fill={ink} fontFamily={DISPLAY} fontWeight="900" fontSize="46" style={{ fontStretch: '125%' }} letterSpacing="2">
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">UNION</textPath>
        </text>
        <circle cx="0" cy="30" r="9" fill={GREEN} />
        <text y="66" textAnchor="middle" fill={ink} fontFamily={MONO} fontSize="12" letterSpacing="6">EVERYDAY</text>
      </g>
    );
  },
  market: ({ ink }) => {
    const id = 'market-ring';
    return (
      <g fill={ink}>
        <circle r="82" fill="none" stroke={ink} strokeWidth="4" />
        <circle r="70" fill="none" stroke={ink} strokeWidth="1.5" />
        <defs><path id={id} d="M-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs>
        <text fontFamily={MONO} fontSize="11" letterSpacing="4"><textPath href={`#${id}`}>UNION · EVERYDAY · UNION · EVERYDAY · </textPath></text>
        <text y="12" textAnchor="middle" fontFamily={DISPLAY} fontWeight="900" fontSize="40" style={{ fontStretch: '125%' }}>U</text>
        
      </g>
    );
  },
  blank: ({ ink }) => (
    <g transform="translate(-14 -14)">
      <circle cx="14" cy="14" r="10" fill="none" stroke={ink} strokeWidth="5" />
      <circle cx="21" cy="7" r="2.6" fill={GREEN} />
    </g>
  ),
};
PRINTS.none = () => null;
PRINTS.crosswalk = PRINTS.wordmark;

function Print({ kind, ink, base, x, y, s }) {
  const P = PRINTS[kind] || PRINTS.none;
  return <g transform={`translate(${x} ${y}) scale(${s})`}><P ink={ink} base={base} /></g>;
}

const TEE = 'M150 58C170 80 230 80 250 58L302 72L362 122L326 168L296 146L299 402Q200 410 101 402L104 146L74 168L38 122L98 72Z';
const LONG = 'M150 58C170 80 230 80 250 58L302 72Q340 96 352 150L378 330L342 340L304 176L299 402Q200 410 101 402L96 176L58 340L22 330L48 150Q60 96 98 72Z';
const COAT = 'M150 58C170 80 230 80 250 58L302 72Q340 96 352 150L378 330L342 340L304 176L306 432Q200 438 94 432L96 176L58 340L22 330L48 150Q60 96 98 72Z';
const PANTS = 'M118 40H282L304 408H214L200 150L186 408H96Z';
const SHORTS = 'M118 90H282L300 300H212L200 190L188 300H100Z';

// Where the chest print and the big back print go, per category.
const PLACE = {
  tee: { front: [254, 146, 0.2], back: [200, 214, 0.86] },
  longsleeve: { front: [254, 146, 0.2], back: [200, 214, 0.86] },
  crew: { front: [254, 148, 0.2], back: [200, 214, 0.86] },
  hoodie: { front: [254, 150, 0.2], back: [200, 206, 0.86] },
  jacket: { front: [252, 146, 0.24], back: [200, 200, 1.0] },
  varsity: { front: [250, 150, 0.32], back: [200, 205, 0.95] },
};

// Line 2 tab: the small green woven tab every UNION piece carries at the hem.
const Tab = ({ x, y }) => <rect x={x} y={y} width="9" height="20" rx="1" fill={GREEN} />;

function Body({ product, base, ink, tone, seam, view, gid, paint }) {
  const { cat, print } = product;
  const place = PLACE[cat];
  const shape = cat === 'tee' ? TEE : cat === 'coat' ? COAT : LONG;
  const hem = cat === 'coat' ? 410 : 368;
  const contrast = isLight(base) ? '#1A1B1D' : '#F2F2EF';
  return (
    <g>
      {cat === 'hoodie' && <path d="M138 70C116 6 284 6 262 70C246 52 154 52 138 70Z" fill={base} stroke={seam} strokeWidth="2" />}
      <path d={shape} fill={paint} stroke={seam} strokeWidth="2" strokeLinejoin="round" />
      {(cat === 'blazer' || cat === 'coat') && view === 'front' && (
        <g fill="none" stroke={seam} strokeWidth="2">
          <path d={cat === 'blazer' ? 'M150 58L176 150L200 214L224 150L250 58' : 'M150 58L184 120L200 104L216 120L250 58'} />
          <path d={cat === 'blazer' ? 'M200 214V404' : 'M200 104V432'} />
          {(cat === 'blazer' ? [250, 300] : [160, 220, 280]).map((y) => <circle key={y} cx="208" cy={y} r="4.5" fill={seam} />)}
          {cat === 'blazer' && <path d="M126 300H170M230 300H274M236 168H270" />}
          {cat === 'coat' && <path d="M150 58L104 150M250 58L296 150M124 290L130 340M276 290L270 340" />}
        </g>
      )}
      {cat === 'knit' && (
        <g fill="none" stroke={seam} strokeWidth="1.5">
          <path d="M103 378Q200 386 299 378M104 388Q200 396 298 388" />
          <path d="M24 318L60 328M376 318L340 328" />
        </g>
      )}
      {cat === 'varsity' && (
        <g fill={contrast}>
          <path d="M302 72Q340 96 352 150L378 330L342 340L304 176Z" />
          <path d="M98 72Q60 96 48 150L22 330L58 340L96 176Z" />
        </g>
      )}
      <path d={shape} fill={`url(#${gid})`} />
      <path d="M150 58C170 80 230 80 250 58" fill="none" stroke={seam} strokeWidth="4" />
      {(cat === 'crew' || cat === 'varsity') && (
        <g fill="none" stroke={seam} strokeWidth="1.5">
          <path d="M103 380Q200 388 299 380" />
          <path d="M24 318L60 328M376 318L340 328" />
        </g>
      )}
      {cat === 'varsity' && <path d="M103 392Q200 400 299 392" stroke={GREEN} strokeWidth="5" fill="none" />}
      {cat === 'hoodie' && view === 'front' && (
        <g fill="none" stroke={seam} strokeWidth="2">
          <path d="M140 300H260L276 366H124Z" />
          <path d="M184 76V130M216 76V124" strokeLinecap="round" />
        </g>
      )}
      {cat === 'jacket' && view === 'front' && (
        <g stroke={seam} strokeWidth="2" fill="none">
          <path d="M150 58L182 112L200 90L218 112L250 58" />
          <path d="M200 90V404" />
          {[140, 200, 260, 320, 380].map((y) => <circle key={y} cx="200" cy={y} r="4" fill={seam} />)}
        </g>
      )}
      <Tab x={view === 'front' ? (cat === 'coat' ? 294 : 290) : 101} y={hem} />
      <g fill="none" stroke={seam} strokeWidth="1" opacity="0.4">
        <path d="M104 146Q150 170 140 260" />
        <path d="M296 146Q250 172 262 270" />
      </g>
      {print === 'wordmark-big' && view === 'front' && <Print kind="wordmark" ink={ink} base={base} x={200} y={196} s={0.6} />}
      {place && view !== 'front' && <Print kind={print} ink={ink} base={base} x={place.back[0]} y={place.back[1]} s={place.back[2]} />}
      {place && view === 'front' && print !== 'none' && (
        <Print kind={['jacket', 'varsity'].includes(cat) && print !== 'line2' ? 'blank' : print} ink={tone} base={base}
          x={place.front[0]} y={place.front[1]} s={['jacket'].includes(cat) ? 1 : place.front[2]} />
      )}
    </g>
  );
}

function Bottom({ product, base, ink, seam, gid, view }) {
  const shorts = product.cat === 'shorts';
  const shape = shorts ? SHORTS : PANTS;
  const top = shorts ? 90 : 40;
  return (
    <g>
      <path d={shape} fill={base} stroke={seam} strokeWidth="2" strokeLinejoin="round" />
      <path d={shape} fill={`url(#${gid})`} />
      <rect x="118" y={top} width="164" height="26" fill="none" stroke={seam} strokeWidth="2" />
      <path d={`M200 ${top + 26}V${top + 96}`} stroke={seam} strokeWidth="2" />
      <path d={`M130 ${top + 30}Q150 ${top + 70} 136 ${top + 92}M270 ${top + 30}Q250 ${top + 70} 264 ${top + 92}`} fill="none" stroke={seam} strokeWidth="1.5" />
      {product.print === 'crosswalk' && (
        <g stroke={GREEN} strokeWidth="3" fill="none">
          <path d={`M118 ${top + 26}L96 408`} />
          <path d={`M282 ${top + 26}L304 408`} />
        </g>
      )}
      <Tab x={262} y={top + 26} />
      {product.print === 'wordmark' && view === 'front' && <Print kind="wordmark" ink={ink} base={base} x={244} y={shorts ? 250 : 360} s={0.3} />}
    </g>
  );
}

function Accessory({ product, base, ink, seam, gid, paint }) {
  switch (product.cat) {
    case 'cap':
      return (
        <g>
          <path d="M86 268C80 120 320 120 314 268Z" fill={paint} stroke={seam} strokeWidth="2" />
          <path d="M86 268C80 120 320 120 314 268Z" fill={`url(#${gid})`} />
          <path d="M200 160V268M150 166Q126 210 130 268M250 166Q274 210 270 268" fill="none" stroke={seam} strokeWidth="1.5" />
          <circle cx="200" cy="160" r="7" fill={base} stroke={seam} strokeWidth="2" />
          <path d="M64 266Q200 352 336 266Q200 300 64 266Z" fill={paint} stroke={seam} strokeWidth="2" />
          <Print kind={product.print === 'camo' ? 'blank' : product.print} ink={ink} base={base} x={200} y={214} s={0.42} />
        </g>
      );
    case 'beanie':
      return (
        <g>
          <path d="M118 330V190C118 70 282 70 282 190V330Z" fill={base} stroke={seam} strokeWidth="2" />
          {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${128 + i * 10.3} 120V330`} stroke={seam} strokeWidth="1" opacity="0.5" />)}
          <rect x="110" y="252" width="180" height="84" fill={base} stroke={seam} strokeWidth="2" />
          <path d="M118 330V190C118 70 282 70 282 190V330Z" fill={`url(#${gid})`} />
          <rect x="176" y="270" width="48" height="48" fill={isLight(base) ? '#1A1B1D' : '#F7F7F5'} />
          <Print kind="blank" ink={isLight(base) ? '#F7F7F5' : '#1A1B1D'} base={base} x={200} y={294} s={1.1} />
        </g>
      );
    case 'tote':
      return (
        <g>
          <path d="M150 150C150 60 250 60 250 150" fill="none" stroke={base} strokeWidth="16" />
          <path d="M150 150C150 60 250 60 250 150" fill="none" stroke={seam} strokeWidth="1.5" />
          <rect x="96" y="140" width="208" height="260" fill={base} stroke={seam} strokeWidth="2" />
          <rect x="96" y="140" width="208" height="260" fill={`url(#${gid})`} />
          <Print kind={product.print} ink={ink} base={base} x={200} y={272} s={0.86} />
        </g>
      );
    case 'socks':
      return (
        <g>
          {[[150, -6], [250, 6]].map(([x, r]) => (
            <g key={x} transform={`rotate(${r} ${x} 240)`}>
              <path d={`M${x - 34} 70H${x + 34}V300Q${x + 34} 360 ${x + 90} 362Q${x + 108} 400 ${x + 60} 404H${x - 6}Q${x - 34} 404 ${x - 34} 360Z`} fill={base} stroke={seam} strokeWidth="2" />
              <path d={`M${x - 34} 90H${x + 34}M${x - 34} 110H${x + 34}`} stroke={GREEN} strokeWidth="5" />
              <Print kind="blank" ink={ink} base={base} x={x} y={190} s={1.3} />
            </g>
          ))}
        </g>
      );
    default:
      return null;
  }
}

// Loop camo: overlapping rings in three tones of the base. Fixed seed so it never shifts between renders.
function CamoPattern({ id, base, tone }) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const shades = [tone, 'rgba(0,0,0,.22)', 'rgba(255,255,255,.14)'];
  return (
    <pattern id={id} width="160" height="160" patternUnits="userSpaceOnUse">
      <rect width="160" height="160" fill={base} />
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx={rnd() * 160} cy={rnd() * 160} r={10 + rnd() * 22} fill="none" stroke={shades[i % 3]} strokeWidth={6 + rnd() * 8} />
      ))}
    </pattern>
  );
}

const TOPS = new Set(['tee', 'longsleeve', 'hoodie', 'crew', 'jacket', 'varsity', 'blazer', 'coat', 'knit']);

// A garment as a flat-lay illustration. view: 'front' | 'back' | 'detail'.
export function Garment({ product, c = 0, view = 'front', bg = 'transparent', className, title }) {
  const gid = 'g' + useId().replace(/:/g, '');
  const color = product.colors[c] || product.colors[0];
  const base = color.hex;
  const ink = color.ink;
  const tone = color.tone ?? ink;
  const seam = isLight(base) ? 'rgba(20,21,22,.13)' : 'rgba(255,255,255,.1)';
  const label = title ?? `${product.name} ${color.name}`;

  const camo = product.print === 'camo';
  const paint = camo ? `url(#${gid}cm)` : base;

  if (view === 'detail') {
    const kind = ['none', 'crosswalk', 'camo'].includes(product.print) ? 'blank' : product.print === 'wordmark-big' ? 'wordmark' : product.print;
    return (
      <svg viewBox="0 0 400 440" className={className} role="img" aria-label={`${label} 프린트 확대`}>
        <defs>
          <pattern id={gid} width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill={seam} /></pattern>
          {camo && <CamoPattern id={`${gid}cm`} base={base} tone={tone} />}
        </defs>
        <rect width="400" height="440" fill={paint} />
        <rect width="400" height="440" fill={`url(#${gid})`} />
        <Print kind={kind} ink={ink} base={base} x={200} y={220} s={kind === 'blank' ? 6 : kind === 'n26' ? 1.32 : kind === 'wordmark' ? 1.4 : 1.65} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 440" className={className} role="img" aria-label={label} style={{ background: bg }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={isLight(base) ? 0.35 : 0.08} />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
        {camo && <CamoPattern id={`${gid}cm`} base={base} tone={tone} />}
      </defs>
      {TOPS.has(product.cat) ? <Body {...{ product, base, ink, tone, seam, view, gid, paint }} />
        : ['pants', 'shorts'].includes(product.cat) ? <Bottom {...{ product, base, ink, seam, gid, view }} />
          : <Accessory {...{ product, base, ink, seam, gid, paint }} />}
    </svg>
  );
}
