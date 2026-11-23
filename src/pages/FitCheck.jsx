import { useState } from 'react';
import { Grid } from '../components.jsx';
import { askAI } from '../ai.js';
import { scoreByTags } from '../recommend.js';

// Shrinks the photo before upload and samples its colours for the offline fallback.
function readImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 1024 / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.width * k);
      cv.height = Math.round(img.height * k);
      const g = cv.getContext('2d');
      g.drawImage(img, 0, 0, cv.width, cv.height);
      const { data } = g.getImageData(0, 0, cv.width, cv.height);
      let sat = 0, light = 0, n = 0;
      for (let i = 0; i < data.length; i += 4 * 97) {
        const [r, gg, b] = [data[i] / 255, data[i + 1] / 255, data[i + 2] / 255];
        const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
        sat += mx === 0 ? 0 : (mx - mn) / mx;
        light += (mx + mn) / 2;
        n++;
      }
      URL.revokeObjectURL(img.src);
      resolve({ url: cv.toDataURL('image/jpeg', 0.85), sat: sat / n, light: light / n });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function localFit({ sat, light }) {
  const bold = sat > 0.32;
  const dark = light < 0.38;
  return {
    score: Math.round(72 + (bold ? 6 : 10) - Math.abs(light - 0.5) * 10),
    style: bold ? '컬러 포인트 캐주얼' : dark ? '다크 톤 스트릿' : '뉴트럴 미니멀',
    good: [bold ? '색을 과감하게 쓴 게 사진에서 먼저 보여요.' : '톤을 맞춰서 전체가 차분하게 정리돼 보여요.', dark ? '어두운 톤이라 실루엣이 깔끔하게 살아요.' : '밝은 톤이라 얼굴이 환해 보여요.'],
    fix: [bold ? '튀는 색이 둘 이상이면 하나는 무채색으로 바꿔보세요.' : '모자나 비니로 색 하나만 얹으면 사진이 달라져요.', '상의와 하의 중 하나는 넉넉하게, 하나는 단정하게 가면 비율이 좋아져요.'],
    productIds: scoreByTags(bold ? ['mono', 'essential'] : ['bold', 'street']).slice(0, 3),
  };
}

export default function FitCheck() {
  const [img, setImg] = useState(null);
  const [note, setNote] = useState('');
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const pick = async (file) => {
    setErr(''); setRes(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) return setErr('사진 파일만 올릴 수 있어요. JPG나 PNG로 올려주세요.');
    try { setImg(await readImage(file)); } catch { setErr('사진을 읽지 못했어요. 다른 사진으로 해보세요.'); }
  };

  const run = async () => {
    setBusy(true);
    const r = await askAI('fitcheck', { image: img.url, note });
    setRes(r?.score ? { ...r, by: 'ai' } : { ...localFit(img), by: 'local' });
    setBusy(false);
  };

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">AI FIT CHECK</p>
        <h1>오늘 코디, 몇 점?</h1>
        <p className="muted">전신 거울 사진 한 장이면 돼요. 얼굴이나 체형은 보지 않고 옷 조합만 봐요. 사진은 분석에만 쓰고 저장하지 않아요.</p>
      </header>
      <div className="fit">
        <label className={`drop ${img ? 'has' : ''}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]); }}>
          {img ? <img src={img.url} alt="올린 코디 사진" /> : <span>사진을 끌어놓거나 눌러서 고르기</span>}
          <input id="fit-file" type="file" accept="image/*" onChange={(e) => pick(e.target.files[0])} />
        </label>
        <div className="fit-side">
          <label htmlFor="fit-note">어디 가는 코디예요? (선택)</label>
          <input id="fit-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="예: 내일 소개팅" maxLength={200} />
          <button className="btn full" disabled={!img || busy} onClick={run}>{busy ? '보는 중…' : '점수 받기'}</button>
          {err && <p className="err">{err}</p>}
          {res && (
            <div className="fit-res">
              <p className="kicker">{res.by === 'ai' ? 'AI 분석' : '색 분석'} · {res.style}</p>
              <p className="score">{res.score}<span>/100</span></p>
              <h3>좋은 점</h3>
              <ul>{res.good?.map((x) => <li key={x}>{x}</li>)}</ul>
              <h3>바꿔보면</h3>
              <ul>{res.fix?.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
      {res?.productIds?.length > 0 && (
        <section><h2 className="h2">이걸 더하면 좋아요</h2><Grid ids={res.productIds} /></section>
      )}
    </div>
  );
}
