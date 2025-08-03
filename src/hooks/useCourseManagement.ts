import Swal from "sweetalert2";
import { useState, useCallback } from "react";
import { Category, MentorCourse } from "../types";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../utils";
import { HttpStatusCode } from "../constants";
import {
  createCourse,
  getCategories,
  removeCourse,
  updateCourse,
} from "../services";

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
      const result = await getCategories();
      setCategories(result.data); // result is already response.data
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(err, "Failed to fetch categories");
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // Add a new course
  const addCourse = async (course: Partial<MentorCourse>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!course.category?.id) {
        showErrorToast("Course category not exist!");
        return false;
      }

      const result = await createCourse(course);
      if (result?.course) {
        showSuccessToast("Course created successfully!");
        handleSetCourse(result.course);
        return true;
      }

      return false;
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(err, "Failed to add course");
      showErrorToast(message);
      setError(message);
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
      const response = await updateCourse(courseId, updatedCourse);
      if (response && response.data) {
        showSuccessToast("Course updated successfully!");
      }
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(err, "Failed to update course");
      showErrorToast(message);
      setError(message);
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
        const response = await removeCourse(courseId);
        if (response && response.status === HttpStatusCode.OK) {
          showSuccessToast("Course deleted successfully!");
          return true;
        }
        showErrorToast("Course deleted failed!");
      } else {
        showInfoToast("Deletion canceled.");
      }
      return false;
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(err, "Failed to delete course");
      showErrorToast(message);
      setError(message);
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
