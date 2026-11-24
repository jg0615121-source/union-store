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

// Offline answers when the AI function is not configured: real styling principles, no product push.
const ADVICE = [
  [['키', '작', '단신'], '키가 작으면 위아래 색을 비슷하게 맞추는 게 가장 효과가 커요. 시선이 중간에서 끊기지 않아 세로로 길어 보여요. 상의는 엉덩이 중간을 넘지 않는 기장, 바지는 신발 등을 살짝 덮는 정도가 좋아요. 와이드팬츠도 허리를 높게 입고 밑단이 땅에 끌리지 않으면 충분히 소화돼요.'],
  [['어깨', '좁'], '어깨가 좁으면 어깨선이 1~2cm 내려오는 드롭숄더가 오히려 자연스러워요. 너무 많이 떨어지면 옷에 묻혀 보이니 어깨 끝에서 3cm 안쪽이 기준이에요. 래글런 소매는 어깨선을 흐려서 좁은 어깨를 덜 드러내요.'],
  [['어깨', '넓', '덩치', '체격'], '체격이 있으면 몸에 붙는 옷보다 가슴에 손가락 두세 개 여유가 있는 핏이 단정해 보여요. 두꺼운 원단(240g 이상)은 몸 선을 덜 드러내서 유리하고, 상의는 어두운 색, 하의는 한 톤 밝게 하면 무게가 아래로 내려가 균형이 맞아요.'],
  [['색', '컬러', '조합', '어울리'], '색은 세 가지 안에서 끝내는 게 원칙이에요. 무채색 두 개에 포인트 하나, 또는 같은 계열의 밝기만 다르게 세 단계로요. 회색은 검정, 흰색, 네이비, 베이지 어디에나 붙고, 포인트 색은 얼굴에서 먼 곳(신발, 양말, 모자)에 두면 과해 보이지 않아요.'],
  [['흰', '비치', '비침'], '흰 티가 비치지 않으려면 원단 무게가 200g/m²를 넘는 걸 고르세요. 220~240g이면 안에 아무것도 안 입어도 거의 비치지 않아요. 안에 입을 거면 흰색보다 피부톤과 비슷한 베이지 이너가 덜 보여요.'],
  [['와이드', '바지', '팬츠', '기장'], '와이드팬츠는 허리선을 배꼽 근처까지 올리고, 밑단이 신발 등을 반쯤 덮는 기장이 가장 깔끔해요. 상의가 넉넉하면 앞만 살짝 넣어 허리 위치를 보여줘야 다리가 짧아 보이지 않아요.'],
  [['오버', '넉넉', '사이즈', '핏'], '오버핏은 어깨, 가슴, 기장 중 하나만 크게 가져가야 의도한 것처럼 보여요. 셋 다 크면 그냥 큰 옷이에요. 보통은 평소 사이즈에서 한 치수 위, 소매는 손목뼈를 넘지 않는 선이 기준이에요.'],
  [['소개팅', '데이트', '첫인상'], '첫 만남에선 무채색이나 차분한 색 하나에 깨끗한 흰색을 얼굴 가까이 두는 게 좋아요. 흰 티, 셔츠 칼라처럼요. 얼굴이 밝아 보이고, 새 옷보다는 한두 번 세탁해 몸에 맞춰진 옷이 편해 보여요.'],
  [['면접', '출근', '회사'], '면접이나 첫 출근엔 튀지 않는 게 아니라 정돈돼 보이는 게 기준이에요. 구김 없는 원단, 어깨선이 맞는 상의, 바지 밑단이 신발에 두 번 이상 접히지 않는 기장. 이 세 가지만 지켜도 인상이 달라져요.'],
  [['줄어', '세탁', '빨래'], '면 티나 맨투맨은 첫 세탁에서 3~5% 줄 수 있어요. 찬물에 뒤집어서 빨고 건조기는 피하세요. 미리 줄여서 나온 워싱 원단이면 줄어드는 폭이 1~2%로 작아요.'],
  [['레이어드', '겹쳐'], '겹쳐 입을 땐 안쪽 옷이 1~3cm만 보이게 하는 게 가장 깔끔해요. 밑단, 소매, 목 중 한 군데만 보이게 하고, 안쪽 옷이 더 얇고 더 밝으면 무거워 보이지 않아요.'],
  [['추워', '겨울', '추위'], '추운 날엔 두꺼운 한 겹보다 얇은 세 겹이 따뜻해요. 몸에 닿는 면, 중간에 기모나 니트, 바깥에 바람 막는 겉옷. 목, 손목, 발목만 막아도 체감 온도가 크게 올라가요.'],
  [['더워', '여름', '더위', '땀'], '여름엔 얇은 옷보다 몸에서 떨어지는 옷이 시원해요. 바람이 통하거든요. 땀 자국은 회색에서 가장 잘 보이고 검정, 흰색, 진한 네이비에서 덜 보여요.'],
];

export function localAdvice(text) {
  const hit = ADVICE.find(([keys]) => keys.some((k) => text.includes(k)));
  return {
    reply: hit ? hit[1] : '조금만 더 알려주시면 구체적으로 말씀드릴게요. 어떤 옷이나 상황이 고민인지, 그리고 키나 체형처럼 판단에 필요한 것 하나만요.',
    productIds: [],
  };
}
