import { useState } from "react";

import { SubRole } from "../types";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../utils";
import { showConfirmationBox } from "../utils/confirm-box.utils";
import { UserMessages } from "../constants/user.constant";
import { ResponseMessages } from "../constants";
import { toggleUserBlockStatus } from "../services";

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
        const result = await toggleUserBlockStatus(id, change);

        if (result === "blocked") {
          showSuccessToast(UserMessages.SUCCESS.USER_BLOCK);
        } else if (result === "unblocked") {
          showSuccessToast(UserMessages.SUCCESS.USER_UNBLOCK);
        }

        return true;
      } else {
        showInfoToast(UserMessages.ERROR.ACTION_CANCELLED);
        return false;
      }
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(
        err,
        ResponseMessages.ERROR.ERROR_OCCURRED
      );

      setError(message);
      showErrorToast(message);
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
