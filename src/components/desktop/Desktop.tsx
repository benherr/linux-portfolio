"use client";

import React, { useState, useEffect } from "react";
import { AppId, DesktopIcon, WindowState, WallpaperId, ThemeMode, AccentColor } from "@/types/os";
import { TopPanel } from "@/components/desktop/TopPanel";
import { Launcher } from "@/components/desktop/Launcher";
import { WindowFrame } from "@/components/windows/WindowFrame";
import { NotificationCenter } from "@/components/desktop/NotificationCenter";
import { WallpaperBackground } from "@/components/desktop/WallpaperBackground";
import { AchievementToast } from "@/components/desktop/AchievementToast";
import { ACCENT_MAP } from "@/utils/theme";

import { Terminal } from "@/components/terminal/Terminal";
import { AboutApp } from "@/components/applications/AboutApp";
import { ProjectsApp } from "@/components/applications/ProjectsApp";
import { SecurityCenterApp } from "@/components/applications/SecurityCenterApp";
import { SystemMonitorApp } from "@/components/applications/SystemMonitorApp";
import { FileManagerApp } from "@/components/applications/FileManagerApp";
import { SkillsApp } from "@/components/applications/SkillsApp";
import { CertificationsApp } from "@/components/applications/CertificationsApp";
import { ResumeApp } from "@/components/applications/ResumeApp";
import { ContactApp } from "@/components/applications/ContactApp";
import { SettingsApp } from "@/components/applications/SettingsApp";
import { RadioApp } from "@/components/applications/RadioApp";
import { SocialBrowserApp } from "@/components/applications/SocialBrowserApp";

import {
  Terminal as TermIcon,
  User,
  Briefcase,
  ShieldCheck,
  Folder,
  Cpu,
  Award,
  FileText,
  Mail,
  Activity,
  Settings as SettingsIcon,
  Box,
  FlaskConical,
  Brain,
  Lightbulb,
  Wrench,
  Radio as RadioIconSymbol,
  Github,
  Linkedin,
} from "lucide-react";

interface DesktopProps {
  windows: WindowState[];
  activeAppId: AppId | null;
  openedApps: Set<AppId>;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "files", title: "Archives", iconName: "Box", category: "core" },
  { id: "projects", title: "Experiments", iconName: "FlaskConical", category: "portfolio" },
  { id: "about", title: "Memory", iconName: "Brain", category: "portfolio" },
  { id: "resume", title: "Ideas", iconName: "Lightbulb", category: "portfolio" },
  { id: "sysmon", title: "Garage", iconName: "Wrench", category: "system" },
  { id: "radio", title: "Radio", iconName: "Radio", category: "core" },
  { id: "github", title: "GitHub Profile", iconName: "Github", category: "portfolio" },
  { id: "linkedin", title: "LinkedIn Network", iconName: "Linkedin", category: "portfolio" },
  { id: "terminal", title: "Terminal", iconName: "Terminal", category: "core" },
  { id: "security", title: "Security Lab", iconName: "ShieldCheck", category: "system" },
  { id: "skills", title: "Skills Matrix", iconName: "Cpu", category: "portfolio" },
  { id: "certifications", title: "Credentials", iconName: "Award", category: "portfolio" },
  { id: "contact", title: "Network", iconName: "Mail", category: "portfolio" },
  { id: "settings", title: "Settings", iconName: "Settings", category: "system" },
];

const ICON_MAP: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Terminal: TermIcon,
  User,
  Briefcase,
  ShieldCheck,
  Folder,
  Cpu,
  Award,
  FileText,
  Mail,
  Activity,
  Settings: SettingsIcon,
  Box,
  FlaskConical,
  Brain,
  Lightbulb,
  Wrench,
  Radio: RadioIconSymbol,
  Github,
  Linkedin,
};

const WALLPAPER_LIST: WallpaperId[] = [
  "firewatch",
  "mountainlake",
  "kyototwilight",
  "cyberhorizon",
  "lakesidecabin",
  "deepspace",
];

export const Desktop: React.FC<DesktopProps> = ({
  windows,
  activeAppId,
  openedApps,
  openWindow,
  closeWindow,
  focusWindow,
  toggleMinimize,
  toggleMaximize,
  updatePosition,
}) => {
  const [selectedIconId, setSelectedIconId] = useState<AppId | null>(null);
  const [isLauncherOpen, setIsLauncherOpen] = useState<boolean>(false);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("firewatch");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [accentColor, setAccentColor] = useState<AccentColor>("match");
  const [glassOpacity, setGlassOpacity] = useState<number>(65);

  const [visitCount, setVisitCount] = useState<number>(934);
  const [achievement, setAchievement] = useState<{ title: string; description: string } | null>(null);
  const [isAchievementDismissed, setIsAchievementDismissed] = useState<boolean>(false);

  const activeAccent = ACCENT_MAP[accentColor] || ACCENT_MAP.match;
  const isLight = themeMode === "light";

  // Persistence
  useEffect(() => {
    try {
      const storedVisits = localStorage.getItem("ninjaos_visit_count");
      const currentVisits = storedVisits ? parseInt(storedVisits, 10) + 1 : 934;
      setVisitCount(currentVisits);
      localStorage.setItem("ninjaos_visit_count", currentVisits.toString());

      const isDismissed = localStorage.getItem("ninjaos_achievement_dismissed");
      if (isDismissed === "true") {
        setIsAchievementDismissed(true);
      }
    } catch {
      // fallback
    }
  }, []);

  // Cycle wallpaper on double click desktop canvas
  const handleCycleWallpaper = () => {
    setWallpaper((prev) => {
      const idx = WALLPAPER_LIST.indexOf(prev);
      const nextIdx = (idx + 1) % WALLPAPER_LIST.length;
      return WALLPAPER_LIST[nextIdx];
    });
  };

  // Trigger "The Whole Desk" achievement
  useEffect(() => {
    if (openedApps.size >= 5 && !achievement && !isAchievementDismissed) {
      setAchievement({
        title: "The Whole Desk",
        description: "You opened every single core app!",
      });
    }
  }, [openedApps, achievement, isAchievementDismissed]);

  const handleDismissAchievement = () => {
    setAchievement(null);
    setIsAchievementDismissed(true);
    try {
      localStorage.setItem("ninjaos_achievement_dismissed", "true");
    } catch {
      // ignore
    }
  };

  const renderApplicationContent = (appId: AppId) => {
    switch (appId) {
      case "terminal":
        return <Terminal openWindow={openWindow} closeWindow={closeWindow} />;
      case "about":
        return <AboutApp onOpenApp={openWindow} />;
      case "projects":
        return <ProjectsApp />;
      case "security":
        return <SecurityCenterApp />;
      case "sysmon":
        return <SystemMonitorApp />;
      case "files":
        return <FileManagerApp />;
      case "skills":
        return <SkillsApp />;
      case "certifications":
        return <CertificationsApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      case "radio":
        return <RadioApp />;
      case "github":
        return <SocialBrowserApp type="github" />;
      case "linkedin":
        return <SocialBrowserApp type="linkedin" />;
      case "settings":
        return (
          <SettingsApp
            currentWallpaper={wallpaper}
            themeMode={themeMode}
            accentColor={accentColor}
            glassOpacity={glassOpacity}
            onSelectWallpaper={(wpId) => setWallpaper(wpId)}
            onSelectThemeMode={(mode) => setThemeMode(mode)}
            onSelectAccentColor={(acc) => setAccentColor(acc)}
            onSelectGlassOpacity={(op) => setGlassOpacity(op)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none flex flex-col justify-between transition-colors duration-300 ${
        isLight ? "bg-slate-200 text-slate-900" : "bg-[#090a18] text-slate-100"
      }`}
      onClick={() => setSelectedIconId(null)}
      onDoubleClick={handleCycleWallpaper}
      title="Double-click empty desktop space to cycle wallpapers"
    >
      {/* Dynamic Vector Wallpaper Background */}
      <WallpaperBackground wallpaper={wallpaper} />

      {/* Top System Panel */}
      <TopPanel
        activeAppId={activeAppId}
        windows={windows}
        themeMode={themeMode}
        accentColor={accentColor}
        onToggleLauncher={() => setIsLauncherOpen(!isLauncherOpen)}
        onOpenApp={(id) => openWindow(id)}
      />

      {/* Launcher Drawer Modal */}
      <Launcher
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        desktopIcons={DESKTOP_ICONS}
        onOpenApp={(id) => openWindow(id)}
      />

      {/* Achievement Unlocked Notification */}
      {achievement && (
        <AchievementToast
          title={achievement.title}
          description={achievement.description}
          onClose={handleDismissAchievement}
        />
      )}

      {/* Toast Notification System */}
      <NotificationCenter />

      {/* Desktop Canvas */}
      <div className="relative flex-1 p-4 sm:p-6 overflow-hidden flex flex-col justify-between">
        {/* Left Vertical Dock Icon Stack */}
        <div className="flex flex-col space-y-2.5 w-max relative z-[1] overflow-y-auto max-h-[calc(100vh-140px)] pr-2 scrollbar-none">
          {DESKTOP_ICONS.map((icon) => {
            const IconComponent = ICON_MAP[icon.iconName] || TermIcon;
            const isSelected = selectedIconId === icon.id || activeAppId === icon.id;

            return (
              <div
                key={icon.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIconId(icon.id);
                  openWindow(icon.id);
                }}
                onDoubleClick={(e) => e.stopPropagation()}
                className="flex flex-col items-start cursor-pointer group"
              >
                <div
                  style={{
                    borderColor: isSelected ? activeAccent.hex : undefined,
                    boxShadow: isSelected ? `0 0 12px ${activeAccent.glowShadow}` : undefined,
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center space-x-2.5 backdrop-blur-md transition ${
                    isSelected
                      ? isLight
                        ? "bg-white/95 border text-slate-900 font-bold"
                        : "bg-[#16122c]/95 border text-white font-bold"
                      : isLight
                      ? "bg-white/70 border border-slate-300/80 text-slate-800 hover:bg-white/90"
                      : "bg-[#120e24]/65 border border-white/10 text-slate-300 group-hover:bg-[#181230]/90 group-hover:text-white"
                  }`}
                >
                  <IconComponent
                    className="w-4 h-4 shrink-0 transition"
                    style={{ color: activeAccent.hex }}
                  />
                  <span className="text-xs font-mono font-medium tracking-wide">
                    {icon.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Quick Dock (In-OS GitHub & LinkedIn App Triggers) */}
        <div
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] border rounded-2xl px-5 py-2.5 flex items-center space-x-5 shadow-2xl backdrop-blur-md transition-colors ${
            isLight
              ? "bg-white/85 border-slate-300 text-slate-900"
              : "bg-[#120e24]/85 border-white/15 text-slate-100"
          }`}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => openWindow("terminal")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer"
            style={{ color: activeAccent.hex }}
            title="Terminal Shell"
          >
            <TermIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => openWindow("radio")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer"
            style={{ color: activeAccent.hex }}
            title="Radio Player"
          >
            <RadioIconSymbol className="w-5 h-5" />
          </button>
          <button
            onClick={() => openWindow("about")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer"
            style={{ color: activeAccent.hex }}
            title="Memory (About)"
          >
            <Brain className="w-5 h-5" />
          </button>

          {/* GitHub In-OS App Window Launch */}
          <button
            onClick={() => openWindow("github")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer"
            style={{ color: activeAccent.hex }}
            title="Open GitHub in NinjaOS"
          >
            <Github className="w-5 h-5" />
          </button>

          {/* LinkedIn In-OS App Window Launch */}
          <button
            onClick={() => openWindow("linkedin")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer text-sky-400"
            title="Open LinkedIn in NinjaOS"
          >
            <Linkedin className="w-5 h-5" />
          </button>

          <button
            onClick={() => openWindow("contact")}
            className="p-2 rounded-xl hover:bg-black/5 hover:dark:bg-white/10 border border-transparent transition cursor-pointer text-rose-400"
            title="Network & Contact"
          >
            <Mail className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Left Version & Global Visit Counter Watermark */}
        <div
          className={`absolute bottom-3 left-4 text-[11px] font-mono opacity-90 z-[1] select-none flex items-center space-x-2 ${
            isLight ? "text-slate-700" : "text-slate-400"
          }`}
        >
          <span>v1.0.0</span>
          <span>·</span>
          <span>{visitCount.toLocaleString()} global visits</span>
        </div>

        {/* Windows Container Stack */}
        {windows.map((win) => (
          <div key={win.id} onDoubleClick={(e) => e.stopPropagation()}>
            <WindowFrame
              windowState={win}
              themeMode={themeMode}
              accentColor={accentColor}
              glassOpacity={glassOpacity}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={toggleMinimize}
              onMaximize={toggleMaximize}
              onPositionChange={updatePosition}
            >
              {renderApplicationContent(win.id)}
            </WindowFrame>
          </div>
        ))}
      </div>
    </div>
  );
};
