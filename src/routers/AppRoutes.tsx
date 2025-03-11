import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NotFoundPage, ServerErrorPage } from "../modules/shared/Error";
import LoginPage from "../modules/auth/pages/Login";
import { AdminRoutes } from "./AdminRoutes";
import { LearnerRoutes } from "./LearnerRoutes";
import { MentorRoutes } from "./MentorRoutes";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const {} = useSelector((state: RootState) => state.theme);

  const routes = [
    ...AdminRoutes(isAuthenticated, user, "light"),
    ...MentorRoutes(isAuthenticated, user, "light"),
    ...LearnerRoutes(isAuthenticated, user, "light"),
    {
      path: "/login",
      element: <LoginPage role="learner" theme="blue" loginImage="" />,
    },
    {
      path: "/500",
      element: <ServerErrorPage role="admin" theme={"light"} />,
    },
    { path: "*", element: <NotFoundPage role={user} theme={"light"} /> },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
