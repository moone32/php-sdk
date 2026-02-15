# Auction Easy

부동산 경매 물건을 조회/등록하는 React 앱입니다.

## 주요 기능
- 메인 화면에서 경매 물건 리스트 조회
- `CODEF` API 동기화 버튼으로 외부 경매 물건 수집
- 리스트 클릭 시 상세 화면 이동
- 관리자 화면에서 물건 수동 등록
- Firebase Firestore 기반 데이터 저장

## 시작하기
```bash
npm install
cp .env.example .env
npm run dev
```

## 환경 변수
`VITE_` 접두어가 붙은 값은 프론트에 노출되므로, 실제 서비스에서는 반드시 백엔드 프록시를 통해 CODEF 비밀키를 호출하세요.

- Firebase
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- CODEF
  - `VITE_CODEF_BASE_URL`
  - `VITE_CODEF_CLIENT_ID`
  - `VITE_CODEF_CLIENT_SECRET`
  - `VITE_CODEF_PUBLIC_KEY`

## 폴더 구조
- `src/pages`: 홈/상세/관리자 페이지
- `src/services`: CODEF, Firestore 연동 로직
- `src/lib/firebase.js`: Firebase 초기화
