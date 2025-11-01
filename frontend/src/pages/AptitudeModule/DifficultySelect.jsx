import { useNavigate, useParams } from 'react-router-dom';
import { CategoryCard } from '../../components/aptitude/CommonComponents';

const difficulties = [
  { id: 'easy', title: 'Easy', icon: '🌱' },
  { id: 'medium', title: 'Medium', icon: '🌿' },
  { id: 'hard', title: 'Hard', icon: '🌳' }
];

const DifficultySelect = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleDifficultySelect = (difficultyId) => {
    navigate(`/aptitude/levels/${category}/${difficultyId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Select Difficulty
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {difficulties.map((difficulty) => (
          <CategoryCard
            key={difficulty.id}
            title={difficulty.title}
            icon={difficulty.icon}
            onClick={() => handleDifficultySelect(difficulty.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DifficultySelect;