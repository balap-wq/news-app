import React from 'react';

const HeadlineCardSkeleton = () => {
  return (
    <div className="flex justify-between rounded-xl shadow-md p-3 bg-blue-50 animate-pulse overflow-hidden">
      {/* Image Skeleton */}
      <div className="w-1/3">
        <div className="w-full h-40 bg-gray-300 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="w-2/3 mt-3 px-3">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

        <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default HeadlineCardSkeleton;
