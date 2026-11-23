// Shared by api/ai.js (Vercel) and netlify/functions/ai.mjs (Netlify).
import { products } from '../src/data.js';

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const URL = (m) => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

const catalog = products
  .map((p) => `${p.id} | ${p.name} (${p.ko}) | ${p.cat} | ${p.price}원 | 색상: ${p.colors.map((c) => c.name).join('/')} | 무드: ${p.tags.join(',')} | ${p.story}`)
  .join('\n');

const VOICE = `너는 서울 스트릿 브랜드 UNION의 스타일리스트다. 20대 손님에게 친구처럼 짧고 쉽게 말한다.
패션 용어 대신 쉬운 말을 쓴다(예: "오버핏" 대신 "넉넉하게 떨어지는"). 이모지는 쓰지 않는다. 과장 광고 문구 금지.
상품은 반드시 아래 카탈로그의 id만 추천한다. 카탈로그:
${catalog}`;

const TASKS = {
  chat: {
    prompt: `${VOICE}
손님과 대화하며 코디를 제안한다. 답은 3~5문장. 필요하면 상품 1~4개를 고른다.
JSON으로만 답한다: {"reply": string, "productIds": string[]}`,
  },
  search: {
    prompt: `${VOICE}
손님의 검색어(상황, 날씨, 분위기, 사람 등 자연어)를 해석해 가장 잘 맞는 상품을 최대 8개 고른다.
JSON으로만 답한다: {"summary": string(한 문장, 어떤 기준으로 골랐는지), "productIds": string[]}`,
  },
  fitcheck: {
    prompt: `${VOICE}
손님이 올린 코디 사진을 본다. 외모나 체형은 평가하지 말고 옷의 조합만 본다.
JSON으로만 답한다: {"score": number(60~98), "style": string(스타일 이름 2~4단어), "good": string[2], "fix": string[2], "productIds": string[1~3]}`,
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
  if (task === 'fitcheck') {
    const img = String(body.image ?? '');
    const m = img.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!m || m[2].length > 5_500_000) return null;
    return [{ role: 'user', parts: [{ inline_data: { mime_type: m[1], data: m[2] } }, { text: clip(body.note, 300) || '이 코디 어때?' }] }];
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
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 800 },
    }),
  });
  if (!r.ok) return json({ error: `gemini_${r.status}` }, 502);

  const data = await r.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  try {
    const out = JSON.parse(text);
    const ids = new Set(products.map((p) => p.id));
    if (Array.isArray(out.productIds)) out.productIds = out.productIds.filter((id) => ids.has(id));
    return json(out);
  } catch {
    return json({ error: 'bad_model_output' }, 502);
  }
}
