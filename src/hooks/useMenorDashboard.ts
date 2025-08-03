import { useEffect, useState } from "react";
import {
  CourseStatusData,
  EnrollmentRate,
  CompletionRate,
  RevenueRate,
  MentorDashboardData,
} from "../types/chart";
import { generateColor } from "../utils/color-theme.util";
import { fetchMentorDashboardData } from "../services";
import { getAxiosErrorMessage } from "../utils";
import { AnalyzeMessages } from "../constants";

const useMentorDashboardData = (): MentorDashboardData => {
  const [courseStatuses, setCourseStatuses] = useState<CourseStatusData[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentRate[]>([]);
  const [completionRateData, setCompletionRateData] = useState<
    CompletionRate[]
  >([]);
  const [revenueData, setRevenueData] = useState<RevenueRate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMentorDashboardData();

        setCourseStatuses(data.courseStatusData);
        setEnrollmentData(data.enrollmentData);
        setCompletionRateData(data.completionRateData);
        setRevenueData(data.revenueData);
        setError(null);
      } catch (err: unknown) {
        const message = getAxiosErrorMessage(
          err,
          AnalyzeMessages.ERROR.FETCH_MENTOR_DATA
        );
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
