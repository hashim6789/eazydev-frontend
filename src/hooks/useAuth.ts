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
import { AuthMessages } from "../constants";

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
      if (response.status === 200) {
        const user = response.data.user as User;
        dispatch(loginSuccess({ user }));
        if (role === "learner") {
          navigate("/");
        } else {
          navigate(`/${role}/dashboard`);
        }
      }
    } catch (err) {
      dispatch(loginFailure(AuthMessages.LOGIN_FAILED));
      console.error(AuthMessages.LOGIN_FAILED, err);
    }
  };

  // for signup
  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(signupStart());
    try {
      const response = await axios.post<User>(
        `${config.API_BASE_URL}/api/auth/signup`,
        {
          ...credentials,
          role,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const user = response.data;
        dispatch(signupSuccess({ user }));
        console.log(`navigate to /${role}/otp`);
        navigate(`/${role}/otp`);
      }
    } catch (err: any) {
      if (err.response.data.error) {
        dispatch(signupFailure(err.response.data.error));
      } else {
        dispatch(signupFailure(AuthMessages.SIGNUP_FAILED));
      }

      console.error(AuthMessages.SIGNUP_FAILED, err);
    }
  };

  // for google signup
  const handleGoogleSignup = async (googleToken: string, role: SubRole) => {
    dispatch(googleSignupStart());
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/auth/google`,
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
    } catch (err: any) {
      if (err.response.data.error) {
        dispatch(googleSignupFailure(err.response.data.error));
      } else {
        dispatch(googleSignupFailure(AuthMessages.GOOGLE_SIGNUP_FAILED));
      }
      console.error(AuthMessages.GOOGLE_SIGNUP_FAILED, err);
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
        `${config.API_BASE_URL}/api/auth/forgot-password`,
        {
          email: data.email,
          role,
        }
      );
      if (response.status === 200 && response.data.success) {
        dispatch(forgotPasswordSuccess());
      }
    } catch (err: any) {
      dispatch(
        forgotPasswordFailure(
          err.response.data.error || AuthMessages.FORGOT_PASSWORD_FAILED
        )
      );
      console.error(AuthMessages.FORGOT_PASSWORD_FAILED, err);
    }
  };

  // for logout
  const handleLogout = async (role: UserRole, userId: string) => {
    try {
      const response = await api.post("/api/auth/logout", { role, userId });
      if (response.status === 200) {
        dispatch(logout());
      }
    } catch (error) {
      showErrorToast(AuthMessages.LOGOUT_FAILED);
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
