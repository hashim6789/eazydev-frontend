import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserThemeType } from "../../../types";
import { getUserThemeStyles } from "../../../utils";
import { RootState } from "../../../store";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../../schemas";

// Forgot Password Modal Component
export const ForgotPasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  theme: UserThemeType;
}> = ({ isOpen, onClose, onSubmit, theme }) => {
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const styles = getUserThemeStyles(theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.text}`}>
            Reset Password
          </h2>
          <p className="text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${styles.primary} ${styles.hover} ${styles.buttonText} flex items-center justify-center`}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
