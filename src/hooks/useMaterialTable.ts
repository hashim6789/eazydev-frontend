import { useState, useEffect } from "react";
import { Material, MaterialType } from "../types/material";
import { api } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import { showDeletionConfirmationBox } from "../utils/confirm-box.utils";

interface UseMaterialTableFunctionalityOptions {
  itemsPerPage: number;
  filterField: keyof Material;
}

export function useMaterialTable({
  itemsPerPage,
}: // filterField,
UseMaterialTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [materialFilterType, setMaterialFilterType] = useState<
    MaterialType | "all"
  >("all");
  const [data, setData] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/materials?type=${materialFilterType}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.body);
        setTotalPages(result.last_page);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimeout);
  }, [materialFilterType, searchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: MaterialType | "all") => {
    setMaterialFilterType(status);
    setCurrentPage(1);
  };

  const handleDelete = async (materialId: string) => {
    const isConfirmed = await showDeletionConfirmationBox(
      "material",
      "delete",
      true
    );

    if (isConfirmed) {
      try {
        await api.delete(`/api/materials/${materialId}`);
        showSuccessToast("The lesson was deleted successfully!");
        setData((prevMaterials) =>
          prevMaterials.filter((material) => material.id !== materialId)
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
    materialFilterType,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleDelete,
  };
}
