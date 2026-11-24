import { byId } from '../data.js';
import { photo } from '../photos.js';
import { Reveal } from '../media.jsx';

// One day in four outfits. Each look is laid out like a styled flat lay from the cut-out product photos,
// with the reason it works, the way a stylist would explain it. No prices or shop links.
const LOOKS = [
  { time: '08:10', place: '출근 전', items: ['u01-0', 'u10-0', 'u12-0'], bg: '#D9D7D0', fg: '#1B1B1A',
    note: '흰 티와 회색 바지는 밝기 차이가 작아서 위아래가 끊기지 않아요. 그래서 다리가 길어 보이고, 검정 모자 하나가 시선을 얼굴 쪽으로 올려줘요.',
    with: '흰 운동화, 얇은 시계' },
  { time: '12:40', place: '점심 산책', items: ['u05-0', 'u10-0'], bg: '#E6E1D6', fg: '#1B1B1A',
    note: '오트와 회색은 둘 다 채도가 낮아서 톤온톤으로 묶여요. 맨투맨 밑단 립이 허리를 한 번 잡아줘서 넓은 바지와 비율이 맞아요.',
    with: '갈색 스웨이드 운동화' },
  { time: '18:30', place: '퇴근 후 약속', items: ['u02-1', 'u10-0', 'u12-0'], bg: '#2D5E45', fg: '#ECECEA',
    note: '로고가 큰 날은 나머지를 무채색으로 비워요. 검정 티와 검정 모자가 위아래를 이어주고, 회색 바지가 전체 무게를 덜어줘요.',
    with: '검정 가죽 스니커즈' },
  { time: '23:40', place: '막차', items: ['u03-0', 'u10-0'], bg: '#1B1B1A', fg: '#ECECEA',
    note: '같은 회색 위아래는 실루엣이 한 덩어리로 보여서 키가 커 보여요. 후디 끈 길이만 좌우 똑같이 맞추면 대충 입은 느낌이 사라져요.',
    with: '흰 양말, 슬라이드' },
];

const nameOf = (key) => {
  const [id, c] = key.split('-');
  const p = byId[id];
  return `${p.ko} · ${p.colors[+c].name}`;
};

export default function Lookbook() {
  return (
    <div className="lookbook">
      <header className="wrap page-head">
        <p className="kicker">Lookbook · FW26</p>
        <h1>UNION의 하루</h1>
      </header>
      {LOOKS.map((l) => (
        <section key={l.time} className="chapter" style={{ background: l.bg, color: l.fg }}>
          <div className="chapter-in">
            <div className="chapter-copy">
              <p className="chapter-time">{l.time}</p>
              <p className="chapter-place">{l.place}</p>
              <p className="chapter-text">{l.note}</p>
              <dl className="chapter-outfit">
                <div><dt>WEARING</dt><dd>{l.items.map(nameOf).join(', ')}</dd></div>
                <div><dt>WITH</dt><dd>{l.with}</dd></div>
              </dl>
            </div>
            <Reveal className={`look-set look-set-${l.items.length}`}>
              {l.items.filter((k) => photo[k]).map((k, i) => <img key={k} src={photo[k]} alt={nameOf(k)} className={`ls-i ls-i${i}`} loading="lazy" decoding="async" />)}
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
