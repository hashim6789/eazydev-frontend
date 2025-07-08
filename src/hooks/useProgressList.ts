import { useState, useEffect } from "react";
import { api } from "../configs";
import { getAxiosErrorMessage, showErrorToast } from "../utils";
import { PaginatedData, ProgressLearning } from "../types";
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
        const response = await api.get<PaginatedData<ProgressLearning>>(
          `/progresses?page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;

        if (result && result.body) {
          setData(result.body);
          setTotalPages(result.last_page || 1);
        } else {
          setData([]);
        }
      } catch (error: unknown) {
        setError(getAxiosErrorMessage(error, ProgressMessages.ERROR.FETCH));
        showErrorToast(ProgressMessages.ERROR.FETCH);
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
