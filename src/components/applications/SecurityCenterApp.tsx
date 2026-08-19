"use client";

import React, { useState } from "react";
import { securitySystemStatus, securityLearningProgress, securityTools } from "@/data/securityData";
import { ShieldCheck, ShieldAlert, Lock, Terminal, Activity, Server, Radio, Play, CheckCircle } from "lucide-react";

export const SecurityCenterApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "progress" | "tools" | "lab">("overview");
  const [simulatedScanOutput, setSimulatedScanOutput] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const runSimulatedScan = () => {
    setIsScanning(true);
    setSimulatedScanOutput("Initiating NinjaOS system security verification audit...");
    setTimeout(() => {
      setSimulatedScanOutput(
        `Audit Complete [OK]:\n- Host Firewall (ufw): ACTIVE (0 unauthorized attempts)\n- OpenSSH Daemon: SECURE (Pubkey Auth enforced)\n- System Kernel: Up to date (v6.8.0-ninja)\n- Cryptographic Integrity: 100% Verified`
      );
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 shadow-glow-green">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h1 className="text-base sm:text-lg font-bold text-emerald-400 font-mono tracking-wide">
              NinjaOS Security Operations Center
            </h1>
            <p className="text-xs text-slate-300">Active Threat Defense & System Hardening Dashboard</p>
          </div>
        </div>
        <button
          onClick={runSimulatedScan}
          disabled={isScanning}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-ninja-dark font-bold font-mono text-xs px-3.5 py-2 rounded shadow transition cursor-pointer disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "Auditing System..." : "Run Security Audit"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ninja-border/80 pb-2 font-mono text-xs">
        {[
          { id: "overview", label: "System Security" },
          { id: "progress", label: "Learning Progress" },
          { id: "tools", label: "Security Tools & Labs" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-emerald-500 text-ninja-dark font-bold shadow-glow-green"
                : "bg-ninja-panel text-slate-400 hover:text-white border border-ninja-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: System Security Status */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {securitySystemStatus.map((status, idx) => (
              <div
                key={idx}
                className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-3 space-y-1.5"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">{status.service}</span>
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    {status.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{status.detail}</p>
              </div>
            ))}
          </div>

          {/* Audit Scan Output Box */}
          {simulatedScanOutput && (
            <div className="bg-ninja-dark border border-emerald-500/40 rounded-lg p-3 font-mono text-xs space-y-1 text-emerald-300">
              <div className="flex items-center space-x-2 text-slate-400 font-bold border-b border-ninja-border/60 pb-1">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Audit Console Output:</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{simulatedScanOutput}</pre>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Learning Progress */}
      {activeTab === "progress" && (
        <div className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center space-x-2">
            <Activity className="w-4 h-4 text-ninja-cyan" />
            <span>Domain Skill & Hardening Progress</span>
          </h2>

          <div className="space-y-3">
            {securityLearningProgress.map((prog, idx) => (
              <div key={idx} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>{prog.label}</span>
                  <span className="font-bold text-ninja-cyan">{prog.percentage}%</span>
                </div>
                <div className="h-2.5 bg-ninja-dark rounded-full overflow-hidden border border-ninja-border/80">
                  <div
                    className={`h-full bg-gradient-to-r ${prog.color} transition-all duration-500`}
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Security Tools */}
      {activeTab === "tools" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityTools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-ninja-panel/80 border border-ninja-border rounded-lg p-3.5 space-y-2 hover:border-ninja-cyan/50 transition"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm font-mono">{tool.name}</span>
                <span className="text-[10px] font-mono text-ninja-cyan bg-ninja-surface px-2 py-0.5 rounded border border-ninja-border">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">{tool.usage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
