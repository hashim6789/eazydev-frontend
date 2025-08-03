import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../utils";
import { SubRole } from "../types";
import { resetPasswordService, validateResetTokenService } from "../services";
import { AuthMessages } from "../constants";

const useChangePassword = (userRole: SubRole) => {
  const [isValid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const { ERROR, SUCCESS } = AuthMessages;

  // Validate token on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await validateResetTokenService(
          token as string,
          userRole
        );

        if (response.success) {
          setValid(true);
        }
      } catch (error: unknown) {
        setValid(false);
        const message = getAxiosErrorMessage(error, ERROR.RESET_LINK_GET);

        setErrorMessage(message);
      }
    };
    fetchData();
  }, [token, userRole]);

  // Handle password submission
  const handleSubmit = async (password: string) => {
    try {
      setLoading(true);

      const data = await resetPasswordService(password, userRole);

      if (data.success) {
        showSuccessToast(SUCCESS.PASSWORD_CHANGE);
        navigate(`/${userRole}/login`);
      }
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.PASSWORD_RESET);
      showErrorToast(message);
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
