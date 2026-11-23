import { byId, products } from './data.js';

// Rank products by how many style tags they share with what the user looked at or tested as.
export function scoreByTags(tags, exclude = []) {
  const want = new Map();
  for (const t of tags) want.set(t, (want.get(t) || 0) + 1);
  return products
    .filter((p) => !exclude.includes(p.id))
    .map((p) => [p.id, p.tags.reduce((s, t) => s + (want.get(t) || 0), 0) - p.rank / 100])
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}

export function forYou({ viewed = [], profile }) {
  const tags = [...(profile?.tags || []), ...(profile?.tags || []), ...viewed.flatMap((id) => byId[id]?.tags || [])];
  return tags.length ? scoreByTags(tags, viewed.slice(0, 2)) : [];
}

export const similar = (p) => scoreByTags(p.tags, [p.id]).slice(0, 4);
