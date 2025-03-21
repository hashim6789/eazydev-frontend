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
import MaterialCreation from "../modules/mentor/pages/material/MaterialCreation";
import MaterialDetails from "../modules/mentor/pages/material/MaterialDetails";
import CourseCreation from "../modules/mentor/pages/course/CourseCreate";
import CourseDetailsPage from "../modules/shared/pages/CourseDetails";
import MentorMeetingManagement from "../modules/mentor/pages/meetings/MentorMeetingManagement";
import MeetingRoom from "../modules/ call/VideoCallManagement";
import MainChatLayout from "../modules/chat/LearnerChatManagement";

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
              {
                path: "courses",
                children: [
                  { path: "", element: <CourseManagement /> },
                  { path: "create", element: <CourseCreation /> },
                  {
                    path: ":courseId",
                    element: <CourseDetailsPage role="mentor" />,
                  },
                ],
              },
              { path: "meetings", element: <MentorMeetingManagement /> },
              { path: "chats", element: <MainChatLayout /> },

              // {
              //   path: "call/:roomId",
              //   element: <MeetingRoom role="mentor" />,
              // },

              { path: "lessons", element: <LessonManagement /> },
              {
                path: "materials",
                children: [
                  { path: "", element: <MaterialManagement /> },
                  { path: "create", element: <MaterialCreation /> },
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
