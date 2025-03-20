import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseStatus, ICourse, ILesson } from "../../types";
import { getUserProperty } from "../../utils/local-user.util";

interface CourseState {
  course: ICourse;
  currentStep: number;
}

const initialState: CourseState = {
  course: {
    id: "",
    title: "",
    mentorId: getUserProperty("id") as string, // This would typically be filled via authentication
    categoryId: "",
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
    setCourseDetails(state, action: PayloadAction<Partial<ICourse>>) {
      state.course = { ...state.course, ...action.payload };
    },
    updateCourseStatus(
      state,
      action: PayloadAction<{ newStatus: CourseStatus }>
    ) {
      const { newStatus } = action.payload;
      state.course.status = newStatus;
    },
    addLesson(state, action: PayloadAction<ILesson>) {
      state.course.lessons.push(action.payload);
    },

    setThumbnail(state, action: PayloadAction<{ thumbnail: string }>) {
      const { thumbnail } = action.payload;
      console.log("thumbnail", thumbnail);
      state.course.thumbnail = thumbnail;
    },
    updateLesson(
      state,
      action: PayloadAction<{ index: number; lesson: ILesson }>
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
