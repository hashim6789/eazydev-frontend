import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import Pagination from "../../../shared/components/Pagination";
import Breadcrumbs from "../../../shared/components/BreadCrumbs";
import FilterSearchBar from "../../../shared/components/FilterSearchBar";
import ManagementHeader from "../../../shared/components/ManagementHeader";
import { NoContentState } from "../../../shared/Error/NoContentState";
import { LoadingState } from "../../../shared/Error/LoadingState";
import { lessonManagementPath } from "../../../../utils/path.util";
import { useLessonTable } from "../../../../hooks/useLessonTable";
import LessonCard from "../../components/LessonCard";

const LessonManagement: React.FC = () => {
  const navigate = useNavigate();
  const styles = useThemeStyles(); // Use theme styles dynamically

  const {
    currentPage,
    searchQuery,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleDelete,
  } = useLessonTable({ itemsPerPage: 6 });

  return (
    <div className={`p-6 min-h-screen ${styles.textSecondary}`}>
      {/* Breadcrumbs */}
      <Breadcrumbs paths={lessonManagementPath} />
      <div className="max-w-7xl mx-auto">
        {/* Management Header */}
        <ManagementHeader
          entity="Lesson"
          description="Manage your educational content and lessons"
          buttonAction={() => navigate("/mentor/my-lessons/create")}
        />

        {/* Search Bar */}
        <FilterSearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filterValue="all" // Lessons don't have a filter type by default
          onFilterChange={() => {}} // No filter functionality here
          placeholder="Search lessons..."
          options={[]} // No options for lessons
          styles={styles}
        />

        {/* Loading State */}
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Lesson List */}
            {data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <NoContentState title="No Lessons Found" />
            )}
          </>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LessonManagement;
