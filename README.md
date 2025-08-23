## Blue Payments

### 프로젝트 빌드/실행 방법
```
# 설치 및 빌드, 실행
npm install
npm run build
npm run dev

# 테스트
npm run test
```

### 프로젝트 구조
* API 응답을 위해 Mock Service Worker(이하, MSW)를 사용했습니다.
  * Handler와 Scenario로 구성되어 있습니다.
  * MSW Scenario 관련하여 아래에 별도 기술했습니다.
* Zustand 및 TanStack Query 를 사용하여 인증, 데이터, API 등의 데이터를 전역 상태 관리 및 캐싱 처리했습니다.
* 일부 Suspense 관련 데이터에 코드 스플리팅을 도입했습니다.
* 가능한 웹표준에 맞는 마크업을 작성하도록 했으며, 일부 반응형 컴포넌트로 구성했습니다.
* 국제화(i18n) 관련 코드 추가 예정입니다.
  * {ko/en} locale로 기본 세팅 되도록 middleware를 구성했습니다.  
* jest 기반의 테스트 코드를 작성했습니다. (보완 예정입니다.)

### 시나리오 설정 방법
* 최초 프로젝트 실행 시, scenario 쿼리 스트링에 의해 시나리오를 결정합니다.
* scenario는 'success', 'pending', 'error'로 구성했습니다. (default: error)
  * http://localhost:{port_num}/{locale}?scenario={success|pending|error}
* error 시나리오로 시작 시,
  * 주문 실패 후 재시도, 로딩, 성공으로 이어지도록 구성했습니다. 
* pending 시나리오로 시작 시
  * 로딩, 성공으로 이어지도록 구성했습니다.
* success 시나리오로 시작 시
  * 즉시 성공으로 이어지도록 구성했습니다.

### API 변경 사항
* `/api/orders` 의 response 를 `{ orderId: string, status: 'PAID'|'DECLINED'|'PENDING' }`으로 수정했습니다.
  * 응답 데이터 캐싱 처리를 위한 추가 키 데이터입니다. (queryKey)