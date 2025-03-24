import { useState, useEffect } from "react";
import useCourseManagement from "./useCourseManagement";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../configs";
import { FilterOption, PopulatedCourse, Sort } from "../types";
import { fetchCategoriesAsFilterOptions } from "../services/category.service";

interface UseCourseTableFunctionalityOptions {
  itemsPerPage: number;
}

export function useCourseTable({
  itemsPerPage,
}: UseCourseTableFunctionalityOptions) {
  const { deleteCourse } = useCourseManagement();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState<Sort>("titleAsc");

  const [data, setData] = useState<PopulatedCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  const [categoryloading, setCategoryLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const options = await fetchCategoriesAsFilterOptions();
        setFilterOptions(options);
        setError(null); // Reset error on success
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const auth = isAuthenticated ? "" : "/no-auth";
        const response = await api.get(
          `/api${auth}/courses?category=${category}&range=${range}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}&sort=${sort}`
        );
        const result = response.data;
        setData(result.body);
        console.log(result);
        setTotalPages(result.last_page);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, currentPage, itemsPerPage, sort, category]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (category: string | "all") => {
    setCategory(category);
    setCurrentPage(1);
  };
  const handleSortChange = (sort: Sort) => {
    setSort(sort);
    setCurrentPage(1);
  };

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      setData(data.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    currentPage,
    searchQuery,
    courseFilterStatus: category,
    range,
    sort,
    data,
    totalPages,
    loading,
    filterOptions,
    categoryloading,
    error,
    setCategoryLoading,
    setCategory,
    setRange,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    handleDelete,
  };
}
