export type UserRole = "admin" | "learner" | "mentor";
export type ThemeType = "light" | "dark" | "colorful";
export type UserThemeType = "blue" | "purple" | "indigo" | "green";
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
