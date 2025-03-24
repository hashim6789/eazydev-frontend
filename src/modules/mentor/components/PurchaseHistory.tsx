import useFetch from "../../../hooks/useFetch";
import { IPurchase } from "../../../types/purchase";
import { ErrorState, LoadingState, NoContentState } from "../../shared/Error";

const PurchaseHistory: React.FC = () => {
  const {
    data: histories,
    loading,
    error,
  } = useFetch<IPurchase[]>("/api/purchases");

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (histories && histories.length === 0) return <NoContentState />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Purchase History</h2>
      <div className="space-y-4">
        {histories?.map((history) => (
          <div
            key={history.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{history.course.title}</h3>
                <p className="text-sm text-gray-600">
                  Purchased on{" "}
                  {new Date(history.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <span className="font-semibold text-blue-600">
                ${history.amount / 100}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                {history.status}
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                View Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
