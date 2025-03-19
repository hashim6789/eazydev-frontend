import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/auth/pages/Login";
import { ThemeType, UserRole } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../modules/layouts/AdminLayout";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminUserDetails from "../modules/admin/pages/learner/AdminLernerDetails";
import AdminUserManagement from "../modules/admin/pages/users/AdminUserManagement";
import AdminCourseManagement from "../modules/admin/pages/course/AdminCourseManagement";
import AdminCategoryManagement from "../modules/admin/pages/category/AdminCategoryManagement";
import AdminCourseDetails from "../modules/shared/pages/CourseDetails";
import CourseDetailsPage from "../modules/shared/pages/CourseDetails";
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
              {
                path: "learners",
                element: <AdminUserManagement role="learner" />,
              },
              {
                path: "learners/:learnerId",
                element: <AdminUserDetails role="learner" />,
              },
              {
                path: "mentors",
                element: <AdminUserManagement role="mentor" />,
              },
              {
                path: "mentors/:mentorId",
                element: <AdminUserDetails role="mentor" />,
              },
              {
                path: "courses",
                element: <AdminCourseManagement />,
              },
              {
                path: "courses/:courseId",
                element: <CourseDetailsPage role="admin" />,
              },
              {
                path: "categories",
                element: <AdminCategoryManagement />,
              },
            ],
          },
        ],
      },
    ],
  },
];

// { path: "courses", element: <AdminCourseManagement /> },
// { path: "courses/:courseId", element: <CourseDetails /> },
// {
//   path: "materials/:materialId",
//   element: <MaterialDetailPage />,
// },
// { path: "categories", element: <AdminCategoryManagement /> },
