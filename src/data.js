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
  // LOOP — street line. The ring-O logo is the icon; drops are graphic-led.
  { id: 'u01', line: 'LOOP', name: 'LOOP LOGO TEE', ko: '루프 로고 티셔츠', cat: 'tee', price: 59000, print: 'wordmark-big', colors: [C.white, C.black, C.ash], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['캠퍼스', '여름', '데일리', '한강'], isNew: true, rank: 1,
    story: '가슴을 가로지르는 UNION 워드마크. O 자리의 링이 브랜드의 얼굴이에요. 280g 헤비 코튼에 수성 잉크로 찍어서 빨수록 자연스럽게 바래요.' },
  { id: 'u02', line: 'LOOP', name: 'LOOP CAMO HOODIE', ko: '루프 카모 후디', cat: 'hoodie', price: 169000, print: 'camo', colors: [C.forest, C.grey], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['가을', '겨울', '캠퍼스', '추위'], isNew: true, rank: 2,
    story: '수백 개의 링을 겹쳐 만든 UNION만의 위장 패턴. 멀리선 카모, 가까이 보면 로고예요. 500g 기모 없는 루프백이라 3계절을 입어요.' },
  { id: 'u03', line: 'LOOP', name: '02 HEAVY HOODIE', ko: '02 헤비 후디', cat: 'hoodie', price: 149000, print: 'o2', colors: [C.grey, C.black, C.forest], tags: ['street', 'mono', 'oversize', 'essential'], scenes: ['가을', '겨울', '캠퍼스', '추위'], rank: 3,
    story: '왼쪽 가슴에 작은 퍼프 프린트 02. 서울 지역번호이자 브랜드의 출신지 표시예요. 가먼트 다잉으로 색이 균일하지 않고 깊어요.' },
  { id: 'u04', line: 'LOOP', name: 'LOOP CAMO CAP', ko: '루프 카모 볼캡', cat: 'cap', price: 69000, print: 'camo', colors: [C.forest, C.grey], tags: ['street', 'bold', 'trend'], scenes: ['여행', '데일리', '한강', '더위'], isNew: true, rank: 4,
    story: '루프 카모 원단으로 만든 6패널 볼캡. 무채색 코디에 하나만 얹으면 사진이 달라져요. 뒤는 황동 버클.' },
  { id: 'u05', line: 'LOOP', name: 'CHENILLE VARSITY JACKET', ko: '셔닐 바시티 재킷', cat: 'varsity', price: 329000, print: 'line2', colors: [C.green, C.black], tags: ['street', 'bold', 'trend', 'oversize'], scenes: ['겨울', '가을', '데이트'], isNew: true, rank: 5,
    story: '멜톤 울 몸판에 인조가죽 소매. 가슴의 링 패치는 셔닐 자수예요. 시즌마다 몇 벌만 만드는 컬렉터 피스.' },
  { id: 'u06', line: 'LOOP', name: 'NYLON TRACK PANTS', ko: '나일론 트랙팬츠', cat: 'pants', price: 129000, print: 'crosswalk', colors: [C.black, C.navy], tags: ['street', 'mono', 'oversize', 'trend'], scenes: ['운동', '여행', '캠퍼스'], rank: 6,
    story: '옆선을 따라 가는 초록 파이핑 한 줄. 밑단 지퍼를 열면 와이드, 닫으면 조거예요.' },
  { id: 'u07', line: 'LOOP', name: 'NIGHT ROUTE CREWNECK', ko: '나이트 루트 맨투맨', cat: 'crew', price: 119000, print: 'n26', colors: [C.navy, C.oat], tags: ['street', 'mono', 'trend', 'oversize'], scenes: ['밤', '가을', '데이트'], rank: 9,
    story: '서울 심야버스 노선판을 작은 자수로 옮겼어요. 아는 사람만 알아보는 서울의 흔적.' },
  { id: 'u08', line: 'LOOP', name: 'HEAVY BLANK TEE', ko: '헤비 블랭크 티셔츠', cat: 'tee', price: 45000, print: 'blank', colors: [C.white, C.black, C.grey, C.navy], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['출근', '데일리', '데이트', '여름'], rank: 7,
    story: '로고 없이 초록 탭 하나만. 280g 두께라 비치지 않고 목이 늘어나지 않아요. 옷장의 기본값.' },
  { id: 'u09', line: 'LOOP', name: 'COACH JACKET', ko: '코치 재킷', cat: 'jacket', price: 199000, print: 'arch', colors: [C.black, C.olive], tags: ['street', 'essential', 'mono', 'oversize'], scenes: ['봄', '가을', '비', '여행'], rank: 8,
    story: '생활방수 나일론. 등판의 아치 로고는 빛을 받으면 은은하게 반사돼요.' },
  { id: 'u10', line: 'LOOP', name: 'RIB BEANIE', ko: '립 비니', cat: 'beanie', price: 49000, print: 'blank', colors: [C.green, C.black, C.grey], tags: ['street', 'bold', 'essential'], scenes: ['겨울', '추위', '데일리'], rank: 12,
    story: '메리노 혼방 굵은 골 비니. 접힌 단에 초록 탭.' },
  { id: 'u11', line: 'LOOP', name: 'CANVAS TOTE', ko: '캔버스 토트백', cat: 'tote', price: 49000, print: 'market', colors: [C.natural, C.black], tags: ['clean', 'trend', 'essential'], scenes: ['캠퍼스', '여행', '데일리'], rank: 14,
    story: '16온스 두꺼운 캔버스. 15인치 노트북이 들어가요.' },
  { id: 'u12', line: 'LOOP', name: 'SWEAT SHORTS', ko: '스웨트 쇼츠', cat: 'shorts', price: 79000, print: 'wordmark', colors: [C.grey, C.black], tags: ['street', 'essential', 'oversize'], scenes: ['여름', '운동', '한강', '더위'], rank: 15,
    story: '무릎 위로 떨어지는 헤비 플리스 반바지. 깊은 주머니.' },
  // 02 — contemporary line. Tailoring and knit, quiet branding.
  { id: 'u13', line: '02', name: 'UNSTRUCTURED BLAZER', ko: '언스트럭처드 블레이저', cat: 'blazer', price: 489000, print: 'none', colors: [C.charcoal, C.navy], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['출근', '데이트', '가을', '봄'], isNew: true, rank: 10,
    story: '심지와 어깨 패드를 빼서 가디건처럼 가벼운 울 블레이저. 후디 위에도, 셔츠 위에도 걸쳐요.' },
  { id: 'u14', line: '02', name: 'WIDE PLEATED TROUSERS', ko: '와이드 플리츠 트라우저', cat: 'pants', price: 229000, print: 'none', colors: [C.charcoal, C.stone], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['출근', '데이트', '데일리'], rank: 11,
    story: '투 플리츠에 바닥까지 흐르는 기장. 운동화에도 로퍼에도 맞아요.' },
  { id: 'u15', line: '02', name: 'MERINO CREW KNIT', ko: '메리노 크루 니트', cat: 'knit', price: 189000, print: 'blank', colors: [C.white, C.olive], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['가을', '겨울', '출근', '데이트'], rank: 13,
    story: '엑스트라 파인 메리노. 따갑지 않아서 맨살에 입어도 돼요. 밑단에 초록 탭.' },
  { id: 'u16', line: '02', name: 'BALMACAAN COAT', ko: '발마칸 코트', cat: 'coat', price: 689000, print: 'none', colors: [C.stone, C.black], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['겨울', '출근', '데이트', '추위'], isNew: true, rank: 16,
    story: '래글런 소매의 롱 코트. 울 캐시미어 혼방이라 무겁지 않아요. 이번 시즌 02 라인의 중심.' },
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
  { id: 'l01', name: '월요일 아침', who: '@seongsu.daily', items: [['u13', 0], ['u14', 0], ['u08', 0]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l02', name: '강변 오후', who: '@yeouido.sun', items: [['u01', 0], ['u12', 0], ['u04', 0]], tags: ['street', 'bold', 'trend'] },
  { id: 'l03', name: '새벽 1시', who: '@n26.rider', items: [['u07', 0], ['u06', 0], ['u10', 1]], tags: ['street', 'mono', 'trend'] },
  { id: 'l04', name: '9시 수업', who: '@sinchon.kid', items: [['u03', 0], ['u06', 1], ['u11', 0]], tags: ['street', 'oversize', 'essential'] },
  { id: 'l05', name: '첫 만남', who: '@mangwon.walk', items: [['u15', 0], ['u14', 1], ['u11', 1]], tags: ['clean', 'mono', 'fitted'] },
  { id: 'l06', name: '카모 한 벌', who: '@jamsil.loop', items: [['u02', 0], ['u14', 0], ['u10', 1]], tags: ['street', 'bold', 'oversize'] },
  { id: 'l07', name: '비 오는 합정', who: '@hapjeong.rain', items: [['u09', 0], ['u06', 0], ['u04', 1]], tags: ['street', 'mono', 'essential'] },
  { id: 'l08', name: '주말 러닝', who: '@ttukseom.run', items: [['u08', 2], ['u12', 1], ['u10', 2]], tags: ['street', 'essential', 'fitted'] },
  { id: 'l09', name: '을지로 겨울', who: '@euljiro.night', items: [['u05', 0], ['u14', 0], ['u10', 1]], tags: ['street', 'bold', 'trend'] },
  { id: 'l10', name: '올블랙', who: '@mullae.static', items: [['u03', 1], ['u06', 0], ['u10', 1]], tags: ['street', 'mono', 'trend'] },
  { id: 'l11', name: '코트와 후디', who: '@yeonnam.cafe', items: [['u16', 0], ['u03', 0], ['u14', 0]], tags: ['clean', 'mono', 'oversize'] },
  { id: 'l12', name: '오트밀 산책', who: '@seochon.stroll', items: [['u07', 1], ['u14', 1], ['u04', 1]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l13', name: '공항 가는 길', who: '@gimpo.gate', items: [['u03', 1], ['u06', 0], ['u11', 1]], tags: ['street', 'mono', 'oversize'] },
  { id: 'l14', name: '올리브 레이어드', who: '@itaewon.layer', items: [['u09', 1], ['u14', 1], ['u15', 1]], tags: ['clean', 'essential', 'oversize'] },
  { id: 'l15', name: '블레이저와 티', who: '@hannam.white', items: [['u13', 1], ['u01', 0], ['u14', 0]], tags: ['clean', 'bold', 'trend'] },
  { id: 'l16', name: '검정 코트', who: '@seoulforest.green', items: [['u16', 1], ['u15', 0], ['u14', 0]], tags: ['clean', 'mono', 'essential'] },
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
  SBOT: ['성수 팝업 오픈런', '새로 나온 건 일단 입어보는 사람. 큰 그래픽, 쨍한 색, 넉넉한 핏이 기본값이에요.'],
  SBOE: ['초록 비니 수집가', '튀는 색을 좋아하지만 오래 입을 걸 골라요. 한 가지 포인트를 몇 년씩 밀고 가요.'],
  SBFT: ['홍대 스냅 단골', '몸에 맞는 핏에 과감한 그래픽. 사진 찍히는 걸 아는 스타일이에요.'],
  SBFE: ['빈티지 숍 보물찾기', '색은 과감하게, 핏은 정확하게, 아이템은 오래가는 걸로.'],
  SMOT: ['올블랙 심야버스', '검정과 회색만으로 분위기를 만들어요. 실루엣으로 유행을 따라가는 타입.'],
  SMOE: ['후디 한 벌 장인', '같은 회색 후디를 세 벌 가진 사람. 편하고 무난한데 이상하게 멋있어요.'],
  SMFT: ['을지로 라디오', '무채색에 몸에 맞는 핏, 디테일 하나로 요즘 느낌을 내요.'],
  SMFE: ['정석 스트리트', '로고 티, 일자 바지, 볼캡. 교과서 같은 조합이 제일 잘 어울려요.'],
  CBOT: ['연남동 버터색', '깔끔한데 색으로 놀 줄 알아요. 넉넉한 실루엣에 부드러운 컬러.'],
  CBOE: ['컬러 셔츠 한 장', '깔끔한 기본 위에 색 하나. 오래 입어도 질리지 않는 포인트를 알아요.'],
  CBFT: ['한남동 브런치', '정돈된 핏에 요즘 색. 어디 가도 차려입은 느낌이 나요.'],
  CBFE: ['프레피 모범생', '단정한 핏에 클래식한 색 조합. 부모님도 친구도 좋아하는 스타일.'],
  CMOT: ['미니멀 와이드', '무채색 와이드 팬츠에 루즈한 상의. 덜어낼수록 멋있어지는 타입.'],
  CMOE: ['흰 티 철학자', '흰 티, 치노, 깔끔한 운동화. 기본을 가장 잘 입는 사람이에요.'],
  CMFT: ['서촌 갤러리', '무채색에 정확한 핏, 작은 디테일로 요즘을 담아요.'],
  CMFE: ['출근룩 마스터', '몸에 맞는 기본템을 무채색으로. 실패하지 않는 옷장의 주인.'],
};

// Journal. body: paragraphs, '## ' starts a subheading. quote: pull quote. shop: products shown inside the story.
export const articles = [
  { id: 'why-02', kicker: 'BRAND', title: '서울을 그리지 않는 서울 브랜드', minutes: 6, tone: '#1B1B1A', fg: '#ECECEA',
    lede: '스투시에게는 캘리포니아가, 베이프에게는 하라주쿠가 있었다. UNION에게 서울은 그림의 소재가 아니라 출신지다.',
    quote: '좋은 스트릿 브랜드는 도시를 프린트하지 않는다. 도시가 만든 태도를 입힌다.',
    shop: ['u03', 'u07'],
    body: [
      '스트릿 브랜드에는 출신지가 있다. 1980년대 초 캘리포니아 라구나 비치에서 서핑보드에 자기 이름을 사인하던 숀 스투시의 손글씨는 그대로 로고가 됐다. 1993년 도쿄 우라하라주쿠에서 니고가 만든 베이프는 동네의 작은 가게들과 한정 발매 문화 속에서 컸다. 출신지는 그 브랜드가 무엇을 믿는지 설명해 주는 가장 짧은 문장이다.',
      '## 왜 하필 서울인가',
      '서울은 지금 세계에서 옷을 가장 빨리 소비하고, 가장 빨리 질려하는 도시 중 하나다. 성수와 한남에는 매주 새로운 팝업이 열리고, 같은 골목에서 테일러링 숍과 스케이트 숍이 마주 본다. 우영미가 파리에서 서울의 남성복을 증명했고, 시스템옴므가 백화점에서 컨템포러리의 기준을 만들었다. 스트릿과 테일러링이 같은 옷장 안에 섞여 있는 곳, 그게 서울이고 UNION이 서울에서 시작한 이유다.',
      '## 그런데 왜 서울을 그리지 않나',
      '지하철 노선도나 남산타워를 가슴에 크게 찍는 순간, 옷은 기념품이 된다. 그래서 UNION은 서울을 그리지 않기로 했다. 대신 서울 지역번호 02를 왼쪽 가슴에 작게 남기고, 모든 옷의 밑단에 초록색 탭 하나를 단다. 아는 사람만 알아보는 표시. 출신지는 드러내는 게 아니라 배어 나오는 것이어야 한다.',
      '## 두 개의 라인',
      'LOOP은 로고가 주인공인 스트릿 라인이다. 링 모양의 O, 그 링을 수백 개 겹친 카모 패턴, 셔닐 바시티. 시즌마다 적게 만들고 다시 만들지 않는다. 02는 조용한 컨템포러리 라인이다. 심지를 뺀 블레이저, 바닥까지 흐르는 플리츠 트라우저, 메리노 니트. 로고 대신 원단과 실루엣으로 말한다. 두 라인을 섞어 입는 사람, 그게 UNION이 생각하는 서울 사람이다.',
    ] },
  { id: 'logo-culture', kicker: 'ESSAY', title: '로고는 어떻게 문화가 되나', minutes: 7, tone: '#2D5E45', fg: '#ECECEA',
    lede: '사인 하나, 위장무늬 하나, 빨간 박스 하나. 스트릿웨어의 로고는 장식이 아니라 소속의 표시였다.',
    quote: '로고가 문화가 되는 조건은 하나다. 그걸 입은 사람끼리 서로를 알아봐야 한다.',
    shop: ['u02', 'u01', 'u04'],
    body: [
      '스트릿웨어의 역사는 로고의 역사이기도 하다. 손글씨 사인은 만든 사람의 존재를, 동물 머리를 숨긴 위장무늬는 아는 사람만 아는 농담을, 박스 로고는 동네 스케이트 숍의 소속감을 뜻했다.',
      '## 크게, 그러나 드물게',
      '로고가 크다고 싸 보이는 건 아니다. 싸 보이는 건 흔해서다. 오래 살아남은 로고 브랜드들은 공통적으로 수량을 통제했다. 매장 앞에 줄이 생기는 이유는 로고 때문이 아니라 다음에 또 나온다는 보장이 없어서다.',
      '## UNION의 링',
      'UNION의 아이콘은 O 자리의 링이다. 끝이 없는 원, 한 점의 정거장. 이번 시즌 이 링을 수백 개 겹쳐 루프 카모를 만들었다. 멀리서 보면 위장무늬, 가까이 보면 로고. 크게 쓰되 한 시즌에 몇 벌만. 그게 UNION이 로고를 다루는 방식이다.',
    ] },
  { id: 'green-tab', kicker: 'DETAIL', title: '초록 탭 하나에 담은 것', minutes: 3, tone: '#E6E1D6', fg: '#1B1B1A',
    lede: '모든 UNION 옷의 왼쪽 밑단에는 1cm 폭의 초록 탭이 달려 있다. 로고가 없는 옷에도.',
    quote: '멀리서 봐도 알아볼 수 있는 가장 작은 표시.',
    shop: ['u08', 'u15'],
    body: [
      '청바지 뒷주머니의 작은 빨간 탭은 수십 년 동안 그 브랜드를 설명해 왔다. 로고를 보지 않아도 그 탭만으로 알 수 있었다. UNION도 그런 표시가 필요했다.',
      '## 왜 초록인가',
      '서울에서 초록은 매일 지나치는 색이다. 순환선의 색, 공원의 색, 신호등의 색. 그래서 튀지 않으면서도 서울 사람에게는 익숙하다. 무채색 옷 끝에 이 초록이 살짝 보이는 순간이 UNION의 서명이다.',
      '## 로고 없는 옷에도',
      '블랭크 티셔츠와 메리노 니트에는 로고가 없다. 대신 탭이 있다. 아무것도 쓰지 않아도 어디 옷인지 아는 상태, 우리가 원하는 건 그 정도의 존재감이다.',
    ] },
  { id: 'three-piece', kicker: 'HOW TO', title: '옷 몰라도 되는 세 벌 공식', minutes: 3, tone: '#ACACA6', fg: '#1B1B1A',
    lede: '로고 한 벌, 무채색 한 벌, 좋은 바지 한 벌. 이 셋이면 일주일이 굴러간다.',
    quote: '튀는 건 한 벌이면 충분하다.',
    shop: ['u01', 'u14', 'u10'],
    body: [
      '첫째, 로고나 패턴이 있는 옷은 한 벌만. 루프 로고 티나 카모 후디를 골랐다면 나머지는 검정, 회색, 베이지 안에서 고른다.',
      '둘째, 바지에 돈을 쓴다. 와이드 플리츠 트라우저는 후디와도, 블레이저와도 맞는다. 바지가 좋으면 위에 뭘 입어도 정돈돼 보인다.',
      '셋째, 끝을 맺는 소품 하나. 비니나 볼캡은 머리 손질이 안 된 날을 가려주고, 사진의 위쪽을 채운다.',
      '헷갈리면 상품 페이지의 "이렇게 입어요"를 그대로 담으면 된다. 우리가 미리 맞춰 뒀다.',
    ] },
  { id: 'white-tee', kicker: 'GUIDE', title: '흰 티 하나 제대로 고르는 법', minutes: 4, tone: '#F4F4F2', fg: '#1B1B1A',
    lede: '비치는지, 목이 늘어나는지, 어깨선이 어디 떨어지는지. 이 세 가지만 보면 된다.',
    quote: '200g을 넘으면 비치지 않는다.',
    shop: ['u08'],
    body: [
      '## 두께',
      '원단 두께는 평방미터당 무게(gsm)로 쓴다. 200g을 넘으면 대체로 비치지 않는다. UNION 헤비 블랭크 티는 280g이다.',
      '## 목',
      '목둘레 립이 촘촘하고 두꺼우면 몇 번 빨아도 늘어나지 않는다. 2.5cm 이상이면 안심해도 된다.',
      '## 어깨',
      '어깨 봉제선이 내 어깨보다 살짝 아래 있으면 넉넉한 느낌, 딱 어깨 위에 있으면 단정한 느낌이다. 체형보다 원하는 분위기로 고르면 된다.',
    ] },
];
