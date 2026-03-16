import React, { useState } from 'react'
import Headlinecards from '../Components/Headlinecards'
import useHeadlines from '../hooks/useHeadlines';

const HeadlinePage = () => {

  const [currentPage,setCurrentPage] = useState(1);

  const {data, loading, error, totalResults} = useHeadlines({
    page:currentPage
});

  const pageSize = 9;
  const totalPages = Math.ceil(totalResults / pageSize); 

  return (
    <div>
    <div className="mx-auto w-full text-center mt-7">
        <h1 className='text-3xl font-bold'>Top Headlines</h1>
    </div>

    {loading && <p className='text-center text-blue-300 mt-4'>Loading....</p>}
    {error && <p className='text-center text-red-500'>{error}</p>}
    <Headlinecards/>

    <div className='flex justify-center gap-4 mt-6'>
      <button onClick={()=>{
        setCurrentPage(p => p-1);
        window.scrollTo(0,0);
      }}
      disabled={currentPage === 1}>
        Prev
      </button>
      <span>{currentPage}</span>
      <button
      onClick={()=>{
        setCurrentPage(p => p+1)
        window.scrollTo(0,0);
      }}
      disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>

    </div>
  )
}

export default HeadlinePage
