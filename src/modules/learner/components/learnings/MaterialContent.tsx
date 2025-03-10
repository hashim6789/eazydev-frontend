// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Play,
//   Pause,
//   Volume2,
//   Maximize2,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Clock,
// } from "lucide-react";
// import { AppDispatch, RootState } from "../../../../store";
// import { updateMaterialProgress } from "../../../../store/slices/learningSlice";
// import LearnerDashboard from "../../pages/LearnerDashboard";
// import api from "../../../../shared/utils/api";

// export interface IMaterial {
//   id: string;
//   title: string;
//   description: string;
//   type: "reading" | "video";
//   duration: number;
//   fileKey: string;
//   isCompleted: boolean;
// }

// interface MaterialContentProps {
//   onNavigate: (direction: "prev" | "next") => void;
//   progressId: string;
// }

// const MaterialContent: React.FC<MaterialContentProps> = ({
//   onNavigate,
//   progressId,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const material = useSelector(
//     (state: RootState) => state.learning.currentMaterial
//   );

//   const [signedUrl, setSignedUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (material) {
//       const getSignedUrl = async () => {
//         try {
//           const response = await api.post(
//             `/api/progress/${progressId}/get-signed-url`,
//             { fileKey: material.fileKey, materialType: material.type }
//           );
//           if (response && response.status === 200) {
//             setSignedUrl(response.data.data);
//           }
//         } catch (error) {
//           console.error("Failed to fetch signed URL:", error);
//         }
//       };
//       getSignedUrl();
//     }
//   }, [material]);

//   if (!material) {
//     return <LearnerDashboard />;
//   }

//   const handleComplete = async () => {
//     const response = await api.put(`/api/progress/${progressId}`, {
//       materialId: material.id,
//     });
//     if (response && response.status === 200) {
//       dispatch(updateMaterialProgress({ id: material.id, isCompleted: true }));
//     }
//   };

//   const ReadingContent = () => (
//     <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
//       <div className="prose max-w-none">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//           {material.title}
//         </h2>
//         <div className="flex items-center gap-4 text-gray-600 mb-6">
//           <div className="flex items-center gap-2">
//             <BookOpen className="w-4 h-4" />
//             <span className="text-sm">Reading Material</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm">{material.duration} min read</span>
//           </div>
//         </div>
//         <div className="text-gray-700 leading-relaxed mb-6">
//           {material.description}
//         </div>
//         {signedUrl && (
//           <div className="bg-gray-50 p-6 rounded-lg mb-6">
//             <iframe
//               src={signedUrl}
//               title="Reading Material"
//               className="w-full h-96"
//               frameBorder="0"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const VideoContent = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//       <div className="relative aspect-video bg-gray-900">
//         <div>
//           <div className="bg-purple-50 rounded-lg p-6 mb-6">
//             <div className="aspect-w-16 aspect-h-9 mb-4">
//               {signedUrl ? (
//                 <video controls className="w-full h-full rounded-lg">
//                   <source src={signedUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <div className="text-center text-gray-500">
//                   Loading video...
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center text-purple-700">
//               <Clock className="w-5 h-5 mr-2" />
//               <span>{material.duration} minutes</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//           {material.title}
//         </h2>
//         <p className="text-gray-700 mb-4">{material.description}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       {/* Navigation */}
//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => onNavigate("prev")}
//           className="flex items-center text-blue-500 hover:text-blue-600"
//         >
//           <ChevronLeft className="w-5 h-5 mr-1" />
//           Previous
//         </button>
//         <button
//           onClick={() => onNavigate("next")}
//           className="flex items-center text-blue-500 hover:text-blue-600"
//         >
//           Next
//           <ChevronRight className="w-5 h-5 ml-1" />
//         </button>
//       </div>

//       {/* Content */}
//       {material.type === "reading" ? <ReadingContent /> : <VideoContent />}

//       {/* Actions */}
//       <div className="flex justify-between items-center">
//         <div className="text-sm text-gray-600">
//           {material.isCompleted && (
//             <span className="flex items-center text-green-600">
//               <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
//               Completed
//             </span>
//           )}
//         </div>
//         <button
//           onClick={handleComplete}
//           disabled={material.isCompleted}
//           className={`px-6 py-2 rounded-lg transition-colors ${
//             material.isCompleted
//               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           {material.isCompleted ? "Completed" : "Mark as Complete"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MaterialContent;
