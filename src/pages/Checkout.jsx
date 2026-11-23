import { useState } from 'react';
import { Link } from 'react-router-dom';
import { byId, won } from '../data.js';
import { useStore } from '../store.jsx';

export default function Checkout() {
  const { cart, setCart } = useStore();
  const [done, setDone] = useState(null);
  const [f, setF] = useState({ name: '', phone: '', addr: '', pay: 'card' });
  const total = cart.reduce((a, x) => a + byId[x.id].price * x.qty, 0);
  const ship = total >= 50000 ? 0 : 3000;
  const ok = f.name.trim() && /^01\d-?\d{3,4}-?\d{4}$/.test(f.phone) && f.addr.trim().length > 4;

  if (done) return (
    <div className="wrap page narrow">
      <p className="kicker">주문 번호 {done}</p>
      <h1>주문이 접수됐어요</h1>
      <p className="muted">포트폴리오용 사이트라 실제 결제나 배송은 되지 않아요.</p>
      <Link to="/" className="btn">홈으로</Link>
    </div>
  );
  if (!cart.length) return <div className="wrap page narrow"><h1>담긴 옷이 없어요</h1><Link to="/shop" className="btn">쇼핑하러 가기</Link></div>;

  const field = (k, label, props) => (
    <label className="field" htmlFor={`co-${k}`}>{label}<input id={`co-${k}`} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} {...props} /></label>
  );
  return (
    <div className="wrap page checkout">
      <form onSubmit={(e) => { e.preventDefault(); if (!ok) return; setDone(`U${Date.now().toString().slice(-8)}`); setCart([]); }}>
        <h1>주문서</h1>
        {field('name', '받는 분', { autoComplete: 'name', required: true })}
        {field('phone', '연락처', { inputMode: 'tel', placeholder: '010-0000-0000', autoComplete: 'tel', required: true })}
        {field('addr', '주소', { autoComplete: 'street-address', required: true })}
        <fieldset className="seg" aria-label="결제 수단">
          {[['card', '카드'], ['kakao', '카카오페이'], ['naver', '네이버페이'], ['toss', '토스페이']].map(([k, l]) => (
            <button type="button" key={k} className={f.pay === k ? 'on' : ''} aria-pressed={f.pay === k} onClick={() => setF({ ...f, pay: k })}>{l}</button>
          ))}
        </fieldset>
        {!ok && f.phone && !/^01\d-?\d{3,4}-?\d{4}$/.test(f.phone) && <p className="err">연락처는 010-1234-5678처럼 적어주세요.</p>}
        <button className="btn full" disabled={!ok}>{won(total + ship)} 결제하기</button>
      </form>
      <aside className="co-sum">
        <h2>주문 상품 {cart.length}</h2>
        <ul>{cart.map((x) => <li key={`${x.id}${x.c}${x.size}`}><span>{byId[x.id].name} · {x.size} × {x.qty}</span><span>{won(byId[x.id].price * x.qty)}</span></li>)}</ul>
        <dl className="sum"><div><dt>배송</dt><dd>{ship ? won(ship) : '무료'}</dd></div><div className="total"><dt>합계</dt><dd>{won(total + ship)}</dd></div></dl>
      </aside>
    </div>
  );
}
