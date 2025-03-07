import { ThemeType } from "../types/User";

// Theme configuration
export const getThemeStyles = (theme: ThemeType) => {
  switch (theme) {
    case "light":
      return {
        background: "bg-gray-50",
        card: "bg-white",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-600",
        accent: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        icon: "text-blue-600",
      };
    case "dark":
      return {
        background: "bg-gray-900",
        card: "bg-gray-800",
        textPrimary: "text-white",
        textSecondary: "text-gray-300",
        accent: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-gray-200",
        icon: "text-indigo-400",
      };
    case "colorful":
      return {
        background: "bg-gradient-to-br from-purple-500 to-pink-500",
        card: "bg-white bg-opacity-90 backdrop-blur-sm",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        accent:
          "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
        secondary: "bg-white bg-opacity-70 hover:bg-opacity-90 text-purple-900",
        icon: "text-purple-600",
      };
  }
};
