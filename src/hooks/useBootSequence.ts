"use client";

import { useState, useEffect } from "react";

export type BootStage = "booting" | "login" | "complete";

export interface BootLog {
  id: string;
  text: string;
  status?: "OK" | "INFO" | "WARN";
  time: string;
}

export const KERNEL_BOOT_LOGS: Omit<BootLog, "id" | "time">[] = [
  { text: "CPU initialization complete: 16 Cores @ 4.2GHz", status: "OK" },
  { text: "Memory check passed: 32GB RAM verified", status: "OK" },
  { text: "Loading NinjaOS Linux kernel v6.12.8-ninja-security", status: "OK" },
  { text: "Mounting virtual filesystem /dev/nvme0n1p2 on /", status: "OK" },
  { text: "Initializing security modules & firewall rules", status: "OK" },
  { text: "Loading user profile: BENHER", status: "OK" },
  { text: "Starting NinjaOS desktop environment service", status: "OK" },
  { text: "NinjaOS Ready.", status: "OK" },
];

export function useBootSequence() {
  const [bootStage, setBootStage] = useState<BootStage>("booting");
  const [logs, setLogs] = useState<BootLog[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let logIndex = 0;
    const totalLogs = KERNEL_BOOT_LOGS.length;

    const interval = setInterval(() => {
      if (logIndex < totalLogs) {
        const item = KERNEL_BOOT_LOGS[logIndex];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`;

        setLogs((prev) => [
          ...prev,
          {
            id: `${logIndex}-${Date.now()}`,
            text: item.text,
            status: item.status,
            time: timeStr,
          },
        ]);

        logIndex++;
        setProgress(Math.round((logIndex / totalLogs) * 100));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBootStage("login");
        }, 300);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const completeBoot = () => {
    setBootStage("complete");
  };

  const skipBoot = () => {
    setBootStage("complete");
  };

  return {
    bootStage,
    logs,
    progress,
    completeBoot,
    skipBoot,
  };
}
