import React, { useState } from "react";
import { User, KeyRound, Settings, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useThemeStyles } from "../../../utils/color-theme.util";
import PersonalDetails from "../components/PersonalDetails";
import ChangePassword from "../components/ChangePassword";
import PurchaseHistory from "../components/PurchaseHistory";
import { SubRole } from "../../../types";
import CertificatesList from "../components/CertifilcateList";

type NavState =
  | "personal"
  | "password"
  | "notifications"
  | "preferences"
  | "purchases"
  | "certificates";

interface ProfilePageProps {
  role: SubRole;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
  const { color } = useSelector((state: RootState) => state.theme);
  const styles = useThemeStyles();
  const [navState, setNavState] = useState<NavState>("personal");

  const getActiveStyle = (current: NavState) => {
    return navState === current
      ? `border-${color}-600 ${styles.text}`
      : `border-transparent ${styles.textSecondary} hover:${styles.text}`;
  };

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
            onClick={() => setNavState("certificates")}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
              "preferences"
            )}`}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Certificates</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className={`${styles.cardBg} rounded-lg p-6 shadow-sm`}>
          {navState === "personal" && <PersonalDetails />}

          {navState === "password" && <ChangePassword />}

          {navState === "purchases" && role === "learner" && (
            <PurchaseHistory />
          )}
          {navState === "certificates" && role === "learner" && (
            <CertificatesList />
          )}

          {/* {navState === "preferences" && (
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
