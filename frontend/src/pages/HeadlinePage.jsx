import React, { useEffect, useState } from 'react';
import HeadlineCards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';

const HeadlinePage = () => {
  const [inputError, setInputError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const pageSize = 9;

  const {
    data = [],
    loading,
    error,
    totalResults = 0,
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
        setInputError(`Enter a valid page ( 1 - ${totalPages} )`);
        return;
      }
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ✅ Prevent NaN issue
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1;

  if (error) {
    return <ErrorMessage message={error} onRetry={() => setCurrentPage(1)} />;
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="sticky top-25 md:top-20 z-40 backdrop-blur-md bg-white/70 ">
        <div className="mx-auto w-full text-center py-4">
          <h1 className="text-3xl font-bold inline-block border-b-3 border-amber-300">
            Top Headlines
          </h1>
        </div>
      </div>

      <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: pageSize }).map((_, index) => <HeadlineCardSkeleton key={index} />)
        ) : data.length > 0 ? (
          data.map((article, index) => (
            // ✅ safer key fallback
            <HeadlineCards key={article.id || index} article={article} />
          ))
        ) : (
          <p className="text-center col-span-full">No articles found</p>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center md:gap-4 mt-6 pb-10">
          <Button
            onClick={() => {
              setCurrentPage((p) => Math.max(p - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={18} />
            Prev
          </Button>

          <span className="flex items-center px-3 font-medium pb-5">
            <input
              type="text"
              className="w-7 text-center border-none rounded outline-none focus:ring-2 focus:ring-blue-400"
              value={pageInput}
              onChange={(e) => {
                setPageInput(e.target.value);
                setInputError('');
              }}
              onKeyDown={handlePage}
              min={1}
              max={totalPages}
            />{' '}
            of {totalPages}
          </span>

          <Button
            onClick={() => {
              setCurrentPage((p) => Math.min(p + 1, totalPages));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage >= totalPages}
          >
            Next
            <ArrowRight size={18} />
          </Button>
          {inputError && (
            <div className="flex gap-2 items-center fixed bottom-3  bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
              <AlertCircle size={16} /> {inputError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeadlinePage;
