import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

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
        // Calculate limit and offset from page number
        const itemsPerPage = 9;
        const limit = itemsPerPage;
        const offset = (page - 1) * itemsPerPage;
// “Axios instance is used to centralize API configuration like base URL and headers, avoiding repetition and making the code cleaner and easier to maintain.”
        const response = await axiosInstance.get('/api/headlines', { 
          params: { limit, offset, category },
          signal: controller.signal,
        });

        setData(response.data.articles || []);
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
  }, [page, category]);

  return { data, loading, error, totalResults };
}

export default useHeadlines;
