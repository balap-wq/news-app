import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const LIMIT = 9;

function useHeadlines({ page = 1, category, country }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHeadlines = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const offset = (page - 1) * LIMIT;

        const response = await axiosInstance.get('/api/headlines', {
          params: { limit: LIMIT, offset, category },
          signal: controller.signal,
        });

        setData(response.data.data || []);
        setTotalResults(response.data.totalResults || 0);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();

    return () => {
      controller.abort();
    };
  }, [page, category, country]);

  return { data, loading, error, totalResults };
}

export default useHeadlines;