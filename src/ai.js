import { products, byId } from './data.js';

// Calls the Gemini function; returns null when it is not configured or fails so callers use the local fallback.
export async function askAI(task, payload) {
  try {
    const r = await fetch('/api/ai', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ task, ...payload }) });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const SYN = {
  비: ['비', '봄', '가을'], 장마: ['비'], 우산: ['비'], 추워: ['추위', '겨울'], 추운: ['추위', '겨울'], 겨울: ['겨울', '추위'],
  더워: ['더위', '여름'], 더운: ['더위', '여름'], 여름: ['여름', '더위'], 봄: ['봄'], 가을: ['가을'],
  데이트: ['데이트'], 소개팅: ['데이트', 'clean'], 출근: ['출근', 'clean'], 회사: ['출근', 'clean'], 면접: ['출근', 'clean'],
  학교: ['캠퍼스'], 수업: ['캠퍼스'], 캠퍼스: ['캠퍼스'], 운동: ['운동'], 러닝: ['운동'], 헬스: ['운동'],
  여행: ['여행'], 공항: ['여행'], 피크닉: ['여름', '데일리'], 밤: ['밤'], 클럽: ['밤', 'street'],
  깔끔: ['clean'], 단정: ['clean'], 무난: ['clean', 'essential'], 힙: ['street', 'trend'], 스트릿: ['street'],
  튀는: ['bold'], 포인트: ['bold'], 화려: ['bold'], 무채색: ['mono'], 블랙: ['mono'], 검정: ['mono'],
  편한: ['oversize'], 넉넉: ['oversize'], 오버: ['oversize'], 기본: ['essential'], 유행: ['trend'], 요즘: ['trend'],
  초록: ['bold'], 선물: ['essential'],
};

export function localSearch(query, limit = 8) {
  const q = query.toLowerCase();
  const want = Object.entries(SYN).filter(([k]) => q.includes(k)).flatMap(([, v]) => v);
  const scored = products.map((p) => {
    const hay = `${p.name} ${p.ko} ${p.story} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase();
    let s = q.split(/\s+/).filter((w) => w.length > 1 && hay.includes(w)).length * 3;
    for (const w of want) if (p.scenes.includes(w) || p.tags.includes(w)) s += 2;
    return [p, s];
  });
  const hits = scored.filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).map(([p]) => p.id);
  return {
    productIds: hits.slice(0, limit),
    summary: hits.length ? `"${query}"에 어울리는 상황과 무드로 골랐어요.` : '딱 맞는 상품을 못 찾았어요. 상황이나 날씨로 말해보세요. 예: 비 오는 날 데이트',
  };
}

export function localChat(text) {
  const { productIds } = localSearch(text, 3);
  const ids = productIds.length ? productIds : ['u01', 'u10', 'u12'];
  const names = ids.map((id) => byId[id].ko).join(', ');
  return {
    reply: `${names} 조합을 추천해요. 상의 하나만 그래픽으로 튀게 하고 나머지는 무채색으로 맞추면 실패가 없어요. 더 알려주시면 좁혀볼게요. 키, 평소 사이즈, 가는 곳 같은 거요.`,
    productIds: ids,
  };
}
