import React from "react";
import { Timer, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useOtp from "../../../hooks/userOtp";
import { UserRole, UserThemeType } from "../../../types";
import { getUserThemeStyles } from "../../../utils";
import { getUserProperty } from "../../../utils/local-user.util";

// Theme utilities
export const userThemeSelector = (user: UserRole): UserThemeType => {
  if (user === "admin") {
    return "green";
  } else if (user === "mentor") {
    return "purple";
  } else {
    return "blue";
  }
};

interface OTPInputProps {
  userRole: UserRole;
  title?: string;
  subtitle?: string;
}

const OtpVerificationComponent: React.FC<OTPInputProps> = ({
  userRole,
  title = "Verify OTP",
  subtitle = "Enter the 6-digit code sent to your device",
}) => {
  // Get theme based on user role
  const theme = userThemeSelector(userRole);
  const styles = getUserThemeStyles(theme);

  // Use the provided custom hook
  const {
    otp,
    timer,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    resendOtp,
    handleVerify,
  } = useOtp();

  // Get error state from Redux store
  const { error } = useSelector((state: RootState) => state.auth);

  // Determine if the verification button should be disabled
  const isVerifyDisabled = !otp.every((digit) => digit !== "");

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${styles.lightBg}`}
    >
      <div
        className={`w-full max-w-md mx-4 bg-white p-8 rounded-xl shadow-lg border ${styles.border}`}
      >
        <h2 className={`text-2xl font-bold text-center mb-3 ${styles.text}`}>
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-8">{subtitle}</p>

        {error && (
          <div className="mb-6 py-2 px-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg 
                ${styles.inputFocus} focus:ring-2 outline-none transition-all
                ${digit ? styles.activeBorder : styles.border}`}
              autoComplete="one-time-code"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-5">
          <div
            className={`flex items-center justify-center px-4 py-2 rounded-full ${styles.mediumBg}`}
          >
            <Timer className={`w-4 h-4 mr-2 ${styles.text}`} />
            <span className={`font-medium ${styles.text}`}>
              {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={resendOtp}
            disabled={timer > 0}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all
              ${
                timer > 0
                  ? "bg-gray-200 text-gray-500"
                  : `${styles.primary} ${styles.hover} ${styles.buttonText}`
              }`}
          >
            {timer > 0 ? `Wait to resend (${timer}s)` : "Resend OTP"}
          </button>

          <button
            onClick={() => handleVerify(getUserProperty("id") as string)}
            disabled={isVerifyDisabled}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
              ${
                isVerifyDisabled
                  ? "bg-gray-200 text-gray-500"
                  : `${styles.primary} ${styles.hover} ${styles.buttonText} bg-gradient-to-r ${styles.gradient}`
              }`}
          >
            <span>Verify</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationComponent;
