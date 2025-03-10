// // components/CourseLearningLayout.tsx
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronUp, ChevronDown, BookOpen, ArrowLeft } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import LoadingComponent from "../../../mentor/components/LoadingComponent";
// import ErrorComponent from "../../../mentor/components/ErrorComponent";
// import NoContentComponent from "../../../mentor/components/NoContentComponent";
// import { AppDispatch, RootState } from "../../../../store";
// import {
//   setCurrentMaterial,
//   setError,
//   setLessons,
//   setLoading,
// } from "../../../../store/slices/learningSlice";
// import useFetch from "../../../../hooks/useFetch";
// import MaterialContent from "../../components/learnings/MaterialContent";

// interface Material {
//   id: string;
//   title: string;
//   description: string;
//   type: "reading" | "video";
//   duration: number;
//   fileKey: string;
//   isCompleted: boolean;
// }

// interface Lesson {
//   id: string;
//   title: string;
//   duration: number;
//   materials: Material[];
//   mentorId: string;
//   courseId: string;
// }

// const CourseLearningLayout = () => {
//   const navigate = useNavigate();
//   const { progressId } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { lessons } = useSelector((state: RootState) => state.learning);
//   const currentMaterial = useSelector(
//     (state: RootState) => state.learning.currentMaterial
//   );

//   const handleNavigate = (direction: "prev" | "next") => {
//     // Navigation logic for materials
//   };

//   const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

//   const { data, error, loading } = useFetch<Lesson[]>(
//     `/api/progress/${progressId}`
//   );

//   useEffect(() => {
//     if (data) {
//       dispatch(setLessons(data));
//     } else if (error) {
//       dispatch(setError("Failed to fetch lessons"));
//     }
//   }, [data, error, dispatch]);

//   const toggleLesson = (lessonId: string) => {
//     setExpandedLessons((prev) =>
//       prev.includes(lessonId)
//         ? prev.filter((id) => id !== lessonId)
//         : [...prev, lessonId]
//     );
//   };

//   const handleMaterialClick = (material: Material) => {
//     dispatch(setCurrentMaterial(material));
//   };

//   if (loading) return <LoadingComponent item="course learnings" theme="blue" />;
//   if (error) return <ErrorComponent item="course learnings" theme="blue" />;
//   if (lessons && lessons.length === 0)
//     return <NoContentComponent item="course learnings" theme="blue" />;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <button
//             onClick={() => navigate("/learner/my-learnings")}
//             className="flex items-center text-blue-600 hover:text-blue-700"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Learnings
//           </button>
//         </div>

//         {/* Lessons List */}
//         <div className="flex-1 overflow-y-auto py-4">
//           <div className="px-4 mb-4">
//             <h1 className="text-xl font-semibold text-gray-900">
//               Course Content
//             </h1>
//           </div>

//           {lessons.map((lesson) => (
//             <div key={lesson.id} className="mb-2">
//               {/* Lesson Header */}
//               <button
//                 onClick={() => toggleLesson(lesson.id)}
//                 className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <div className="flex items-center space-x-3">
//                   <BookOpen className="w-5 h-5 text-blue-500" />
//                   <div className="text-left">
//                     <div className="font-medium text-gray-900">
//                       {lesson.title}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {lesson.duration} mins
//                     </div>
//                   </div>
//                 </div>
//                 {expandedLessons.includes(lesson.id) ? (
//                   <ChevronUp className="w-5 h-5 text-gray-400" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 )}
//               </button>

//               {/* Materials List */}
//               {expandedLessons.includes(lesson.id) && (
//                 <div className="pl-12 pr-4 py-2 space-y-2">
//                   {lesson.materials.map((material) => (
//                     <button
//                       key={material.id}
//                       onClick={() => handleMaterialClick(material)}
//                       className={`w-full px-3 py-2 rounded-lg text-left flex items-center space-x-3 transition-colors
//                         ${
//                           currentMaterial && currentMaterial.id === material.id
//                             ? "bg-blue-50 text-blue-600"
//                             : "hover:bg-gray-50 text-gray-700"
//                         }`}
//                     >
//                       <div
//                         className={`w-2 h-2 rounded-full ${
//                           material.isCompleted ? "bg-blue-500" : "bg-gray-300"
//                         }`}
//                       />
//                       <span className="text-sm">{material.title}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 space-y-2">
//           {/* <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
//             Course Community
//           </button> */}
//           <button
//             onClick={() =>
//               navigate(
//                 `/learner/meets/${lessons[0].mentorId}/${lessons[0].courseId}`
//               )
//             }
//             className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
//           >
//             Connect Mentor
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <MaterialContent
//           onNavigate={handleNavigate}
//           progressId={progressId as string}
//         />
//       </div>
//     </div>
//   );
// };

// export default CourseLearningLayout;
