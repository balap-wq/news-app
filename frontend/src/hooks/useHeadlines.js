import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function useHeadlines({ page = 1, category, country, limit = 9 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHeadlines = async () => {
      setError(null);
      setLoading(true);

      try {
        const params = { page, limit };
        if (category) params.category = category;
        if (country) params.country = country;

        console.log('Fetching headlines with params:', params);

        const response = await axiosInstance.get('/api/headlines', {
          params,
          signal: controller.signal,
        });

        console.log('API Response:', response.data);

        setData(response.data.articles || []);
        setTotalResults(response.data.totalResults || 0);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error('Fetch error:', err.message);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHeadlines();

    return () => controller.abort();
  }, [page, category, country, limit, refreshKey]);

  const refetch = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return { data, loading, error, totalResults, refetch };
}

export default useHeadlines;
