import { useEffect, useState } from "react";
import {
  CourseStatusData,
  EnrollmentRate,
  CompletionRate,
  RevenueRate,
} from "../types/chart";
import { api } from "../configs";
import { generateColor } from "../utils/color-theme.util";

interface MentorDashboardData {
  courseStatusChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  revenueChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  completionRateChartData: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
  enrollmentChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
      fill: boolean;
    }[];
  };
  error: string | null;
  loading: boolean;
}

const useMentorDashboardData = (): MentorDashboardData => {
  const [courseStatuses, setCourseStatuses] = useState<CourseStatusData[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentRate[]>([]);
  const [completionRateData, setCompletionRateData] = useState<
    CompletionRate[]
  >([]);
  const [revenueData, setRevenueData] = useState<RevenueRate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<{
          courseStatusData: CourseStatusData[];
          enrollmentData: EnrollmentRate[];
          completionRateData: CompletionRate[];
          revenueData: RevenueRate[];
        }>(`/api/analysis/mentors`);

        if (response.status === 200) {
          setCourseStatuses(response.data.courseStatusData);
          setEnrollmentData(response.data.enrollmentData);
          setCompletionRateData(response.data.completionRateData);
          setRevenueData(response.data.revenueData);
          setError(null);
        } else {
          setError("Failed to fetch mentor data.");
        }
      } catch (err) {
        console.error("Error fetching mentor data:", err);
        setError("Failed to fetch mentor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart configurations
  const courseStatusChartData = {
    labels: courseStatuses.map((status) => status.status),
    datasets: [
      {
        label: "Course Status",
        data: courseStatuses.map((status) => status.count),
        backgroundColor: courseStatuses.map((status) =>
          generateColor(status.status)
        ),
        borderWidth: 1,
      },
    ],
  };

  const revenueChartData = {
    labels: revenueData.map((data) => data.name),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((data) => data.value),
        backgroundColor: revenueData.map((data) => generateColor(data.name)),
        borderWidth: 1,
      },
    ],
  };

  const completionRateChartData = {
    labels: completionRateData.map((data) => data.course),
    datasets: [
      {
        label: "Completion Rate",
        data: completionRateData.map((data) => data.completionRate),
        backgroundColor: "#8B5CF6",
      },
    ],
  };

  const enrollmentChartData = {
    labels: enrollmentData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Enrollments",
        data: enrollmentData.map((data) => data.enrollments),
        borderColor: "#10B981",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return {
    courseStatusChartData,
    revenueChartData,
    completionRateChartData,
    enrollmentChartData,
    error,
    loading,
  };
};

export default useMentorDashboardData;
