import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeType, UserRole, UserThemeType } from "../../../types/User";

// Props interface
interface LoginPageProps {
  role: UserRole;
  theme: UserThemeType;
  loginImage: string;
  //   onLogin: (data: LoginFormData) => Promise<void>;
  //   onSignup?: (data: SignupFormData) => Promise<void>;
  //   onGoogleAuth?: () => Promise<void>;
  //   onForgotPassword?: (email: string) => Promise<void>;
  allowSignup?: boolean;
  loading?: boolean;
  error?: string;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName?: string;
  confirmPassword: string;
}

// Schema validation using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Theme configuration
const getThemeStyles = (theme: UserThemeType) => {
  switch (theme) {
    case "blue":
      return {
        primary: "bg-blue-600",
        hover: "hover:bg-blue-700",
        focusRing: "focus:ring-blue-500",
        text: "text-blue-600",
        lightBg: "bg-blue-50",
        mediumBg: "bg-blue-100",
        buttonText: "text-white",
        gradient: "from-blue-600 to-indigo-700",
      };
    case "green":
      return {
        primary: "bg-emerald-600",
        hover: "hover:bg-emerald-700",
        focusRing: "focus:ring-emerald-500",
        text: "text-emerald-600",
        lightBg: "bg-emerald-50",
        mediumBg: "bg-emerald-100",
        buttonText: "text-white",
        gradient: "from-emerald-600 to-teal-700",
      };
    case "purple":
    default:
      return {
        primary: "bg-purple-600",
        hover: "hover:bg-purple-700",
        focusRing: "focus:ring-purple-500",
        text: "text-purple-600",
        lightBg: "bg-purple-50",
        mediumBg: "bg-purple-100",
        buttonText: "text-white",
        gradient: "from-purple-600 to-violet-700",
      };
  }
};

// Role based titles and descriptions
const getRoleContent = (role: UserRole) => {
  switch (role) {
    case "admin":
      return {
        loginTitle: "Admin Login",
        loginDescription: "Access your administrative dashboard",
        signupTitle: "Admin Registration",
        signupDescription: "Create a new administrator account",
        welcomeTitle: "Admin Dashboard",
        welcomeDescription: "Manage your platform with ease",
      };
    case "mentor":
      return {
        loginTitle: "Mentor Login",
        loginDescription: "Access your mentor dashboard",
        signupTitle: "Mentor Registration",
        signupDescription: "Join as a mentor on our platform",
        welcomeTitle: "Mentor Portal",
        welcomeDescription: "Guide learners to success",
      };
    case "learner":
    default:
      return {
        loginTitle: "Learner Login",
        loginDescription: "Access your learning materials",
        signupTitle: "Learner Registration",
        signupDescription: "Start your learning journey today",
        welcomeTitle: "Learning Portal",
        welcomeDescription: "Your gateway to knowledge",
      };
  }
};

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
  const styles = getThemeStyles(theme);

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

// Google Auth Button Component
const GoogleAuthButton: React.FC<{
  text: string;
  onClick: () => Promise<void>;
  theme: UserThemeType;
}> = ({ text, onClick, theme }) => {
  const styles = getThemeStyles(theme);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
    >
      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span className={`text-gray-700 font-medium`}>{text}</span>
    </button>
  );
};

// Main Login Page Component
const LoginPage: React.FC<LoginPageProps> = ({
  role,
  theme,
  loginImage,
  //   onLogin,
  //   onSignup,
  //   onGoogleAuth,
  //   onForgotPassword,
  allowSignup = true,
  loading = false,
  error,
}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const styles = getThemeStyles(theme);
  const roleContent = getRoleContent(role);

  // Setup React Hook Form with Zod validation
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  // Form submissions
  const submitLogin = (data: LoginFormData) => {
    // onLogin(data);
  };

  const submitSignup = (data: SignupFormData) => {
    // if (onSignup) {
    //   onSignup(data);
    // }
  };

  const handleForgotPassword = async () => {
    // if (onForgotPassword) {
    //   await onForgotPassword(forgotPasswordEmail);
    setForgotPasswordModal(false);
    // }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image Section */}
      <div
        className={`hidden lg:flex lg:w-1/2 relative ${styles.primary} overflow-hidden`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-90`}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">
            {roleContent.welcomeTitle}
          </h2>
          <p className="text-xl">{roleContent.welcomeDescription}</p>
        </div>
        <div className="px-20 py-40 relative z-0">
          <img
            src={loginImage}
            alt={`${role} login`}
            className="object-cover w-full h-full rounded-3xl shadow-lg"
          />
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          {/* Role navigation buttons */}
          <div className="flex space-x-3 mb-6">
            {role !== "learner" && (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className={`focus:outline-none ${styles.lightBg} ${styles.text} ${styles.hover} focus:ring-4 ${styles.focusRing} font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                Learner
              </button>
            )}
            {role !== "mentor" && (
              <button
                type="button"
                onClick={() => navigate("/mentor/login")}
                className={`focus:outline-none ${styles.lightBg} ${styles.text} ${styles.hover} focus:ring-4 ${styles.focusRing} font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                Mentor
              </button>
            )}
            {role !== "admin" && (
              <button
                type="button"
                onClick={() => navigate("/admin/login")}
                className={`focus:outline-none ${styles.lightBg} ${styles.text} ${styles.hover} focus:ring-4 ${styles.focusRing} font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                Admin
              </button>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold mb-2 ${styles.text}`}>
              {isLogin ? roleContent.loginTitle : roleContent.signupTitle}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? roleContent.loginDescription
                : roleContent.signupDescription}
            </p>
          </div>

          {/* Login/Signup toggle */}
          {allowSignup && (
            <div className={`flex bg-gray-100 rounded-lg p-1 mb-8`}>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                  isLogin
                    ? `${styles.primary} text-white`
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <LogIn size={16} className="mr-2" />
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                  !isLogin
                    ? `${styles.primary} text-white`
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <UserPlus size={16} className="mr-2" />
                Register
              </button>
            </div>
          )}

          {/* Alert messages */}
          {loading && (
            <div
              className={`text-center py-4 ${styles.lightBg} ${styles.text} rounded-lg mb-6`}
            >
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                <p>Processing your request...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form
              onSubmit={handleLoginSubmit(submitLogin)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                      styles.focusRing
                    } focus:border-transparent ${
                      loginErrors.email ? "border-red-500" : ""
                    }`}
                    {...registerLogin("email")}
                  />
                </div>
                {loginErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                      styles.focusRing
                    } focus:border-transparent ${
                      loginErrors.password ? "border-red-500" : ""
                    }`}
                    {...registerLogin("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${styles.primary} ${styles.buttonText} rounded-lg font-medium ${styles.hover} transition-colors flex items-center justify-center`}
                disabled={loading}
              >
                <LogIn size={18} className="mr-2" />
                Login
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form
              onSubmit={handleSignupSubmit(submitSignup)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                      styles.focusRing
                    } focus:border-transparent ${
                      signupErrors.firstName ? "border-red-500" : ""
                    }`}
                    {...registerSignup("firstName")}
                  />
                  {signupErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {signupErrors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${styles.focusRing} focus:border-transparent`}
                    {...registerSignup("lastName")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                      styles.focusRing
                    } focus:border-transparent ${
                      signupErrors.email ? "border-red-500" : ""
                    }`}
                    {...registerSignup("email")}
                  />
                </div>
                {signupErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {signupErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                      styles.focusRing
                    } focus:border-transparent ${
                      signupErrors.password ? "border-red-500" : ""
                    }`}
                    {...registerSignup("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {signupErrors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${
                    styles.focusRing
                  } focus:border-transparent ${
                    signupErrors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...registerSignup("confirmPassword")}
                />
                {signupErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {signupErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${styles.primary} ${styles.buttonText} rounded-lg font-medium ${styles.hover} transition-colors flex items-center justify-center`}
                disabled={loading}
              >
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </button>
            </form>
          )}

          {/* Google Authentication button */}
          {/* {onGoogleAuth && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or {isLogin ? "login" : "signup"} with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <GoogleAuthButton
                  text={isLogin ? "Login with Google" : "Sign up with Google"}
                  onClick={onGoogleAuth}
                  theme={theme}
                />
              </div>
            </div>
          )} */}

          {/* Forgot password link */}
          {/* {isLogin && onForgotPassword && (
            <div className="text-center mt-6">
              <button
                type="button"
                className={`${styles.text} font-medium hover:underline`}
                onClick={() => setForgotPasswordModal(true)}
              >
                Forgot Password?
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {/* {onForgotPassword && (
        <ForgotPasswordModal
          email={forgotPasswordEmail}
          setEmail={setForgotPasswordEmail}
          isOpen={forgotPasswordModal}
          onClose={() => setForgotPasswordModal(false)}
          onSubmit={handleForgotPassword}
          loading={loading}
          error={error}
          theme={theme}
        />
      )} */}
    </div>
  );
};

export default LoginPage;
