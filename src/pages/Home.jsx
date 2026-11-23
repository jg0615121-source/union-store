import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, byId, looks, products } from '../data.js';
import { Garment } from '../garments.jsx';
import { Grid, LookArt, Rail, SectionHead } from '../components.jsx';
import { Photo, ProductImage, Reveal } from '../media.jsx';
import { photo } from '../photos.js';
import { useStore } from '../store.jsx';
import { forYou } from '../recommend.js';

const STOPS = ['홍대입구', '신촌', '시청', '을지로입구', '성수', '잠실', '강남', '신림'];
const MARQUEE = ['LINE 2 LOOP', 'SEOUL 02', 'N26 NIGHT ROUTE', 'HAN RIVER CVS', 'MANGWON MARKET', '98.1 STATIC'];

function useSeoulWeather() {
  const [w, setW] = useState(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=temperature_2m,precipitation,weather_code&timezone=Asia%2FSeoul')
      .then((r) => r.json())
      .then((d) => { if (!d.current) throw new Error('no data'); setW(d.current); })
      .catch(() => setW({ temperature_2m: 12, precipitation: 0, offline: true }));
  }, []);
  return w;
}

function Weather() {
  const w = useSeoulWeather();
  if (!w) return null;
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
    <Reveal className="weather">
      <div className="weather-now">
        <p className="kicker">Today in Seoul{w.offline && ' · 예시'}</p>
        <p className="temp">{t}°C</p>
        <p className="weather-tip">{tip}</p>
      </div>
      <div className="weather-picks">
        {picks.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`}>
            <div className="wp-img"><ProductImage p={p} /></div>
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

export default function Home() {
  const { viewed, profile } = useStore();
  const mine = forYou({ viewed, profile });
  const editorial = [looks.find((l) => l.id === 'l01'), looks.find((l) => l.id === 'l02')];
  return (
    <>
      <section className="hero">
        <Photo name="look-l03" alt="새벽 1시 신촌오거리 정류장, N26 맨투맨을 입은 모델" className="hero-photo" eager fallback={
          <div className="hero-fallback" aria-hidden="true">
            <svg viewBox="-300 -300 600 600" className="hf-ring">
              <circle r="236" className="hf-track" />
              <circle r="236" className="hf-line" pathLength="1" />
              {Array.from({ length: 51 }, (_, i) => {
                const a = (i / 51) * Math.PI * 2 - Math.PI / 2;
                return <circle key={i} cx={Math.cos(a) * 236} cy={Math.sin(a) * 236} r={i % 10 ? 3 : 7} className="hf-stop" style={{ animationDelay: `${0.4 + i * 0.03}s` }} />;
              })}
            </svg>
            <div className="hf-meta"><span>LINE 2</span><span>51 STATIONS</span><span>48.8 KM</span><span>SEOUL 02</span></div>
          </div>
        } />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker">FW26 — Loop Collection</p>
          <h1>서울을 한 바퀴 입다</h1>
          <div className="hero-links">
            <Link to="/shop">컬렉션 보기</Link>
            <Link to="/lookbook">룩북 보기</Link>
          </div>
        </div>
        {photo['look-l03'] && <p className="hero-cap">01:26 · N26 신촌오거리</p>}
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => <span key={k}>{MARQUEE.map((m) => <em key={m}>{m}</em>)}</span>)}
        </div>
      </div>

      <section className="edit2">
        {editorial.map((l) => (
          <Reveal key={l.id} as={Link} to={`/snap#${l.id}`} className="edit-tile">
            <LookArt look={l} />
            <div className="edit-cap">
              <span>{l.name}</span>
              <span className="u">이 룩 쇼핑하기</span>
            </div>
          </Reveal>
        ))}
      </section>

      <div className="wrap stack">
        <section>
          <SectionHead kicker="New in" title="이번 주 새로 나온 옷" to="/shop?sort=new" />
          <Rail ids={products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew).slice(0, 3)).map((p) => p.id)} />
        </section>

        <Reveal as="section" className="statement">
          <p className="kicker">About UNION</p>
          <p className="statement-text">서울에서 시작한 두 개의 라인. 로고가 주인공인 LOOP과, 원단과 실루엣으로 말하는 02. UNION은 이 둘을 섞어 입는 사람을 위해 옷을 만들어요.</p>
          <Link to="/magazine/why-02" className="more">왜 서울인가</Link>
        </Reveal>

        <section className="lines">
          {[['LOOP', 'u02', '스트릿 라인', '링 로고와 루프 카모. 시즌마다 적게 만들고 다시 만들지 않아요.'],
            ['02', 'u13', '컨템포러리 라인', '심지를 뺀 블레이저, 플리츠 트라우저, 메리노 니트. 로고 대신 원단으로.']].map(([line, id, t, d]) => (
            <Reveal key={line} as={Link} to={`/shop?line=${line}`} className="line-tile">
              <div className="line-img"><ProductImage p={byId[id]} /></div>
              <div className="line-copy">
                <p className="line-name">{line}</p>
                <p className="kicker">{t}</p>
                <p>{d}</p>
                <span className="more">{line} 보기</span>
              </div>
            </Reveal>
          ))}
        </section>

        <Weather />

        <section>
          <SectionHead kicker="Ranking" title="지금 가장 많이 담긴 옷" to="/shop?sort=rank" />
          <Grid ids={[...products].sort((a, b) => a.rank - b.rank).slice(0, 4).map((p) => p.id)} ranked />
        </section>

        {mine.length > 0 && (
          <section>
            <SectionHead kicker="For you" title={profile ? `'${profile.name}' 취향으로 골랐어요` : '최근 본 옷과 비슷한 것들'} />
            <Grid ids={mine.slice(0, 4)} />
          </section>
        )}
      </div>

      <section className="play">
        <div className="play-in">
          <div className="play-head">
            <p className="kicker">Play</p>
            <h2>옷 고르기가 어렵다면,<br />놀면서 찾아요</h2>
          </div>
          {[['/mbti', '패션 MBTI', '12문항으로 알아보는 내 옷 성향. 16가지 유형 중 하나가 나와요.'],
            ['/worldcup', '코디 이상형 월드컵', '둘 중 더 끌리는 코디를 고르다 보면 내 취향이 남아요.'],
            ['/fit-check', 'AI 코디 체크', '사진 한 장으로 조합을 보고 바꿀 점과 어울리는 옷을 알려줘요.'],
            ['/stylist', 'AI 스타일리스트', '어디 가는지만 말하면 세 벌을 골라드려요.']].map(([to, t, d]) => (
            <Link key={to} to={to} className="play-row">
              <span className="play-t">{t}</span>
              <span className="play-d">{d}</span>
              <span className="play-go" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="wrap stack">
        <section>
          <SectionHead kicker="Journal" title="읽을거리" to="/magazine" />
          <div className="mag-row">
            {articles.slice(0, 3).map((a) => (
              <Reveal key={a.id} as={Link} to={`/magazine/${a.id}`} className="mag-card">
                <p className="kicker">{a.kicker} · {a.minutes}분</p>
                <h3>{a.title}</h3>
                <p>{a.lede}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
