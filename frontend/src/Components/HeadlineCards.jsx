import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import placeholder from '../images/placeholder.png';
import { formatDate } from '../utils/date-formatter';
import { Book, CalendarClock, UserPen } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const HeadlineCards = ({ article }) => {
  const { title, urlToImage, sourceName, publishedAt, author } = article;
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayDate = formatDate(publishedAt);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const handleClick = () => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    navigate(`/article/${article.id}?page=${currentPage}`, {
      state: { article, page: currentPage },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto">
      <div
        data-testid="article-card"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className="h-full cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:scale-105"
      >
        <img
          src={urlToImage || placeholder}
          alt={title}
          className="w-full h-44 md:h-48 object-cover"
        />

        <div className="p-4 flex flex-col grow bg-gray-300">
          <h2 className="text-lg font-semibold line-clamp-2 leading-snug">{title}</h2>

          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <Book size={14} />
              <p className="truncate">Source: {sourceName}</p>
            </div>
            <div className="flex items-center gap-2">
              <UserPen size={14} />
              <p className="truncate">Author: {author || 'Unknown Author'}</p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock size={14} />
              <p>{displayDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadlineCards;