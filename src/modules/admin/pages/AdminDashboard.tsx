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
