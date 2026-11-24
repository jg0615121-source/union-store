import { Photo } from '../media.jsx';
import { photo } from '../photos.js';

// One day in four looks, written the way a stylist explains them.
// Photos are optional: add src/assets/photos/lookbook-<n>.webp (n = 1..4) and each chapter shows it.
const LOOKS = [
  { time: '08:10', place: '출근 전', bg: '#D9D7D0', fg: '#1B1B1A',
    note: '흰 티에 회색 바지. 밝기 차이가 작아서 위아래가 끊기지 않고, 다리가 길어 보여요. 검정 모자 하나가 시선을 얼굴 쪽으로 올려줘요.',
    with: '흰 운동화, 얇은 시계' },
  { time: '12:40', place: '점심 산책', bg: '#E6E1D6', fg: '#1B1B1A',
    note: '오트 맨투맨에 회색 바지. 둘 다 채도가 낮아서 톤온톤으로 묶여요. 밑단 립이 허리를 한 번 잡아줘서 넓은 바지와 비율이 맞아요.',
    with: '갈색 스웨이드 운동화' },
  { time: '18:30', place: '퇴근 후 약속', bg: '#2D5E45', fg: '#ECECEA',
    note: '로고가 큰 티를 입는 날은 나머지를 무채색으로 비워요. 검정 티와 검정 모자가 위아래를 이어주고, 회색 바지가 무게를 덜어줘요.',
    with: '검정 가죽 스니커즈' },
  { time: '23:40', place: '막차', bg: '#1B1B1A', fg: '#ECECEA',
    note: '회색 후디에 같은 회색 바지. 실루엣이 한 덩어리로 보여서 키가 커 보여요. 후디 끈 길이만 좌우 똑같이 맞추면 대충 입은 느낌이 사라져요.',
    with: '흰 양말, 슬라이드' },
];

export default function Lookbook() {
  return (
    <div className="lookbook">
      <header className="wrap page-head">
        <p className="kicker">Lookbook · FW26</p>
        <h1>하루</h1>
      </header>
      {LOOKS.map((l, i) => {
        const name = `lookbook-${i + 1}`;
        return (
          <section key={l.time} className={`chapter ${photo[name] ? '' : 'no-photo'}`} style={{ background: l.bg, color: l.fg }}>
            <div className="chapter-in">
              <div className="chapter-copy">
                <p className="chapter-time">{l.time}</p>
                <p className="chapter-place">{l.place}</p>
                <p className="chapter-text">{l.note}</p>
                <dl className="chapter-outfit"><div><dt>WITH</dt><dd>{l.with}</dd></div></dl>
              </div>
              {photo[name] && <div className="chapter-piece"><Photo name={name} alt={`${l.time} ${l.place}`} /></div>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
