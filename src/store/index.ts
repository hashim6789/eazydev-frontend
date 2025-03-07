import { configureStore } from "@reduxjs/toolkit";

// import socketReducers from "./slices/socketSlice";
import { authReducers } from "./slice";
import { themeReducers } from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    theme: themeReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
