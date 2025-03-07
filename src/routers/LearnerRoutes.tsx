import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";

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
  //   {
  //     path: "/learner",
  //     children: [
  //       {
  //         element: <ProtectedRoute role="learner" />,
  //         children: [
  //           {
  //             element: <LearnerLayout />,
  //             children: [
  //               { path: "dashboard", element: <LearnerDashboard /> },

  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
];
