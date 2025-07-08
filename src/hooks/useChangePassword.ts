import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../configs";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../utils";
import { SubRole } from "../types";
import { AuthMessages, HttpStatusCode } from "../constants";

const useChangePassword = (userRole: SubRole) => {
  const [isValid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { token } = useParams();

  // Validate token on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ success: boolean }>(
          `/auth/${token}/reset-password?role=${userRole}`
        );
        if (response.status === HttpStatusCode.OK && response.data.success) {
          setValid(true);
        }
      } catch (error: unknown) {
        setValid(false);
        setErrorMessage(
          getAxiosErrorMessage(error, AuthMessages.ERROR.RESET_LINK_EXPIRED)
        );
      }
    };
    fetchData();
  }, [token, userRole]);

  // Handle password submission
  const handleSubmit = async (password: string) => {
    try {
      setLoading(true);
      const response = await api.patch<{ success: boolean }>(
        `/auth/reset-password`,
        {
          password,
          role: userRole,
        }
      );

      if (response.status === HttpStatusCode.OK && response.data.success) {
        showSuccessToast(AuthMessages.SUCCESS.RESET_PASSWORD);
        navigate(`/${userRole}/login`);
      }
    } catch (error: unknown) {
      showErrorToast(
        getAxiosErrorMessage(error, AuthMessages.ERROR.RESET_PASSWORD)
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    isValid,
    loading,
    errorMessage,
    handleSubmit,
  };
};

export default useChangePassword;
