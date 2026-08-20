import { CertificationData } from "@/types/portfolio";

export const certificationsData: CertificationData[] = [
  {
    id: "gcp-fundamentals",
    name: "Google Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    year: "2026",
    credentialUrl: "https://coursera.org/share/1358d886983f5a5a93bec5403abee674",
    badgeIcon: "Cloud",
    skillsVerified: ["GCP Compute Engine", "Google Cloud Storage", "VPC Networking"],
  },
  {
    id: "kaggle-ai-agents",
    name: "Google / Kaggle AI Agents Intensive",
    issuer: "Google & Kaggle",
    year: "2026",
    credentialUrl: "https://www.linkedin.com/posts/benher-basheer_ai-aiagents-googleai-activity-7489278458091646976-T4jm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF0iCUUBGifi-c2CAuSdsIx7yEajQikaUPk",
    badgeIcon: "Cpu",
    skillsVerified: ["LLM Agents", "Tool Calling", "Autonomous Workflows", "Prompt Engineering"],
  },
  {
    id: "Linux Fundamentals",
    name: "Linux Fundamentals",
    issuer: "Coursera ",
    year: "2026",
    credentialUrl: "https://coursera.org/share/f1157780c0544078461ab9c6c7f7df71",
    badgeIcon: "ShieldCheck",
    skillsVerified: ["bash shell", "User Permissions", "CLI"],
  },

];
