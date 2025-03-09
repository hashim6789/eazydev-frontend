// import React from "react";
// import { Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCourseTableFunctionality } from "../hooks/useTableCourse";
// import { getCourseStatusColor } from "../../../shared/utils/colors";
// import { CourseStatus } from "../../mentor/pages/MentorDashboard";

// const defaultThumbnail = "https://via.placeholder.com/150";

// interface CoursesTableProps {}

// const CoursesTable: React.FC<CoursesTableProps> = ({}) => {
//   const {
//     currentPage,
//     searchQuery,
//     courseFilterType,
//     data,
//     totalPages,
//     loading,
//     handlePageChange,
//     handleSearchChange,
//     handleFilterChange,
//     handleDelete,
//   } = useCourseTableFunctionality({ itemsPerPage: 5 });

//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search courses..."
//           value={searchQuery}
//           onChange={(e) => handleSearchChange(e.target.value)}
//           className="px-4 py-2 border rounded-md"
//         />
//         <select
//           value={courseFilterType}
//           onChange={(e) =>
//             handleFilterChange(e.target.value as "all" | CourseStatus)
//           }
//           className="ml-4 px-4 py-2 border rounded-md"
//         >
//           <option value="all">All</option>
//           <option value="requested">Requested</option>
//           <option value="published">Published</option>
//           <option value="approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg border border-gray-200">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200">
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Course Title
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Category
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Thumbnail
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((course) => (
//                 <tr
//                   key={course.id}
//                   className="border-b border-gray-200 last:border-0"
//                 >
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
//                         course.status
//                       )}`}
//                     >
//                       {course.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-medium text-gray-800">
//                       {course.title}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm text-gray-600">
//                       {course.category.title}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <img
//                       src={course.thumbnail || defaultThumbnail}
//                       alt="Course Thumbnail"
//                       className="w-16 h-16 rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => navigate(`/admin/courses/${course.id}`)}
//                       className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="text-center py-4 text-gray-600">
//                   No courses found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex justify-between items-center">
//             <button
//               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               Previous
//             </button>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//             </div>
//             <button
//               onClick={() =>
//                 handlePageChange(Math.min(totalPages, currentPage + 1))
//               }
//               className="text-gray-500 hover:text-gray-700"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesTable;
