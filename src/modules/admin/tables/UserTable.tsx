import React from "react";
import useUser from "../../../hooks/useUser";
import { SubRole } from "../../../types";
import { LoadingState } from "../../shared/Error/LoadingState";
import { NoContentState } from "../../shared/Error/NoContentState";
import {
  FilterDropdown,
  Pagination,
  SearchInput,
  TableRow,
} from "../../shared/components";
import { userFilterOptions } from "../../shared/values/user";

interface UserTableProps {
  role: SubRole;
}

const UserTable: React.FC<UserTableProps> = ({ role }) => {
  const {
    data,
    loading,
    currentPage,
    searchQuery,
    filterStatus,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleViewUser,
  } = useUser({ itemsPerPage: 5, role });

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <FilterDropdown
          handleFilterChange={handleFilterChange}
          selectedValue={filterStatus}
          options={userFilterOptions}
        />
      </div>

      {/* Loading and Error States */}
      {loading && <LoadingState />}
      {data && data.length === 0 && <NoContentState />}

      {/* Table */}
      {data.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                role={role}
                handleView={handleViewUser}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
