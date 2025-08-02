import { useEffect, useState } from "react";
import {
  AdminDashboardData,
  CoursePerformanceData,
  MonthlyRevenueData,
  UserStatusData,
} from "../types/chart";
import { fetchAdminDashboardData } from "../services";

const useAdminDashboardData = (): AdminDashboardData => {
  const [mentorStatuses, setMentorStatuses] = useState<UserStatusData[]>([]);
  const [learnerStatuses, setLearnerStatuses] = useState<UserStatusData[]>([]);
  const [coursePerformanceData, setCoursePerformanceData] = useState<
    CoursePerformanceData[]
  >([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<
    MonthlyRevenueData[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchAdminDashboardData();

        const {
          mentorStatusData,
          learnerStatusData,
          coursePerformanceData,
          monthlyRevenueData,
        } = response;

        // console.log(response.data);

        setMentorStatuses(mentorStatusData);
        setLearnerStatuses(learnerStatusData);
        setCoursePerformanceData(coursePerformanceData);
        setMonthlyRevenueData(monthlyRevenueData);
        setError(null);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to fetch admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data for learner status distribution
  const learnerStatusChartData = {
    labels: learnerStatuses.map((status) => status.status),
    datasets: [
      {
        label: "Learner Status",
        data: learnerStatuses.map((status) => status.count),
        backgroundColor: learnerStatuses.map((status) =>
          status.status === "blocked" ? "#EF4444" : "#10B981"
        ),
      },
    ],
  };

  // Chart data for mentor status distribution
  const mentorStatusChartData = {
    labels: mentorStatuses.map((status) => status.status),
    datasets: [
      {
        label: "Mentor Status",
        data: mentorStatuses.map((status) => status.count),
        backgroundColor: mentorStatuses.map((status) =>
          status.status === "blocked" ? "#EF4444" : "#10B981"
        ),
      },
    ],
  };

  // Chart data for course performance
  const coursePerformanceChartData = {
    labels: coursePerformanceData.map((data) => data.course),
    datasets: [
      {
        label: "Performance",
        data: coursePerformanceData.map((data) => data.performance),
        backgroundColor: "#10B981",
      },
    ],
  };

  // Chart data for monthly revenue
  const monthlyRevenueChartData = {
    labels: monthlyRevenueData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenueData.map((data) => data.revenue),
        borderColor: "#3B82F6",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return {
    learnerStatusChartData,
    mentorStatusChartData,
    coursePerformanceChartData,
    monthlyRevenueChartData,
    error,
    loading,
  };
};

export default useAdminDashboardData;
