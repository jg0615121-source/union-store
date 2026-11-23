import { Link } from 'react-router-dom';
import { byId, looks, won } from '../data.js';
import { LookArt } from '../components.jsx';

// One day, in order. The times are the sequence, so they are shown.
const CHAPTERS = [
  { time: '08:10', place: 'Morning', look: 'l01', bg: '#D9D7D0', fg: '#1B1B1A', text: '작은 심볼 티에 와이드 팬츠, 볼캡. 꾸민 듯 안 꾸민 듯한 아침.' },
  { time: '15:40', place: 'Afternoon', look: 'l02', bg: '#E6E1D6', fg: '#1B1B1A', text: '빅 로고 티와 쇼츠. 로고는 하나만 크게, 나머지는 조용하게.' },
  { time: '22:30', place: 'Night', look: 'l09', bg: '#2D5E45', fg: '#ECECEA', text: '바시티 재킷과 비니. 쌀쌀해진 밤에 걸치는 한 벌.' },
  { time: '01:20', place: 'Late night', look: 'l03', bg: '#1B1B1A', fg: '#ECECEA', text: '맨투맨과 트랙팬츠. 막차를 놓쳐도 편한 옷.' },
];

export default function Lookbook() {
  return (
    <div className="lookbook">
      <header className="wrap page-head">
        <p className="kicker">LOOKBOOK · FW26</p>
        <h1>FW26 — 하루, 네 벌</h1>
        <p className="muted">아침 7시부터 새벽 1시까지. 두 라인을 섞어 입는 하루.</p>
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
