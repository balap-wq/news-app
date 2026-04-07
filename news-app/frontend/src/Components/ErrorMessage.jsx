import React from 'react';
import useHeadlines from '../hooks/useHeadlines';

function ErrorMessage({ onRetry }) {
  const { error } = useHeadlines();
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-red-500 text-4xl mb-4">❌</div>

      <p className="text-lg text-gray-700 mb-4">
        {error || 'An unexpected error occurred. Please try again.'}
      </p>

      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
