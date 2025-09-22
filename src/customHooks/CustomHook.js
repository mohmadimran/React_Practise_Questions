import { useEffect, useState } from "react";

export const useCustomHook = (url) => {
  const [data, setData] = useState([]); // ✅ start with empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const getResponse = await response.json();
        setData(getResponse);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false); // ✅ don't overwrite data
      }
    };

    callApi();
  }, [url]);

  return { data, loading, error };
};
