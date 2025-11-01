export const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      >
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Progress: {current}/{total} Levels Completed
      </p>
    </div>
  );
};

export const CategoryCard = ({ title, icon, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 
        ${disabled 
          ? 'bg-gray-100 cursor-not-allowed' 
          : 'bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-purple-50'}`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </button>
  );
};

export const LevelCard = ({ level, isUnlocked, bestScore = null, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 transform
        ${isUnlocked 
          ? 'hover:scale-105 bg-gradient-to-r from-white to-blue-50' 
          : 'bg-gray-100 cursor-not-allowed'}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Level {level}</h3>
        {!isUnlocked && (
          <span className="text-2xl">🔒</span>
        )}
      </div>
      {bestScore !== null && (
        <p className="text-sm text-gray-600 mt-2">Best Score: {bestScore}%</p>
      )}
    </button>
  );
};