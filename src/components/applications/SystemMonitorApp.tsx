"use client";

import React from "react";
import { useSystemStats } from "@/hooks/useSystemStats";
import { Cpu, HardDrive, Wifi, Activity, Server, Zap } from "lucide-react";

export const SystemMonitorApp: React.FC = () => {
  const stats = useSystemStats();

  const memoryPercentage = Math.round((stats.memoryUsed / stats.memoryTotal) * 100);
  const diskPercentage = Math.round((stats.diskUsed / stats.diskTotal) * 100);

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-mono text-xs sm:text-sm">
      {/* Title Bar Header */}
      <div className="flex items-center justify-between border-b border-ninja-border/80 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-ninja-cyan animate-pulse" />
          <span className="font-bold text-slate-100 text-sm">NinjaOS Resource Monitor</span>
        </div>
        <div className="text-slate-400 text-xs">
          Processes: <span className="text-ninja-cyan font-bold">{stats.processCount}</span>
        </div>
      </div>

      {/* Main Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CPU Card */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-ninja-cyan" />
              <span className="font-bold text-slate-200">CPU Usage</span>
            </div>
            <span className="text-ninja-cyan font-bold">{stats.cpuUsage}%</span>
          </div>

          <div className="h-3 bg-ninja-dark rounded-full overflow-hidden border border-ninja-border/80">
            <div
              className={`h-full transition-all duration-500 ${
                stats.cpuUsage > 75
                  ? "bg-rose-500"
                  : stats.cpuUsage > 50
                  ? "bg-amber-500"
                  : "bg-ninja-cyan"
              }`}
              style={{ width: `${stats.cpuUsage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Architecture: MCA 2025 x86_64 Virtual Cores</div>
        </div>

        {/* Memory Card */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-ninja-green" />
              <span className="font-bold text-slate-200">RAM Memory</span>
            </div>
            <span className="text-ninja-green font-bold">
              {stats.memoryUsed} GB / {stats.memoryTotal} GB ({memoryPercentage}%)
            </span>
          </div>

          <div className="h-3 bg-ninja-dark rounded-full overflow-hidden border border-ninja-border/80">
            <div
              className="h-full bg-ninja-green transition-all duration-500"
              style={{ width: `${memoryPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Memory Swap: 0 MB / 2048 MB</div>
        </div>

        {/* Disk Storage Card */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-ninja-amber" />
              <span className="font-bold text-slate-200">Storage (/home/ninja)</span>
            </div>
            <span className="text-ninja-amber font-bold">
              {stats.diskUsed} GB / {stats.diskTotal} GB ({diskPercentage}%)
            </span>
          </div>

          <div className="h-3 bg-ninja-dark rounded-full overflow-hidden border border-ninja-border/80">
            <div
              className="h-full bg-ninja-amber transition-all duration-500"
              style={{ width: `${diskPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Virtual Filesystem: ext4 (Mounted)</div>
        </div>

        {/* Network Telemetry Card */}
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-slate-200">Network Telemetry</span>
            </div>
            <span className="text-purple-400 font-bold">veth0</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-ninja-dark p-2 rounded border border-ninja-border">
              <div className="text-slate-400 text-[10px]">Download</div>
              <div className="text-ninja-cyan font-bold">↓ {stats.networkDown} MB/s</div>
            </div>
            <div className="bg-ninja-dark p-2 rounded border border-ninja-border">
              <div className="text-slate-400 text-[10px]">Upload</div>
              <div className="text-emerald-400 font-bold">↑ {stats.networkUp} MB/s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Process Table */}
      <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-300 font-mono">Active NinjaOS Processes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-ninja-border/80 text-slate-400 text-[11px]">
                <th className="py-1">PID</th>
                <th className="py-1">USER</th>
                <th className="py-1">PROCESS</th>
                <th className="py-1">%CPU</th>
                <th className="py-1">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ninja-border/40 text-slate-300">
              <tr>
                <td className="py-1.5 text-ninja-cyan">1204</td>
                <td>ninja</td>
                <td>ninja-desktop-de</td>
                <td>{stats.cpuUsage}%</td>
                <td className="text-emerald-400 font-bold">Running</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ninja-cyan">1412</td>
                <td>ninja</td>
                <td>ninja-terminal-shell</td>
                <td>8.2%</td>
                <td className="text-emerald-400 font-bold">Running</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ninja-cyan">412</td>
                <td>root</td>
                <td>ufw-firewall-daemon</td>
                <td>1.0%</td>
                <td className="text-emerald-400 font-bold">Sleeping</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ninja-cyan">514</td>
                <td>root</td>
                <td>sshd-service</td>
                <td>0.4%</td>
                <td className="text-emerald-400 font-bold">Listening</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
