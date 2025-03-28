import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseStatus, Lesson, Material } from "../../types";
import { getUserProperty } from "../../utils/local-user.util";

interface CourseState {
  isEditing: boolean;
  course: Course;
  currentStep: number;
}

const initialState: CourseState = {
  isEditing: false,
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
      isListed: true,
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
    // Existing reducers
    setEditingStatus(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
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

    // New material-related reducers
    addMaterial(
      state,
      action: PayloadAction<{ lessonIndex: number; material: Material }>
    ) {
      const { lessonIndex, material } = action.payload;
      if (state.course.lessons[lessonIndex]) {
        state.course.lessons[lessonIndex].materials.push(material);
      }
    },
    updateMaterial(
      state,
      action: PayloadAction<{
        lessonIndex: number;
        materialIndex: number;
        material: Material;
      }>
    ) {
      const { lessonIndex, materialIndex, material } = action.payload;
      if (
        state.course.lessons[lessonIndex] &&
        state.course.lessons[lessonIndex].materials[materialIndex]
      ) {
        state.course.lessons[lessonIndex].materials[materialIndex] = material;
      }
    },
    removeMaterial(
      state,
      action: PayloadAction<{ lessonIndex: number; materialIndex: number }>
    ) {
      const { lessonIndex, materialIndex } = action.payload;
      if (
        state.course.lessons[lessonIndex] &&
        state.course.lessons[lessonIndex].materials[materialIndex]
      ) {
        state.course.lessons[lessonIndex].materials.splice(materialIndex, 1);
      }
    },
  },
});

export const {
  setFetchedCourseDetails,
  setCourseDetails,
  addLesson,
  updateLesson,
  setEditingStatus,
  removeLesson,
  setCurrentStep,
  resetCourse,
  setThumbnail,
  updateCourseStatus,
  removeCourseDetails,
  addMaterial,
  updateMaterial,
  removeMaterial, // New exports
} = courseSlice.actions;

export const courseReducers = courseSlice.reducer;
