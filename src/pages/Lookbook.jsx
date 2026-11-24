import { Link } from 'react-router-dom';
import { byId, won } from '../data.js';
import { ProductImage, Reveal } from '../media.jsx';

// One UNION piece per chapter, worn with what people already own.
const CHAPTERS = [
  { time: '08:10', item: ['u01', 0], bg: '#D9D7D0', fg: '#1B1B1A', with: '가지고 있는 청바지, 흰 운동화', text: '작은 라벨 하나만 보이는 티. 무엇과 입어도 정돈돼 보여요.' },
  { time: '15:40', item: ['u02', 1], bg: '#E6E1D6', fg: '#1B1B1A', with: '회색 반바지, 긴 양말', text: '로고가 큰 날은 나머지를 덜어내요.' },
  { time: '22:30', item: ['u03', 1], bg: '#2D5E45', fg: '#ECECEA', with: '검정 슬랙스, 로퍼', text: '후디 하나로 밤 약속도 충분해요.' },
  { time: '01:20', item: ['u05', 1], bg: '#1B1B1A', fg: '#ECECEA', with: '편한 트레이닝 바지', text: '늦은 밤에도 대충 입은 것처럼 보이지 않게.' },
];

export default function Lookbook() {
  return (
    <div className="lookbook">
      <header className="wrap page-head">
        <p className="kicker">Lookbook · FW26</p>
        <h1>한 벌이면 충분한 하루</h1>
      </header>
      {CHAPTERS.map((ch) => {
        const [id, c] = ch.item;
        const p = byId[id];
        return (
          <section key={ch.time} className="chapter" style={{ background: ch.bg, color: ch.fg }}>
            <div className="chapter-in">
              <div className="chapter-copy">
                <p className="chapter-time">{ch.time}</p>
                <p className="chapter-text">{ch.text}</p>
                <dl className="chapter-outfit">
                  <div><dt>UNION</dt><dd><Link to={`/product/${id}`}>{p.name}</Link> · {p.colors[c].name} · {won(p.price)}</dd></div>
                  <div><dt>WITH</dt><dd>{ch.with}</dd></div>
                </dl>
              </div>
              <Reveal className="chapter-piece">
                <ProductImage p={p} c={c} />
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
