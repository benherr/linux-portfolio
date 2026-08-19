"use client";

import { useState, useEffect } from "react";

export interface SystemStats {
  cpuUsage: number;
  memoryUsed: number;
  memoryTotal: number;
  diskUsed: number;
  diskTotal: number;
  networkDown: number;
  networkUp: number;
  processCount: number;
  uptimeSeconds: number;
}

export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 28,
    memoryUsed: 3.8,
    memoryTotal: 8.0,
    diskUsed: 124,
    diskTotal: 512,
    networkDown: 1.8,
    networkUp: 0.4,
    processCount: 142,
    uptimeSeconds: 342,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const cpuVariation = (Math.random() - 0.5) * 8;
        const newCpu = Math.min(Math.max(Math.round(prev.cpuUsage + cpuVariation), 12), 85);
        const memVariation = (Math.random() - 0.5) * 0.2;
        const newMem = Math.min(Math.max(Number((prev.memoryUsed + memVariation).toFixed(1)), 3.2), 6.5);
        const netDown = Number((1.2 + Math.random() * 2.5).toFixed(1));
        const netUp = Number((0.2 + Math.random() * 0.8).toFixed(1));

        return {
          ...prev,
          cpuUsage: newCpu,
          memoryUsed: newMem,
          networkDown: netDown,
          networkUp: netUp,
          uptimeSeconds: prev.uptimeSeconds + 2,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
