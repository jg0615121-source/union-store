import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { byId, won } from '../data.js';
import { ProductImage } from '../media.jsx';
import { askAI, localAdvice } from '../ai.js';

const STARTERS = ['어깨가 좁은데 오버핏 입어도 돼요?', '회색 맨투맨엔 무슨 색 바지가 맞아요?', '흰 티 안 비치게 고르는 법', '키 작으면 와이드팬츠는 안 돼요?'];

export default function Stylist() {
  const [msgs, setMsgs] = useState([
    { role: 'model', text: '옷에 대해 궁금한 걸 물어보세요. 핏, 색 조합, 원단, 상황에 맞는 옷차림까지 이유와 함께 답해드릴게요.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [msgs, busy]);

  const send = async (text) => {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: 'user', text: t }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    const r = await askAI('chat', { messages: next.slice(1) });
    const out = r?.reply ? r : localAdvice(t);
    setMsgs((m) => [...m, { role: 'model', text: out.reply, ids: out.productIds || [] }]);
    setBusy(false);
  };

  return (
    <div className="wrap page stylist">
      <header className="page-head">
        <p className="kicker">Play · AI 스타일리스트</p>
        <h1>옷, 물어보세요</h1>
      </header>
      <div className="chat" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.role === 'model' && <span className="who">UNION</span>}
            {m.text.split('\n').filter(Boolean).map((line, k) => <p key={k}>{line}</p>)}
            {m.ids?.length > 0 && (
              <div className="chat-products">
                {m.ids.map((id) => (
                  <Link key={id} to={`/product/${id}`} className="mini">
                    <ProductImage p={byId[id]} />
                    <span>{byId[id].name}</span>
                    <b>{won(byId[id].price)}</b>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && <div className="bubble model"><p className="typing">생각하는 중…</p></div>}
        <div ref={end} />
      </div>
      {msgs.length < 3 && (
        <div className="starters">{STARTERS.map((s) => <button key={s} onClick={() => send(s)}>{s}<span aria-hidden="true">→</span></button>)}</div>
      )}
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <label htmlFor="chat-q" className="sr">메시지</label>
        <input id="chat-q" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 검정 바지에 갈색 신발 괜찮아요?" maxLength={500} />
        <button className="btn" disabled={busy}>보내기</button>
      </form>
    </div>
  );
}
