import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../utils";
import { SubRole } from "../types";
import { resetPassword, validateResetToken } from "../services";

const useChangePassword = (userRole: SubRole) => {
  const [isValid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  // Validate token on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await validateResetToken(token as string, userRole);

        if (response.success) {
          setValid(true);
        }
      } catch (err: unknown) {
        setValid(false);

        const message = getAxiosErrorMessage(
          err,
          "Invalid or expired password reset link. Please try again."
        );
        setErrorMessage(message);
      }
    };
    fetchData();
  }, [token, userRole]);

  // Handle password submission
  const handleSubmit = async (password: string) => {
    try {
      setLoading(true);

      const data = await resetPassword(password, userRole);

      if (data.success) {
        showSuccessToast("Password reset successfully");
        navigate(`/${userRole}/login`);
      }
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, "Failed to reset password");
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
