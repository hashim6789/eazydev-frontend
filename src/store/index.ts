import { configureStore } from "@reduxjs/toolkit";

// import socketReducers from "./slices/socketSlice";
import {
  authReducers,
  courseReducers,
  groupReducers,
  learningsReducers,
  materialReducers,
  messageReducers,
  themeReducers,
} from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    theme: themeReducers,
    material: materialReducers,
    course: courseReducers,
    learnings: learningsReducers,
    group: groupReducers,
    message: messageReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
