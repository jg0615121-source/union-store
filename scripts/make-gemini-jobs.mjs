// Writes assets/gemini/<NN_name>/prompt.txt for making photos by hand in the Gemini app (not the API).
// Garments are described in words, not from the site's illustrations, so Gemini designs a real garment.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const TAB = 'a small green woven tab (Pantone 354 green, 1 cm wide) sewn into the left side seam at the hem';
const SPEC = {
  u01: 'boxy heavyweight 280gsm garment-dyed cotton t-shirt, dropped shoulders, thick 2.5 cm ribbed collar. Tiny tonal embroidered circle logo (a ring with one dot, like a subway loop line) on the left chest. On the back, a fine single-line circular subway route map with 51 small station ticks, printed in a soft cracked water-based ink, about 25 cm wide',
  u02: 'heavyweight 500gsm brushed-back cotton hoodie, garment-dyed, double-layer hood without drawcord aglets, kangaroo pocket, wide ribbed cuffs. Small tonal puff-print "02" on the left chest, 6 cm tall, in a wide grotesque typeface',
  u03: 'heavyweight loopback cotton crewneck sweatshirt, raglan sleeves, ribbed hem and cuffs. Small embroidered night-bus route sign on the left chest: a rounded rectangle reading "N26" in a wide grotesque, tone-on-tone thread',
  u04: 'boxy heavyweight cotton t-shirt. Small tonal embroidered convenience-store receipt icon on the left chest; on the back, a realistic thermal receipt from "HAN RIVER CVS" printed at 20 cm tall in faded black ink, items in Korean: 즉석라면 3,800 / 삼각김밥 1,500 / 바나나우유 1,700, TOTAL 7,000',
  u05: 'heavyweight cotton t-shirt with a slightly cropped boxy fit. Small tonal embroidered wordmark "UNION" on the left chest, 7 cm wide, where the letter O is a ring with a small dot',
  u06: 'washed cotton twill six-panel baseball cap with a pre-curved brim and brass slide closure. Low-profile tonal embroidered wordmark "UNION" on the front, the O drawn as a ring with a small dot',
  u07: 'heavyweight long-sleeve cotton t-shirt. Thin tonal print running vertically down the left sleeve reading "SEOUL STATIC 98.1 MHz" in a small monospace typeface',
  u08: 'relaxed nylon track pants with elastic waistband, zip ankle cuffs, and a single thin green piping line down each outer seam',
  u09: 'lightweight water-resistant nylon coach jacket, snap front, corduroy-free plain collar, drawcord hem. Small tonal "UNION" embroidery on the left chest; large tonal reflective "UNION" arched across the upper back',
  u10: 'wide-leg cotton twill chino trousers with a clean front, deep slant pockets and a long break at the hem',
  u11: 'chunky ribbed merino-blend beanie with a deep fold-over cuff and the small green woven tab on the cuff',
  u12: 'heavy 16oz natural canvas tote bag with long shoulder handles. Small screen-printed round market stamp reading "MANGWON MARKET · UNION 02" in one color',
  u13: 'heavyweight 280gsm plain cotton t-shirt, no logo, boxy fit, thick ribbed collar',
  u14: 'heavyweight cotton fleece sweat shorts, above-knee length, deep pockets, flat drawcord',
  u15: 'wool melton varsity jacket with faux-leather sleeves in bone, ribbed collar, cuffs and hem with a thin green stripe, snap front. Chenille ring-with-a-dot patch on the left chest',
  u16: 'pair of ribbed cotton crew socks with two thin green stripes at the top and a tiny knitted ring logo',
};
const FLAT = new Set(['pants', 'shorts', 'cap', 'beanie', 'tote', 'socks']);
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
  job(`${p.id}-0`, `Product photo of a ${SPEC[p.id]}, in ${c.name.toLowerCase()} (${c.hex}), with ${TAB}. ${FLAT.has(p.cat) ? 'Laid flat, shot from directly above.' : 'Ghost mannequin (invisible mannequin) front view.'} ${STUDIO}`);
}

const SCENES = {
  l03: ['hero', 'Seoul at 1:30 a.m., a Sinchon intersection bus stop, the green N26 night bus arriving with soft headlights, wet asphalt, blue night tones, the model waiting with hands in pockets'],
  l01: ['', 'Seoul subway Line 2 platform at Euljiro 1-ga during morning rush, green line signage softly blurred, cool fluorescent light'],
  l02: ['', 'Yeouido Hangang Park at golden hour, a picnic mat with instant ramyeon cups, the river and bridges behind'],
  l09: ['', 'a narrow Euljiro alley at night, old print shops and neon signs, warm street light'],
};
for (const [id, [, scene]] of Object.entries(SCENES)) {
  const l = looks.find((x) => x.id === id);
  const wear = l.items.map(([pid, ci]) => `a ${byId[pid].colors[ci].name.toLowerCase()} ${SPEC[pid].split('.')[0]}`).join('; ');
  job(`look-${id}`, `Attach the product photos ${l.items.map(([pid, ci]) => `${pid}-${ci}`).join(', ')} from the 결과 folder if they exist. Editorial fashion photograph on 35mm film, natural grain, candid not posed. A Korean model in their early 20s wearing: ${wear}. Setting: ${scene}. No visible logos other than the garments' own small marks, no text overlays. ${id === 'l03' ? '16:9 horizontal, subject on the left third, lots of negative space on the right.' : '4:5 vertical.'}`);
}
console.log(n, 'jobs');
