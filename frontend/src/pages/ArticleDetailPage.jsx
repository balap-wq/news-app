import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmptyState from '../Components/EmptyState';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import useArticle from '../hooks/useArticle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../Components/Button';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { article, loading, error } = useArticle(id);

  const cleanContent = article?.content?.replace(/\[\+\d+ chars\]/, '');

  return (
    <div className="min-h-screen bg-blue-50 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back to Headlines
        </Button>
      </div>

      {/* ✅ Content container (same size → no layout shift) */}
      <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 min-h-[50vh] flex items-center justify-center">
        {loading && <LoadingSpinner />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && (!article || !article.title) && <EmptyState />}

        {!loading && !error && article && article.title && (
          <div className="w-full">
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
                className="inline-flex bg-blue-600 text-white px-6 py-2 items-center gap-2 rounded-lg"
              >
                Read Full Article <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
