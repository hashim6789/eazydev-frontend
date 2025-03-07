import { ChevronLeft, HelpCircle, Server } from "lucide-react";
import {
  getRoleContentForErrorPages,
  getThemeStyleForErrorPages,
} from "../../../utils";
import { ErrorPageProps } from ".";

export const ServerErrorPage: React.FC<ErrorPageProps> = ({
  role = "learner",
  theme = "light",
  onRetry,
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
