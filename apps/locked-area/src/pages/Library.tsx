import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['Alla', 'Teknik', 'Taktik', 'Träning', 'Utforskning'];

export default function Library() {
  const { data: articles, isLoading, error } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alla');

  const filteredArticles = articles?.filter((article: any) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alla' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 flex justify-center items-center min-h-screen">
        <ErrorMessage message="Kunde inte ladda artiklar" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bibliotek | Boost by FCR</title>
      </Helmet>

      <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 pt-4 px-4 max-w-7xl mx-auto">
        

        {/* Search Bar */}
        <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Sök artiklar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Category Filters */}
        <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 flex gap-2 mb-8 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500 mt-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles?.map((article: any) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              {article.summary && (
                <p className="text-gray-600 text-sm mb-3">{article.summary.substring(0, 100)}...</p>
              )}
              <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 flex justify-between items-center text-sm">
                <span className="text-gray-500">{article.readTime || '5 min'} läsning</span>
                <a href={`/article/${article.slug}`} className="text-blue-900 hover:underline">
                  Läs mer ?
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles?.length === 0 && (
          <div style={{ paddingTop: "80px" }} className="pt-24 pt-20 pt-20 text-center py-12">
            <p className="text-gray-500">Inga artiklar hittades</p>
          </div>
        )}
      </div>
    </>
  );
}
