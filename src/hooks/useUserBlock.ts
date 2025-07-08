import { useState } from "react";

import { SubRole } from "../types";
import { api } from "../configs";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../utils";
import { showConfirmationBox } from "../utils/confirm-box.utils";
import { UserMessages } from "../constants/user.constant";
import { HttpStatusCode, ResponseErrorMessages } from "../constants";

interface UseBlockUnblockResponse {
  isLoading: boolean;
  error: string | null;
  handleBlockUnblock: (
    id: string,
    role: SubRole,
    currentStatus: boolean
  ) => Promise<boolean>;
}

const useUserBlock = (): UseBlockUnblockResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlockUnblock = async (
    id: string,
    role: SubRole,
    currentStatus: boolean
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const action = currentStatus ? "unblock" : "block";
      const change = currentStatus ? false : true;

      const isConfirmed = await showConfirmationBox(action, role, change);

      if (isConfirmed) {
        const endpoint = `/users/${id}/block`;

        // API call to block/unblock
        const response = await api.patch(endpoint, { change });
        console.log(response.data, response.data);

        if (response.status === HttpStatusCode.OK) {
          if (response.data) {
            showSuccessToast(UserMessages.USER_BLOCK_SUCCESS);
          } else {
            showSuccessToast(UserMessages.USER_UNBLOCK_SUCCESS);
          }

          return true;
        }
      } else {
        showInfoToast(UserMessages.ACTION_CANCELLED);
      }
      return false;
    } catch (error: unknown) {
      showErrorToast(
        getAxiosErrorMessage(error, ResponseErrorMessages.ERROR.UNEXPECTED)
      );
      setError(
        getAxiosErrorMessage(error, ResponseErrorMessages.ERROR.UNEXPECTED)
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleBlockUnblock,
  };
};

export default useUserBlock;
