import { useState, useEffect } from "react";

const apiGetUrl = process.env.REACT_APP_GET_ALL;

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = () =>
      fetch(apiGetUrl)
        .then((r) => r.json())
        .then((js) => setData(js))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  return { data, loading, error };
};

export default useFetch;
