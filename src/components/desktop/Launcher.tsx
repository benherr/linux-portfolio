"use client";

import React, { useState } from "react";
import { AppId, DesktopIcon } from "@/types/os";
import { Search, Terminal, User, Briefcase, ShieldCheck, Folder, Cpu, Award, FileText, Mail, Activity, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LauncherProps {
  isOpen: boolean;
  onClose: () => void;
  desktopIcons: DesktopIcon[];
  onOpenApp: (id: AppId) => void;
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

export const Launcher: React.FC<LauncherProps> = ({
  isOpen,
  onClose,
  desktopIcons,
  onOpenApp,
}) => {
  const [search, setSearch] = useState<string>("");

  if (!isOpen) return null;

  const filteredIcons = desktopIcons.filter(
    (icon) =>
      icon.title.toLowerCase().includes(search.toLowerCase()) ||
      icon.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-start pt-10 pl-3 sm:pl-6" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-ninja-dark border border-ninja-border/90 rounded-lg shadow-2xl p-4 space-y-4"
        >
          {/* Header & Search Bar */}
          <div className="flex items-center justify-between border-b border-ninja-border/70 pb-3">
            <div className="flex items-center space-x-2 flex-1 mr-3 bg-ninja-panel border border-ninja-border/80 rounded px-3 py-1.5 focus-within:border-ninja-cyan">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search NinjaOS Applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredIcons.map((icon) => {
              const Icon = ICON_MAP[icon.iconName] || Terminal;
              return (
                <button
                  key={icon.id}
                  onClick={() => {
                    onOpenApp(icon.id);
                    onClose();
                  }}
                  className="flex items-center space-x-3 p-2.5 rounded bg-ninja-panel/60 hover:bg-ninja-surface border border-ninja-border/40 hover:border-ninja-cyan/50 text-left transition group cursor-pointer"
                >
                  <div className="p-2 rounded bg-ninja-dark border border-ninja-border group-hover:border-ninja-cyan group-hover:shadow-glow shrink-0">
                    <Icon className="w-5 h-5 text-ninja-cyan" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                      {icon.title}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize truncate font-mono">
                      {icon.category} app
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <div className="col-span-2 text-center text-xs text-slate-500 py-6 font-mono">
                No matching applications found.
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="border-t border-ninja-border/60 pt-2 text-[11px] text-slate-500 font-mono flex justify-between">
            <span>NinjaOS 1.0 Applications</span>
            <span>Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
