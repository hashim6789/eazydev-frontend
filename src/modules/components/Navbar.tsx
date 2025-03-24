import React, { useState } from "react";
import { LogOut, Menu, Moon, Sun, User, Palette } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/img/user_image.avif";
import useAuth from "../../hooks/useAuth";
import { AppDispatch, RootState } from "../../store";
import { useThemeStyles } from "../../utils/color-theme.util";
import { setColorTheme, toggleThemeMode } from "../../store/slice";
import { UserRole, UserThemeType } from "../../types";
import { getUserProperty } from "../../utils/local-user.util";
import NotificationPanel from "../shared/components/NotifictionPanel";

interface NavbarProps {
  toggleSidebar: () => void;
  role: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, role }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const { mode, color } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const styles = useThemeStyles();

  const changeThemeMode = (): void => {
    dispatch(toggleThemeMode());
  };

  const changeColorTheme = (newColor: UserThemeType): void => {
    dispatch(setColorTheme(newColor));
  };

  const profilePicture = getUserProperty("profilePicture") as string;
  const userName = `${getUserProperty("firstName")} ${
    getUserProperty("lastName") || ""
  }`;
  const userId = getUserProperty("id") as string;
  const email = getUserProperty("email") as string;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colorOptions = [
    { name: "Purple", value: "purple" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Indigo", value: "indigo" },
    { name: "Teal", value: "teal" },
  ];

  const userRole = role === "admin" ? "Admin" : "Mentor";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 transition-all duration-300 ease-in-out ${styles.navBg} ${styles.textPrimary} border-b ${styles.border}`}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`${styles.hover} mr-4 p-2 rounded-md transition-colors duration-200`}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold hidden md:block">
          {userRole} Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-3 relative">
        <NotificationPanel userId={userId} />

        {/* Theme Color Selector */}
        <div className="relative">
          <button
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className={`p-2 rounded-md ${styles.hover} transition-colors duration-200`}
            aria-label="Change color theme"
          >
            <Palette size={20} />
          </button>

          {isThemeDropdownOpen && (
            <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-10">
              <p className="px-4 py-1 text-xs text-gray-500 font-semibold">
                COLOR THEME
              </p>
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    changeColorTheme(option.value as UserThemeType);
                    setIsThemeDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors duration-200 ${
                    color === option.value ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-${option.value}-500`}
                  ></div>
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Mode Toggle */}
        <button
          onClick={changeThemeMode}
          className={`p-2 rounded-md ${styles.hover} transition-colors duration-200`}
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Profile */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 ${styles.border} overflow-hidden`}
          >
            {profilePicture ? (
              <img
                src={profilePicture || userImage}
                alt={userName}
                onError={(e) => {
                  e.currentTarget.src = userImage;
                  e.currentTarget.alt = "Placeholder Image";
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full ${styles.mediumBg} ${styles.text} flex items-center justify-center font-bold text-lg`}
              >
                {getInitials(userName)}
              </div>
            )}
          </div>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={`absolute right-0 top-12 w-64 ${
                mode === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg shadow-lg py-2 border z-10`}
            >
              <div
                className={`px-4 py-3 border-b ${
                  mode === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <p className={`text-sm font-semibold ${styles.textPrimary}`}>
                  {userName}
                </p>
                <p className={`text-xs ${styles.textSecondary} truncate`}>
                  {email}
                </p>
              </div>

              {role === "mentor" && (
                <button
                  onClick={() => {
                    navigate("/mentor/profile");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm ${styles.textSecondary} hover:${styles.lightBg} flex items-center gap-2 transition-colors duration-200`}
                >
                  <User className={`w-4 h-4 ${styles.text}`} />
                  Profile
                </button>
              )}

              <div
                className={`border-t ${
                  mode === "dark" ? "border-gray-700" : "border-gray-200"
                } my-1`}
              ></div>

              <button
                onClick={() =>
                  handleLogout(role, getUserProperty("id") as string)
                }
                className={`w-full px-4 py-2 text-left text-sm ${
                  mode === "dark" ? "text-red-400" : "text-red-600"
                } ${
                  mode === "dark" ? "hover:bg-gray-700" : "hover:bg-red-50"
                } flex items-center gap-2 transition-colors duration-200`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
