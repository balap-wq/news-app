import React from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import useArticle from '../hooks/useArticle';

const ArticleDetailPage = () => {
  const { id } = useParams();

  const { article, loading, error } = useArticle(id);

  // ✅ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-10 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-10">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  // ✅ Empty
  if (!article || !article.title || !article.description) {
    return <EmptyState />;
  }

  // ✅ Clean content
  const cleanContent = article.content?.replace(/\[\+\d+ chars\]/, "");

  // ✅ Success
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
          {article.title}
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
          {article.description}
        </p>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
          {cleanContent}
        </p>

        {/* ✅ Read Full Article Button */}
        <div className="mt-6 text-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read Full Article →
          </a>
        </div>

      </div>
    </div>
  );
};

export default ArticleDetailPage; 
