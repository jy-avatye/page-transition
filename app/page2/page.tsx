'use client';

import { useRouter } from 'next/navigation';

export default function Page2() {
  const router = useRouter();

  const handleGoBack = () => {
    // View Transitions API 지원 확인
    if ('startViewTransition' in document) {
      // Backward 방향 설정 (아래로 내려가기)
      const transition = (document as any).startViewTransition(() => {
        document.documentElement.classList.add('backward');
        router.push('/page1');
      });

      // 애니메이션 완료 후 클래스 제거
      transition.finished.finally(() => {
        document.documentElement.classList.remove('backward');
      });
    } else {
      // Fallback: 스크롤 애니메이션 효과
      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay reverse';
      document.body.appendChild(overlay);

      setTimeout(() => {
        router.push('/page1');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center text-white space-y-8 animate-slide-in">
        <h1 className="text-6xl font-bold mb-6">
          페이지 2
        </h1>
        <p className="text-2xl mb-8 opacity-90">
          성공적으로 도착했습니다!
        </p>
        <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
          이 페이지 역시 SSG로 빌드되었으며, 스크롤하듯이 부드럽게 전환되었습니다.
          Next.js의 강력한 라우팅 시스템과 CSS 애니메이션을 활용했습니다.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleGoBack}
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-xl font-semibold
                       hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300
                       shadow-2xl hover:shadow-3xl"
          >
            페이지 1로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
