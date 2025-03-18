import { useState, useMemo, useCallback, useEffect } from "react";
import { Category } from "../types";
import { api } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import { CategoryMessages } from "../constants/category.constant";

interface TableFunctionalityOptions {
  itemsPerPage: number;
}

export function useCategoryTable({ itemsPerPage }: TableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "listed" | "unlisted"
  >("all");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setCategoryData([]);
        const response = await api.get(
          `/api/categories?&status=${filterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;

        setCategoryData(result.body);
        setTotalPages(result.last_page);
      } catch (error) {
        console.error(CategoryMessages.ERROR.FETCH, error);
        showErrorToast(CategoryMessages.ERROR.FETCH);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [filterStatus, searchQuery, currentPage, itemsPerPage]);

  const filteredData = useMemo(() => {
    return categoryData.filter((item) => {
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesSearch = String(item.status)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [categoryData, filterStatus, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (status: "all" | "listed" | "unlisted") => {
      setFilterStatus(status);
      setCurrentPage(1);
    },
    []
  );

  const handleToggleStatus = async (
    itemId: string,
    status: "listed" | "unlisted"
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${
        status === "listed" ? "unlist" : "list"
      } this category?`
    );

    if (!confirmed) return;

    setIsLoading(true);
    const change = status === "unlisted";

    try {
      const response = await api.patch(
        `/api/categories/${itemId}/list-unlist`,
        { change }
      );

      if (response && response.data) {
        const updatedItem: Category = response.data.data as Category;

        const updatedData = categoryData.map<Category>((item) =>
          item.id === itemId
            ? {
                ...item,
                status: updatedItem.isListed ? "listed" : "unlisted",
                isListed: updatedItem.isListed,
              }
            : item
        );
        setCategoryData(updatedData);
        showSuccessToast(CategoryMessages.SUCCESS.TOGGLE);
      }
    } catch (error) {
      console.error(CategoryMessages.ERROR.TOGGLE, error);
      showErrorToast(CategoryMessages.ERROR.TOGGLE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTitle = (categoryId: string) => {
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setIsCreating(true);
  };

  const handleSaveTitle = async (categoryId: string, newTitle: string) => {
    console.log("Updating category title: ", newTitle, categoryId);

    try {
      const response = await api.put(`/api/categories/${categoryId}`, {
        title: newTitle,
      });

      if (response && response.data) {
        const updatedItem: Category = response.data.data as Category;

        const updatedData = categoryData.map<Category>((item) =>
          item.id === categoryId ? { ...item, title: updatedItem.title } : item
        );

        setCategoryData(updatedData);
        setIsEditModalOpen(false);
        showSuccessToast(CategoryMessages.SUCCESS.UPDATE);
      }
    } catch (error: any) {
      console.error(CategoryMessages.ERROR.UPDATE, error);
      showErrorToast(CategoryMessages.ERROR.UPDATE);
    }
  };

  const saveNewCategory = async (newTitle: string) => {
    try {
      const response = await api.post(`/api/categories`, {
        title: newTitle,
        isListed: true,
      });

      if (response && response.data) {
        const data = response.data.data;

        const updatedItem: Category = {
          id: data.id,
          title: data.title,
          isListed: data.isListed,
          status: data.isListed ? "listed" : "unlisted",
        };

        const updatedData = [updatedItem, ...categoryData];

        setCategoryData(updatedData);
        setIsCreating(false);
        showSuccessToast(CategoryMessages.SUCCESS.CREATE);
      }
    } catch (error) {
      console.error(CategoryMessages.ERROR.CREATE, error);
      showErrorToast(CategoryMessages.ERROR.CREATE);
    }
  };

  return {
    isLoading,
    filterStatus,
    currentPage,
    searchQuery,
    paginatedData,
    totalPages,
    isEditModalOpen,
    isCreating,
    setIsEditModalOpen,
    handleOpenCreateModal,
    saveNewCategory,
    handleSaveTitle,
    handleEditTitle,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleToggleStatus,
  };
}
