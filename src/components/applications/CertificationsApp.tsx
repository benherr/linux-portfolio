"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";
import { Award, Cloud, Cpu, ShieldCheck, Terminal, ExternalLink } from "lucide-react";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Cloud,
  Cpu,
  ShieldCheck,
  Terminal,
};

export const CertificationsApp: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 rounded-lg bg-ninja-panel border border-ninja-border shadow-glow">
        <Award className="w-8 h-8 text-ninja-amber shrink-0" />
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-mono">
            Certifications & Credentials
          </h1>
          <p className="text-xs text-slate-400">Verified cloud, security, and AI qualifications</p>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificationsData.map((cert) => {
          const Icon = ICON_MAP[cert.badgeIcon] || Award;
          return (
            <div
              key={cert.id}
              className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-ninja-amber/60 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded bg-ninja-dark border border-ninja-border text-ninja-amber shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">{cert.name}</h2>
                      <p className="text-xs text-ninja-amber font-mono">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-ninja-dark border border-ninja-border px-2 py-0.5 rounded">
                    {cert.year}
                  </span>
                </div>

                {/* Verified Skills */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 block font-semibold">
                    Verified Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsVerified.map((sk, idx) => (
                      <span
                        key={idx}
                        className="bg-ninja-dark text-slate-300 border border-ninja-border text-[10px] px-2 py-0.5 rounded font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-3 border-t border-ninja-border/60">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-ninja-amber hover:text-white bg-ninja-amber/10 hover:bg-ninja-amber/20 border border-ninja-amber/40 px-3 py-1.5 rounded font-mono transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Credential</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
