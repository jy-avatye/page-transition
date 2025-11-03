# Page Transition Project

Next.js 14 App Router를 사용한 부드러운 페이지 전환 애니메이션 데모 프로젝트입니다.

## 프로젝트 개요

이 프로젝트는 View Transitions API를 활용하여 페이지 간 부드러운 전환 효과를 구현합니다. 모바일 앱과 유사한 스크롤 기반 페이지 전환 경험을 제공합니다.

## 주요 기능

### 1. 양방향 페이지 전환
- **Forward (페이지 1 → 2)**: 위로 슬라이드하는 애니메이션
- **Backward (페이지 2 → 1)**: 아래로 슬라이드하는 애니메이션

### 2. Progressive Enhancement
- **최신 브라우저**: View Transitions API 사용
- **구형 브라우저**: CSS 애니메이션 기반 Fallback 제공

## 프로젝트 구조

```
app/
├── page.tsx                    # 루트 페이지 (Next.js 기본 페이지)
├── page1/
│   └── page.tsx               # 첫 번째 페이지
├── page2/
│   ├── page.tsx               # 두 번째 페이지
│   ├── hooks/
│   │   └── useViewTransition.ts   # View Transition 로직 훅
│   └── components/
│       ├── PageContent.tsx    # 페이지 콘텐츠 컴포넌트
│       └── BackButton.tsx     # 뒤로가기 버튼 컴포넌트
└── globals.css                # 전역 스타일 및 애니메이션 정의
```

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

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: View Transitions API + CSS Animations
- **Rendering**: Static Site Generation (SSG)

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

## 주요 학습 포인트

1. **View Transitions API**: 네이티브 브라우저 API를 활용한 부드러운 페이지 전환
2. **Progressive Enhancement**: 최신 기술과 Fallback 전략의 조화
3. **컴포넌트 재사용**: 커스텀 훅과 컴포넌트 추상화를 통한 코드 재사용성 향상
4. **TypeScript**: 타입 안정성을 통한 개발 경험 개선
5. **Clean Code**: 관심사 분리(Separation of Concerns) 원칙 적용

## TypeScript 설정

`tsconfig.json`의 주요 설정:
- `"jsx": "preserve"`: Next.js의 자체 JSX 변환 사용
- `"lib": ["dom", "dom.iterable", "esnext"]`: DOM API 타입 지원
- `"moduleResolution": "bundler"`: 최신 모듈 해석 전략

## 라이센스

MIT