export interface CommandDoc {
  name: string;
  description: string;
  usage: string;
}

export const COMMAND_DOCS: CommandDoc[] = [
  { name: "help", description: "Display available shell commands", usage: "help" },
  { name: "clear", description: "Clear terminal buffer (Ctrl+L)", usage: "clear" },
  { name: "whoami", description: "Print active user identity", usage: "whoami" },
  { name: "pwd", description: "Print current working directory", usage: "pwd" },
  { name: "ls", description: "List directory contents", usage: "ls [path]" },
  { name: "cd", description: "Change working directory", usage: "cd <directory>" },
  { name: "cat", description: "Display file content", usage: "cat <filename>" },
  { name: "neofetch", description: "Show NinjaOS system information & ASCII logo", usage: "neofetch" },
  { name: "projects", description: "List portfolio projects & technical stack", usage: "projects" },
  { name: "skills", description: "Show technical skills breakdown", usage: "skills" },
  { name: "about", description: "Display candidate bio & MCA education details", usage: "about" },
  { name: "contact", description: "Show contact email and profile links", usage: "contact" },
  { name: "resume", description: "Preview resume summary & download path", usage: "resume" },
  { name: "security", description: "Open Cybersecurity operations dashboard", usage: "security" },
  { name: "security-status", description: "Inspect NinjaOS firewall & SSH security status", usage: "security-status" },
  { name: "scan", description: "Run simulated local security port scan", usage: "scan" },
  { name: "firewall-status", description: "Check active host firewall (ufw) rules", usage: "firewall-status" },
  { name: "network-status", description: "Display virtual network adapter telemetry", usage: "network-status" },
  { name: "certifications", description: "List verified Cloud & Cybersecurity credentials", usage: "certifications" },
  { name: "history", description: "Show shell command execution history", usage: "history" },
  { name: "date", description: "Display system date and time", usage: "date" },
  { name: "uname", description: "Print kernel system information", usage: "uname [-a]" },
  { name: "top", description: "Show real-time simulated system process monitor", usage: "top" },
  { name: "exit", description: "Close active terminal window", usage: "exit" },
];
