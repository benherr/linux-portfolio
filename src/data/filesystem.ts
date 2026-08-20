import { FSNode } from "@/types/portfolio";

export const virtualFileSystem: FSNode = {
  name: "/",
  type: "directory",
  path: "/",
  children: [
    {
      name: "etc",
      type: "directory",
      path: "/etc",
      children: [
        {
          name: "os-release",
          type: "file",
          path: "/etc/os-release",
          size: "184 B",
          updatedAt: "2026-08-19",
          content: `NAME="NinjaOS"
VERSION="1.0-LTS"
ID=ninjaos
ID_LIKE=debian
PRETTY_NAME="NinjaOS 1.0 (Linux-powered Portfolio)"
HOME_URL="https://ninjaos.portfolio"
BUG_REPORT_URL="https://github.com/benherr/linux-portfolio"`,
        },
        {
          name: "motd",
          type: "file",
          path: "/etc/motd",
          size: "240 B",
          updatedAt: "2026-08-19",
          content: `Welcome to NinjaOS 1.0 LTS (Linux 6.8.0-ninja x86_64)

 * Website: https://ninjaos.portfolio
 * Career Focus: Linux Administration & Cybersecurity
 * Portfolio Status: Ready for inspection

Type 'help' in terminal to explore available commands.`,
        },
      ],
    },
    {
      name: "var",
      type: "directory",
      path: "/var",
      children: [
        {
          name: "log",
          type: "directory",
          path: "/var/log",
          children: [
            {
              name: "syslog",
              type: "file",
              path: "/var/log/syslog",
              size: "1.2 KB",
              updatedAt: "2026-08-19",
              content: `[0.000000] Linux version 6.8.0-ninja (ninja@NinjaOS)
[0.012431] CPU0: MCA Graduate 2025 Architecture
[0.104212] Memory: 8192MB Virtual RAM mounted
[0.412015] systemd[1]: Starting Portfolio Environment Services...
[0.851022] ufw[412]: Firewall ACTIVE - Default deny incoming
[1.204512] sshd[514]: Server listening on port 22 (Public Key Auth Enabled)
[2.041251] systemd[1]: Reached target Graphical Interface Desktop ready.`,
            },
          ],
        },
      ],
    },
    {
      name: "usr",
      type: "directory",
      path: "/usr",
      children: [
        {
          name: "bin",
          type: "directory",
          path: "/usr/bin",
          children: [
            { name: "neofetch", type: "file", path: "/usr/bin/neofetch", size: "45 KB", content: "Executable binary: NinjaOS Neofetch System Information" },
            { name: "security-status", type: "file", path: "/usr/bin/security-status", size: "32 KB", content: "Executable binary: NinjaOS Security Inspector" },
          ],
        },
      ],
    },
    {
      name: "home",
      type: "directory",
      path: "/home",
      children: [
        {
          name: "ninja",
          type: "directory",
          path: "/home/ninja",
          children: [
            {
              name: "about",
              type: "directory",
              path: "/home/ninja/about",
              children: [
                {
                  name: "bio.txt",
                  type: "file",
                  path: "/home/ninja/about/bio.txt",
                  size: "420 B",
                  updatedAt: "2026-08-19",
                  content: `Hello, I'm Ninja.

MCA Graduate (2025) and aspiring Linux & Cybersecurity professional
with a background in software development and full-stack engineering.

Interested in:
- Linux System Administration
- Cybersecurity & Defense
- Networking & Cloud Infrastructure
- Automation & Bash Scripting
- DevOps & Docker Containers`,
                },
                {
                  name: "education.txt",
                  type: "file",
                  path: "/home/ninja/about/education.txt",
                  size: "210 B",
                  updatedAt: "2026-08-19",
                  content: `Degree: Master of Computer Applications (MCA)
Year: 2025
Field: Computer Science & Software Engineering
Location: India

Foundational Focus: Data Structures, Operating Systems, Computer Networks, Database Systems, Software Engineering.`,
                },
              ],
            },
            {
              name: "projects",
              type: "directory",
              path: "/home/ninja/projects",
              children: [
                {
                  name: "README.md",
                  type: "file",
                  path: "/home/ninja/projects/README.md",
                  size: "350 B",
                  updatedAt: "2026-08-19",
                  content: `# Ninja's Projects Directory

Here you'll find key development and cybersecurity projects:
1. decentralized-voting/ - Blockchain voting platform built with Solidity, Next.js, Hardhat & IPFS
2. ai-agent/ - Autonomous LLM agent runner
3. web-project/ - NinjaOS portfolio web app
4. cyber-lab/ - SOC dashboard & firewall monitoring lab`,
                },
                {
                  name: "decentralized-voting.txt",
                  type: "file",
                  path: "/home/ninja/projects/decentralized-voting.txt",
                  size: "520 B",
                  updatedAt: "2026-08-19",
                  content: `Project: Decentralized Voting DApp
Tech: Next.js, React, Solidity, Hardhat, Ethereum, Ethers.js, IPFS, Pinata

Description:
A decentralized voting application designed to manage voter and candidate registration, approvals, voting periods, and result publication using smart contract verification and IPFS storage.`,
                },
                {
                  name: "ai-agent.txt",
                  type: "file",
                  path: "/home/ninja/projects/ai-agent.txt",
                  size: "310 B",
                  updatedAt: "2026-08-19",
                  content: `Project: Autonomous Task AI Agent
Tech: Python, Google Gemini API, Node.js, TypeScript, LangChain

Description:
An intelligent agent workflow runner capable of code inspection and structured diagnostic execution.`,
                },
              ],
            },
            {
              name: "skills",
              type: "directory",
              path: "/home/ninja/skills",
              children: [
                {
                  name: "linux-skills.txt",
                  type: "file",
                  path: "/home/ninja/skills/linux-skills.txt",
                  size: "380 B",
                  updatedAt: "2026-08-19",
                  content: `[Linux & Shell Skills]
- Linux Fundamentals (Intermediate)
- Bash Scripting & Automation (Intermediate)
- File Permissions, ACLs & SUID (Intermediate)
- Process & Systemctl Control (Intermediate)
- System Administration & User Mgmt (Familiar)
- Networking utilities (ip, ss, netstat, ufw) (Familiar)`,
                },
                {
                  name: "security-skills.txt",
                  type: "file",
                  path: "/home/ninja/skills/security-skills.txt",
                  size: "310 B",
                  updatedAt: "2026-08-19",
                  content: `[Cybersecurity Skills]
- Security Fundamentals & CIA Triad (Intermediate)
- Network Security & Firewall Rules (Familiar)
- Web Security & OWASP Top 10 (Familiar)
- Cryptography & Key Management (Familiar)
- Security Hardening (Learning)`,
                },
              ],
            },
            {
              name: "cybersecurity",
              type: "directory",
              path: "/home/ninja/cybersecurity",
              children: [
                {
                  name: "security-status.txt",
                  type: "file",
                  path: "/home/ninja/cybersecurity/security-status.txt",
                  size: "290 B",
                  updatedAt: "2026-08-19",
                  content: `SYSTEM SECURITY STATUS
----------------------
Firewall:       ACTIVE (ufw)
SSH:            CONFIGURED (Keys only)
Network:        SECURE & MONITORED
Updates:        CURRENT
Authentication: ENABLED`,
                },
              ],
            },
            {
              name: "certifications",
              type: "directory",
              path: "/home/ninja/certifications",
              children: [
                {
                  name: "certifications.txt",
                  type: "file",
                  path: "/home/ninja/certifications/certifications.txt",
                  size: "410 B",
                  updatedAt: "2026-08-19",
                  content: `Certifications & Credentials:
1. Google Cloud Computing Fundamentals (Google Cloud, 2024)
2. Google / Kaggle AI Agents Intensive (Google & Kaggle, 2024)
3. Cybersecurity Foundations (Security Academy, 2024)
4. Linux Command Line Essentials (Linux Learning, 2024)`,
                },
              ],
            },
            {
              name: "resume",
              type: "directory",
              path: "/home/ninja/resume",
              children: [
                {
                  name: "resume-info.txt",
                  type: "file",
                  path: "/home/ninja/resume/resume-info.txt",
                  size: "280 B",
                  updatedAt: "2026-08-19",
                  content: `Resume metadata:
Candidate: Ninja (MCA 2025)
Focus: Linux & Cybersecurity / Full-Stack Development
Resume document available at: /resume.pdf (Click 'Download Resume' in Resume app).`,
                },
              ],
            },
            {
              name: "contact",
              type: "directory",
              path: "/home/ninja/contact",
              children: [
                {
                  name: "contact-info.txt",
                  type: "file",
                  path: "/home/ninja/contact/contact-info.txt",
                  size: "240 B",
                  updatedAt: "2026-08-19",
                  content: `Email: benherben456@gmail.com
GitHub: https://github.com/benherr
LinkedIn: https://www.linkedin.com/in/benher-basheer
Location: India (Open to Remote / On-site)`,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Filesystem helper utilities
export function getFSNodeByPath(pathStr: string): FSNode | null {
  const cleanPath = pathStr === "/" ? "/" : pathStr.replace(/\/$/, "");
  if (cleanPath === "/") return virtualFileSystem;

  const parts = cleanPath.split("/").filter(Boolean);
  let current: FSNode = virtualFileSystem;

  for (const part of parts) {
    if (!current.children) return null;
    const found = current.children.find((c) => c.name === part);
    if (!found) return null;
    current = found;
  }

  return current;
}
