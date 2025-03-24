import { useState, useEffect } from "react";
import { Lesson } from "../types/lesson";
import { api } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import { showDeletionConfirmationBox } from "../utils/confirm-box.utils";

interface UseLessonTableFunctionalityOptions {
  itemsPerPage: number;
}

export function useLessonTable({
  itemsPerPage,
}: UseLessonTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/lessons?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        console.log(result);
        setData(result.data);
        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDelete = async (lessonId: string) => {
    const isConfirmed = await showDeletionConfirmationBox(
      "lesson",
      "delete",
      true
    );

    if (isConfirmed) {
      try {
        await api.delete(`/api/lessons/${lessonId}`);
        showSuccessToast("The lesson was deleted successfully!");

        // Remove the deleted lesson from the state
        setData((prevLessons) =>
          prevLessons.filter((lesson) => lesson.id !== lessonId)
        );

        // Adjust the current page if necessary
        if (data.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      } catch (error: any) {
        showErrorToast(error.message);
      }
    }
  };

  return {
    currentPage,
    searchQuery,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleDelete,
  };
}
