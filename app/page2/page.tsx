'use client';

import { useViewTransition } from './hooks/useViewTransition';
import { PageContent } from './components/PageContent';
import { BackButton } from './components/BackButton';

export default function Page2() {
  const { navigateWithTransition } = useViewTransition();

  const handleGoBack = () => {
    navigateWithTransition('/page1', 'backward');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-8">
      <PageContent
        title="페이지 2"
        subtitle="성공적으로 도착했습니다!"
        description="이 페이지 역시 SSG로 빌드되었으며, 스크롤하듯이 부드럽게 전환되었습니다. Next.js의 강력한 라우팅 시스템과 CSS 애니메이션을 활용했습니다."
      >
        <BackButton onClick={handleGoBack} />
      </PageContent>
    </div>
  );
}
