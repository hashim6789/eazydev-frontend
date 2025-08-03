import React, { useState } from "react";
import { User, KeyRound, CreditCard, BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useThemeStyles } from "../../../utils/color-theme.util";
import ChangePassword from "../../shared/components/ChangePassword";
import PurchaseHistory from "../../shared/components/PurchaseHistory";
import { SubRole } from "../../../types";
import CompletedCertificates from "../../shared/components/CompletedCertificates";
import PersonalDetails from "../../mentor/components/PersonalDetails";

type NavState =
  | "personal"
  | "password"
  | "notifications"
  | "certificates"
  | "purchases";

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
      className={`w-full ${
        role === "learner" ? "" : "max-w-4xl mx-auto"
      } p-4 space-y-6 ${styles.textPrimary}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full">
        <div className="flex flex-wrap gap-2 border-b mb-4">
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

          {role === "learner" && (
            <>
              <button
                onClick={() => setNavState("purchases")}
                className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
                  "purchases"
                )}`}
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Purchases</span>
              </button>
              <button
                onClick={() => setNavState("certificates")}
                className={`flex items-center justify-center sm:justify-start gap-2 p-3 border-b-2 transition-colors ${getActiveStyle(
                  "certificates"
                )}`}
              >
                <BadgeCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Certificates</span>
              </button>
            </>
          )}
        </div>

        {/* Content Sections */}
        <div className={`${styles.cardBg} rounded-lg p-6 shadow-sm`}>
          {navState === "personal" && <PersonalDetails />}

          {navState === "password" && <ChangePassword />}

          {navState === "purchases" && role === "learner" && (
            <PurchaseHistory />
          )}
          {navState === "certificates" && role === "learner" && (
            <CompletedCertificates />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
