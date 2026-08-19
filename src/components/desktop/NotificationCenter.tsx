"use client";

import React, { useState, useEffect } from "react";
import { SystemNotification } from "@/types/os";
import { Info, ShieldAlert, CheckCircle, Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: "welcome-1",
      title: "Welcome to NinjaOS 1.0",
      message: "Interactive Linux-powered portfolio ready. Double-click desktop icons to explore.",
      time: "Just now",
      type: "info",
      read: false,
    },
    {
      id: "terminal-tip",
      title: "Pro Tip: Terminal Shell",
      message: "Open Terminal & type 'help' or 'neofetch'. Try 'sudo hire-ninja'!",
      time: "Just now",
      type: "success",
      read: false,
    },
  ]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    // Auto dismiss after 8s
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 8000);
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="fixed top-10 right-4 z-[150] space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-ninja-panel/95 backdrop-blur-md border border-ninja-cyan/40 rounded-lg p-3 shadow-glow flex items-start space-x-3 text-xs"
          >
            {notif.type === "info" && <Info className="w-5 h-5 text-ninja-cyan shrink-0 mt-0.5" />}
            {notif.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {notif.type === "warning" && <ShieldAlert className="w-5 h-5 text-ninja-amber shrink-0 mt-0.5" />}
            {notif.type === "security" && <Bell className="w-5 h-5 text-ninja-green shrink-0 mt-0.5" />}

            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-slate-200">{notif.title}</span>
                <span className="text-[10px] text-slate-500 font-mono">{notif.time}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{notif.message}</p>
            </div>

            <button
              onClick={() => dismissNotification(notif.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
