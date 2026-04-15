import React from 'react';

export default function ExternalLink({ url, title }) {
  if (!url) return null;

  const displaySource = title || '';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-200"
      style={{
        background: 'linear-gradient(135deg, #6358d2, #4a3fa8)',
        boxShadow: '0 4px 0 #2e2880, 0 8px 20px rgba(99,88,210,0.4)',
      }}
    >
      Read full article{displaySource ? ` on ${displaySource}` : ''}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
      </svg>
    </a>
  );
}