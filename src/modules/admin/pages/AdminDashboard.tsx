import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { ChartCard } from "../../shared/components";
import useAdminDashboardData from "../../../hooks/useAdminDashboard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title
);

const AdminDashboard: React.FC = () => {
  const {
    learnerStatusChartData,
    mentorStatusChartData,
    coursePerformanceChartData,
    monthlyRevenueChartData,
  } = useAdminDashboardData();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.totalUsers}
                  </h3>
              <p className="text-sm text-green-600 mt-2">
                ↑ 12% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mentors</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.mentors}
                  </h3>
              <p className="text-sm text-green-600 mt-2">
                ↑ 5% from last month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Learners</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.learners}
                  </h3>
              <p className="text-sm text-green-600 mt-2">
                ↑ 15% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div> */}

      {/* User Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Learner Status Distribution"
          isEmpty={learnerStatusChartData.labels.length === 0}
          emptyMessage="No learner status data available yet."
        >
          <Pie data={learnerStatusChartData} />
        </ChartCard>

        <ChartCard
          title="Mentor Status Distribution"
          isEmpty={mentorStatusChartData.labels.length === 0}
          emptyMessage="No mentor status data available yet."
        >
          <Pie data={mentorStatusChartData} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Course Performance"
          isEmpty={coursePerformanceChartData.labels.length === 0}
          emptyMessage="No course performance data available yet."
        >
          <Bar data={coursePerformanceChartData} />
        </ChartCard>

        <ChartCard
          title="Monthly Revenue"
          isEmpty={monthlyRevenueChartData.labels.length === 0}
          emptyMessage="No monthly revenue data available yet."
        >
          <Line data={monthlyRevenueChartData} />
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
