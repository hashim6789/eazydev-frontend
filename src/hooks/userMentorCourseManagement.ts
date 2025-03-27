import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { Category, Course, Lesson, IMaterial, ILesson } from "../types";
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
} from "../store/slice";
import { showErrorToast, showSuccessToast } from "../utils";

export const useMentorCourseManagement = (isEditing: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { course, currentStep } = useSelector(
    (state: RootState) => state.course
  );

  const [isAddingLesson, setIsAddingLesson] = useState(false);

  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = useFormContext<Course>();

  const { data: categories } = useFetch<Category[]>("/api/categories");

  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [editingMaterialIndex, setEditingMaterialIndex] = useState<
    number | null
  >(null);

  // useEffect(() => {
  //   if (course.id) {
  //     setValue("title", course.title);
  //     setValue("price", course.price);
  //     setValue("description", course.description);
  //     setValue("category", course.category);
  //   }
  // }, [course, setValue]);

  const handleThumbnailUpload = async (
    fileKey: string,
    filePreview: string,
    fileName: string
  ) => {
    try {
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

  const handlePublishCourse = async () => {
    try {
      await api.patch(`/api/courses/${course.id}`, {
        newStatus: "requested",
      });
      navigate("/mentor/courses");
      dispatch(resetCourse());
      showSuccessToast(
        isEditing
          ? "Course update requested successfully."
          : "Course requested successfully."
      );
    } catch (error: any) {
      showErrorToast(
        error.response.data.error ||
          `An error occurred while publishing the course.`
      );
    }
  };

  const handleSaveDraft = () => {
    dispatch(resetCourse());
    showSuccessToast("Draft saved successfully.");
    navigate("/mentor/courses");
  };

  // Lesson Management Functions
  const handleLessonManagement = {
    add: async (lesson: Lesson) => {
      try {
        const response = await api.post<string>("/api/lessons", {
          ...lesson,
          mentorId: course.mentor.id,
          courseId: course.id,
          materials: materials.map((item) => item.id),
        });
        if (response.status === 201 && response.data) {
          dispatch(addLesson({ ...lesson, id: response.data }));
          showSuccessToast("lesson created successfully");
          setIsAddingLesson(false);
        }
      } catch (error: any) {
        showErrorToast(error.response.data.error || "lesson creation faild");
      }
    },

    update: (index: number, lesson: Lesson) =>
      dispatch(updateLesson({ index, lesson })),
    remove: (index: number) => dispatch(removeLesson(index)),
  };

  // Material Management Functions
  const handleMaterialManagement = {
    add: async (material: IMaterial) => {
      try {
        const response = await axios.post<{ material: IMaterial }>(
          `/api/materials`,
          material
        );
        if (response && response.status === 201) {
          setMaterials((prev) => [...prev, response.data.material]);
          setIsAddingMaterial(false);
          showSuccessToast("Material successfully created");
        }
      } catch (error) {
        showErrorToast("Failed to add material.");
      }
    },
    update: (index: number, material: IMaterial) => {
      if (editingMaterialIndex !== null) {
        setMaterials((prev) => {
          const updated = [...prev];
          updated[index] = material;
          return updated;
        });
        setEditingMaterialIndex(null);
      }
    },
    remove: (index: number) => {
      setMaterials((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    },
    startAdding: () => setIsAddingMaterial(true),
    stopAdding: () => setIsAddingMaterial(false),
    startEditing: (index: number) => setEditingMaterialIndex(index),
    stopEditing: () => setEditingMaterialIndex(null),
  };

  return {
    // register,
    // handleSubmit,
    // errors,
    categories: categories || [],
    course,
    currentStep,
    // setValue,
    handleThumbnailUpload,
    handleCourseSubmit,
    handlePublishCourse,
    handleSaveDraft,
    isAddingLesson,
    setIsAddingLesson,
    handleLessonManagement,
    handleMaterialManagement,
    isAddingMaterial,
    editingMaterialIndex,
    materials,
    setStep: (step: number) => dispatch(setCurrentStep(step)),
  };
};
