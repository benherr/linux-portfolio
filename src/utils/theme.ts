import { AccentColor, ThemeMode } from "@/types/os";

export interface AccentThemeConfig {
  hex: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  glowShadow: string;
}

export const ACCENT_MAP: Record<AccentColor, AccentThemeConfig> = {
  match: {
    hex: "#ff9e3b",
    textClass: "text-[#ff9e3b]",
    bgClass: "bg-[#ff9e3b]",
    borderClass: "border-[#ff9e3b]",
    glowShadow: "rgba(255, 158, 59, 0.4)",
  },
  amber: {
    hex: "#ff9e3b",
    textClass: "text-[#ff9e3b]",
    bgClass: "bg-[#ff9e3b]",
    borderClass: "border-[#ff9e3b]",
    glowShadow: "rgba(255, 158, 59, 0.4)",
  },
  coral: {
    hex: "#f43f5e",
    textClass: "text-[#f43f5e]",
    bgClass: "bg-[#f43f5e]",
    borderClass: "border-[#f43f5e]",
    glowShadow: "rgba(244, 63, 94, 0.4)",
  },
  cyan: {
    hex: "#06b6d4",
    textClass: "text-[#06b6d4]",
    bgClass: "bg-[#06b6d4]",
    borderClass: "border-[#06b6d4]",
    glowShadow: "rgba(6, 182, 212, 0.4)",
  },
  purple: {
    hex: "#a855f7",
    textClass: "text-[#a855f7]",
    bgClass: "bg-[#a855f7]",
    borderClass: "border-[#a855f7]",
    glowShadow: "rgba(168, 85, 247, 0.4)",
  },
  blue: {
    hex: "#3b82f6",
    textClass: "text-[#3b82f6]",
    bgClass: "bg-[#3b82f6]",
    borderClass: "border-[#3b82f6]",
    glowShadow: "rgba(59, 130, 246, 0.4)",
  },
  green: {
    hex: "#10b981",
    textClass: "text-[#10b981]",
    bgClass: "bg-[#10b981]",
    borderClass: "border-[#10b981]",
    glowShadow: "rgba(16, 185, 129, 0.4)",
  },
};
