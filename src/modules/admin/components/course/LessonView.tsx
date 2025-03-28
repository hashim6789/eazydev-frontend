import React, { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  Video,
  FileText,
  Lock,
  Clock,
} from "lucide-react";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import { ILessonPopulated } from "../../../../types";
import { MaterialType } from "../../../../types/material";

interface LessonViewProps {
  lessonId: string;
  title: string;
}

const LessonView: React.FC<LessonViewProps> = ({ lessonId, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchUrl, setFetchUrl] = useState<string | null>(null);
  const theme = useThemeStyles();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!fetchUrl) {
      setFetchUrl(`/api/lessons/${lessonId}`);
    }
  }, [fetchUrl, lessonId]);

  return (
    <div
      className={`w-full border ${theme.border} rounded-lg overflow-hidden ${theme.cardBg}`}
    >
      <button
        onClick={handleToggle}
        className={`w-full flex items-center p-4 ${theme.lightBg} hover:${theme.mediumBg} transition-all`}
      >
        <span
          className={`h-8 w-8 flex items-center justify-center ${theme.mediumBg} ${theme.text} rounded-full mr-4`}
        >
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </span>
        <h3 className={`flex-1 text-left font-medium ${theme.textPrimary}`}>
          {title}
        </h3>
      </button>
      {isOpen && fetchUrl && <MaterialList lessonId={lessonId} />}
    </div>
  );
};

const MaterialList: React.FC<{
  lessonId: string;
}> = ({ lessonId }) => {
  const navigate = useNavigate();
  const theme = useThemeStyles();
  const {
    data: lesson,
    loading,
    error,
  } = useFetch<ILessonPopulated>(`/api/lessons/${lessonId}`);

  if (loading) {
    return (
      <div className={`p-4 flex justify-center ${theme.textPrimary}`}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className={`h-4 ${theme.lightBg} rounded w-3/4`}></div>
            <div className={`h-4 ${theme.lightBg} rounded`}></div>
            <div className={`h-4 ${theme.lightBg} rounded w-5/6`}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 text-red-500 bg-red-50 rounded-b-lg`}>
        <p className="text-center">Failed to load materials.</p>
      </div>
    );
  }

  if (!lesson || !lesson.materials || lesson.materials.length === 0) {
    return (
      <div
        className={`p-4 ${theme.lightBg} text-center rounded-b-lg ${theme.textSecondary}`}
      >
        <p>No materials available for this lesson.</p>
      </div>
    );
  }

  // Calculate total duration of all materials
  const totalDuration = lesson.materials.reduce(
    (total, material) => total + material.duration,
    0
  );

  return (
    <div className={`${theme.cardBg}`}>
      {/* Lesson description if available */}
      {lesson.description && (
        <div className={`p-4 ${theme.lightBg} border-t ${theme.border}`}>
          <p className={theme.textSecondary}>{lesson.description}</p>
        </div>
      )}

      {/* Total duration display */}
      <div
        className={`px-4 py-2 border-t ${theme.border} flex items-center justify-between`}
      >
        <span className={`text-sm ${theme.textSecondary}`}>
          Materials: {lesson.materials.length}
        </span>
        <div className={`flex items-center text-sm ${theme.textSecondary}`}>
          <Clock className="w-4 h-4 mr-1" />
          <span>{totalDuration} minutes total</span>
        </div>
      </div>

      {/* Materials list */}
      <div className={`border-t ${theme.border}`}>
        {lesson.materials.map((material) => (
          <div
            onClick={() => navigate(`/mentor/materials/${material.id}`)}
            key={material.id}
            className={`flex items-center p-4 hover:${theme.lightBg} transition-colors border-b ${theme.border} last:border-b-0 cursor-pointer`}
          >
            <span
              className={`h-8 w-8 flex items-center justify-center ${theme.lightBg} ${theme.text} rounded-full mr-4`}
            >
              {getIcon(material.type)}
            </span>
            <div className="flex-1">
              <h4 className={`font-medium ${theme.textPrimary}`}>
                {material.title}
              </h4>
              {material.description && (
                <p
                  className={`text-sm ${theme.textSecondary} mt-1 line-clamp-2`}
                >
                  {material.description}
                </p>
              )}
              <div
                className={`flex items-center mt-1 text-xs ${theme.textSecondary}`}
              >
                <span className="capitalize">{material.type}</span>
                <span className="mx-2 opacity-30">•</span>
                <span>{material.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getIcon = (type: MaterialType) => {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4" />;
    case "reading":
      return <FileText className="w-4 h-4" />;
    // case "discussion":
    //   return <MessageSquare className="w-4 h-4" />;
    default:
      return <Lock className="w-4 h-4" />;
  }
};

export default LessonView;
