import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ProgressBar } from "./ProgressBar";
import { CourseDetails } from "./CourseDetail";
import { LessonsList } from "./LessonList";
import { useMentorCourseManagement } from "../../../../hooks/userMentorCourseManagement";
import CourseReview from "./CourseReview";

interface CourseFormProps {
  isEditing?: boolean;
}

export const CourseFormA: React.FC<CourseFormProps> = ({
  isEditing = false,
}) => {
  const methods = useForm();
  const {
    currentStep,
    handleCourseSubmit,
    handlePublishCourse,
    handleSaveDraft,
    setStep,
  } = useMentorCourseManagement(isEditing);

  const steps = [
    { id: 1, name: "Course Details" },
    { id: 2, name: "Lessons & Materials" },
    { id: 3, name: "Review & Publish" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? "Edit Course" : "Create New Course"}
      </h1>

      <ProgressBar steps={steps} currentStep={currentStep} />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <FormProvider {...methods}>
          {currentStep === 1 && <CourseDetails />}
          {currentStep === 2 && (
            <LessonsList onBack={() => setStep(1)} onNext={() => setStep(3)} />
          )}
          {currentStep === 3 && (
            // <div className="space-y-6">
            //   <h2 className="text-xl font-semibold">
            //     {isEditing
            //       ? "Review Updates to Your Course"
            //       : "Review Your Course"}
            //   </h2>
            //   <div className="flex justify-between pt-4">
            //     <button
            //       onClick={handleSaveDraft}
            //       className="px-4 py-2 border border-blue-500 rounded-md text-blue-500"
            //     >
            //       Save as Draft
            //     </button>
            //     <button
            //       onClick={handlePublishCourse}
            //       className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
            //     >
            //       {isEditing ? "Request Update" : "Publish Course"}
            //     </button>
            //   </div>
            // </div>

            <CourseReview
              isEditing={isEditing}
              onSaveDraft={handleSaveDraft}
              onPublishCourse={handlePublishCourse}
            />
          )}
        </FormProvider>
      </div>
    </div>
  );
};
