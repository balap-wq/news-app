import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import placeholder from '../images/placeholder.png';
import { formatDate } from '../utils/date-formatter';

export default function HeadlineCards({ article }) {
  const { title, urlToImage, sourceName, publishedAt, author } = article;
  const navigate = useNavigate();
  const displayDate = formatDate(publishedAt);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  return (
    <div className="mx-auto">
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          navigate(`/article/${article.id}?page=${currentPage}`, {
            state: {
              article,
              page: currentPage,
            },
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="cursor-pointer bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        <img
          src={urlToImage || placeholder}
          alt={title}
          className="w-full h-44 md:h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-2 leading-snug">{title}</h2>

          <div className="mt-3 text-sm text-gray-500 text-wrap">
            <p>Source: {sourceName}</p>
            <p className="h-6 text-wrap overflow-hidden">Author: {author || 'Unknown Author'}</p>
            <p>{displayDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
