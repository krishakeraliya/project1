import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/api';

const QuizPage = () => {
  const navigate = useNavigate();
  const { category, difficulty, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          // api baseURL already contains /api, so call /questions (not /api/questions)
          const response = await axios.get(`/questions/${category}/${difficulty}/${level}`);
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            setQuestions(response.data);
            setUserAnswers({});
            setError(null);
          } else {
            setQuestions([]);
            setError('No questions available for this selection.');
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
          if (error.response?.status === 404) {
            setError('No questions found for this category and difficulty level.');
          } else if (error.response?.status === 500) {
            setError('Server error. Please try again later or contact support if the problem persists.');
          } else if (!navigator.onLine) {
            setError('You are offline. Please check your internet connection.');
          } else {
            setError('Failed to load questions. Please try again later.');
          }
        } finally {
          setLoading(false);
        }
      };

    fetchQuestions();
  }, [category, difficulty, level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/submit', {
        questionIds: questions.map(q => q._id),
        userAnswers: questions.map(q => userAnswers[q._id] || ''),
        category,
        difficulty,
        level
      });

      navigate('/aptitude/result', {
        state: { 
          result: response.data,
          category,
          difficulty,
          level: Number(level)
        }
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      
      let errorMessage = 'Failed to submit answers. Please try again.';
      if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Invalid submission. Please check your answers.';
      } else if (!navigator.onLine) {
        errorMessage = 'You are offline. Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
      window.scrollTo(0, 0); // Scroll to top to show error message
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800">
            Level {level} - {category}
          </div>
          <div className="text-xl font-bold text-red-500">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
        <div className="mt-2">
          Questions Answered: {Object.keys(userAnswers).length}/{questions.length}
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              {index + 1}. {question.questionText}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(question._id, option)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200
                    ${userAnswers[question._id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;