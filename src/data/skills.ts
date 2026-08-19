import { SkillCategory } from "@/types/portfolio";

export const skillsData: SkillCategory[] = [
  {
    category: "Linux & Shell",
    skills: [
      { name: "Linux Fundamentals", level: "Intermediate", description: "Command-line navigation, file hierarchy (FHS), core Unix utilities." },
      { name: "Bash Scripting", level: "Intermediate", description: "Automating administrative tasks, shell scripts, loops, text processing (awk, sed, grep)." },
      { name: "File Permissions & ACLs", level: "Intermediate", description: "chmod, chown, umask, SUID/SGID, sticky bits, and access control lists." },
      { name: "Process & Service Control", level: "Intermediate", description: "systemctl, journalctl, ps, top/htop, process signals, background jobs." },
      { name: "Linux System Administration", level: "Familiar", description: "User management, package managers (apt, dnf), cron jobs, storage mounting." },
      { name: "Linux Networking", level: "Familiar", description: "netstat, ss, ip, ufw/iptables, SSH configuration, DNS & hosts configuration." },
    ],
  },
  {
    category: "Cybersecurity",
    skills: [
      { name: "Cybersecurity Fundamentals", level: "Intermediate", description: "CIA triad, threat modeling, defense-in-depth, security controls." },
      { name: "Network Security", level: "Familiar", description: "OSI model layers, TCP/IP inspection, firewall rules, port scanning concepts." },
      { name: "Web Security Fundamentals", level: "Familiar", description: "OWASP Top 10 awareness (XSS, SQLi, CSRF, auth bypass prevention)." },
      { name: "Authentication & Cryptography", level: "Familiar", description: "Public/Private key pairs, SSH keys, Hashing algorithms, JWTs, Web3 signatures." },
      { name: "Security Awareness & Hardening", level: "Learning", description: "Basic system hardening, SSH configuration, disabling unused services." },
    ],
  },
  {
    category: "Programming",
    skills: [
      { name: "JavaScript (ES6+)", level: "Intermediate", description: "Asynchronous patterns, DOM APIs, modern syntax, closure concepts." },
      { name: "TypeScript", level: "Intermediate", description: "Strict typing, interfaces, generics, type assertion, Next.js integration." },
      { name: "Java", level: "Familiar", description: "OOP concepts, data structures, backend foundational syntax." },
      { name: "Python", level: "Familiar", description: "Automation scripts, file parsing, API integration, data manipulation." },
      { name: "SQL", level: "Familiar", description: "Relational queries, JOINs, aggregation, schema design." },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React", level: "Intermediate", description: "Hooks, component architecture, state management, synthetic events." },
      { name: "Next.js", level: "Intermediate", description: "App Router, Server/Client components, SSR, static generation, API routes." },
      { name: "HTML5 & CSS3", level: "Intermediate", description: "Semantic markup, CSS Grid/Flexbox, responsive design, animations." },
      { name: "Node.js", level: "Familiar", description: "REST APIs, npm packages, async runtime execution." },
      { name: "Tailwind CSS", level: "Intermediate", description: "Custom utility classes, theme configuration, dark mode." },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "Google Cloud (GCP)", level: "Familiar", description: "Compute Engine VMs, Cloud Storage, GCP IAM basics." },
      { name: "Cloud Fundamentals", level: "Familiar", description: "IaaS, PaaS, SaaS models, cloud networking, security groups." },
      { name: "Virtual Machines", level: "Familiar", description: "Hypervisors, KVM/VirtualBox setup, Linux instance deployment." },
      { name: "Cloud Networking", level: "Learning", description: "VPC setup, subnet routing, public/private IPs, load balancers." },
    ],
  },
  {
    category: "Tools & Frameworks",
    skills: [
      { name: "Git & GitHub", level: "Intermediate", description: "Version control workflows, branching strategies, pull requests." },
      { name: "Docker", level: "Familiar", description: "Containerization concepts, Dockerfiles, basic compose setup." },
      { name: "Hardhat & Solidity", level: "Familiar", description: "Smart contract compilation, local EVM deployment, testing." },
      { name: "VS Code", level: "Intermediate", description: "Custom developer environment, terminal integration, security extensions." },
    ],
  },
];
