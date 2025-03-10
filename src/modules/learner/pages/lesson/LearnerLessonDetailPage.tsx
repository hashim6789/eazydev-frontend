// import { Clock, Book, ArrowLeft } from "lucide-react";

// interface Lesson {
//   id: string;
//   title: string;
//   description: string;
//   materials: { id: string; title: string }[];
//   duration: number;
// }

// const LearnerLessonDetailPage = () => {
//   // Example lesson data - in real app, this would come from props or API
//   const lesson: Lesson = {
//     id: "1",
//     title: "Introduction to React Hooks",
//     description:
//       "Learn the fundamentals of React Hooks and how they can simplify your React components. We'll cover useState, useEffect, and custom hooks with practical examples.",
//     materials: [
//       { id: "m1", title: "React Hooks Documentation" },
//       { id: "m2", title: "useState Example Code" },
//       { id: "m3", title: "useEffect Cheat Sheet" },
//       { id: "m4", title: "Custom Hooks Practice Exercise" },
//     ],
//     duration: 45,
//   };

//   return (
//     <div className="min-h-screen bg-purple-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}
//         <button
//           className="flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors"
//           onClick={() => window.history.back()}
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Lessons
//         </button>

//         {/* Main Content Card */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-purple-600 text-white p-8">
//             <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 mr-2" />
//                 <span>{lesson.duration} minutes</span>
//               </div>
//               <div className="flex items-center">
//                 <Book className="h-5 w-5 mr-2" />
//                 <span>{lesson.materials.length} materials</span>
//               </div>
//             </div>
//           </div>

//           {/* Content Sections */}
//           <div className="p-8 space-y-8">
//             {/* Description Section */}
//             <div>
//               <h2 className="text-xl font-semibold text-purple-800 mb-4">
//                 Description
//               </h2>
//               <p className="text-gray-700 leading-relaxed">
//                 {lesson.description}
//               </p>
//             </div>

//             {/* Materials Section */}
//             <div>
//               <h2 className="text-xl font-semibold text-purple-800 mb-4">
//                 Learning Materials
//               </h2>
//               <div className="grid gap-3">
//                 {lesson.materials.map((material, index) => (
//                   <div
//                     key={material.id}
//                     className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
//                   >
//                     <span className="h-8 w-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full mr-4">
//                       {index + 1}
//                     </span>
//                     <div>
//                       <h3 className="font-medium text-purple-900">
//                         {material.title}
//                       </h3>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
//                 onClick={() => console.log("Start lesson")}
//               >
//                 Start Lesson
//               </button>
//               <button
//                 className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors"
//                 onClick={() => console.log("Download materials")}
//               >
//                 Download Materials
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Progress Section */}
//         <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-xl font-semibold text-purple-800 mb-6">
//             Your Progress
//           </h2>
//           <div className="relative pt-1">
//             <div className="flex mb-2 items-center justify-between">
//               <div>
//                 <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-purple-200 text-purple-700">
//                   In Progress
//                 </span>
//               </div>
//               <div className="text-right">
//                 <span className="text-xs font-semibold inline-block text-purple-700">
//                   30%
//                 </span>
//               </div>
//             </div>
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
//               <div
//                 style={{ width: "30%" }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearnerLessonDetailPage;
