import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../configs";
import { showErrorToast, showSuccessToast } from "../../../utils";
import {
  ChangePasswordFormData,
  changePasswordSchema,
  VerifyPasswordFormData,
  verifyPasswordSchema,
} from "../../../schemas";
import { AuthMessages } from "../../../constants";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [isVerified, setIsVerified] = useState(false);

  const {
    register: registerVerifyPassword,
    handleSubmit: handleSubmitVerifyPassword,
    formState: { errors: errorsVerifyPassword },
  } = useForm<VerifyPasswordFormData>({
    resolver: zodResolver(verifyPasswordSchema),
  });

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
    setValue: setValueChangePassword,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const verifyCurrentPassword = async (data: VerifyPasswordFormData) => {
    try {
      const response = await api.post("/users/verify-password", data);
      if (response.status === 200) {
        showSuccessToast(AuthMessages.PASSWORD_VERIFIED_SUCCESS);
        setIsVerified(true);
      }
    } catch (error: any) {
      showErrorToast(error.response.data.error);
      console.error(error);
    }
  };

  const changePassword = async (data: ChangePasswordFormData) => {
    try {
      const response = await api.post("/users/change-password", data);
      if (response.status === 200) {
        showSuccessToast(AuthMessages.PASSWORD_CHANGE_SUCCESS);
        setIsVerified(false);
        setValueChangePassword("newPassword", "");
        setValueChangePassword("confirmPassword", "");
      }
    } catch (error: any) {
      showErrorToast(
        error.response.data.error || AuthMessages.PASSWORD_CHANGE_FAILED
      );
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Change Password</h3>

      {!isVerified ? (
        <form
          onSubmit={handleSubmitVerifyPassword(verifyCurrentPassword)}
          className="space-y-4"
        >
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Current Password
            </label>
            <input
              {...registerVerifyPassword("currentPassword")}
              type="password"
              placeholder="Enter current password"
              className={`w-full p-2 rounded-md border ${
                errorsVerifyPassword.currentPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 outline-none bg-transparent`}
            />
            {errorsVerifyPassword.currentPassword && (
              <p className="text-red-500 text-sm">
                {errorsVerifyPassword.currentPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              Verify Password
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitChangePassword(changePassword)}
          className="space-y-4"
        >
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              New Password
            </label>
            <input
              {...registerChangePassword("newPassword")}
              type="password"
              placeholder="Enter new password"
              className={`w-full p-2 rounded-md border ${
                errorsChangePassword.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 outline-none bg-transparent`}
            />
            {errorsChangePassword.newPassword && (
              <p className="text-red-500 text-sm">
                {errorsChangePassword.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Confirm New Password
            </label>
            <input
              {...registerChangePassword("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              className={`w-full p-2 rounded-md border ${
                errorsChangePassword.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 outline-none bg-transparent`}
            />
            {errorsChangePassword.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errorsChangePassword.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
