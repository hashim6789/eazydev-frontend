import { AxiosError } from "axios";
import { api } from "../configs";
import { showErrorToast } from "../utils";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

interface OtpData {
  email: string;
  otp: string;
}

interface forgetPasswordData {
  email: string;
}

export const AuthService = {
  loginService: async (
    data: LoginData
  ): Promise<{ status: number; message: string }> => {
    try {
      const response = await api.post<{ status: number; message: string }>(
        "/api/auth/login",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      showErrorToast(
        err.response?.data?.error || "Login failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Login failed.");
    }
  },

  registerService: async (
    data: RegisterData
  ): Promise<{ status: number; message: string }> => {
    try {
      const response = await api.post<{ status: number; message: string }>(
        "/api/auth/register",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  googleAuth: async (
    data: Omit<RegisterData, "password">
  ): Promise<{ status: number; message: string }> => {
    try {
      const response = await api.post<{ status: number; message: string }>(
        "/api/auth/google-auth",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Google authentication failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  otpVerificationService: async (
    data: OtpData
  ): Promise<{ status: number; message: string }> => {
    try {
      const response = await api.post<{ status: number; message: string }>(
        "/api/auth/otp",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "OTP validation failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
  forgetPasswordService: async (
    data: forgetPasswordData
  ): Promise<{ status: number; message: string }> => {
    try {
      const response = await api.post<{ status: number; message: string }>(
        "/api/auth/forgot-password",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "ForgetPassword Service failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
