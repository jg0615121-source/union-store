import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, byId, looks, products, won } from '../data.js';
import { Garment } from '../garments.jsx';
import { Grid, LookArt, SectionHead } from '../components.jsx';
import { useStore } from '../store.jsx';
import { forYou } from '../recommend.js';

const STOPS = ['홍대입구', '신촌', '시청', '을지로입구', '성수', '잠실', '강남', '신림'];

function Weather() {
  const [w, setW] = useState(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=temperature_2m,precipitation,weather_code&timezone=Asia%2FSeoul')
      .then((r) => r.json())
      .then((d) => { if (!d.current) throw new Error('no data'); setW(d.current); })
      .catch(() => setW({ temperature_2m: 12, precipitation: 0, offline: true }));
  }, []);
  if (!w) return <div className="weather"><p className="muted">서울 날씨 불러오는 중…</p></div>;
  const t = Math.round(w.temperature_2m);
  const rain = w.precipitation > 0 || [61, 63, 65, 80, 81, 82].includes(w.weather_code);
  const scene = rain ? '비' : t <= 5 ? '겨울' : t <= 16 ? '가을' : t <= 23 ? '봄' : '여름';
  const tip = rain ? '젖어도 금방 마르는 나일론 겉옷에 어두운 바지.'
    : t <= 5 ? '두꺼운 후디나 바시티에 비니까지. 귀가 따뜻하면 체감이 달라요.'
      : t <= 16 ? '맨투맨이나 롱슬리브 한 장, 저녁엔 가벼운 재킷.'
        : t <= 23 ? '긴팔 한 장이면 충분해요. 낮엔 소매를 걷어요.'
          : '두꺼운 반팔에 쇼츠. 땀이 비치지 않는 짙은 색이 편해요.';
  const picks = products.filter((p) => p.scenes.includes(scene)).slice(0, 3);
  return (
    <div className="weather">
      <div className="weather-now">
        <p className="kicker">TODAY IN SEOUL{w.offline && ' · 예시'}</p>
        <p className="temp">{t}°<span>{rain ? '비' : '맑음/흐림'}</span></p>
        <p>{tip}</p>
      </div>
      <div className="weather-picks">
        {picks.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`}>
            <Garment product={p} />
            <span>{p.ko}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { viewed, profile } = useStore();
  const mine = forYou({ viewed, profile });
  return (
    <>
      <section className="hero">
        <div className="hero-in">
          <div className="hero-copy">
            <p className="kicker">FW26 · LOOP COLLECTION</p>
            <h1>서울을<br />한 바퀴<br />입다</h1>
            <p className="hero-sub">지역번호 02, 심야버스 N26, 한강 편의점 영수증. 서울 사람이면 다 아는 장면을 그래픽으로 옮겼어요.</p>
            <div className="hero-cta">
              <Link to="/shop" className="btn">컬렉션 보기</Link>
              <Link to="/mbti" className="btn ghost">내 패션 MBTI 찾기</Link>
            </div>
          </div>
          <div className="hero-art">
            <Garment product={byId.u01} c={0} view="back" className="hero-g1" />
            <Garment product={byId.u02} c={1} className="hero-g2" />
          </div>
        </div>
        <ol className="route" aria-label="2호선 노선">
          {STOPS.map((s) => <li key={s}><span>{s}</span></li>)}
        </ol>
      </section>

      <div className="wrap stack">
        <Weather />

        <section>
          <SectionHead kicker="NEW IN" title="이번 주에 나온 옷" to="/shop?sort=new" />
          <Grid ids={products.filter((p) => p.isNew).slice(0, 4).map((p) => p.id)} />
        </section>

        <section className="story">
          <div className="story-copy">
            <p className="kicker">WHY UNION</p>
            <h2>옷을 몰라도<br />읽히는 그래픽</h2>
            <p>핏이나 원단은 몰라도 괜찮아요. 막차 놓친 새벽, 한강에서 먹던 라면은 다 알잖아요. UNION의 그래픽은 전부 서울의 장면에서 왔어요.</p>
            <Link to="/magazine/why-line2" className="more">브랜드 이야기 →</Link>
          </div>
          <ul className="story-tiles">
            {[['u03', 0, 'N26', '새벽 1시의 심야버스'], ['u04', 0, 'CVS', '한강 편의점 영수증'], ['u02', 0, '02', '서울 지역번호'], ['u12', 0, 'MARKET', '망원시장 봉투']].map(([id, c, k, cap]) => (
              <li key={id}>
                <Link to={`/product/${id}`}>
                  <Garment product={byId[id]} c={c} view="detail" />
                  <span><b>{k}</b>{cap}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHead kicker="RANKING" title="지금 제일 많이 담긴 옷" to="/shop?sort=rank" />
          <Grid ids={[...products].sort((a, b) => a.rank - b.rank).slice(0, 4).map((p) => p.id)} ranked />
        </section>

        <section>
          <SectionHead kicker="THREE-PIECE" title="이것만 입으면 끝" to="/snap" more="코디 더 보기" />
          <div className="looks3">
            {[looks[0], looks[2], looks[5]].map((l) => (
              <Link key={l.id} to={`/snap#${l.id}`} className="look">
                <LookArt look={l} />
                <strong>{l.name}</strong>
                <span>{l.items.map(([id]) => byId[id].ko).join(' + ')} · {won(l.items.reduce((a, [id]) => a + byId[id].price, 0))}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="play">
          <Link to="/mbti" className="play-card">
            <p className="kicker">2 MIN TEST</p>
            <h3>패션 MBTI</h3>
            <p>12문항으로 알아보는 내 옷 성향. 16가지 유형 중 하나가 나와요.</p>
          </Link>
          <Link to="/worldcup" className="play-card">
            <p className="kicker">16 → 1</p>
            <h3>코디 이상형 월드컵</h3>
            <p>둘 중 더 끌리는 코디를 고르다 보면 내 취향이 남아요.</p>
          </Link>
          <Link to="/fit-check" className="play-card dark">
            <p className="kicker">AI FIT CHECK</p>
            <h3>오늘 코디, 몇 점?</h3>
            <p>사진 한 장 올리면 조합을 보고 바꿀 점과 어울리는 옷을 알려줘요.</p>
          </Link>
        </section>

        {mine.length > 0 && (
          <section>
            <SectionHead kicker="FOR YOU" title={profile ? `'${profile.name}' 취향으로 골랐어요` : '최근 본 옷과 비슷한 것들'} />
            <Grid ids={mine.slice(0, 4)} />
          </section>
        )}

        <section>
          <SectionHead kicker="MAGAZINE" title="읽을거리" to="/magazine" />
          <div className="mag-row">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.id} to={`/magazine/${a.id}`} className="mag-card">
                <p className="kicker">{a.kicker} · {a.minutes}분</p>
                <h3>{a.title}</h3>
                <p>{a.lede}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
