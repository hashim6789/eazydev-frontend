import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  googleSignupStart,
  googleSignupSuccess,
  googleSignupFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  logout as logoutAction,
} from "../store/slice";
import { getAxiosErrorMessage, showErrorToast } from "../utils";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, UserRole } from "../types";
import { AuthMessages } from "../constants";
import {
  login,
  signup,
  googleSignup,
  forgotPassword,
  logout,
} from "../services";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: LoginSchema, role: UserRole) => {
    dispatch(loginStart());
    try {
      const user = await login(credentials, role);
      dispatch(loginSuccess({ user }));
      navigate(role === "learner" ? "/" : `/${role}/dashboard`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, AuthMessages.LOGIN_FAILED);
      dispatch(loginFailure(message));
    }
  };

  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(signupStart());
    try {
      const user = await signup(credentials, role);
      dispatch(signupSuccess({ user }));
      navigate(`/${role}/otp`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, AuthMessages.SIGNUP_FAILED);
      dispatch(signupFailure(message));
    }
  };

  const handleGoogleSignup = async (googleToken: string, role: SubRole) => {
    dispatch(googleSignupStart());
    try {
      const user = await googleSignup(googleToken, role);
      dispatch(googleSignupSuccess({ user }));
      navigate(role === "learner" ? "/" : `/${role}/dashboard`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(
        error,
        AuthMessages.GOOGLE_SIGNUP_FAILED
      );

      dispatch(googleSignupFailure(message));
    }
  };

  const handleForgotPassword = async (
    data: ForgotPasswordSchema,
    role: SubRole
  ) => {
    dispatch(forgotPasswordStart());
    try {
      await forgotPassword(data, role);
      dispatch(forgotPasswordSuccess());
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(
        error,
        AuthMessages.FORGOT_PASSWORD_FAILED
      );
      dispatch(forgotPasswordFailure(message));
    }
  };

  const handleLogout = async (role: UserRole, userId: string) => {
    try {
      await logout(role, userId);
      dispatch(logoutAction());
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, AuthMessages.LOGOUT_FAILED);
      showErrorToast(message);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleGoogleSignup,
    handleForgotPassword,
    handleLogout,
  };
};

export default useAuth;
