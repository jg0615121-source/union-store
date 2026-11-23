// Writes assets/gemini/<NN_name>/prompt.txt for making photos by hand in the Gemini app (not the API).
// Garments are described in words, not from the site's illustrations, so Gemini designs a real garment.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const TAB = 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam at the hem';
const RING = 'the letter O drawn as a ring with one small dot at its upper right';
const SPEC = {
  u01: `boxy heavyweight 280gsm garment-dyed cotton t-shirt, dropped shoulders, thick ribbed collar. Bold wordmark "UNION" across the chest, 24 cm wide, in a wide heavy grotesque typeface with ${RING}, printed in slightly cracked water-based ink`,
  u02: 'heavyweight 500gsm cotton hoodie made entirely from an original camouflage fabric whose shapes are hundreds of overlapping rings in three tones of olive, double-layer hood, kangaroo pocket, wide ribbed cuffs. No other graphics',
  u03: 'heavyweight 500gsm garment-dyed cotton hoodie, double-layer hood, kangaroo pocket. Small tonal puff-print "02" on the left chest, 6 cm tall, in a wide grotesque typeface',
  u04: 'six-panel cotton baseball cap made from an olive ring-pattern camouflage fabric, pre-curved brim, brass slide closure, tiny tonal embroidered ring logo on the front',
  u05: 'wool melton varsity jacket in deep green with bone faux-leather sleeves, ribbed collar, cuffs and hem with thin bone stripes, snap front. Large chenille patch of a ring with one dot on the left chest',
  u06: 'relaxed nylon track pants with elastic waistband, zip ankle cuffs, and a single thin green piping line down each outer seam',
  u07: 'heavyweight loopback cotton crewneck sweatshirt, raglan sleeves. Small tone-on-tone embroidered night-bus route sign on the left chest reading "N26" in a wide grotesque',
  u08: 'heavyweight 280gsm plain cotton t-shirt, boxy fit, thick ribbed collar, no logo',
  u09: 'lightweight water-resistant nylon coach jacket, snap front, drawcord hem. Small tonal "UNION" embroidery on the left chest',
  u10: 'chunky ribbed merino-blend beanie in deep green with a deep fold-over cuff',
  u11: 'heavy 16oz natural canvas tote bag with long handles and a small one-color round stamp print reading "UNION 02"',
  u12: 'heavyweight cotton fleece sweat shorts, above-knee length, deep pockets, flat drawcord, tiny tonal "UNION" print on the left leg',
  u13: 'unstructured single-breasted wool blazer with no padding or canvas, soft natural shoulders, two buttons, patch pockets, slightly relaxed fit, in the style of refined Korean contemporary menswear',
  u14: 'wide-leg wool-blend trousers with double forward pleats, high rise, clean front, long full break at the hem',
  u15: 'extra-fine merino wool crewneck sweater, fine gauge, ribbed collar, cuffs and hem, no logo',
  u16: 'long balmacaan overcoat in wool-cashmere, raglan sleeves, small stand-fall collar, hidden button placket, falls below the knee',
};
const FLAT = new Set(['pants', 'shorts', 'cap', 'beanie', 'tote', 'socks']);
const TAILORED = new Set(['blazer', 'coat']);
const STUDIO = 'Seamless warm light-grey paper backdrop, soft diffused window light from the upper left, gentle contact shadow, true-to-life fabric texture, natural folds. No model, no hands, no text overlays, no watermark, no other brand logos. Centered with generous margin. 4:5 vertical. Quiet luxury e-commerce photography in the style of high-end Seoul and Tokyo menswear shops.';

const out = 'assets/gemini';
rmSync(out, { recursive: true, force: true });
let n = 0;
const job = (name, text) => {
  const dir = `${out}/${String(++n).padStart(2, '0')}_${name}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/prompt.txt`, `${text}\n\n저장 파일 이름: ${name}.png\n`);
};

for (const p of products) {
  const c = p.colors[0];
  job(`${p.id}-0`, `Product photo of a ${SPEC[p.id]}, in ${c.name.toLowerCase()} (${c.hex}), with ${TAB}. ${FLAT.has(p.cat) ? 'Laid flat, shot from directly above.' : TAILORED.has(p.cat) ? 'On a ghost mannequin, front view, buttoned.' : 'Ghost mannequin (invisible mannequin) front view.'} ${STUDIO}`);
}

const SCENES = {
  l03: ['hero', 'Seoul after 1 a.m., an empty Sinchon intersection bus stop, a night bus arriving with soft headlights, wet asphalt, deep blue night'],
  l01: ['', 'a quiet Seongsu side street at 8 a.m., red-brick warehouse walls, soft morning light'],
  l02: ['', 'the Han River park in late afternoon, wind, the river and a bridge softly behind'],
  l09: ['', 'a narrow Euljiro alley at night, old print shops with shutters half down, warm street light'],
};
for (const [id, [, scene]] of Object.entries(SCENES)) {
  const l = looks.find((x) => x.id === id);
  const wear = l.items.map(([pid, ci]) => `a ${byId[pid].colors[ci].name.toLowerCase()} ${SPEC[pid].split('.')[0]}`).join('; ');
  job(`look-${id}`, `Attach the product photos ${l.items.map(([pid, ci]) => `${pid}-${ci}`).join(', ')} from the 결과 folder if they exist. Editorial fashion photograph on 35mm film, natural grain, candid not posed. A Korean model in their early 20s wearing: ${wear}. Setting: ${scene}. No visible logos other than the garments' own small marks, no text overlays. ${id === 'l03' ? '16:9 horizontal, subject on the left third, lots of negative space on the right.' : '4:5 vertical.'}`);
}
console.log(n, 'jobs');
