import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStyles } from "../../utils/color-theme.util";
import Navbar from "../components/MentorNavbar";
import Sidebar from "../components/MentorSidebar";
import { Footer } from "../components/MentorFooter";

const MentorLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Get styles based on the current theme
  const styles = useThemeStyles();

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${styles.darkBg} transition-colors duration-300`}
    >
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`flex flex-1 overflow-hidden pt-16 `}>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MentorLayout;
