import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces";
import { UserRole } from "../../types";

const initialState: AuthState = {
  isAuthenticated: false,
  isVerified: false,
  isBlocked: false,
  user: "learner",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserRole>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = "learner";
      state.loading = false;
      state.error = null;
    },
    verifyUser(state) {
      state.isVerified = true;
    },
    blockUser(state) {
      state.isBlocked = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, verifyUser, blockUser, setLoading, setError } =
  authSlice.actions;

export const authReducers = authSlice.reducer;
