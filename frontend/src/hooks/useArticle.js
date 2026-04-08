import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      setArticle(null); // optional: clear old data

      try {
        const response = await axiosInstance.get(`/api/articles/${id}`, {
          signal: controller.signal,
        });

        
        setArticle(response.data);

      } catch (err) {
        if (err.name === 'CanceledError') return;

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
  }, [id]);

  return { article, loading, error };
}

export default useArticle;