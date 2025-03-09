// import React from "react";

// //imported custom hooks
// import useFetch from "../../../../hooks/useFetch";

// //imported child components
// import CoursesTable from "../../tables/CourseTable";

// import { Course } from "../../../../shared/types/Course";
// import { BookOpen, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface AdminCourseManagementProps {}

// const AdminCourseManagement: React.FC<AdminCourseManagementProps> = () => {
//   const navigate = useNavigate();
//   // //loading handling
//   // if (loading) {
//   //   return (
//   //     <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//   //       <div className="text-center">
//   //         <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
//   //         <h2 className="text-xl font-semibold text-gray-700">
//   //           Loading courses details...
//   //         </h2>
//   //         <p className="text-gray-500 mt-2">
//   //           Please wait while we fetch the information
//   //         </p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // //error handling
//   // if (error) {
//   //   return (
//   //     <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//   //       <div className="text-center">
//   //         <h2 className="text-xl font-bold text-red-800">
//   //           error fetch courses details...
//   //         </h2>
//   //         <p className="text-red-500 mt-2">Please try again (:</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // //error handling (no courses found)
//   // if (data && data.length === 0) {
//   //   return (
//   //     <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//   //       <div className="text-center">
//   //         <h2 className="text-xl font-bold text-red-800">
//   //           No Courses Available...
//   //         </h2>
//   //         <p className="text-red-500 mt-2">Unavailable data (:</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="space-y-6">
//       {/* Breadcrumbs */}
//       <nav className="flex items-center space-x-2 text-sm text-gray-600">
//         <a
//           onClick={() => navigate("/admin/dashboard")}
//           className="hover:text-red-600 transition-colors"
//         >
//           Dashboard
//         </a>
//         <ChevronRight className="h-4 w-4" />
//         <span className="text-red-600 font-medium">Courses</span>
//       </nav>

//       {/* Title Section */}
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-red-100 rounded-lg">
//           <BookOpen className="h-6 w-6 text-red-600" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900">Courses Overview</h1>
//       </div>

//       {/* Content */}
//       <div>
//         <CoursesTable />
//       </div>
//     </div>
//   );
// };

// export default AdminCourseManagement;
