import React from "react";
import { NavLink } from "react-router-dom";
import { useThemeStyles } from "../../utils/color-theme.util";
import { SidebarContent } from "../../types";

interface SidebarProps {
  isSidebarOpen: boolean;
  sidebarContents: SidebarContent[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  sidebarContents,
}) => {
  const styles = useThemeStyles();

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
          {sidebarContents.map((item) => {
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
