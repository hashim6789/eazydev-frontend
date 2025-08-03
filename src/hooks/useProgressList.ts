import { useState, useEffect } from "react";
import { getAxiosErrorMessage, showErrorToast } from "../utils";
import { ProgressLearning } from "../types";
import { getProgressList } from "../services/progress.service";
import { ProgressMessages } from "../constants";

interface UseProgressListOptions {
  itemsPerPage: number;
}

const useProgressList = ({ itemsPerPage }: UseProgressListOptions) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ProgressLearning[]>([]);
  const [loading, setLoading] = useState(true); // Default to true for initial loading
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgressList = async () => {
      setLoading(true);
      try {
        const data = await getProgressList(currentPage, itemsPerPage);
        const result = data;

        if (result && result.body) {
          setData(result.body);
          setTotalPages(result.last_page || 1);
        } else {
          setData([]);
        }
      } catch (error: unknown) {
        const message = getAxiosErrorMessage(
          error,
          ProgressMessages.ERROR.FETCH
        );
        setError(message);
        showErrorToast(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressList();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    data,
    totalPages,
    loading,
    error,
    handlePageChange,
  };
};

export default useProgressList;
