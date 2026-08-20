"use client";

import React, { useState } from "react";
import { Github, Linkedin, Lock, RotateCw, ExternalLink, Star, GitFork, Award, CheckCircle } from "lucide-react";
import { contactData } from "@/data/contact";
import { profileData } from "@/data/profile";

interface SocialBrowserAppProps {
  type: "github" | "linkedin";
}

export const SocialBrowserApp: React.FC<SocialBrowserAppProps> = ({ type }) => {
  const [url, setUrl] = useState<string>(
    type === "github" ? "https://github.com/benherr" : "https://www.linkedin.com/in/benher-basheer/"
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [githubImgSrc, setGithubImgSrc] = useState<string>("/githubprof.jpg");
  const [githubAvatarError, setGithubAvatarError] = useState(false);

  const [linkedinImgSrc, setLinkedinImgSrc] = useState<string>("/Myphoto.jpg");
  const [linkedinAvatarError, setLinkedinAvatarError] = useState(false);

  const handleGithubImageError = () => {
    if (githubImgSrc === "/githubprof.jpg") {
      setGithubImgSrc("/avatar.jpg");
    } else {
      setGithubAvatarError(true);
    }
  };

  const handleLinkedinImageError = () => {
    if (linkedinImgSrc === "/Myphoto.jpg") {
      setLinkedinImgSrc("/avatar.jpg");
    } else {
      setLinkedinAvatarError(true);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0d1e] text-slate-100 font-sans text-xs select-none">
      {/* OS Browser Address Bar Header */}
      <div className="h-10 border-b border-[#282d54] px-3 flex items-center space-x-3 bg-[#131630]/90 shrink-0">
        <button
          onClick={handleRefresh}
          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer ${isRefreshing ? "animate-spin" : ""
            }`}
          title="Refresh Page"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* URL Bar */}
        <div className="flex-1 flex items-center space-x-2 bg-[#080918] border border-[#282d54] rounded-lg px-3 py-1 text-slate-300 font-mono text-[11px]">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        {/* Open External Link Fallback */}
        <a
          href={type === "github" ? contactData.github : contactData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer flex items-center space-x-1 font-mono text-[10px]"
          title="Open in new browser tab"
        >
          <span>External</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main In-OS Browser Page Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        {type === "github" ? (
          /* IN-OS GITHUB PROFILE VIEW */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="p-6 rounded-2xl bg-[#13142e] border border-[#2b2c52] shadow-2xl flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 rounded-full border-4 border-[#ff9e3b] bg-[#080918] flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
                {!githubAvatarError ? (
                  <img
                    src={githubImgSrc}
                    alt="BENHER GitHub Avatar"
                    className="w-full h-full object-cover rounded-full"
                    onError={handleGithubImageError}
                  />
                ) : (
                  <Github className="w-12 h-12 text-[#ff9e3b]" />
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <h1 className="text-xl font-bold font-mono text-white">BENHER</h1>
                    <p className="text-xs text-slate-400 font-mono">@benherr</p>
                  </div>
                  <a
                    href={contactData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 sm:mt-0 px-4 py-1.5 rounded-lg bg-[#ff9e3b] hover:bg-[#ffa94d] text-[#070814] font-mono font-bold text-xs shadow-md transition"
                  >
                    Follow on GitHub
                  </a>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Software Engineer & Linux Architect specializing in Web Apps, Cybersecurity Laboratories, and Decentralized Systems.
                </p>

                <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 pt-1 justify-center sm:justify-start">
                  <span>📍 {contactData.location}</span>
                  <span>•</span>
                  <span>📦 Public Repositories</span>
                </div>
              </div>
            </div>

            {/* Featured Repositories Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Pinned Repositories
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Decentralized-Voting-DApp",
                    desc: "Ethereum smart contract voting protocol with zero-knowledge voter privacy.",
                    lang: "Next.js / Solidity",
                    stars: 1,
                    forks: 0,
                  },
                  {
                    name: "CampusCare",
                    desc: "A web platform for students to report infrastructure issues and for administrators to track and resolve complaints efficiently.",
                    lang: "MongoDB / Express / React",
                    stars: 1,
                    forks: 0,
                  },
                ].map((repo) => (
                  <div
                    key={repo.name}
                    className="p-4 rounded-xl bg-[#13142e]/70 border border-[#2b2c52] hover:border-[#ff9e3b]/50 transition flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 font-mono font-bold text-sm text-[#ff9e3b]">
                        <Github className="w-4 h-4" />
                        <span>{repo.name}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{repo.desc}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                      <span className="text-emerald-400">{repo.lang}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1"><Star className="w-3 h-3 text-amber-400" /><span>{repo.stars}</span></span>
                        <span className="flex items-center space-x-1"><GitFork className="w-3 h-3" /><span>{repo.forks}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* IN-OS LINKEDIN NETWORK VIEW */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* LinkedIn Banner Header */}
            <div className="rounded-2xl bg-[#13142e] border border-[#2b2c52] shadow-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 relative" />
              <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-12">
                <div className="w-24 h-24 rounded-full border-4 border-[#0b0d1e] bg-[#0b0d1e] flex items-center justify-center shrink-0 shadow-2xl overflow-hidden">
                  {!linkedinAvatarError ? (
                    <img
                      src={linkedinImgSrc}
                      alt="Benher Basheer LinkedIn Avatar"
                      className="w-full h-full object-cover rounded-full"
                      onError={handleLinkedinImageError}
                    />
                  ) : (
                    <Linkedin className="w-12 h-12 text-sky-400" />
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                      <h1 className="text-xl font-bold font-mono text-white flex items-center space-x-1.5">
                        <span>Benher Basheer</span>
                        <CheckCircle className="w-4 h-4 text-sky-400" />
                      </h1>
                      <p className="text-xs text-sky-400 font-mono">Software Engineer & Cybersecurity Developer</p>
                    </div>
                    <a
                      href={contactData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 sm:mt-0 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-mono font-bold text-xs shadow-md transition"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">College of Engineering Vadakara • Kerala, India</p>
                </div>
              </div>
            </div>

            {/* Experience & Professional Highlights */}
            <div className="p-6 rounded-2xl bg-[#13142e] border border-[#2b2c52] space-y-4">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4 text-sky-400" />
                <span>Professional Experience & Education</span>
              </h2>

              <div className="space-y-4 text-xs font-sans text-slate-300">
                <div className="p-4 rounded-xl bg-[#090b1e] border border-[#2b2c52] space-y-1">
                  <div className="font-bold text-white font-mono">Software Engineer & Full-Stack Developer</div>
                  <div className="text-[#ff9e3b] font-mono text-[11px]">{profileData.education.institution}</div>
                  <p className="text-slate-300 leading-relaxed pt-1">
                    MCA Graduate from {profileData.education.institution} specializing in full-stack web development, Linux systems, and modern desktop experiences.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-[11px]">
                  <div className="p-2.5 rounded-lg bg-[#181a3d] border border-[#2b2c52] text-sky-300">React & Next.js</div>
                  <div className="p-2.5 rounded-lg bg-[#181a3d] border border-[#2b2c52] text-sky-300">TypeScript / Node</div>
                  <div className="p-2.5 rounded-lg bg-[#181a3d] border border-[#2b2c52] text-sky-300">Linux & Shell</div>
                  <div className="p-2.5 rounded-lg bg-[#181a3d] border border-[#2b2c52] text-sky-300">Cybersecurity</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
