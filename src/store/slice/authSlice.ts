import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces";
import { User } from "../../types";
import { showErrorToast, showSuccessToast } from "../../utils";
import { AuthMessages } from "../../constants";

import { decodeToken } from "../../utils/decode-token.util";
import { getUserProperty } from "../../utils/local-user.util";

const decode = decodeToken("accessToken");
// const storedData = JSON.parse(localStorage.getItem("data") ?? "{}") as {
//   isBlocked?: boolean;
//   isVerified?: boolean;
// };

const isBlocked = (getUserProperty("isBlocked") ?? false) as boolean;
const isVerified = (getUserProperty("isVerified") ?? false) as boolean;
const initialState: AuthState = {
  isAuthenticated: !!decode,
  isVerified,
  isBlocked,
  user: decode ? decode.role : "learner",
  loading: false,
  error: null,
};

// Initial state for auth
// export const initialState: AuthState = {
//   isAuthenticated: false,
//   isVerified: false,
//   isBlocked: false,
//   user: "learner",
//   loading: false,
//   error: null,
// };

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
      showSuccessToast(AuthMessages.LOGIN_SUCCESS);
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
      showSuccessToast(AuthMessages.LOGOUT_SUCCESS);
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
      showSuccessToast(AuthMessages.SIGNUP_SUCCESS);
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
      showSuccessToast(AuthMessages.VERIFY_OTP_SUCCESS);
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
      showSuccessToast(AuthMessages.LOGIN_SUCCESS);
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
      showSuccessToast(AuthMessages.RESET_LINK_SEND_SUCCESS);
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
