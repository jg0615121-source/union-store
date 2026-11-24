import { Photo } from '../media.jsx';
import { photo } from '../photos.js';

// One day in three looks (막차 comes back later, see docs/TODO.md). Captions stay short, the way printed lookbooks run them.
// Photos are optional: add src/assets/photos/lookbook-<n>.webp (n = 1..3) and each chapter shows it.
const LOOKS = [
  { time: '08:10', place: '출근 전', bg: '#D9D7D0', fg: '#1B1B1A', note: '모자 하나 눌러쓰고 나간다.', with: 'White tee, grey trousers, black cap' },
  { time: '12:40', place: '점심', bg: '#E6E1D6', fg: '#1B1B1A', note: '볕이 좋아서 맨투맨 한 장.', with: 'UNION Sweatshirt Oat, Wide Sweatpants Concrete' },
  { time: '18:30', place: '퇴근길', bg: '#2D5E45', fg: '#ECECEA', note: '모자는 벗을까 하다 그냥 썼다.', with: 'UNION Signature Tee White, Wide Sweatpants Concrete, Cap Black' },
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
