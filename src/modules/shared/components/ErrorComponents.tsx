import React from "react";
import {
  AlertTriangle,
  Server,
  Clock,
  ChevronLeft,
  HelpCircle,
} from "lucide-react";
import { ThemeType, UserRole } from "../../../types/User";
import { getRoleContent } from "../../../utils/content.utils";
import { getThemeStyles } from "../../../utils/theme.utils";

interface ErrorPageProps {
  role: UserRole;
  theme: ThemeType;
  onRetry?: () => void;
  onGoBack?: () => void;
  onContactSupport?: () => void;
}

// 404 Not Found Page Component
export const NotFoundPage: React.FC<ErrorPageProps> = ({
  role = "learner",
  theme = "light",
  onRetry,
  onGoBack,
  onContactSupport,
}) => {
  const content = getRoleContent(role);
  const styles = getThemeStyles(theme);

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
              <AlertTriangle size={48} className="text-white" />
            </div>
          </div>

          <h1
            className={`text-4xl font-bold text-center mb-2 ${styles.textPrimary}`}
          >
            404
          </h1>
          <h2
            className={`text-xl font-semibold text-center mb-4 ${styles.textPrimary}`}
          >
            Page Not Found
          </h2>

          <p className={`text-center mb-8 ${styles.textSecondary}`}>
            {content.description404}
          </p>

          <div className="flex flex-col space-y-3">
            {onGoBack && (
              <button
                onClick={onGoBack}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.accent}`}
              >
                <ChevronLeft size={18} className="mr-2" />
                {content.actionText}
              </button>
            )}

            {onRetry && (
              <button
                onClick={onRetry}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.secondary}`}
              >
                Try Again
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

// 500 Server Error Page Component
export const ServerErrorPage: React.FC<ErrorPageProps> = ({
  role = "learner",
  theme = "light",
  onRetry,
  onGoBack,
  onContactSupport,
}) => {
  const content = getRoleContent(role);
  const styles = getThemeStyles(theme);

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
              <Server size={48} className="text-white" />
            </div>
          </div>

          <h1
            className={`text-4xl font-bold text-center mb-2 ${styles.textPrimary}`}
          >
            500
          </h1>
          <h2
            className={`text-xl font-semibold text-center mb-4 ${styles.textPrimary}`}
          >
            Server Error
          </h2>

          <p className={`text-center mb-8 ${styles.textSecondary}`}>
            {content.description500}
          </p>

          <div className="flex flex-col space-y-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.accent}`}
              >
                Try Again
              </button>
            )}

            {onGoBack && (
              <button
                onClick={onGoBack}
                className={`py-2 px-4 rounded-md flex items-center justify-center font-medium ${styles.secondary}`}
              >
                <ChevronLeft size={18} className="mr-2" />
                {content.actionText}
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

// Maintenance Page Component
export const MaintenancePage: React.FC<ErrorPageProps> = ({
  role = "learner",
  theme = "light",
  onGoBack,
  onContactSupport,
}) => {
  const content = getRoleContent(role);
  const styles = getThemeStyles(theme);

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
