// Every photo dropped into src/assets/photos (e.g. u01-0.webp, look-l03.webp) is picked up automatically.
const files = import.meta.glob('./assets/photos/*.{webp,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
export const photo = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split('/').pop().replace(/\.\w+$/, ''), v]));
