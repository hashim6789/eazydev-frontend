import React from "react";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = ({}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">Hello, Admin!</h1>
    </div>
  );
};

export default AdminDashboard;
