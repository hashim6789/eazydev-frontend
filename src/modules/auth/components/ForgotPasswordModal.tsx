import { UserThemeType } from "../../../types";
import { getUserThemeStyles } from "../../../utils";

// Forgot Password Modal Component
const ForgotPasswordModal: React.FC<{
  email: string;
  setEmail: (email: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  theme: UserThemeType;
}> = ({
  email,
  setEmail,
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
  theme,
}) => {
  const styles = getUserThemeStyles(theme);

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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSubmit(email)}
              className={`px-4 py-2 rounded-lg ${styles.primary} ${styles.hover} ${styles.buttonText} flex items-center justify-center`}
              disabled={loading}
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
          </div>
        </div>
      </div>
    </div>
  );
};
