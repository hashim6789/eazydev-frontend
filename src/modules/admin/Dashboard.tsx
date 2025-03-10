import React, { useState } from "react";
import {
  Users,
  Lightbulb,
  GraduationCap,
  Activity,
  PieChart,
  Calendar,
  Settings,
} from "lucide-react";

interface UserStats {
  totalUsers: number;
  mentors: number;
  learners: number;
}

interface AdminDashboardProps {
  initialStats?: UserStats;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialStats = { totalUsers: 1248, mentors: 186, learners: 1062 },
}) => {
  const [stats, setStats] = useState<UserStats>(initialStats);

  // In a real application, you'd fetch this data from an API
  // This is just for demonstration purposes

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <h1 className="font-bold text-xl text-gray-800">Admin Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium">Online</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-700 font-medium">JD</span>
          </div>
        </div>
      </nav>

      {/* dashboard Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen p-4">
          <ul className="space-y-2">
            <li className="bg-indigo-50 text-indigo-700 rounded-md">
              <a href="#" className="flex items-center space-x-3 p-3">
                <PieChart size={18} />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users size={18} />
                <span>User Management</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Lightbulb size={18} />
                <span>Mentor Portal</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <GraduationCap size={18} />
                <span>Learner Portal</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Activity size={18} />
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Calendar size={18} />
                <span>Schedule</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
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
          </div>

          {/* Recent Activity & User Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    user: "Sarah Johnson",
                    action: "joined as a mentor",
                    time: "10 minutes ago",
                  },
                  {
                    user: "David Lee",
                    action: "completed course: Advanced React",
                    time: "1 hour ago",
                  },
                  {
                    user: "Alex Williams",
                    action: "joined as a learner",
                    time: "3 hours ago",
                  },
                  {
                    user: "Emma Davis",
                    action: "received a 5-star rating",
                    time: "5 hours ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {activity.user
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-sm text-indigo-600 font-medium mt-4">
                View all activity
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                User Distribution
              </h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-8 border-indigo-500 flex items-center justify-center relative">
                  <div className="w-32 h-32 rounded-full border-8 border-purple-500 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Ratio</p>
                      <p className="font-bold text-gray-800">85:15</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded shadow-sm text-xs">
                    <span className="text-purple-500 font-medium">
                      15% Mentors
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 bg-white px-2 py-1 rounded shadow-sm text-xs">
                    <span className="text-indigo-500 font-medium">
                      85% Learners
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Most Active Course</p>
                  <p className="font-medium text-gray-800">Web Development</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Top Location</p>
                  <p className="font-medium text-gray-800">United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
