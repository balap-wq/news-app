import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { ArrowLeft } from 'lucide-react';
import Button from '../Components/Button';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.state?.page || 1;
  const routeArticle = location.state?.article;

  const [article, setArticle] = useState(routeArticle || null);
  const [loading, setLoading] = useState(!routeArticle);
  const [error, setError] = useState(null);

  // ✅ Reusable fetch function
  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.get(`/api/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      setError('Failed to load article');
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount
  useEffect(() => {
    fetchArticle(); // ALWAYS fetch
  }, [id]);


  return (
    <div className="min-h-screen bg-blue-100 px-4">

      {/* ✅ Back Button (ALWAYS visible) */}
      <div className="max-w-3xl mx-auto pt-6 pb-2">
        <Button
          onClick={() => {
            navigate(`/headlines?page=${page}`);
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 text-blue-600 hover:text-gray-200"
        >
          <ArrowLeft size={18} />
          Back to Headlines
        </Button>
      </div>

      {/* ✅ Content Area */}
      <div className="flex items-center justify-center mt-4">

        {loading ? (
          <div className="w-full max-w-3xl bg-blue-50 rounded-2xl shadow-lg p-10 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="w-full max-w-3xl bg-blue-50 rounded-2xl shadow-lg p-10">
            <ErrorMessage message={error} onRetry={fetchArticle} />
          </div>
        ) : !article || !article.title || !article.description ? (
          <EmptyState />
        ) : (
          <div className="w-full max-w-3xl bg-blue-50 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
              {article.title}
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              {article.description}
            </p>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              {article.content}
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default ArticleDetailPage;