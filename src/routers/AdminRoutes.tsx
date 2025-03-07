import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";

export const AdminRoutes = (
  isAuthenticated: boolean,
  user: UserRole,
  theme: ThemeType
) => [
  {
    path: "/admin/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <LoginPage role="mentor" theme="blue" loginImage="" />
    ),
  },
  //   {
  //     path: "/admin",
  //     children: [
  //       {
  //         element: <ProtectedRoute role="admin" />,
  //         children: [
  //           {
  //             element: <AdminLayout />,
  //             children: [
  //               { path: "dashboard", element: <AdminDashboard /> },

  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
];
