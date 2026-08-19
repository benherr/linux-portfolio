"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificationsData } from "@/data/certifications";
import { contactData } from "@/data/contact";
import { Download, FileText, ExternalLink, GraduationCap, Briefcase, Cpu, Award } from "lucide-react";

export const ResumeApp: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-ninja-panel border border-ninja-border shadow-glow">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-ninja-cyan shrink-0" />
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white font-mono">
              Ninja - Professional Resume
            </h1>
            <p className="text-xs text-slate-400">MCA 2025 • Linux & Cybersecurity Specialist</p>
          </div>
        </div>

        <a
          href="/resume.pdf"
          download="Ninja_Resume.pdf"
          className="flex items-center space-x-2 bg-ninja-cyan hover:bg-cyan-400 text-ninja-dark font-bold font-mono text-xs px-4 py-2 rounded shadow transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume PDF</span>
        </a>
      </div>

      {/* Resume Document Sheet */}
      <div className="bg-ninja-panel/90 border border-ninja-border rounded-lg p-6 space-y-6 font-sans">
        {/* Header Section */}
        <div className="border-b border-ninja-border/80 pb-4 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
          <p className="text-sm text-ninja-cyan font-mono font-semibold">{profileData.role}</p>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Email: {contactData.email} • Location: {contactData.location} • MCA 2025
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-ninja-cyan font-mono border-b border-ninja-border/60 pb-1">
            EXECUTIVE SUMMARY
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">{profileData.bio}</p>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-ninja-cyan font-mono border-b border-ninja-border/60 pb-1">
            EDUCATION
          </h3>
          <div className="text-xs space-y-1">
            <div className="flex justify-between font-semibold text-white">
              <span>{profileData.education.degree}</span>
              <span className="font-mono text-ninja-cyan">{profileData.education.completionYear}</span>
            </div>
            <div className="text-slate-400">
              {profileData.education.field} — {profileData.education.institution} ({profileData.education.location})
            </div>
          </div>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-ninja-cyan font-mono border-b border-ninja-border/60 pb-1">
            TECHNICAL SKILLS & DOMAINS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skillsData.map((cat, idx) => (
              <div key={idx} className="bg-ninja-dark p-2 rounded border border-ninja-border/60">
                <span className="font-mono font-bold text-ninja-green block text-[11px]">
                  {cat.category}:
                </span>
                <span className="text-slate-300 text-[11px]">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-ninja-cyan font-mono border-b border-ninja-border/60 pb-1">
            KEY TECHNICAL PROJECTS
          </h3>
          {projectsData.slice(0, 3).map((proj) => (
            <div key={proj.id} className="text-xs space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>{proj.title}</span>
                <span className="font-mono text-emerald-400 text-[11px]">{proj.status}</span>
              </div>
              <p className="text-slate-300">{proj.shortDescription}</p>
              <div className="text-[11px] text-slate-400 font-mono">
                Tech Stack: {proj.technologies.slice(0, 5).join(", ")}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-ninja-cyan font-mono border-b border-ninja-border/60 pb-1">
            CERTIFICATIONS & ACCOMPLISHMENTS
          </h3>
          <ul className="text-xs space-y-1 text-slate-300">
            {certificationsData.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>
                  • <strong className="text-white">{c.name}</strong> — {c.issuer}
                </span>
                <span className="font-mono text-slate-400">{c.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
