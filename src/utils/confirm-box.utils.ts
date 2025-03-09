import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Reusable confirmation box
export const showConfirmationBox = async (
  action: string,
  role: string,
  currentStatus: boolean = false
): Promise<boolean> => {
  const result = await MySwal.fire({
    title: `Are you sure you want to ${action} this ${role}?`,
    text: `This action will ${action} the ${role}.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: currentStatus ? "#3085d6" : "#d33",
    cancelButtonColor: "#aaa",
    confirmButtonText: `Yes, ${action}`,
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};
