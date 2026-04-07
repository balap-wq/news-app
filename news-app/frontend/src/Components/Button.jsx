import React from 'react';

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 mb-5 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2
        ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg'
        } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
