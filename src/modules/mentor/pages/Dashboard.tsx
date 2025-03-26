import { Pie, Bar, Line } from "react-chartjs-2";
import { GraduationCap, Lightbulb, Users } from "lucide-react";
import { ChartCard } from "../../shared/components";
import useMentorDashboardData from "../../../hooks/useMenorDashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ErrorState, LoadingState } from "../../shared/Error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MentorDashboard: React.FC = () => {
  const {
    courseStatusChartData,
    revenueChartData,
    completionRateChartData,
    enrollmentChartData,
    error,
    loading,
  } = useMentorDashboardData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Course Status Distribution"
          isEmpty={courseStatusChartData.labels.length === 0}
          emptyMessage="No course status data available yet."
        >
          <Pie data={courseStatusChartData} />
        </ChartCard>
        <ChartCard
          title="Revenue Distribution"
          isEmpty={revenueChartData.labels.length === 0}
          emptyMessage="No revenue data available yet."
        >
          <Pie data={revenueChartData} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Course Completion Rate"
          isEmpty={completionRateChartData.labels.length === 0}
          emptyMessage="No completion rate data available yet."
        >
          <Bar data={completionRateChartData} />
        </ChartCard>
        <ChartCard
          title="Monthly Enrollments"
          isEmpty={enrollmentChartData.labels.length === 0}
          emptyMessage="No enrollment data available yet."
        >
          <Line data={enrollmentChartData} />
        </ChartCard>
      </div>
    </div>
  );
};

export default MentorDashboard;
