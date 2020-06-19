import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Context/ApiContext";
const apiGetUrl = process.env.REACT_APP_GET_ALL;

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const savedData = useContext(ApiContext);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      await fetch(apiGetUrl)
        .then((r) => r.json())
        .then((js) => setData(js))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
      savedData.data = data;
      savedData.shouldUpdate = false;
    }
    if (savedData.shouldUpdate) {
      console.log("updating context.");
      fetchData();
      return () => {
        abortController.abort();
      };
    } else {
      console.log("using context to populate state.");
      setData(savedData.data);
      setLoading(false);
    }
  }, [data, savedData]);
  return { data, loading, error };
};

export default useFetch;
