import { AccentColor } from "@/types/os";

export interface AccentTheme {
  name: string;
  hex: string;
  bgTailwind: string;
  textTailwind: string;
  borderTailwind: string;
  glowShadow: string;
}

export const ACCENT_MAP: Record<AccentColor, AccentTheme> = {
  match: {
    name: "Midnight Sapphire",
    hex: "#818cf8",
    bgTailwind: "bg-[#818cf8]",
    textTailwind: "text-[#818cf8]",
    borderTailwind: "border-[#818cf8]",
    glowShadow: "rgba(129, 140, 248, 0.5)",
  },
  amber: {
    name: "Amber Gold",
    hex: "#ff9e3b",
    bgTailwind: "bg-[#ff9e3b]",
    textTailwind: "text-[#ff9e3b]",
    borderTailwind: "border-[#ff9e3b]",
    glowShadow: "rgba(255, 158, 59, 0.5)",
  },
  coral: {
    name: "Neon Coral",
    hex: "#f43f5e",
    bgTailwind: "bg-[#f43f5e]",
    textTailwind: "text-[#f43f5e]",
    borderTailwind: "border-[#f43f5e]",
    glowShadow: "rgba(244, 63, 94, 0.5)",
  },
  cyan: {
    name: "Electric Cyan",
    hex: "#06b6d4",
    bgTailwind: "bg-[#06b6d4]",
    textTailwind: "text-[#06b6d4]",
    borderTailwind: "border-[#06b6d4]",
    glowShadow: "rgba(6, 182, 212, 0.5)",
  },
  purple: {
    name: "Obsidian Purple",
    hex: "#a855f7",
    bgTailwind: "bg-[#a855f7]",
    textTailwind: "text-[#a855f7]",
    borderTailwind: "border-[#a855f7]",
    glowShadow: "rgba(168, 85, 247, 0.5)",
  },
  blue: {
    name: "Deep Blue",
    hex: "#3b82f6",
    bgTailwind: "bg-[#3b82f6]",
    textTailwind: "text-[#3b82f6]",
    borderTailwind: "border-[#3b82f6]",
    glowShadow: "rgba(59, 130, 246, 0.5)",
  },
  green: {
    name: "Sage Green",
    hex: "#10b981",
    bgTailwind: "bg-[#10b981]",
    textTailwind: "text-[#10b981]",
    borderTailwind: "border-[#10b981]",
    glowShadow: "rgba(16, 185, 129, 0.5)",
  },
};
