import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { PaginatedData } from "../../../types";
import { IPurchase } from "../../../types/purchase";
import { ErrorState, LoadingState, NoContentState } from "../Error";
import { format } from "date-fns";
import { Pagination } from "./Pagination";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "success":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const PurchaseHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: purchases,
    loading,
    error,
  } = useFetch<PaginatedData<IPurchase>>(
    `/purchases?page=${currentPage}&limit=${pageSize}`
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!purchases || purchases.body.length === 0) return <NoContentState />;

  const totalPages = purchases.last_page;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Purchase History</h2>
        <p className="text-sm text-gray-500">
          {purchases.body.length} purchases
        </p>
      </div>

      <div className="space-y-4">
        {purchases.body.map((purchase) => (
          <div
            key={purchase.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="sm:flex justify-between items-start mb-3">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-medium text-gray-900">
                  {purchase.course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Purchased on{" "}
                  {format(new Date(purchase.purchaseDate), "MMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Order #{purchase.purchaseId.slice(-8)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-900">
                  ${(purchase.amount / 100).toFixed(2)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(
                    purchase.status
                  )}`}
                >
                  {purchase.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PurchaseHistory;
