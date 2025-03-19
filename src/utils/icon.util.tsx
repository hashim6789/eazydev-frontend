import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
  Book,
  Video,
} from "lucide-react";
import { CourseStatus } from "../types";
import { MaterialType } from "../types/material";
import { ThemeStyles } from "./color-theme.util";

export const getMaterialTypeIcon = (
  type: MaterialType,
  styles: ThemeStyles
) => {
  switch (type) {
    case "reading":
      return <Book className={`w-6 h-6 ${styles.textPrimary}`} />;
    case "video":
      return <Video className={`w-6 h-6 ${styles.textPrimary}`} />;
    default:
      return null;
  }
};

export const getCourseStatusIcon = (status: CourseStatus) => {
  switch (status) {
    case "draft":
      return <AlertCircle className="w-5 h-5 mr-2 text-gray-500" />;
    //   case "completed":
    //     return <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />;
    case "approved":
      return <CheckCircle className="w-5 h-5 mr-2 text-green-500" />;
    case "rejected":
      return <XCircle className="w-5 h-5 mr-2 text-red-500" />;
    case "requested":
      return <Clock className="w-5 h-5 mr-2 text-yellow-500" />;
    default:
      return <HelpCircle className="w-5 h-5 mr-2 text-gray-400" />;
  }
};
