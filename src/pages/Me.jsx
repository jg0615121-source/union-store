import { Link } from 'react-router-dom';
import { Grid } from '../components.jsx';
import { useStore } from '../store.jsx';
import { forYou } from '../recommend.js';

export default function Me() {
  const { wish, viewed, profile, setProfile } = useStore();
  const mine = forYou({ viewed, profile });
  return (
    <div className="wrap page stack">
      <header className="page-head"><p className="kicker">MY</p><h1>내 옷장</h1></header>
      <section className="me-profile">
        {profile ? (
          <>
            <div><p className="kicker">내 취향</p><h2>{profile.name}</h2><p className="muted">{profile.code === 'CUP' ? '코디 월드컵 결과' : `패션 MBTI ${profile.code}`}로 저장됐어요.</p></div>
            <button className="btn ghost small" onClick={() => setProfile(null)}>취향 지우기</button>
          </>
        ) : (
          <>
            <div><p className="kicker">내 취향</p><h2>아직 몰라요</h2><p className="muted">2분 테스트로 취향을 저장하면 추천이 정확해져요.</p></div>
            <div className="hero-cta"><Link to="/mbti" className="btn small">패션 MBTI</Link><Link to="/worldcup" className="btn ghost small">코디 월드컵</Link></div>
          </>
        )}
      </section>
      <section><h2 className="h2">찜한 옷 {wish.length}</h2>{wish.length ? <Grid ids={wish} /> : <p className="empty">마음에 드는 옷에서 하트를 누르면 여기 모여요.</p>}</section>
      {viewed.length > 0 && <section><h2 className="h2">최근 본 옷</h2><Grid ids={viewed.slice(0, 8)} /></section>}
      {mine.length > 0 && <section><h2 className="h2">나를 위한 추천</h2><Grid ids={mine.slice(0, 4)} /></section>}
    </div>
  );
}
