import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

const ArticleDetailpage = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeArticle = location.state;
  
  const [article, setArticle] = useState(routeArticle || null);
  const [loading, setLoading] = useState(!routeArticle);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If article data passed via routing, skip API call
    if (routeArticle) {
      setArticle(routeArticle);
      setLoading(false);
      return;
    }

    // Fetch article from API if not available from routing
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay for better loading state visualization
        // await new Promise((resolve) => setTimeout(resolve, 2000));
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
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-3xl bg-blue-100 rounded-2xl shadow-lg p-10 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );
}
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  //  Handle no article
  if (!article) {
    return <EmptyState />;
  }

  //  Handle missing data
  if (!article.title || !article.description) {
    return <EmptyState />;
  }

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
          {article.content}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetailpage;
