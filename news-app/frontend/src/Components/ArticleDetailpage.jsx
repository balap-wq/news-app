import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import EmptyState from './EmptyState';

const ArticleDetailpage = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeArticle = location.state;

  const [article, setArticle] = useState(routeArticle || null);
  const [loading, setLoading] = useState(!routeArticle);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (routeArticle) {
      setArticle(routeArticle);
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError('Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, routeArticle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <p className="text-lg text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!article) {
    return <EmptyState />;
  }

  if (!article.title || !article.description) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-3xl bg-amber-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
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
    </div>
  );
};

export default ArticleDetailpage;
