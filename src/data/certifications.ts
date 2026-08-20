import { CertificationData } from "@/types/portfolio";

export const certificationsData: CertificationData[] = [
  {
    id: "gcp-fundamentals",
    name: "Google Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    year: "2026",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/example-gcp-cert",
    badgeIcon: "Cloud",
    skillsVerified: ["GCP Compute Engine", "Google Cloud Storage", "VPC Networking"],
  },
  {
    id: "kaggle-ai-agents",
    name: "Google / Kaggle AI Agents Intensive",
    issuer: "Google & Kaggle",
    year: "2026",
    credentialUrl: "https://www.kaggle.com/learn/certification/example-ai-agents",
    badgeIcon: "Cpu",
    skillsVerified: ["LLM Agents", "Tool Calling", "Autonomous Workflows", "Prompt Engineering"],
  },
  {
    id: "Linux Fundamentals",
    name: "LearnQuest",
    issuer: "Coursera ",
    year: "2026",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/example-security-cert",
    badgeIcon: "ShieldCheck",
    skillsVerified: ["bash shell", "User Permissions", "CLI"],
  },

];
