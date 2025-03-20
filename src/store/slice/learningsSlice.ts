import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProgressLesson, ProgressMaterial } from "../../types";

interface LearningProgressState {
  lessons: ProgressLesson[];
  currentMaterial: ProgressMaterial | null;
  loading: boolean;
  error: { message: string; code: number } | null;
  overallProgress: number;
  currentPage: number;
  totalPages: number;
}

const initialState: LearningProgressState = {
  lessons: [],
  currentMaterial: null,
  loading: false,
  error: null,
  overallProgress: 0,
  currentPage: 1,
  totalPages: 1,
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<ProgressLesson[]>) {
      state.lessons = action.payload;
    },
    setCurrentMaterial(state, action: PayloadAction<ProgressMaterial | null>) {
      state.currentMaterial = action.payload;
    },
    updateMaterialProgress(
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>
    ) {
      const lesson = state.lessons.find((lesson) =>
        lesson.materials.some((material) => material.id === action.payload.id)
      );
      if (lesson) {
        const material = lesson.materials.find(
          (material) => material.id === action.payload.id
        );
        if (material) {
          material.isCompleted = action.payload.isCompleted;
        }
      }
    },
    updateLessonProgress(state, action: PayloadAction<{ lessonId: string }>) {
      const lesson = state.lessons.find(
        (lesson) => lesson.id === action.payload.lessonId
      );
      if (lesson) {
        lesson.isCompleted = lesson.materials.every(
          (material) => material.isCompleted
        );
      }
    },
    calculateOverallProgress(state) {
      const totalMaterials = state.lessons.reduce(
        (sum, lesson) => sum + lesson.materials.length,
        0
      );
      const completedMaterials = state.lessons.reduce(
        (sum, lesson) =>
          sum +
          lesson.materials.filter((material) => material.isCompleted).length,
        0
      );
      state.overallProgress =
        totalMaterials > 0
          ? Math.round((completedMaterials / totalMaterials) * 100)
          : 0;
    },
    resetProgress(state) {
      state.lessons.forEach((lesson) => {
        lesson.isCompleted = false;
        lesson.materials.forEach((material) => {
          material.isCompleted = false;
        });
      });
      state.currentMaterial = null;
      state.overallProgress = 0;
    },
    setLearningsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLearningsError(
      state,
      action: PayloadAction<{ message: string; code: number } | null>
    ) {
      state.error = action.payload;
    },
  },
});

export const {
  setLessons,
  setCurrentMaterial,
  updateMaterialProgress,
  updateLessonProgress,
  calculateOverallProgress,
  resetProgress,
  setLearningsError,
  setLearningsLoading,
} = learningSlice.actions;

export const learningsReducers = learningSlice.reducer;
