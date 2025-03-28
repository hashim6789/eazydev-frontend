import { Pie, Bar, Line } from "react-chartjs-2";
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
