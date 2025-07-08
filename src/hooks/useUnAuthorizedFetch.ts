import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../configs";
import { getAxiosErrorMessage } from "../utils";
import { ResponseErrorMessages } from "../constants";

const useUnAuthorizedFetch = <T>(url: string | null, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error message

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!url) {
          return { data: null, loading: false, error: null };
        }
        const response = await axios.get<T>(`${config.API_BASE_URL + url}`);

        if (!response.data) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const jsonData = response.data;
        console.log("data:", jsonData);
        setData(jsonData);
      } catch (error: unknown) {
        setError(
          getAxiosErrorMessage(error, ResponseErrorMessages.ERROR.WENT_WRONG)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Dependencies for re-fetching when `url` or `options` change

  return { data, loading, error };
};

export default useUnAuthorizedFetch;
