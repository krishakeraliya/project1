import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../store/auth';
import api from '../api/api';

const categoryNames = {
  quantitative: 'Quantitative Aptitude',
  logical: 'Logical Reasoning',
  verbal: 'Verbal Ability',
  technical: 'Technical Knowledge',
  programming: 'Programming'
};

export default function LevelSelection() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const difficultyLevels = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (selectedDifficulty) {
      fetchAvailableLevels();
    }
  }, [selectedDifficulty, categoryId]);

  const fetchAvailableLevels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/levels/${categoryId}/${selectedDifficulty}`);
      setAvailableLevels(response.data.levels);
    } catch (error) {
      console.error('Error fetching levels:', error);
      setError('Failed to load available levels. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          {categoryNames[categoryId] || 'Category'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Select Difficulty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {difficultyLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedDifficulty(level.id)}
                  className={`p-4 rounded-lg font-medium transition-all duration-300 ${
                    selectedDifficulty === level.id
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Select Level</h2>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
                </div>
              ) : availableLevels.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {availableLevels.map(({ level, isUnlocked }) => (
                    <motion.button
                      key={level}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={isUnlocked ? { scale: 1.05 } : {}}
                      onClick={() => {
                        if (isUnlocked) {
                          navigate(`/aptitude/${categoryId}/${selectedDifficulty}/${level}`);
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        isUnlocked
                          ? 'bg-white/5 border-blue-400 hover:bg-white/10 cursor-pointer'
                          : 'bg-white/5 border-gray-600 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">Level {level}</div>
                        {!isUnlocked && (
                          <div className="text-sm text-gray-400">
                            🔒 Complete previous level to unlock
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-xl text-gray-400">
                    No levels available for this difficulty yet.
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
