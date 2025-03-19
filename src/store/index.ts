import { configureStore } from "@reduxjs/toolkit";

// import socketReducers from "./slices/socketSlice";
import {
  authReducers,
  courseReducers,
  materialReducers,
  themeReducers,
} from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    theme: themeReducers,
    material: materialReducers,
    course: courseReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
