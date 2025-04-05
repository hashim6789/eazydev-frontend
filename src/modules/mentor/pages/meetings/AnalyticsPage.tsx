import { ArrowUpIcon, DollarSign, CreditCard } from "lucide-react";
import { Wallet } from "../../../../types";
import useFetch from "../../../../hooks/useFetch";
import { ErrorState, NoContentState } from "../../../shared/Error";
import { formatCurrency } from "../../../../utils/formater.util";
import { formatTo12HourTime } from "../../../../utils/date.util";
import {
  getTransactionStatusColor,
  getTransactionTypeColor,
} from "../../../../utils/color-theme.util";

// Type definitions

const MentorEarningsPage: React.FC = () => {
  const { data: wallet } = useFetch<Wallet>("/wallets");
  // Sample data - this would come from your API in a real app

  // const [selectedFilter, setSelectedFilter] = useState<TransactionType | "ALL">(
  //   "ALL"
  // );

  // // Filter transactions based on selected type
  // const filteredTransactions = wallet
  //   ? selectedFilter === "ALL"
  //     ? wallet.transactions
  //     : wallet.transactions.filter((t) => t.type === selectedFilter)
  //   : [];

  if (!wallet) return <ErrorState />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your earnings, view transaction history, and withdraw funds
        </p>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Earnings
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(wallet.totalEarnings || 0)}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="sr-only">Increased by</span>
                        {wallet.earningRate}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Available Balance
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(wallet.balance || 0)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {/* <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
              <button className="font-medium text-blue-600 hover:text-blue-500">
              Withdraw funds →
              </button>
              </div>
              </div> */}
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gray-100 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Platform Fees
                    </dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(wallet.platformFees || 0)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {wallet.platformFeesRate}% of total earnings
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          {/* <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Transaction History
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </button>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div> */}

          {/* Filter Pills */}
          <div className="mb-6 flex space-x-2">
            {/* <button
              onClick={() => setSelectedFilter("ALL")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedFilter === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("purchase")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedFilter === "purchase"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              Purchases
            </button>
            <button
              onClick={() => setSelectedFilter("platform_fee")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedFilter === "platform_fee"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              Platform Fees
            </button> */}
            {/* <button
              onClick={() => setSelectedFilter("purchase")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedFilter === "purchase"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
            >
              Refunds
            </button>
            <button
              onClick={() => setSelectedFilter("subscription")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedFilter === "subscription"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              Bonuses
            </button> */}
          </div>

          {/* Transactions Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wallet.transactions.length > 0 ? (
                    wallet.transactions.map((transaction, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransactionTypeColor(
                                transaction.type
                              )}`}
                            >
                              {transaction.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTo12HourTime(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${
                              transaction.type === "purchase" ||
                              transaction.type === "subscription"
                                ? "text-green-600"
                                : transaction.type === "platform_fee" ||
                                  transaction.type === "purchase"
                                ? "text-red-600"
                                : "text-gray-900"
                            }`}
                          >
                            {transaction.type === "purchase" ||
                            transaction.type === "subscription"
                              ? "+"
                              : "-"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransactionStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.paymentId}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <NoContentState />
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorEarningsPage;
