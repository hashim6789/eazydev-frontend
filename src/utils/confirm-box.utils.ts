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

/**
 * Reusable confirmation box for deletion and other actions.
 * @param {string} entity - The entity being deleted (e.g., "material", "course").
 * @param {string} action - The action being performed (e.g., "delete", "archive").
 * @param {boolean} isCritical - Whether the action is critical (determines button colors).
 * @returns {Promise<boolean>} - Returns true if the user confirms, false otherwise.
 */
export const showDeletionConfirmationBox = async (
  entity: string,
  action: string = "delete",
  isCritical: boolean = true
): Promise<boolean> => {
  const result = await MySwal.fire({
    title: `Are you sure you want to ${action} this ${entity}?`,
    text: `You won't be able to revert this action!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: isCritical ? "#E53E3E" : "#6B46C1", // Critical actions (e.g., delete) use red
    cancelButtonColor: "#718096", // Neutral cancel button color
    confirmButtonText: `Yes, ${action} it!`,
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};
