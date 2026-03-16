import React from "react";

const HeadlineCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">

      {/* Image Placeholder */}
      <div className="bg-gray-400 h-40 w-full rounded mb-4"></div>

      {/* Title Placeholder */}
      <div className="bg-gray-400 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-400 h-4 w-1/2 mb-4 rounded"></div>

      {/* Source + Date */}
      <div className="flex justify-between">
        <div className="bg-gray-400 h-3 w-20 rounded"></div>
        <div className="bg-gray-400 h-3 w-16 rounded"></div>
      </div>

    </div>

  );  
};


export default HeadlineCardSkeleton;