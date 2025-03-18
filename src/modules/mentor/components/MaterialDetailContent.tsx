import { Book, Clock } from "lucide-react";
import { Material, MaterialType } from "../../../types/material";
import { useThemeStyles } from "../../../utils/color-theme.util";

const useSignedUrl = (fileKey: string, materialType: MaterialType): string => {
  const CLOUDFRONT_BASE_URL = "https://djcsj6q1rshpq.cloudfront.net";
  return `${CLOUDFRONT_BASE_URL}/uploads/${materialType}s/${fileKey}`;
};

const ReadingContent: React.FC<{ material: Material }> = ({ material }) => {
  const theme = useThemeStyles();

  return (
    <div className="prose max-w-none">
      <div
        className={`${theme.lightBg} rounded-lg p-6 mb-6 cursor-pointer hover:${theme.mediumBg} transition-colors duration-200`}
      >
        <h2 className={`text-2xl font-semibold ${theme.text} mb-4`}>
          Reading Material
        </h2>
        <div className="flex flex-col items-center justify-center">
          <Book className={`w-12 h-12 ${theme.textPrimary} mb-2`} />
          <p className={`${theme.textPrimary} mb-2`}>
            {material.fileKey || "Reading Material"}
          </p>
          <div className={`font-medium ${theme.text}`}>
            {material.duration
              ? `${material.duration} minutes`
              : "Duration not available"}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoContent: React.FC<{ material: Material }> = ({ material }) => {
  const theme = useThemeStyles();
  const signedUrl = useSignedUrl(material.fileKey, material.type);

  return (
    <div>
      <div className={`${theme.lightBg} rounded-lg p-6 mb-6`}>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          {signedUrl ? (
            <video controls className="w-full h-full rounded-lg">
              <source src={signedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className={`${theme.textSecondary} text-center`}>
              Loading video...
            </div>
          )}
        </div>
        <div className={`flex items-center ${theme.text}`}>
          <Clock className={`w-5 h-5 mr-2 ${theme.textPrimary}`} />
          <span>{material.duration} minutes</span>
        </div>
      </div>
    </div>
  );
};

export const MaterialDetailsContent: React.FC<{ material: Material }> = ({
  material,
}) => {
  return material.type === "reading" ? (
    <ReadingContent material={material} />
  ) : (
    <VideoContent material={material} />
  );
};
