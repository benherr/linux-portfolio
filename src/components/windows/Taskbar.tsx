"use client";

import React from "react";
import { WindowState, AppId } from "@/types/os";
import { Terminal, User, Briefcase, ShieldCheck, Folder, Cpu, Award, FileText, Mail, Activity } from "lucide-react";

interface TaskbarProps {
  windows: WindowState[];
  activeAppId: AppId | null;
  onFocus: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Terminal,
  User,
  Briefcase,
  ShieldCheck,
  Folder,
  Cpu,
  Award,
  FileText,
  Mail,
  Activity,
};

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeAppId,
  onFocus,
  onToggleMinimize,
}) => {
  const openWindows = windows.filter((w) => w.isOpen);

  if (openWindows.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-3 left-1/2 -translate-x-1/2 z-[150] bg-ninja-panel/95 backdrop-blur-md border border-ninja-border/90 rounded-xl px-2.5 py-1.5 flex items-center space-x-1.5 shadow-2xl max-w-[95vw] overflow-x-auto scrollbar-none">
      {openWindows.map((win) => {
        const Icon = ICON_MAP[win.iconName] || Terminal;
        const isActive = activeAppId === win.id && !win.isMinimized;

        return (
          <button
            key={win.id}
            onClick={() => {
              if (win.isMinimized) {
                onToggleMinimize(win.id);
              } else if (isActive) {
                onToggleMinimize(win.id);
              } else {
                onFocus(win.id);
              }
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer shrink-0 ${
              isActive
                ? "bg-ninja-surface border border-ninja-cyan text-white shadow-glow"
                : win.isMinimized
                ? "bg-ninja-dark/50 text-slate-500 hover:text-slate-300 border border-transparent"
                : "bg-ninja-dark/80 text-slate-300 hover:bg-ninja-surface hover:text-white border border-ninja-border/50"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-ninja-cyan" : "text-slate-400"}`} />
            <span className="max-w-[100px] sm:max-w-[130px] truncate text-[11px] font-semibold">{win.title}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-ninja-cyan animate-pulse" : win.isMinimized ? "bg-slate-600" : "bg-emerald-500"}`} />
          </button>
        );
      })}
    </div>
  );
};
