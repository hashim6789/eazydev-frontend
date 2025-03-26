import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordFormData, changePasswordSchema } from "../../../schemas";
import { SubRole } from "../../../types";
import useChangePassword from "../../../hooks/useChangePassword";

interface ChangePasswordPageProps {
  role: SubRole;
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({ role }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    isValid,
    loading,
    errorMessage,
    handleSubmit: submitPassword,
  } = useChangePassword(role);

  const onSubmit = async (data: ChangePasswordFormData) => {
    await submitPassword(data.newPassword);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-500 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-lg">Secure your account with a new password.</p>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto text-center">
          {isValid ? (
            <>
              <h1 className="text-2xl font-semibold mb-2 text-purple-500">
                Change Password
              </h1>
              <p className="text-gray-600 mb-6">
                Set a new password for your account.
              </p>

              {loading && (
                <div className="text-center py-4">
                  <p className="text-purple-500">Processing...</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.newPassword && (
                    <div className="text-sm text-purple-500">
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <div className="text-sm text-purple-500">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  disabled={isSubmitting || loading}
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-red-600">Error</h2>
              <p className="text-gray-600 mt-4">{errorMessage}</p>
              <a
                href="/"
                className="text-purple-500 mt-4 inline-block cursor-pointer"
              >
                Go back to homepage
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
