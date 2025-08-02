import { api } from "../configs";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, User, UserRole } from "../types";
import { HttpStatusCode } from "../constants";

// Login
export const login = async (
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
export const signup = async (
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
export const googleSignup = async (
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
export const forgotPassword = async (
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
export const logout = async (role: UserRole, userId: string): Promise<void> => {
  const response = await api.post(`/auth/logout`, { role, userId });
  if (response.status !== HttpStatusCode.OK) {
    throw new Error("Logout failed");
  }
};

export const validateResetToken = async (token: string, role: SubRole) => {
  const response = await api.get<{ success: boolean }>(
    `/auth/${token}/reset-password?role=${role}`
  );
  if (response.status === HttpStatusCode.OK && response.data.success) {
    return response.data;
  }
  throw new Error("Token validation failed");
};

export const resetPassword = async (password: string, role: SubRole) => {
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
