interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="mt-6 flex justify-end items-center gap-2">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded border ${
        currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
      }`}
    >
      Prev
    </button>
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
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
);
