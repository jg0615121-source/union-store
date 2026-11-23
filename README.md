# UNION

서울 2호선에서 시작된 스트릿 브랜드 UNION의 쇼핑 사이트예요. 포트폴리오용이라 실제 결제는 하지 않아요.

## 들어 있는 것

- **쇼핑:** 상품 16개(그래픽 직접 디자인, SVG), 상품 상세, 장바구니, 찜, 주문서
- **콘텐츠:** 룩북, 스냅, 매거진
- **AI 기능(Gemini):**
  - 상황으로 찾기: "비 오는 날 데이트" 같은 말로 상품을 찾아요
  - AI 스타일리스트 채팅
  - AI 코디 체크: 사진을 올리면 점수를 매겨요
  - 후기 AI 요약
- **AI 키 없이 동작하는 기능:** 사이즈 추천, 날씨 기반 코디(open-meteo), 취향 기반 추천
- **놀이:** 패션 MBTI(16유형), 코디 이상형 월드컵(16강)

`GEMINI_API_KEY`가 없으면 AI 기능은 키워드와 색 분석으로 대신 동작해요. 그래서 키 없이 배포해도 사이트가 깨지지 않아요.

## 로컬 실행

```bash
npm install
npm run dev
```

AI 기능까지 로컬에서 시험하려면 `vercel dev`나 `netlify dev`로 실행하세요. `npm run dev`에는 `/api/ai`가 없어요.

## 배포

두 곳 모두 GitHub 저장소를 연결하면 자동으로 빌드돼요. 설정 파일(`vercel.json`, `netlify.toml`)이 이미 들어 있어요.

| | Vercel | Netlify |
|---|---|---|
| 연결 | Add New → Project → 저장소 선택 | Add new site → Import from Git |
| 빌드 | 자동 감지(Vite) | `netlify.toml` 사용 |
| AI 함수 | `api/ai.js` | `netlify/functions/ai.mjs` |
| 환경 변수 | Settings → Environment Variables | Site configuration → Environment variables |

- 환경 변수에 `GEMINI_API_KEY`를 넣어요. 키는 https://aistudio.google.com/apikey 에서 받아요.
- 모델을 바꾸려면 `GEMINI_MODEL`을 넣어요. 기본값은 `gemini-2.5-flash`예요.

## 구조

- `src/data.js`: 상품, 착장, MBTI, 매거진 데이터. 서버 함수도 이 파일을 같이 써요.
- `src/garments.jsx`: 옷 일러스트와 로고(SVG)
- `lib/gemini.js`: Gemini 호출. Vercel과 Netlify가 같이 써요.
- `docs/gemini-prompts.md`: 룩북 사진 생성용 프롬프트
