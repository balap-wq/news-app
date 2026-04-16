import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/api/articles/${id}`, {
          signal: controller.signal,
        });

        setArticle(response.data);
      } catch (err) {
        if (err.code === 'ERR_CANCELED') return;

        if (err.response?.status === 404) {
          setError('Article not found');
        } else {
          setError(err.message || 'Unable to fetch article');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      controller.abort();
    };
  }, [id, refreshKey]);

  const refetch = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return { article, loading, error, refetch };
}

export default useArticle;
