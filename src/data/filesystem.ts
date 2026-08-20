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
          updatedAt: "2026-08-20",
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
          updatedAt: "2026-08-20",
          content: `Welcome to NinjaOS 1.0 LTS (Linux 6.8.0-ninja x86_64)

 * User: Benher Basheer
 * College: College of Engineering Vadakara
 * Career Focus: Full-Stack Engineering, Linux Administration & Cybersecurity
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
              updatedAt: "2026-08-20",
              content: `[0.000000] Linux version 6.8.0-ninja (benher@NinjaOS)
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
          name: "benher",
          type: "directory",
          path: "/home/benher",
          children: [
            {
              name: "about",
              type: "directory",
              path: "/home/benher/about",
              children: [
                {
                  name: "bio.txt",
                  type: "file",
                  path: "/home/benher/about/bio.txt",
                  size: "420 B",
                  updatedAt: "2026-08-20",
                  content: `Hello, I'm Benher Basheer.

MCA Graduate (2025) from College of Engineering Vadakara with a strong
foundation in full-stack engineering, web applications, and Linux systems.

Primary Focus:
- Full-Stack Engineering (React, Next.js, Node.js, MongoDB)
- Linux System Administration & Shell Scripting
- Network Security & Cybersecurity
- Decentralized Applications & Smart Contracts`,
                },
                {
                  name: "education.txt",
                  type: "file",
                  path: "/home/benher/about/education.txt",
                  size: "240 B",
                  updatedAt: "2026-08-20",
                  content: `Degree: Master of Computer Applications (MCA)
Year: 2025
Institution: College of Engineering Vadakara
Location: Kozhikode / Wayanad, Kerala, India

Core Subjects: Data Structures, Operating Systems, Computer Networks, Database Systems, Web Engineering.`,
                },
              ],
            },
            {
              name: "projects",
              type: "directory",
              path: "/home/benher/projects",
              children: [
                {
                  name: "README.md",
                  type: "file",
                  path: "/home/benher/projects/README.md",
                  size: "350 B",
                  updatedAt: "2026-08-20",
                  content: `# Benher's Projects Directory

Featured Projects:
1. CampusCare - Campus infrastructure issue reporting platform (MongoDB, Express, React, Node.js)
2. Decentralized-Voting-DApp - Smart contract voting protocol (Next.js, Solidity, Ethereum)
3. CareNavigator - Multi-agent coordinator for benefit applications (Python, Gemini API, ADK)
4. Linux-Portfolio - NinjaOS interactive Linux web environment`,
                },
                {
                  name: "CampusCare.txt",
                  type: "file",
                  path: "/home/benher/projects/CampusCare.txt",
                  size: "480 B",
                  updatedAt: "2026-08-20",
                  content: `Project: CampusCare
Tech: MongoDB, Express.js, React.js, Node.js, Tailwind CSS

Description:
A web platform for students to report infrastructure issues within college campus and for administrators to track and resolve complaints efficiently.`,
                },
                {
                  name: "decentralized-voting.txt",
                  type: "file",
                  path: "/home/benher/projects/decentralized-voting.txt",
                  size: "520 B",
                  updatedAt: "2026-08-20",
                  content: `Project: Decentralized Voting DApp
Tech: Next.js, React, Solidity, Hardhat, Ethereum, IPFS

Description:
A decentralized voting application designed to manage voter and candidate registration, approvals, voting periods, and result publication using smart contract verification.`,
                },
                {
                  name: "care-navigator.txt",
                  type: "file",
                  path: "/home/benher/projects/care-navigator.txt",
                  size: "340 B",
                  updatedAt: "2026-08-20",
                  content: `Project: CareNavigator AI Agent
Tech: Python, Google Gemini API, ADK Graph Workflow, MCP

Description:
An intelligent multi-agent coordinator built on Google ADK 2.0 to simplify social benefit applications.`,
                },
                {
                  name: "linux-portfolio.txt",
                  type: "file",
                  path: "/home/benher/projects/linux-portfolio.txt",
                  size: "360 B",
                  updatedAt: "2026-08-20",
                  content: `Project: NinjaOS Linux Portfolio
Tech: Next.js 15, React 19, Tailwind CSS, TypeScript

Description:
Interactive Linux OS web portfolio featuring desktop environment, terminal shell, music player, and cybersecurity dashboard.`,
                },
              ],
            },
            {
              name: "skills",
              type: "directory",
              path: "/home/benher/skills",
              children: [
                {
                  name: "web-skills.txt",
                  type: "file",
                  path: "/home/benher/skills/web-skills.txt",
                  size: "380 B",
                  updatedAt: "2026-08-20",
                  content: `[Full-Stack & Web Development]
- React & Next.js (Intermediate)
- TypeScript & JavaScript (Intermediate)
- Node.js & Express (Intermediate)
- MongoDB & SQL Databases (Intermediate)
- Tailwind CSS & HTML5/CSS3 (Intermediate)`,
                },
                {
                  name: "linux-skills.txt",
                  type: "file",
                  path: "/home/benher/skills/linux-skills.txt",
                  size: "380 B",
                  updatedAt: "2026-08-20",
                  content: `[Linux & Shell Skills]
- Linux Fundamentals (Intermediate)
- Bash Shell & CLI (Intermediate)
- User Permissions & ACLs (Intermediate)
- Systemctl & Service Control (Intermediate)
- System Administration (Familiar)`,
                },
              ],
            },
            {
              name: "certifications",
              type: "directory",
              path: "/home/benher/certifications",
              children: [
                {
                  name: "certifications.txt",
                  type: "file",
                  path: "/home/benher/certifications/certifications.txt",
                  size: "410 B",
                  updatedAt: "2026-08-20",
                  content: `Certifications & Accomplishments:
1. Google Cloud Computing Fundamentals (Google Cloud, 2026)
2. Google / Kaggle AI Agents Intensive (Google & Kaggle, 2026)
3. Linux Fundamentals (LearnQuest / Coursera, 2026)`,
                },
              ],
            },
            {
              name: "resume",
              type: "directory",
              path: "/home/benher/resume",
              children: [
                {
                  name: "resume-info.txt",
                  type: "file",
                  path: "/home/benher/resume/resume-info.txt",
                  size: "280 B",
                  updatedAt: "2026-08-20",
                  content: `Resume metadata:
Candidate: Benher Basheer (MCA 2025)
Institution: College of Engineering Vadakara
Focus: Full-Stack Development & Linux Systems
Resume document available at: /resume.pdf`,
                },
              ],
            },
            {
              name: "contact",
              type: "directory",
              path: "/home/benher/contact",
              children: [
                {
                  name: "contact-info.txt",
                  type: "file",
                  path: "/home/benher/contact/contact-info.txt",
                  size: "240 B",
                  updatedAt: "2026-08-20",
                  content: `Email: benherben456@gmail.com
GitHub: https://github.com/benherr
LinkedIn: https://www.linkedin.com/in/benher-basheer/
Location: Wayanad / Kozhikode, Kerala, India`,
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
