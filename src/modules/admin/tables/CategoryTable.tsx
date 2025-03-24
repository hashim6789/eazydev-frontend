import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Plus } from "lucide-react";
import { useCategoryTable } from "../../../hooks/useCategoryTable";
import { Category } from "../../../types";
import {
  FilterDropdown,
  Pagination,
  SearchInput,
} from "../../shared/components";
import { categoryFilterOptions } from "../../shared/values/filter";
import { LoadingState, NoContentState } from "../../shared/Error";

// Define the schema for validation
const categorySchema = z.object({
  newTitle: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters"),
});

// Type for form data
type FormData = z.infer<typeof categorySchema>;

interface CategoryTableProps {}

const CategoryTable: React.FC<CategoryTableProps> = ({}) => {
  const [editCategoryId, setEditCategoryId] = useState<string>("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const {
    isLoading,
    filterStatus,
    currentPage,
    searchQuery,
    paginatedData,
    totalPages,
    isEditModalOpen,
    handleSaveTitle,
    setIsEditModalOpen,
    saveNewCategory,
    handleEditTitle,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleToggleStatus,
  } = useCategoryTable({ itemsPerPage: 5, role: "admin" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleOpenEditModal = (category: Category) => {
    if (!isEditModalOpen) {
      setIsEditModalOpen(true); // Ensure this is set only when needed
    }
    handleEditTitle(category.id);
    setEditCategoryId(category.id);
    setValue("newTitle", category.title); // Set initial value for the title
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEditModalOpen) {
      handleSaveTitle(editCategoryId, data.newTitle);
      reset(); // Reset the form after submission
      setEditCategoryId(""); // Reset the edit category ID
    } else {
      // Save a new category
      saveNewCategory(data.newTitle);
      reset(); // Reset the form after submission
      setCreateModalOpen(false); // Close the create modal
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          onClick={() => setCreateModalOpen(true)}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <FilterDropdown
          handleFilterChange={handleFilterChange}
          selectedValue={filterStatus}
          options={categoryFilterOptions}
        />
      </div>

      {/* Loading and Error States */}
      {isLoading && <LoadingState />}
      {paginatedData && paginatedData.length === 0 && <NoContentState />}

      {/* Table */}

      <div className="overflow-x-auto">
        {paginatedData.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {category.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        category.isListed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.isListed ? "Listed" : "Unlisted"}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() =>
                        handleToggleStatus(
                          category.id,
                          category.isListed ? "listed" : "unlisted"
                        )
                      }
                      disabled={isLoading}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        category.isListed
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {category.isListed ? "Unlist" : "List"}
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(category)}
                      disabled={isLoading}
                      className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      {/* Modal Component */}
      {(isEditModalOpen || isCreateModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditModalOpen ? "Edit Category" : "Create New Category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("newTitle")}
                  placeholder="Category Title"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
                {errors.newTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newTitle.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setEditCategoryId("");
                    setCreateModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {isEditModalOpen ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
