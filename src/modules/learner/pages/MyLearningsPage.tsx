// import React from "react";
// import { Book, CheckCircle } from "lucide-react";
// import useFetch from "../../../hooks/useFetch";
// import LoadingComponent from "../../mentor/components/LoadingComponent";
// import ErrorComponent from "../../mentor/components/ErrorComponent";
// import NoContentComponent from "../../mentor/components/NoContentComponent";
// import { useNavigate } from "react-router-dom";

// interface Learning {
//   _id: string;
//   userId: string;
//   courseId: { _id: string; thumbnail: string; title: string };
//   completedLessons: string[];
//   completedMaterials: string[];
//   isCourseCompleted: boolean;
//   progress: number;
//   completedDate: number | null;
//   //   title: string;
//   //   instructor: string;
// }

// const MyLearningsPage = () => {
//   const {
//     data: learnings,
//     error,
//     loading,
//   } = useFetch<Learning[]>("/api/progress");

//   const navigate = useNavigate();

//   console.log(learnings, "learn");

//   if (loading) {
//     return <LoadingComponent item="Enrolled courses" theme="blue" />;
//   }
//   if (error) {
//     return <ErrorComponent item="Enrolled courses" theme="blue" />;
//   }
//   if (learnings && learnings.length === 0) {
//     return <NoContentComponent item="Enrolled courses" theme="blue" />;
//   }

//   if (learnings)
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">My Learnings</h1>
//           <div className="w-[400px]">
//             {/* Optional: Add tabs or other UI components here if needed */}
//           </div>
//         </div>

//         <div className="space-y-4">
//           {learnings.map((learning) => (
//             <div
//               key={learning._id}
//               className="overflow-hidden hover:shadow-lg transition-shadow border rounded-lg"
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-6">
//                   <div className="w-40 h-32 bg-gray-100 rounded-lg overflow-hidden">
//                     <div className="w-full h-full bg-blue-50 flex items-center justify-center">
//                       <img
//                         src={learning.courseId.thumbnail}
//                         alt={learning.courseId.title}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {learning.courseId.title}
//                       </h3>
//                       {learning.isCourseCompleted && (
//                         <CheckCircle className="w-5 h-5 text-green-500" />
//                       )}
//                     </div>

//                     {/* <p className="text-sm text-gray-600 mb-4">
//                     Instructor: {learning.course.instructor}
//                   </p> */}

//                     <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//                       <div
//                         className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
//                         style={{ width: `${learning.progress}%` }}
//                       />
//                     </div>

//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-sm font-medium text-gray-900">
//                         {Math.round(learning.progress)}% Complete
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         {learning.completedLessons.length} lessons completed
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() =>
//                       navigate(`/learner/my-learnings/${learning._id}`)
//                     }
//                   >
//                     continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
// };

// export default MyLearningsPage;
