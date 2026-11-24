// Writes assets/gemini/<NN_name>/prompt.txt for making photos by hand in the Gemini app (not the API).
// Garments are described in words, not from the site's illustrations, so Gemini designs a real garment.
import { mkdirSync, writeFileSync, rmSync, copyFileSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const TAB = 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam at the hem';
const TAB_FOR = { pants: 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam just below the waistband', cap: 'a small green woven tab (Pantone 354 green) sewn into the back strap seam' };
// The real lettering. Gemini copies whatever is attached into the picture, so attach only what should appear, and say it plainly.
const WORD = 'The attached image is the UNION lettering. Use exactly these letter shapes (thick geometric capitals, round O ring). Do not change the font or the spelling.';
// Real logo only (no separate symbol). LABEL = the woven label with the green tab, WORDMARK = the letters.
const LABEL = 'small woven UNION label patch (exactly the attached label: black with off-white UNION letters and a green tab on the right end), 5 cm wide, sewn flat with fine edge stitching on all four sides, centered 9 cm below the shoulder seam and 10 cm left of center front';
const EMB = 'UNION lettering (exactly the attached letter shapes)';
const SYMBOL = LABEL;
const SIG = 'brush signature logo (exactly the attached handwriting)';
const CAT = 'cat character (exactly the attached face drawing)';
// Which mark each product uses, and the sentence that tells Gemini what the attachment is.
const MARK = {
  label: ['ref-label.png', 'The attached image is the UNION woven label. Reproduce it exactly as a real woven label sewn on the garment; do not change the letters or colors. '],
  word: ['ref-wordmark.png', `${WORD} `],
  sig: ['결과/sig-signature.png', 'The attached image is our brush signature logo. Reproduce exactly this handwriting on the garment; do not rewrite it or change the letters. The print is ONLY this handwritten "Union." signature with its green dot: never block capital letters, never the word UNION in a typeface. '],
  cat: ['결과/sig-cat-face.png', 'The attached image is our cat character. Reproduce exactly this drawing on the garment; do not redraw or change it. '],
};
const MARK_OF = { u01: 'sig', u02: 'word', u03: 'label', u05: 'word', u10: 'label', u12: 'sig' };
const SPEC = {
  u01: `boxy heavyweight 240gsm cotton jersey t-shirt, dropped shoulders, a clean 2.5 cm 1x1 rib neckband lying perfectly flat, twin-needle stitched sleeve and body hems, the ${SIG} screen-printed in black ink across the chest, 22 cm wide, slightly cracked water-based ink, top of the signature 9 cm below the neckband`,
  u02: 'oversized heavyweight 240gsm cotton jersey t-shirt, dropped shoulders, a clean 2.5 cm 1x1 rib neckband lying perfectly flat, the UNION lettering screen-printed across the chest in off-black ink, 26 cm wide (about 40 percent of the chest width), top of the letters 9 cm below the neckband, soft hand water-based print',
  u03: `heavyweight 450gsm brushed cotton fleece hoodie, double-layer hood with flat cotton drawcords and metal eyelets, kangaroo pocket, 7 cm 2x2 rib cuffs and hem knitted tight and even, a ${LABEL} on the left chest`,
  u04: 'heavyweight cotton hoodie, kangaroo pocket, large "UNION" wordmark printed across the chest',
  u05: `heavyweight 500gsm brushed-back cotton fleece crewneck sweatshirt in the style of a refined designer label, set-in sleeves, a slim 2 cm fine 1x1 rib neckband, slim 5 cm fine 1x1 rib cuffs and a 6 cm hem rib that falls straight without gathering, no V-stitch, no side panels, minimal and clean, a small tonal embroidered ${EMB} on the upper chest on the RIGHT side of the photo as you look at it (the wearer's left chest), 6 cm wide, clearly readable tone-on-tone`,
  u06: 'cotton long-sleeve t-shirt with a small "UNION" wordmark printed on the left chest',
  u07: `lightweight nylon coach jacket, snap front, small ${SYMBOL} on the left chest, large arched "UNION" print across the upper back`,
  u08: `varsity jacket with wool body and faux-leather sleeves, ribbed collar, cuffs and hem with a thin green stripe, chenille ${SYMBOL} patch on the left chest`,
  u09: 'relaxed nylon track pants with elastic waistband, zip ankle cuffs, a single thin green piping line down each outer seam',
  u10: `wide-leg heavyweight cotton fleece sweatpants, 5 cm covered elastic waistband with flat drawcord, side seam pockets, straight wide hem with no cuffs, falling to the floor, a ${LABEL.replace('5 cm wide', '4 cm wide').replace(/, centered 9 cm.*$/, '')} on the left leg 8 cm below the pocket opening`,
  u11: 'cotton fleece sweat shorts, above-knee length, small "UNION" print on the left leg',
  u12: `six-panel washed cotton twill baseball cap, low unstructured crown, pre-curved brim with neat rows of stitching, the ${SIG} embroidered on the front panels in off-white thread, 10 cm wide, the small dot in green thread`,
  u13: `ribbed knit beanie with fold-over cuff and a small woven ${SYMBOL} label`,
  u15: 'three pairs of ribbed cotton crew socks with a small knitted "UNION" logo',
  u16: 'heavyweight 230gsm plain cotton t-shirt, no logo, thick ribbed collar',
};
// Tops are shot as a neat flat lay: a ghost mannequin made the tees look like an awkward invisible person.
const TOPLAY = 'Front view as a premium brand flat-lay product shot: the garment laid perfectly flat on the floor and shot from directly above, symmetrical, sleeves straight and relaxed along the sides, neckline lying flat, hem straight, smoothed by a professional stylist with only a few soft natural creases. No mannequin, no body volume, no hanger, no person.';
const FLAT = new Set(['pants', 'shorts', 'cap', 'beanie', 'tote', 'socks']);
const TAILORED = new Set(['blazer', 'coat']);
const STUDIO = 'Shot like a real premium brand product page: medium format camera, f/8, one large softbox from the upper left, seamless warm light-grey paper backdrop, very soft contact shadow. Real luxury-brand garment, not a 3D render: premium dense heavyweight cotton with a smooth, slightly matte, expensive-looking surface and a heavy drape, visible fine knit texture, crisp straight seams, no puckering, no wavy hems, a few natural soft folds. The ribbing must look clean, tight and even. No model, no hands, no text overlays, no watermark, no other brand logos. Centered with generous margin. 4:5 vertical.';

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
const usesSymbol = (pid) => SPEC[pid].includes(LABEL);
const usesWordmark = (pid) => /UNION lettering/.test(SPEC[pid]);
const refsFor = (pids) => [...(pids.some(usesWordmark) ? ['ref-wordmark.png'] : []), ...(pids.some(usesSymbol) ? ['ref-label.png'] : [])];

// Order = priority, because the Gemini image quota is limited. Stop anywhere and the site still has the most important photos.
// 0) brand graphics and signature garment concepts  1) product photos  2) two casting references  3) one model per product
// 4) hero lookbook  5) second model  6) the other lookbooks.
// Brand graphics chosen by the user: a brush signature (hand-signed streetwear energy) and one cat character for people in their 20s.
job('sig-signature', 'Draw only the word "Union" as one fast, confident brush-marker signature, the hand-signed kind seen on classic surf and skate labels: thick-to-thin strokes, slight dry-brush texture at the stroke ends, a strong forward slant, a long flick under the word from the final n, and a small solid green (#00A84D) dot after the n. Black ink on plain white. Only this one signature, centered, large, with clean edges that work for screen printing and embroidery. Grown-up and stylish, not childish, not wedding calligraphy. No other text, no logo, no frame.');
// After sig-cat: crop the chosen face (top-left of the 2x2 sheet) to 결과/sig-cat-face.png before the product photos.

for (const p of products) {
  const c = p.colors[0];
  const tab = TAB_FOR[p.cat] || TAB;
  const [ref, logo] = MARK[MARK_OF[p.id]];
  job(`${p.id}-0`, `${logo}Product photo of a ${SPEC[p.id]}, in ${c.name.toLowerCase()} (${c.hex}), with ${tab}. The garment color must be ${c.name.toLowerCase()} ${c.hex}. ${p.cat === 'pants' ? 'Front view, laid flat, shot from directly above.' : FLAT.has(p.cat) ? 'Laid flat, shot from directly above.' : TAILORED.has(p.cat) ? 'On a ghost mannequin, front view, buttoned.' : TOPLAY} ${STUDIO}`, [ref]);
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
// Casting is mostly Korean (the people who wear it) with a European model mixed in for campaign shots, like global streetwear lookbooks.
const MIXED_PAIR = 'Two models in their early 20s, one Korean and one European, one man and one woman';
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
  job(`look-${id}`, `Use the attached product photos as the exact garments. Editorial fashion photograph on 35mm film, natural grain, candid not posed. ${MIXED_PAIR}, both wearing: ${wear}. Setting: ${SCENES[id]}. No visible logos other than the garments' own small marks, no text overlays, natural hands. ${id === 'l03' ? '16:9 horizontal, subject on the left third, lots of negative space on the right.' : '4:5 vertical.'}`, l.items.map(([pid]) => `결과/${pid}-0.png`));
};
look('l03');
for (const p of products) if (p.cat !== 'cap') model(p, 2);
for (const id of ['l01', 'l02', 'l04']) look(id);
// Lookbook: generic editorial outfits matching the lookbook text. No UNION products, no logos.
const LOOKBOOK = [
  'early morning on a quiet street before work: a plain white t-shirt, grey wide trousers, a plain black cap, white sneakers, a thin watch',
  'a lunchtime walk in a park: an oat crewneck sweatshirt, grey wide trousers, brown suede sneakers',
  'after work in the evening by a cafe window: a black t-shirt with a large plain graphic, grey wide trousers, a plain black cap, black leather sneakers',
  'the last train at night on an empty platform: a grey hoodie and matching grey sweatpants, white socks, slides',
];
LOOKBOOK.forEach((scene, i) => job(`lookbook-${i + 1}`, `Editorial fashion photograph for a lookbook, shot on 35mm film, natural grain, candid not posed: a Korean person in their early 20s, ${scene}. Plain garments with no logos or brand marks of any kind, natural hands. It must look like a real unretouched film photo, not AI: real skin texture, slightly imperfect framing, natural light falloff, no plastic smoothness. 4:5 vertical.`));

// Journal photographs (added on main): one editorial image per story, magazine style rather than product shots. Lowest priority.
const JOURNAL = {
  'three-piece': 'Three folded garments (a white t-shirt, grey sweatpants, a black cap) laid on a wooden bench by a window, morning light, quiet still life',
  'logo-tee': 'A young Korean person seen from the side walking past a concrete wall, wearing a black oversized t-shirt with a large white graphic print that has no readable brand, candid street moment',
  'green-tab': 'Extreme close-up of the hem of a grey sweatshirt showing a small green woven tab at the side seam, shallow depth of field, fabric texture',
  'white-tee': 'A white heavyweight t-shirt hanging on a simple wooden hanger against a plain plaster wall, soft side light, minimal',
};
for (const [id, scene] of Object.entries(JOURNAL)) job(`journal-${id}`, `Editorial magazine photograph for a fashion journal, in the spirit of independent print magazines: ${scene}. Shot on medium-format film, natural light, muted colours, generous negative space, no text, no other brand logos. 16:9 horizontal.`);
console.log(n, 'jobs');
