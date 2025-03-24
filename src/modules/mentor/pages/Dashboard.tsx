import { Pie, Bar, Line } from "react-chartjs-2";
import { GraduationCap, Lightbulb, Users } from "lucide-react";
import { ChartCard } from "../../shared/components";
import useMentorDashboardData from "../../../hooks/useMenorDashboard";

const MentorDashboard: React.FC = () => {
  const {
    courseStatusChartData,
    revenueChartData,
    completionRateChartData,
    enrollmentChartData,
    error,
    loading,
  } = useMentorDashboardData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              {/* <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.totalUsers}
                  </h3> */}
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
              {/* <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.mentors}
                  </h3> */}
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
              {/* <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.learners}
                  </h3> */}
              <p className="text-sm text-green-600 mt-2">
                ↑ 15% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Course Status Distribution">
          <Pie data={courseStatusChartData} />
        </ChartCard>
        <ChartCard title="Revenue Distribution">
          <Pie data={revenueChartData} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Course Completion Rate">
          <Bar data={completionRateChartData} />
        </ChartCard>
        <ChartCard title="Monthly Enrollments">
          <Line data={enrollmentChartData} />
        </ChartCard>
      </div>
    </div>
  );
};

export default MentorDashboard;
