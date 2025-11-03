import { useRouter } from 'next/navigation';

export const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (path: string, direction: 'forward' | 'backward' = 'forward') => {
    // View Transitions API 지원 확인
    if ('startViewTransition' in document) {
      const transition = (document as any).startViewTransition(() => {
        if (direction === 'backward') {
          document.documentElement.classList.add('backward');
        }
        router.push(path);
      });

      // 애니메이션 완료 후 클래스 제거
      transition.finished.finally(() => {
        document.documentElement.classList.remove('backward');
      });
    } else {
      // Fallback: 스크롤 애니메이션 효과
      const overlay = document.createElement('div');
      overlay.className = `page-transition-overlay${direction === 'backward' ? ' reverse' : ''}`;
      document.body.appendChild(overlay);

      setTimeout(() => {
        router.push(path);
      }, 300);
    }
  };

  return { navigateWithTransition };
};
