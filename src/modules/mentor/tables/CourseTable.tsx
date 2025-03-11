import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../../../utils/color-theme.util";
import { useCourseTable } from "../../../hooks/useCourseTable";
import { CourseStatus } from "../pages/Dashboard";
import { getCourseStatusColor } from "../../../utils";

interface CourseTableProps {}

export const CourseTable: React.FC<CourseTableProps> = () => {
  const navigate = useNavigate();
  const styles = useThemeStyles(); // Get theme styles dynamically
  const {
    searchQuery,
    totalPages,
    currentPage,
    courseFilterStatus,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    data,
  } = useCourseTable({
    itemsPerPage: 6,
    filterField: "title",
  });

  return (
    <div
      className={`p-6  ${styles.textSecondary} transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>
            Courses
          </h2>
          <span className={`text-sm ${styles.textSecondary}`}>
            {data.length} Courses
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`flex-1 px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
        />
        <select
          value={courseFilterStatus}
          onChange={(e) => handleFilterChange(e.target.value as CourseStatus)}
          className={`px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
        >
          <option value="all">All</option>
          {[
            "approved",
            "rejected",
            "completed",
            "requested",
            "published",
            "draft",
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((course) => (
            <div
              key={course.id}
              className={`${styles.cardBg} rounded-lg border ${styles.border} shadow-sm overflow-hidden cursor-pointer transition-all duration-300`}
              onClick={() => navigate(`/mentor/courses/${course.id}`)}
            >
              {/* Thumbnail */}
              <div className="h-48 overflow-hidden">
                <img
                  src={course.thumbnail || "/api/placeholder/400/240"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className={`text-lg font-semibold ${styles.textPrimary} line-clamp-2`}
                    >
                      {course.title}
                    </h3>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      {course.category.title}
                    </p>
                    <p className={`text-sm ${styles.textPrimary}`}>
                      {course.price || 0} Rs
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`text-center py-12 ${styles.textSecondary} border ${styles.border}`}
          >
            No courses available
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border ${
            currentPage === 1
              ? `${styles.textSecondary} cursor-not-allowed opacity-50`
              : styles.textPrimary
          }`}
        >
          Prev
        </button>
        <span className={`text-sm ${styles.textSecondary}`}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border ${
            currentPage === totalPages
              ? `${styles.textSecondary} cursor-not-allowed opacity-50`
              : styles.textPrimary
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
