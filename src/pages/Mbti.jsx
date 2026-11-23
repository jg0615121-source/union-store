import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MBTI_Q, MBTI_TYPES, axisTags } from '../data.js';
import { Grid } from '../components.jsx';
import { useStore } from '../store.jsx';
import { scoreByTags } from '../recommend.js';

const AXES = [['S', 'C', '스트릿', '클린'], ['B', 'M', '컬러', '무채색'], ['O', 'F', '넉넉', '딱 맞게'], ['T', 'E', '트렌드', '기본템']];

export function codeFrom(answers) {
  return AXES.map(([a, b]) => (answers.filter((x) => x === a).length >= answers.filter((x) => x === b).length ? a : b)).join('');
}

export default function Mbti() {
  const { setProfile } = useStore();
  const [ans, setAns] = useState([]);
  const [copied, setCopied] = useState(false);
  const done = ans.length === MBTI_Q.length;

  const answer = (l) => {
    const next = [...ans, l];
    setAns(next);
    if (next.length === MBTI_Q.length) {
      const code = codeFrom(next);
      setProfile({ code, name: MBTI_TYPES[code][0], tags: axisTags(code) });
    }
  };

  if (!done) {
    const i = ans.length;
    const q = MBTI_Q[i];
    return (
      <div className="wrap page quiz">
        <p className="kicker">패션 MBTI · {i + 1} / {MBTI_Q.length}</p>
        <div className="bar"><i style={{ width: `${(i / MBTI_Q.length) * 100}%` }} /></div>
        <h1>{q.q}</h1>
        <div className="answers">
          {q.a.map(([l, t]) => <button key={l} onClick={() => answer(l)}>{t}</button>)}
        </div>
        {i > 0 && <button className="link" onClick={() => setAns(ans.slice(0, -1))}>← 이전 문항</button>}
      </div>
    );
  }

  const code = codeFrom(ans);
  const [name, desc] = MBTI_TYPES[code];
  const share = `내 패션 MBTI는 ${code} "${name}"`;
  return (
    <div className="wrap page">
      <section className="result">
        <p className="kicker">내 패션 MBTI</p>
        <p className="code">{code}</p>
        <h1>{name}</h1>
        <p>{desc}</p>
        <dl className="axes">
          {AXES.map(([a, b, la, lb]) => {
            const n = ans.filter((x) => x === a).length;
            const m = ans.filter((x) => x === b).length;
            return (
              <div key={a}>
                <dt>{la}</dt>
                <dd><span className="axis"><i style={{ width: `${(n / (n + m)) * 100}%` }} /></span></dd>
                <dt>{lb}</dt>
              </div>
            );
          })}
        </dl>
        <div className="hero-cta">
          <button className="btn" onClick={() => navigator.clipboard?.writeText(`${share} · UNION`).then(() => setCopied(true), () => setCopied(false))}>{copied ? '복사했어요' : '결과 복사하기'}</button>
          <button className="btn ghost" onClick={() => { setAns([]); setCopied(false); }}>다시 하기</button>
          <Link to="/worldcup" className="btn ghost">코디 월드컵도 하기</Link>
        </div>
      </section>
      <section>
        <h2 className="h2">{name}에게 어울리는 옷</h2>
        <Grid ids={scoreByTags(axisTags(code)).slice(0, 8)} />
      </section>
    </div>
  );
}
