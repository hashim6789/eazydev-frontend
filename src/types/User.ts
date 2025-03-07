export type UserRole = "admin" | "learner" | "mentor";
export type ThemeType = "light" | "dark" | "colorful";
export type UserThemeType = "blue" | "purple" | "green";
export type SubRole = Exclude<UserRole, "admin">;
