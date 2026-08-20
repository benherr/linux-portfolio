import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NinjaOS | Linux Portfolio",
  description:
    "Interactive Linux-inspired portfolio showcasing MCA graduate projects, Linux system administration, cybersecurity learning, cloud technologies, and full-stack software development.",
  keywords: [
    "NinjaOS",
    "Linux Portfolio",
    "Cybersecurity Portfolio",
    "MCA Graduate",
    "Decentralized Voting DApp",
    "Next.js",
    "React",
    "TypeScript",
    "Bash Automation",
  ],
  authors: [{ name: "Benher" }],
  openGraph: {
    title: "NinjaOS | Linux Portfolio",
    description:
      "Interactive Linux OS browser experience built with Next.js & React showcasing projects, cybersecurity operations, and technical skills.",
    url: "https://ninjaos.portfolio",
    siteName: "NinjaOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NinjaOS | Linux Portfolio",
    description:
      "Interactive Linux-powered portfolio showcasing Linux skills, cybersecurity labs, and software engineering projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#070b12] text-slate-100 font-sans antialiased overflow-hidden selection:bg-ninja-cyan selection:text-ninja-dark">
        {children}
      </body>
    </html>
  );
}
