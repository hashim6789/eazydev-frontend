import { UserRole } from "../types";

export const getUserProperty = (key: keyof UserData) => {
  const userData = localStorage.getItem("user");

  if (!userData) return null;

  try {
    const parsedData: UserData = JSON.parse(userData);
    return parsedData[key] ?? null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  profilePicture: string;
  isBlocked: boolean;
  isVerified: boolean;
  role: UserRole;
}
