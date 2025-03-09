import React from "react";
import { NavLink } from "react-router-dom";

//interfaces
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <aside className="w-80 bg-white h-100 border-r">
      <div className="py-4 h-100">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
