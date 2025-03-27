import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseStatus, ICourse, ILesson, Lesson } from "../../types";
import { getUserProperty } from "../../utils/local-user.util";

interface CourseState {
  course: Course;
  currentStep: number;
}

const initialState: CourseState = {
  course: {
    id: "",
    title: "",
    mentor: {
      id: getUserProperty("id") as string,
      firstName: getUserProperty("firstName") as string,
      lastName: getUserProperty("lastName") as string,
      profilePicture: getUserProperty("profilePicture") as string,
    },
    category: {
      id: "",
      title: "",
    },
    description: "",
    thumbnail: "",
    lessons: [],
    price: 0,
    status: "draft",
  },
  currentStep: 1,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setFetchedCourseDetails(state, action: PayloadAction<Course>) {
      state.course = action.payload;
    },
    setCourseDetails(state, action: PayloadAction<Partial<Course>>) {
      state.course = { ...state.course, ...action.payload };
    },
    updateCourseStatus(
      state,
      action: PayloadAction<{ newStatus: CourseStatus }>
    ) {
      const { newStatus } = action.payload;
      state.course.status = newStatus;
    },
    addLesson(state, action: PayloadAction<Lesson>) {
      state.course.lessons.push(action.payload);
    },

    setThumbnail(state, action: PayloadAction<{ thumbnail: string }>) {
      const { thumbnail } = action.payload;
      console.log("thumbnail", thumbnail);
      state.course.thumbnail = thumbnail;
    },
    updateLesson(
      state,
      action: PayloadAction<{ index: number; lesson: Lesson }>
    ) {
      const { index, lesson } = action.payload;
      state.course.lessons[index] = lesson;
    },
    removeLesson(state, action: PayloadAction<number>) {
      state.course.lessons.splice(action.payload, 1);
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetCourse(state) {
      state.course = initialState.course;
      state.currentStep = 1;
    },
    removeCourseDetails(state) {
      state.course = initialState.course;
    },
  },
});

export const {
  setFetchedCourseDetails,
  setCourseDetails,
  addLesson,
  updateLesson,
  removeLesson,
  setCurrentStep,
  resetCourse,
  setThumbnail,
  updateCourseStatus,
  removeCourseDetails,
} = courseSlice.actions;

export const courseReducers = courseSlice.reducer;
