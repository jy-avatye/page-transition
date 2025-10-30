'use client';

import { useRouter } from 'next/navigation';

export default function Page1() {
  const router = useRouter();

  const handleLearnMore = () => {
    // View Transitions API 지원 확인
    if ('startViewTransition' in document) {
      // Forward 방향 설정 (위로 올라가기)
      const transition = (document as any).startViewTransition(() => {
        document.documentElement.classList.add('forward');
        router.push('/page2');
      });

      // 애니메이션 완료 후 클래스 제거
      transition.finished.finally(() => {
        document.documentElement.classList.remove('forward');
      });
    } else {
      // Fallback: 스크롤 애니메이션 효과
      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);

      setTimeout(() => {
        router.push('/page2');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center text-white space-y-8 animate-fade-in">
        <h1 className="text-6xl font-bold mb-6">
          페이지 1
        </h1>
        <p className="text-2xl mb-8 opacity-90">
          환영합니다! 이것은 첫 번째 페이지입니다.
        </p>
        <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
          Next.js의 Static Site Generation(SSG)으로 빌드된 페이지입니다.
          아래 버튼을 클릭하면 부드러운 전환 애니메이션과 함께 페이지2로 이동합니다.
        </p>
        <button
          onClick={handleLearnMore}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-semibold
                     hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300
                     shadow-2xl hover:shadow-3xl"
        >
          더 알아보기
        </button>
      </div>
    </div>
  );
}
