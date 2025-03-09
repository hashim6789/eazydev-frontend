import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../modules/layouts/AdminLayout";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminLearnerManagement from "../modules/admin/pages/learner/AdminLearnerManagement";
import AdminLearnerDetails from "../modules/admin/pages/learner/AdminLernerDetails";
// import AdminLearnerDetails from "../modules/admin/pages/learner/AdminLernerDetails";
// import AdminMentorManagement from "../modules/admin/pages/mentor/AdminMentorManagement";
// import AdminMentorDetails from "../modules/admin/pages/mentor/AdminMentorDetails";
// import AdminCourseManagement from "../modules/admin/pages/course/AdminCourseManagement";
// import CourseDetails from "../modules/admin/pages/course/CourseDetails";
// import MaterialDetailPage from "../modules/admin/pages/course/MaterialsDetailsPage";
// import AdminCategoryManagement from "../modules/admin/pages/category/AdminCategoryManagement";

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
      <LoginPage role="admin" theme="green" loginImage="" allowSignup={false} />
    ),
  },
  {
    path: "/admin",
    children: [
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              ,
              { path: "learners", element: <AdminLearnerManagement /> },
              {
                path: "learners/:learnerId",
                element: <AdminLearnerDetails role="learner" />,
              },
              // { path: "mentors", element: <AdminMentorManagement /> },
              // { path: "mentors/:mentorId", element: <AdminMentorDetails /> },
              // { path: "courses", element: <AdminCourseManagement /> },
              // { path: "courses/:courseId", element: <CourseDetails /> },
              // {
              //   path: "materials/:materialId",
              //   element: <MaterialDetailPage />,
              // },
              // { path: "categories", element: <AdminCategoryManagement /> },
            ],
          },
        ],
      },
    ],
  },
];
