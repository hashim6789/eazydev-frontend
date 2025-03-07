import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  NotFoundPage,
  ServerErrorPage,
} from "../modules/shared/components/ErrorComponents";
import LoginPage from "../modules/auth/pages/Login";
import { AdminRoutes } from "./AdminRoutes";
import { LearnerRoutes } from "./LearnerRoutes";
import { MentorRoutes } from "./MentorRoutes";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { basicTheme } = useSelector((state: RootState) => state.theme);

  const routes = [
    ...AdminRoutes(isAuthenticated, user),
    ...MentorRoutes(isAuthenticated, user),
    ...LearnerRoutes(isAuthenticated, user),
    { path: "*", element: <NotFoundPage role={user} theme={basicTheme} /> },
    {
      path: "/500",
      element: <ServerErrorPage role="admin" theme={basicTheme} />,
    },
    {
      path: "/login",
      element: <LoginPage role="mentor" theme="blue" loginImage="" />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
