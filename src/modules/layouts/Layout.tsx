import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStyles } from "../../utils/color-theme.util";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { AdminSidebarItems, mentorSidebarItems } from "../shared/values";
import { UserRole } from "../../types";

interface LayoutProps {
  role: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Get styles based on the current theme
  const styles = useThemeStyles();

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarContents =
    role === "admin" ? AdminSidebarItems : mentorSidebarItems;

  return (
    <div
      className={`flex flex-col min-h-screen ${styles.darkBg} transition-colors duration-300`}
    >
      {/* Navbar */}
      <Navbar role={role} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-1 overflow-hidden pt-16 `}>
        {/* Sidebar */}
        <Sidebar
          sidebarContents={sidebarContents}
          isSidebarOpen={isSidebarOpen}
        />
        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 min-h-screen ${
            isSidebarOpen ? "md:ml-64 ml-20" : "ml-20"
          } transition-all duration-300 ease-in-out `}
        >
          {/* The `Outlet` container's background dynamically adapts */}
          <div className={`flex-1 overflow-y-auto p-4 ${styles.textPrimary}`}>
            <Outlet />
          </div>
          {/* Footer */}
          <Footer role={role} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
