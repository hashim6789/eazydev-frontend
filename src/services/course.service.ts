// services/courseService.ts
import { api } from "../configs";
import { Category, MentorCourse } from "../types";

// Fetch categories
export const getCategories = async () => {
  const response = await api.get<{ data: Category[] }>("/categories");
  return response.data;
};

// Add a new course
export const createCourse = async (course: Partial<MentorCourse>) => {
  const lessonIds = course.lessons?.map((lesson) => lesson.id) || [];
  const postData = {
    ...course,
    lessons: lessonIds,
    category: course.category?.id,
  };
  const response = await api.post<{ course: MentorCourse }>(
    "/courses",
    postData
  );
  return response.data;
};

// Edit a course
export const updateCourse = async (
  courseId: string,
  updatedCourse: Partial<MentorCourse>
) => {
  const response = await api.put(`/courses/${courseId}`, updatedCourse);
  return response.data;
};

// Delete a course
export const removeCourse = async (courseId: string) => {
  const response = await api.delete(`/courses/${courseId}`);
  return response;
};

interface FetchCoursesParams {
  isAuthenticated: boolean;
  category?: string;
  range?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export const fetchCourses = async ({
  isAuthenticated,
  category = "",
  range = "",
  search = "",
  page = 1,
  limit = 10,
  sort = "",
}: FetchCoursesParams) => {
  const authPrefix = isAuthenticated ? "" : "/no-auth";
  const queryParams = new URLSearchParams({
    category,
    range,
    search,
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  const response = await api.get(
    `${authPrefix}/courses?${queryParams.toString()}`
  );
  return response.data;
};

import { Course, CourseStatus } from "../types/course";

export const submitCourse = async (
  data: Partial<Course>,
  isEditing: boolean,
  mentorId: string,
  courseId?: string
) => {
  const payload = {
    title: data.title,
    description: data.description,
    mentorId,
    categoryId: data.category?.id,
    thumbnail: data.thumbnail,
    price: data.price,
  };

  return isEditing
    ? api.put(`/courses/${courseId}`, payload)
    : api.post<string>("/courses", payload);
};

export const updateCourseStatus = async (
  courseId: string,
  newStatus: CourseStatus
) => {
  return api.patch(`/courses/${courseId}`, { newStatus });
};
