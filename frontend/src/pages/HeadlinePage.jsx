import React, { useState } from 'react';
import HeadlineCards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';

const HeadlinePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data = [], loading, error, totalResults = 0 } = useHeadlines({
    page: currentPage,
    limit: pageSize,
  });

  // ✅ Prevent NaN issue
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setCurrentPage(1)}
      />
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="mx-auto w-full text-center mt-7">
        <h1 className="text-3xl font-bold">Top Headlines</h1>
      </div>

      <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? Array.from({ length: pageSize }).map((_, index) => (
              <HeadlineCardSkeleton key={index} />
            ))
          : data.length > 0
          ? data.map((article, index) => (
              // ✅ safer key fallback
              <HeadlineCards key={article.id || index} article={article} />
            ))
          : (
              <p className="text-center col-span-full">No articles found</p>
            )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6 pb-10">
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

          <span className="flex items-center px-3 font-medium">
            Page {currentPage} of {totalPages}
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
        </div>
      )}
    </div>
  );
};

export default HeadlinePage;