"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { CourseStatus } from "../../../types";
import { getUserProperty } from "../../../utils/local-user.util";
import { api } from "../../../configs";
import { generateColor } from "../../../utils/color-theme.util";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title
);

// Interface definitions for the fetched data
interface CourseStatusData {
  status: CourseStatus;
  count: number;
}

interface EnrollmentRate {
  month: string;
  enrollments: number;
}

interface CompletionRate {
  course: string;
  completionRate: number;
}

interface RevenueRate {
  name: string;
  value: number;
}

// Course status colors
const COURSE_STATUS_COLORS: Record<CourseStatus, string> = {
  approved: "#8B5CF6",
  rejected: "#EF4444",
  // completed: "#10B981",
  requested: "#F59E0B",
  published: "#3B82F6",
  draft: "#6B7280",
};

const MentorDashboard: React.FC = () => {
  // State management for fetched data
  const [courseStatuses, setCourseStatuses] = useState<CourseStatusData[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentRate[]>([]);
  const [completionRateData, setCompletionRateData] = useState<
    CompletionRate[]
  >([]);
  const [revenueData, setRevenueData] = useState<RevenueRate[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        backgroundColor: courseStatuses.map(
          (status) => COURSE_STATUS_COLORS[status.status]
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Mentor Dashboard</h1>

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

// Reusable ChartCard component
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-[300px]">{children}</div>
  </div>
);

export default MentorDashboard;
