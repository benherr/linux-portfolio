export interface ProfileData {
  name: string;
  tagline: string;
  handle: string;
  osName: string;
  osVersion: string;
  role: string;
  avatarUrl?: string;
  education: {
    degree: string;
    field: string;
    completionYear: string;
    institution: string;
    location: string;
  };
  primaryFocus: string[];
  secondaryInterests: string[];
  bio: string;
  location: string;
  availability: string;
  status: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: "blockchain" | "ai" | "web" | "security";
  isFeatured: boolean;
  highlights: string[];
  githubUrl: string;
  demoUrl?: string;
  status: "Completed" | "In Development" | "Maintained";
}

export interface SkillCategory {
  category: "Programming" | "Web Development" | "Linux & Shell" | "Cybersecurity" | "Cloud & DevOps" | "Tools & Frameworks";
  skills: {
    name: string;
    level: "Learning" | "Familiar" | "Intermediate";
    description?: string;
  }[];
}

export interface CertificationData {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  badgeIcon: string;
  skillsVerified: string[];
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  availability: string;
  timezone: string;
}

export interface FSNode {
  name: string;
  type: "file" | "directory";
  path: string;
  size?: string;
  updatedAt?: string;
  content?: string;
  children?: FSNode[];
}
