import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";
import AdminNavbar, { Navbar } from "../components/AdminNavbar";
import {
  Bookmark,
  GraduationCap,
  Lightbulb,
  PieChart,
  Users,
} from "lucide-react";

//imported child components

const AdminLayout: React.FC = () => {
  const sidebarItems = [
    {
      icon: <PieChart size={18} />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    { icon: <Users size={18} />, label: "Learners", href: "/admin/learners" },
    { icon: <Lightbulb size={18} />, label: "Mentors", href: "/admin/mentors" },
    {
      icon: <GraduationCap size={18} />,
      label: "Courses",
      href: "/admin/courses",
    },
    {
      icon: <Bookmark size={18} />,
      label: "Category",
      href: "/admin/categories",
    },
    // { icon: <span>💰</span>, label: "Financial", href: "/admin/financial" },
    // { icon: <span>📋</span>, label: "Report", href: "/admin/reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      {/* <Navbar /> */}
      <div className="flex w-screen h-screen">
        <AdminSidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
