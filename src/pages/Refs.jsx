import { products } from '../data.js';
import { Garment } from '../garments.jsx';

// Reference renders for the image generator (scripts/gen-images.mjs). Not linked from the site.
export default function Refs() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff' }}>
      {products.flatMap((p) => [
        <div key={p.id + 'f'} id={`${p.id}-shape`} style={{ width: 800, height: 880, background: '#fff' }}><Garment product={p} c={0} /></div>,
        <div key={p.id + 'd'} id={`${p.id}-print`} style={{ width: 800, height: 880 }}><Garment product={p} c={0} view="detail" /></div>,
      ])}
    </div>
  );
}
