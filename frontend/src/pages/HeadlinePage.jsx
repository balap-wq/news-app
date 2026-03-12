import React from 'react'
import HeadlineCard from '../Components/Headlinecards'

const HeadlinePage = () => {
  return (
    <div>
    <div className="mx-auto w-full text-center mt-7">
        <h1 className='text-3xl font-bold'>Top Headlines</h1>
    </div>
    <HeadlineCard/>
    </div>
  )
}

export default HeadlinePage;
