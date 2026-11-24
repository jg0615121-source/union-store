// Shared by api/ai.js (Vercel) and netlify/functions/ai.mjs (Netlify).
import { products } from '../src/data.js';

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const URL = (m) => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

const catalog = products
  .map((p) => `${p.id} | ${p.name} (${p.ko}) | ${p.cat} | ${p.price}원 | 색상: ${p.colors.map((c) => c.name).join('/')} | 무드: ${p.tags.join(',')} | ${p.story}`)
  .join('\n');

const VOICE = `너는 캐주얼 브랜드 UNION의 스타일리스트다. 20대 손님에게 친구처럼 짧고 쉽게 말한다.
패션 용어 대신 쉬운 말을 쓴다(예: "오버핏" 대신 "넉넉하게 떨어지는"). 이모지는 쓰지 않는다. 과장 광고 문구 금지.
상품은 반드시 아래 카탈로그의 id만 추천한다. 카탈로그:
${catalog}`;

const TASKS = {
  chat: {
    // A fashion advisor, not a salesperson: answers any clothing question with reasons a professional would give.
    prompt: `너는 20년 경력의 스타일리스트이자 의류 소재·패턴 전문가다. 손님이 옷에 대해 묻는 것에 친구처럼 편하게, 하지만 전문가답게 답한다.
원칙:
- 결론을 먼저 한 문장으로 말하고, 이유를 근거로 든다. 근거는 비율(어깨선, 기장, 허리 위치, 시선 분산), 색(명도·채도 대비, 톤 맞춤, 피부톤), 소재(원단 무게 g/m², 조직, 비침, 드레이프), 핏(여유분, 암홀, 밑단 처리), 상황(TPO) 같은 실제 원리여야 한다.
- 막연한 말("잘 어울려요", "센스 있게") 대신 바로 따라 할 수 있는 구체적인 방법을 준다. 숫자로 말할 수 있으면 숫자로 말한다(예: 소매 기장은 손목뼈에서 1~2cm 위).
- 모르는 건 모른다고 하고, 정보가 부족하면 꼭 필요한 것 하나만 되묻는다(키, 체형, 가는 곳 등).
- 외모나 체형을 깎아내리지 않는다. 이모지와 과장된 광고 문구는 쓰지 않는다.
- 특정 브랜드나 상품을 추천하거나 홍보하지 않는다. 옷의 종류, 색, 소재, 핏으로만 말한다.
- 답은 2~6문장. 목록이 더 읽기 쉬우면 줄바꿈으로 나눈다.
JSON으로만 답한다: {"reply": string}`,
  },
  search: {
    prompt: `${VOICE}
손님의 검색어(상황, 날씨, 분위기, 사람 등 자연어)를 해석해 가장 잘 맞는 상품을 최대 8개 고른다.
JSON으로만 답한다: {"summary": string(한 문장, 어떤 기준으로 골랐는지), "productIds": string[]}`,
  },
  reviews: {
    prompt: `${VOICE}
아래 구매 후기들을 요약한다. 후기에 없는 내용은 지어내지 않는다.
JSON으로만 답한다: {"summary": string(한 문장), "pros": string[2~3], "cons": string[1~2], "sizeTip": string}`,
  },
};

const clip = (s, n) => String(s ?? '').slice(0, n);

// Turns the client payload into Gemini contents; drops anything oversized or malformed.
export function buildContents(task, body) {
  if (task === 'chat') {
    const msgs = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    return msgs.map((m) => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: clip(m.text, 800) }] }));
  }
  const text = task === 'reviews' ? clip(body.reviews, 4000) : clip(body.query, 300);
  return text ? [{ role: 'user', parts: [{ text }] }] : null;
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

export async function handleAI(request) {
  if (request.method !== 'POST') return json({ error: 'POST만 받아요.' }, 405);
  const key = process.env.GEMINI_API_KEY;
  if (!key) return json({ error: 'no_key' }, 501); // client falls back to the built-in recommender

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: '요청 형식이 잘못됐어요.' }, 400);
  }
  const task = TASKS[body?.task];
  const contents = task && buildContents(body.task, body);
  if (!contents?.length) return json({ error: '요청 내용이 비었거나 너무 커요.' }, 400);

  const r = await fetch(URL(MODEL), {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: task.prompt }] },
      contents,
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!r.ok) return json({ error: `gemini_${r.status}` }, 502);

  const data = await r.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const text = parts.filter((p) => !p.thought).map((p) => p.text ?? '').join('');
  try {
    const out = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
    const ids = new Set(products.map((p) => p.id));
    if (Array.isArray(out.productIds)) out.productIds = out.productIds.filter((id) => ids.has(id));
    return json(out);
  } catch {
    return json({ error: 'bad_model_output' }, 502);
  }
}
