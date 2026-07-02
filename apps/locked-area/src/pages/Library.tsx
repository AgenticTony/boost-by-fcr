// src/pages/Library.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Users } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import { useAuth } from '../auth/useAuth';

export default function Library() {
  const { data: exercises, isLoading, error } = useExercises();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const categories = ['all', 'Lätt', 'Medel', 'Svår'];

  const filteredExercises = exercises.filter((ex: any) => {
    const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ex.difficulty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExerciseClick = (id: string) => {
    navigate(`/exercise/${id}`);
  };

  if (isLoading) {
    return (
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bibliotek</h1>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bibliotek</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Kunde inte ladda övningar. Försök igen senare.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bibliotek</h1>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök övningar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Alla' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Inga övningar hittades. Försök med en annan sökning.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise: any) => (
            <div 
              key={exercise.id} 
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleExerciseClick(exercise.id)}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{exercise.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{exercise.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {exercise.difficulty}
                  </span>
                </div>
                <button 
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExerciseClick(exercise.id);
                  }}
                >
                  Visa övning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}