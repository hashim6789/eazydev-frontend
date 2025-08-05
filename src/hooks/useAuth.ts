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
  forgotPasswordService,
  googleSignupService,
  loginService,
  logoutService,
  signupService,
} from "../services";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const { ERROR } = AuthMessages;

  const handleLogin = async (credentials: LoginSchema, role: UserRole) => {
    dispatch(loginStart());

    try {
      const user = await loginService(credentials, role);
      dispatch(loginSuccess({ user }));
      navigate(role === "learner" ? "/" : `/${role}/dashboard`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.LOGIN);
      dispatch(loginFailure(message));
    }
  };

  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(signupStart());
    try {
      const user = await signupService(credentials, role);
      dispatch(signupSuccess({ user }));
      navigate(`/${role}/otp`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.SIGNUP);
      dispatch(signupFailure(message));
    }
  };

  const handleGoogleSignup = async (googleToken: string, role: SubRole) => {
    dispatch(googleSignupStart());
    try {
      const user = await googleSignupService(googleToken, role);
      dispatch(googleSignupSuccess({ user }));
      navigate(role === "learner" ? "/" : `/${role}/dashboard`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.GOOGLE_SIGNUP);
      dispatch(googleSignupFailure(message));
    }
  };

  const handleForgotPassword = async (
    data: ForgotPasswordSchema,
    role: SubRole
  ) => {
    dispatch(forgotPasswordStart());
    try {
      await forgotPasswordService(data, role);
      dispatch(forgotPasswordSuccess());
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.RESET_LINK_SEND);

      dispatch(forgotPasswordFailure(message));
    }
  };

  const handleLogout = async (role: UserRole, userId: string) => {
    try {
      await logoutService(role, userId);
      dispatch(logoutAction());
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, ERROR.LOGOUT);
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
