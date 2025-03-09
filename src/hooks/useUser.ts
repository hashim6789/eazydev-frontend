import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../configs";
import { SubRole, User, UserStatus } from "../types";
import { showErrorToast, showSuccessToast } from "../utils";
import { showConfirmationBox } from "../utils/confirm-box.utils";
import { ResponseErrorMessages, UserMessages } from "../constants";

interface UseTableFunctionalityOptions {
  itemsPerPage: number;
  role: SubRole;
}

const useUser = ({ itemsPerPage, role }: UseTableFunctionalityOptions) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | UserStatus>("all");
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setData([]);
        const response = await api.get(
          `/api/users?role=${role}&status=${filterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;

        setData(result.body);
        setTotalPages(result.last_page);
      } catch (error) {
        console.error(ResponseErrorMessages.ERROR_OCCURRED, error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [role, filterStatus, searchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: "all" | UserStatus) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleViewUser = (userId: string, role: SubRole) =>
    navigate(`/admin/${role}s/${userId}`);

  const handleDeleteUser = async (userId: string) => {
    const isConfirmed = await showConfirmationBox("delete", role, true);

    if (isConfirmed) {
      try {
        await api.delete(`/api/users/${userId}`);
        showSuccessToast(UserMessages.USER_DELETE_SUCCESS);
        setData((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        if (data.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      } catch (error: any) {
        showErrorToast(error.response.data.error);
      }
    }
  };

  return {
    currentPage,
    searchQuery,
    data,
    totalPages,
    loading,
    userStatus: data.map((user) => (user.isBlocked ? "blocked" : "unblocked")), // Optional if required
    filterStatus,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleViewUser,
    handleDeleteUser,
  };
};

export default useUser;
