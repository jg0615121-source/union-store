// Every photo dropped into src/assets/photos (e.g. u01-0.webp, look-l03.webp) is picked up automatically.
const files = import.meta.glob('./assets/photos/*.{webp,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
export const photo = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split('/').pop().replace(/\.\w+$/, ''), v]));
// Colours a product can be shown in: only the photographed ones once any photo exists, so no drawn colourway sits next to photos.
export const shownColors = (p) => {
  const all = p.colors.map((_, k) => k);
  const shot = all.filter((k) => photo[`${p.id}-${k}`]);
  return shot.length ? shot : all;
};
