import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../../components/aptitude/CommonComponents';

const categories = [
  { id: 'quantitative', title: 'Quantitative', icon: '📊' },
  { id: 'logical', title: 'Logical', icon: '🧩' },
  { id: 'verbal', title: 'Verbal', icon: '📚' },
  { id: 'technical', title: 'Technical', icon: '💻' },
  { id: 'programming', title: 'Programming', icon: '👨‍💻' }
];

const CategorySelect = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleCategorySelect = (categoryId) => {
    try {
      navigate(`/aptitude/difficulty/${categoryId}`);
    } catch (err) {
      setError('Failed to navigate to difficulty selection. Please try again.');
      console.error('Navigation error:', err);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Select a Category
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            icon={category.icon}
            onClick={() => handleCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;