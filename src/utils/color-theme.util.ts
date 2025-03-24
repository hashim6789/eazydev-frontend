import { ModeType, UserThemeType } from "../types/User";

// Theme style properties
export interface ThemeStyles {
  primary: string;
  hover: string;
  focusRing: string;
  text: string;
  lightBg: string;
  mediumBg: string;
  darkBg: string;
  buttonText: string;
  gradient: string;
  border: string;
  activeBorder: string;
  inputFocus: string;
  cardBg: string;
  navBg: string;
  sidebarBg: string;
  textPrimary: string;
  textSecondary: string;
}

type ModeStyle = Pick<
  ThemeStyles,
  | "buttonText"
  | "darkBg"
  | "cardBg"
  | "navBg"
  | "sidebarBg"
  | "textPrimary"
  | "textSecondary"
>;
type ColorStyle = Omit<
  ThemeStyles,
  | "buttonText"
  | "darkBg"
  | "cardBg"
  | "navBg"
  | "sidebarBg"
  | "textPrimary"
  | "textSecondary"
>;

/**
 * Generate Tailwind CSS classes for a specific theme combination
 * @param color The color theme (purple, blue, green, etc.)
 * @param mode The mode (light/dark)
 * @returns Object with Tailwind CSS classes for various UI elements
 */
export const getThemeStyles = (
  color: UserThemeType,
  mode: ModeType
): ThemeStyles => {
  // Base styles for the selected color
  const colorStyles: Record<UserThemeType, ColorStyle> = {
    purple: {
      primary: "bg-purple-600",
      hover: "hover:bg-purple-700",
      focusRing: "focus:ring-purple-500",
      text: "text-purple-600",
      lightBg: "bg-purple-50",
      mediumBg: "bg-purple-100",
      gradient: "from-purple-600 to-violet-700",
      border: "border-purple-300",
      activeBorder: "border-purple-500",
      inputFocus: "focus:border-purple-500 focus:ring-purple-200",
    },
    blue: {
      primary: "bg-blue-600",
      hover: "hover:bg-blue-700",
      focusRing: "focus:ring-blue-500",
      text: "text-blue-600",
      lightBg: "bg-blue-50",
      mediumBg: "bg-blue-100",
      gradient: "from-blue-600 to-indigo-700",
      border: "border-blue-300",
      activeBorder: "border-blue-500",
      inputFocus: "focus:border-blue-500 focus:ring-blue-200",
    },
    green: {
      primary: "bg-green-600",
      hover: "hover:bg-green-700",
      focusRing: "focus:ring-green-500",
      text: "text-green-600",
      lightBg: "bg-green-50",
      mediumBg: "bg-green-100",
      gradient: "from-green-600 to-emerald-700",
      border: "border-green-300",
      activeBorder: "border-green-500",
      inputFocus: "focus:border-green-500 focus:ring-green-200",
    },
    indigo: {
      primary: "bg-indigo-600",
      hover: "hover:bg-indigo-700",
      focusRing: "focus:ring-indigo-500",
      text: "text-indigo-600",
      lightBg: "bg-indigo-50",
      mediumBg: "bg-indigo-100",
      gradient: "from-indigo-600 to-purple-700",
      border: "border-indigo-300",
      activeBorder: "border-indigo-500",
      inputFocus: "focus:border-indigo-500 focus:ring-indigo-200",
    },
    teal: {
      primary: "bg-teal-600",
      hover: "hover:bg-teal-700",
      focusRing: "focus:ring-teal-500",
      text: "text-teal-600",
      lightBg: "bg-teal-50",
      mediumBg: "bg-teal-100",
      gradient: "from-teal-600 to-cyan-700",
      border: "border-teal-300",
      activeBorder: "border-teal-500",
      inputFocus: "focus:border-teal-500 focus:ring-teal-200",
    },
  };

  // Mode-specific styles
  const modeStyles: Record<ModeType, ModeStyle> = {
    light: {
      buttonText: "text-white",
      darkBg: `${colorStyles[color].mediumBg}`,
      cardBg: "bg-white",
      navBg: `${colorStyles[color].lightBg}`,
      sidebarBg: "bg-white",
      textPrimary: `${colorStyles[color].text}`,
      textSecondary: "text-gray-600",
    },
    dark: {
      buttonText: "text-white",
      darkBg: "bg-gray-800",
      cardBg: "bg-gray-800",
      navBg: "bg-gray-900",
      sidebarBg: "bg-gray-900",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
    },
  };

  // Combine color and mode styles
  return {
    ...colorStyles[color],
    ...modeStyles[mode],
  };
};

// Create a hook to use theme styles from Redux
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useThemeStyles = () => {
  const { mode, color } = useSelector((state: RootState) => state.theme);
  return getThemeStyles(color, mode);
};

export const generateColor = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `#${((hash >> 0) & 0xffffff).toString(16).padStart(6, "0")}`;
  return color;
};
