import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";

export const MentorRoutes = (isAuthenticated: boolean, user: string) => [
  {
    path: "/mentor/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <LoginPage role="mentor" theme="blue" loginImage="" />
    ),
  },
  //   {
  //     path: "/mentor",
  //     children: [
  //       {
  //         element: <ProtectedRoute role="mentor" />,
  //         children: [
  //           {
  //             element: <MentorLayout />,
  //             children: [
  //               { path: "dashboard", element: <MentorDashboard /> },

  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
];
