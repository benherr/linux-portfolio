"use client";

import React, { useState } from "react";
import { contactData } from "@/data/contact";
import { Mail, Github, Linkedin, MapPin, Clock, Copy, Check, Send } from "lucide-react";

export const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 rounded-lg bg-ninja-panel border border-ninja-border shadow-glow">
        <Mail className="w-8 h-8 text-ninja-cyan shrink-0" />
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-mono">Contact & Network</h1>
          <p className="text-xs text-slate-400">Get in touch for roles, projects, or technical collaboration</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Card */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-ninja-cyan font-mono text-xs font-semibold">
              <Mail className="w-4 h-4" />
              <span>Direct Email</span>
            </div>
            <div className="text-base font-bold text-white font-mono break-all">{contactData.email}</div>
            <p className="text-xs text-slate-400">Preferred channel for recruiter inquiries & professional opportunities.</p>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <a
              href={`mailto:${contactData.email}`}
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-ninja-cyan hover:bg-cyan-400 text-ninja-dark font-bold font-mono text-xs px-3 py-2 rounded shadow transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Email Me</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-2 bg-ninja-surface hover:bg-slate-800 border border-ninja-border rounded text-slate-300 transition cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-ninja-green font-mono text-xs font-semibold">
              <Github className="w-4 h-4" />
              <span>Developer Profiles</span>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-ninja-dark border border-ninja-border hover:border-ninja-cyan transition group"
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 text-slate-300 group-hover:text-ninja-cyan" />
                  <span className="font-mono text-slate-200">GitHub Profile</span>
                </div>
                <span className="text-[10px] text-ninja-cyan font-mono">Visit →</span>
              </a>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-ninja-dark border border-ninja-border hover:border-ninja-cyan transition group"
              >
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-slate-300 group-hover:text-ninja-cyan" />
                  <span className="font-mono text-slate-200">LinkedIn Network</span>
                </div>
                <span className="text-[10px] text-ninja-cyan font-mono">Connect →</span>
              </a>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex justify-between border-t border-ninja-border/60 pt-2">
            <span>Location: {contactData.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
