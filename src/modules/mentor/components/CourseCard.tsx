import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useThemeStyles } from "../../../utils/color-theme.util"; // Theme utility
import { getCourseStatusColor } from "../../../utils"; // Helper for status colors
import { ManagementCourse } from "../../../types";

interface CourseCardProps {
  course: ManagementCourse;
  handleDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, handleDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const styles = useThemeStyles(); // Fetch theme styles

  return (
    <div
      key={course.id}
      className={`${styles.cardBg} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
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
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-full ${styles.hover}`}
            >
              <MoreVertical className={`w-5 h-5 ${styles.textSecondary}`} />
            </button>
            {showMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 ${styles.cardBg} rounded-md shadow-lg z-10 py-1 border ${styles.border}`}
              >
                <button
                  onClick={() => navigate(`/mentor/courses/${course.id}`)}
                  className={`flex items-center w-full px-4 py-2 text-sm ${styles.textPrimary} ${styles.hover}`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* <div className={`flex items-center ${styles.textSecondary}`}>
            <Clock className="w-4 h-4 mr-2" />
            <span>Duration Placeholder</span>{" "}
          </div> */}
          <span
            className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
              course.status
            )}`}
          >
            {course.status}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`px-6 py-4 ${styles.lightBg} rounded-b-lg border-t ${styles.border}`}
      >
        <button
          onClick={() => navigate(`/mentor/courses/${course.id}`)}
          className={`flex items-center ${styles.textPrimary} ${styles.hover} text-sm font-medium`}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
