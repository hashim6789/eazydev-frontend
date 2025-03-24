import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../configs";

// Define the purchase type as specified
type Purchase = {
  purchaseId: string;
  purchaseDate: number;
  amount: number;
  status: string;
};

const PaymentSuccess = () => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock data based on the specified type
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        // Fetch purchase details via API
        const response = await api.get(`/api/purchases/${purchaseId}`);
        setPurchase({
          purchaseId: response.data.purchaseId || "PURCH-123456",
          purchaseDate: response.data.purchaseDate || Date.now(),
          amount: response.data.amount || 9900,
          status: response.data.status || "completed",
        });
      } catch (error) {
        console.error("Error fetching purchase details:", error);
      } finally {
        setLoading(false);

        // Trigger animations after data is loaded
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    if (purchaseId) {
      fetchPurchaseDetails();
    }
  }, [purchaseId]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Error Loading Details
          </h2>
          <p className="mt-2 text-gray-600">
            Unable to find your purchase information.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-2xl mx-auto text-center mb-8 transition-all duration-700 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-14 h-14 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your transaction has been completed.
        </p>
      </div>

      <div
        className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${
          isLoaded
            ? "opacity-100 transform-none"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-xl font-semibold text-white">Purchase Details</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div
              className={`flex items-center justify-between border-b pb-4 transition-all duration-700 delay-100 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Order ID</span>
              </div>
              <span className="font-medium text-gray-900">
                {purchase.purchaseId}
              </span>
            </div>

            <div
              className={`flex items-center justify-between border-b pb-4 transition-all duration-700 delay-200 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Purchase Date</span>
              </div>
              <span className="font-medium text-gray-900">
                {formatDate(purchase.purchaseDate)}
              </span>
            </div>

            <div
              className={`flex items-center justify-between border-b pb-4 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Status</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {purchase.status}
              </span>
            </div>

            <div
              className={`flex items-center justify-between pt-4 transition-all duration-700 delay-400 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-semibold">
                  Total Amount
                </span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {formatAmount(purchase.amount)}
              </span>
            </div>
          </div>

          <div
            className={`mt-10 space-y-4 transition-all duration-700 delay-500 ${
              isLoaded
                ? "opacity-100 transform-none"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center"
              onClick={() => navigate("/learner/courses")}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              View My Courses
            </button>

            <button
              className="w-full py-3 px-4 border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
              onClick={() => window.print()}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Receipt
            </button>

            <div className="text-center mt-6">
              <button
                className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                onClick={() => navigate("/dashboard")}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div
          className={`bg-gray-50 px-6 py-4 border-t border-gray-100 transition-all duration-700 delay-600 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>

      <div
        className={`text-center mt-8 text-sm text-gray-500 transition-opacity duration-700 delay-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </div>
    </div>
  );
};

export default PaymentSuccess;
