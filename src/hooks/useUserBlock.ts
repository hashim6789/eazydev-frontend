import { useState } from "react";
import axios from "axios";

import { SubRole } from "../types";
import { api } from "../configs";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils";
import { showConfirmationBox } from "../utils/confirm-box.utils";
import { UserMessages } from "../constants/user.constant";
import { ResponseErrorMessages } from "../constants";

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
        const endpoint = `/api/users/${id}/block`;

        // API call to block/unblock
        const response = await api.patch(endpoint, { change });
        console.log(response.data, response.data);

        if (response.status === 200) {
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
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || ResponseErrorMessages.ERROR_OCCURRED;
        setError(errorMessage);
        showErrorToast(errorMessage);
      } else {
        setError(ResponseErrorMessages.UNEXPECTED_ERROR);
        showErrorToast(ResponseErrorMessages.UNEXPECTED_ERROR);
      }
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
