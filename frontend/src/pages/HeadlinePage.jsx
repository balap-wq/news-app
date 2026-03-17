import React, { useState } from 'react'
import Headlinecards from '../Components/Headlinecards'
import useHeadlines from '../hooks/useHeadlines';
import {ArrowRight ,ArrowLeft} from 'lucide-react'

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
    
    <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((article) => (
          <Headlinecards
            key={article.id}
            title={article.title}
            source={article.sourceName}
            publishedAt={article.publishedAt}
            urlToImage={article.urlToImage}
            article={article}
          />
        ))}
      </div>

    <div className='flex justify-center gap-4 mt-6'>
      <button onClick={()=>{
        setCurrentPage(p => p-1);
        window.scrollTo(0,0);
      }}
      disabled={currentPage === 1}
      className={`flex items-center gap-2 px-5 py-2 mb-5 rounded-lg font-medium transition duration-200 
      ${currentPage === 1
        ?"bg-gray-300 text-gray-500 cursor-not-allowed"
        :"bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg"}`}>
          <ArrowLeft size={18}/>
        Prev
      </button>

      <span className='px-4 py-2 mb-5 font-semibold text-lg'>{currentPage}</span>

      <button
      onClick={()=>{
        setCurrentPage(p => p+1)
        window.scrollTo(0,0);
      }}
      disabled={currentPage >= totalPages}
      className={`flex items-center gap-2 px-5 py-2 mb-5 rounded-lg font-medium transition duration-200
      ${currentPage >= totalPages
      ?'bg-gray-300 text-gray-500 cursor-not-allowed'
      :'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg'}`}>
        Next
        <ArrowRight size={18}/>
      </button>

    </div>

    </div>
  );
};

export default HeadlinePage