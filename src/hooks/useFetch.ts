import { useState, useEffect } from "react";
import { api } from "../configs";
import { getAxiosErrorMessage } from "../utils";

const useFetch = <T>(url: string | null, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error message

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!url) return;

      try {
        const response = await api.get(url);

        if (!response.data) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const jsonData = response.data;
        setData(jsonData);
      } catch (err: unknown) {
        const message = getAxiosErrorMessage(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Dependencies for re-fetching when `url` or `options` change

  return { data, setData, loading, error };
};

export default useFetch;
