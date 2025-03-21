import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";
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
import MeetingRoom from "../modules/ call/VideoCallManagement";
import MainChatLayout from "../modules/chat/LearnerChatManagement";

export const LearnerRoutes = (
  isAuthenticated: boolean,
  user: UserRole,
  theme: ThemeType
) => [
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
  // {
  //   path: "/login",
  //   element: isAuthenticated ? (
  //     user === "learner" ? (
  //       <Navigate to={`/`} />
  //     ) : (
  //       <Navigate to={`/${user}/dashboard`} />
  //     )
  //   ) : (
  //     <LoginPage role="learner" theme="blue" loginImage="" />
  //   ),
  // },
  {
    path: "/learner/login",
    element: isAuthenticated ? (
      user === "learner" ? (
        <Navigate to={`/`} />
      ) : (
        <Navigate to={`/${user}/dashboard`} />
      )
    ) : (
      <LoginPage role="learner" theme="blue" loginImage="" />
    ),
  },
  {
    path: "/learner",
    children: [
      {
        element: <LearnerLayout />,
        children: [
          { path: "courses", element: <LearnerCoursesPage /> },
          { path: "courses/:courseId", element: <CourseDetails /> },
        ],
      },

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
                    path: "meetings/:progressId",
                    element: <LearnerMeetingManagement />,
                  },
                  { path: "chat", element: <MainChatLayout /> },

                  // {
                  //   path: "call/:roomId",
                  //   element: <MeetingRoom role="learner" />,
                  // },
                ],
              },
            ],
          },
        ],
      },
      // {
      //   element: <ProtectedRoute role="learner" />,
      //   children: [
      //     {
      //       path: "otp",
      //       element: <OtpVerificationComponent userRole="learner" />,
      //     },
      //     {
      //       element: <LearnerLayout />,
      //       children: [
      //         //     // { path: "dashboard", element: <LearnerDashboard /> },
      //         //     { path: "profile", element: <LearnerProfile /> },
      //         //     {
      //         //       path: "checkout/:courseId",
      //         //       element: <WrappedCourseCheckout />,
      //         //     },
      //         //     {
      //         //       path: "subscription-plans",
      //         //       element: <SubscriptionCheckout />,
      //         //     },
      //         //     {
      //         //       path: "payment-success/:purchaseId",
      //         //       element: <PaymentSuccess />,
      //         //     },
      //         //     {
      //         //       path: "subscription-success/:subscriptionId",
      //         //       element: <SubscriptionSuccess />,
      //         //     },
      //         //     {
      //         //       path: "my-learnings",
      //         //       element: <MyLearningsPage />,
      //         //       children: [],
      //         //     },
      //         //     {
      //         //       path: "my-learnings/:progressId",
      //         //       element: <LearningCoursePage />,
      //         //     },
      //         //     {
      //         //       path: "chat",
      //         //       element: (
      //         //         // <SocketProvider>
      //         //         <MainChatLayout />
      //         //         // </SocketProvider>
      //         //       ),
      //         //     },
      //         //     {
      //         //       path: "meets/:mentorId/:courseId",
      //         //       element: <LearnerMeetingScheduling />,
      //         //     },
      //         //     // { path: "video-call", element: <VideoCallPage /> },
      //         //     {
      //         //       path: "video-call",
      //         //       element: <MainPage />,
      //         //     },
      //         //     {
      //         //       path: "video-call/answer/:roomId",
      //         //       element: <AnswerVideo />,
      //         //     },
      //         //     { path: "answer/:roomId", element: <LearnerAnswerComponent /> },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];
