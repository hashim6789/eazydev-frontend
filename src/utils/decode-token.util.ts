import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "../types/User";

// Interface for the decoded token payload (example)
interface DecodedToken {
  userId: string; // Replace with the actual properties of your token
  role: UserRole;
  exp: number;
}

export const decodeToken = (key: string): DecodedToken | null => {
  const token = Cookies.get(key);

  if (!token) {
    return null; // No token found in cookies
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    console.log("decode", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Invalid or expired token
  }
};
