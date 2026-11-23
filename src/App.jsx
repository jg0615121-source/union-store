import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { byId, won } from './data.js';
import { Logo } from './garments.jsx';
import { ProductImage } from './media.jsx';
import { useStore } from './store.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Lookbook from './pages/Lookbook.jsx';
import Snap from './pages/Snap.jsx';
import Magazine, { Article } from './pages/Magazine.jsx';
import Stylist from './pages/Stylist.jsx';
import FitCheck from './pages/FitCheck.jsx';
import Mbti from './pages/Mbti.jsx';
import Worldcup from './pages/Worldcup.jsx';
import Me from './pages/Me.jsx';
import Checkout from './pages/Checkout.jsx';
import Play from './pages/Play.jsx';

const NAV = [['/shop', 'Shop'], ['/lookbook', 'Lookbook'], ['/snap', 'Snap'], ['/magazine', 'Journal'], ['/play', 'Play']];
const PLAY = [['/stylist', 'AI 스타일리스트'], ['/fit-check', 'AI 코디 체크'], ['/mbti', '패션 MBTI'], ['/worldcup', '코디 월드컵']];

function Header() {
  const { cart, wish, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [top, setTop] = useState(true);
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname, loc.search]);
  useEffect(() => {
    const on = () => setTop(window.scrollY < 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const count = cart.reduce((a, x) => a + x.qty, 0);
  const over = loc.pathname === '/' && top && !open;

  return (
    <>
      <div className="notice">5만원 이상 무료배송 · 첫 구매 10% 할인</div>
      <header className={`hdr ${over ? 'over' : ''}`}>
        <div className="hdr-in">
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="메뉴">
            <span /><span />
          </button>
          <nav className={`nav ${open ? 'open' : ''}`} aria-label="주요 메뉴">
            <div className="nav-main">
              {NAV.map(([to, l]) => <NavLink key={l} to={to} end>{l}</NavLink>)}
            </div>
          </nav>
          <Link to="/" className="brand" aria-label="UNION 홈"><Logo height={24} ink={over ? '#F4F4F2' : 'currentColor'} paper={over ? '#1B1B1A' : 'var(--bg)'} /></Link>
          <div className="hdr-right">
            <form className="hsearch" role="search" onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav(`/shop?q=${encodeURIComponent(q.trim())}`); }}>
              <label htmlFor="hq" className="sr">상품 검색</label>
              <input id="hq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="검색" />
            </form>
            <Link to="/me" className="hdr-link" aria-label={`찜 ${wish.length}개`}>WISHLIST{wish.length > 0 && <sup>{wish.length}</sup>}</Link>
            <button className="hdr-link" onClick={() => setCartOpen(true)} aria-label={`장바구니 ${count}개`}>BAG{count > 0 && <sup>{count}</sup>}</button>
          </div>
        </div>
      </header>
    </>
  );
}

function CartDrawer() {
  const { cart, setQty, cartOpen, setCartOpen } = useStore();
  const nav = useNavigate();
  const total = cart.reduce((a, x) => a + byId[x.id].price * x.qty, 0);
  const ship = total >= 50000 || total === 0 ? 0 : 3000;
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [setCartOpen]);
  if (!cartOpen) return null;
  return (
    <div className="drawer-wrap" onClick={() => setCartOpen(false)}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="장바구니">
        <header><h2>BAG</h2><button onClick={() => setCartOpen(false)} className="x" aria-label="닫기">닫기</button></header>
        {cart.length === 0 ? (
          <div className="empty">
            <p>장바구니가 비었어요.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn">쇼핑하러 가기</Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((x, i) => {
                const p = byId[x.id];
                return (
                  <li key={`${x.id}-${x.c}-${x.size}`}>
                    <div className="cart-thumb"><ProductImage p={p} c={x.c} /></div>
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.colors[x.c].name} · {x.size}</span>
                      <div className="qty">
                        <button onClick={() => setQty(i, x.qty - 1)} aria-label="하나 빼기">−</button>
                        <span>{x.qty}</span>
                        <button onClick={() => setQty(i, x.qty + 1)} aria-label="하나 더">+</button>
                      </div>
                    </div>
                    <span className="price">{won(p.price * x.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="sum">
              <div><dt>상품</dt><dd>{won(total)}</dd></div>
              <div><dt>배송</dt><dd>{ship ? won(ship) : '무료'}</dd></div>
              <div className="total"><dt>합계</dt><dd>{won(total + ship)}</dd></div>
            </dl>
            {ship > 0 && <p className="hint">{won(50000 - total)} 더 담으면 무료배송이에요.</p>}
            <button className="btn full" onClick={() => { setCartOpen(false); nav('/checkout'); }}>주문하기</button>
          </>
        )}
      </aside>
    </div>
  );
}

function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-in">
        <div className="ftr-brand">
          <Logo height={40} ink="var(--bg)" paper="var(--fg)" />
        </div>
        <nav aria-label="쇼핑">
          <h3>SHOP</h3>
          <Link to="/shop">전체 상품</Link><Link to="/shop?sort=new">최신순</Link><Link to="/shop?sort=rank">랭킹</Link><Link to="/lookbook">룩북</Link>
        </nav>
        <nav aria-label="놀이">
          <h3>PLAY</h3>
          {PLAY.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}
        </nav>
        <div>
          <h3>CS</h3>
          <p>평일 10:00 — 17:00<br />점심 12:30 — 13:30</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <Header />
      <main id="main" key={pathname} className="page-route">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/snap" element={<Snap />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:id" element={<Article />} />
          <Route path="/play" element={<Play />} />
          <Route path="/stylist" element={<Stylist />} />
          <Route path="/fit-check" element={<FitCheck />} />
          <Route path="/mbti" element={<Mbti />} />
          <Route path="/worldcup" element={<Worldcup />} />
          <Route path="/me" element={<Me />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<div className="wrap page"><h1>페이지를 찾을 수 없어요</h1><Link to="/" className="btn">홈으로</Link></div>} />
        </Routes>
      </main>
      <CartDrawer />
      {pathname !== '/' && <Footer />}
    </>
  );
}
