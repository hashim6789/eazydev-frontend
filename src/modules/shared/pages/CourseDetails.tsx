import React, { useState, useEffect } from "react";
import { Book, DollarSign } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store";
import { Course, CourseStatus, UserRole } from "../../../types";
import { api } from "../../../configs";
import {
  getCourseStatusColor,
  showErrorToast,
  showSuccessToast,
} from "../../../utils";
import LessonView from "../../admin/components/course/LessonView";
import { setCourseDetails, updateCourseStatus } from "../../../store/slice";
import { getCourseStatusIcon } from "../../../utils/icon.util";
import { useThemeStyles } from "../../../utils/color-theme.util";
interface CourseDetailsPageProps {
  role: UserRole;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ role }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useThemeStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<CourseStatus>("draft");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      setIsLoading(true);
      try {
        const response = await api.get<Course>(`/api/courses/${courseId}`);
        dispatch(setCourseDetails(response.data));
      } catch (error: any) {
        showErrorToast(
          error.response?.data?.message || "Failed to fetch course details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, dispatch]);

  const handleStatusChange = (status: CourseStatus) => {
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!courseId) return;

    try {
      const response = await api.patch(`/api/courses/${courseId}`, {
        newStatus,
      });

      if (response.status === 200) {
        dispatch(updateCourseStatus({ newStatus }));
        showSuccessToast(
          response.data.message || "Status updated successfully"
        );
      }
    } catch (error: any) {
      showErrorToast(
        error.response?.data?.message || "Failed to update status"
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading || !course) {
    return (
      <div
        className={`container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center ${theme.cardBg}`}
      >
        <div className="text-center">
          <div
            className={`animate-spin h-12 w-12 mb-4 border-4 ${theme.border} border-t-transparent rounded-full mx-auto`}
          ></div>
          <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
            Loading course details...
          </h2>
        </div>
      </div>
    );
  }

  // Define status action buttons based on current status
  const renderStatusActions = (userRole: UserRole) => {
    if (!userRole) return null;

    switch (course.status) {
      case "draft":
        return (
          userRole === "mentor" && (
            <button
              onClick={() => handleStatusChange("requested")}
              className={`${theme.primary} ${theme.hover} ${theme.buttonText} px-4 py-2 rounded transition-colors flex items-center gap-2`}
            >
              <span>Submit for Approval</span>
            </button>
          )
        );

      case "requested":
        return (
          userRole === "admin" && (
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => handleStatusChange("approved")}
                className={`${theme.primary} ${theme.hover} ${theme.buttonText} px-4 py-2 rounded transition-colors flex items-center gap-2`}
              >
                <span>Approve Course</span>
              </button>
              <button
                onClick={() => handleStatusChange("rejected")}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
              >
                <span>Reject Course</span>
              </button>
            </div>
          )
        );

      case "approved":
        return (
          userRole === "admin" && (
            <button
              onClick={() => handleStatusChange("published")}
              className={`${theme.primary} ${theme.hover} ${theme.buttonText} px-4 py-2 rounded mt-4 transition-colors flex items-center gap-2`}
            >
              <span>Publish Course</span>
            </button>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme.sidebarBg}`}>
      {/* Header Banner */}
      <div className={`${theme.primary} ${theme.buttonText} p-8`}>
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center">
              <Book className="h-5 w-5 mr-2" />
              <span>{course.lessons?.length || 0} lessons</span>
            </div>
            {course.price > 0 && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>${course.price.toFixed(2)}</span>
              </div>
            )}
            <div
              className={`flex items-center px-3 py-1 rounded-full ${getCourseStatusColor(
                course.status
              )}`}
            >
              {getCourseStatusIcon(course.status)}
              <span className="capitalize ml-1">{course.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <section className={`${theme.cardBg} rounded-lg shadow-sm p-6`}>
              <h2
                className={`text-xl font-semibold ${theme.text} mb-4 flex items-center`}
              >
                <span>Course Description</span>
              </h2>
              <div className={`prose max-w-none ${theme.textSecondary}`}>
                {course.description ? (
                  <p className="leading-relaxed whitespace-pre-line">
                    {course.description}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">
                    No description provided
                  </p>
                )}
              </div>
            </section>

            {/* Lessons Section */}
            <section className={`${theme.cardBg} rounded-lg shadow-sm p-6`}>
              <h2
                className={`text-xl font-semibold ${theme.text} mb-4 flex items-center`}
              >
                <span>Course Lessons</span>
                <span
                  className={`ml-2 ${theme.lightBg} ${theme.text} text-sm px-2 py-1 rounded-full`}
                >
                  {course.lessons?.length || 0}
                </span>
              </h2>

              <div className="space-y-4">
                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson) => (
                    <LessonView
                      key={lesson.id}
                      lessonId={lesson.id as string}
                      title={lesson.title}
                    />
                  ))
                ) : (
                  <div
                    className={`text-center p-8 ${theme.lightBg} rounded-lg ${theme.textSecondary}`}
                  >
                    <p>No lessons have been added to this course yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Actions */}
            <div className={`${theme.cardBg} rounded-lg shadow-sm p-6`}>
              <h3 className={`text-lg font-medium ${theme.text} mb-4`}>
                Course Actions
              </h3>
              {renderStatusActions(role)}
            </div>

            {/* Course Details */}
            {/* <div className={`${theme.cardBg} rounded-lg shadow-sm p-6`}>
              <h3 className={`text-lg font-medium ${theme.text} mb-4`}>
                Course Details
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Calendar className={`h-5 w-5 ${theme.text} mr-3`} />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className={theme.textSecondary}>
                      {course.createdAt ? formatDate(new Date(course.createdAt)) : 'N/A'}
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <User className={`h-5 w-5 ${theme.text} mr-3`} />
                  <div>
                    <p className="text-sm text-gray-500">Mentor ID</p>
                    <p className={theme.textSecondary}>
                      {course.mentorId || "N/A"}
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Tag className={`h-5 w-5 ${theme.text} mr-3`} />
                  <div>
                    <p className="text-sm text-gray-500">Category ID</p>
                    <p className={theme.textSecondary}>
                      {course.categoryId || "N/A"}
                    </p>
                  </div>
                </li>
              </ul>
            </div> */}

            {/* Thumbnail Preview */}
            {course.thumbnail && (
              <div className={`${theme.cardBg} rounded-lg shadow-sm p-6`}>
                <h3 className={`text-lg font-medium ${theme.text} mb-4`}>
                  Course Thumbnail
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`${theme.cardBg} p-6 rounded-lg shadow-lg max-w-md w-full`}
          >
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Confirm Status Change
            </h2>
            <p className={`mt-2 ${theme.textSecondary}`}>
              Are you sure you want to change the course status to{" "}
              <span className={`font-medium capitalize ${theme.text}`}>
                {newStatus}
              </span>
              ?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`border ${theme.border} ${theme.textSecondary} px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`${theme.primary} ${theme.hover} ${theme.buttonText} px-4 py-2 rounded transition-colors`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
