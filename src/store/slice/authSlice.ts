import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces";
import { User, UserRole } from "../../types";
import { showErrorToast, showSuccessToast } from "../../utils";
import { AuthMessages } from "../../constants";

import { getUserProperty } from "../../utils/local-user.util";

const isBlocked = (getUserProperty("isBlocked") ?? false) as boolean;
const isVerified = (getUserProperty("isVerified") ?? "learner") as boolean;
const role = (getUserProperty("role") ?? "learner") as UserRole;
const isAuthenticated = ((!getUserProperty("isBlocked") &&
  getUserProperty("isVerified")) ??
  false) as boolean;

const initialState: AuthState = {
  isAuthenticated,
  isVerified,
  isBlocked,
  user: role,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user.role;
      state.isVerified = true;
      state.isBlocked = false;
      state.loading = false;
      state.error = null;

      try {
        // localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to store tokens in localStorage:", error);
      }
      showSuccessToast(AuthMessages.SUCCESS.LOGIN);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = "learner";
      state.isBlocked = true;
      state.isVerified = false;
      state.loading = false;
      state.error = null;
      try {
        localStorage.removeItem("data");
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Failed to delete tokens in localStorage:", error);
      }
      showSuccessToast(AuthMessages.SUCCESS.LOGOUT);
    },
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user.role;
      state.isVerified = false;
      state.isBlocked = false;
      state.loading = false;
      state.error = null;

      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to store tokens in localStorage:", error);
      }
      showSuccessToast(AuthMessages.SUCCESS.SIGNUP);
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload);
    },
    verifyOtpStart(state) {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user.role;
      state.isVerified = true;
      state.isBlocked = false;
      state.loading = false;
      state.error = null;

      try {
        localStorage.removeItem("otpTimer");
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to store tokens in localStorage:", error);
      }
      showSuccessToast(AuthMessages.SUCCESS.VERIFY_OTP);
    },
    verifyOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isVerified = false;
      state.error = action.payload;
      showErrorToast(action.payload);
    },
    googleSignupStart(state) {
      state.loading = true;
      state.error = null;
    },
    googleSignupSuccess(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user.role;
      state.isVerified = true;
      state.isBlocked = false;
      state.loading = false;
      state.error = null;

      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to store tokens in localStorage:", error);
      }
      showSuccessToast(AuthMessages.SUCCESS.LOGIN);
    },
    googleSignupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.isBlocked = true;
      showErrorToast(action.payload);
    },
    forgotPasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
      state.error = null;
      showSuccessToast(AuthMessages.SUCCESS.RESET_LINK_SEND);
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      showErrorToast(action.payload);
    },
  },
});

export const {
  setAuthState,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  googleSignupStart,
  googleSignupSuccess,
  googleSignupFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  setLoading,
  setError,
} = authSlice.actions;

export const authReducers = authSlice.reducer;
