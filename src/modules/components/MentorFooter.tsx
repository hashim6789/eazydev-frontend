// Footer.tsx
import React from "react";
import { useThemeStyles } from "../../utils/color-theme.util";

export const Footer: React.FC = () => {
  // Get styles based on current theme
  const styles = useThemeStyles();

  return (
    <footer
      className={`
        h-16 
        border-t
        flex items-center justify-center
        ${styles.navBg}
        ${styles.border}
        ${styles.textSecondary}
        text-sm
      `}
    >
      © 2024 Mentor Dashboard. All rights reserved.
    </footer>
  );
};
