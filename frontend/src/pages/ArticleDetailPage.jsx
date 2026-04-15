import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useArticle from '../hooks/useArticle';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import EmptyState from '../Components/EmptyState';
import ExternalLink from '../Components/ExternalLink';
import { formatDate } from '../utils/date-formatter';
import articleImagePlaceholder from '../images/article-image-placeholder.svg';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { article, loading, error } = useArticle(state ? null : id);

  const data = state || article;

  const [imgError, setImgError] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => navigate(-1)} />;
  if (!data) return <EmptyState />;

  const { title, urlToImage, content, description, author, publishedAt, url, sourceName } = data;

  const formattedDate = publishedAt ? formatDate(publishedAt) : null;

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-10 pb-16">
      <div
        className="max-w-3xl mx-auto bg-[#0b0b33] rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 2px 0 #2a2a4a, 0 4px 0 #1a1a2e, 0 30px 60px rgba(0,0,0,0.5)',
        }}
      >
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
          <div className="w-full h-48 bg-[#0f0f1a] flex flex-col items-center justify-center gap-2 text-stone-600">
            <img src={articleImagePlaceholder} alt="No image available" className="w-12 h-12" />
            <span className="text-sm">
              {urlToImage ? 'Image unavailable' : 'No image available'}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="px-5 sm:px-6 py-10">
          {/* Title */}
          <h1
            className="text-2xl sm:text-4xl font-bold text-[#f0efff] leading-tight mb-5"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 uppercase tracking-widest mb-8 pb-8 border-b border-[rgba(255,255,255,0.07)]">
            {author && (
              <span className="text-stone-400 font-medium normal-case tracking-normal text-sm">
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

          {/* Content */}
          {content && (
            <p className="text-base text-[#ceced8] leading-8 tracking-wide">
              {content.replace(/\s*\[\+\d+ chars\]$/, '')}
            </p>
          )}

          {/* External Link */}
          <div className="mt-8">
            <ExternalLink url={url} title={sourceName || 'Read Full Article'} />
          </div>
        </div>
      </div>
    </main>
  );
}
