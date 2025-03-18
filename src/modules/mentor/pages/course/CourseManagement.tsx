import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import Breadcrumbs from "../../../shared/components/BreadCrumbs";
import FilterSearchBar from "../../../shared/components/FilterSearchBar";
import ManagementHeader from "../../../shared/components/ManagementHeader";
import { NoContentState } from "../../../shared/Error/NoContentState";
import { LoadingState } from "../../../shared/Error/LoadingState";
import { courseManagementPath } from "../../../../utils/path.util";
import { useCourseTable } from "../../../../hooks/useCourseTable";
import { CourseStatus } from "../Dashboard";
import { getCourseStatusColor } from "../../../../utils";
import CourseCard from "../../components/CourseCard";
import { Pagination } from "../../../shared/components";

const paths = [{ title: "My Courses", link: "/mentor/my-courses" }];

const CourseManagement: React.FC = () => {
  const navigate = useNavigate();
  const styles = useThemeStyles();

  const {
    searchQuery,
    totalPages,
    currentPage,
    courseFilterStatus,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleDelete,
    data,
    loading,
  } = useCourseTable({
    itemsPerPage: 6,
    filterField: "title",
  });

  return (
    <div className={`p-6 min-h-screen  ${styles.textSecondary}`}>
      {/* Breadcrumbs */}
      <Breadcrumbs paths={courseManagementPath} />
      <div className="max-w-7xl mx-auto">
        {/* Management Header */}
        <ManagementHeader
          entity="Course"
          description="Manage your courses and track their progress"
          buttonAction={() => navigate("/mentor/courses/create")}
        />

        {/* Search and Filter Bar */}
        <FilterSearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filterValue={courseFilterStatus}
          onFilterChange={(filter: string) =>
            handleFilterChange(filter as CourseStatus | "all")
          }
          placeholder="Search courses..."
          options={[
            "approved",
            "rejected",
            "completed",
            "requested",
            "published",
            "draft",
          ]}
          styles={styles}
        />

        {/* Loading State */}
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Course List */}
            {data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((course) => (
                  <CourseCard course={course} handleDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <NoContentState title="No Courses Found" />
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

export default CourseManagement;
