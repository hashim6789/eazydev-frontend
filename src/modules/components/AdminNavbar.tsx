//imported build-in ui components
import { User, Mail, LogOut } from "lucide-react";

//imported custom hooks

//imported build-in hooks
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import NotificationPanel from "../shared/components/NotificationPanel";

const AdminNavbar: React.FC = () => {
  const { handleLogout } = useAuth();
  let userEmail = "";
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      userEmail = parsedData?.email || "";
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-start">
            {/* <img src={logo} alt="EazyDev" className="h-20 w-auto" /> */}
          </div>
          {/* <Logo /> */}
          <div className="flex items-center space-x-4">
            <NotificationPanel userId={userData.id} />
            <span className="hidden text-sm text-gray-500 sm:inline-block">
              <Mail className="mr-2 inline-block h-4 w-4" />
              {userEmail}
            </span>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
