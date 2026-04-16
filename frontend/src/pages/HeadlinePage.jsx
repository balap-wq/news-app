import React, { useEffect, useState } from 'react';
import HeadlineCards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import EmptyState from '../Components/EmptyState';

const HeadlinePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputError, setInputError] = useState('');
  const [pageInput, setPageInput] = useState('');

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

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => {
        setInputError('');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [inputError]);

  const handlePage = (e) => {
  if (e.key === 'Enter') {
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
      <ErrorMessage
        message={error}
        onRetry={() => {
          refetch();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }
  //onRetry={() => setSearchParams({ page: currentPage })}

  return (
    <div>
      <div className="mx-auto w-full text-center mt-7 flex items-center justify-center gap-2">
        <TrendingUp size={40} />
        <h1 className="relative text-3xl font-bold group">Top Headlines<span className="absolute left-1/4 top-10 h-1 w-15 bg-yellow-400 transition-all duration-300  group-hover:w-full group-hover:left-0"></span>
</h1>
      </div>

      {!loading && !error && data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <HeadlineCardSkeleton key={`skeleton-${index}`} />
              ))
            : data.map((article) => <HeadlineCards key={article.id} article={article} />)}
        </div>
      )}

      <div className="flex justify-center gap-2 md:gap-4 mt-1 md:mt-6">
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

          <span className="flex items-center px-1  font-medium pb-5">
            <input
              type="text"
              className="w-5 md:w-7 text-center border-none rounded outline-none focus:ring-2 focus:ring-blue-400"
              value={pageInput}
              onChange={(e) => {
                setPageInput(e.target.value);
                setInputError('');
              }}
              onKeyDown={handlePage}
              
              min={1}
              max={totalPages}
            />
            of {totalPages}
          </span>

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
