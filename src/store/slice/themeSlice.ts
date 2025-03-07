import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../interfaces";
import { ThemeType } from "../../types/User";

const initialState: ThemeState = {
  basicTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.basicTheme = action.payload;
    },
    toggleTheme(state) {
      state.basicTheme = state.basicTheme === "light" ? "dark" : "light";
    },
  },
});
export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducers = themeSlice.reducer;
