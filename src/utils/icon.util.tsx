import { Book, Video } from "lucide-react";
import { MaterialType } from "../types/material";
import { ThemeType } from "../types";
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
