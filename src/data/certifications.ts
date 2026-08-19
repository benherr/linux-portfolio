import { CertificationData } from "@/types/portfolio";

export const certificationsData: CertificationData[] = [
  {
    id: "gcp-fundamentals",
    name: "Google Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    year: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/example-gcp-cert",
    badgeIcon: "Cloud",
    skillsVerified: ["GCP Compute Engine", "Google Cloud Storage", "VPC Networking", "IAM Security"],
  },
  {
    id: "kaggle-ai-agents",
    name: "Google / Kaggle AI Agents Intensive",
    issuer: "Google & Kaggle",
    year: "2024",
    credentialUrl: "https://www.kaggle.com/learn/certification/example-ai-agents",
    badgeIcon: "Cpu",
    skillsVerified: ["LLM Agents", "Tool Calling", "Autonomous Workflows", "Prompt Engineering"],
  },
  {
    id: "cybersecurity-foundations",
    name: "Cybersecurity Foundations & Defense",
    issuer: "Coursera / Security Academy",
    year: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/example-security-cert",
    badgeIcon: "ShieldCheck",
    skillsVerified: ["Threat Analysis", "Network Hardening", "CIA Triad", "Security Operations"],
  },
  {
    id: "linux-essentials",
    name: "Linux Administration & Command Line Essentials",
    issuer: "Linux Learning Academy",
    year: "2024",
    credentialUrl: "https://example.com/credentials/linux-essentials",
    badgeIcon: "Terminal",
    skillsVerified: ["Bash Shell", "File Hierarchy Standard", "User Permissions", "Systemctl"],
  },
];
