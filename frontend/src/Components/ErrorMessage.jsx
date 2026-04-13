import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
      <div className="text-red-500 text-4xl py-5">❌</div>

      <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>

      <p className="text-gray-600 max-w-md">
        {message || 'We couldn’t load the article. Please try again.'}
      </p>

      {onRetry && (
        <button
          onClick={()=> window.location.reload()}
          className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
