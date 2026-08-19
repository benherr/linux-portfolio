export type AppId =
  | "terminal"
  | "files"
  | "about"
  | "projects"
  | "security"
  | "skills"
  | "certifications"
  | "resume"
  | "contact"
  | "sysmon"
  | "settings"
  | "radio"
  | "github"
  | "linkedin";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Position;
  size: Size;
}

export interface DesktopIcon {
  id: AppId;
  title: string;
  subtitle?: string;
  iconName: string;
  category: "core" | "portfolio" | "system";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "security";
  read: boolean;
}

export type WallpaperId =
  | "firewatch"
  | "mountainlake"
  | "kyototwilight"
  | "cyberhorizon"
  | "lakesidecabin"
  | "deepspace";

export type ThemeMode = "dark" | "light";

export type AccentColor = "match" | "amber" | "coral" | "cyan" | "purple" | "blue" | "green";

export interface WallpaperOption {
  id: WallpaperId;
  name: string;
  description: string;
  bgGradient: string;
}
