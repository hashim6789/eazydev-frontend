import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import { addLesson, updateLesson, removeLesson } from "../../../../store/slice";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ILesson } from "../../../../types";
import { LessonForm } from "./LessonForm";
import { api } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";

interface LessonsListProps {
  onBack: () => void;
  onNext: () => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ onBack, onNext }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lessons, mentorId, courseId } = useSelector((state: RootState) => ({
    lessons: state.course.course.lessons,
    mentorId: state.course.course.mentorId,
    courseId: state.course.course.id,
  }));

  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(
    null
  );

  const handleAddLesson = async (lesson: ILesson) => {
    try {
      const materialIds = lesson.materials.map((item) => item.id);
      const data = { ...lesson, materials: materialIds, courseId };
      const response = await api.post("/api/lessons", data);
      if (response && response.status === 201) {
        dispatch(addLesson({ ...lesson, mentorId }));
        setIsAddingLesson(false);
        showSuccessToast("Lesson added successfully");
      }
    } catch (error: any) {
      showErrorToast("failed add lesson!");
    }
  };

  const handleUpdateLesson = (lesson: ILesson) => {
    if (editingLessonIndex !== null) {
      dispatch(
        updateLesson({
          index: editingLessonIndex,
          lesson: { ...lesson, mentorId },
        })
      );
      setEditingLessonIndex(null);
    }
  };

  const handleRemoveLesson = (index: number) => {
    dispatch(removeLesson(index));
  };

  const handleEditLesson = (index: number) => {
    setEditingLessonIndex(index);
    setIsAddingLesson(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Lessons & Materials</h2>

      {/* Lessons List */}
      {lessons.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Lessons</h3>

          <div className="border rounded-lg divide-y">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium">
                    {index + 1}. {lesson.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {lesson.materials.length}{" "}
                    {lesson.materials.length === 1 ? "material" : "materials"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditLesson(index)}
                    className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveLesson(index)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Lesson Form */}
      {isAddingLesson && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Add New Lesson</h3>
          <LessonForm
            onSubmit={handleAddLesson}
            onCancel={() => setIsAddingLesson(false)}
          />
        </div>
      )}

      {/* Edit Lesson Form */}
      {editingLessonIndex !== null && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Edit Lesson</h3>
          <LessonForm
            initialData={lessons[editingLessonIndex]}
            onSubmit={handleUpdateLesson}
            onCancel={() => setEditingLessonIndex(null)}
          />
        </div>
      )}

      {/* Add Lesson Button */}
      {!isAddingLesson && editingLessonIndex === null && (
        <button
          type="button"
          onClick={() => setIsAddingLesson(true)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add New Lesson
        </button>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
        >
          Back to Course Details
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
          disabled={lessons.length === 0}
        >
          {lessons.length === 0
            ? "Add at least one lesson to continue"
            : "Review & Publish"}
        </button>
      </div>
    </div>
  );
};
