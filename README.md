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
* 다국어를 지원하도록 했습니다. (next-intl)
  * 기본 언어는 브라우져의 설정에 따릅니다.
  * 지원 언어: 'en', 'ko'
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
* `/api/orders`의 response를 `{ orderId: string, status: 'PAID'|'DECLINED'|'PENDING' }`으로 수정했습니다.
  * 응답 데이터 캐싱 처리를 위한 추가 키 데이터입니다. (queryKey)

### 번들러 (webpack / turbopack) 비교
* hyperfine을 통해 빌드 속도를 비교 측정했습니다. ('next build' VS 'next build --turbopack')
* Turbopack이 빠른 빌드 및 캐싱 최적화를 중점으로 개발된 번들러라고 하지만, 아직 Experimental로 제공되고 있습니다.
* 비교 결과, 두 번들러 간의 빌드 속도 차이는 근소했으며, Webpack이 근소 우위의 결과를 보였습니다.
* 실행 스크립트 및 결과를 아래에 기재합니다.

```
hyperfine "npm run build" "npm run build:turbo"

Benchmark 1: npm run build
  Time (mean ± σ):      8.927 s ±  0.416 s    [User: 18.220 s, System: 1.777 s]
  Range (min … max):    8.420 s …  9.664 s    10 runs
 
Benchmark 2: npm run build:turbo
  Time (mean ± σ):      9.537 s ±  0.511 s    [User: 24.240 s, System: 2.759 s]
  Range (min … max):    9.019 s … 10.672 s    10 runs
 
Summary
  npm run build ran
    1.07 ± 0.08 times faster than npm run build:turbo
```