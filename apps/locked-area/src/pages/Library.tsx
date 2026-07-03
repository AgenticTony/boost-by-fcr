// src/pages/Library.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, BookOpen, Filter, ArrowRight, Info, X, Dumbbell, Target, Zap } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import { useAuth } from '../auth/useAuth';

export default function Library() {
  const { data: exercises, isLoading, error } = useExercises();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showInfo, setShowInfo] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const difficulties = ['all', 'Lätt', 'Medel', 'Svår'];

  const filteredExercises = exercises.filter((ex: any) => {
    const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ex.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.muscleGroups?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleExerciseClick = (id: string) => {
    navigate(`/exercise/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="pt-32 px-4 max-w-container mx-auto">
          <div className="bg-brand-red-light border border-brand-red/20 rounded-xl p-6 text-brand-red text-center">
            <Info className="w-12 h-12 mx-auto mb-4 text-brand-red" />
            <h3 className="text-lg font-semibold mb-2">Kunde inte ladda övningar</h3>
            <p>Försök igen senare eller kontakta support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body">
      {/* Hero Section */}
      <div className="relative bg-brand-navy text-white overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-gold rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-blue-light rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative max-w-container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-brand-gold" />
                </div>
                <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">Övningsbibliotek</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-display">
                Ditt kompletta <span className="text-brand-gold">träningsbibliotek</span>
              </h1>
              <p className="text-lg text-brand-blue-light mb-8 leading-relaxed">
                Utforska vårt bibliotek med professionellt utvecklade övningar för alla nivåer. 
                Filtrera efter svårighetsgrad, sök efter muskelgrupper och hitta de perfekta övningarna för ditt träningsprogram.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <Dumbbell className="w-5 h-5 text-brand-gold" />
                  <span className="text-sm font-medium">{exercises.length} övningar</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <Target className="w-5 h-5 text-brand-gold" />
                  <span className="text-sm font-medium">Alla nivåer</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <Zap className="w-5 h-5 text-brand-gold" />
                  <span className="text-sm font-medium">Expertguidade</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hidden md:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/20">
                <img 
                  src="/images/library-hero.jpg" 
                  alt="Träningsbibliotek" 
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">Professionellt utvecklade övningar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {showInfo && (
        <div className="bg-brand-gold/10 border-b border-brand-gold/20">
          <div className="max-w-container mx-auto px-6 md:px-12 py-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-brand-navy" />
              </div>
              <div className="flex-1">
                <p className="text-brand-navy text-sm">
                  <span className="font-semibold">Så här använder du biblioteket:</span> Använd sökfältet för att hitta specifika övningar eller muskelgrupper. 
                  Filtrera efter svårighetsgrad för att hitta övningar som matchar din nivå. Klicka på "Visa övning" för detaljerad instruktion.
                </p>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-brand-navy/50 hover:text-brand-navy transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Section */}
      <div className="sticky top-20 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-container mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Sök övningar, muskelgrupper..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all text-text"
              />
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-text-muted" />
              <div className="flex gap-1">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'bg-surface text-text-muted hover:bg-border'
                    }`}
                  >
                    {diff === 'all' ? 'Alla' : diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="max-w-container mx-auto px-6 md:px-12 py-8">
        {filteredExercises.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-brand-navy mb-2">Inga övningar hittades</h3>
            <p className="text-text-muted">Försök med en annan sökning eller filter.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-muted text-sm">
                Visar <span className="font-semibold text-brand-navy">{filteredExercises.length}</span> övningar
                {searchQuery && <span> för "<span className="font-semibold">{searchQuery}</span>"</span>}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise: any) => (
                <div 
                  key={exercise.id} 
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 cursor-pointer"
                  onClick={() => handleExerciseClick(exercise.id)}
                >
                  {/* Card Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-brand-navy to-brand-navy-light flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/0 transition-all"></div>
                    <Dumbbell className="w-16 h-16 text-brand-gold/30 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        exercise.difficulty === 'Lätt' ? 'bg-green-100 text-green-700' :
                        exercise.difficulty === 'Medel' ? 'bg-brand-gold/20 text-brand-navy' :
                        'bg-brand-red-light text-brand-red'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors font-display">
                      {exercise.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
                      {exercise.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-text-muted">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-text-muted">
                        <Target className="w-4 h-4" />
                        <span>{exercise.muscleGroups?.split(',')[0] || 'Hela kroppen'}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full flex items-center justify-center gap-2 py-3 bg-brand-navy text-white rounded-xl font-semibold hover:bg-brand-navy-light transition-colors group-hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExerciseClick(exercise.id);
                      }}
                    >
                      Visa övning
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}