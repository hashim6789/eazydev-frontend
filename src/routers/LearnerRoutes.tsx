import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import OtpVerificationComponent from "../modules/auth/pages/Otp";

export const LearnerRoutes = (
  isAuthenticated: boolean,
  user: UserRole,
  theme: ThemeType
) => [
  {
    path: "/learner/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <LoginPage role="learner" theme="blue" loginImage="" />
    ),
  },
  {
    path: "/learner",
    children: [
      // {
      //   path: "auth/:token/change-password",
      //   element: <LearnerChangePasswordPage />,
      // },
      // {
      //   path: "courses",
      //   element: <LearnerLayout />,
      //   children: [
      //     { path: "", element: <LearnerCoursesPage /> },
      //     { path: ":courseId", element: <CourseDetails /> },
      //   ],
      // },
      {
        element: <ProtectedRoute role="learner" />,
        children: [
          {
            path: "otp",
            element: <OtpVerificationComponent userRole="learner" />,
          },
          // {
          //   element: <LearnerLayout />,
          //   children: [
          //     { path: "dashboard", element: <LearnerDashboard /> },
          //     { path: "profile", element: <LearnerProfile /> },
          //     {
          //       path: "checkout/:courseId",
          //       element: <WrappedCourseCheckout />,
          //     },
          //     {
          //       path: "subscription-plans",
          //       element: <SubscriptionCheckout />,
          //     },
          //     {
          //       path: "payment-success/:purchaseId",
          //       element: <PaymentSuccess />,
          //     },
          //     {
          //       path: "subscription-success/:subscriptionId",
          //       element: <SubscriptionSuccess />,
          //     },
          //     {
          //       path: "my-learnings",
          //       element: <MyLearningsPage />,
          //       children: [],
          //     },
          //     {
          //       path: "my-learnings/:progressId",
          //       element: <LearningCoursePage />,
          //     },

          //     {
          //       path: "chat",
          //       element: (
          //         // <SocketProvider>
          //         <MainChatLayout />
          //         // </SocketProvider>
          //       ),
          //     },
          //     {
          //       path: "meets/:mentorId/:courseId",
          //       element: <LearnerMeetingScheduling />,
          //     },
          //     // { path: "video-call", element: <VideoCallPage /> },
          //     {
          //       path: "video-call",
          //       element: <MainPage />,
          //     },
          //     {
          //       path: "video-call/answer/:roomId",
          //       element: <AnswerVideo />,
          //     },

          //     { path: "answer/:roomId", element: <LearnerAnswerComponent /> },
          //   ],
          // },
        ],
      },
    ],
  },
];
