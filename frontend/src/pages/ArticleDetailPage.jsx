import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useArticle from '../hooks/useArticle';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import EmptyState from '../Components/EmptyState';

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

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { article, loading, error } = useArticle(state ? null : id);

  const data = state || article;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => navigate(-1)} />;
  if (!data) return <EmptyState />;

  const { title, urlToImage, content, description, author, publishedAt, url, sourceName } = data;

  return (
    <main className=" bg-blue-50">
      {/* hero image */}
      {urlToImage ? (
        <div className="w-full  h-80  sm:h-96 overflow-hidden mt-4 ">
          <img
            src={urlToImage}
            alt={title ? `Hero image for: ${title}` : 'Article hero image'}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full bg-gray-100 items-center justify-center flex-col gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Image unavailable</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-72 sm:h-80 mt-4 bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">No image available</span>
        </div>
      )}

      {/* article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-15 py-8">
        {/* title */}
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">{title}</h1>

        {/* metadata row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
          {sourceName && <span className="font-medium text-gray-700">{sourceName}</span>}
          {sourceName && (author || publishedAt) && <span aria-hidden="true">·</span>}
          {author && <span>By {author}</span>}
          {author && publishedAt && <span aria-hidden="true">·</span>}
          {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
        </div>

        {/* description */}
        {description && (
          <p className="text-lg leading-relaxed text-gray-700 mb-4 font-medium">{description}</p>
        )}

        {/* content */}
        {content && (
          <p className="text-lg leading-relaxed text-gray-800">
            {content.replace(/\s*\[\+\d+ chars\]$/, '')}
          </p>
        )}

        {/* external link */}
        {url && (
          <div className="mt-8">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Read full article{sourceName ? ` on ${sourceName}` : ''}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
