// Plain JS (no JSX): the serverless function imports this too.

// Garment-dyed palette. ink = contrast print, tone = tonal embroidery a shade off the base.
const C = {
  white: { name: 'Bone', hex: '#E6E1D6', ink: '#2E2E2D', tone: '#C4BCAC' },
  black: { name: 'Washed Black', hex: '#2E2E2D', ink: '#E6E3DC', tone: '#4D4D4A' },
  ash: { name: 'Concrete', hex: '#ACACA6', ink: '#2E2E2D', tone: '#8E8E88' },
  grey: { name: 'Concrete', hex: '#ACACA6', ink: '#2E2E2D', tone: '#8E8E88' },
  navy: { name: 'Washed Navy', hex: '#2B3243', ink: '#E6E3DC', tone: '#434B5E' },
  forest: { name: 'Deep Olive', hex: '#4A4C3A', ink: '#E6E3DC', tone: '#626450' },
  oat: { name: 'Oat', hex: '#D6CDBB', ink: '#2B3243', tone: '#B9AE97' },
  butter: { name: 'Sand', hex: '#D3C6A6', ink: '#2E2E2D', tone: '#B8AA87' },
  stone: { name: 'Stone', hex: '#BDB6A7', ink: '#2E2E2D', tone: '#A0988A' },
  olive: { name: 'Deep Olive', hex: '#4A4C3A', ink: '#E6E3DC', tone: '#626450' },
  charcoal: { name: 'Charcoal', hex: '#454643', ink: '#E6E3DC', tone: '#5C5D5A' },
  green: { name: 'Station Green', hex: '#2D5E45', ink: '#E6E3DC', tone: '#437559' },
  natural: { name: 'Natural', hex: '#E3DCCB', ink: '#2E2E2D', tone: '#C6BCA5' },
};

export const SIZES = ['S', 'M', 'L', 'XL'];

export const products = [
  { id: 'u01', name: 'SYMBOL TEE', ko: '심볼 티셔츠', cat: 'tee', price: 35000, print: 'blank', colors: [C.white, C.black, C.grey, C.navy], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['데일리', '출근', '데이트', '여름'], isNew: true, rank: 1,
    story: '가슴에 작은 심볼 하나. 230g 두께라 비치지 않고, 목이 늘어나지 않게 촘촘한 립을 썼어요.' },
  { id: 'u02', name: 'BIG LOGO TEE', ko: '빅 로고 티셔츠', cat: 'tee', price: 39000, print: 'wordmark-big', colors: [C.white, C.black, C.ash], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['캠퍼스', '여름', '데일리', '여행'], isNew: true, rank: 2,
    story: '가슴을 가로지르는 UNION 로고. 수성 잉크라 빨수록 자연스럽게 바래요. 어깨가 살짝 떨어지는 넉넉한 핏.' },
  { id: 'u03', name: 'SYMBOL HOODIE', ko: '심볼 후디', cat: 'hoodie', price: 69000, print: 'blank', colors: [C.grey, C.black, C.forest], tags: ['street', 'mono', 'oversize', 'essential'], scenes: ['가을', '겨울', '캠퍼스', '추위'], isNew: true, rank: 3,
    story: '왼쪽 가슴에 작은 심볼 자수. 기모 없는 쫀쫀한 원단이라 봄가을까지 입어요.' },
  { id: 'u04', name: 'LOGO HOODIE', ko: '로고 후디', cat: 'hoodie', price: 75000, print: 'wordmark-big', colors: [C.black, C.grey], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['가을', '겨울', '캠퍼스', '여행'], rank: 4,
    story: '정면에 큰 UNION 로고. 이 옷 하나면 코디가 끝나요.' },
  { id: 'u05', name: 'SYMBOL SWEATSHIRT', ko: '심볼 맨투맨', cat: 'crew', price: 59000, print: 'blank', colors: [C.oat, C.navy], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['가을', '봄', '데이트', '캠퍼스'], rank: 5,
    story: '작은 심볼 자수에 래글런 소매. 셔츠 위에 겹쳐 입기 좋아요.' },
  { id: 'u06', name: 'LONG SLEEVE TEE', ko: '롱슬리브 티셔츠', cat: 'longsleeve', price: 42000, print: 'wordmark', colors: [C.black, C.white], tags: ['street', 'mono', 'trend', 'fitted'], scenes: ['봄', '가을', '캠퍼스'], rank: 8,
    story: '가슴에 작은 로고. 소매가 길게 내려와서 손등을 살짝 덮어요.' },
  { id: 'u07', name: 'COACH JACKET', ko: '코치 재킷', cat: 'jacket', price: 89000, print: 'arch', colors: [C.black, C.olive], tags: ['street', 'essential', 'mono', 'oversize'], scenes: ['봄', '가을', '비', '여행'], rank: 6,
    story: '가벼운 생활방수 나일론. 등판에 큰 아치 로고, 가슴엔 작은 심볼.' },
  { id: 'u08', name: 'VARSITY JACKET', ko: '바시티 재킷', cat: 'varsity', price: 129000, print: 'blank', colors: [C.green, C.black], tags: ['street', 'bold', 'trend', 'oversize'], scenes: ['겨울', '가을', '데이트'], isNew: true, rank: 7,
    story: '울 혼방 몸판에 인조가죽 소매. 가슴에 심볼 패치.' },
  { id: 'u09', name: 'TRACK PANTS', ko: '트랙팬츠', cat: 'pants', price: 59000, print: 'crosswalk', colors: [C.black, C.navy], tags: ['street', 'mono', 'oversize', 'trend'], scenes: ['운동', '여행', '캠퍼스'], rank: 9,
    story: '옆선에 초록 줄 하나. 밑단 지퍼를 열면 와이드, 닫으면 조거예요.' },
  { id: 'u10', name: 'WIDE SWEATPANTS', ko: '와이드 스웨트팬츠', cat: 'pants', price: 55000, print: 'none', colors: [C.grey, C.black], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['데일리', '캠퍼스', '여행'], rank: 10,
    story: '바닥까지 떨어지는 와이드 핏. 허리 밴딩이라 하루 종일 편해요.' },
  { id: 'u11', name: 'SWEAT SHORTS', ko: '스웨트 쇼츠', cat: 'shorts', price: 39000, print: 'wordmark', colors: [C.grey, C.black], tags: ['street', 'essential', 'oversize'], scenes: ['여름', '운동', '더위'], rank: 13,
    story: '무릎 위로 떨어지는 반바지. 주머니가 깊어서 폰이 빠지지 않아요.' },
  { id: 'u12', name: 'SYMBOL CAP', ko: '심볼 볼캡', cat: 'cap', price: 35000, print: 'blank', colors: [C.black, C.stone, C.navy], tags: ['street', 'essential', 'mono'], scenes: ['여행', '데일리', '더위'], rank: 11,
    story: '정면에 심볼 자수. 챙이 살짝 휘어 있어서 처음 써도 어색하지 않아요.' },
  { id: 'u13', name: 'RIB BEANIE', ko: '립 비니', cat: 'beanie', price: 29000, print: 'blank', colors: [C.green, C.black, C.grey], tags: ['street', 'bold', 'essential'], scenes: ['겨울', '추위', '데일리'], rank: 12,
    story: '굵은 골 비니. 접힌 단에 심볼 라벨.' },
  { id: 'u14', name: 'CANVAS TOTE', ko: '캔버스 토트백', cat: 'tote', price: 29000, print: 'market', colors: [C.natural, C.black], tags: ['clean', 'trend', 'essential'], scenes: ['캠퍼스', '여행', '데일리'], rank: 14,
    story: '두꺼운 캔버스 가방. 15인치 노트북이 들어가고 안쪽에 작은 주머니가 있어요.' },
  { id: 'u15', name: 'CREW SOCKS 3PACK', ko: '크루 삭스 3팩', cat: 'socks', price: 15000, print: 'wordmark', colors: [C.white, C.black], tags: ['clean', 'essential', 'mono'], scenes: ['데일리', '운동'], rank: 15,
    story: '발목 위로 올라오는 크루 길이. 반바지 아래 살짝 보이면 그게 코디예요.' },
  { id: 'u16', name: 'HEAVY BLANK TEE', ko: '헤비 무지 티셔츠', cat: 'tee', price: 29000, print: 'none', colors: [C.white, C.black, C.grey], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['데일리', '출근', '여름'], rank: 16,
    story: '로고 없이 밑단에 초록 탭 하나만. 옷장의 기본값.' },
];

export const CATS = {
  tee: '티셔츠', longsleeve: '롱슬리브', hoodie: '후디', crew: '맨투맨', jacket: '재킷', varsity: '재킷',
  pants: '팬츠', shorts: '쇼츠', cap: '모자', beanie: '모자', tote: '가방', socks: '양말', blazer: '재킷', coat: '코트', knit: '니트',
};
export const SHOP_FILTERS = [
  ['all', '전체'], ['top', '상의'], ['outer', '아우터'], ['bottom', '하의'], ['acc', '모자·잡화'],
];
export const GROUP = {
  tee: 'top', longsleeve: 'top', hoodie: 'top', crew: 'top', jacket: 'outer', varsity: 'outer',
  pants: 'bottom', shorts: 'bottom', cap: 'acc', beanie: 'acc', tote: 'acc', socks: 'acc', blazer: 'outer', coat: 'outer', knit: 'top',
};

export const byId = Object.fromEntries(products.map((p) => [p.id, p]));
export const won = (n) => `${n.toLocaleString('ko-KR')}원`;

// Example reviews, grouped by how a category fits. Shown with an "예시 후기" label.
const REVIEW_POOL = {
  loose: [
    { user: 'jiho***', body: '178 / 70', size: 'L', rating: 5, text: '어깨가 살짝 떨어지게 넉넉해요. 평소 L 입는데 L이 딱 원하던 핏이에요. 프린트가 생각보다 커서 존재감 있어요.' },
    { user: 'seoa***', body: '163 / 50', size: 'S', rating: 5, text: '여자인데 S 사서 원피스처럼 길게 입어요. 두께감 있어서 비치지 않고 세탁해도 목이 안 늘어났어요.' },
    { user: 'mink***', body: '172 / 68', size: 'M', rating: 4, text: '색이 화면보다 아주 약간 진해요. 핏은 좋아요. 총장이 길어서 키 작으면 한 치수 내려도 될 것 같아요.' },
    { user: 'yuna***', body: '168 / 55', size: 'M', rating: 5, text: '친구들이 어디 거냐고 계속 물어봐요. 그래픽 얘기하다 보면 대화가 길어짐.' },
  ],
  fitted: [
    { user: 'dowo***', body: '175 / 66', size: 'M', rating: 5, text: '정사이즈예요. 셔츠 안에 받쳐 입기 좋은 두께. 흰색인데 안 비쳐요.' },
    { user: 'haer***', body: '160 / 48', size: 'S', rating: 4, text: 'S가 살짝 크지만 그게 예뻐요. 세탁 후 아주 조금 줄었어요. 찬물 세탁 추천.' },
    { user: 'tae_***', body: '183 / 80', size: 'XL', rating: 5, text: '평소 L인데 몸에 붙는 게 싫어서 XL 갔어요. 딱 좋아요.' },
  ],
  bottom: [
    { user: 'sion***', body: '176 / 72', size: 'L', rating: 5, text: '허리 밴딩이라 편하고 기장이 운동화 위에 살짝 쌓여요. 앉아도 안 끼어요.' },
    { user: 'gaeu***', body: '165 / 52', size: 'S', rating: 4, text: '기장이 좀 길어서 한 번 접어 입어요. 접었을 때 더 예쁨.' },
    { user: 'woo_***', body: '181 / 77', size: 'L', rating: 5, text: '허벅지 두꺼운 편인데 여유 있어요. 색 조합 쉬워서 매일 입게 돼요.' },
  ],
  acc: [
    { user: 'nara***', body: '-', size: 'FREE', rating: 5, text: '머리 큰 편인데 스트랩 조절하니 맞아요. 마감이 깔끔해요.' },
    { user: 'jun_***', body: '-', size: 'FREE', rating: 5, text: '색이 사진이랑 거의 같아요. 선물용으로 하나 더 샀어요.' },
    { user: 'bomi***', body: '-', size: 'FREE', rating: 4, text: '생각보다 크고 튼튼해요. 각 잡히는 건 아니라 흐물한 맛이 있어요.' },
  ],
};
export const reviewsFor = (p) =>
  p.tags.includes('fitted') ? REVIEW_POOL.fitted
    : GROUP[p.cat] === 'bottom' ? REVIEW_POOL.bottom
      : GROUP[p.cat] === 'acc' ? REVIEW_POOL.acc
        : REVIEW_POOL.loose;

// A look = top + bottom (+ optional extra). c = color index into each product's colors.
export const looks = [
  { id: 'l01', name: '월요일 아침', who: '@monday.fit', items: [['u01', 0], ['u10', 1], ['u12', 0]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l02', name: '주말 피크닉', who: '@picnic.day', items: [['u02', 0], ['u11', 0], ['u12', 1]], tags: ['street', 'bold', 'trend'] },
  { id: 'l03', name: '막차 놓친 밤', who: '@late.night', items: [['u05', 1], ['u09', 0], ['u13', 1]], tags: ['street', 'mono', 'trend'] },
  { id: 'l04', name: '9시 수업', who: '@first.class', items: [['u03', 0], ['u09', 1], ['u14', 0]], tags: ['street', 'oversize', 'essential'] },
  { id: 'l05', name: '첫 데이트 무난하게', who: '@soft.date', items: [['u16', 0], ['u10', 0], ['u14', 1]], tags: ['clean', 'mono', 'fitted'] },
  { id: 'l06', name: '초록 한 방울', who: '@green.drop', items: [['u03', 1], ['u10', 1], ['u13', 0]], tags: ['street', 'bold', 'essential'] },
  { id: 'l07', name: '비 오는 날', who: '@rainy.walk', items: [['u07', 0], ['u09', 0], ['u12', 0]], tags: ['street', 'mono', 'essential'] },
  { id: 'l08', name: '주말 러닝', who: '@sunday.run', items: [['u16', 2], ['u11', 1], ['u15', 0]], tags: ['street', 'essential', 'fitted'] },
  { id: 'l09', name: '겨울 바시티', who: '@winter.coat', items: [['u08', 0], ['u10', 1], ['u13', 1]], tags: ['street', 'bold', 'trend'] },
  { id: 'l10', name: '올블랙', who: '@all.black', items: [['u04', 0], ['u09', 0], ['u12', 0]], tags: ['street', 'mono', 'trend'] },
  { id: 'l11', name: '로고 하나로', who: '@one.logo', items: [['u02', 1], ['u10', 0], ['u14', 0]], tags: ['street', 'bold', 'trend'] },
  { id: 'l12', name: '오트밀 산책', who: '@slow.walk', items: [['u05', 0], ['u10', 0], ['u12', 1]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l13', name: '공항 가는 길', who: '@gate.07', items: [['u04', 1], ['u09', 0], ['u14', 1]], tags: ['street', 'mono', 'oversize'] },
  { id: 'l14', name: '올리브 레이어드', who: '@layer.up', items: [['u07', 1], ['u10', 0], ['u12', 1]], tags: ['clean', 'essential', 'oversize'] },
  { id: 'l15', name: '롱슬리브 데이', who: '@long.sleeve', items: [['u06', 0], ['u09', 1], ['u15', 1]], tags: ['street', 'mono', 'fitted'] },
  { id: 'l16', name: '흰 티 정석', who: '@white.tee', items: [['u01', 0], ['u10', 1], ['u15', 0]], tags: ['clean', 'mono', 'essential'] },
];

// Fashion MBTI. Axes: S/C street-clean, B/M bold-mono, O/F oversize-fitted, T/E trend-essential.
export const MBTI_Q = [
  { q: '약속 30분 전, 옷장 앞의 나는', a: [['S', '그래픽 티부터 꺼낸다'], ['C', '무지 티에 셔츠를 고민한다']] },
  { q: '친구가 내 옷을 보고 했으면 하는 말', a: [['S', '"그거 어디 거야?"'], ['C', '"오늘 깔끔하다"']] },
  { q: '운동화 고를 때 더 끌리는 건', a: [['S', '두툼하고 존재감 있는 거'], ['C', '얇고 미니멀한 거']] },
  { q: '옷장을 열면 제일 많은 색은', a: [['B', '빨강 초록 노랑, 섞여 있다'], ['M', '검정 회색 흰색, 끝']] },
  { q: '포인트 컬러 하나만 고르면', a: [['B', '형광 초록'], ['M', '차콜 그레이']] },
  { q: '사진 찍을 때 내 옷은', a: [['B', '배경보다 튀어야 한다'], ['M', '배경에 자연스럽게 녹아야 한다']] },
  { q: '티셔츠 사이즈 고를 때', a: [['O', '한 치수 크게'], ['F', '딱 내 치수']] },
  { q: '바지 핏은', a: [['O', '바닥에 끌릴락 말락 와이드'], ['F', '발목이 보이는 일자']] },
  { q: '제일 편한 순간은', a: [['O', '옷 속에서 몸이 놀 때'], ['F', '옷이 몸을 잡아줄 때']] },
  { q: '요즘 유행하는 아이템이 보이면', a: [['T', '일단 하나 사본다'], ['E', '1년 뒤에도 입을지 생각한다']] },
  { q: '옷 정보를 얻는 곳은', a: [['T', '릴스, 스냅, 친구 스토리'], ['E', '오래 입은 내 옷장']] },
  { q: '10년 뒤에도 입고 싶은 건', a: [['T', '그때 유행하는 거'], ['E', '지금 이 흰 티']] },
];

const AX = { S: 'street', C: 'clean', B: 'bold', M: 'mono', O: 'oversize', F: 'fitted', T: 'trend', E: 'essential' };
export const axisTags = (code) => code.split('').map((l) => AX[l]);

export const MBTI_TYPES = {
  SBOT: ['팝업 오픈런', '새로 나온 건 일단 입어보는 사람. 큰 그래픽, 쨍한 색, 넉넉한 핏이 기본값이에요.'],
  SBOE: ['포인트 비니 수집가', '튀는 색을 좋아하지만 오래 입을 걸 골라요. 한 가지 포인트를 몇 년씩 밀고 가요.'],
  SBFT: ['스냅 단골', '몸에 맞는 핏에 과감한 그래픽. 사진 찍히는 걸 아는 스타일이에요.'],
  SBFE: ['빈티지 숍 보물찾기', '색은 과감하게, 핏은 정확하게, 아이템은 오래가는 걸로.'],
  SMOT: ['올블랙 무드', '검정과 회색만으로 분위기를 만들어요. 실루엣으로 유행을 따라가는 타입.'],
  SMOE: ['후디 한 벌 장인', '같은 회색 후디를 세 벌 가진 사람. 편하고 무난한데 이상하게 멋있어요.'],
  SMFT: ['모노톤 디테일러', '무채색에 몸에 맞는 핏, 디테일 하나로 요즘 느낌을 내요.'],
  SMFE: ['정석 스트리트', '로고 티, 일자 바지, 볼캡. 교과서 같은 조합이 제일 잘 어울려요.'],
  CBOT: ['버터색 오후', '깔끔한데 색으로 놀 줄 알아요. 넉넉한 실루엣에 부드러운 컬러.'],
  CBOE: ['컬러 셔츠 한 장', '깔끔한 기본 위에 색 하나. 오래 입어도 질리지 않는 포인트를 알아요.'],
  CBFT: ['주말 브런치', '정돈된 핏에 요즘 색. 어디 가도 차려입은 느낌이 나요.'],
  CBFE: ['프레피 모범생', '단정한 핏에 클래식한 색 조합. 부모님도 친구도 좋아하는 스타일.'],
  CMOT: ['미니멀 와이드', '무채색 와이드 팬츠에 루즈한 상의. 덜어낼수록 멋있어지는 타입.'],
  CMOE: ['흰 티 철학자', '흰 티, 치노, 깔끔한 운동화. 기본을 가장 잘 입는 사람이에요.'],
  CMFT: ['갤러리 산책러', '무채색에 정확한 핏, 작은 디테일로 요즘을 담아요.'],
  CMFE: ['출근룩 마스터', '몸에 맞는 기본템을 무채색으로. 실패하지 않는 옷장의 주인.'],
};

// Journal. body: paragraphs, '## ' starts a subheading. quote: pull quote. shop: products shown inside the story.
export const articles = [
  { id: 'three-piece', kicker: 'HOW TO', title: '옷 몰라도 되는 세 벌 공식', minutes: 3, tone: '#1B1B1A', fg: '#ECECEA',
    lede: '로고 한 벌, 무채색 한 벌, 모자 하나. 이 셋이면 일주일이 굴러가요.',
    quote: '튀는 건 한 벌이면 충분해요.',
    shop: ['u02', 'u10', 'u12'],
    body: [
      '## 로고는 한 벌만',
      '빅 로고 티나 로고 후디를 골랐다면 나머지는 검정, 회색, 베이지 안에서 고르세요. 로고가 두 개 이상이면 서로 싸워요.',
      '## 바지는 넉넉한 무채색',
      '와이드 스웨트팬츠는 어떤 상의를 올려도 실패가 없어요. 바지가 정돈되면 위에 뭘 입어도 깔끔해 보여요.',
      '## 모자로 끝내기',
      '볼캡이나 비니는 머리 손질이 안 된 날을 가려주고, 사진의 위쪽을 채워줘요.',
      '헷갈리면 상품 페이지의 "이렇게 입어요" 세트를 그대로 담으면 돼요. 미리 맞춰뒀어요.',
    ] },
  { id: 'logo-tee', kicker: 'GUIDE', title: '로고 티, 촌스럽지 않게 입는 법', minutes: 4, tone: '#E6E1D6', fg: '#1B1B1A',
    lede: '로고가 크다고 촌스러운 게 아니에요. 나머지를 얼마나 덜어내느냐의 문제예요.',
    quote: '로고가 크면, 나머지는 조용하게.',
    shop: ['u02', 'u04', 'u16'],
    body: [
      '## 크기와 위치',
      '가슴 한가운데 큰 로고는 그 자체로 코디의 중심이에요. 작은 가슴 로고는 다른 옷과 겹쳐 입기 좋아요. 처음이라면 작은 로고부터 시작하세요.',
      '## 색은 두 가지까지',
      '로고 색과 옷 색, 이 둘에 바지 색 하나면 충분해요. 신발과 가방은 그 안에서 고르면 돼요.',
      '## 핏으로 분위기 바꾸기',
      '한 치수 크게 입으면 캐주얼하고, 딱 맞게 입으면 단정해요. 같은 티로 두 가지 분위기를 낼 수 있어요.',
    ] },
  { id: 'green-tab', kicker: 'DETAIL', title: '초록 탭 하나에 담은 것', minutes: 3, tone: '#2D5E45', fg: '#ECECEA',
    lede: '모든 UNION 옷의 밑단에는 작은 초록 탭이 달려 있어요. 로고가 없는 옷에도요.',
    quote: '멀리서 봐도 알아볼 수 있는 가장 작은 표시.',
    shop: ['u16', 'u01'],
    body: [
      '청바지 뒷주머니의 작은 탭은 오랫동안 그 브랜드를 설명해 왔어요. 로고를 보지 않아도 그 탭만으로 알 수 있었죠. UNION도 그런 표시가 필요했어요.',
      '## 왜 초록인가',
      '무채색 옷이 많은 옷장에서 초록은 튀지 않으면서도 눈에 들어와요. 검정, 회색, 베이지 어디에 붙여도 어울려요.',
      '## 로고 없는 옷에도',
      '헤비 무지 티셔츠에는 로고가 없어요. 대신 탭이 있어요. 아무것도 쓰지 않아도 어디 옷인지 아는 정도의 존재감이에요.',
    ] },
  { id: 'white-tee', kicker: 'GUIDE', title: '흰 티 하나 제대로 고르는 법', minutes: 4, tone: '#F4F4F2', fg: '#1B1B1A',
    lede: '비치는지, 목이 늘어나는지, 어깨선이 어디 떨어지는지. 이 세 가지만 보면 돼요.',
    quote: '200g을 넘으면 비치지 않아요.',
    shop: ['u16', 'u01'],
    body: [
      '## 두께',
      '원단 두께는 평방미터당 무게(g)로 써요. 200g을 넘으면 대체로 비치지 않아요. UNION 티셔츠는 230g이에요.',
      '## 목',
      '목둘레 립이 촘촘하고 두꺼우면 몇 번 빨아도 늘어나지 않아요.',
      '## 어깨',
      '어깨 봉제선이 내 어깨보다 살짝 아래 있으면 넉넉한 느낌, 딱 어깨 위에 있으면 단정한 느낌이에요. 체형보다 원하는 분위기로 고르면 돼요.',
    ] },
];
