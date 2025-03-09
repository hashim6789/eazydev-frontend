import axios from "axios";
import { config } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import { AuthMessages } from "../constants";
import { User } from "../types";

// refreshAuth logic
export const refreshAuth = async (
  isAuthenticated: boolean
): Promise<User | null> => {
  try {
    if (isAuthenticated) {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/refresh/user`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const user = response.data.user as User;

        // Show success toast
        showSuccessToast(AuthMessages.LOGIN_SUCCESS);

        // Return the user object
        return user;
      }
    }
    return null;
  } catch (err) {
    // Show error toast
    showErrorToast(AuthMessages.LOGIN_FAILED);

    console.error(AuthMessages.LOGIN_FAILED, err);
    throw err;
  }
};
