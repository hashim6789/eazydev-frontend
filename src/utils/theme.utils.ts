import { ThemeType, UserRole, UserThemeType } from "../types/User";

// Theme configuration
export const getThemeStyleForErrorPages = (theme: ThemeType) => {
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

export const userThemeSelector = (user: UserRole): UserThemeType => {
  if (user === "admin") {
    return "green";
  } else if (user === "mentor") {
    return "purple";
  } else {
    return "blue";
  }
};

// Theme configuration
export const getUserThemeStyles = (theme: UserThemeType) => {
  switch (theme) {
    case "blue":
      return {
        primary: "bg-blue-600",
        hover: "hover:bg-blue-700",
        focusRing: "focus:ring-blue-500",
        text: "text-blue-600",
        lightBg: "bg-blue-50",
        mediumBg: "bg-blue-100",
        buttonText: "text-white",
        gradient: "from-blue-600 to-indigo-700",
      };
    case "green":
      return {
        primary: "bg-emerald-600",
        hover: "hover:bg-emerald-700",
        focusRing: "focus:ring-emerald-500",
        text: "text-emerald-600",
        lightBg: "bg-emerald-50",
        mediumBg: "bg-emerald-100",
        buttonText: "text-white",
        gradient: "from-emerald-600 to-teal-700",
      };
    case "purple":
    default:
      return {
        primary: "bg-purple-600",
        hover: "hover:bg-purple-700",
        focusRing: "focus:ring-purple-500",
        text: "text-purple-600",
        lightBg: "bg-purple-50",
        mediumBg: "bg-purple-100",
        buttonText: "text-white",
        gradient: "from-purple-600 to-violet-700",
      };
  }
};

// Theme configuration
export const getThemeStyleForErrors = (theme: UserThemeType) => {
  switch (theme) {
    case "blue":
      return {
        primary: "bg-blue-600",
        hover: "hover:bg-blue-700",
        focusRing: "focus:ring-blue-500",
        text: "text-blue-600",
        lightBg: "bg-blue-50",
        mediumBg: "bg-blue-100",
        buttonText: "text-white",
        gradient: "from-blue-600 to-indigo-700",
      };
    case "green":
      return {
        primary: "bg-emerald-600",
        hover: "hover:bg-emerald-700",
        focusRing: "focus:ring-emerald-500",
        text: "text-emerald-600",
        lightBg: "bg-emerald-50",
        mediumBg: "bg-emerald-100",
        buttonText: "text-white",
        gradient: "from-emerald-600 to-teal-700",
      };
    case "purple":
    default:
      return {
        primary: "bg-purple-600",
        hover: "hover:bg-purple-700",
        focusRing: "focus:ring-purple-500",
        text: "text-purple-600",
        lightBg: "bg-purple-50",
        mediumBg: "bg-purple-100",
        buttonText: "text-white",
        gradient: "from-purple-600 to-violet-700",
      };
  }
};
