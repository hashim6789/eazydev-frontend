import React, { useState } from "react";
import { ChevronRight, Clock, BookOpen, Video, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { formatDuration } from "../../../../utils/date.util";
import { useNavigate } from "react-router-dom";
import { removeCourseDetails, setCurrentStep } from "../../../../store/slice";

interface CourseReviewProps {
  //   course: Course;
  isEditing?: boolean;
  onSaveDraft: () => void;
  onSaveDraftForRejectedCourse: () => void;
  onPublishCourse: () => void;
}

const CourseReview: React.FC<CourseReviewProps> = ({
  //   course,
  isEditing = false,
  onSaveDraft,
  onSaveDraftForRejectedCourse,
  onPublishCourse,
}) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const { course } = useSelector((state: RootState) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Calculate total course duration
  const totalCourseDuration = course.lessons.reduce(
    (total, lesson) =>
      total +
      lesson.materials.reduce(
        (lessonTotal, material) => lessonTotal + material.duration,
        0
      ),
    0
  );

  // Get material type icon
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />;
      case "reading":
        return <BookOpen className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleGotoCourse = () => {
    dispatch(setCurrentStep(1));
    dispatch(removeCourseDetails());
    navigate("/mentor/courses");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Course Header */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {isEditing ? "Review Updates to Your Course" : "Review Your Course"}
        </h2>

        {/* Course Metadata */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg">
            <div className="flex items-center justify-between pb-2">
              <h4 className="text-sm font-medium">Mentor</h4>
              <Edit className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-xl font-bold">{course.mentor.firstName}</div>
              <p className="text-xs text-gray-500">{course.mentor.lastName}</p>
            </div>
          </div>

          <div className="border p-4 rounded-lg">
            <div className="flex items-center justify-between pb-2">
              <h4 className="text-sm font-medium">Category</h4>
              <span className="px-2 py-1 bg-gray-200 text-sm rounded">
                {course.category.title}
              </span>
            </div>
            <div>
              <div className="text-xl font-bold">{course.title}</div>
            </div>
          </div>

          <div className="border p-4 rounded-lg">
            <div className="flex items-center justify-between pb-2">
              <h4 className="text-sm font-medium">Course Details</h4>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {formatDuration(totalCourseDuration * 60)}
              </div>
              <p className="text-xs text-gray-500">
                {course.lessons.length} Lessons
              </p>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="border p-4 rounded-lg">
          <h4 className="text-lg font-medium">Course Description</h4>
          <p className="text-gray-500 mt-2">{course.description}</p>
        </div>

        {/* Lessons Overview */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Course Curriculum</h3>
          {course.lessons.map((lesson, lessonIndex) => (
            <div
              key={lesson.id}
              className={`border p-4 rounded-lg hover:shadow-md ${
                activeLesson === lesson.id ? "border-blue-500" : ""
              }`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setActiveLesson(activeLesson === lesson.id ? null : lesson.id)
                }
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    {lessonIndex + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-gray-500">
                      {lesson.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${
                    activeLesson === lesson.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {activeLesson === lesson.id && (
                <div className="mt-4 space-y-3">
                  {lesson.materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        {getMaterialIcon(material.type)}
                        <div>
                          <div className="font-medium">{material.title}</div>
                          <p className="text-xs text-gray-500">
                            {material.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDuration(material.duration * 60)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 space-x-4">
          {!isEditing ? (
            <>
              <button
                onClick={onSaveDraft}
                className="px-6 py-2 border rounded-md bg-white hover:bg-gray-50"
              >
                Save as Draft
              </button>
              <button
                onClick={onPublishCourse}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEditing ? "Request Update" : "Request Publish"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleGotoCourse}
                className="px-6 py-2 border rounded-md bg-white hover:bg-gray-50"
              >
                Go to courses
              </button>
              {course.status === "rejected" && (
                <button
                  onClick={onSaveDraftForRejectedCourse}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save as Draft
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
