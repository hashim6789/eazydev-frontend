import React, { useState } from "react";
import { User, KeyRound, Settings, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useThemeStyles } from "../../../utils/color-theme.util";
import PersonalDetails from "../components/PersonalDetails";
import ChangePassword from "../components/ChangePassword";
import PurchaseHistory from "../components/PurchaseHistory";

type NavState =
  | "personal"
  | "password"
  | "notifications"
  | "preferences"
  | "purchases";

const ProfilePage: React.FC = () => {
  const { mode, color } = useSelector((state: RootState) => state.theme);
  const styles = useThemeStyles();
  const [navState, setNavState] = useState<NavState>("personal");

  const getActiveStyle = (current: NavState) => {
    return navState === current
      ? `border-${color}-600 ${styles.text}`
      : `border-transparent ${styles.textSecondary} hover:${styles.text}`;
  };

  // useEffect(() => {
  //     const fetchPurchaseDetails = async () => {
  //       try {
  //         // Fetch purchase details via API
  //         const response = await api.get(`/api/purchases/${purchaseId}`);
  //         setPurchase({
  //           purchaseId: response.data.purchaseId || "PURCH-123456",
  //           purchaseDate: response.data.purchaseDate || Date.now(),
  //           amount: response.data.amount || 9900,
  //           status: response.data.status || "completed",
  //         });
  //       } catch (error) {
  //         console.error("Error fetching purchase details:", error);
  //       } finally {
  //         setLoading(false);

  //         // Trigger animations after data is loaded
  //         setTimeout(() => setIsLoaded(true), 100);
  //       }
  //     };

  //     if (purchaseId) {
  //       fetchPurchaseDetails();
  //     }
  //   }, [purchaseId]);

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-4 space-y-6 ${styles.textPrimary}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <div
          className={`${styles.cardBg} p-2 rounded-full cursor-pointer ${styles.hover}`}
        >
          <Settings className="h-5 w-5" />
        </div>
      </div>

      {/* Profile Header */}
      {/* <div className={`${styles.cardBg} rounded-lg p-6 shadow-sm`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div
              className={`h-24 w-24 rounded-full ${styles.lightBg} flex items-center justify-center overflow-hidden`}
            >
              <User className="h-16 w-16" />
            </div>
            <button
              className={`absolute bottom-0 right-0 ${styles.primary} p-2 rounded-full ${styles.buttonText}`}
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className={`${styles.textSecondary} text-sm`}>{role}</p>
            <p className={`${styles.text} text-sm mt-1`}>{email}</p>
          </div>
          <button
            className={`${styles.primary} px-4 py-2 rounded-md ${styles.buttonText} text-sm`}
          >
            Edit Profile
          </button>
        </div>
      </div> */}

      {/* Navigation Tabs */}
      <div className="w-full">
        <div className="grid grid-cols-4 w-full mb-4 border-b">
          <button
            onClick={() => setNavState("personal")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "personal"
            )}`}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal Details</span>
          </button>
          <button
            onClick={() => setNavState("password")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "password"
            )}`}
          >
            <KeyRound className="h-4 w-4" />
            <span className="hidden sm:inline">Password</span>
          </button>
          {/* <button
            onClick={() => setNavState("notifications")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "notifications"
            )}`}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </button> */}
          <button
            onClick={() => setNavState("purchases")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "notifications"
            )}`}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Purchases</span>
          </button>
          <button
            onClick={() => setNavState("preferences")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "preferences"
            )}`}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className={`${styles.cardBg} rounded-lg p-6 shadow-sm`}>
          {navState === "personal" && <PersonalDetails />}

          {navState === "password" && <ChangePassword />}

          {navState === "purchases" && <PurchaseHistory />}

          {/* {navState === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Notification Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      Receive email about student activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div
                      className={`w-11 h-6 ${styles.lightBg} rounded-full peer peer-checked:${styles.primary} peer-focus:ring-4 peer-focus:${styles.focusRing}`}
                    ></div>
                    <span className="ml-3 text-sm font-medium"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      Receive text messages for urgent updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                      className={`w-11 h-6 ${styles.lightBg} rounded-full peer peer-checked:${styles.primary} peer-focus:ring-4 peer-focus:${styles.focusRing}`}
                    ></div>
                    <span className="ml-3 text-sm font-medium"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div
                      className={`w-11 h-6 ${styles.lightBg} rounded-full peer peer-checked:${styles.primary} peer-focus:ring-4 peer-focus:${styles.focusRing}`}
                    ></div>
                    <span className="ml-3 text-sm font-medium"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className={`${styles.primary} px-4 py-2 rounded-md ${styles.buttonText}`}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )} */}

          {navState === "preferences" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Theme Preferences</h3>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${styles.textSecondary} mb-1`}
                  >
                    Color Theme
                  </label>
                  <select
                    className={`w-full p-2 rounded-md border ${styles.border} ${styles.inputFocus} outline-none bg-transparent`}
                    defaultValue={color}
                  >
                    <option value="purple">Purple</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="indigo">Indigo</option>
                    <option value="teal">Teal</option>
                  </select>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={mode === "dark"}
                    />
                    <div
                      className={`w-11 h-6 ${styles.lightBg} rounded-full peer peer-checked:${styles.primary} peer-focus:ring-4 peer-focus:${styles.focusRing}`}
                    ></div>
                    <span className="ml-3 text-sm font-medium"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className={`${styles.primary} px-4 py-2 rounded-md ${styles.buttonText}`}
                >
                  Apply Theme
                </button>
              </div>
            </div>
          )}
          {/* {navState === "purchases" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Theme Preferences</h3>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${styles.textSecondary} mb-1`}
                  >
                    Color Theme
                  </label>
                  <select
                    className={`w-full p-2 rounded-md border ${styles.border} ${styles.inputFocus} outline-none bg-transparent`}
                    defaultValue={color}
                  >
                    <option value="purple">Purple</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="indigo">Indigo</option>
                    <option value="teal">Teal</option>
                  </select>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className={`text-sm ${styles.textSecondary}`}>
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={mode === "dark"}
                    />
                    <div
                      className={`w-11 h-6 ${styles.lightBg} rounded-full peer peer-checked:${styles.primary} peer-focus:ring-4 peer-focus:${styles.focusRing}`}
                    ></div>
                    <span className="ml-3 text-sm font-medium"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className={`${styles.primary} px-4 py-2 rounded-md ${styles.buttonText}`}
                >
                  Apply Theme
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
