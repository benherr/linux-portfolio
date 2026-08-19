export interface SecuritySystemStatus {
  service: string;
  status: "ACTIVE" | "CONFIGURED" | "SECURE" | "CURRENT" | "ENABLED";
  detail: string;
}

export interface SecurityProgress {
  label: string;
  percentage: number;
  color: string;
}

export const securitySystemStatus: SecuritySystemStatus[] = [
  { service: "Firewall (ufw)", status: "ACTIVE", detail: "Default deny incoming, allow 22, 80, 443" },
  { service: "SSH Configuration", status: "CONFIGURED", detail: "Ed25519 public key auth, root login disabled" },
  { service: "Network Interface", status: "SECURE", detail: "Monitored, isolated virtual subnets" },
  { service: "System Updates", status: "CURRENT", detail: "NinjaOS security patches updated" },
  { service: "Authentication", status: "ENABLED", detail: "Multi-factor & key-based user auth" },
];

export const securityLearningProgress: SecurityProgress[] = [
  { label: "Linux Administration", percentage: 80, color: "from-cyan-500 to-blue-500" },
  { label: "Bash Scripting & Automation", percentage: 70, color: "from-emerald-500 to-teal-500" },
  { label: "Networking & Protocols", percentage: 60, color: "from-blue-500 to-indigo-500" },
  { label: "Cybersecurity Fundamentals", percentage: 60, color: "from-emerald-400 to-green-600" },
  { label: "Cloud Security (GCP)", percentage: 60, color: "from-purple-500 to-violet-500" },
];

export const securityTools = [
  { name: "Nmap", category: "Network Discovery", usage: "Port auditing & network inventory simulation" },
  { name: "Wireshark", category: "Traffic Analysis", usage: "Inspecting packet headers & network flows" },
  { name: "Metasploit", category: "Vulnerability Assessment", usage: "Lab simulation & exploit concepts" },
  { name: "UFW / iptables", category: "Host Firewall", usage: "Packet filtering & port restriction" },
  { name: "OpenSSH", category: "Secure Connectivity", usage: "Remote administration & key management" },
  { name: "Fail2ban", category: "Intrusion Prevention", usage: "Brute-force protection & log monitoring" },
];
