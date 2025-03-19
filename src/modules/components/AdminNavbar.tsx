//imported build-in ui components
import { User, Mail, LogOut } from "lucide-react";

//imported custom hooks

//imported build-in hooks
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AdminNavbar: React.FC = () => {
  const { handleLogout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const userId = getUserProperty("id") as string;
  const userEmail = getUserProperty("email") as string;

  return (
    <nav className="bg-indigo-300 shadow-sm sticky top-0 z-50 w-full px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center">
            <span className="text-indigo-600 font-bold">A</span>
          </div>
          <h1 className="text-white font-bold text-xl">Admin Portal</h1>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationPanel userId={userId} />
          <div className="hidden sm:flex items-center text-white space-x-2">
            <Mail className="h-5 w-5" />
            <span className="text-sm">{userEmail}</span>
          </div>
          <button
            onClick={toggleMenu}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <User className="h-5 w-5 text-indigo-600" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-2 px-4">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <div className="border-t border-gray-200"></div>
              <button
                onClick={() => {
                  handleLogout("admin", userId);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

import React from "react";
import NotificationPanel from "../shared/components/NotifictionPanel";
import { getUserProperty } from "../../utils/local-user.util";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
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
  );
};
