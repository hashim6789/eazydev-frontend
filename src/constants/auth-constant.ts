export const AuthMessages = {
  SUCCESS: {
    RESET_LINK_SEND: "Password reset link sent successfully.",
    SIGNUP: "Successfully signup",
    LOGIN: "Successfully login",
    LOGOUT: "Successfully logout",
    VERIFY_OTP: "Otp verification success.",
    RESEND_OTP: "OTP resend successfully.",
    PASSWORD_VERIFIED: "The current password is verified successfully",
    PASSWORD_CHANGE: "Password changed successfully",
    RESET_PASSWORD: "Password reset successfully",
  },
  ERROR: {
    RESET_LINK_EXPIRED:
      "Invalid or expired password reset link. Please try again.",
    RESET_PASSWORD: "Reset password failed!",
    FORGOT_PASSWORD: "Forgot password failed!",
    LOGIN: "Login failed. Please try again.",
    SIGNUP: "Signup failed. Please try again.",
    LOGOUT: "Logout failed. Please try again.",
    VERIFY_OTP: "The OTP verification failed!",
    RESEND_OTP: "Failed to resend OTP.",
    PASSWORD_CHANGE: "Failed to change the password!",
  },
  VALIDATION: {
    ENTER_VALID_OTP: "Please enter a valid 6-digit OTP",
  },
};
