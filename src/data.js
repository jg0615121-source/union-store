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
  { id: 'u01', name: 'LINE 2 LOOP TEE', ko: '2호선 루프 티셔츠', cat: 'tee', price: 39000, print: 'line2', colors: [C.white, C.black, C.ash], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['캠퍼스', '한강', '여름', '데일리'], isNew: true, rank: 1,
    story: '2호선은 끝없이 도는 순환선이에요. 51개 역을 한 바퀴로 그렸고, 등판에는 역 이름이 전부 들어가요. 내가 사는 역부터 찾게 되는 티셔츠.' },
  { id: 'u02', name: '02 CALLING HOODIE', ko: '02 콜링 후디', cat: 'hoodie', price: 79000, print: 'o2', colors: [C.grey, C.black, C.forest], tags: ['street', 'oversize', 'essential', 'mono'], scenes: ['가을', '겨울', '캠퍼스', '추위'], isNew: true, rank: 2,
    story: '서울 지역번호 02. 집 전화를 기억하는 마지막 세대와, 처음 보는 세대가 같이 입는 숫자예요. 안쪽은 기모 없이 쫀쫀한 루프백이라 봄가을까지 입어요.' },
  { id: 'u03', name: 'N26 NIGHT ROUTE CREWNECK', ko: 'N26 심야노선 맨투맨', cat: 'crew', price: 69000, print: 'n26', colors: [C.navy, C.oat], tags: ['street', 'mono', 'trend', 'oversize'], scenes: ['밤', '가을', '데이트'], rank: 5,
    story: '막차를 놓친 밤, 서울을 가로지르는 심야버스 N26. 노선판을 그대로 가슴에 옮겼어요. 새벽 1시의 서울을 아는 사람이라면 알아봐요.' },
  { id: 'u04', name: 'HAN RIVER RAMYEON TEE', ko: '한강 라면 티셔츠', cat: 'tee', price: 39000, print: 'receipt', colors: [C.white, C.butter], tags: ['street', 'bold', 'trend', 'oversize'], scenes: ['한강', '여름', '데이트', '더위'], isNew: true, rank: 3,
    story: '한강 편의점 영수증을 그대로 프린트했어요. 즉석라면, 삼각김밥, 바나나우유. 합계는 매번 다르지만 기분은 늘 같은 그 저녁.' },
  { id: 'u05', name: 'UNION WORDMARK TEE', ko: '유니온 워드마크 티셔츠', cat: 'tee', price: 35000, print: 'wordmark', colors: [C.white, C.black, C.grey], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['출근', '데일리', '데이트'], rank: 4,
    story: '로고 하나만 작게. 셔츠 안에 받쳐도, 재킷 안에 넣어도 튀지 않아요. 옷장에 한 장은 있어야 하는 기본.' },
  { id: 'u06', name: 'ARCH LOGO CAP', ko: '아치 로고 볼캡', cat: 'cap', price: 42000, print: 'arch', colors: [C.black, C.navy, C.stone], tags: ['street', 'essential', 'mono'], scenes: ['여행', '데일리', '한강', '더위'], rank: 6,
    story: '머리 손질 안 한 날의 구원. 챙이 살짝 휘어 있어서 처음 써도 어색하지 않아요. 뒤 스트랩으로 사이즈 조절.' },
  { id: 'u07', name: '98.1 STATIC LONG SLEEVE', ko: '98.1 스태틱 롱슬리브', cat: 'longsleeve', price: 49000, print: 'static', colors: [C.black, C.white], tags: ['street', 'mono', 'trend', 'fitted'], scenes: ['봄', '가을', '캠퍼스'], rank: 9,
    story: '라디오 주파수를 맞추다 잡히는 지지직 소리. 도시의 잡음을 파형으로 그렸어요. 소매 끝에 작은 UNION 자수.' },
  { id: 'u08', name: 'CROSSWALK TRACK PANTS', ko: '횡단보도 트랙팬츠', cat: 'pants', price: 69000, print: 'crosswalk', colors: [C.black, C.navy], tags: ['street', 'bold', 'trend', 'oversize'], scenes: ['운동', '여행', '캠퍼스'], rank: 7,
    story: '옆선에 횡단보도 줄무늬. 허리 밴딩에 밑단 스냅이 있어서 와이드로도, 조여서 조거로도 입어요.' },
  { id: 'u09', name: 'UNION COACH JACKET', ko: '유니온 코치 재킷', cat: 'jacket', price: 129000, print: 'arch', colors: [C.black, C.olive], tags: ['street', 'essential', 'mono', 'oversize'], scenes: ['봄', '가을', '비', '여행'], rank: 8,
    story: '가벼운 생활방수 나일론. 등판에 큰 아치 로고, 가슴엔 작게. 후디 위에 걸치면 봄가을이 끝나요.' },
  { id: 'u10', name: 'WIDE CHINO PANTS', ko: '와이드 치노 팬츠', cat: 'pants', price: 79000, print: 'none', colors: [C.stone, C.charcoal], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['출근', '데이트', '데일리'], rank: 10,
    story: '허벅지는 넉넉하고 밑단으로 갈수록 살짝 좁아져요. 운동화에도 로퍼에도 맞는 길이. 어떤 상의를 골라도 실패가 없어요.' },
  { id: 'u11', name: 'LOOP BEANIE', ko: '루프 비니', cat: 'beanie', price: 32000, print: 'line2', colors: [C.green, C.black, C.grey], tags: ['street', 'bold', 'essential'], scenes: ['겨울', '추위', '데일리'], rank: 11,
    story: '2호선 초록색 비니. 무채색 코디에 하나만 얹으면 사진이 달라져요. 접어 쓰면 귀까지 덮여요.' },
  { id: 'u12', name: 'MANGWON MARKET TOTE', ko: '망원시장 토트백', cat: 'tote', price: 29000, print: 'market', colors: [C.natural, C.black], tags: ['clean', 'trend', 'essential'], scenes: ['캠퍼스', '여행', '데일리'], isNew: true, rank: 12,
    story: '시장 봉투처럼 막 쓰라고 만든 두꺼운 캔버스 가방. 노트북 15인치가 들어가고, 안쪽에 작은 주머니가 있어요.' },
  { id: 'u13', name: 'HEAVY BLANK TEE', ko: '헤비 무지 티셔츠', cat: 'tee', price: 29000, print: 'blank', colors: [C.white, C.black, C.grey, C.navy], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['출근', '데일리', '데이트', '여름'], rank: 13,
    story: '비치지 않는 두께의 무지 티셔츠. 목이 늘어나지 않게 촘촘한 립을 썼어요. 그래픽 티 사이사이에 입는 쉼표.' },
  { id: 'u14', name: 'STATION SHORTS', ko: '스테이션 쇼츠', cat: 'shorts', price: 45000, print: 'wordmark', colors: [C.grey, C.black], tags: ['street', 'essential', 'oversize'], scenes: ['여름', '운동', '한강', '더위'], rank: 14,
    story: '무릎 위로 떨어지는 스웨트 반바지. 주머니가 깊어서 폰이 빠지지 않아요. 한강 러닝부터 동네 산책까지.' },
  { id: 'u15', name: 'LINE 2 VARSITY JACKET', ko: '2호선 바시티 재킷', cat: 'varsity', price: 189000, print: 'line2', colors: [C.green, C.black], tags: ['street', 'bold', 'trend', 'oversize'], scenes: ['겨울', '가을', '데이트'], isNew: true, rank: 15,
    story: '몸판은 울 혼방, 소매는 인조가죽. 가슴의 루프 패치는 펠트 자수예요. 한 시즌을 이 재킷 하나로 버텨요.' },
  { id: 'u16', name: 'UNION CREW SOCKS 3PACK', ko: '유니온 크루 삭스 3팩', cat: 'socks', price: 19000, print: 'wordmark', colors: [C.white, C.black], tags: ['clean', 'essential', 'mono'], scenes: ['데일리', '운동'], rank: 16,
    story: '발목 위로 올라오는 크루 길이. 반바지 아래 살짝 보이면 그게 코디예요.' },
];

export const CATS = {
  tee: '티셔츠', longsleeve: '롱슬리브', hoodie: '후디', crew: '맨투맨', jacket: '재킷', varsity: '재킷',
  pants: '팬츠', shorts: '쇼츠', cap: '모자', beanie: '모자', tote: '가방', socks: '양말',
};
export const SHOP_FILTERS = [
  ['all', '전체'], ['top', '상의'], ['outer', '아우터'], ['bottom', '하의'], ['acc', '모자·잡화'],
];
export const GROUP = {
  tee: 'top', longsleeve: 'top', hoodie: 'top', crew: 'top', jacket: 'outer', varsity: 'outer',
  pants: 'bottom', shorts: 'bottom', cap: 'acc', beanie: 'acc', tote: 'acc', socks: 'acc',
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
  { id: 'l01', name: '2호선 출근길', who: '@seongsu.daily', items: [['u05', 0], ['u10', 0], ['u06', 0]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l02', name: '한강 피크닉', who: '@yeouido.sun', items: [['u04', 1], ['u14', 0], ['u06', 2]], tags: ['street', 'bold', 'trend'] },
  { id: 'l03', name: '막차 놓친 밤', who: '@n26.rider', items: [['u03', 0], ['u08', 0], ['u11', 1]], tags: ['street', 'mono', 'trend'] },
  { id: 'l04', name: '캠퍼스 9시 수업', who: '@sinchon.kid', items: [['u02', 0], ['u08', 1], ['u12', 0]], tags: ['street', 'oversize', 'essential'] },
  { id: 'l05', name: '첫 데이트 무난하게', who: '@mangwon.walk', items: [['u13', 0], ['u10', 1], ['u12', 1]], tags: ['clean', 'mono', 'fitted'] },
  { id: 'l06', name: '초록 한 방울', who: '@jamsil.loop', items: [['u02', 1], ['u10', 1], ['u11', 0]], tags: ['street', 'bold', 'essential'] },
  { id: 'l07', name: '비 오는 홍대', who: '@hapjeong.rain', items: [['u09', 0], ['u08', 0], ['u06', 0]], tags: ['street', 'mono', 'essential'] },
  { id: 'l08', name: '주말 러닝', who: '@ttukseom.run', items: [['u13', 2], ['u14', 1], ['u16', 0]], tags: ['street', 'essential', 'fitted'] },
  { id: 'l09', name: '겨울 바시티', who: '@euljiro.night', items: [['u15', 0], ['u10', 1], ['u11', 1]], tags: ['street', 'bold', 'trend'] },
  { id: 'l10', name: '올블랙 라디오', who: '@mullae.static', items: [['u07', 0], ['u08', 0], ['u06', 0]], tags: ['street', 'mono', 'trend'] },
  { id: 'l11', name: '버터색 오후', who: '@yeonnam.cafe', items: [['u04', 1], ['u10', 0], ['u12', 0]], tags: ['clean', 'bold', 'trend'] },
  { id: 'l12', name: '오트밀 산책', who: '@seochon.stroll', items: [['u03', 1], ['u10', 0], ['u06', 2]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l13', name: '공항 가는 길', who: '@gimpo.gate', items: [['u02', 1], ['u08', 0], ['u12', 1]], tags: ['street', 'mono', 'oversize'] },
  { id: 'l14', name: '올리브 레이어드', who: '@itaewon.layer', items: [['u09', 1], ['u10', 0], ['u06', 2]], tags: ['clean', 'essential', 'oversize'] },
  { id: 'l15', name: '숲 색 후디', who: '@seoulforest.green', items: [['u02', 2], ['u14', 0], ['u16', 0]], tags: ['street', 'bold', 'oversize'] },
  { id: 'l16', name: '흰 티 정석', who: '@hannam.white', items: [['u01', 0], ['u10', 1], ['u16', 0]], tags: ['street', 'bold', 'trend'] },
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

export const articles = [
  { id: 'why-line2', kicker: 'BRAND', title: '왜 하필 2호선이냐면', minutes: 4,
    lede: '서울에서 유일하게 끝이 없는 노선. UNION이라는 이름은 거기서 시작됐어요.',
    body: ['2호선은 51개 역을 한 바퀴로 잇는 순환선이에요. 강남에서 타든 신촌에서 타든 결국 같은 원 위에 있어요. 서로 모르는 동네 사람들이 같은 칸에 서 있는 노선이죠.', 'UNION은 그 원을 로고의 O 자리에 넣었어요. 옷 한 벌로 서울의 서로 다른 동네가 이어진다는 뜻이에요.', '그래서 UNION의 그래픽은 전부 서울에서 왔어요. 지역번호 02, 심야버스 N26, 한강 편의점 영수증, 망원시장 봉투. 옷을 몰라도 서울을 알면 읽히는 그림들이에요.'] },
  { id: 'three-piece', kicker: 'HOW TO', title: '옷 몰라도 되는 3벌 공식', minutes: 3,
    lede: '그래픽 티 하나, 무채색 바지 하나, 모자 하나. 이 셋이면 일주일이 굴러가요.',
    body: ['첫째, 상의 중 하나만 튀게. 그래픽 티를 골랐다면 나머지는 검정, 회색, 베이지 안에서 고르세요.', '둘째, 바지는 넉넉한 일자 하나면 충분해요. 와이드 치노는 운동화에도 로퍼에도 맞아요.', '셋째, 모자나 비니로 끝을 맺어요. 머리 손질이 안 된 날을 가려주고, 사진을 찍었을 때 위쪽이 비지 않아요.', '헷갈리면 상품 페이지의 "이렇게 입어요" 세트를 그대로 담으면 돼요. 저희가 미리 맞춰뒀어요.'] },
  { id: 'n26-walk', kicker: 'SEOUL', title: 'N26 노선을 따라 걸어봤다', minutes: 6,
    lede: '강서에서 중랑까지, 새벽의 서울을 가로지르는 버스. 그 노선판이 맨투맨이 되기까지.',
    body: ['심야버스는 밤 11시 30분쯤 첫차가 출발해 새벽까지 다녀요. 막차를 놓친 사람, 야간 근무를 마친 사람, 그냥 집에 가기 싫은 사람이 같이 타요.', '노선판의 숫자와 화살표는 그 자체로 좋은 그래픽이었어요. 글자 크기와 간격만 다듬어 가슴에 옮겼어요.', '네이비는 새벽 2시의 하늘, 오트밀은 해 뜨기 직전의 색이에요.'] },
  { id: 'white-tee', kicker: 'GUIDE', title: '흰 티 하나 제대로 고르는 법', minutes: 3,
    lede: '비치는지, 목이 늘어나는지, 어깨선이 어디 떨어지는지. 이 세 가지만 보세요.',
    body: ['두께는 "중량"으로 써 있어요. 200g이 넘으면 대체로 안 비쳐요. UNION 헤비 티는 230g이에요.', '목둘레 립이 촘촘하고 두꺼우면 몇 번 빨아도 늘어나지 않아요.', '어깨 봉제선이 내 어깨보다 살짝 아래 있으면 넉넉한 느낌, 딱 어깨 위에 있으면 단정한 느낌이에요.'] },
];
