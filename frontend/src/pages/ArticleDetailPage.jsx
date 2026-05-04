import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useArticle from '../hooks/useArticle';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import EmptyState from '../Components/EmptyState';
import ExternalLink from '../Components/ExternalLink';
import Button from '../Components/Button';
import { formatDate } from '../utils/date-formatter';
import { stripNewsSuffix } from '../utils/string-formatter';
import articleImagePlaceholder from '../images/article-image-placeholder.svg';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  // Preserve page number for back navigation
  const page = state?.page || new URLSearchParams(location.search).get('page') || 1;

  // Skip fetching if article data already passed via navigation state
  const { article, loading, error, refetch } = useArticle(state?.article ? null : id);

  // state.article comes from HeadlineCard navigation
  const data = state?.article || article;

  const [imgError, setImgError] = useState(false);

  const { title, urlToImage, content, description, author, publishedAt, url, sourceName } =
    data || {};

  const formattedDate = publishedAt ? formatDate(publishedAt) : null;

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-10 pb-16 px-4">
      {/* Back to Headlines Button */}
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => navigate(`/headlines?page=${page}`)}
          className="mb-4 mt-4 relative h-12 overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
        >
          <ArrowLeft size={18} />
          Back to Headlines
        </Button>
      </div>

      {/* Content container — fixed size to avoid layout shift */}
      <div
        className="max-w-3xl mx-auto bg-[#2f2f31] rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 2px 0 #2a2a4a, 0 4px 0 #1a1a2e, 0 30px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Loading State */}
        {loading && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <ErrorMessage
              message={error}
              onRetry={() => {
                refetch();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !data && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <EmptyState />
          </div>
        )}

        {/* Main Article Content */}
        {!loading && !error && data && (
          <>
            {/* Image Section */}
            {urlToImage && !imgError ? (
              <div className="w-full h-64 sm:h-80 overflow-hidden">
                <img
                  src={urlToImage}
                  alt={title || 'Article image'}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-[#c3c3db] flex flex-col items-center justify-center gap-2 text-stone-600">
                <img src={articleImagePlaceholder} alt="No image available" className="w-12 h-12" />
                <span className="text-sm">
                  {urlToImage ? 'Image unavailable' : 'No image available'}
                </span>
              </div>
            )}

            {/* Article Body */}
            <div className="px-5 sm:px-6 py-10">
              {/* Title */}
              <h1
                data-testid="article-title"
                className="text-2xl sm:text-4xl font-bold text-[#f0efff] leading-tight mb-5"
                style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
              >
                {title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-200 uppercase tracking-widest mb-8 pb-8 border-b border-[rgba(255,255,255,0.07)]">
                {sourceName && (
                  <span className="text-stone-200 font-medium normal-case tracking-normal text-sm">
                    {sourceName}
                  </span>
                )}
                {sourceName && (author || formattedDate) && <span>·</span>}
                {author && (
                  <span className="text-stone-200 font-medium normal-case tracking-normal text-sm">
                    By {author}
                  </span>
                )}
                {author && formattedDate && <span>·</span>}
                {formattedDate && <time dateTime={publishedAt}>{formattedDate}</time>}
              </div>

              {/* Description */}
              {description && (
                <p
                  className="text-xl text-[#c5c4e0] mb-6 leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {description}
                </p>
              )}

              {/* Content — strips NewsAPI "[+2847 chars]" truncation suffix */}
              {content ? (
                <p
                  data-testid="article-content"
                  className="text-base text-[#ceced8] leading-8 tracking-wide"
                >
                  {stripNewsSuffix(content)}
                </p>
              ) : (
                // Fallback: show description as content if content is null
                <p
                  data-testid="article-content"
                  className="text-base text-[#ceced8] leading-8 tracking-wide"
                >
                  {description}
                </p>
              )}

              {/* External Link */}
              <div className="mt-8">
                <ExternalLink url={url} title="Read Full Article" />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
