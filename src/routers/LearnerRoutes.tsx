import { Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/Login";
import { UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import OtpVerificationComponent from "../modules/auth/pages/Otp";
import LearnerLayout from "../modules/learner/pages/LearnerLayout";
import LandingPage from "../modules/learner/pages/LearnerLandingPage";
import LearnerCoursesPage from "../modules/learner/pages/course/LearnerCoursesPage";
import CourseDetails from "../modules/learner/pages/course/CourseDetailPage";
import WrappedCourseCheckout from "../modules/learner/pages/checkout/CourseCheckout";
import PaymentSuccess from "../modules/learner/pages/payment/PaymentSuccess";
import ProfilePage from "../modules/mentor/pages/Profile";
import LearningProgressPage from "../modules/learner/pages/learnings/LearnigProgressPage";
import CourseLearningLayout from "../modules/learner/pages/learnings/LearningCoursePage";
import LearnerMeetingManagement from "../modules/learner/pages/meeting/MeetingManagement";
// import MeetingRoom from "../modules/ call/VideoCallManagement";
import MainChatLayout from "../modules/chat/LearnerChatManagement";
import ChangePasswordPage from "../modules/auth/pages/ChangePassword";
import CourseCertificateManagement from "../modules/learner/pages/learnings/LearnerCertificateManagement";
import loginImage from "../assets/img/wall_paper_03.jpg";

export const LearnerRoutes = (isAuthenticated: boolean, user: UserRole) => [
  {
    path: "/",
    element:
      user === "learner" ? (
        <LearnerLayout />
      ) : (
        <Navigate to={`/${user}/login`} />
      ),
    children: [{ path: "/", element: <LandingPage /> }],
  },

  {
    path: "/learner/login",
    element: isAuthenticated ? (
      user === "learner" ? (
        <Navigate to={`/`} />
      ) : (
        <Navigate to={`/${user}/dashboard`} />
      )
    ) : (
      <LoginPage role="learner" theme="blue" loginImage={loginImage} />
    ),
  },
  {
    path: "/learner",
    children: [
      {
        path: "auth/:token/change-password",
        element: <ChangePasswordPage role="learner" />,
      },
      {
        element: <LearnerLayout />,
        children: [
          { path: "courses", element: <LearnerCoursesPage /> },
          { path: "courses/:courseId", element: <CourseDetails /> },
        ],
      },

      {
        path: "/learner",
        children: [
          {
            element: <ProtectedRoute role="learner" />,
            children: [
              {
                path: "otp",
                element: <OtpVerificationComponent userRole="learner" />,
              },
              {
                element: <LearnerLayout />,
                children: [
                  { path: "dashboard", element: <LandingPage /> },
                  { path: "profile", element: <ProfilePage /> },
                  {
                    path: "checkout/:courseId",
                    element: <WrappedCourseCheckout />,
                  },
                  {
                    path: "purchase-success/:purchaseId",
                    element: <PaymentSuccess />,
                  },
                  {
                    path: "learnings",
                    element: <LearningProgressPage />,
                  },
                  {
                    path: "learnings/:progressId",
                    element: <CourseLearningLayout />,
                  },
                  {
                    path: "learnings/:progressId/certificate",
                    element: <CourseCertificateManagement />,
                  },
                  {
                    path: "meetings/:progressId",
                    element: <LearnerMeetingManagement />,
                  },
                  { path: "chat", element: <MainChatLayout /> },

                  {
                    path: "call/:meetId",
                    // element: <MeetingRoom role="learner" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
