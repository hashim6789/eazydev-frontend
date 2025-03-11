import { useState, useMemo, useEffect } from "react";
import { CourseStatus, MentorCourse } from "../types";
import { api } from "../configs";
import useCourseManagement from "./useCourseManagement";

interface UseCourseTableFunctionalityOptions {
  itemsPerPage: number;
  filterField: keyof MentorCourse;
}

export function useCourseTable({
  itemsPerPage,
  filterField,
}: UseCourseTableFunctionalityOptions) {
  const { deleteCourse } = useCourseManagement();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilterStatus, setCourseFilterStatus] = useState<
    CourseStatus | "all"
  >("all");
  const [data, setData] = useState<MentorCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/courses?status=${courseFilterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.data);
        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [courseFilterStatus, searchQuery, currentPage, itemsPerPage]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return String(item[filterField])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, filterField]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: CourseStatus | "all") => {
    setCourseFilterStatus(status);
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
    courseFilterStatus,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleDelete,
  };
}
