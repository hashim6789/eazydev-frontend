import { api } from "../configs";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, User, UserRole } from "../types";
import { HttpStatusCode } from "../constants";

// Login
export const loginService = async (
  credentials: LoginSchema,
  role: UserRole
): Promise<User> => {
  const response = await api.post(`/auth/login`, { ...credentials, role });
  if (response.status === HttpStatusCode.OK) {
    return response.data;
  }
  throw new Error("Login failed");
};

// Signup
export const signupService = async (
  credentials: SignupSchema,
  role: SubRole
): Promise<User> => {
  const response = await api.post(`/auth/signup`, { ...credentials, role });
  if (response.status === HttpStatusCode.Created) {
    return response.data;
  }
  throw new Error("Signup failed");
};

// Google Signup
export const googleSignupService = async (
  googleToken: string,
  role: SubRole
): Promise<User> => {
  const response = await api.post(`/auth/google`, { googleToken, role });
  if (response.status === HttpStatusCode.OK) {
    return response.data.user;
  }
  throw new Error("Google signup failed");
};

// Forgot Password
export const forgotPasswordService = async (
  data: ForgotPasswordSchema,
  role: SubRole
): Promise<void> => {
  const response = await api.post(`/auth/forgot-password`, {
    email: data.email,
    role,
  });
  if (response.status !== HttpStatusCode.OK) {
    throw new Error("Forgot password failed");
  }
};

// Logout
export const logoutService = async (
  role: UserRole,
  userId: string
): Promise<void> => {
  const response = await api.post(`/auth/logout`, { role, userId });
  if (response.status !== HttpStatusCode.OK) {
    throw new Error("Logout failed");
  }
};

export const validateResetTokenService = async (
  token: string,
  role: SubRole
) => {
  const response = await api.get<{ success: boolean }>(
    `/auth/${token}/reset-password?role=${role}`
  );
  if (response.status === HttpStatusCode.OK && response.data.success) {
    return response.data;
  }
  throw new Error("Token validation failed");
};

export const resetPasswordService = async (password: string, role: SubRole) => {
  const response = await api.patch<{ success: boolean }>(
    `/auth/reset-password`,
    {
      password,
      role,
    }
  );
  if (response.status === HttpStatusCode.OK && response.data.success) {
    return response.data;
  }
  throw new Error("Password Reset failed");
};

// Resend OTP
export const resendOtpService = async (): Promise<boolean> => {
  const response = await api.post(`/auth/otp-resend`);
  return response.status === HttpStatusCode.Created;
};

// Verify OTP
export const verifyOtpService = async (
  otp: string,
  userId: string
): Promise<User> => {
  const response = await api.post<User>(`/auth/otp-verify`, {
    otp,
    userId,
  });

  if (response.status === HttpStatusCode.OK) {
    return response.data;
  }

  throw new Error("OTP verification failed");
};
