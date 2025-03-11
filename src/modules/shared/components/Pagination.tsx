import React from "react";
import { useThemeStyles } from "../../../utils/color-theme.util";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const styles = useThemeStyles(); // Get theme styles dynamically

  return (
    <div className="mt-6 flex justify-end items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded border ${
          currentPage === 1
            ? `${styles.textSecondary} cursor-not-allowed opacity-50`
            : styles.textPrimary
        }`}
      >
        Prev
      </button>

      {/* Page Info */}
      <span className={`text-sm ${styles.textSecondary}`}>
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded border ${
          currentPage === totalPages
            ? `${styles.textSecondary} cursor-not-allowed opacity-50`
            : styles.textPrimary
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
