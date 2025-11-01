import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LevelCard, ProgressBar } from '../../components/aptitude/CommonComponents';
import axios from '../../api/api';

const LevelSelect = () => {
  const navigate = useNavigate();
  const { category, difficulty } = useParams();
  const [progress, setProgress] = useState({
    unlockedLevels: [1],
    scores: []
  });
  const [loading, setLoading] = useState(true);
  const totalLevels = 10; // You can adjust this number

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // api baseURL already contains /api
        const response = await axios.get(`/progress/${category}/${difficulty}`);
        // ensure we always have the expected shape (defensive)
        const safeData = response.data || {};
        setProgress({
          unlockedLevels: Array.isArray(safeData.unlockedLevels) ? safeData.unlockedLevels : [1],
          scores: Array.isArray(safeData.scores) ? safeData.scores : []
        });
      } catch (error) {
        console.error('Error fetching progress:', error);
        // keep defaults if request fails
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [category, difficulty]);

  // Derive safe values to avoid reading properties of undefined
  const unlockedLevels = Array.isArray(progress.unlockedLevels) ? progress.unlockedLevels : [1];
  const scores = Array.isArray(progress.scores) ? progress.scores : [];

  const getBestScore = (level) => {
    const levelScores = scores.filter(score => score.level === level);
    if (levelScores.length === 0) return null;
    return Math.max(...levelScores.map(score => score.score));
  };

  const handleLevelSelect = (level) => {
    navigate(`/aptitude/quiz/${category}/${difficulty}/${level}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Select Level - {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      
      <div className="max-w-3xl mx-auto mb-8">
        <ProgressBar 
          current={Math.max(0, unlockedLevels.length - 1)} 
          total={totalLevels - 1}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(totalLevels)].map((_, index) => {
          const level = index + 1;
          const isUnlocked = unlockedLevels.includes(level);
          const bestScore = getBestScore(level);

          return (
            <LevelCard
              key={level}
              level={level}
              isUnlocked={isUnlocked}
              bestScore={bestScore}
              onClick={() => handleLevelSelect(level)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect;