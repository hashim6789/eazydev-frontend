// import { Book, Clock } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import type { AppDispatch, RootState } from "../../../../store";
// import LessonView from "../../components/course/LessonView";
// import {
//   setCourse,
//   updateCourseStatus,
// } from "../../../../store/slices/courseSlice";
// import api from "../../../../shared/utils/api";
// import { showToast } from "../../../../shared/utils/toastUtils";
// import { CourseStatus } from "../../../../shared/types/CourseStatus";
// import { getCourseStatusIcon } from "../../../../shared/utils/icons";
// import { getCourseStatusColor } from "../../../../shared/utils/colors";
// import useFetch from "../../../../hooks/useFetch";
// import { Course } from "../../../../shared/types/Course";

// const CourseDetails: React.FC = () => {
//   const { courseId } = useParams();
//   const { course } = useSelector((state: RootState) => state.course);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newStatus, setNewStatus] = useState<CourseStatus>("draft");
//   const dispatch = useDispatch<AppDispatch>();

//   const { data, error, loading } = useFetch<Course>(`/api/courses/${courseId}`);

//   useEffect(() => {
//     if (data) {
//       dispatch(setCourse(data));
//     }
//   }, [data, dispatch]);

//   const handleStatusChange = (status: CourseStatus) => {
//     setNewStatus(status);
//     setIsModalOpen(true);
//   };

//   const confirmStatusChange = async (courseId: string) => {
//     try {
//       const response = await api.patch(
//         `/api/courses/${courseId}/update-status`,
//         { newStatus }
//       );
//       if (response.status === 200) {
//         dispatch(updateCourseStatus(newStatus));
//         showToast.success(response.data.message);
//         setIsModalOpen(false);
//       }
//     } catch (error: any) {
//       showToast.error(error.response?.data?.message || "An error occurred");
//       setIsModalOpen(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 mb-4 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading course details...
//           </h2>
//           <p className="text-gray-500 mt-2">
//             Please wait while we fetch the information
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-red-800">
//             Error fetching course details...
//           </h2>
//           <p className="text-red-500 mt-2">Please try again.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     course && (
//       <>
//         <div className="bg-red-600 text-white p-8">
//           <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center">
//               <Clock className="h-5 w-5 mr-2" />
//               <span>{course.duration} minutes</span>
//             </div>
//             <div className="flex items-center">
//               <Book className="h-5 w-5 mr-2" />
//               <span>{course.lessons.length} lessons</span>
//             </div>
//             <div
//               className={`flex items-center px-3 py-1 rounded-full ${getCourseStatusColor(
//                 course.status
//               )}`}
//             >
//               {getCourseStatusIcon(course.status)}
//               <span className="capitalize">{course.status}</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 space-y-8">
//           <section>
//             <h2 className="text-xl font-semibold text-red-800 mb-4">
//               Description
//             </h2>
//             <p className="text-gray-700 leading-relaxed">
//               {course.description}
//             </p>
//           </section>

//           <section>
//             {course.status === "requested" && (
//               <>
//                 <button
//                   onClick={() => handleStatusChange("approved")}
//                   className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleStatusChange("rejected")}
//                   className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>
//               </>
//             )}
//             {course.status === "approved" && (
//               <>
//                 <button
//                   onClick={() => handleStatusChange("published")}
//                   className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
//                 >
//                   Publish
//                 </button>
//               </>
//             )}
//           </section>

//           <section>
//             <h2 className="text-xl font-semibold text-red-800 mb-4">
//               Learning Lessons
//             </h2>
//             <div className="grid gap-3">
//               {course.lessons.map((lesson) => (
//                 <div
//                   key={lesson.id}
//                   className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
//                 >
//                   <LessonView lessonId={lesson.id} title={lesson.title} />
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold">Confirm Status Change</h2>
//               <p className="mt-2">
//                 Are you sure you want to change the course status to {newStatus}
//                 ?
//               </p>
//               <div className="mt-4 flex justify-end space-x-4">
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="border border-gray-500 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => confirmStatusChange(course.id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     )
//   );
// };

// export default CourseDetails;
