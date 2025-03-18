import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../types";
import { useThemeStyles } from "../../../utils/color-theme.util";

interface BreadcrumbProps {
  paths: Path[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  const navigate = useNavigate();

  // Get theme styles
  const themeStyles = useThemeStyles();

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {paths.map((item, index) => (
        <span key={index} className="flex items-center">
          {item.link ? (
            <a
              onClick={() => navigate(item.link)}
              className={`cursor-pointer transition-colors ${themeStyles.text} ${themeStyles.hover}`}
            >
              {item.title}
            </a>
          ) : (
            <span className={`font-medium ${themeStyles.textPrimary}`}>
              {item.title}
            </span>
          )}
          {index < paths.length - 1 && (
            <ChevronRight className={`h-4 w-4 ${themeStyles.text}`} />
          )}
        </span>
      ))}
    </nav>
  );
};
