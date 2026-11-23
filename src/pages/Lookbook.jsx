import { Link } from 'react-router-dom';
import { byId, looks, won } from '../data.js';
import { LookArt } from '../components.jsx';

// One day in Seoul, in order. The times are the sequence, so they are shown.
const CHAPTERS = [
  { time: '07:48', place: '2호선 을지로입구', look: 'l01', bg: '#D9DBDD', fg: '#141516', text: '사람이 제일 많은 시간. 로고 하나만 작게, 바지는 넉넉하게. 출근길엔 튀지 않는 게 멋이에요.' },
  { time: '19:42', place: '여의도 한강공원', look: 'l02', bg: '#EBDD9F', fg: '#141516', text: '돗자리 펴고 라면 끓이는 저녁. 영수증 티 하나로 오늘 무슨 날인지 다 보여요.' },
  { time: '23:10', place: '을지로 3가', look: 'l09', bg: '#00A84D', fg: '#F7F7F5', text: '골목 안 술집으로 들어가는 시간. 초록 바시티는 어두운 골목에서 제일 먼저 보여요.' },
  { time: '01:26', place: 'N26 신촌오거리', look: 'l03', bg: '#1F2A44', fg: '#EDEDE8', text: '막차는 갔고 심야버스가 와요. 노선판을 입은 사람이 노선판 아래 서 있는 밤.' },
];

export default function Lookbook() {
  return (
    <div className="lookbook">
      <header className="wrap page-head">
        <p className="kicker">LOOKBOOK · FW26</p>
        <h1>서울의 하루, 네 벌</h1>
        <p className="muted">아침 출근부터 새벽 심야버스까지. 같은 도시, 다른 시간의 옷.</p>
      </header>
      {CHAPTERS.map((ch) => {
        const look = looks.find((l) => l.id === ch.look);
        return (
          <section key={ch.time} className="chapter" style={{ background: ch.bg, color: ch.fg }}>
            <div className="chapter-in">
              <div className="chapter-copy">
                <p className="chapter-time">{ch.time}</p>
                <p className="chapter-place">{ch.place}</p>
                <h2>{look.name}</h2>
                <p>{ch.text}</p>
                <ul>
                  {look.items.map(([id, c]) => (
                    <li key={id}><Link to={`/product/${id}`}>{byId[id].name}</Link><span>{byId[id].colors[c].name} · {won(byId[id].price)}</span></li>
                  ))}
                </ul>
              </div>
              <LookArt look={look} tone="transparent" />
            </div>
          </section>
        );
      })}
    </div>
  );
}
