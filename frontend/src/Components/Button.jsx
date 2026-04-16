import React from 'react';

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 mb-5 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2
       ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
