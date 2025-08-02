import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../configs";
import { getAxiosErrorMessage } from "../utils";

const useUnAuthorizedFetch = <T>(url: string | null, options?: RequestInit) => {
  if (!url) {
    return { data: null, loading: false, error: null };
  }
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error message

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(`${config.API_BASE_URL + url}`);

        if (!response.data) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const jsonData = response.data;
        console.log("data:", jsonData);
        setData(jsonData);
      } catch (err: unknown) {
        const message = getAxiosErrorMessage(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useUnAuthorizedFetch;
