import React from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../Components/EmptyState';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import useArticle from '../hooks/useArticle';

const ArticleDetailPage = () => {
  const { id } = useParams();

  const { article, loading, error } = useArticle(id);

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-10 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-10">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

 
  if (!article || !article.title || !article.description) {
    return <EmptyState />;
  }

 
  const cleanContent = article.content?.replace(/\[\+\d+ chars\]/, "");

 
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
