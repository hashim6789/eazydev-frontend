// Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  BarChart,
  HelpCircle,
} from "lucide-react";
import { useThemeStyles } from "../../utils/color-theme.util";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  // Get styles based on current theme
  const styles = useThemeStyles();

  const menuItems = [
    { path: "/mentor/dashboard", name: "Dashboard", icon: Home },
    { path: "/mentor/courses", name: "Courses", icon: Users },
    // { path: "/mentor/lessons", name: "Lessons", icon: Users },
    // { path: "/mentor/materials", name: "Materials", icon: Users },
    // { path: "/mentor/students", name: "Students", icon: Users },
    { path: "/mentor/meetings", name: "Meetings", icon: Calendar },
    // { path: "/mentor/resources", name: "Resources", icon: BookOpen },
    { path: "/mentor/chats", name: "Chat Groups", icon: MessageSquare },
    { path: "/mentor/analytics", name: "Analytics", icon: BarChart },
    // { path: "/mentor/support", name: "Support", icon: HelpCircle },
  ];

  return (
    <aside
      className={`fixed left-0 z-30 flex flex-col h-full pt-16 ${
        styles.sidebarBg
      } border-r ${styles.border} transition-all duration-300 ${
        isSidebarOpen ? "md:w-64 w-20" : "w-20"
      }`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? `${styles.primary} ${styles.buttonText}`
                      : `${styles.textPrimary} hover:${styles.lightBg}`
                  } ${!isSidebarOpen ? "justify-center" : ""}`
                }
              >
                <Icon
                  size={20}
                  className={`${!isSidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {isSidebarOpen && (
                  <span
                    className={`${
                      !isSidebarOpen ? "hidden" : "block"
                    } md:block`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
