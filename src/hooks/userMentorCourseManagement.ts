import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { Category, Course, Lesson, Material } from "../types";
import useFetch from "./useFetch";
import { api, config } from "../configs";
import {
  resetCourse,
  setCourseDetails,
  setCurrentStep,
  setThumbnail,
  addLesson,
  updateLesson,
  removeLesson,
  removeMaterial,
  updateMaterial,
  addMaterial,
} from "../store/slice";
import { showErrorToast, showSuccessToast } from "../utils";

export const useMentorCourseManagement = () => {
  // Redux and navigation hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { course, currentStep, isEditing } = useSelector(
    (state: RootState) => state.course
  );

  // Local states for lessons and materials
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(
    null
  );

  const [materials, setMaterials] = useState<Material[]>([]);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [editingMaterialIndex, setEditingMaterialIndex] = useState<
    number | null
  >(null);

  // Fetch categories
  const { data: categories } = useFetch<Category[]>("/api/categories");

  // Thumbnail Upload Handler
  const handleThumbnailUpload = async (
    fileKey: string,
    filePreview: string,
    fileName: string
  ) => {
    try {
      console.log(fileKey);
      const formData = new FormData();
      const fileBlob = await fetch(filePreview).then((r) => r.blob());
      formData.append("file", fileBlob, fileName);
      formData.append("upload_preset", config.CLOUDINARY_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const secureUrl = response.data.secure_url;

      if (response.status === 200) {
        dispatch(setThumbnail({ thumbnail: secureUrl }));
        showSuccessToast("Thumbnail uploaded successfully!");
      }
      return secureUrl;
    } catch (error) {
      showErrorToast("Failed to upload image.");
    }
  };

  // Course Submission Handler
  const handleCourseSubmit = async (data: Partial<Course>) => {
    try {
      const updatedData = {
        title: data.title,
        description: data.description,
        mentorId: course.mentor.id,
        categoryId: data.category?.id,
        thumbnail: course.thumbnail,
        price: data.price,
      };

      const response = isEditing
        ? await api.put(`/api/courses/${course.id}`, updatedData)
        : await api.post<string>("/api/courses", updatedData);

      if (response.status === (isEditing ? 200 : 201)) {
        showSuccessToast(
          isEditing
            ? "Course updated successfully."
            : "Course created successfully."
        );
        dispatch(setCourseDetails({ ...data, id: response.data }));
        dispatch(setCurrentStep(2));
      }
    } catch (error) {
      showErrorToast(
        `An error occurred while ${
          isEditing ? "updating" : "creating"
        } the course.`
      );
    }
  };

  // Course Publishing Handler
  const handlePublishCourse = async () => {
    try {
      await api.patch(`/api/courses/${course.id}`, { newStatus: "requested" });
      navigate("/mentor/courses");
      dispatch(setCurrentStep(1));
      dispatch(resetCourse());
      showSuccessToast(
        isEditing
          ? "Course update requested successfully."
          : "Course requested successfully."
      );
    } catch (error: any) {
      showErrorToast(
        error.response.data.error ||
          "An error occurred while publishing the course."
      );
    }
  };

  // Save Draft Handler
  const handleSaveDraft = () => {
    dispatch(setCurrentStep(1));
    dispatch(resetCourse());
    showSuccessToast("Draft saved successfully.");
    navigate("/mentor/courses");
  };

  // Lesson Management Handlers
  const handleLessonManagement = {
    add: async (lesson: Lesson, materialIds: string[]) => {
      try {
        console.log(course.id);
        const response = await api.post<string>("/api/lessons", {
          ...lesson,
          mentorId: course.mentor.id,
          courseId: course.id,
          materials: materialIds,
        });

        if (response.status === 201 && response.data) {
          dispatch(addLesson({ ...lesson, id: response.data }));
          showSuccessToast("Lesson created successfully");
          setIsAddingLesson(false);
          return response.data;
        }
        return null;
      } catch (error: any) {
        showErrorToast(error.response.data.error || "Failed to create lesson");
        return null;
      }
    },

    update: async (index: number, lesson: Lesson, materialIds: string[]) => {
      try {
        const response = await api.put<string>(`/api/lessons/${lesson.id}`, {
          ...lesson,
          mentorId: course.mentor.id,
          courseId: course.id,
          materials: materialIds,
        });

        if (response.status === 200) {
          dispatch(updateLesson({ index, lesson }));
          showSuccessToast("Lesson updated successfully");
          setEditingLessonIndex(null);
          setIsAddingLesson(false);
        }
      } catch (error: any) {
        showErrorToast(error.response.data.error || "Failed to update lesson");
      }
    },

    remove: async (index: number) => {
      try {
        const lesson = course.lessons[index];
        const response = await api.delete(
          `/api/lessons/${lesson.id}/courses/${course.id}`
        );

        if (response.status === 200) {
          dispatch(removeLesson(index));
          showSuccessToast("Lesson deleted successfully");
          setIsAddingLesson(false);
          setEditingLessonIndex(null);
        }
      } catch (error: any) {
        showErrorToast(error.response.data.error || "Failed to delete lesson");
      }
    },
  };

  const handleMaterialManagement = {
    add: async (lessonIndex: number, material: Material) => {
      try {
        const response = await api.post<string>("/api/materials", material);

        if (response.status === 201) {
          dispatch(
            addMaterial({
              lessonIndex,
              material: { ...material, id: response.data },
            })
          );
          setIsAddingMaterial(false);
          showSuccessToast("Material created successfully");
          return response.data;
        }
        return null;
      } catch (error: any) {
        showErrorToast("Failed to create material");
        return null;
      }
    },

    update: async (
      lessonIndex: number,
      materialIndex: number,
      material: Material
    ) => {
      try {
        console.log("material", material);
        const response = await api.put<string>(
          `/api/materials/${material.id}`,
          material
        );

        if (response.status === 200) {
          dispatch(
            updateMaterial({
              lessonIndex,
              materialIndex,
              material,
            })
          );
          setEditingMaterialIndex(null);
          showSuccessToast("Material updated successfully");
          return true;
        }
        return false;
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || "Failed to update material"
        );
        return false;
      }
    },

    remove: async (lessonIndex: number, materialIndex: number) => {
      try {
        const material = course.lessons[lessonIndex].materials[materialIndex];
        const response = await api.delete(`/api/materials/${material.id}`);

        if (response.status === 200) {
          dispatch(removeMaterial({ lessonIndex, materialIndex }));
          setEditingMaterialIndex(null);
          showSuccessToast("Material deleted successfully");
        }
      } catch (error: any) {
        showErrorToast("Failed to delete material");
      }
    },

    startAdding: () => setIsAddingMaterial(true),
    stopAdding: () => setIsAddingMaterial(false),
    startEditing: (index: number) => setEditingMaterialIndex(index),
    stopEditing: () => setEditingMaterialIndex(null),
  };

  return {
    categories: categories || [],
    course,
    currentStep,
    isEditing,
    materials,
    setMaterials,
    setEditingMaterialIndex,
    handleThumbnailUpload,
    handleCourseSubmit,
    handlePublishCourse,
    handleSaveDraft,
    isAddingLesson,
    setIsAddingLesson,
    setEditingLessonIndex,
    handleLessonManagement,
    isAddingMaterial,
    editingLessonIndex,
    editingMaterialIndex,
    setIsAddingMaterial,
    handleMaterialManagement,
    setStep: (step: number) => dispatch(setCurrentStep(step)),
  };
};
