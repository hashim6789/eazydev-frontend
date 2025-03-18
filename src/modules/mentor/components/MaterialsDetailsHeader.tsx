import { Book, Video } from "lucide-react";
import { Material } from "../../../types/material";
import { useThemeStyles } from "../../../utils/color-theme.util";

export const DetailsHeader: React.FC<{ material: Material }> = ({
  material,
}) => {
  const theme = useThemeStyles();

  return (
    <div className={`border-b ${theme.border} ${theme.lightBg} p-6`}>
      <div className="flex items-center space-x-3 mb-4">
        {material.type === "reading" && (
          <Book className={`w-6 h-6 ${theme.textPrimary}`} />
        )}
        {material.type === "video" && (
          <Video className={`w-6 h-6 ${theme.textPrimary}`} />
        )}
        <span
          className={`px-3 py-1 text-sm font-medium ${theme.text} ${theme.mediumBg} rounded-full`}
        >
          {material.type}
        </span>
      </div>
      <h1 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>
        {material.title}
      </h1>
      <p className={theme.textSecondary}>{material.description}</p>
    </div>
  );
};
