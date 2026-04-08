import React, { useEffect, useState } from 'react';
import Headlinecards from '../Components/HeadlineCards';
import useHeadlines from '../hooks/useHeadlines';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../Components/Button';
import HeadlineCardSkeleton from '../Components/HeadlineCardSkeleton';
import ErrorMessage from '../Components/ErrorMessage';
import { useSearchParams } from 'react-router-dom';

const HeadlinePage = () => {
 
  const [searchParams,setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(()=>{
    setCurrentPage(pageFromUrl);
  },[pageFromUrl])

  const { data, loading, error, totalResults } = useHeadlines({
    page: currentPage,
    limit: 9, // ✅ set limit to 9 for pagination
  });

  const pageSize = 9;
  const totalPages = Math.ceil(totalResults / pageSize);

  if(error) {
    return(
      <ErrorMessage
      message={error}
      onRetry={()=> window.location.reload ()}
      />
    )
  }

  return (
    <div className=''>
      <div className="mx-auto w-full text-center mt-7">
        <h1 className="text-3xl font-bold">Top Headlines</h1>
      </div>

      <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => <HeadlineCardSkeleton key={index} />)
          : data?.map((article) => <Headlinecards key={article.id} article={article} currentPage={currentPage}/>)}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => {
            const prevPage = currentPage -1;
            setSearchParams({page:prevPage});
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={18} />
          Prev
        </Button>
        <span className="px-4 py-2 mb-5 font-semibold text-lg">{currentPage}</span>

        <Button
          onClick={() => {
            const nextPage = currentPage +1;
            setSearchParams({page:nextPage});
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
