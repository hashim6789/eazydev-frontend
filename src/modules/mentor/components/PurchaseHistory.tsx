import useFetch from "../../../hooks/useFetch";
import { IPurchase } from "../../../types/purchase";
import { ErrorState, LoadingState, NoContentState } from "../../shared/Error";
import { format } from "date-fns";

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
  const {
    data: purchases,
    loading,
    error,
  } = useFetch<IPurchase[]>("/purchases");

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (purchases && purchases.length === 0) return <NoContentState />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Purchase History</h2>
        {purchases && purchases.length > 0 && (
          <p className="text-sm text-gray-500">{purchases.length} purchases</p>
        )}
      </div>

      {!purchases || purchases.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No purchases yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your purchase history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
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
      )}
    </div>
  );
};

export default PurchaseHistory;
