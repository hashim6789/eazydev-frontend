import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useBlockUnblock from "../../../hooks/useBlockUnblock";

import Swal from "sweetalert2";
import { api } from "../configs";
import { SubRole, User, UserStatus } from "../types";
import { showErrorToast, showSuccessToast } from "../utils";

interface UseTableFunctionalityOptions {
  itemsPerPage: number;
  role: "mentor" | "learner"; // Specify the role of the users
}

const useUser = ({ itemsPerPage, role }: UseTableFunctionalityOptions) => {
  //   const { handleBlockUnblock, isLoading } = useBlockUnblock();
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
        const response = await api.get(
          `/api/users?role=${role}&status=${filterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;

        // const users: User[] = Array.isArray(result.body)
        //   ? result.data.map((item: any) => ({
        //       id: item.id,
        //       firstName: item.firstName,
        //       lastName: item.lastName,
        //       email: item.email,
        //       //   role: item.role,
        //       isVerified: item.isVerified,
        //       isBlocked: item.isBlocked,
        //       //   profilePicture: item.profilePicture || "",
        //     }))
        //   : [];
        // console.log(users);

        setData(result.body);
        setTotalPages(result.last_page);
        // setTotalPages(Math.ceil(result.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching users:", error);
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

  // const handleBlockUnblockWrapper = async (userId: string) => {
  //   try {
  //     const newStatus = data.find((user) => user.id === userId)?.isBlocked
  //       ? "unblocked"
  //       : "blocked";

  //     const result = await handleBlockUnblock(userId, role, newStatus);

  //     if (result) {
  //       setData((prevState) =>
  //         prevState.map((user) =>
  //           user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
  //         )
  //       );
  //       showSuccessToast(
  //         `User ${
  //           newStatus === "blocked" ? "blocked" : "unblocked"
  //         } successfully!`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Failed to block/unblock user:", error);
  //     showErrorToast("Failed to block/unblock user.");
  //   }
  // };

  const handleViewUser = (userId: string, role: SubRole) =>
    navigate(`/admin/${role}s/${userId}`);

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6B46C1",
      cancelButtonColor: "#E53E3E",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/users/${userId}`);
        showSuccessToast("User deleted successfully!");
        setData((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        // Adjust the current page if necessary
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
    // isLoading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleViewUser,
    handleDeleteUser,
    // handleBlockUnblockWrapper,
  };
};

export default useUser;
