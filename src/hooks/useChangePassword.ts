import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import { SubRole } from "../types";

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
        if (response.status === 200 && response.data.success) {
          setValid(true);
        }
      } catch (err: any) {
        setValid(false);
        setErrorMessage(
          err.response.data.error ||
            "Invalid or expired password reset link. Please try again."
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

      if (response.status === 200 && response.data.success) {
        showSuccessToast("Password reset successfully");
        navigate(`/${userRole}/login`);
      }
    } catch (error: any) {
      showErrorToast(error.response.data.error || "Failed to reset password");
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
