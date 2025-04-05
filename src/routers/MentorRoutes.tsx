import { Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/Login";
import { UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import OtpVerificationComponent from "../modules/auth/pages/Otp";
import MentorDashboard from "../modules/mentor/pages/Dashboard";
import ProfilePage from "../modules/mentor/pages/Profile";
import CourseManagement from "../modules/mentor/pages/course/CourseManagement";
import MaterialManagement from "../modules/mentor/pages/material/MaterialManagement";
import LessonManagement from "../modules/mentor/pages/lesson/LessonManagement";
import MaterialDetails from "../modules/mentor/pages/material/MaterialDetails";
import CourseCreation from "../modules/mentor/pages/course/CourseCreate";
import CourseDetailsPage from "../modules/shared/pages/CourseDetails";
import MentorMeetingManagement from "../modules/mentor/pages/meetings/MentorMeetingManagement";
// import MeetingRoom from "../modules/ call/VideoCallManagement";
import MainChatLayout from "../modules/chat/LearnerChatManagement";
import Layout from "../modules/layouts/Layout";
import ChangePasswordPage from "../modules/auth/pages/ChangePassword";
import CourseEditing from "../modules/mentor/pages/course/CourseEdit";
import loginImage from "../assets/img/wall_paper_03.jpg";

export const MentorRoutes = (isAuthenticated: boolean, user: UserRole) => [
  {
    path: "/mentor/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <LoginPage role="mentor" theme="purple" loginImage={loginImage} />
    ),
  },
  {
    path: "/mentor",
    children: [
      {
        path: "auth/:token/change-password",
        element: <ChangePasswordPage role="mentor" />,
      },
      {
        element: <ProtectedRoute role="mentor" />,
        children: [
          {
            path: "otp",
            element: <OtpVerificationComponent userRole="mentor" />,
          },
          {
            element: <Layout role="mentor" />,
            children: [
              { path: "dashboard", element: <MentorDashboard /> },
              { path: "profile", element: <ProfilePage /> },
              {
                path: "courses",
                children: [
                  { path: "", element: <CourseManagement /> },
                  { path: "create", element: <CourseCreation /> },
                  { path: ":courseId/edit", element: <CourseEditing /> },
                  {
                    path: ":courseId",
                    element: <CourseDetailsPage role="mentor" />,
                  },
                ],
              },
              { path: "meetings", element: <MentorMeetingManagement /> },
              { path: "chats", element: <MainChatLayout /> },

              {
                path: "call/:meetId",
                // element: <MeetingRoom role="mentor" />,
              },

              { path: "lessons", element: <LessonManagement /> },
              {
                path: "materials",
                children: [
                  { path: "", element: <MaterialManagement /> },
                  { path: ":materialId", element: <MaterialDetails /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
