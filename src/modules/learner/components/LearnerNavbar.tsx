import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserProperty } from "../../../utils/local-user.util";
// import NotificationPanel from "../../common/components/NotificationPanel";

const CourseNavbar: React.FC = () => {
  const { handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, isVerified, isBlocked } = useSelector(
    (state: RootState) => state.auth
  );

  const firstName = getUserProperty("firstName") as string;
  const lastName = getUserProperty("lastName") as string;
  const email = getUserProperty("email") as string;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-blue-600 font-bold text-2xl">
              EazyDev
            </NavLink>
            <div className="relative">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-1">
                <span>Explore</span>
                <span className="text-gray-400">▾</span>
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && !isBlocked && isVerified ? (
              <>
                {/* <NotificationPanel userId={user.id} /> */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white">
                      {firstName.charAt(0) ?? "M"}
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {firstName} {lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {email}
                        </p>
                      </div>
                      <NavLink
                        to="/learner/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </NavLink>
                      <button
                        onClick={() =>
                          handleLogout(
                            "learner",
                            getUserProperty("id") as string
                          )
                        }
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login / Sign Up
              </NavLink>
            )}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="flex space-x-8 h-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/learner/courses"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/learner/learnings"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            My Learnings
          </NavLink>
          <NavLink
            to="/learner/chat"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            My Chats
          </NavLink>
          {/* <NavLink
            to="/learner/video-call"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            Video Call
          </NavLink>
          <NavLink
            to="/learner/meets"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
                : "text-gray-600 hover:text-gray-900 flex items-center px-1"
            }
          >
            My meetings
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};

export default CourseNavbar;
