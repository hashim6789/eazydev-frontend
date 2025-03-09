// //imported build-in ui components
// import { BookOpen, Clock, Users } from "lucide-react";

// //imported build-in hooks
// import { useParams } from "react-router-dom";

// //imported custom hooks
// import useFetch from "../../../../hooks/useFetch";

// //imported child components
// interface ICourse {
//   id: string;
//   title: string;
//   description: string | null;
//   thumbnail: string | null;
//   duration: string | null;
//   purchaseCount: number | null;
//   status: string | null;
// }

// interface MentorDetailsProps {}

// interface Mentor {
//   firstName: string;
//   lastName: string | null;
//   email: string;
//   profilePicture: string | null;
//   createdCourses: ICourse[];
//   isBlocked: boolean | null;
// }

// const AdminMentorDetails = ({}: MentorDetailsProps) => {
//   const { mentorId } = useParams();
//   const { data: mentor, loading: mentorLoading } = useFetch<Mentor>(
//     `/admin/mentors/${mentorId}`
//   );

//   const getInitials = (firstName: string, lastName: string | null) => {
//     return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
//   };

//   //loading handling
//   if (mentorLoading) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading mentor details...
//           </h2>
//           <p className="text-gray-500 mt-2">
//             Please wait while we fetch the information
//           </p>
//         </div>
//       </div>
//     );
//   }

//   //error handling
//   if (!mentor) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-red-800">
//             Error fetching mentor details...
//           </h2>
//           <p className="text-red-500 mt-2">Please try again (:</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       {/* Profile Header */}
//       <div className="bg-white rounded-lg shadow-md mb-8 p-6">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           {/* Avatar */}
//           <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
//             {mentor.profilePicture ? (
//               <img
//                 src={mentor.profilePicture}
//                 alt={`${mentor.firstName}'s profile`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-2xl font-semibold text-gray-600">
//                 {getInitials(mentor.firstName, mentor.lastName)}
//               </span>
//             )}
//           </div>

//           {/* User Info */}
//           <div className="flex-1 text-center md:text-left">
//             <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//               <h1 className="text-2xl font-bold">
//                 {mentor.firstName} {mentor.lastName}
//               </h1>
//               {mentor.isBlocked && (
//                 <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-md">
//                   Blocked
//                 </span>
//               )}
//             </div>
//             <p className="text-gray-500">{mentor.email}</p>
//           </div>

//           {/* Stats */}
//           <div className="flex items-center gap-4">
//             <div className="text-center">
//               <p className="text-2xl font-bold">
//                 {mentor.createdCourses.length}
//               </p>
//               <p className="text-sm text-gray-500">Courses Created</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Created Courses */}
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <BookOpen className="h-5 w-5" />
//             Created Courses
//           </h2>
//         </div>

//         <div className="p-6">
//           <div className="h-[600px] overflow-y-auto pr-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {mentor.createdCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden"
//                 >
//                   {course.thumbnail && (
//                     <div className="aspect-video relative">
//                       <img
//                         src={course.thumbnail}
//                         alt={course.title}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   )}
//                   <div className="p-4">
//                     <h3 className="font-semibold mb-2">{course.title}</h3>
//                     {course.description && (
//                       <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                         {course.description}
//                       </p>
//                     )}
//                     <div className="flex items-center gap-4 text-sm text-gray-500">
//                       {course.duration && (
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           {course.duration}
//                         </div>
//                       )}
//                       {course.purchaseCount && (
//                         <div className="flex items-center gap-1">
//                           <Users className="h-4 w-4" />
//                           {course.purchaseCount} enrolled
//                         </div>
//                       )}
//                     </div>
//                     {course.status && (
//                       <span
//                         className={`inline-block mt-3 px-2 py-1 text-sm font-medium rounded-md
//                         ${
//                           course.status === "published"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {course.status}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminMentorDetails;
