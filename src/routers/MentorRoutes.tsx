import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import OtpVerificationComponent from "../modules/auth/pages/Otp";
import MentorLayout from "../modules/layouts/MentorLayout";
import MentorDashboard from "../modules/mentor/pages/Dashboard";
import ProfilePage from "../modules/mentor/pages/Profile";
import CourseManagement from "../modules/mentor/pages/course/CourseManagement";
import MaterialManagement from "../modules/mentor/pages/material/MaterialManagement";
import LessonManagement from "../modules/mentor/pages/lesson/LessonManagement";

export const MentorRoutes = (
  isAuthenticated: boolean,
  user: UserRole,
  theme: ThemeType
) => [
  {
    path: "/mentor/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <LoginPage role="mentor" theme="purple" loginImage="" />
    ),
  },
  {
    path: "/mentor",
    children: [
      {
        element: <ProtectedRoute role="mentor" />,
        children: [
          {
            path: "otp",
            element: <OtpVerificationComponent userRole="mentor" />,
          },
          {
            element: <MentorLayout />,
            children: [
              { path: "dashboard", element: <MentorDashboard /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "courses", element: <CourseManagement /> },
              { path: "lessons", element: <LessonManagement /> },
              { path: "materials", element: <MaterialManagement /> },
            ],
          },
        ],
      },
    ],
  },
];
