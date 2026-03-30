import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholder from '../images/placeholder.png';

export default function Headlinecards({ article }) {
  const { title, url_to_image, source_name, published_at,author } = article;
  const navigate = useNavigate();

  return (
    <div className="mx-auto">
      <div
        role="button"
        tabIndex={0}
        key={article.id}
        onClick={() => navigate(`/article/${article.id}`, { state: article })}
        className="cursor-pointer bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        {/* Image */}
        <img
          src={url_to_image || placeholder}
          alt={title}
          className="w-full h-48 sm:h-44 md:h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <h2 className="text-base sm:text-lg font-semibold line-clamp-2 leading-snug">{title}</h2>

          <div className="mt-3 text-sm text-gray-500">
            <p className="truncate">Source: {source_name}</p>
             <p className="truncate">Author: {author}</p>
            <p>{published_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
