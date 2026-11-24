// Writes assets/gemini/<NN_name>/prompt.txt for making photos by hand in the Gemini app (not the API).
// Garments are described in words, not from the site's illustrations, so Gemini designs a real garment.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const TAB = 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam at the hem';
const SYMBOL = 'the brand symbol (attach the chosen symbol image as a reference)';
const SPEC = {
  u01: `boxy 230gsm cotton t-shirt, thick ribbed collar, small embroidered ${SYMBOL} on the left chest, 4 cm wide`,
  u02: 'oversized 230gsm cotton t-shirt with a bold "UNION" wordmark across the chest, 24 cm wide, printed in slightly cracked water-based ink',
  u03: `heavyweight cotton hoodie, kangaroo pocket, small embroidered ${SYMBOL} on the left chest`,
  u04: 'heavyweight cotton hoodie, kangaroo pocket, large "UNION" wordmark printed across the chest',
  u05: `cotton crewneck sweatshirt with raglan sleeves, small embroidered ${SYMBOL} on the left chest`,
  u06: 'cotton long-sleeve t-shirt with a small "UNION" wordmark printed on the left chest',
  u07: `lightweight nylon coach jacket, snap front, small ${SYMBOL} on the left chest, large arched "UNION" print across the upper back`,
  u08: `varsity jacket with wool body and faux-leather sleeves, ribbed collar, cuffs and hem with a thin green stripe, chenille ${SYMBOL} patch on the left chest`,
  u09: 'relaxed nylon track pants with elastic waistband, zip ankle cuffs, a single thin green piping line down each outer seam',
  u10: 'wide-leg cotton fleece sweatpants with elastic waistband, falling to the floor',
  u11: 'cotton fleece sweat shorts, above-knee length, small "UNION" print on the left leg',
  u12: `six-panel cotton baseball cap, curved brim, embroidered ${SYMBOL} on the front`,
  u13: `ribbed knit beanie with fold-over cuff and a small woven ${SYMBOL} label`,
  u15: 'three pairs of ribbed cotton crew socks with a small knitted "UNION" logo',
  u16: 'heavyweight 230gsm plain cotton t-shirt, no logo, thick ribbed collar',
};
const FLAT = new Set(['pants', 'shorts', 'cap', 'beanie', 'tote', 'socks']);
const TAILORED = new Set(['blazer', 'coat']);
const STUDIO = 'Seamless warm light-grey paper backdrop, soft diffused window light from the upper left, gentle contact shadow, true-to-life fabric texture, natural folds. No model, no hands, no text overlays, no watermark, no other brand logos. Centered with generous margin. 4:5 vertical. Quiet luxury e-commerce photography for a casual unisex fashion brand.';

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
  l03: ['hero', 'a city street at night, an empty bus stop, soft street lights, wet asphalt'],
  l01: ['', 'a quiet street in the morning, soft sunlight, brick walls'],
  l02: ['', 'a park lawn in the afternoon, a picnic mat, relaxed mood'],
  l04: ['', 'a campus walkway in the morning, soft light'],
};
for (const [id, [, scene]] of Object.entries(SCENES)) {
  const l = looks.find((x) => x.id === id);
  const wear = l.items.map(([pid, ci]) => `a ${byId[pid].colors[ci].name.toLowerCase()} ${SPEC[pid].split('.')[0]}`).join('; ');
  job(`look-${id}`, `Attach the product photos ${l.items.map(([pid, ci]) => `${pid}-${ci}`).join(', ')} from the 결과 folder if they exist. Editorial fashion photograph on 35mm film, natural grain, candid not posed. Two Korean models in their early 20s, one man and one woman, both wearing: ${wear}. Setting: ${scene}. No visible logos other than the garments' own small marks, no text overlays. ${id === 'l03' ? '16:9 horizontal, subject on the left third, lots of negative space on the right.' : '4:5 vertical.'}`);
}
// Signature graphic concepts: generated as artwork, not photos. Ask for 4 variations each.
const ART = 'Signature graphic for a casual unisex label, drawn by a skilled illustrator: confident hand-drawn ink line with slight wobble, vintage screen-print texture with tiny ink breaks, two-color print (off-black #1B1B1A and green #00A84D) on off-white cotton, timeless rather than trendy, the kind of motif a brand repeats on tees, caps and tote bags for years. Simple enough to read at 3 cm, charming at 25 cm. No gradients, no 3D, no clip-art look. Show 4 variations side by side, square.';
const SIGS = {
  'sig-emblem': 'A vintage emblem: a simple hand-drawn rope knot in green, with the slogan "TIED TOGETHER" in retro 1950s American lettering arched around it and "UNION" in small bold caps beneath, the feel of an old souvenir patch or diner sign.',
  'sig-signature': 'The word "Union" written as a loose, fast brush-pen signature by hand, confident and slightly messy like an artist signing their work, with a small green dot after the n. One single word, no other text.',
  'sig-animal': 'A small cat face icon: a calm, slightly unimpressed street cat seen from the front, drawn with very few bold lines, one ear with a tiny green notch, iconic enough to be recognised as a silhouette at 3 cm and to repeat as an all-over pattern.',
  'sig-character': 'A small mascot character based on a green woven clothing tab (a small rounded rectangle), with simple dot eyes, tiny arms and legs, friendly and slightly cheeky expression, in poses: waving, walking, sitting, peeking from behind a label. Like a mascot a beloved independent apparel brand would have: few lines, big personality.',
};
for (const [name, brief] of Object.entries(SIGS)) job(name, `${brief} ${ART}`);
console.log(n, 'jobs');
