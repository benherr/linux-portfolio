"use client";

import React, { useState, useEffect } from "react";
import { AppId, WindowState, ThemeMode, AccentColor } from "@/types/os";
import { Volume2, Radio, Github, Linkedin } from "lucide-react";
import { WeatherWidget } from "@/components/desktop/WeatherWidget";
import { MusicPlayerWidget } from "@/components/desktop/MusicPlayerWidget";
import { ACCENT_MAP } from "@/utils/theme";

interface TopPanelProps {
  activeAppId: AppId | null;
  windows: WindowState[];
  themeMode: ThemeMode;
  accentColor: AccentColor;
  onToggleLauncher: () => void;
  onOpenApp: (id: AppId) => void;
}

export const TopPanel: React.FC<TopPanelProps> = ({
  activeAppId,
  windows,
  themeMode,
  accentColor,
  onToggleLauncher,
  onOpenApp,
}) => {
  const [time, setTime] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const accent = ACCENT_MAP[accentColor] || ACCENT_MAP.match;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLight = themeMode === "light";

  return (
    <header
      className={`h-9 px-4 flex justify-between items-center text-xs font-mono select-none z-[100] relative backdrop-blur-md transition-colors duration-200 border-b ${
        isLight
          ? "bg-slate-100/90 border-slate-300 text-slate-800"
          : "bg-[#0e0f24]/85 border-white/10 text-slate-100"
      }`}
    >
      {/* Left: OS Branding & Top Navigation Menus */}
      <div className="flex items-center space-x-5">
        <button
          onClick={onToggleLauncher}
          className="flex items-center space-x-1.5 transition cursor-pointer font-bold tracking-wide"
        >
          <span style={{ color: accent.hex }} className="text-sm">●</span>
          <span className={isLight ? "text-slate-900" : "text-slate-100"}>ninja.os</span>
        </button>

        <div className={`hidden md:flex items-center space-x-4 text-xs font-sans ${isLight ? "text-slate-600" : "text-slate-300"}`}>
          <button
            onClick={() => onOpenApp("about")}
            className="hover:opacity-80 transition cursor-pointer"
            style={{ color: activeAppId === "about" ? accent.hex : undefined }}
          >
            Workspace
          </button>
          <button
            onClick={() => onOpenApp("projects")}
            className="hover:opacity-80 transition cursor-pointer"
            style={{ color: activeAppId === "projects" ? accent.hex : undefined }}
          >
            Explore
          </button>
          <button
            onClick={() => onOpenApp("terminal")}
            className="hover:opacity-80 transition cursor-pointer"
            style={{ color: activeAppId === "terminal" ? accent.hex : undefined }}
          >
            Build
          </button>
          <button
            onClick={() => onOpenApp("radio")}
            className="hover:opacity-80 transition cursor-pointer flex items-center space-x-1"
            style={{ color: activeAppId === "radio" ? accent.hex : undefined }}
          >
            <Radio className="w-3 h-3" style={{ color: accent.hex }} />
            <span>Radio</span>
          </button>
          <button
            onClick={() => onOpenApp("settings")}
            className="hover:opacity-80 transition cursor-pointer"
            style={{ color: activeAppId === "settings" ? accent.hex : undefined }}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Right: In-OS GitHub & LinkedIn App Triggers, Music Player Widget, Advanced Weather & Clock */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* GitHub In-OS App Launch */}
        <button
          onClick={() => onOpenApp("github")}
          className={`transition cursor-pointer p-1 rounded hover:bg-white/10 ${
            isLight ? "text-slate-700 hover:text-black" : "text-slate-300 hover:text-white"
          }`}
          title="Open GitHub Profile in NinjaOS"
        >
          <Github className="w-4 h-4" />
        </button>

        {/* LinkedIn In-OS App Launch */}
        <button
          onClick={() => onOpenApp("linkedin")}
          className={`transition cursor-pointer p-1 rounded hover:bg-white/10 ${
            isLight ? "text-sky-700 hover:text-sky-900" : "text-sky-400 hover:text-sky-300"
          }`}
          title="Open LinkedIn Network in NinjaOS"
        >
          <Linkedin className="w-4 h-4" />
        </button>

        {/* Music Player Widget */}
        <MusicPlayerWidget />

        {/* Audio System Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`transition cursor-pointer hidden sm:block ${isLight ? "text-[#94a3b8] hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
          title={isMuted ? "Audio Muted" : "Audio Stereo 100%"}
        >
          <Volume2 className={`w-3.5 h-3.5 ${isMuted ? "opacity-40" : ""}`} />
        </button>

        {/* Advanced Weather Widget */}
        <WeatherWidget />

        {/* Clock */}
        <div className={`font-mono text-[11px] hidden xs:block ${isLight ? "text-slate-900 font-bold" : "text-slate-200"}`}>
          {time || "11:41:00 PM"}
        </div>
      </div>
    </header>
  );
};
