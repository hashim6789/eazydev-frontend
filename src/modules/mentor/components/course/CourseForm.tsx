import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  setCourseDetails,
  // addLesson,
  // updateLesson,
  // removeLesson,
  setCurrentStep,
  resetCourse,
} from "../../../../store/slice";

import { Course } from "../../../../types";
import { ProgressBar } from "./ProgressBar";
import { CourseDetails } from "./CourseDetail";
import { LessonsList } from "./LessonList";
import { api } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { getUserProperty } from "../../../../utils/local-user.util";

export const CourseForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { course, currentStep } = useSelector(
    (state: RootState) => state.course
  );
  const navigate = useNavigate();

  const methods = useForm<Course>({
    defaultValues: course,
  });

  const steps = [
    { id: 1, name: "Course Details" },
    { id: 2, name: "Lessons & Materials" },
    { id: 3, name: "Review & Publish" },
  ];

  const handleCourseDetailsSubmit = async (data: Partial<Course>) => {
    try {
      const createData = {
        title: data.title,
        description: data.description,
        mentorId: course.mentor.id,
        categoryId: data.category?.id,
        thumbnail: course.thumbnail,
        price: data.price,
      };
      const response = await api.post<{ course: Course }>(
        "/api/courses",
        createData
      );
      if (response && response.status === 201) {
        showSuccessToast("Course created successfully.");
        dispatch(setCourseDetails(response.data.course));
        dispatch(setCurrentStep(2)); // Move to the next step
      }
    } catch (error: any) {
      showErrorToast("An error occurred while creating the course.");
    }
  };

  // const handleAddLesson = async (lesson: Lesson) => {
  //   try {
  //     const createData = {
  //       title: lesson.title,
  //       description: lesson.description,
  //       mentorId: lesson.mentorId,
  //       courseId: course.id,
  //     };
  //     const response = await api.post("/api/lessons", createData);
  //     if (response && response.status === 201) {
  //       showSuccessToast("Lesson created successfully.");
  //       dispatch(addLesson(lesson));
  //     }
  //   } catch (error: any) {
  //     showErrorToast("An error occurred while creating the lesson.");
  //   }
  // };

  // const handleUpdateLesson = (index: number, lesson: Lesson) => {
  //   dispatch(updateLesson({ index, lesson }));
  // };

  // const handleRemoveLesson = (index: number) => {
  //   dispatch(removeLesson(index));
  // };

  const handlePublishCourse = async () => {
    try {
      console.log("Publishing course:", course);
      // API call to publish the course
      // Example:
      await api.patch(`/api/courses/${course.id}`, {
        newStatus: "requested",
        mentorId: getUserProperty("id"),
      });
      navigate("/mentor/courses");
      dispatch(resetCourse());
      showSuccessToast("Course requested successfully.");
    } catch (error: any) {
      showErrorToast(
        error.response.data.error ||
          "An error occurred while publishing the course."
      );
    }
  };

  const handleSaveDraft = async () => {
    dispatch(resetCourse());
    showSuccessToast("Draft saved successfully.");
    navigate("/mentor/courses");
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create New Course
      </h1>

      <ProgressBar steps={steps} currentStep={currentStep} />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <FormProvider {...methods}>
          {currentStep === 1 && (
            <CourseDetails onSubmit={handleCourseDetailsSubmit} />
          )}

          {currentStep === 2 && (
            <LessonsList
              // lessons={course.lessons}
              // mentorId={course.mentorId}
              // onAddLesson={handleAddLesson}
              // onUpdateLesson={handleUpdateLesson}
              // onRemoveLesson={handleRemoveLesson}
              onBack={() => dispatch(setCurrentStep(1))}
              onNext={() => dispatch(setCurrentStep(3))}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Review Your Course</h2>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Course Details</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <p>
                    <span className="font-medium">Title:</span> {course.title}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> ${course.price}
                  </p>
                  <p className="col-span-2">
                    <span className="font-medium">Description:</span>{" "}
                    {course.description}
                  </p>
                </div>

                {course.thumbnail && (
                  <div className="mt-4">
                    <p className="font-medium">Thumbnail:</p>
                    <img
                      src={course.thumbnail}
                      alt="Course thumbnail"
                      className="w-40 h-24 object-cover rounded mt-1"
                    />
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">
                  Lessons ({course.lessons.length})
                </h3>
                <div className="mt-2 space-y-3">
                  {course.lessons.map((lesson, idx) => (
                    <div key={idx} className="border-b pb-2 last:border-b-0">
                      <p className="font-medium">
                        {idx + 1}. {lesson.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Materials: {lesson.materials.length}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                {/* <button
                  type="button"
                  onClick={() => dispatch(setCurrentStep(2))}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Back to Lessons
                </button> */}

                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2 border border-blue-500 rounded-md text-blue-500"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishCourse}
                    className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                  >
                    Publish Course
                  </button>
                </div>
              </div>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
