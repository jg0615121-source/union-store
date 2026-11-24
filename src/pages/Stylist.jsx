import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { byId, won } from '../data.js';
import { ProductImage } from '../media.jsx';
import { askAI, localChat } from '../ai.js';
import { useStore } from '../store.jsx';

const STARTERS = ['키 172에 마른 편인데 뭐 입어요?', '소개팅 가는데 너무 꾸민 티 안 나게', '옷 하나도 몰라요. 3벌만 골라주세요', '남자친구 생일 선물 5만원 이하'];

export default function Stylist() {
  const { profile } = useStore();
  const [msgs, setMsgs] = useState([
    { role: 'model', text: `안녕하세요, UNION 스타일리스트예요. 어디 가는지, 키나 평소 사이즈, 좋아하는 색을 말해주면 옷을 골라드릴게요.${profile ? ` 저장된 취향 '${profile.name}'도 같이 볼게요.` : ''}` },
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
    const ctx = profile ? [{ role: 'user', text: `(참고: 내 취향은 '${profile.name}', 키워드 ${[...new Set(profile.tags)].join(', ')})` }] : [];
    const r = await askAI('chat', { messages: [...ctx, ...next.slice(1)] });
    const out = r?.reply ? r : localChat(t);
    setMsgs((m) => [...m, { role: 'model', text: out.reply, ids: out.productIds || [] }]);
    setBusy(false);
  };

  return (
    <div className="wrap page stylist">
      <header className="page-head">
        <p className="kicker">Play · AI 스타일리스트</p>
        <h1>뭐 입지?</h1>
      </header>
      <div className="chat" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.role === 'model' && <span className="who">UNION</span>}
            <p>{m.text}</p>
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
        {busy && <div className="bubble model"><p className="typing">고르는 중…</p></div>}
        <div ref={end} />
      </div>
      {msgs.length < 3 && (
        <div className="starters">{STARTERS.map((s) => <button key={s} onClick={() => send(s)}>{s}<span aria-hidden="true">→</span></button>)}</div>
      )}
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <label htmlFor="chat-q" className="sr">메시지</label>
        <input id="chat-q" value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 비 오는 날 캠퍼스룩" maxLength={500} />
        <button className="btn" disabled={busy}>보내기</button>
      </form>
    </div>
  );
}
