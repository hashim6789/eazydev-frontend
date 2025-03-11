"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { api } from "../../../configs";

ChartJS.register(ArcElement, Tooltip, Legend);

export type CourseStatus =
  | "approved"
  | "rejected"
  | "completed"
  | "requested"
  | "published"
  | "draft";

interface CourseStatusData {
  status: CourseStatus;
  count: number;
}

const COLORS = {
  approved: "#8B5CF6",
  rejected: "#EF4444",
  completed: "#10B981",
  requested: "#F59E0B",
  published: "#3B82F6",
  draft: "#6B7280",
};

const MentorDashboard: React.FC = () => {
  const [courseStatuses, setCourseStatuses] = useState<CourseStatusData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/analysis/mentors/67971495a41657d403187898/courses`
        );

        if (response && response.status === 200) {
          setCourseStatuses(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: courseStatuses.map((item) => item.status),
    datasets: [
      {
        data: courseStatuses.map((item) => item.count),
        backgroundColor: courseStatuses.map((item) => COLORS[item.status]),
        hoverBackgroundColor: courseStatuses.map((item) => COLORS[item.status]),
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Mentor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Course Status Distribution
          </h2>
          <div className="h-[300px] flex justify-center items-center">
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
