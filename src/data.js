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

// Fashion MBTI uses the real 16 types. Each question nudges one axis.
export const MBTI_Q = [
  { q: '팀 프로젝트를 시작할 때 나는', a: [['E', '일단 모여서 이야기하며 아이디어를 낸다'], ['I', '혼자 먼저 생각을 정리한 뒤 공유한다']] },
  { q: '일주일 내내 바빴던 주말, 진짜 쉬는 방법은', a: [['E', '친구들을 만나 에너지를 채운다'], ['I', '아무도 안 만나고 집에서 충전한다']] },
  { q: '내가 더 잘 맞는 회사는', a: [['E', '사람들과 계속 부딪히며 일하는 곳'], ['I', '내 자리에서 깊게 몰입할 수 있는 곳']] },
  { q: '진로를 고를 때 더 끌리는 쪽은', a: [['S', '검증된 길에서 차근차근 실력을 쌓는 것'], ['N', '아직 없는 일을 새로 만들어 보는 것']] },
  { q: '새로운 일을 배울 때 나는', a: [['S', '매뉴얼과 예시부터 꼼꼼히 본다'], ['N', '전체 그림부터 잡고 감으로 해본다']] },
  { q: '10년 뒤의 나를 상상하면', a: [['S', '구체적인 직업과 생활이 그려진다'], ['N', '어떤 사람이 되고 싶은지가 먼저 떠오른다']] },
  { q: '동료와 의견이 부딪혔을 때 더 중요한 건', a: [['T', '누가 맞는지 논리적으로 따져보는 것'], ['F', '서로 기분 상하지 않게 푸는 것']] },
  { q: '일에서 가장 큰 보람은', a: [['T', '성과와 실력을 인정받을 때'], ['F', '누군가에게 도움이 됐다고 느낄 때']] },
  { q: '친구가 고민을 털어놓으면 나는', a: [['T', '해결 방법부터 같이 찾아준다'], ['F', '일단 충분히 공감해준다']] },
  { q: '여행을 갈 때 나는', a: [['J', '동선과 맛집까지 미리 정해둔다'], ['P', '도착해서 끌리는 대로 다닌다']] },
  { q: '마감이 2주 남은 과제가 있다면', a: [['J', '미리 나눠서 조금씩 끝내둔다'], ['P', '마감 직전에 몰아서 해낸다']] },
  { q: '내 인생 계획은', a: [['J', '단계별 목표가 어느 정도 정해져 있다'], ['P', '그때그때 기회를 보며 바꿔간다']] },
];

// How each letter shows up in clothes, for recommendations.
const AX = { E: 'bold', I: 'mono', S: 'essential', N: 'trend', T: 'clean', F: 'street', J: 'fitted', P: 'oversize' };
export const axisTags = (code) => code.split('').map((l) => AX[l]);

// [style name, personality → clothes, how to wear UNION]
export const MBTI_TYPES = {
  ISTJ: ['기본템 장인', '검증된 걸 오래 쓰는 사람. 옷도 실패 없는 기본템을 여러 벌 돌려 입어요.', '심볼 티와 와이드 팬츠를 색만 바꿔 여러 벌.'],
  ISFJ: ['포근한 데일리룩', '주변을 챙기는 만큼 편안함을 중요하게 여겨요. 부드러운 소재와 차분한 색이 잘 맞아요.', '오트밀 맨투맨에 회색 스웨트팬츠.'],
  INFJ: ['조용한 무드 메이커', '말보다 분위기로 존재감을 내요. 톤을 맞춘 코디에 작은 디테일 하나가 어울려요.', '무채색 한 벌에 초록 탭이 보이게.'],
  INTJ: ['올블랙 전략가', '계획적이고 군더더기를 싫어해요. 검정 한 가지로 정리된 실루엣이 제일 잘 어울려요.', '블랙 로고 후디에 블랙 트랙팬츠.'],
  ISTP: ['실용주의 캐주얼', '필요한 것만 남기는 타입. 주머니 많고 편한 옷을 고르면 실패가 없어요.', '코치 재킷과 트랙팬츠, 볼캡.'],
  ISFP: ['감성 빈티지러', '자기만의 취향이 분명해요. 바랜 색감과 손맛 있는 프린트가 잘 맞아요.', '빅 로고 티를 한 치수 크게.'],
  INFP: ['몽글한 오버핏 낭만파', '이상과 감성이 풍부해요. 넉넉한 핏 속에서 편안함을 느껴요.', '오버핏 후디에 와이드 팬츠, 비니.'],
  INTP: ['대충 입은 듯 계산된 사람', '관심 없는 척하지만 기준은 확실해요. 무지 티 하나도 핏을 따져요.', '헤비 무지 티와 롱슬리브 레이어드.'],
  ESTP: ['스포티 액티브', '몸이 먼저 움직이는 타입. 활동적인 스포츠 무드가 잘 어울려요.', '트랙팬츠에 스웨트 쇼츠, 크루 삭스.'],
  ESFP: ['포인트 컬러 파티룩', '어디서든 분위기를 띄워요. 시선을 끄는 색 하나를 과감하게.', '초록 비니나 바시티로 한 방에.'],
  ENFP: ['컬러 믹스 자유인', '호기심이 많고 하루에도 기분이 바뀌어요. 다양한 색을 섞어 입는 게 즐거워요.', '빅 로고 티에 색 다른 볼캡.'],
  ENTP: ['실험적 레이어링', '새로운 조합을 시도하는 걸 좋아해요. 겹쳐 입기로 늘 다르게.', '롱슬리브 위에 반팔, 그 위에 코치 재킷.'],
  ESTJ: ['깔끔한 셋업 리더', '정리정돈과 결과를 중시해요. 위아래 톤을 맞춘 단정한 셋업이 잘 맞아요.', '같은 색 맨투맨과 스웨트팬츠 셋업.'],
  ESFJ: ['누구에게나 호감 데일리룩', '사람을 좋아하고 분위기를 맞춰요. 어디 가도 무난하게 예쁜 옷이 강점이에요.', '심볼 티에 와이드 팬츠, 토트백.'],
  ENFJ: ['따뜻한 컬러 리더', '사람을 이끌고 챙겨요. 밝은 톤에 포인트 하나로 친근한 인상을.', '베이지 계열에 초록 포인트.'],
  ENTJ: ['카리스마 블랙 셋업', '목표가 분명하고 주도적이에요. 어둡고 각 잡힌 실루엣이 힘을 실어줘요.', '바시티 재킷에 블랙 팬츠.'],
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
