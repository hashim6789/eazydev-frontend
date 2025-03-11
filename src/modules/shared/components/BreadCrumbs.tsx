import { useNavigate } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { useThemeStyles } from "../../../utils/color-theme.util";
import { Path } from "../../../types";

interface BreadcrumbsProps {
  paths: Path[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  const navigate = useNavigate();

  // Get dynamic theme styles
  const styles = useThemeStyles();

  return (
    <nav
      className={`flex items-center space-x-2 text-sm mb-4 ${styles.textSecondary}`}
    >
      {/* Dashboard/Home Button */}
      <button
        onClick={() => navigate("/mentor/dashboard")}
        className={`flex items-center ${styles.hover} ${styles.textPrimary}`}
      >
        <Home className={`w-4 h-4 mr-1 ${styles.textPrimary}`} />
        <span className="hidden sm:inline">Dashboard</span>
      </button>

      {/* Breadcrumb Paths */}
      {paths.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className={`w-4 h-4 ${styles.textSecondary}`} />
          {index === paths.length - 1 ? (
            <span className={`font-semibold ${styles.textPrimary}`}>
              {item.title}
            </span>
          ) : (
            <button
              onClick={() => navigate(item.link)}
              className={`${styles.hover} ${styles.textPrimary}`}
            >
              {item.title}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
