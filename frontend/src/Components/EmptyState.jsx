import React from 'react';

const EmptyState = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-5xl mb-4">📰</div>

      <p className="text-gray-600 text-lg text-center">
        No headlines available right now. Try again later.
      </p>

      <button onClick={onRefresh} className="mt-4 px-4 py-2 border rounded hover:bg-gray-100">
        Refresh
      </button>
    </div>
  );
};

export default EmptyState;
