import { Link } from 'react-router-dom';
import { byId, looks, won } from '../data.js';
import { LookArt } from '../components.jsx';

// One day in Seoul, in order. The times are the sequence, so they are shown.
const CHAPTERS = [
  { time: '07:48', place: 'Seongsu', look: 'l01', bg: '#D9D7D0', fg: '#1B1B1A', text: '월요일 아침. 심지를 뺀 블레이저 안에 무지 티 한 장. 차려입었지만 애쓰지 않은 얼굴.' },
  { time: '16:20', place: 'Yeouido', look: 'l02', bg: '#E6E1D6', fg: '#1B1B1A', text: '강바람이 부는 오후. 링 로고 티에 쇼츠, 카모 볼캡. 로고는 하나만 크게.' },
  { time: '23:10', place: 'Euljiro', look: 'l09', bg: '#2D5E45', fg: '#ECECEA', text: '골목 안으로 들어가는 밤. 셔닐 바시티와 플리츠 트라우저. 스트릿과 테일러링이 한 벌 안에서 만나요.' },
  { time: '01:26', place: 'Sinchon', look: 'l03', bg: '#1B1B1A', fg: '#ECECEA', text: '막차가 끊긴 시간. 심야버스 노선판을 작은 자수로 단 맨투맨, 나일론 트랙팬츠.' },
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
