import { api } from "../configs";
import { Lesson } from "../types";

interface FetchLessonsParams {
  search?: string;
  page?: number;
  limit?: number;
}

// Fetch paginated lessons
export const fetchLessons = async ({
  search = "",
  page = 1,
  limit = 10,
}: FetchLessonsParams) => {
  const queryParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await api.get(`/lessons?${queryParams.toString()}`);
  return response.data;
};

// Delete a lesson
export const deleteLesson = async (lessonId: string) => {
  const response = await api.delete(`/lessons/${lessonId}`);
  return response;
};

export const createLessonService = async (
  lesson: Lesson,
  mentorId: string,
  courseId: string,
  materialIds: string[]
) => {
  return api.post<string>("/lessons", {
    ...lesson,
    mentorId,
    courseId,
    materials: materialIds,
  });
};

export const editLessonService = async (
  lesson: Lesson,
  mentorId: string,
  courseId: string,
  materialIds: string[]
) => {
  return api.put<string>(`/lessons/${lesson.id}`, {
    ...lesson,
    mentorId,
    courseId,
    materials: materialIds,
  });
};

export const removeLessonService = async (
  lessonId: string,
  courseId: string
) => {
  return api.delete(`/lessons/${lessonId}/courses/${courseId}`);
};
