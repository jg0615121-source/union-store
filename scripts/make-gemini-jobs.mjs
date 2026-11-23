// Writes assets/gemini/<job>/prompt.txt (+ reference PNGs) for making photos in the Gemini app by hand.
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { products, looks, byId } from '../src/data.js';

const DESC = {
  tee: 'oversized heavyweight short-sleeve cotton t-shirt', longsleeve: 'heavyweight long-sleeve cotton t-shirt',
  hoodie: 'heavyweight pullover hoodie with kangaroo pocket and flat drawcords', crew: 'heavyweight crewneck sweatshirt with ribbed cuffs and hem',
  jacket: 'lightweight nylon coach jacket with snap buttons and a corduroy-free plain collar', varsity: 'varsity jacket with melton wool body, faux-leather sleeves and ribbed collar, cuffs and hem with a thin green stripe',
  pants: 'relaxed wide-leg trousers with elastic waistband', shorts: 'heavyweight sweat shorts', cap: 'six-panel cotton twill baseball cap, three-quarter front view',
  beanie: 'ribbed knit beanie with fold-over cuff and a small woven label', tote: 'heavy canvas tote bag', socks: 'pair of ribbed crew socks with two green stripes',
};
const STYLE = 'Seamless light grey studio backdrop (#E7E7E4), soft diffused key light from the upper left, gentle contact shadow, realistic fabric texture and natural folds. No model, no hands, no text, no watermark, no other logos. Centered with generous margin, 4:5 vertical. High-end fashion e-commerce photo.';
const out = 'assets/gemini';
const jobs = [];

for (const p of products) {
  p.colors.forEach((c, i) => {
    const name = `${p.id}-${i}`;
    const dir = `${out}/${String(jobs.length + 1).padStart(2, '0')}_${name}`;
    mkdirSync(dir, { recursive: true });
    let prompt;
    if (i === 0) {
      copyFileSync(`assets/ref/${p.id}-shape.png`, `${dir}/ref1-shape.png`);
      copyFileSync(`assets/ref/${p.id}-print.png`, `${dir}/ref2-print.png`);
      prompt = `Reference images: ref1 shows the garment shape, ref2 shows the exact graphic. Create a product photo of a ${DESC[p.cat]} in ${c.name} (${c.hex}). ${['pants', 'shorts', 'cap', 'beanie', 'tote', 'socks'].includes(p.cat) ? 'Laid flat, shot from directly above.' : 'Ghost mannequin (invisible mannequin) front view.'} Reproduce the graphic from ref2 exactly, screen-printed with a slight ink texture, in ${c.ink}. ${STYLE}`;
    } else {
      prompt = `Attach the saved photo ${p.id}-0 as the reference. Same garment, same framing, lighting, backdrop and graphic. Change only the fabric color to ${c.name} (${c.hex}) and the print color to ${c.ink}. ${STYLE}`;
    }
    writeFileSync(`${dir}/prompt.txt`, prompt + `\n\n저장 파일 이름: ${name}.png\n`);
    jobs.push(name);
  });
}

const SCENES = {
  l01: 'Seoul subway Line 2 platform at Euljiro 1-ga during morning rush, green line signage blurred behind, cool fluorescent light',
  l02: 'Yeouido Hangang Park at golden hour, picnic mat, instant ramyeon cups from a convenience store, river and bridges behind',
  l09: 'narrow Euljiro alley at night, old print shops and neon signs, warm street light mixed with neon',
  l03: 'Sinchon intersection bus stop after 1 a.m., the N26 night bus arriving with headlights, empty street, blue night tones',
};
Object.entries(SCENES).forEach(([id, scene], k) => {
  const l = looks.find((x) => x.id === id);
  const items = l.items.map(([pid, c]) => `${pid}-${c} (${byId[pid].ko})`).join(', ');
  const dir = `${out}/${String(jobs.length + 1).padStart(2, '0')}_look-${id}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/prompt.txt`, `Attach the saved product photos ${items} as references. Editorial fashion photo, 35mm film, natural grain, candid not posed. A Korean model in their early 20s wearing exactly those items, ${scene}. No other visible logos, no text overlays. 4:5 vertical.\n\n저장 파일 이름: look-${id}.png\n`);
  jobs.push(`look-${id}`);
});
console.log(jobs.length, 'jobs');
