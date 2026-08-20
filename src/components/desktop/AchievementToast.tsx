"use client";

import React from "react";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  title,
  description,
  onClose,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed top-12 left-1/2 -translate-x-1/2 z-[300] bg-ninja-panel/95 border border-amber-500/40 rounded-xl p-3 sm:p-3.5 shadow-[0_8px_32px_rgba(245,158,11,0.2)] backdrop-blur-md flex items-center space-x-3 sm:space-x-3.5 w-[92vw] sm:w-auto max-w-sm select-none"
      >
        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <Star className="w-5 h-5 fill-amber-400" />
        </div>

        <div className="flex-1">
          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
            ACHIEVEMENT UNLOCKED
          </div>
          <div className="text-sm font-bold text-white tracking-wide">{title}</div>
          <div className="text-xs text-slate-300 font-sans">{description}</div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
