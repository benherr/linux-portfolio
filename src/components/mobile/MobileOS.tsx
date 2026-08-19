"use client";

import React, { useState } from "react";
import { AppId, DesktopIcon } from "@/types/os";
import { WindowState } from "@/types/os";
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
import { Shield, Terminal as TermIcon, Briefcase, Cpu, Award, Folder, Mail, Activity, User, X, Home } from "lucide-react";

interface MobileOSProps {
  desktopIcons: DesktopIcon[];
  onToggleRecruiterMode: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Terminal: TermIcon,
  User,
  Briefcase,
  ShieldCheck: Shield,
  Folder,
  Cpu,
  Award,
  FileText: Briefcase,
  Mail,
  Activity,
};

export const MobileOS: React.FC<MobileOSProps> = ({ desktopIcons, onToggleRecruiterMode }) => {
  const [activeApp, setActiveApp] = useState<AppId | null>("terminal");

  const renderActiveApp = () => {
    switch (activeApp) {
      case "terminal":
        return <Terminal openWindow={(id) => setActiveApp(id)} closeWindow={() => setActiveApp(null)} />;
      case "about":
        return <AboutApp onOpenApp={(id) => setActiveApp(id)} />;
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans flex flex-col justify-between selection:bg-ninja-cyan selection:text-ninja-dark">
      {/* Top Mobile Bar */}
      <header className="h-12 bg-ninja-dark/95 border-b border-ninja-border/80 px-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-ninja-cyan animate-pulse" />
          <span className="font-mono font-bold text-slate-100 text-sm">NinjaOS Mobile</span>
        </div>

        <button
          onClick={onToggleRecruiterMode}
          className="bg-ninja-surface border border-ninja-border text-slate-300 text-xs px-2.5 py-1 rounded font-mono"
        >
          Recruiter Mode
        </button>
      </header>

      {/* Main Content View (App Grid or Active App View) */}
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        {activeApp ? (
          <div className="bg-ninja-panel/90 border border-ninja-border/80 rounded-xl overflow-hidden shadow-2xl relative">
            {/* Modal Title bar */}
            <div className="h-10 bg-ninja-panel border-b border-ninja-border/80 px-3 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-ninja-cyan uppercase">{activeApp}</span>
              <button
                onClick={() => setActiveApp(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-[calc(100vh-140px)] overflow-y-auto">{renderActiveApp()}</div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold text-white font-mono">NinjaOS Portfolio</h1>
              <p className="text-xs text-slate-400 font-mono">Tap an app below to inspect information</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {desktopIcons.map((icon) => {
                const Icon = ICON_MAP[icon.iconName] || TermIcon;
                return (
                  <button
                    key={icon.id}
                    onClick={() => setActiveApp(icon.id)}
                    className="p-3 rounded-xl bg-ninja-panel/80 border border-ninja-border/80 hover:border-ninja-cyan flex flex-col items-center justify-center space-y-2 text-center shadow transition active:scale-95"
                  >
                    <div className="p-2.5 rounded-lg bg-ninja-dark border border-ninja-border text-ninja-cyan">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-200 truncate w-full">
                      {icon.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Dock Navigation */}
      <nav className="fixed bottom-0 inset-x-0 h-14 bg-ninja-dark/95 border-t border-ninja-border/80 px-4 flex items-center justify-around z-50 backdrop-blur-md">
        <button
          onClick={() => setActiveApp(null)}
          className={`flex flex-col items-center space-y-0.5 ${
            activeApp === null ? "text-ninja-cyan font-bold" : "text-slate-400"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        <button
          onClick={() => setActiveApp("terminal")}
          className={`flex flex-col items-center space-y-0.5 ${
            activeApp === "terminal" ? "text-ninja-cyan font-bold" : "text-slate-400"
          }`}
        >
          <TermIcon className="w-5 h-5" />
          <span className="text-[10px] font-mono">Terminal</span>
        </button>

        <button
          onClick={() => setActiveApp("projects")}
          className={`flex flex-col items-center space-y-0.5 ${
            activeApp === "projects" ? "text-ninja-cyan font-bold" : "text-slate-400"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-mono">Projects</span>
        </button>

        <button
          onClick={() => setActiveApp("security")}
          className={`flex flex-col items-center space-y-0.5 ${
            activeApp === "security" ? "text-ninja-cyan font-bold" : "text-slate-400"
          }`}
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px] font-mono">Security</span>
        </button>
      </nav>
    </div>
  );
};
