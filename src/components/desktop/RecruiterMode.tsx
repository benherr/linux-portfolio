"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificationsData } from "@/data/certifications";
import { contactData } from "@/data/contact";
import { Terminal, Shield, Download, ExternalLink, Github, Mail, Linkedin, Award, Cpu, Briefcase, User } from "lucide-react";

interface RecruiterModeProps {
  onReturnToOS: () => void;
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({ onReturnToOS }) => {
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "skills" | "certifications" | "contact">("about");

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans selection:bg-ninja-cyan selection:text-ninja-dark flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-ninja-dark/90 backdrop-blur-md border-b border-ninja-border/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-ninja-surface border border-ninja-cyan flex items-center justify-center font-mono font-bold text-ninja-cyan">
            N
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">{profileData.name}</h1>
            <p className="text-xs text-ninja-cyan font-mono">{profileData.role}</p>
          </div>
        </div>

        {/* Right Action: Return to OS Mode */}
        <button
          onClick={onReturnToOS}
          className="flex items-center space-x-2 bg-ninja-surface border border-ninja-cyan/50 hover:border-ninja-cyan text-ninja-cyan hover:text-white px-3.5 py-1.5 rounded text-xs font-mono transition shadow-glow cursor-pointer"
        >
          <Shield className="w-4 h-4 text-ninja-cyan animate-pulse" />
          <span>Launch Linux OS Mode</span>
        </button>
      </header>

      {/* Hero Banner */}
      <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto w-full space-y-6">
        <div className="p-6 rounded-xl bg-ninja-panel/90 border border-ninja-border/80 shadow-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-ninja-cyan/10 border border-ninja-cyan/40 text-ninja-cyan text-xs px-3 py-1 rounded-full font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>MCA 2025 Graduate • Linux & Cybersecurity Portfolio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Building Secure Linux Systems, Modern Web Applications & Decentralized Platforms
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">{profileData.bio}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center space-x-2 bg-ninja-cyan hover:bg-cyan-400 text-ninja-dark font-bold font-mono text-xs px-4 py-2 rounded shadow transition cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Candidate</span>
            </a>
            <a
              href="/resume.pdf"
              download="Ninja_Resume.pdf"
              className="flex items-center space-x-2 bg-ninja-surface border border-ninja-border hover:border-ninja-cyan text-slate-200 hover:text-white text-xs font-mono px-4 py-2 rounded transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-ninja-cyan" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-ninja-border/80 gap-2 pb-1 font-mono text-xs scrollbar-none">
          {[
            { id: "about", label: "About & Education", icon: User },
            { id: "projects", label: "Projects Showcase", icon: Briefcase },
            { id: "skills", label: "Technical Skills", icon: Cpu },
            { id: "certifications", label: "Certifications", icon: Award },
            { id: "contact", label: "Contact Details", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-t font-semibold transition cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-ninja-panel text-ninja-cyan border-t-2 border-ninja-cyan border-x border-ninja-border"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-ninja-panel/60 border border-ninja-border/80 rounded-b-xl p-6">
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white font-mono">Academic Qualifications</h3>
                <div className="p-4 rounded bg-ninja-dark border border-ninja-border text-xs space-y-1">
                  <div className="font-bold text-white text-sm">{profileData.education.degree}</div>
                  <div className="text-ninja-cyan font-mono">{profileData.education.field}</div>
                  <div className="text-slate-400">
                    Completion: {profileData.education.completionYear} • {profileData.education.institution} ({profileData.education.location})
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white font-mono">Primary Focus & Career Direction</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {profileData.primaryFocus.map((f, idx) => (
                    <li key={idx} className="p-3 rounded bg-ninja-dark border border-ninja-border flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-ninja-green" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg bg-ninja-dark border border-ninja-border space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white">{project.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.fullDescription}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-ninja-panel px-2 py-0.5 rounded text-slate-300 border border-ninja-border">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-ninja-border/60 flex items-center space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-white flex items-center space-x-1 font-mono"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsData.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-ninja-dark border border-ninja-border space-y-2">
                  <h3 className="text-sm font-bold text-ninja-cyan font-mono">{cat.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, sIdx) => (
                      <span key={sIdx} className="text-xs bg-ninja-panel px-2.5 py-1 rounded text-slate-200 border border-ninja-border font-mono">
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((c) => (
                <div key={c.id} className="p-4 rounded-lg bg-ninja-dark border border-ninja-border space-y-2">
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-ninja-amber font-mono">{c.issuer} • {c.year}</p>
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-ninja-amber hover:underline font-mono pt-1"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-ninja-dark border border-ninja-border space-y-2">
                <div className="font-bold text-white text-sm">Direct Contact</div>
                <div>Email: <span className="text-ninja-cyan font-mono">{contactData.email}</span></div>
                <div>Location: {contactData.location}</div>
                <div>Availability: {contactData.availability}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ninja-border/80 py-4 px-4 text-center text-xs font-mono text-slate-500">
        NinjaOS Portfolio • Master of Computer Applications (MCA 2025)
      </footer>
    </div>
  );
};
