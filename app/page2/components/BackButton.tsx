interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-pink-600 px-8 py-4 rounded-full text-xl font-semibold
                 hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300
                 shadow-2xl hover:shadow-3xl"
    >
      페이지 1로 돌아가기
    </button>
  );
};
