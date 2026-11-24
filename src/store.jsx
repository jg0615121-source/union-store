import { createContext, useContext, useEffect, useState } from 'react';
import { byId } from './data.js';

const Ctx = createContext(null);

// Saved data can name products that no longer exist (the catalogue changed); rendering them crashed whole pages.
const known = (id) => Boolean(byId[id]);
const CLEAN = {
  'union.cart': (xs) => xs.filter((x) => known(x.id) && byId[x.id].colors[x.c]),
  'union.wish': (xs) => xs.filter(known),
  'union.viewed': (xs) => xs.filter(known),
};

function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      const data = s ? JSON.parse(s) : initial;
      return CLEAN[key] && Array.isArray(data) ? CLEAN[key](data) : data;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* private mode: keep in memory */ }
  }, [key, v]);
  return [v, setV];
}

// Cart, wishlist, recently viewed and the user's style profile (from MBTI / worldcup).
export function StoreProvider({ children }) {
  const [cart, setCart] = usePersisted('union.cart', []);
  const [wish, setWish] = usePersisted('union.wish', []);
  const [viewed, setViewed] = usePersisted('union.viewed', []);
  const [profile, setProfile] = usePersisted('union.profile', null);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (id, c, size, qty = 1) => {
    setCart((xs) => {
      const i = xs.findIndex((x) => x.id === id && x.c === c && x.size === size);
      if (i < 0) return [...xs, { id, c, size, qty }];
      return xs.map((x, j) => (j === i ? { ...x, qty: x.qty + qty } : x));
    });
    setCartOpen(true);
  };
  const setQty = (i, qty) => setCart((xs) => (qty < 1 ? xs.filter((_, j) => j !== i) : xs.map((x, j) => (j === i ? { ...x, qty } : x))));
  const toggleWish = (id) => setWish((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));
  const markViewed = (id) => setViewed((xs) => [id, ...xs.filter((x) => x !== id)].slice(0, 12));

  return (
    <Ctx.Provider value={{ cart, addToCart, setQty, setCart, wish, toggleWish, viewed, markViewed, profile, setProfile, cartOpen, setCartOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
