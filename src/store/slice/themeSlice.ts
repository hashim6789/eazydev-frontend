import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../interfaces";
import { ModeType, UserThemeType } from "../../types/User";

// Define initial state with both theme mode and color theme
const initialState: ThemeState = {
  mode: (localStorage.getItem("themeMode") as ModeType) || "light",
  color: (localStorage.getItem("colorTheme") as UserThemeType) || "purple",
};

// Create detailed theme slice with more actions
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Set the mode (light/dark)
    setThemeMode(state, action: PayloadAction<ModeType>) {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },

    // Toggle between light and dark
    toggleThemeMode(state) {
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      localStorage.setItem("themeMode", newMode);
    },

    // Set color theme (purple, blue, green, etc.)
    setColorTheme(state, action: PayloadAction<UserThemeType>) {
      state.color = action.payload;
      localStorage.setItem("colorTheme", action.payload);
    },
  },
});

// Export actions
export const { setThemeMode, toggleThemeMode, setColorTheme } =
  themeSlice.actions;

// Export reducer
export const themeReducers = themeSlice.reducer;
