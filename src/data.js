// Plain JS (no JSX): the serverless function imports this too.

// Garment-dyed palette. ink = contrast print, tone = tonal embroidery a shade off the base.
const C = {
  white: { name: 'White', hex: '#F2F1EC', ink: '#2E2E2D', tone: '#D2D0C8' },
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
  { id: 'u01', name: 'SYMBOL TEE', ko: '심볼 티셔츠', cat: 'tee', price: 35000, print: 'blank', colors: [C.white, C.black, C.grey], tags: ['clean', 'mono', 'essential', 'fitted'], scenes: ['데일리', '출근', '데이트', '여름'], isNew: true, rank: 1,
    story: '230g 두께라 흰색도 비치지 않는 반팔. 넥 립이 촘촘해서 빨아도 목이 늘어나지 않아요.' },
  { id: 'u02', name: 'BIG LOGO TEE', ko: '빅 로고 티셔츠', cat: 'tee', price: 39000, print: 'wordmark-big', colors: [C.white, C.black], tags: ['street', 'bold', 'oversize', 'trend'], scenes: ['캠퍼스', '여름', '데일리', '여행'], isNew: true, rank: 2,
    story: '가슴을 가로지르는 UNION 로고. 수성 잉크라 빨수록 자연스럽게 바래요. 어깨가 살짝 떨어지는 넉넉한 핏.' },
  { id: 'u03', name: 'SYMBOL HOODIE', ko: '심볼 후디', cat: 'hoodie', price: 69000, print: 'blank', colors: [C.grey, C.black], tags: ['street', 'mono', 'oversize', 'essential'], scenes: ['가을', '겨울', '캠퍼스', '추위'], isNew: true, rank: 3,
    story: '기모 없는 쫀쫀한 루프백 원단이라 봄가을까지 입어요. 2겹 후드라 모양이 쉽게 무너지지 않아요.' },
  { id: 'u05', name: 'SYMBOL SWEATSHIRT', ko: '심볼 맨투맨', cat: 'crew', price: 59000, print: 'blank', colors: [C.oat, C.navy], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['가을', '봄', '데이트', '캠퍼스'], rank: 4,
    story: '래글런 소매라 어깨선이 부드럽게 떨어져요. 셔츠 위에 겹쳐 입기 좋아요.' },
  { id: 'u10', name: 'WIDE SWEATPANTS', ko: '와이드 스웨트팬츠', cat: 'pants', price: 55000, print: 'none', colors: [C.grey, C.black], tags: ['clean', 'mono', 'essential', 'oversize'], scenes: ['데일리', '캠퍼스', '여행'], rank: 5,
    story: '바닥까지 떨어지는 와이드 핏. 허리 밴딩이라 하루 종일 편해요.' },
  { id: 'u12', name: 'SYMBOL CAP', ko: '심볼 볼캡', cat: 'cap', price: 35000, print: 'blank', colors: [C.black, C.stone], tags: ['street', 'essential', 'mono'], scenes: ['여행', '데일리', '더위'], rank: 6,
    story: '챙이 살짝 휘어 있어서 처음 써도 어색하지 않아요. 뒤 버클로 크기를 맞춰요.' },
];

export const CATS = {
  tee: '티셔츠', longsleeve: '롱슬리브', hoodie: '후디', crew: '맨투맨', jacket: '재킷', varsity: '재킷',
  pants: '팬츠', shorts: '쇼츠', cap: '모자', beanie: '모자', tote: '가방', socks: '양말', blazer: '재킷', coat: '코트', knit: '니트',
};
export const SHOP_FILTERS = [
  ['all', '전체'], ['top', '상의'], ['bottom', '하의'], ['acc', '모자'],
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
  { id: 'l02', name: '주말 피크닉', who: '@picnic.day', items: [['u02', 0], ['u10', 0], ['u12', 1]], tags: ['street', 'bold', 'trend'] },
  { id: 'l03', name: '막차 놓친 밤', who: '@late.night', items: [['u05', 1], ['u10', 1], ['u12', 0]], tags: ['street', 'mono', 'trend'] },
  { id: 'l04', name: '9시 수업', who: '@first.class', items: [['u03', 0], ['u10', 0], ['u12', 1]], tags: ['street', 'oversize', 'essential'] },
  { id: 'l05', name: '첫 데이트 무난하게', who: '@soft.date', items: [['u01', 0], ['u10', 0], ['u12', 1]], tags: ['clean', 'mono', 'fitted'] },
  { id: 'l06', name: '올블랙 셋업', who: '@all.black', items: [['u03', 1], ['u10', 1], ['u12', 0]], tags: ['street', 'mono', 'trend'] },
  { id: 'l07', name: '오트밀 산책', who: '@slow.walk', items: [['u05', 0], ['u10', 0], ['u12', 1]], tags: ['clean', 'mono', 'essential'] },
  { id: 'l08', name: '로고 하나로', who: '@one.logo', items: [['u02', 1], ['u10', 0], ['u12', 1]], tags: ['street', 'bold', 'trend'] },
];

// Fashion MBTI uses the real 16 types. Each question nudges one axis.
// Ordered from everyday habits to what clothes mean to you; the four axes are interleaved.
export const MBTI_Q = [
  { q: '내일 입을 옷은', a: [['J', '전날 밤에 정해서 꺼내둔다'], ['P', '아침에 창밖 보고 고른다']] },
  { q: '옷을 살 때 먼저 손이 가는 곳은', a: [['S', '안쪽 라벨과 실측표'], ['N', '거울 앞, 입은 모습']] },
  { q: '새로 산 옷을 처음 입는 날', a: [['E', '누가 알아봐 주면 기분이 좋다'], ['I', '아무도 몰라도 내가 알면 됐다']] },
  { q: '친구가 산 옷을 보여주며 "어때?" 하고 묻는다. 솔직히 별로다', a: [['T', '어디가 아쉬운지 말해준다'], ['F', '잘 어울리는 데부터 찾아본다']] },
  { q: '구경만 하러 들어간 가게에서', a: [['J', '정말 구경만 하고 나온다'], ['P', '뭔가 하나 들고 나온다']] },
  { q: '다들 입기 시작한 옷이 눈에 들어올 때', a: [['S', '몇 번 더 보고 확신이 들면 산다'], ['N', '그 전에 이미 비슷한 걸 입고 있었다']] },
  { q: '모임에 들어섰는데 다들 내 옷을 본다', a: [['E', '오늘 잘 골랐다는 뜻이다'], ['I', '어딘가 이상한가 싶어진다']] },
  { q: '처음 가는 자리, 거울 앞에서 마지막으로 고치는 건', a: [['T', '장소에 맞는지'], ['F', '같이 갈 사람과 어울리는지']] },
  { q: '몇 년 뒤의 내 옷장은', a: [['J', '손이 가는 몇 벌로 완성돼 있을 것 같다'], ['P', '그때의 나에 따라 계속 바뀌어 있을 것 같다']] },
  { q: '어떤 일을 하든, 일하는 날의 나는', a: [['S', '셔츠 하나도 반듯하게 입는 사람'], ['N', '같은 옷도 다르게 입는 사람']] },
  { q: '인생에서 중요한 날, 옷을 고르는 기준은', a: [['T', '흠잡힐 데가 없는 것'], ['F', '그날의 나답게 보이는 것']] },
  { q: '옷이 나 대신 한마디 해준다면, 듣고 싶은 말은', a: [['E', '"저 사람, 눈에 띈다"'], ['I', '"저 사람, 자기 취향이 있다"']] },
];

// How each letter shows up in clothes, for recommendations.
const AX = { E: 'bold', I: 'mono', S: 'essential', N: 'trend', T: 'clean', F: 'street', J: 'fitted', P: 'oversize' };
export const axisTags = (code) => code.split('').map((l) => AX[l]);

// [style name, personality → clothes, how to wear UNION]
export const MBTI_TYPES = {
  ISTJ: ['기본템 장인', '검증된 걸 오래 쓰는 사람. 옷도 실패 없는 기본템을 여러 벌 돌려 입어요.', '심볼 티를 색만 바꿔 여러 벌.'],
  ISFJ: ['포근한 데일리룩', '주변을 챙기는 만큼 편안함을 중요하게 여겨요. 부드러운 소재와 차분한 색이 잘 맞아요.', '오트 맨투맨에 회색 스웨트팬츠.'],
  INFJ: ['조용한 무드 메이커', '말보다 분위기로 존재감을 내요. 톤을 맞춘 코디에 작은 디테일 하나가 어울려요.', '무채색 한 벌에 초록 탭이 보이게.'],
  INTJ: ['올블랙 전략가', '계획적이고 군더더기를 싫어해요. 검정 한 가지로 정리된 실루엣이 제일 잘 어울려요.', '블랙 후디에 블랙 스웨트팬츠.'],
  ISTP: ['실용주의 캐주얼', '필요한 것만 남기는 타입. 주머니 많고 편한 옷을 고르면 실패가 없어요.', '후디와 스웨트팬츠, 볼캡.'],
  ISFP: ['감성 빈티지러', '자기만의 취향이 분명해요. 바랜 색감과 손맛 있는 프린트가 잘 맞아요.', '빅 로고 티를 한 치수 크게.'],
  INFP: ['몽글한 오버핏 낭만파', '이상과 감성이 풍부해요. 넉넉한 핏 속에서 편안함을 느껴요.', '오버핏 후디에 와이드 팬츠.'],
  INTP: ['대충 입은 듯 계산된 사람', '관심 없는 척하지만 기준은 확실해요. 무지 티 하나도 핏을 따져요.', '심볼 티에 와이드 팬츠, 아무렇지 않게.'],
  ESTP: ['스포티 액티브', '몸이 먼저 움직이는 타입. 활동적인 스포츠 무드가 잘 어울려요.', '후디에 볼캡, 셋업 바지까지.'],
  ESFP: ['포인트 컬러 파티룩', '어디서든 분위기를 띄워요. 시선을 끄는 색 하나를 과감하게.', '블랙 빅 로고 티로 한 방에.'],
  ENFP: ['컬러 믹스 자유인', '호기심이 많고 하루에도 기분이 바뀌어요. 다양한 색을 섞어 입는 게 즐거워요.', '빅 로고 티에 색 다른 볼캡.'],
  ENTP: ['실험적 레이어링', '새로운 조합을 시도하는 걸 좋아해요. 겹쳐 입기로 늘 다르게.', '맨투맨 아래로 티셔츠 밑단이 보이게.'],
  ESTJ: ['깔끔한 셋업 리더', '정리정돈과 결과를 중시해요. 위아래 톤을 맞춘 단정한 셋업이 잘 맞아요.', '같은 색 맨투맨과 스웨트팬츠 셋업.'],
  ESFJ: ['누구에게나 호감 데일리룩', '사람을 좋아하고 분위기를 맞춰요. 어디 가도 무난하게 예쁜 옷이 강점이에요.', '심볼 티에 와이드 팬츠, 볼캡.'],
  ENFJ: ['따뜻한 컬러 리더', '사람을 이끌고 챙겨요. 밝은 톤에 포인트 하나로 친근한 인상을.', '오트 맨투맨에 스톤 볼캡.'],
  ENTJ: ['카리스마 블랙 셋업', '목표가 분명하고 주도적이에요. 어둡고 각 잡힌 실루엣이 힘을 실어줘요.', '블랙 후디 셋업.'],
};

// Journal. Written in magazine prose (-다 체). body: paragraphs, '## ' starts a subheading.
export const articles = [
  { id: 'three-piece', kicker: 'STYLE', title: '세 벌이면 충분하다', minutes: 3, tone: '#1B1B1A', fg: '#ECECEA', credit: '글 UNION 편집부',
    lede: '옷장을 열 때마다 고민하는 사람에게, 덜어내는 쪽의 이야기.',
    quote: '잘 입는 사람의 옷장은 생각보다 단출하다.',
    shop: ['u02', 'u10', 'u12'],
    body: [
      '월요일 아침 옷장 앞에서 보내는 시간은 대개 고르는 시간이 아니라 버리는 시간이다. 이건 어제 입었고, 저건 너무 튀고, 그건 바지와 안 맞는다. 선택지가 많을수록 결정은 늦어진다.',
      '## 하나만 말하게 둔다',
      '로고가 큰 티셔츠를 꺼낸 날은 나머지가 조용해야 한다. 회색 바지, 무지 양말, 낡은 운동화. 한 벌이 말을 하면 나머지는 듣는 쪽에 선다.',
      '## 바지는 넉넉하게',
      '위가 어떤 옷이든 아래가 일자로 떨어지면 전체가 정돈돼 보인다. 와이드 스웨트팬츠는 그래서 가장 많이 손이 가는 옷이 된다.',
      '## 모자로 끝낸다',
      '머리를 만지지 못한 아침, 볼캡 하나가 그날의 인상을 정한다. 세 벌과 모자 하나. 그 정도면 일주일은 충분히 돌아간다.',
    ] },
  { id: 'logo-tee', kicker: 'ESSAY', title: '로고를 크게 입는 날', minutes: 4, tone: '#E6E1D6', fg: '#1B1B1A', credit: '글 UNION 편집부',
    lede: '로고는 한동안 부끄러운 것이었다. 다시 가슴 한가운데로 돌아온 이유에 대하여.',
    quote: '로고가 크면, 나머지는 작아져야 한다.',
    shop: ['u02', 'u01'],
    body: [
      '조용한 옷이 유행하던 몇 해 동안 로고는 옷 안쪽 라벨로 숨어 들어갔다. 무엇을 입었는지 드러내지 않는 것이 세련됨의 기준이었다.',
      '## 다시 바깥으로',
      '요즘 로고는 다시 가슴 위로 올라오고 있다. 다만 예전처럼 머리부터 발끝까지 겹쳐 입지 않는다. 한 벌만 크게, 나머지는 비워둔다.',
      '## 크기와 거리',
      '가슴 한가운데 큰 로고는 멀리서 읽히는 옷이다. 왼쪽 가슴의 작은 라벨은 가까이 와야 보이는 옷이다. 둘 중 무엇을 고를지는 그날 만날 사람과의 거리로 정하면 된다.',
    ] },
  { id: 'green-tab', kicker: 'DETAIL', title: '1센티미터의 초록', minutes: 3, tone: '#2D5E45', fg: '#ECECEA', credit: '글 UNION 편집부',
    lede: '모든 UNION 옷의 밑단에는 초록 탭이 하나 달려 있다. 로고가 없는 옷에도.',
    quote: '멀리서도 알아볼 수 있는 가장 작은 표시.',
    shop: ['u03', 'u10'],
    body: [
      '청바지 뒷주머니의 작은 탭은 수십 년 동안 그 브랜드를 대신 설명해 왔다. 로고를 읽지 않아도, 그 색 하나로 충분했다.',
      '## 왜 초록인가',
      '무채색 옷이 대부분인 옷장에서 초록은 튀지 않으면서도 눈에 걸린다. 검정 후디 끝에, 회색 바지 허리에, 흰 티셔츠 옆선에. 어디에 붙여도 제자리처럼 보인다.',
      '## 아무것도 쓰지 않아도',
      '라벨이 작아도, 로고가 없어도 밑단의 초록을 보면 어디 옷인지 안다. UNION이 바라는 존재감은 딱 그 정도다.',
    ] },
  { id: 'white-tee', kicker: 'NOTES', title: '흰 티의 조건', minutes: 4, tone: '#F4F4F2', fg: '#1B1B1A', credit: '글 UNION 편집부',
    lede: '가장 흔한 옷이 가장 고르기 어렵다. 좋은 흰 티를 가르는 세 가지.',
    quote: '200그램을 넘으면 비치지 않는다.',
    shop: ['u01'],
    body: [
      '## 무게',
      '원단의 두께는 평방미터당 무게로 적는다. 200그램을 넘으면 대개 비치지 않는다. UNION의 티셔츠는 230그램이다. 손에 쥐었을 때 처지지 않고 형태를 유지하는 무게다.',
      '## 목',
      '몇 번 빨고 나면 목이 늘어나는 티가 있다. 넥 립이 촘촘하고 두꺼울수록 오래 간다. 2.5센티미터면 충분하다.',
      '## 어깨',
      '어깨 봉제선이 내 어깨보다 조금 아래 있으면 여유가 생기고, 정확히 위에 있으면 단정해진다. 체형보다 그날 원하는 인상으로 고르면 된다.',
    ] },
];

// Per-product info, laid out like a Korean platform product sheet: a level matrix plus short spec lines.
// info: [fit, thickness, stretch, sheer, feel] as indexes into INFO_SCALE rows.
export const INFO_SCALE = [
  ['핏', ['슬림', '레귤러', '세미오버', '오버']],
  ['두께감', ['얇음', '보통', '두꺼움']],
  ['신축성', ['없음', '약간', '좋음']],
  ['비침', ['없음', '약간', '있음']],
  ['촉감', ['부드러움', '보통', '단단함']],
];
const TEE_SIZE = { head: ['', '총장', '어깨', '가슴', '소매'], rows: [['S', 68, 50, 54, 21], ['M', 71, 53, 57, 22], ['L', 74, 56, 60, 23], ['XL', 77, 59, 63, 24]] };
const MODELS = [['남성 모델', '181cm · 68kg', 'L 착용'], ['여성 모델', '167cm · 49kg', 'M 착용']];
export const DETAILS = {
  u01: { info: [2, 1, 1, 0, 0], season: '봄 · 여름 · 가을', fabric: '면 100%', spec: ['싱글 저지 230g', '넥 립 2.5cm', '트윈 니들 밑단', '밑단 초록 탭'], size: TEE_SIZE, models: MODELS },
  u02: { info: [3, 1, 1, 0, 0], season: '봄 · 여름 · 가을', fabric: '면 100%', spec: ['싱글 저지 230g', '수성 실크스크린', '어깨 테이핑', '밑단 초록 탭'], size: { head: TEE_SIZE.head, rows: [['S', 70, 52, 57, 22], ['M', 73, 55, 60, 23], ['L', 76, 58, 63, 24], ['XL', 79, 61, 66, 25]] }, models: MODELS },
  u03: { info: [3, 2, 1, 0, 1], season: '봄 · 가을 · 겨울', fabric: '면 80% · 폴리에스터 20%', spec: ['루프백 420g, 기모 없음', '2겹 후드', '소매·밑단 2x2 립', '평면 면 끈'], size: { head: ['', '총장', '어깨', '가슴', '소매'], rows: [['S', 68, 54, 60, 58], ['M', 71, 57, 63, 59], ['L', 74, 60, 66, 60], ['XL', 77, 63, 69, 61]] }, models: MODELS },
  u05: { info: [1, 2, 1, 0, 1], season: '봄 · 가을', fabric: '면 80% · 폴리에스터 20%', spec: ['루프백 380g', '래글런 소매', '넥 V 스티치', '밑단 초록 탭'], size: { head: ['', '총장', '가슴', '화장'], rows: [['S', 66, 56, 80], ['M', 69, 59, 82], ['L', 72, 62, 84], ['XL', 75, 65, 86]] }, models: MODELS },
  u10: { info: [3, 2, 1, 0, 1], season: '봄 · 가을 · 겨울', fabric: '면 80% · 폴리에스터 20%', spec: ['루프백 380g', '밴딩 + 내부 스트링', '옆주머니 깊이 18cm', '후디·맨투맨과 동일 원단'], size: { head: ['', '총장', '허리', '허벅지', '밑단'], rows: [['S', 100, 33, 33, 25], ['M', 103, 35, 35, 26], ['L', 106, 37, 37, 27], ['XL', 109, 39, 39, 28]] }, models: MODELS },
  u12: { info: [1, 1, 0, 0, 1], season: '사계절', fabric: '면 100%', spec: ['워싱 트윌', '언스트럭처드 6패널', '황동 버클 조절', '내부 땀받이 테이프'], size: { head: ['', '머리 둘레', '챙', '깊이'], rows: [['FREE', '56–60', 7, 12]] }, models: [['모델', '머리 둘레 57cm', 'FREE 착용']] },
};
