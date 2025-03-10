// import React from "react";
// import { useCourseTableFunctionality } from "../../hooks/useCourseTableFuntionality";
// import {
//   Search,
//   BookOpen,
//   Clock,
//   Users,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   GraduationCap,
//   Filter,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface CourseGridProps {}

// const CourseGrid: React.FC<CourseGridProps> = () => {
//   const {
//     currentPage,
//     searchQuery,
//     data,
//     totalPages,
//     loading,
//     handlePageChange,
//     handleSearchChange,
//   } = useCourseTableFunctionality({ itemsPerPage: 2 });

//   // const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
//   // const [sortBy, setSortBy] = React.useState<string>("popular");

//   const navigate = useNavigate();

//   // const categories = ["All", "Development", "Business", "Design", "Marketing"];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Most Popular Courses
//           </h2>
//           <p className="text-gray-600">
//             Explore our top-rated courses and start learning today
//           </p>
//         </div>

//         {/* Search and Filter */}
//         <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search courses..."
//               value={searchQuery}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               className="pl-10 w-full md:w-[300px] py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
//             <Filter className="h-4 w-4" />
//             Filters
//           </button> */}
//         </div>
//       </div>

//       {/* Categories */}
//       {/* <div className="flex flex-wrap gap-2 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category.toLowerCase())}
//             className={`px-4 py-2 rounded-full ${
//               selectedCategory === category.toLowerCase()
//                 ? "bg-blue-600 text-white"
//                 : "border border-gray-300 text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div> */}

//       {/* Course Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((course) => (
//           <div
//             key={course.id}
//             onClick={() => navigate(`/learner/courses/${course.id}`)}
//             className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
//           >
//             {/* Image and Badge Container */}
//             <div className="relative overflow-hidden rounded-t-xl">
//               <img
//                 src={course.thumbnail}
//                 alt={course.title}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               {/* <span className="absolute top-3 right-3 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
//                 {course.status}
//               </span> */}
//             </div>

//             {/* Content */}
//             <div className="p-6 flex-grow">
//               <div className="flex items-center gap-2 mb-3">
//                 <BookOpen className="w-4 h-4 text-blue-500" />
//                 <span className="text-sm text-gray-600">
//                   {course.category.title}
//                 </span>
//               </div>

//               <h3 className="text-lg font-semibold leading-tight mb-3 group-hover:text-blue-600 transition-colors">
//                 {course.title}
//               </h3>

//               <p className="text-sm text-gray-600 line-clamp-2 mb-4">
//                 {course.description}
//               </p>

//               {/* Course Stats */}
//               <div className="flex items-center gap-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-1">
//                   {/* <Clock className="w-4 h-4" /> */}
//                   {/* <span>{course.duration} hours</span> */}
//                 </div>
//                 {/* <div className="flex items-center gap-1">
//                   <Users className="w-4 h-4" />
//                   <span>2.5k students</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                   <span>4.8</span>
//                 </div> */}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="p-6 pt-0 mt-auto">
//               <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <GraduationCap className="w-5 h-5 text-blue-500" />
//                   <span className="text-sm text-blue-500 font-medium">
//                     Certificate Included
//                   </span>
//                 </div>
//                 <button className="text-blue-600 hover:text-blue-700 transition-colors">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {/* Pagination */}
//       <div className="mt-6 flex justify-end items-center gap-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded border ${
//             currentPage === 1
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-black"
//           }`}
//         >
//           Prev
//         </button>
//         <span className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded border ${
//             currentPage === totalPages
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-black"
//           }`}
//         >
//           Next
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center mt-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseGrid;
