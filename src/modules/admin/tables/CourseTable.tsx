import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FilterDropdown,
  Pagination,
  SearchInput,
  SortDropdown,
} from "../../shared/components";
import { LoadingState, NoContentState } from "../../shared/Error";
import { useCourseTable } from "../../../hooks/useCourseTable";
import { courseSortOptions } from "../../shared/values";
import { getCourseStatusColor } from "../../../utils";
import useFetch from "../../../hooks/useFetch";
import { Category } from "../../../types";

const defaultThumbnail = "https://via.placeholder.com/150";

interface CoursesTableProps {}

const CoursesTable: React.FC<CoursesTableProps> = () => {
  const {
    currentPage,
    searchQuery,
    category,
    range,
    sort,
    data,
    totalPages,
    loading,
    filterOptions,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    handleDelete,
  } = useCourseTable({ itemsPerPage: 5 });

  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Search and Filter Section */}
      <div className="mb-4 flex gap-4">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <FilterDropdown
          options={filterOptions}
          selectedValue={category}
          handleFilterChange={handleFilterChange}
        />
        <SortDropdown
          sort={sort}
          options={courseSortOptions}
          handleSortChange={handleSortChange}
        />
      </div>

      {/* Loading and No Content States */}
      {loading && <LoadingState />}
      {!loading && data.length === 0 && <NoContentState />}

      {/* Courses Table */}
      {!loading && data.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Course Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Thumbnail
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
                    </span>
                  </td>

                  {/* Course Title */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      {course.title}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {course.category.title}
                    </span>
                  </td>

                  {/* Thumbnail */}
                  <td className="px-6 py-4">
                    <img
                      src={course.thumbnail || defaultThumbnail}
                      alt="Course Thumbnail"
                      className="w-16 h-16 rounded"
                    />
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CoursesTable;
