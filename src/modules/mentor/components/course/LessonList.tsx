import React from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { LessonForm } from "./LessonForm";
import { Lesson } from "../../../../types";
import { useMentorCourseManagement } from "../../../../hooks/userMentorCourseManagement";

interface LessonsListProps {
  onBack: () => void;
  onNext: () => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ onNext }) => {
  const {
    course,
    handleLessonManagement,
    isAddingLesson,
    editingLessonIndex,
    materials,
    setMaterials,
    setEditingLessonIndex,
    setIsAddingLesson,
  } = useMentorCourseManagement();

  const { lessons } = course;

  // Handlers for Adding, Editing, and Removing Lessons
  const handleAddLesson = async (lesson: Lesson) => {
    const materialIds = materials.map((item) => item.id);
    handleLessonManagement.add(lesson, materialIds);
  };

  const handleUpdateLesson = (lesson: Lesson) => {
    if (editingLessonIndex !== null) {
      const materialIds = materials.map((item) => item.id);
      handleLessonManagement.update(editingLessonIndex, lesson, materialIds);
    }
  };

  const handleRemoveLesson = (index: number) => {
    handleLessonManagement.remove(index);
  };

  const handleEditLesson = (index: number) => {
    setEditingLessonIndex(index);
    setMaterials(course.lessons[index].materials);
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
