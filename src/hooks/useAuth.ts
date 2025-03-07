// useAuth.ts
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  verifyUser,
  blockUser,
  setLoading,
  setError,
} from "../store/slice";
import { showSuccessToast, showErrorToast } from "../utils";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, UserRole } from "../types";
import { config } from "../configs";
import { AuthMessages } from "../constants";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // for login
  const handleLogin = async (credentials: LoginSchema, role: UserRole) => {
    dispatch(loginStart());
    try {
      await axios.post(`${config.API_BASE_URL}/api/auth/login`, credentials);
      //   const { role } = response.data;
      dispatch(loginSuccess(role));
      showSuccessToast(AuthMessages.LOGIN_SUCCESS);
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (err) {
      dispatch(loginFailure(AuthMessages.LOGIN_FAILED));
      showErrorToast(AuthMessages.LOGIN_FAILED);
      console.error(AuthMessages.LOGIN_FAILED, err);
    }
  };

  // for signup
  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(loginStart());
    try {
      await axios.post(`${config.API_BASE_URL}/api/auth/signup`, credentials);
      showSuccessToast(AuthMessages.SIGNUP_SUCCESS);
      navigate(`/${role}/otp`);
    } catch (err: any) {
      dispatch(loginFailure(AuthMessages.SIGNUP_FAILED));
      showErrorToast(AuthMessages.SIGNUP_FAILED);
      console.error(AuthMessages.SIGNUP_FAILED, err);
    }
  };

  // for google signup
  const handleGoogleSignup = async (token: string, role: SubRole) => {
    dispatch(loginStart());
    try {
      await axios.post(`${config.API_BASE_URL}/api/auth/google`, {
        token,
        role,
      });
      dispatch(loginSuccess(role));
      showSuccessToast(AuthMessages.LOGIN_SUCCESS);
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (err: any) {
      dispatch(loginFailure(AuthMessages.GOOGLE_SIGNUP_FAILED));
      showErrorToast(AuthMessages.GOOGLE_SIGNUP_FAILED);
      console.error(AuthMessages.GOOGLE_SIGNUP_FAILED, err);
    }
  };

  // for forgot password
  const handleForgotPassword = async (
    data: ForgotPasswordSchema,
    role: SubRole
  ) => {
    dispatch(setLoading(true));
    try {
      await axios.post(`${config.API_BASE_URL}/api/auth/forgot-password`, {
        email: data.email,
        role,
      });
      dispatch(setLoading(false));
      showSuccessToast(AuthMessages.RESET_LINK_SEND_SUCCESS);
    } catch (err) {
      dispatch(setLoading(false));
      showErrorToast(AuthMessages.FORGOT_PASSWORD_FAILED);
      console.error(AuthMessages.FORGOT_PASSWORD_FAILED, err);
    }
  };

  // for logout
  const handleLogout = () => {
    dispatch(logout());
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
