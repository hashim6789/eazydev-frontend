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
  logout,
} from "../store/slice";
import { showErrorToast } from "../utils";
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from "../schemas";
import { SubRole, User, UserRole } from "../types";
import { api } from "../configs";
import { AuthMessages, HttpStatusCode } from "../constants";
import { ErrorType } from "../types/error";
import axiosInstance from "../configs/axios.config";

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
      const response = await axiosInstance.post(
        `/auth/login`,
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
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const typedError = error as ErrorType;
        dispatch(
          loginFailure(
            typedError.response.data.error || AuthMessages.LOGIN_FAILED
          )
        );
        console.error(AuthMessages.LOGIN_FAILED, error);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  // interface Error {
  //   response: { data: { error: string } };
  // }

  // for signup
  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(signupStart());
    try {
      const response = await axiosInstance.post<User>(
        `/auth/signup`,
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
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const typedError = error as ErrorType;
        dispatch(
          signupFailure(
            typedError.response.data.error || AuthMessages.SIGNUP_FAILED
          )
        );
        console.error(AuthMessages.SIGNUP_FAILED, error);
      }
    }
  };

  // for google signup
  const handleGoogleSignup = async (googleToken: string, role: SubRole) => {
    dispatch(googleSignupStart());
    try {
      const response = await axiosInstance.post(
        `/auth/google`,
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
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const typedError = error as ErrorType;
        dispatch(
          googleSignupFailure(
            typedError.response.data.error || AuthMessages.GOOGLE_SIGNUP_FAILED
          )
        );
        console.error(AuthMessages.GOOGLE_SIGNUP_FAILED, error);
      }
    }
  };

  // for forgot password
  const handleForgotPassword = async (
    data: ForgotPasswordSchema,
    role: SubRole
  ) => {
    dispatch(forgotPasswordStart());
    try {
      const response = await axiosInstance.post<{ success: boolean }>(
        `/auth/forgot-password`,
        {
          email: data.email,
          role,
        }
      );
      if (response.status === HttpStatusCode.OK) {
        dispatch(forgotPasswordSuccess());
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const typedError = error as ErrorType;
        dispatch(
          forgotPasswordFailure(
            typedError.response.data.error ||
              AuthMessages.FORGOT_PASSWORD_FAILED
          )
        );
        console.error(AuthMessages.FORGOT_PASSWORD_FAILED, error);
      }
    }
  };

  // for logout
  const handleLogout = async (role: UserRole, userId: string) => {
    try {
      const response = await api.post("/auth/logout", { role, userId });
      if (response.status === HttpStatusCode.OK) {
        dispatch(logout());
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const typedError = error as ErrorType;
        showErrorToast(
          typedError.response.data.error || AuthMessages.LOGOUT_FAILED
        );
      }
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
