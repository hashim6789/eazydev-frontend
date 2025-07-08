import { api } from "../configs";
import { getAxiosErrorMessage, showErrorToast } from "../utils";
import { AuthMessages } from "../constants";

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
      showErrorToast(getAxiosErrorMessage(error, AuthMessages.ERROR.LOGIN));
      throw new Error(getAxiosErrorMessage(error, AuthMessages.ERROR.LOGIN));
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
      showErrorToast(getAxiosErrorMessage(error, AuthMessages.ERROR.SIGNUP));
      throw new Error(getAxiosErrorMessage(error, AuthMessages.ERROR.SIGNUP));
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
      showErrorToast(getAxiosErrorMessage(error, AuthMessages.ERROR.SIGNUP));
      throw new Error(getAxiosErrorMessage(error, AuthMessages.ERROR.SIGNUP));
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
      showErrorToast(
        getAxiosErrorMessage(error, AuthMessages.ERROR.VERIFY_OTP)
      );
      throw new Error(
        getAxiosErrorMessage(error, AuthMessages.ERROR.VERIFY_OTP)
      );
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
      showErrorToast(
        getAxiosErrorMessage(error, AuthMessages.ERROR.FORGOT_PASSWORD)
      );
      throw new Error(
        getAxiosErrorMessage(error, AuthMessages.ERROR.FORGOT_PASSWORD)
      );
    }
  },
};
