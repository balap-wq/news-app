import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholder from '../images/placeholder.png';

function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function HeadlineCards({ article }) {
  const { title, urlToImage, sourceName, publishedAt, author } = article;

  const navigate = useNavigate();
  const displayDate = formatDate(publishedAt);

  const handleNavigate = () =>
    navigate(`/article/${article.id}`, { state: article });

  return (
    <div
      key={article.id}              
      className="mx-auto"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleNavigate();
        }}
        className="cursor-pointer bg-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        <img
          src={urlToImage || placeholder}
          alt={title || 'Article image'}
          className="w-full sm:h-44 md:h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-2 leading-snug">
            {title}
          </h2>

          <div className="mt-3 text-sm text-gray-500">
            <p>Source: {sourceName}</p>
            {author && (
              <p className="h-6 overflow-hidden">Author: {author}</p>
            )}
            <p>{displayDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}