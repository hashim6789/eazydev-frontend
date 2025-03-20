import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";
import useProgressList from "../../../../hooks/useProgressList";
import {
  ErrorState,
  LoadingState,
  NoContentState,
} from "../../../shared/Error";
import { ProgressLearning } from "../../../../types";

// Progress Badge component
const ProgressBadge = ({ progress }: { progress: number }) => {
  let bgColor = "bg-blue-100";
  let textColor = "text-blue-800";

  if (progress < 25) {
    bgColor = "bg-gray-100";
    textColor = "text-gray-800";
  } else if (progress < 50) {
    bgColor = "bg-blue-100";
    textColor = "text-blue-800";
  } else if (progress < 75) {
    bgColor = "bg-indigo-100";
    textColor = "text-indigo-800";
  } else if (progress < 100) {
    bgColor = "bg-purple-100";
    textColor = "text-purple-800";
  } else {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {progress}% Complete
    </span>
  );
};

// Main component
const MyLearningsPage = () => {
  const navigate = useNavigate();

  const { currentPage, data, totalPages, loading, error, handlePageChange } =
    useProgressList({ itemsPerPage: 4 });

  // Filter state
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredLearnings, setFilteredLearnings] = useState<
    ProgressLearning[]
  >([]);

  // Sort state
  const [sortOption, setSortOption] = useState("recent");

  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch data (mock implementation)

  // Format date
  const formatDate = (timestamp: number) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  //   if (loading) {
  //     return <LoadingState />;
  //   }

  //   if (error) {
  //     return <ErrorState />;
  //   }

  //   if (learnings.length === 0) {
  //     return <NoContentState />;
  //   }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className={`mb-8 transition-all duration-500 ${
          isLoaded ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learnings</h1>
        <p className="text-gray-600">
          Track your progress and continue your learning journey
        </p>
      </div>

      <div className="space-y-6">
        {data.map((learning, index) => (
          <div
            key={learning.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 ${
              isLoaded
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${150 + index * 75}ms` }}
          >
            <div className="sm:flex">
              <div className="w-full sm:w-48 h-40 sm:h-auto bg-gray-100 relative">
                <img
                  src={learning.course.thumbnail}
                  alt={learning.course.title}
                  className="w-full h-full object-cover"
                />
                {learning.isCourseCompleted && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-2">
                      {learning.course.title}
                    </h3>
                    <ProgressBadge progress={learning.progress} />
                  </div>

                  <div className="flex items-center mb-4">
                    <img
                      src={learning.mentor.profilePicture}
                      alt={`${learning.mentor.firstName} ${learning.mentor.lastName}`}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      {learning.mentor.firstName} {learning.mentor.lastName}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          learning.isCourseCompleted
                            ? "bg-green-500"
                            : learning.progress > 70
                            ? "bg-blue-600"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${learning.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1 text-gray-500" />
                      <span>
                        {learning.completedLessons.length} lessons completed
                      </span>
                    </div>

                    {learning.completedDate && (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-gray-500" />
                        <span>
                          Completed {formatDate(learning.completedDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`/learner/my-learnings/${learning.id}`)
                    }
                    className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors ${
                      learning.isCourseCompleted
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {learning.isCourseCompleted
                      ? "Review Course"
                      : "Continue Learning"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className={`flex justify-center mt-8 transition-all duration-500 delay-300 ${
            isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}

      {/* Stats summary */}
      <div
        className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-500 delay-400 ${
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Book className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.filter((l) => l.isCourseCompleted).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 mr-3">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.filter((l) => !l.isCourseCompleted).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearningsPage;
