import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data.js';
import { ProductImage, Reveal } from '../media.jsx';

const ITEMS = [
  ['/mbti', '패션 MBTI', 'ENFP', '#2D5E45'],
  ['/worldcup', '코디 이상형 월드컵', '16→1', '#1B1B1A'],
  ['/fit-check', 'AI 코디 체크', '87', '#E6E1D6'],
  ['/stylist', 'AI 스타일리스트', '뭐 입지?', '#ACACA6'],
];

function useWeather() {
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
  const w = useWeather();
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
        <p className="kicker">오늘 날씨{w.offline && ' · 예시'}</p>
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

export default function Play() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Play</h1>
      </header>
      <div className="play-tiles">
        {ITEMS.map(([to, t, big, bg]) => (
          <Link key={to} to={to} className="play-tile" style={{ background: bg, color: bg === '#E6E1D6' || bg === '#ACACA6' ? '#1B1B1A' : '#ECECEA' }}>
            <span className="pt-big">{big}</span>
            <span className="pt-t">{t}<span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
      <Weather />
    </div>
  );
}
