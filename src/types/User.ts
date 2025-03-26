export type UserRole = "admin" | "learner" | "mentor";
export type ThemeType = "light" | "dark" | "colorful";
export type ModeType = "light" | "dark";
export type UserThemeType = "blue" | "purple" | "indigo" | "green" | "teal";
export type SubRole = Exclude<UserRole, "admin">;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
}
export type UserStatus = "blocked" | "unblocked";

export interface UserBaseDetails {
  id: string;
  firstName: string;
  lastName: string;
}
