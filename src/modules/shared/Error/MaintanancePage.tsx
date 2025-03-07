import React from "react";
import { Clock, ChevronLeft, HelpCircle } from "lucide-react";

import {
  getRoleContentForErrorPages,
  getThemeStyleForErrorPages,
} from "../../../utils";
import { ErrorPageProps } from ".";

export const MaintenancePage: React.FC<ErrorPageProps> = ({
  role = "learner",
  theme = "light",
  onGoBack,
  onContactSupport,
}) => {
  const content = getRoleContentForErrorPages(role);
  const styles = getThemeStyleForErrorPages(theme);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${styles.background}`}
    >
      <div
        className={`max-w-md w-full rounded-lg shadow-xl overflow-hidden ${styles.card}`}
      >
        <div className="p-6">
          <div className="flex justify-center mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${styles.accent}`}
            >
              <Clock size={48} className="text-white" />
            </div>
          </div>

          <h1
            className={`text-2xl font-bold text-center mb-2 ${styles.textPrimary}`}
          >
            Scheduled Maintenance
          </h1>
          <h2
            className={`text-lg font-semibold text-center mb-4 ${styles.textPrimary}`}
          >
            We'll be back soon
          </h2>

          <p className={`text-center mb-8 ${styles.textSecondary}`}>
            {content.descriptionMaintenance}
          </p>

          <div className="flex flex-col space-y-3">
            {onGoBack && (
              <button
                onClick={onGoBack}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.secondary}`}
              >
                <ChevronLeft size={18} className="mr-2" />
                Go Back
              </button>
            )}

            {onContactSupport && (
              <button
                onClick={onContactSupport}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.secondary}`}
              >
                <HelpCircle size={18} className="mr-2" />
                {content.supportText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
