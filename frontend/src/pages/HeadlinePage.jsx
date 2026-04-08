import React, { useState } from 'react';
import Headlinecards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';

const HeadlinePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;

  const { data, loading, error, totalResults } = useHeadlines({
    page: currentPage,
    limit: pageSize,
  });

  const totalPages = Math.ceil(totalResults / pageSize);

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="bg-blue-50">
      <div className="mx-auto w-full text-center mt-7">
        <h1 className="text-3xl font-bold">Top Headlines</h1>
      </div>

      <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? Array.from({ length: pageSize }).map((_, index) => <HeadlineCardSkeleton key={index} />)
          : data?.map((article) => <Headlinecards key={article.id} article={article} />)}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => {
            setCurrentPage((p) => p - 1);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={18} />
          Prev
        </Button>
        <span className="px-4 py-2 mb-5 font-semibold text-lg">
          {currentPage} of {totalPages || '...'}
        </span>
        <Button
          onClick={() => {
            setCurrentPage((p) => p + 1);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage >= totalPages}
        >
          Next
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default HeadlinePage;
