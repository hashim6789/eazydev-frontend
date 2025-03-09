// import React, { useState } from "react";
// import { useCategoryTable } from "../hooks/useCategoryTable";
// import { Category } from "../../../shared/types/Category";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Edit2, ListFilter, Plus, Search } from "lucide-react";

// // Define the schema for validation
// const categorySchema = z.object({
//   newTitle: z
//     .string()
//     .min(3, "Title must be at least 3 characters long")
//     .max(100, "Title must be less than 100 characters"),
// });

// // Type for form data
// type FormData = z.infer<typeof categorySchema>;

// interface CategoryTableProps {
//   categories: Category[];
// }

// const CategoriesTable: React.FC<CategoryTableProps> = ({ categories }) => {
//   const [editCategoryId, setEditCategoryId] = useState<string>("");
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);

//   const {
//     isLoading,
//     filterStatus,
//     currentPage,
//     searchQuery,
//     paginatedData,
//     totalPages,
//     isEditModalOpen,
//     setIsEditModalOpen,
//     saveNewCategory,
//     handleSavaTitle,
//     handleEditTitle,
//     handlePageChange,
//     handleSearchChange,
//     handleFilterChange,
//     handleToggleStatus,
//   } = useCategoryTable({ data: categories, itemsPerPage: 5 });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(categorySchema),
//   });

//   const handleOpenEditModal = (category: Category) => {
//     handleEditTitle(category.id);
//     setEditCategoryId(category.id);
//     setValue("newTitle", category.title); // Set initial value for the title
//   };

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     if (isEditModalOpen) {
//       handleSavaTitle(editCategoryId, data.newTitle);
//       reset(); // Reset the form after submission
//       setEditCategoryId(""); // Reset the edit category ID
//     } else {
//       // Save a new category
//       saveNewCategory(data.newTitle);
//       reset(); // Reset the form after submission
//       setCreateModalOpen(false); // Close the create modal
//     }
//   };

//   const handleCloseCreateModal = () => {
//     setCreateModalOpen(false);
//     reset();
//   };

//   return (
//     <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
//       {/* Header Section */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
//         <button
//           onClick={() => setCreateModalOpen(true)}
//           disabled={isLoading}
//           className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Category</span>
//         </button>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="flex flex-wrap gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchQuery}
//             onChange={(e) => handleSearchChange(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
//           />
//         </div>
//         <div className="relative">
//           <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <select
//             value={filterStatus}
//             onChange={(e) =>
//               handleFilterChange(
//                 e.target.value as "all" | "listed" | "unlisted"
//               )
//             }
//             className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
//           >
//             <option value="all">All Status</option>
//             <option value="listed">Listed</option>
//             <option value="unlisted">Unlisted</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {paginatedData.map((category) => (
//               <tr key={category.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {category.title}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
//                       category.status === "listed"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {category.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 space-x-2">
//                   <button
//                     onClick={() =>
//                       handleToggleStatus(category.id, category.status)
//                     }
//                     disabled={isLoading}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       category.status === "listed"
//                         ? "bg-red-50 text-red-600 hover:bg-red-100"
//                         : "bg-green-50 text-green-600 hover:bg-green-100"
//                     }`}
//                   >
//                     {category.status === "listed" ? "Unlist" : "List"}
//                   </button>
//                   <button
//                     onClick={() => handleOpenEditModal(category)}
//                     disabled={isLoading}
//                     className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                   >
//                     <Edit2 className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center text-sm">
//         <p className="text-gray-600">
//           Showing {(currentPage - 1) * 5 + 1} to{" "}
//           {Math.min(currentPage * 5, categories.length)} of {categories.length}{" "}
//           entries
//         </p>
//         <div className="space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal Component */}
//       {(isEditModalOpen || isCreateModalOpen) && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full mx-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               {isEditModalOpen ? "Edit Category" : "Create New Category"}
//             </h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <input
//                   {...register("newTitle")}
//                   placeholder="Category Title"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
//                 />
//                 {errors.newTitle && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.newTitle.message}
//                   </p>
//                 )}
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     reset();
//                     setEditCategoryId("");
//                     setCreateModalOpen(false);
//                     setIsEditModalOpen(false);
//                   }}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   {isEditModalOpen ? "Save Changes" : "Create Category"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesTable;
