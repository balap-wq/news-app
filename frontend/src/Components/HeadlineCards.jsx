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

export default function Headlinecards({ article, currentPage }) {
  const { title, urlToImage, sourceName, publishedAt, author } = article;
  const navigate = useNavigate();
  const displayDate = formatDate(publishedAt);

  return (
    <div key={article.id} className="mx-auto">
      <div
        role="button"
        tabIndex={0}
        key={article.id}
        onClick={() =>
          navigate(`/article/${article.id}?page=${currentPage}`, {
            state: {
              article,
              page: currentPage,
            },
          })
        }
        className="cursor-pointer bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        <img
          src={urlToImage || placeholder}
          alt={title}
          className="w-full h-44 md:h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-2 leading-snug">{title}</h2>

          <div className="mt-3 text-sm text-gray-500 text-wrap ">
            <p className="">Source: {sourceName}</p>
            <p className="h-6 text-wrap overflow-hidden">Author: {author || 'Unknown Author'}</p>
            <p>{displayDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
