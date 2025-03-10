import {
  Activity,
  Calendar,
  GraduationCap,
  Lightbulb,
  PieChart,
  Settings,
  Users,
} from "lucide-react";

import React from "react";
import { NavLink } from "react-router-dom";

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
    <div className="w-64 bg-white shadow-sm h-screen p-4">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 text-sm rounded-md ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
