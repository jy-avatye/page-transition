# Page Transition Project

Next.js 16 App Router를 사용한 부드러운 페이지 전환 애니메이션 구현 프로젝트입니다.

## 프로젝트 개요

이 프로젝트는 **View Transitions API**를 활용하여 메인 페이지에서 상세 페이지로 이동할 때 모바일 앱과 유사한 부드러운 전환 효과를 구현합니다. 스크롤 기반의 자연스러운 페이지 전환 경험을 제공합니다.

## 사용된 기술 스택 및 API

### 프레임워크 & 라이브러리
- **Next.js**: 16.0.1 (App Router)
- **React**: 19.2.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4

### 사용된 주요 API

#### 1. Next.js API
- **`useRouter()`** ([next/navigation](https://nextjs.org/docs/app/api-reference/functions/use-router))
  - 클라이언트 사이드 페이지 네비게이션
  - `router.push(path)`: 프로그래매틱 라우팅

#### 2. Browser API
- **View Transitions API** ([MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API))
  - `document.startViewTransition(callback)`: 페이지 전환 애니메이션 실행
  - `transition.finished`: 애니메이션 완료 감지
  - 지원 브라우저: Chrome 111+, Edge 111+

#### 3. DOM Manipulation API
- `document.documentElement.classList`: HTML 요소에 방향성 클래스 추가/제거
- `document.createElement()`, `document.body.appendChild()`: Fallback 오버레이 생성

## 주요 기능

### 1. 양방향 페이지 전환
- **Forward (페이지 1 → 2)**: 위로 슬라이드하는 애니메이션
- **Backward (페이지 2 → 1)**: 아래로 슬라이드하는 애니메이션

### 2. Progressive Enhancement
- **최신 브라우저**: View Transitions API 사용
- **구형 브라우저**: CSS 애니메이션 기반 Fallback 제공 (Fallback은 아직 테스트해보지 못했습니다.)

## 데이터 흐름 (Flow Diagram)

```
사용자 액션 (버튼 클릭)
    ↓
이벤트 핸들러 (handleLearnMore / handleGoBack)
    ↓
useViewTransition Hook
    ↓
브라우저 API 지원 체크
    ↓
    ├─→ [브라우저 지원 O] View Transitions API
    │       ↓
    │   1. HTML에 방향 클래스 추가 (forward/backward)
    │   2. document.startViewTransition() 실행
    │   3. router.push(path) - 페이지 라우팅
    │   4. CSS 애니메이션 자동 적용
    │   5. 애니메이션 완료 후 클래스 제거
    │
    └─→ [브라우저 지원 X] Fallback
            ↓
        1. 오버레이 DOM 요소 생성
        2. CSS 클래스 추가 (애니메이션 트리거)
        3. 300ms 대기 (setTimeout)
        4. router.push(path) - 페이지 라우팅
```

### 주요 흐름 설명

**메인 페이지 → 상세 페이지 (Forward)**
1. 사용자가 "더 알아보기" 버튼 클릭
2. `navigateWithTransition('/page2', 'forward')` 호출
3. View Transitions API로 위로 슬라이드 애니메이션 실행
4. Next.js 라우터가 `/page2`로 네비게이션

**상세 페이지 → 메인 페이지 (Backward)**
1. 사용자가 "돌아가기" 버튼 클릭
2. `navigateWithTransition('/page1', 'backward')` 호출
3. View Transitions API로 아래로 슬라이드 애니메이션 실행
4. Next.js 라우터가 `/page1`로 네비게이션

## 프로젝트 구조 및 핵심 파일

```
app/
├── page.tsx                    # 루트 페이지 (Next.js 기본 페이지)
├── page1/
│   └── page.tsx               # 메인 페이지 (시작점)
├── page2/
│   ├── page.tsx               # 상세 페이지
│   ├── hooks/
│   │   └── useViewTransition.ts   # ⭐ 핵심: View Transition 로직
│   └── components/
│       ├── PageContent.tsx    # 재사용 가능한 레이아웃 컴포넌트
│       └── BackButton.tsx     # 뒤로가기 버튼 컴포넌트
└── globals.css                # ⭐ 핵심: 애니메이션 스타일 정의
```

### ⭐ 핵심 파일 설명

#### 1. `useViewTransition.ts` - 페이지 전환 로직 핵심
- **역할**: 페이지 전환 애니메이션을 담당하는 재사용 가능한 커스텀 훅
- **주요 함수**: `navigateWithTransition(path, direction)`
  - `path`: 이동할 페이지 경로
  - `direction`: 애니메이션 방향 ('forward' | 'backward')
- **기능**:
  - View Transitions API 지원 여부 자동 감지
  - 지원 시: 네이티브 API로 부드러운 전환
  - 미지원 시: CSS 애니메이션 Fallback
- **다른 프로젝트에 통합 시**: 이 파일만 복사하면 동일한 전환 효과 사용 가능

#### 2. `globals.css` - 애니메이션 스타일
- **역할**: View Transitions API와 Fallback을 위한 CSS 애니메이션 정의
- **주요 스타일**:
  - `::view-transition-old(root)`, `::view-transition-new(root)`: View Transitions API용
  - `.page-transition-overlay`: Fallback용 오버레이 애니메이션
  - `html.forward`, `html.backward`: 방향별 애니메이션 구분
- **커스터마이징 포인트**:
  - 애니메이션 속도: `animation-duration` 조정
  - 이동 거리: `translateY` 값 변경
  - Easing: `animation-timing-function` 수정

#### 3. `page1/page.tsx` - 메인 페이지
- **역할**: 진입점 페이지 (메인/목록 페이지)
- **주요 로직**: Forward 방향 전환 (`/page2`로 이동)
- **특징**: `'use client'` 필수 (클라이언트 컴포넌트)

#### 4. `page2/page.tsx` - 상세 페이지
- **역할**: 목적지 페이지 (상세 페이지)
- **주요 로직**: Backward 방향 전환 (`/page1`로 복귀)
- **특징**: 훅 사용으로 코드 간결화

## 핵심 로직 설명

### 1. View Transition Hook (`useViewTransition.ts`)

페이지 전환 로직을 재사용 가능한 커스텀 훅으로 추상화했습니다.

**동작 원리:**
1. **브라우저 지원 확인**: `startViewTransition` API 존재 여부 체크
2. **API 지원 시**:
   - `direction`에 따라 DOM에 CSS 클래스 추가 (`backward` 또는 기본값)
   - View Transitions API로 페이지 라우팅
   - 애니메이션 완료 후 클래스 제거
3. **API 미지원 시 (Fallback)**:
   - 오버레이 요소를 동적으로 생성
   - CSS 애니메이션으로 페이지 전환 효과 모방
   - 300ms 딜레이 후 라우팅

```typescript
navigateWithTransition(path: string, direction: 'forward' | 'backward')
```

### 2. 페이지 전환 애니메이션 (`globals.css`)

#### View Transitions API 기반 애니메이션
- `html.forward::view-transition-old/new(root)`: 전진 방향 (위로)
- `html.backward::view-transition-old/new(root)`: 후진 방향 (아래로)

#### Fallback 애니메이션
- `.page-transition-overlay`: 오버레이 슬라이드 애니메이션
- 브라우저 호환성을 위한 대체 방안

### 3. 컴포넌트 아키텍처

#### `PageContent` 컴포넌트
- 재사용 가능한 페이지 레이아웃 컴포넌트
- Props: `title`, `subtitle`, `description`, `children`
- 일관된 UI/UX 제공

#### `BackButton` 컴포넌트
- 독립적인 버튼 컴포넌트
- onClick 핸들러를 통한 이벤트 위임

### 4. 페이지별 동작

#### Page 1 (`/page1`)
```typescript
handleLearnMore() {
  // View Transition으로 페이지2로 이동 (forward 방향)
  navigateWithTransition('/page2', 'forward');
}
```

#### Page 2 (`/page2`)
```typescript
handleGoBack() {
  // View Transition으로 페이지1로 이동 (backward 방향)
  navigateWithTransition('/page1', 'backward');
}
```


## 설치 및 실행

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000/page1](http://localhost:3000/page1)을 열어 확인하세요.

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 브라우저 지원

- **View Transitions API 지원**: Chrome 111+, Edge 111+
- **Fallback 지원**: 모든 모던 브라우저 (CSS 애니메이션 기반)

## 주의사항 및 제약사항

### 필수 요구사항
1. **Client Component 필수**
   - 모든 페이지 컴포넌트는 `'use client'` 지시문 필요
   - View Transitions API와 `useRouter`는 클라이언트 측에서만 동작

2. **브라우저 호환성**
   - View Transitions API는 Chrome 111+, Edge 111+에서만 완전 지원
   - 다른 브라우저는 자동으로 Fallback 애니메이션 사용
   - Safari, Firefox는 현재 Fallback으로 동작

3. **Next.js App Router 필수**
   - Pages Router에서는 동작하지 않음
   - `next/navigation`의 `useRouter` 사용 필수

### 알려진 제약사항

1. **애니메이션 타이밍**
   - Fallback 모드에서는 300ms 고정 딜레이 존재
   - 너무 빠르게 연속 클릭 시 애니메이션이 중첩될 수 있음

2. **DOM 조작**
   - View Transitions API 사용 시 DOM 구조가 단순할수록 부드러움
   - 복잡한 DOM 구조에서는 성능 저하 가능

3. **SSG/SSR 제한**
   - 페이지는 SSG로 빌드되지만, 전환 로직은 클라이언트에서만 실행
   - 서버 컴포넌트에서는 이 훅을 직접 사용 불가

### 통합 시 주의사항

1. **globals.css 통합**
   - 애니메이션 스타일이 프로젝트의 다른 CSS와 충돌하지 않는지 확인
   - 특히 `::view-transition-*` 의사 요소가 다른 곳에서 사용되는지 체크

2. **라우팅 경로**
   - `navigateWithTransition(path, direction)`의 `path`는 절대 경로 권장
   - 상대 경로 사용 시 현재 경로에 따라 동작이 달라질 수 있음

3. **타입스크립트 설정**
   - `tsconfig.json`에 `"lib": ["dom", "dom.iterable", "esnext"]` 필요
   - View Transitions API 타입 인식을 위해 필수

4. **성능 고려사항**
   - 큰 페이지에서는 애니메이션 부하가 있을 수 있음
   - 필요 시 `prefers-reduced-motion` 미디어 쿼리로 모션 감소 대응 가능

## 주요 학습 포인트

1. **View Transitions API**: 네이티브 브라우저 API를 활용한 부드러운 페이지 전환
2. **Progressive Enhancement**: 최신 기술과 Fallback 전략의 조화
3. **컴포넌트 재사용**: 커스텀 훅과 컴포넌트 추상화를 통한 코드 재사용성 향상
4. **TypeScript**: 타입 안정성을 통한 개발 경험 개선
5. **Clean Code**: 관심사 분리(Separation of Concerns) 원칙 적용

## 라이센스

MIT
