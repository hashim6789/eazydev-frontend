import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserRole } from "../types";

const ProtectedRoute = ({ role }: { role: UserRole }) => {
  const { isAuthenticated, isBlocked, isVerified, user } = useSelector(
    (state: RootState) => state.auth
  );

  const currentPath = window.location.pathname;

  // Redirect to the login page if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate to={role === "learner" ? "/login" : `/${role}/login`} replace />
    );
  }

  // Redirect to the blocked page if the user is blocked
  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  if (isVerified && currentPath === `/${role}/otp`) {
    return (
      <Navigate to={role === "learner" ? "/" : `/${role}/dashboard`} replace />
    );
  }

  // Redirect to the OTP page if the user is not verified
  if (!isVerified && currentPath !== `/${role}/otp`) {
    return <Navigate to={`/${role}/otp`} replace />;
  }

  // Redirect to the correct dashboard if the role doesn't match
  if (user !== role) {
    return <Navigate to={`/${user}/dashboard`} replace />;
  }

  // Render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
