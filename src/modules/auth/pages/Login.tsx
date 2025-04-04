import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, UserPlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRole, UserThemeType } from "../../../types/User";
import {
  getUserThemeStyles,
  userThemeSelector,
} from "../../../utils/theme.utils";
import { getRoleContentForLogin } from "../../../utils";
import {
  ForgotPasswordFormData,
  LoginFormData,
  loginSchema,
  SignupFormData,
  signupSchema,
} from "../../../schemas/auth.schema";
import useAuth from "../../../hooks/useAuth";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";
import GoogleLoginButton from "../../shared/components/GoogleLoginButton";

// Props interface
interface LoginPageProps {
  role: UserRole;
  theme: UserThemeType;
  loginImage: string;
  allowSignup?: boolean;
}

// Main Login Page Component
const LoginPage: React.FC<LoginPageProps> = ({
  role,
  loginImage,
  allowSignup = true,
}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const theme = userThemeSelector(role);

  const { loading, error, handleLogin, handleSignup, handleForgotPassword } =
    useAuth();
  const styles = getUserThemeStyles(theme);
  const roleContent = getRoleContentForLogin(role);

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
    // watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // const password = watch("password", "");

  // Form submissions
  const submitLogin = (data: LoginFormData) => {
    handleLogin(data, role);
  };

  const submitSignup = (data: SignupFormData) => {
    if (role === "admin") return;
    handleSignup(data, role);
  };

  const handleForgotPass = async (data: ForgotPasswordFormData) => {
    if (role === "admin") return;
    setForgotPasswordModal(false);
    handleForgotPassword(data, role);
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
          {role !== "admin" && (
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
                <GoogleLoginButton user={role} />
              </div>
            </div>
          )}

          {/* Forgot password link */}
          {role !== "admin" && isLogin && !forgotPasswordModal && (
            <div className="text-center mt-6">
              <button
                type="button"
                className={`${styles.text} font-medium hover:underline`}
                onClick={() => setForgotPasswordModal(true)}
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <ForgotPasswordModal
          isOpen={forgotPasswordModal}
          onClose={() => setForgotPasswordModal(false)}
          onSubmit={handleForgotPass}
          theme={theme}
        />
      )}
    </div>
  );
};

export default LoginPage;
