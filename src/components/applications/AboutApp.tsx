"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { GraduationCap, ShieldCheck, Terminal, Server, Cpu, Globe, Award } from "lucide-react";
import { AppId } from "@/types/os";

interface AboutAppProps {
  onOpenApp?: (id: AppId) => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenApp }) => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Header Profile Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-ninja-panel border border-ninja-border shadow-glow">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-ninja-surface border-2 border-ninja-cyan flex items-center justify-center text-ninja-cyan shadow-glow font-mono font-bold text-xl shrink-0">
            N
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{profileData.name}</h1>
            <p className="text-xs sm:text-sm text-ninja-cyan font-mono">{profileData.role}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Location: {profileData.location} • MCA 2025</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onOpenApp && (
            <button
              onClick={() => onOpenApp("contact")}
              className="bg-ninja-cyan/10 hover:bg-ninja-cyan/20 border border-ninja-cyan/40 text-ninja-cyan text-xs px-3 py-1.5 rounded transition cursor-pointer font-mono"
            >
              Contact Me
            </button>
          )}
        </div>
      </div>

      {/* Bio Overview */}
      <div className="bg-ninja-panel/60 border border-ninja-border/80 rounded-lg p-4 space-y-3">
        <h2 className="text-sm font-bold text-slate-200 flex items-center space-x-2 font-mono border-b border-ninja-border/60 pb-2">
          <Terminal className="w-4 h-4 text-ninja-green" />
          <span>Professional Background & Overview</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{profileData.bio}</p>
      </div>

      {/* Education & Core Focus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Card */}
        <div className="bg-ninja-panel/60 border border-ninja-border/80 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-bold text-slate-200 flex items-center space-x-2 font-mono border-b border-ninja-border/60 pb-2">
            <GraduationCap className="w-4 h-4 text-ninja-cyan" />
            <span>Academic Qualifications</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-semibold text-white block text-sm">{profileData.education.degree}</span>
              <span className="text-ninja-cyan font-mono">{profileData.education.field}</span>
            </div>
            <div className="text-slate-400">
              Completed: <span className="text-slate-200 font-mono">{profileData.education.completionYear}</span>
            </div>
            <div className="text-slate-400">
              Institution: <span className="text-slate-200">{profileData.education.institution}</span> ({profileData.education.location})
            </div>
          </div>
        </div>

        {/* Primary Career Directions */}
        <div className="bg-ninja-panel/60 border border-ninja-border/80 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-bold text-slate-200 flex items-center space-x-2 font-mono border-b border-ninja-border/60 pb-2">
            <ShieldCheck className="w-4 h-4 text-ninja-green" />
            <span>Primary Focus & Specialization</span>
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {profileData.primaryFocus.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ninja-green shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Interests */}
      <div className="bg-ninja-panel/60 border border-ninja-border/80 rounded-lg p-4 space-y-3">
        <h2 className="text-sm font-bold text-slate-200 flex items-center space-x-2 font-mono border-b border-ninja-border/60 pb-2">
          <Cpu className="w-4 h-4 text-ninja-amber" />
          <span>Secondary Technical Interests</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {profileData.secondaryInterests.map((interest, idx) => (
            <span
              key={idx}
              className="bg-ninja-dark border border-ninja-border text-slate-300 text-xs px-2.5 py-1 rounded font-mono"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
