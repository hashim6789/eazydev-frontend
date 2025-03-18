// import React from "react";

// //imported child components
// import CategoriesTable from "../../tables/CategoryTable";

// //imported custom hooks
// import useFetch from "../../../../hooks/useFetch";
// import { ChevronRight, Categorys } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// //subclasses
// import { Category } from "../../../../shared/types/Category";

// interface AdminCategoryManagementProps {}

// const AdminCategoryManagement: React.FC<AdminCategoryManagementProps> = () => {
//   const { data, loading, error } = useFetch<any[] | null>("/api/categories");

//   const navigate = useNavigate();

//   const categories: Category[] = Array.isArray(data)
//     ? data.map((item: Category) => ({
//         id: item.id,
//         title: `${item.title}`,
//         status: item.isListed ? "listed" : "unlisted",
//         isListed: item.isListed,
//       }))
//     : [];

//   //loading handling
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading categories details...
//           </h2>
//           <p className="text-gray-500 mt-2">
//             Please wait while we fetch the information
//           </p>
//         </div>
//       </div>
//     );
//   }

//   //error handling
//   if (error) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-red-800">
//             error fetch categories details...
//           </h2>
//           <p className="text-red-500 mt-2">Please try again (:</p>
//         </div>
//       </div>
//     );
//   }

//   //error handling (no categories found)
//   if (data && data.length === 0) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-red-800">
//             No Categories Available...
//           </h2>
//           <p className="text-red-500 mt-2">Unavailable data (:</p>
//         </div>
//       </div>
//     );
//   }

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
//         <span className="text-red-600 font-medium">Categories</span>
//       </nav>

//       {/* Title Section */}
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-red-100 rounded-lg">
//           <Categorys className="h-6 w-6 text-red-600" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           Categories Overview
//         </h1>
//       </div>

//       {/* Content */}
//       <div>
//         <CategoriesTable categories={categories} />
//       </div>
//     </div>
//   );
// };

// export default AdminCategoryManagement;

//imported sub classes

//imported child components
import CategoryTable from "../../tables/CategoryTable";

//imported built-in ui components
import { Breadcrumb, TitleSection } from "../../../shared/components";
import { Group } from "lucide-react";

interface AdminCategoryProps {}

const AdminCategoryManagement: React.FC<AdminCategoryProps> = ({}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { title: "Dashboard", link: "/admin/dashboard" },
          { title: "Categories", link: "" },
        ]}
      />

      {/* Title Section */}
      <TitleSection
        icon={<Group className="h-6 w-6" />}
        title={`Categories Overview`}
      />

      {/* Content */}
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default AdminCategoryManagement;
