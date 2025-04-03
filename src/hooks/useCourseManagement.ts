import Swal from "sweetalert2";
import { useState, useCallback } from "react";
import { api, config } from "../configs";
import { Category, MentorCourse } from "../types";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils";

const baseUrl = config.API_BASE_URL;

const useCourseManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<MentorCourse | null>(null);
  const handleSetCourse = (course: MentorCourse) => {
    setCourse(course);
  };

  // Fetch categories (only if not already fetched)
  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/categories`);
      const result = response.data;
      console.log(result);
      setCategories(result.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, categories]);

  // Add a new course
  const addCourse = async (course: Partial<MentorCourse>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!course.category || !course.category.id) {
        showErrorToast("Course category not exist!");
        return false;
      }

      const lessonIds = course.lessons
        ? course.lessons.map((course) => course.id)
        : [];

      const postData = {
        ...course,
        lessons: lessonIds,
        category: course.category.id,
      };
      const response = await api.post(`/courses`, postData);

      if (response && response.data) {
        showSuccessToast("Course created successfully!");
        handleSetCourse(response.data.course);
        return true;
      }

      return false;
    } catch (err: any) {
      showErrorToast(err.response.data.message || "Failed to add course");
      setError(err.response.data.message || "Failed to add course");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Edit a course
  const editCourse = async (
    courseId: string,
    updatedCourse: Partial<MentorCourse>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/courses/${courseId}`, updatedCourse);
      if (response && response.data) {
        showSuccessToast("Course updated successfully!");
      }
    } catch (err: any) {
      showErrorToast("Failed to update course");
      setError(err.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  // Delete a course
  const deleteCourse = async (courseId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await api.delete(`/courses/${courseId}`);
        if (response && response.status === 200) {
          showSuccessToast("Course deleted successfully!");
          return true;
        }
        showErrorToast("Course deleted failed!");
      } else {
        showInfoToast("Deletion canceled.");
      }
      return false;
    } catch (err: any) {
      showErrorToast("Failed to delete course");
      setError(err.response?.data?.message || "Failed to delete course");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    categories,
    fetchCategories,
    addCourse,
    editCourse,
    deleteCourse,
    course,
  };
};

export default useCourseManagement;
