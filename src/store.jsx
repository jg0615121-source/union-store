import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);

function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
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
