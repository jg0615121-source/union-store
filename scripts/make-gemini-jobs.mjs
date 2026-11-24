// Writes assets/gemini/<NN_name>/prompt.txt for making photos by hand in the Gemini app (not the API).
// Garments are described in words, not from the site's illustrations, so Gemini designs a real garment.
import { mkdirSync, writeFileSync, rmSync, copyFileSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const TAB = 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam at the hem';
const TAB_FOR = { pants: 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the right back pocket seam', cap: 'a small green woven tab (Pantone 354 green) sewn into the back strap seam' };
// The real lettering. Gemini copies whatever is attached into the picture, so attach only what should appear, and say it plainly.
const WORD = 'The attached image is the UNION lettering. Use exactly these letter shapes (thick geometric capitals, round O ring). Do not change the font or the spelling.';
const SYMBOL = 'brand symbol (exactly as in the attached image)';
const SPEC = {
  u01: `boxy 230gsm cotton t-shirt, thick ribbed collar, small embroidered ${SYMBOL} on the left chest, 4 cm wide`,
  u02: 'oversized 230gsm cotton t-shirt with the UNION lettering printed large across the chest, 24 cm wide, slightly cracked water-based ink',
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
// prompt.txt: line 1 = text to paste into Gemini (nothing else), then what to attach, then the file name (last line).
const job = (name, text, attach = []) => {
  const dir = `${out}/${String(++n).padStart(2, '0')}_${name}`;
  mkdirSync(dir, { recursive: true });
  const local = [];
  for (const a of attach) {
    if (a.startsWith('ref-')) { copyFileSync(`scripts/gemini-refs/${a}`, `${dir}/${a}`); local.push(`${a} (이 폴더)`); }
    else local.push(a);
  }
  writeFileSync(`${dir}/prompt.txt`, `${text}\n\n첨부: ${local.length ? local.join(', ') : '없음'}\n\n저장 파일 이름: ${name}.png\n`);
};
const usesSymbol = (pid) => SPEC[pid].includes(SYMBOL);
const usesWordmark = (pid) => /UNION/.test(SPEC[pid]);
const refsFor = (pids) => [...(pids.some(usesWordmark) ? ['ref-wordmark.png'] : []), ...(pids.some(usesSymbol) ? ['결과/sig-선택.png (고른 시그니처)'] : [])];

// Order = priority, because the Gemini image quota is limited. Stop anywhere and the site still has the most important photos.
// 1) signature concepts (needed before anything with the symbol)  2) product photos  3) two casting references  4) one model per product
// 4) hero lookbook  5) second model  6) the other lookbooks.
const ART = 'Style: hand-drawn ink line with slight wobble, vintage screen-print texture, only two colors (black #1B1B1A and green #00A84D) on off-white cotton. Simple enough to read at 3 cm. No gradients, no 3D. No captions, no extra words, no other brand logos. Show 4 variations in a 2x2 grid on one square image.';
// [name, brief, attachment]
const SIGS = [
  ['sig-emblem', `${WORD} Draw a vintage patch emblem: a green rope knot in the middle, the words "TIED TOGETHER" arched above it in retro lettering, and the UNION lettering small at the bottom.`, 'ref-wordmark.png'],
  ['sig-signature', 'Draw only the word "Union" as a fast, loose brush-pen handwritten signature, with a small green dot after the n. Nothing else in the image: no logo, no label, no other text.', null],
  ['sig-animal', 'Draw only a small cat face icon: a calm, slightly unimpressed street cat seen from the front, very few bold lines, one ear with a small green notch. Nothing else in the image: no text, no logo, no label.', null],
  ['sig-character', 'Look at the green block on the right end of the attached label. Turn that green block into a small mascot character: an upright green rounded rectangle with dot eyes, a small smile, thin black arms and legs. Four poses: waving, walking, sitting, peeking over the edge of the attached black UNION label. Do not write any words under the poses.', 'ref-label.png'],
];
for (const [name, brief, ref] of SIGS) job(name, `${brief} ${ART}`, ref ? [ref] : []);

for (const p of products) {
  const c = p.colors[0];
  const tab = TAB_FOR[p.cat] || TAB;
  const logo = usesWordmark(p.id) ? `${WORD} ` : '';
  job(`${p.id}-0`, `${logo}Product photo of a ${SPEC[p.id]}, in ${c.name.toLowerCase()} (${c.hex}), with ${tab}. ${FLAT.has(p.cat) ? 'Laid flat, shot from directly above.' : TAILORED.has(p.cat) ? 'On a ghost mannequin, front view, buttoned.' : 'Ghost mannequin (invisible mannequin) front view.'} ${STUDIO}`, refsFor([p.id]));
}

const MODEL_SPEC = {
  1: 'a Korean man in his early 20s, 181 cm, slim build',
  2: 'a Korean woman in her early 20s, 167 cm, slim build',
};
// Casting references: the same two people in every model shot and lookbook.
const CAST = {
  1: ['cast-man', 'a Korean man in his early 20s, 181 cm, slim build, short natural black hair with a soft fringe, clean-shaven, calm friendly face'],
  2: ['cast-woman', 'a Korean woman in her early 20s, 167 cm, slim build, shoulder-length straight black hair tucked behind one ear, minimal makeup, calm friendly face'],
};
for (const [name, who] of Object.values(CAST)) job(name, `Model casting reference sheet for a fashion brand: ${who}. Three views side by side on one 3:2 horizontal canvas: close-up face portrait, front full body, side full body. Plain heather grey crewneck t-shirt with no logo, plain black trousers, white sneakers. Seamless light grey studio backdrop, soft even lighting, neutral relaxed expression, natural hands. Photorealistic, high-end, no text, no watermark.`);
const SAME = (k) => `The person must be exactly the same person as in the attached ${CAST[k][0]} reference (same face, hair, body).`;
const model = (p, k) => {
  const c = p.colors[0];
  const pants = p.cat === 'pants';
  job(`${p.id}-model-${k}`, `${SAME(k)} Use the attached product photo as the exact garment: same color, fabric, fit, logo and logo position, nothing redrawn. E-commerce model photo for a fashion product page: ${MODEL_SPEC[k]} wearing exactly this ${c.name.toLowerCase()} ${p.cat === 'cap' ? 'cap' : 'garment'}, styled with plain neutral basics only (${pants ? 'a plain white heavyweight t-shirt' : 'straight black trousers'}, clean white sneakers, no logos on anything else). ${p.cat === 'cap' ? 'Upper-body shot.' : 'Full-body shot, head to toe.'} Seamless light grey studio backdrop, soft even lighting, natural relaxed standing pose, hands relaxed at the sides or in pockets, neutral face, sharp focus on the garment so fit and length are easy to judge. 3:4 vertical. Photorealistic, high-end, no text, no watermark.`, [`결과/${p.id}-0.png`, `결과/${CAST[k][0]}.png`]);
};
for (const p of products) model(p, 1);

const SCENES = {
  l03: 'a city street at night, an empty bus stop, soft street lights, wet asphalt',
  l01: 'a quiet street in the morning, soft sunlight, brick walls',
  l02: 'a park lawn in the afternoon, a picnic mat, relaxed mood',
  l04: 'a campus walkway in the morning, soft light',
};
const look = (id) => {
  const l = looks.find((x) => x.id === id);
  // Attach the product photo of the same garment; if the look uses another colour, say so in the text.
  const wear = l.items.map(([pid, ci]) => `${byId[pid].colors[ci].name.toLowerCase()} ${SPEC[pid].split('.')[0]}${ci ? ` (same design as the attached ${pid} photo, but in ${byId[pid].colors[ci].name.toLowerCase()})` : ''}`).join('; ');
  job(`look-${id}`, `Use the attached product photos as the exact garments. Editorial fashion photograph on 35mm film, natural grain, candid not posed. The two people are exactly the man and the woman in the attached cast-man and cast-woman references (same faces and hair), both wearing: ${wear}. Setting: ${SCENES[id]}. No visible logos other than the garments' own small marks, no text overlays, natural hands. ${id === 'l03' ? '16:9 horizontal, subject on the left third, lots of negative space on the right.' : '4:5 vertical.'}`, [...l.items.map(([pid]) => `결과/${pid}-0.png`), '결과/cast-man.png', '결과/cast-woman.png']);
};
look('l03');
for (const p of products) if (p.cat !== 'cap') model(p, 2);
for (const id of ['l01', 'l02', 'l04']) look(id);
console.log(n, 'jobs');
