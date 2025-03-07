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
import { AuthState } from "../store/interfaces";
import { LoginSchema, SignupSchema } from "../schemas";
import { SubRole, UserRole } from "../types";

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
      await axios.post("/api/auth/login", credentials);
      //   const { role } = response.data;
      dispatch(loginSuccess(role));
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (err) {
      dispatch(loginFailure("Login failed. Please try again."));
      console.error("Login failed:", err);
    }
  };

  // for signup
  const handleSignup = async (credentials: SignupSchema, role: SubRole) => {
    dispatch(loginStart());
    try {
      await axios.post("/api/auth/signup", credentials);
      navigate(`/${role}/otp`);
    } catch (err: any) {
      dispatch(loginFailure("Signup failed. Please try again."));
      console.error("Signup failed:", err);
    }
  };

  // for google signup
  const handleGoogleSignup = async (token: string, role: UserRole) => {
    dispatch(loginStart());
    try {
      await axios.post("/api/auth/google-signup", { token, role });
      dispatch(loginSuccess(role));
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (err: any) {
      dispatch(loginFailure("Google Signup failed. Please try again."));
      console.error("Google Signup failed:", err);
    }
  };

  //   // for forgot password
  //   const handleForgotPassword = async (data: ForgotCredentials) => {
  //     dispatch(setLoading(true));
  //     try {
  //       await axios.post("/api/auth/forgot-password", data);
  //       dispatch(setLoading(false));
  //       showSuccessToast("Reset link sent successfully.");
  //     } catch (err) {
  //       dispatch(setLoading(false));
  //       showErrorToast("Forgot password failed.");
  //       console.error("Forgot password failed:", err);
  //     }
  //   };

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
    // handleForgotPassword,
    handleLogout,
  };
};

export default useAuth;
