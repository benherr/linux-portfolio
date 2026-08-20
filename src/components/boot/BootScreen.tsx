"use client";

import React, { useState } from "react";
import { BootLog, BootStage } from "@/hooks/useBootSequence";
import { User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";

interface BootScreenProps {
  bootStage: BootStage;
  logs: BootLog[];
  progress: number;
  onCompleteLogin: () => void;
  onSkip: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({
  bootStage,
  logs,
  progress,
  onCompleteLogin,
  onSkip,
}) => {
  const [imageError, setImageError] = useState(false);

  if (bootStage === "complete") return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070814] text-slate-100 font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b1e] via-[#11132e] to-[#070814] opacity-95" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff9e3b]/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Console Logs OR Ultra-Clean Profile Avatar Screen */}
      <div className="relative z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {bootStage === "booting" ? (
            <motion.div
              key="booting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Boot Terminal Box */}
              <div className="h-64 bg-[#04050d]/90 border border-slate-800 rounded-xl p-4 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin shadow-2xl">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-2">
                    <span className="text-slate-500">[{log.time}]</span>
                    {log.status === "OK" && (
                      <span className="text-emerald-400 font-bold">[  OK  ]</span>
                    )}
                    <span className="text-slate-300">{log.text}</span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Initializing Kernel...</span>
                  <span className="text-[#ff9e3b] font-bold">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff9e3b] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onSkip}
                  className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  Skip Boot
                </button>
              </div>
            </motion.div>
          ) : (
            /* ULTRA-CLEAN USER AVATAR SCREEN: ONLY PROFILE PICTURE, BENHER & CLICK PROFILE TO ENTER */
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center text-center space-y-6"
            >
              {/* Circular Profile Picture Avatar Container */}
              <div
                onClick={onCompleteLogin}
                className="relative group cursor-pointer"
                title="Click profile to enter"
              >
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#ff9e3b] via-purple-500 to-rose-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />

                {/* Profile Circle */}
                <div className="relative w-36 h-36 rounded-full bg-[#0d0f22] border-4 border-[#ff9e3b] p-1 shadow-2xl flex items-center justify-center overflow-hidden transition transform group-hover:scale-105">
                  {!imageError ? (
                    <img
                      src={profileData.avatarUrl || "/avatar.png"}
                      alt={profileData.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1d1e42] to-[#090b1e] flex flex-col items-center justify-center relative">
                      <User className="w-16 h-16 text-[#ff9e3b]" />
                      <Sparkles className="w-4 h-4 text-amber-300 absolute top-3 right-3 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Username & Simple Subtitle */}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-bold font-mono text-white tracking-widest">BENHER</h2>
                <p className="text-xs text-[#ff9e3b] font-mono tracking-wide">
                  Click profile to enter
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
