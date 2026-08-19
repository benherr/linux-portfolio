"use client";

import React, { useState, useEffect } from "react";
import { WallpaperId, ThemeMode, AccentColor } from "@/types/os";
import { Maximize, Minimize, Sun, Moon } from "lucide-react";

interface SettingsAppProps {
  currentWallpaper: WallpaperId;
  themeMode: ThemeMode;
  accentColor: AccentColor;
  glassOpacity: number;
  onSelectWallpaper: (id: WallpaperId) => void;
  onSelectThemeMode: (mode: ThemeMode) => void;
  onSelectAccentColor: (accent: AccentColor) => void;
  onSelectGlassOpacity: (opacity: number) => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  currentWallpaper,
  themeMode,
  accentColor,
  glassOpacity,
  onSelectWallpaper,
  onSelectThemeMode,
  onSelectAccentColor,
  onSelectGlassOpacity,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const wallpapers: { id: WallpaperId; name: string }[] = [
    { id: "firewatch", name: "Firewatch" },
    { id: "mountainlake", name: "Mountain Lake" },
    { id: "kyototwilight", name: "Kyoto Twilight" },
    { id: "cyberhorizon", name: "Cyber Horizon" },
    { id: "lakesidecabin", name: "Lakeside Cabin" },
    { id: "deepspace", name: "Deep Space" },
  ];

  const accentColors: { id: AccentColor; label: string; bgClass: string }[] = [
    { id: "amber", label: "Amber", bgClass: "bg-[#ff9e3b]" },
    { id: "coral", label: "Coral", bgClass: "bg-[#f43f5e]" },
    { id: "cyan", label: "Cyan", bgClass: "bg-[#06b6d4]" },
    { id: "purple", label: "Purple", bgClass: "bg-[#a855f7]" },
    { id: "blue", label: "Blue", bgClass: "bg-[#3b82f6]" },
    { id: "green", label: "Sage Green", bgClass: "bg-[#10b981]" },
  ];

  const isLight = themeMode === "light";

  const renderWallpaperPreview = (id: WallpaperId) => {
    if (id === "mountainlake") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#091024] via-[#162347] to-[#1d273d]">
          <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-blue-100/90 shadow-sm" />
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
            <polygon fill="#1a2542" fillOpacity="0.7" points="0,30 25,18 50,28 75,16 100,25 100,50 0,50" />
            <polygon fill="#11182d" points="0,38 30,28 60,35 100,28 100,50 0,50" />
          </svg>
        </div>
      );
    }
    if (id === "kyototwilight") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0a1f] via-[#22133b] to-[#36194a]">
          <div className="absolute top-3 left-1/3 w-8 h-8 rounded-full bg-rose-500/30 blur-sm" />
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
            <path fill="#140a24" d="M0,35 L25,30 L50,38 L75,28 L100,34 L100,50 L0,50 Z" />
          </svg>
        </div>
      );
    }
    if (id === "cyberhorizon") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#070114] via-[#210238] to-[#450552]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 shadow-sm" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#060012] border-t border-cyan-400/50" />
        </div>
      );
    }
    if (id === "lakesidecabin") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1324] via-[#162744] to-[#2e3745]">
          <div className="absolute bottom-2 right-4 w-[60px] h-[60px] bg-amber-500/30 rounded-full blur-sm" />
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
            <polygon fill="#1b2a41" points="0,32 30,22 65,30 100,20 100,50 0,50" />
          </svg>
        </div>
      );
    }
    if (id === "deepspace") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#060212] via-[#12082b] to-[#1c0a3d]">
          <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-indigo-400 shadow-sm" />
          <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-purple-500/40 blur-xs" />
        </div>
      );
    }
    // Default Firewatch
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1026] via-[#1a254b] to-[#592651]">
        <div className="absolute top-2 right-5 w-3 h-3 rounded-full bg-amber-100 shadow-sm" />
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
          <polygon fill="#3b6989" fillOpacity="0.5" points="0,30 25,18 50,28 75,16 100,25 100,50 0,50" />
          <polygon fill="#231230" points="0,38 30,28 60,35 100,28 100,50 0,50" />
        </svg>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-3 bg-amber-500/80 rounded-xs" />
      </div>
    );
  };

  return (
    <div
      className={`p-5 space-y-6 font-sans select-none transition-colors duration-200 ${
        isLight ? "bg-slate-100 text-slate-800" : "bg-[#120e24] text-slate-200"
      }`}
    >
      {/* Top Section: Display Mode & Theme Mode */}
      <div className="flex items-center justify-between border-b border-slate-700/30 pb-4">
        <div className="flex items-center space-x-3">
          <span className="text-emerald-400 font-bold text-sm">●</span>
          <h1 className="text-base font-bold font-mono tracking-wide">System Appearance & Preferences</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectThemeMode(themeMode === "dark" ? "light" : "dark")}
            className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 font-mono text-xs font-bold transition ${
              isLight
                ? "bg-amber-200 border-amber-400 text-amber-900 shadow-sm"
                : "bg-[#1d1e42] border-[#2b2c52] text-amber-400 hover:border-[#e2b714]"
            }`}
          >
            {themeMode === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-700" />}
            <span>{themeMode === "dark" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="px-3 py-1.5 rounded-xl bg-[#1d1e42] hover:bg-[#282a5c] border border-[#e2b714]/60 text-white font-mono text-xs font-bold transition flex items-center space-x-1.5"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-[#e2b714]" /> : <Maximize className="w-3.5 h-3.5 text-[#e2b714]" />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* WALLPAPER Grid (Clear Mini Vector Visual Previews) */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="font-bold uppercase tracking-wider text-slate-400">WALLPAPER</span>
          <span className="text-[11px] text-slate-500 italic">double-click desktop to cycle</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {wallpapers.map((wp) => {
            const isSelected = currentWallpaper === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => onSelectWallpaper(wp.id)}
                className={`relative h-24 rounded-xl overflow-hidden border-2 transition group flex flex-col justify-end p-2.5 ${
                  isSelected
                    ? "border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg"
                    : "border-transparent hover:border-slate-500/50 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Clear Vector Mini Visual Preview */}
                {renderWallpaperPreview(wp.id)}

                <span className="relative z-10 text-xs font-mono font-bold text-white drop-shadow-md">
                  {wp.name}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACCENT Color Swatches */}
      <div className="space-y-2.5 pt-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          ACCENT (Applies to icons & OS themes)
        </div>

        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          <button
            onClick={() => onSelectAccentColor("match")}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono transition flex items-center space-x-2 ${
              accentColor === "match"
                ? "bg-[#ff9e3b]/20 border-[#ff9e3b] text-[#ff9e3b] font-bold"
                : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#ff9e3b]" />
            <span>Match wallpaper</span>
          </button>

          {accentColors.map((ac) => (
            <button
              key={ac.id}
              onClick={() => onSelectAccentColor(ac.id)}
              className={`w-7 h-7 rounded-full transition transform ${ac.bgClass} ${
                accentColor === ac.id ? "ring-2 ring-white scale-110 shadow-lg" : "hover:scale-105 opacity-80 hover:opacity-100"
              }`}
              title={ac.label}
            />
          ))}
        </div>
      </div>

      {/* WINDOW GLASS Slider */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="font-bold uppercase tracking-wider text-slate-400">WINDOW GLASS</span>
          <span className="font-bold text-emerald-400">{glassOpacity}%</span>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span>Clear</span>
          <input
            type="range"
            min="20"
            max="95"
            value={glassOpacity}
            onChange={(e) => onSelectGlassOpacity(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-700/60 rounded-lg appearance-none accent-emerald-400"
          />
          <span>Frosted</span>
        </div>
      </div>
    </div>
  );
};
