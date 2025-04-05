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
import {
  CourseMessages,
  HttpStatusCode,
  LessonMessages,
  MaterialMessages,
} from "../constants";
import { getUserProperty } from "../utils/local-user.util";

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
  const { data: categories } = useFetch<Category[]>("/categories");

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

      if (response.status === HttpStatusCode.OK) {
        dispatch(setThumbnail({ thumbnail: secureUrl }));
        showSuccessToast(CourseMessages.SUCCESS.UPLOAD);
      }
      return secureUrl;
    } catch (error: any) {
      showErrorToast(
        error.response.data.error || CourseMessages.SUCCESS.UPLOAD
      );
    }
  };

  // Course Submission Handler
  const handleCourseSubmit = async (data: Partial<Course>) => {
    try {
      const updatedData = {
        title: data.title,
        description: data.description,
        mentorId: getUserProperty("id") as string,
        categoryId: data.category?.id,
        thumbnail: course.thumbnail,
        price: data.price,
      };

      const response = isEditing
        ? await api.put(`/courses/${course.id}`, updatedData)
        : await api.post<string>("/courses", updatedData);

      if (
        response.status ===
        (isEditing ? HttpStatusCode.OK : HttpStatusCode.Created)
      ) {
        showSuccessToast(
          isEditing
            ? CourseMessages.SUCCESS.UPDATE
            : CourseMessages.SUCCESS.CREATE
        );
        dispatch(setCourseDetails({ ...data, id: response.data }));
        dispatch(setCurrentStep(2));
      }
    } catch (error: any) {
      showErrorToast(
        error.response.data.error || isEditing
          ? CourseMessages.ERROR.UPDATE
          : CourseMessages.ERROR.CREATE
      );
    }
  };

  // Course Publishing Handler
  const handlePublishCourse = async () => {
    try {
      await api.patch(`/courses/${course.id}`, { newStatus: "requested" });
      navigate(`/mentor/courses/${course.id}`);
      dispatch(setCurrentStep(1));
      dispatch(resetCourse());
      showSuccessToast(CourseMessages.SUCCESS.TOGGLE);
    } catch (error: any) {
      showErrorToast(error.response.data.error || CourseMessages.ERROR.TOGGLE);
    }
  };
  const handleDraftForRejectedCourse = async () => {
    try {
      await api.patch(`/courses/${course.id}`, { newStatus: "draft" });
      navigate(`/mentor/courses/${course.id}`);
      dispatch(setCurrentStep(1));
      dispatch(resetCourse());
      showSuccessToast(CourseMessages.SUCCESS.TOGGLE);
    } catch (error: any) {
      showErrorToast(error.response.data.error || CourseMessages.ERROR.TOGGLE);
    }
  };

  // Save Draft Handler
  const handleSaveDraft = () => {
    dispatch(setCurrentStep(1));
    dispatch(resetCourse());
    showSuccessToast(CourseMessages.SUCCESS.SAVED);
    navigate(`/mentor/courses/${course.id}`);
  };

  // Lesson Management Handlers
  const handleLessonManagement = {
    add: async (lesson: Lesson, materialIds: string[]) => {
      try {
        console.log(course.id);
        const response = await api.post<string>("/lessons", {
          ...lesson,
          mentorId: getUserProperty("id") as string,
          courseId: course.id,
          materials: materialIds,
        });

        if (response.status === HttpStatusCode.Created && response.data) {
          dispatch(addLesson({ ...lesson, id: response.data }));
          showSuccessToast(LessonMessages.SUCCESS.CREATE);
          setIsAddingLesson(false);
          return response.data;
        }
        return null;
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || LessonMessages.ERROR.CREATE
        );
        return null;
      }
    },

    update: async (index: number, lesson: Lesson, materialIds: string[]) => {
      try {
        const response = await api.put<string>(`/lessons/${lesson.id}`, {
          ...lesson,
          mentorId: getUserProperty("id") as string,
          courseId: course.id,
          materials: materialIds,
        });

        if (response.status === HttpStatusCode.OK) {
          dispatch(updateLesson({ index, lesson }));
          showSuccessToast(LessonMessages.SUCCESS.UPDATE);
          setEditingLessonIndex(null);
          setIsAddingLesson(false);
        }
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || LessonMessages.ERROR.UPDATE
        );
      }
    },

    remove: async (index: number) => {
      try {
        const lesson = course.lessons[index];
        const response = await api.delete(
          `/lessons/${lesson.id}/courses/${course.id}`
        );

        if (response.status === HttpStatusCode.OK) {
          dispatch(removeLesson(index));
          showSuccessToast(LessonMessages.SUCCESS.REMOVE);
          setIsAddingLesson(false);
          setEditingLessonIndex(null);
        }
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || LessonMessages.ERROR.REMOVE
        );
      }
    },
  };

  const handleMaterialManagement = {
    add: async (lessonIndex: number, material: Material) => {
      try {
        const response = await api.post<string>("/materials", material);

        if (response.status === HttpStatusCode.Created) {
          dispatch(
            addMaterial({
              lessonIndex,
              material: { ...material, id: response.data },
            })
          );
          setIsAddingMaterial(false);
          showSuccessToast(MaterialMessages.SUCCESS.CREATE);
          return response.data;
        }
        return null;
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || MaterialMessages.ERROR.CREATE
        );
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
          `/materials/${material.id}`,
          material
        );

        if (response.status === HttpStatusCode.OK) {
          dispatch(
            updateMaterial({
              lessonIndex,
              materialIndex,
              material,
            })
          );
          setEditingMaterialIndex(null);
          showSuccessToast(MaterialMessages.SUCCESS.UPDATE);
          return true;
        }
        return false;
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || MaterialMessages.ERROR.UPDATE
        );
        return false;
      }
    },

    remove: async (lessonIndex: number, materialIndex: number) => {
      try {
        const material = course.lessons[lessonIndex].materials[materialIndex];
        const response = await api.delete(`/materials/${material.id}`);

        if (response.status === HttpStatusCode.OK) {
          dispatch(removeMaterial({ lessonIndex, materialIndex }));
          setEditingMaterialIndex(null);
          showSuccessToast(MaterialMessages.SUCCESS.REMOVE);
        }
      } catch (error: any) {
        showErrorToast(
          error.response.data.error || MaterialMessages.ERROR.REMOVE
        );
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
    handleDraftForRejectedCourse,
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
