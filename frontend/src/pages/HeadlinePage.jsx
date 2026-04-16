import React from 'react';
import Headlinecards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import EmptyState from '../Components/EmptyState';

const HeadlinePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Single source of truth
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const pageSize = 9;

  const {
    data = [],
    loading,
    error,
    totalResults = 0,
    refetch,
  } = useHeadlines({
    page: currentPage,
    limit: pageSize,
  });

  const totalPages = totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1;

  if (error) {
    return (
      <div className='bg-stone-900 container mx-auto w-90 h-80 md:w-140 mt-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center px-4  py-20'>
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
  //onRetry={() => setSearchParams({ page: currentPage })}

  return (
    <div>
      <div className="mx-auto w-full text-center mt-7 flex items-center justify-center gap-2">
        <TrendingUp size={40} />
        <h1 className="text-3xl font-bold">Top Headlines</h1>
      </div>

      {!loading && !error && data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <HeadlineCardSkeleton key={`skeleton-${index}`} />
              ))
            : data.map((article) => <Headlinecards key={article.id} article={article} />)}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <Button
          aria-label="Previous page"
          onClick={() => {
            if (currentPage === 1) return;
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set('page', Math.max(1, currentPage - 1));
              return params;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage === 1}
          className={
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg hover:shadow-blue-300'
          }
        >
          <ArrowLeft size={18} />
          Prev
        </Button>

        <span className="px-4 py-2 mb-5 font-semibold text-lg">{currentPage}</span>

        <Button
          aria-label="Next page"
          onClick={() => {
            if (currentPage >= totalPages) return;
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set('page', Math.min(totalPages, currentPage + 1));
              return params;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage >= totalPages}
          className={
            currentPage >= totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg hover:shadow-blue-300'
          }
        >
          Next
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default HeadlinePage;
