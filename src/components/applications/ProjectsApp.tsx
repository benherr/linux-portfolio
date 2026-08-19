"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { ExternalLink, Github, Sparkles, Layers, Shield, Cpu, Globe } from "lucide-react";

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ninja-border/80 pb-3 font-mono text-xs">
        {["all", "blockchain", "ai", "web", "security"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded capitalize transition cursor-pointer ${
              filter === cat
                ? "bg-ninja-cyan text-ninja-dark font-bold shadow-glow"
                : "bg-ninja-panel text-slate-400 hover:text-white border border-ninja-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`bg-ninja-panel/80 border ${
              project.isFeatured ? "border-ninja-cyan/60 shadow-glow" : "border-ninja-border"
            } rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-ninja-cyan transition`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>{project.title}</span>
                  {project.isFeatured && (
                    <span className="bg-ninja-cyan/20 text-ninja-cyan border border-ninja-cyan/40 text-[10px] px-2 py-0.5 rounded font-mono font-normal">
                      Featured
                    </span>
                  )}
                </h2>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  {project.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.fullDescription}</p>

              {/* Highlights */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-mono text-slate-400 font-semibold block">Key Features:</span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {project.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-ninja-cyan font-bold">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies & Links */}
            <div className="space-y-3 pt-3 border-t border-ninja-border/60">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-ninja-dark text-slate-300 border border-ninja-border text-[10px] px-2 py-0.5 rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-ninja-surface hover:bg-slate-800 border border-ninja-border px-3 py-1.5 rounded font-mono transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 text-xs text-ninja-cyan hover:text-white bg-ninja-cyan/10 hover:bg-ninja-cyan/20 border border-ninja-cyan/40 px-3 py-1.5 rounded font-mono transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
