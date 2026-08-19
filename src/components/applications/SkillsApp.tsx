"use client";

import React from "react";
import { skillsData } from "@/data/skills";
import { Cpu, Terminal, ShieldCheck, Code, Cloud, Wrench } from "lucide-react";

const CATEGORY_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  "Linux & Shell": Terminal,
  Cybersecurity: ShieldCheck,
  Programming: Code,
  "Web Development": Code,
  "Cloud & DevOps": Cloud,
  "Tools & Frameworks": Wrench,
};

export const SkillsApp: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Overview Header */}
      <div className="flex items-center space-x-3 p-4 rounded-lg bg-ninja-panel border border-ninja-border shadow-glow">
        <Cpu className="w-8 h-8 text-ninja-cyan shrink-0" />
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-mono">Technical Skill Matrix</h1>
          <p className="text-xs text-slate-400">
            Categorized technical capabilities & proficiency levels
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsData.map((cat, idx) => {
          const IconComponent = CATEGORY_ICON_MAP[cat.category] || Cpu;
          return (
            <div
              key={idx}
              className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3"
            >
              <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center space-x-2 border-b border-ninja-border/60 pb-2">
                <IconComponent className="w-4 h-4 text-ninja-cyan" />
                <span>{cat.category}</span>
              </h2>

              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2 rounded bg-ninja-dark border border-ninja-border/60 flex flex-col space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          skill.level === "Intermediate"
                            ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                            : skill.level === "Familiar"
                            ? "bg-sky-950 text-sky-400 border-sky-800"
                            : "bg-purple-950 text-purple-400 border-purple-800"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-slate-400 font-sans">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
