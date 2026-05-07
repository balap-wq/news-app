import React, { useEffect, useState } from 'react';
import HeadlineCards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft, AlertCircle, SlidersHorizontal } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import EmptyState from '../Components/EmptyState';
import { PRESET_CATEGORIES } from '../utils/categoryUtils';
import { useAuth } from '../Context/AuthContext';

const HeadlinePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputError, setInputError] = useState('');
  const [pageInput, setPageInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const pageSize = 9;

  const { data = [], loading, error, totalResults = 0, refetch } = useHeadlines({
    page: currentPage,
    limit: pageSize,
    category: activeCategory ? activeCategory : undefined,
  });

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => setInputError(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [inputError]);

  const handleCategoryChange = (cat) => {
    const next = activeCategory === cat ? '' : cat;
    setActiveCategory(next);
    setMobileDropdownOpen(false);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', 1);
      return params;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePage = (e) => {
    if (e.key === 'Enter') {
      if (!user) { navigate('/login', { replace: true }); return; }
      const page = Number(pageInput);
      if (!page || page < 1 || page > totalPages) {
        setInputError(`Enter a valid page (1 - ${totalPages})`);
        return;
      }
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('page', page);
        return params;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalPages = totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1;

  if (error) {
    return (
      <div className="bg-stone-900 container mx-auto w-90 h-80 md:w-140 mt-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center px-4 py-20">
        <ErrorMessage
          message={error}
          onRetry={() => {
            refetch();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mx-auto w-full text-center mt-7 flex items-center justify-center gap-2">
        <TrendingUp size={40} />
        <h1 className="relative text-3xl font-bold group">
          Top Headlines
          <span className="absolute left-1/4 top-10 h-1 w-15 bg-yellow-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </h1>
      </div>

      {/* Mobile filter */}
      <div className="flex md:hidden justify-end px-6 mt-6 relative">
        <button
          onClick={() => setMobileDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
            ${activeCategory
              ? 'bg-yellow-400 text-gray-900 border-yellow-400'
              : 'bg-transparent border-gray-400 text-gray-600'}`}
        >
          <SlidersHorizontal size={16} />
          {activeCategory ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : 'Filter'}
        </button>

        {mobileDropdownOpen && (
          <div className="absolute top-12 right-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl w-48 py-2 overflow-hidden">
            <button
              onClick={() => handleCategoryChange('')}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors
                ${activeCategory === '' ? 'bg-yellow-50 text-yellow-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              All
              {activeCategory === '' && <span className="float-right text-yellow-500">✓</span>}
            </button>
            <div className="border-t border-gray-100 my-1" />
            {PRESET_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat.toLowerCase())}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${activeCategory === cat.toLowerCase() ? 'bg-yellow-50 text-yellow-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {cat}
                {activeCategory === cat.toLowerCase() && <span className="float-right text-yellow-500">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Category Filter */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="hidden md:flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`ml-43 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
              ${activeCategory === ''
                ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                : 'bg-transparent border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-900'}`}
          >
            All
          </button>
          {PRESET_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
                ${activeCategory === cat.toLowerCase()
                  ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                  : 'bg-transparent border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {activeCategory && (
          <p className="hidden md:block mt-3 text-sm text-gray-500 ml-44">
            Showing results for{' '}
            <span className="font-semibold text-gray-700 capitalize">{activeCategory}</span>
            <button onClick={() => handleCategoryChange('')} className="ml-2 text-blue-500 hover:underline text-xs cursor-pointer">
              Clear
            </button>
          </p>
        )}
      </div>

      {/* Articles Grid */}
      {!loading && !error && data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => <HeadlineCardSkeleton key={`skeleton-${index}`} />)
            : data.map((article) => <HeadlineCards key={article.id} article={article} />)}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 md:gap-4 mt-1 md:mt-6">
        <Button
          aria-label="Previous page"
          onClick={() => {
            if (!user) { navigate('/login', { replace: true }); return; }
            if (currentPage === 1) return;
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set('page', Math.max(1, currentPage - 1));
              return params;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage === 1}
          className={currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg hover:shadow-blue-300'}
        >
          <ArrowLeft size={18} />
          Prev
        </Button>

        <span className="flex items-center px-1 font-medium pb-5">
          <input
            type="text"
            className="w-5 md:w-7 text-center border-none rounded outline-none focus:ring-2 focus:ring-blue-400"
            value={pageInput}
            onChange={(e) => { setPageInput(e.target.value); setInputError(''); }}
            onKeyDown={handlePage}
            min={1}
            max={totalPages}
          />
          of {totalPages}
        </span>

        <Button
          aria-label="Next page"
          onClick={() => {
            if (!user) { navigate('/login', { replace: true }); return; }
            if (currentPage >= totalPages) return;
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set('page', Math.min(totalPages, currentPage + 1));
              return params;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage >= totalPages}
          className={currentPage >= totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg hover:shadow-blue-300'}
        >
          Next
          <ArrowRight size={18} />
        </Button>
      </div>

      {/* Page input error toast */}
      {inputError && (
        <div className="fixed z-50 bottom-0 left-4 right-4 sm:left-auto sm:right-4 flex justify-center sm:block mb-16">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base max-w-xs sm:max-w-sm w-full sm:w-auto animate-fade-in-out flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{inputError}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadlinePage;