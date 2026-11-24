import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MBTI_Q, MBTI_TYPES, axisTags } from '../data.js';
import { Grid } from '../components.jsx';
import { useStore } from '../store.jsx';
import { scoreByTags } from '../recommend.js';

const AXES = [['E', 'I', '외향', '내향'], ['S', 'N', '감각', '직관'], ['T', 'F', '사고', '감정'], ['J', 'P', '계획', '즉흥']];
const CODES = Object.keys(MBTI_TYPES);

export function codeFrom(answers) {
  return AXES.map(([a, b]) => (answers.filter((x) => x === a).length >= answers.filter((x) => x === b).length ? a : b)).join('');
}

function Result({ code, ans, onReset }) {
  const [name, desc, wear] = MBTI_TYPES[code];
  const [copied, setCopied] = useState(false);
  return (
    <div className="page-route">
      <section className="mb-result">
        <div className="wrap mb-result-in">
          <p className="kicker">패션 MBTI</p>
          <p className="mb-code">{code}</p>
          <h1>{name}</h1>
          <p className="mb-desc">{desc}</p>
          {ans && (
            <dl className="axes">
              {AXES.map(([a, b, la, lb]) => {
                const n = ans.filter((x) => x === a).length;
                const m = ans.filter((x) => x === b).length;
                return (
                  <div key={a}>
                    <dt>{a} {la}</dt>
                    <dd><span className="axis"><i style={{ width: `${(n / (n + m)) * 100}%` }} /></span></dd>
                    <dt>{lb} {b}</dt>
                  </div>
                );
              })}
            </dl>
          )}
          <div className="mb-wear"><span>UNION으로 입으면</span><p>{wear}</p></div>
          <div className="hero-cta">
            <button className="btn" onClick={() => navigator.clipboard?.writeText(`나는 ${code} "${name}" · UNION 패션 MBTI`).then(() => setCopied(true), () => {})}>{copied ? '복사했어요' : '결과 복사하기'}</button>
            <button className="btn ghost" onClick={onReset}>다시 하기</button>
            <Link to="/worldcup" className="btn ghost">코디 월드컵</Link>
          </div>
        </div>
      </section>
      <section className="wrap mb-picks">
        <h2 className="h2">{code}에게 어울리는 옷</h2>
        <Grid ids={scoreByTags(axisTags(code)).slice(0, 4)} />
      </section>
    </div>
  );
}

export default function Mbti() {
  const { setProfile } = useStore();
  const [mode, setMode] = useState('intro');
  const [ans, setAns] = useState([]);
  const [code, setCode] = useState(null);

  const finish = (c, answers) => {
    setCode(c);
    setAns(answers);
    setProfile({ code: c, name: MBTI_TYPES[c][0], tags: axisTags(c) });
    setMode('result');
  };
  const reset = () => { setAns([]); setCode(null); setMode('intro'); };

  if (mode === 'result') return <Result code={code} ans={ans.length ? ans : null} onReset={reset} />;

  if (mode === 'quiz') {
    const i = ans.length;
    const q = MBTI_Q[i];
    const answer = (l) => {
      const next = [...ans, l];
      if (next.length === MBTI_Q.length) finish(codeFrom(next), next);
      else setAns(next);
    };
    return (
      <div className="wrap quiz">
        <div className="quiz-top">
          <span className="kicker">{String(i + 1).padStart(2, '0')} / {MBTI_Q.length}</span>
          <div className="bar"><i style={{ width: `${(i / MBTI_Q.length) * 100}%` }} /></div>
        </div>
        <h1 key={i} className="quiz-q">{q.q}</h1>
        <div className="answers">
          {q.a.map(([l, t], k) => (
            <button key={l + i} onClick={() => answer(l)}><span className="ans-k">{k ? 'B' : 'A'}</span>{t}</button>
          ))}
        </div>
        {i > 0 && <button className="link" onClick={() => setAns(ans.slice(0, -1))}>이전 질문</button>}
      </div>
    );
  }

  return (
    <div className="mb-intro">
      <div className="wrap mb-intro-in">
        <p className="kicker">Play · 패션 MBTI</p>
        <h1>내 성격이 고르는 옷</h1>
        <div className="mb-choices">
          <button className="mb-choice" onClick={() => setMode('quiz')}>
            <span className="mb-choice-n">12</span>
            <span className="mb-choice-t">질문으로 알아보기</span>
          </button>
          <div className="mb-choice mb-known">
            <span className="mb-choice-t">내 MBTI 바로 고르기</span>
            <div className="mb-grid">
              {CODES.map((c) => <button key={c} onClick={() => finish(c, [])}>{c}</button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
