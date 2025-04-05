import { DollarSign, Users, Calendar } from "lucide-react";
import useFetch from "../../../../hooks/useFetch";
import { formatCurrency } from "../../../../utils/formater.util";
import { ErrorState } from "../../../shared/Error";

// Define TypeScript interfaces for the mentor revenue data
interface MentorRevenue {
  totalEarnings: number;
  currentMonthEarnings: number;
  totalStudents: number;
  monthlyEarnings: MonthlyEarning[];
}

interface MonthlyEarning {
  month: string;
  year: number;
  earnings: number;
  // sessionsCount: number;
}

// Sample data for testing the MentorRevenueManagement component
const sampleMentorRevenueData = {
  totalEarnings: 15750.5,
  currentMonthEarnings: 2250.0,
  totalStudents: 43,
  monthlyEarnings: [
    {
      month: "January",
      year: 2025,
      earnings: 1850.75,
      sessionsCount: 15,
    },
    {
      month: "February",
      year: 2025,
      earnings: 2100.25,
      sessionsCount: 17,
    },
    {
      month: "March",
      year: 2025,
      earnings: 1950.5,
      sessionsCount: 16,
    },
    {
      month: "April",
      year: 2025,
      earnings: 2250.0,
      sessionsCount: 18,
    },
  ],
};

const MentorRevenueManagement: React.FC = () => {
  const { data: revenue } = useFetch<MentorRevenue>("/analysis/mentor/revenue");
  // const revenue = sampleMentorRevenueData;

  if (!revenue) return <ErrorState />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Mentor Earnings Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Track your earnings, session revenue, and student engagement.
        </p>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Total Earnings */}
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
                    <dd className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(revenue.totalEarnings || 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Earnings */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Current Month Earnings
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(revenue.currentMonthEarnings || 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Students
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {revenue.totalStudents || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Earnings Trend */}
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Monthly Earnings Trend
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenue.monthlyEarnings &&
                  revenue.monthlyEarnings.length > 0 ? (
                    revenue.monthlyEarnings.map(
                      (monthData: MonthlyEarning, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {monthData.month} {monthData.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(monthData.earnings)}
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                      >
                        No earnings data available
                      </td>
                    </tr>
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

export default MentorRevenueManagement;
