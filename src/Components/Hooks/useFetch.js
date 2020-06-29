import { useState, useEffect, useContext, useRef } from "react";
import { ApiContext } from "../Context/ApiContext";
const apiGetUrl = process.env.REACT_APP_GET_ALL;

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const savedData = useContext(ApiContext);
  const ref = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      await fetch(apiGetUrl, { signal: abortController.signal })
        .then((r) => r.json())
        .then((jsonResponse) => {
          setData(jsonResponse);
          savedData.data = jsonResponse;
          savedData.shouldUpdate = false;
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
    if (!ref.current) {
      // in case component is dismounted
      return undefined;
    }
    else if (savedData.shouldUpdate) {
      fetchData();
    } else {
      setData(savedData.data);
      setLoading(false);
    }
    return () => {
      abortController.abort();
      ref.current = false;
    };
  }, [data, savedData]);
  return { data, loading, error };
};

export default useFetch;
