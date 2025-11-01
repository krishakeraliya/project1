import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, category, difficulty, level } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate('/aptitude');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const handleNextAction = () => {
    if (result.passed) {
      navigate(`/aptitude/levels/${category}/${difficulty}`);
    } else {
      navigate(`/aptitude/quiz/${category}/${difficulty}/${level}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="mb-6">
            {result.passed ? (
              <div className="text-6xl mb-4">🎉</div>
            ) : (
              <div className="text-6xl mb-4">💪</div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {result.passed 
              ? "You've unlocked the next level!"
              : "You're getting closer to mastering this level!"}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Score</span>
              <span className="text-2xl font-bold">{Math.round(result.score)}%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-semibold">{result.correctCount}/{result.totalQuestions}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Status</span>
              <span className={`font-semibold ${result.passed ? 'text-green-500' : 'text-yellow-500'}`}>
                {result.passed ? 'PASSED' : 'TRY AGAIN'}
              </span>
            </div>
          </div>

          <button
            onClick={handleNextAction}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            {result.passed ? 'Continue to Next Level' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;