import React from "react";
import { useThemeStyles } from "../../../utils/color-theme.util";

export const MaterialActions: React.FC<{
  isEditing: boolean;
  handleEditClick: () => void;
}> = ({ isEditing, handleEditClick }) => {
  const theme = useThemeStyles();

  return !isEditing ? (
    <div className="p-6 flex justify-center">
      <button
        onClick={handleEditClick}
        className={`px-5 py-2.5 ${theme.primary} ${theme.buttonText} font-medium rounded-lg shadow-md 
                   ${theme.hover} transition-all duration-300 ease-in-out
                   active:scale-95 focus:ring-2 ${theme.focusRing}`}
      >
        Edit Material
      </button>
    </div>
  ) : null;
};
