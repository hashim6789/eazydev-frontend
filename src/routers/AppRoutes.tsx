import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NotFoundPage, ServerErrorPage } from "../modules/shared/Error";
import LoginPage from "../modules/auth/pages/Login";
import { AdminRoutes } from "./AdminRoutes";
import { LearnerRoutes } from "./LearnerRoutes";
import { MentorRoutes } from "./MentorRoutes";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAndSetAuthState } from "../store/thunks/refresh.thunk";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { basicTheme } = useSelector((state: RootState) => state.theme);

  const routes = [
    ...AdminRoutes(isAuthenticated, user, basicTheme),
    ...MentorRoutes(isAuthenticated, user, basicTheme),
    ...LearnerRoutes(isAuthenticated, user, basicTheme),
    {
      path: "/login",
      element: <LoginPage role="learner" theme="blue" loginImage="" />,
    },
    {
      path: "/500",
      element: <ServerErrorPage role="admin" theme={basicTheme} />,
    },
    { path: "*", element: <NotFoundPage role={user} theme={basicTheme} /> },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
