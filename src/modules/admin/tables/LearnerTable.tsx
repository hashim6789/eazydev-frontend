interface UserTableProps {
  role: SubRole;
}

import userImage from "../../../assets/img/user_image.avif";
import useUser from "../../../hooks/useUser";
import { SubRole } from "../../../types";
import { LoadingState } from "../../shared/Error/LoadingState";
import { NoContentState } from "../../shared/Error/NoContentState";

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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <select
          value={filterStatus}
          onChange={(e) =>
            handleFilterChange(
              e.target.value as "all" | "blocked" | "unblocked"
            )
          }
          className="ml-4 px-4 py-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="blocked">Blocked</option>
          <option value="unblocked">Unblocked</option>
        </select>
      </div>
      {loading && <LoadingState />}
      {data && data.length === 0 && <NoContentState />}
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
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.profilePicture || userImage}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.src = userImage;
                        }}
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isBlocked === true
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.isBlocked === true ? "blocked" : "unblocked"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewUser(user.id, role)}
                    className="text-sm px-4 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-end items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
