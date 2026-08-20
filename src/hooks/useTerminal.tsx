"use client";

import React, { useState, useCallback } from "react";
import { TerminalOutput, TerminalHistoryItem } from "@/types/terminal";
import { getFSNodeByPath } from "@/data/filesystem";
import { COMMAND_DOCS } from "@/data/terminalCommands";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificationsData } from "@/data/certifications";
import { contactData } from "@/data/contact";
import { securitySystemStatus } from "@/data/securityData";
import { AppId } from "@/types/os";

export function useTerminal(openWindow?: (id: AppId) => void, closeWindow?: (id: AppId) => void) {
  const [cwd, setCwd] = useState<string>("/home/benher");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<TerminalOutput[]>([
    {
      id: "init-banner",
      type: "banner",
      content: `Welcome to NinjaOS 1.0 LTS (Linux 6.8.0-ninja x86_64)
Type 'help' for a list of available commands or 'neofetch' for system info.`,
    },
  ]);

  const executeCommand = useCallback(
    (inputRaw: string) => {
      const trimmed = inputRaw.trim();
      if (!trimmed) return;

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(" ").filter(Boolean);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let newOutput: TerminalOutput[] = [];

      switch (cmd) {
        case "clear":
          setOutputs([]);
          return;

        case "help":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "table",
              content: (
                <div className="space-y-1 my-1">
                  <div className="text-ninja-cyan font-bold mb-2">NinjaOS Available Shell Commands:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {COMMAND_DOCS.map((doc) => (
                      <div key={doc.name} className="flex space-x-2">
                        <span className="text-ninja-green font-mono w-28 shrink-0">{doc.name}</span>
                        <span className="text-slate-400">{doc.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ];
          break;

        case "whoami":
          newOutput = [{ id: Math.random().toString(), type: "text", content: profileData.handle }];
          break;

        case "pwd":
          newOutput = [{ id: Math.random().toString(), type: "text", content: cwd }];
          break;

        case "date":
          newOutput = [{ id: Math.random().toString(), type: "text", content: new Date().toString() }];
          break;

        case "uname":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "text",
              content: args.includes("-a")
                ? "Linux NinjaOS 6.8.0-ninja #1 SMP PREEMPT_DYNAMIC Wed Aug 19 2026 x86_64 GNU/Linux"
                : "Linux",
            },
          ];
          break;

        case "ls": {
          const targetPath = args[0] ? (args[0].startsWith("/") ? args[0] : `${cwd}/${args[0]}`.replace("//", "/")) : cwd;
          const node = getFSNodeByPath(targetPath);

          if (!node) {
            newOutput = [{ id: Math.random().toString(), type: "error", content: `ls: cannot access '${args[0]}': No such file or directory` }];
          } else if (node.type === "file") {
            newOutput = [{ id: Math.random().toString(), type: "text", content: node.name }];
          } else if (node.children) {
            const listStr = node.children
              .map((c) => (c.type === "directory" ? `${c.name}/` : c.name))
              .join("   ");
            newOutput = [{ id: Math.random().toString(), type: "success", content: listStr || "(empty directory)" }];
          }
          break;
        }

        case "cd": {
          if (!args[0] || args[0] === "~") {
            setCwd("/home/benher");
            break;
          }

          let newPath = args[0];
          if (newPath === "..") {
            const partsPath = cwd.split("/").filter(Boolean);
            partsPath.pop();
            newPath = "/" + partsPath.join("/");
          } else if (!newPath.startsWith("/")) {
            newPath = `${cwd === "/" ? "" : cwd}/${newPath}`;
          }

          const targetNode = getFSNodeByPath(newPath);
          if (!targetNode) {
            newOutput = [{ id: Math.random().toString(), type: "error", content: `bash: cd: ${args[0]}: No such file or directory` }];
          } else if (targetNode.type !== "directory") {
            newOutput = [{ id: Math.random().toString(), type: "error", content: `bash: cd: ${args[0]}: Not a directory` }];
          } else {
            setCwd(targetNode.path);
          }
          break;
        }

        case "cat": {
          if (!args[0]) {
            newOutput = [{ id: Math.random().toString(), type: "warning", content: "Usage: cat <filename>" }];
            break;
          }
          const filePath = args[0].startsWith("/") ? args[0] : `${cwd === "/" ? "" : cwd}/${args[0]}`;
          const fileNode = getFSNodeByPath(filePath);

          if (!fileNode) {
            newOutput = [{ id: Math.random().toString(), type: "error", content: `cat: ${args[0]}: No such file or directory` }];
          } else if (fileNode.type === "directory") {
            newOutput = [{ id: Math.random().toString(), type: "error", content: `cat: ${args[0]}: Is a directory` }];
          } else {
            newOutput = [{ id: Math.random().toString(), type: "text", content: fileNode.content || "(empty file)" }];
          }
          break;
        }

        case "neofetch":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "banner",
              content: (
                <div className="flex flex-col sm:flex-row gap-4 my-2 text-xs font-mono">
                  <div className="text-ninja-cyan select-none leading-tight font-bold shrink-0">
                    <pre>{`       _   _ _       _    ___  ____  
      | \\ | (_)_ __ (_)  / _ \\/ ___| 
      |  \\| | | '_ \\| | | | | \\___ \\ 
      | |\\  | | | | | | | |_| |___) |
      |_| \\_|_|_| |_|_|  \\___/|____/ `}</pre>
                  </div>
                  <div className="space-y-1 text-slate-200">
                    <div className="font-bold text-ninja-green">benher@NinjaOS</div>
                    <div className="text-slate-500">------------------</div>
                    <div><span className="text-ninja-cyan font-bold">OS:</span> NinjaOS 1.0 LTS x86_64</div>
                    <div><span className="text-ninja-cyan font-bold">Kernel:</span> 6.8.0-ninja</div>
                    <div><span className="text-ninja-cyan font-bold">Shell:</span> bash 5.2.21</div>
                    <div><span className="text-ninja-cyan font-bold">DE:</span> Ninja Desktop Environment</div>
                    <div><span className="text-ninja-cyan font-bold">Terminal:</span> Ninja Terminal</div>
                    <div><span className="text-ninja-cyan font-bold">Education:</span> MCA (Master of Computer Applications)</div>
                    <div><span className="text-ninja-cyan font-bold">Focus:</span> Linux / Cybersecurity</div>
                    <div><span className="text-ninja-cyan font-bold">Location:</span> {profileData.location}</div>
                    <div><span className="text-ninja-cyan font-bold">Status:</span> {profileData.status}</div>
                  </div>
                </div>
              ),
            },
          ];
          break;

        case "about":
          if (openWindow) openWindow("about");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `[Opening About Window...]\n\nName: ${profileData.name}\nDegree: ${profileData.education.degree} (${profileData.education.completionYear})\nFocus: ${profileData.primaryFocus.join(", ")}\nBio: ${profileData.bio}`,
            },
          ];
          break;

        case "projects":
          if (openWindow) openWindow("projects");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `[Opening Projects Window...]\n\nFeatured Projects:\n${projectsData.map((p) => `- ${p.title} (${p.technologies.slice(0, 4).join(", ")})`).join("\n")}`,
            },
          ];
          break;

        case "skills":
          if (openWindow) openWindow("skills");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `[Opening Skills Window...]\n\nTechnical Domains:\n${skillsData.map((s) => `- ${s.category}: ${s.skills.map((sk) => sk.name).slice(0, 3).join(", ")}...`).join("\n")}`,
            },
          ];
          break;

        case "security":
        case "security-status":
        case "firewall-status":
          if (openWindow) openWindow("security");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "success",
              content: `NinjaOS Security Status\n-----------------------\n${securitySystemStatus.map((s) => `${s.service.padEnd(24)}: ${s.status}`).join("\n")}`,
            },
          ];
          break;

        case "scan":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `Starting Nmap 7.94 simulation at ${new Date().toLocaleTimeString()}\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00012s latency).\nNot shown: 997 closed tcp ports\nPORT    STATE SERVICE\n22/tcp  open  ssh (OpenSSH 9.6)\n80/tcp  open  http (NinjaOS Web Gateway)\n443/tcp open  https (TLS 1.3 Encryption)\n\nNmap done: 1 IP address (1 host up) scanned in 0.42 seconds.`,
            },
          ];
          break;

        case "network-status":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `veth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255\n        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>\n        rx bytes: 48.2 MB  tx bytes: 12.4 MB`,
            },
          ];
          break;

        case "certifications":
          if (openWindow) openWindow("certifications");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `Certifications & Credentials:\n${certificationsData.map((c) => `- ${c.name} (${c.issuer}, ${c.year})`).join("\n")}`,
            },
          ];
          break;

        case "contact":
          if (openWindow) openWindow("contact");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `Email: ${contactData.email}\nGitHub: ${contactData.github}\nLinkedIn: ${contactData.linkedin}\nLocation: ${contactData.location}`,
            },
          ];
          break;

        case "resume":
          if (openWindow) openWindow("resume");
          newOutput = [
            {
              id: Math.random().toString(),
              type: "info",
              content: `[Opening Resume Window...]\nResume document target: /resume.pdf`,
            },
          ];
          break;

        case "history":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "text",
              content: commandHistory.map((h, i) => `  ${i + 1}  ${h}`).join("\n"),
            },
          ];
          break;

        case "top":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "text",
              content: `top - 17:00:00 up 2:45,  1 user,  load average: 0.28, 0.15, 0.10\nTasks: 142 total,   1 running, 141 sleeping,   0 stopped,   0 zombie\n%Cpu(s): 28.4 us,  2.1 sy,  0.0 ni, 69.5 id,  0.0 wa,  0.0 hi,  0.0 si\nMiB Mem :   8192.0 total,   3892.4 free,   3240.1 used,   1059.5 buff/cache\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 1204 benher    20   0 1204500 142050  45210 S  18.4   1.7   0:42.15 benher-desktop\n 1412 benher    20   0  450120  68200  28100 S   8.2   0.8   0:15.82 terminal\n  412 root      20   0  185400  12400   9100 S   1.0   0.2   0:02.10 ufw-daemon`,
            },
          ];
          break;

        case "exit":
          if (closeWindow) closeWindow("terminal");
          break;

        case "sudo": {
          if (args[0] === "coffee") {
            newOutput = [
              {
                id: Math.random().toString(),
                type: "success",
                content: `Coffee service started ☕\nFreshly brewed espresso delivered to developer environment.`,
              },
            ];
          } else {
            newOutput = [
              {
                id: Math.random().toString(),
                type: "warning",
                content: `[sudo] permission granted to benher. Try 'sudo coffee'.`,
              },
            ];
          }
          break;
        }

        case "hack":
          newOutput = [
            {
              id: Math.random().toString(),
              type: "error",
              content: `Permission denied.\n\nNice try! 😄 All cybersecurity exercises are ethically conducted in isolated lab environments.`,
            },
          ];
          break;

        default:
          newOutput = [
            {
              id: Math.random().toString(),
              type: "error",
              content: `bash: ${cmd}: command not found\nType 'help' to view available commands.`,
            },
          ];
          break;
      }

      setOutputs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "text",
          content: `benher@NinjaOS:${cwd}$ ${trimmed}`,
        },
        ...newOutput,
      ]);
    },
    [cwd, commandHistory, openWindow, closeWindow]
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down"): string => {
      if (commandHistory.length === 0) return "";
      let newIdx = historyIndex;
      if (direction === "up") {
        if (historyIndex === -1) {
          newIdx = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          newIdx = historyIndex - 1;
        }
      } else if (direction === "down") {
        if (historyIndex !== -1) {
          if (historyIndex < commandHistory.length - 1) {
            newIdx = historyIndex + 1;
          } else {
            newIdx = -1;
            setHistoryIndex(-1);
            return "";
          }
        }
      }
      setHistoryIndex(newIdx);
      return newIdx !== -1 ? commandHistory[newIdx] : "";
    },
    [commandHistory, historyIndex]
  );

  const autocomplete = useCallback(
    (currentInput: string): string => {
      if (!currentInput.trim()) return currentInput;
      const commands = COMMAND_DOCS.map((c) => c.name).concat(["sudo coffee", "hack"]);
      const match = commands.find((cmd) => cmd.startsWith(currentInput));
      return match || currentInput;
    },
    []
  );

  return {
    cwd,
    outputs,
    executeCommand,
    navigateHistory,
    autocomplete,
    clearOutputs: () => setOutputs([]),
  };
}
