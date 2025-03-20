import React from "react";
import { Search, BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCourseTable } from "../../../../hooks/useCourseTable";
import {
  FilterDropdown,
  Pagination,
  SearchInput,
  SortDropdown,
} from "../../../shared/components";
import { courseSortOptions } from "../../../shared/values";
import { PopulatedCourse } from "../../../../types";

interface CourseGridProps {}

const CourseGrid: React.FC<CourseGridProps> = () => {
  const {
    currentPage,
    searchQuery,
    courseFilterStatus,
    sort,
    data,
    totalPages,
    loading,
    filterOptions,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
  } = useCourseTable({ itemsPerPage: 6 });

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Most Popular Courses
          </h2>
          <p className="text-gray-600">
            Explore our top-rated courses and start learning today
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-4">
          <SearchInput
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />
          <FilterDropdown
            options={filterOptions}
            selectedValue={courseFilterStatus}
            handleFilterChange={handleFilterChange}
          />
          <SortDropdown
            sort={sort}
            options={courseSortOptions}
            handleSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course: PopulatedCourse) => (
          <div
            key={course.id}
            onClick={() => navigate(`/learner/courses/${course.id}`)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
          >
            {/* Image and Badge Container */}
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  {course.category.title}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {course.description || "No description available."}
              </p>

              <div className="text-sm text-gray-600 mb-4">
                <p className="font-medium">
                  Price:{" "}
                  <span className="text-green-600 font-semibold">
                    ${course.price.toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium">Mentor:</p>
                <div className="flex items-center mt-2 gap-2">
                  <img
                    src={course.mentor.profilePicture}
                    alt={`${course.mentor.firstName} ${course.mentor.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>
                    {course.mentor.firstName} {course.mentor.lastName}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 mt-auto">
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-blue-500 font-medium">
                    Certificate Included
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
