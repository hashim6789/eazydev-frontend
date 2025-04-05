import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
  logout,
} from "../store/slice";
import { showErrorToast } from "../utils";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, User, UserRole } from "../types";
import { api, config } from "../configs";
import { AuthMessages, HttpStatusCode } from "../constants";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("api", config.API_BASE_URL);
  // for login
  const handleLogin = async (credentials: LoginSchema, role: UserRole) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/auth/login`,
        {
          ...credentials,
          role,
        },
        { withCredentials: true }
      );
      if (response.status === HttpStatusCode.OK) {
        const user = response.data as User;
        dispatch(loginSuccess({ user }));
        if (role === "learner") {
          navigate("/");
        } else {
          navigate(`/${role}/dashboard`);
        }
      }
    } catch (error: any) {
      dispatch(
        loginFailure(error.response.data.error || AuthMessages.LOGIN_FAILED)
      );
      console.error(AuthMessages.LOGIN_FAILED, error);
    }
  };

  // for signup
  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(signupStart());
    try {
      const response = await axios.post<User>(
        `${config.API_BASE_URL}/auth/signup`,
        {
          ...credentials,
          role,
        },
        { withCredentials: true }
      );

      if (response.status === HttpStatusCode.Created) {
        const user = response.data;
        dispatch(signupSuccess({ user }));
        console.log(`navigate to /${role}/otp`);
        navigate(`/${role}/otp`);
      }
    } catch (error: any) {
      dispatch(
        signupFailure(error.response.data.error || AuthMessages.SIGNUP_FAILED)
      );
      console.error(AuthMessages.SIGNUP_FAILED, error);
    }
  };

  // for google signup
  const handleGoogleSignup = async (googleToken: string, role: SubRole) => {
    dispatch(googleSignupStart());
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/auth/google`,
        {
          googleToken,
          role,
        },
        { withCredentials: true }
      );
      const user = response.data.user as User;
      dispatch(googleSignupSuccess({ user }));
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (error: any) {
      dispatch(
        googleSignupFailure(
          error.response.data.error || AuthMessages.GOOGLE_SIGNUP_FAILED
        )
      );
      console.error(AuthMessages.GOOGLE_SIGNUP_FAILED, error);
    }
  };

  // for forgot password
  const handleForgotPassword = async (
    data: ForgotPasswordSchema,
    role: SubRole
  ) => {
    dispatch(forgotPasswordStart());
    try {
      const response = await axios.post<{ success: boolean }>(
        `${config.API_BASE_URL}/auth/forgot-password`,
        {
          email: data.email,
          role,
        }
      );
      if (response.status === HttpStatusCode.OK) {
        dispatch(forgotPasswordSuccess());
      }
    } catch (error: any) {
      dispatch(
        forgotPasswordFailure(
          error.response.data.error || AuthMessages.FORGOT_PASSWORD_FAILED
        )
      );
      console.error(AuthMessages.FORGOT_PASSWORD_FAILED, error);
    }
  };

  // for logout
  const handleLogout = async (role: UserRole, userId: string) => {
    try {
      const response = await api.post("/auth/logout", { role, userId });
      if (response.status === HttpStatusCode.OK) {
        dispatch(logout());
      }
    } catch (error: any) {
      showErrorToast(error.response.data.error || AuthMessages.LOGOUT_FAILED);
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
