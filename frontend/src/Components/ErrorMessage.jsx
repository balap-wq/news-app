import React from 'react';
import { BadgeAlert } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center  space-y-2 " >
      <div className="text-red-500 text-4xl py-5">
        <BadgeAlert size={50}/>
      </div>

     <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>

      <p className="text-gray-600 max-w-md">
        {message || 'We couldn’t load the article. Please try again.'}
      </p>

      {onRetry && (
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition hover:cursor-pointer flex items-center gap-2"
        >
          <RotateCcw size={20}/>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
