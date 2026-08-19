import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ninja: {
          bg: "#090a18",
          dark: "#0d0f22",
          panel: "#131630",
          surface: "#1a1d3d",
          border: "#282d54",
          cyan: "#38bdf8",
          green: "#2dd4bf",
          emerald: "#10b981",
          gold: "#ff9e3b",
          amber: "#f59e0b",
          rose: "#f43f5e",
          purple: "#a855f7",
          lavender: "#c084fc",
          text: "#f1f5f9",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.55)",
        glow: "0 0 15px rgba(255, 158, 59, 0.25)",
        "glow-gold": "0 0 20px rgba(245, 158, 11, 0.3)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.25)",
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cursor-blink": "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
