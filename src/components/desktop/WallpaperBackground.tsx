"use client";

import React from "react";
import { WallpaperId } from "@/types/os";

interface WallpaperBackgroundProps {
  wallpaper: WallpaperId;
}

export const WallpaperBackground: React.FC<WallpaperBackgroundProps> = ({ wallpaper }) => {
  if (wallpaper === "mountainlake") {
    return (
      <div className="absolute inset-0 bg-[#070b14] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091024] via-[#162347] via-50% to-[#1d273d]" />
        <div className="absolute top-1/4 right-1/3 w-20 h-20 rounded-full bg-blue-100/80 shadow-[0_0_50px_rgba(219,234,254,0.7)]" />
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <polygon fill="#1a2542" fillOpacity="0.6" points="0,380 200,280 400,360 600,270 800,370 1000,260 1200,350 1440,290 1440,600 0,600" />
          <polygon fill="#11182d" points="0,440 160,360 360,430 520,340 720,430 920,330 1120,420 1440,360 1440,600 0,600" />
        </svg>
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#091024] via-[#11182d]/80 to-transparent" />
      </div>
    );
  }

  if (wallpaper === "kyototwilight") {
    return (
      <div className="absolute inset-0 bg-[#0c0a17] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0a1f] via-[#22133b] to-[#36194a]" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

        {/* Pagoda & Cherry Blossom Vector Silhouettes */}
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <path fill="#140a24" d="M0,480 L180,420 L360,460 L540,400 L720,470 L900,410 L1080,480 L1260,420 L1440,460 L1440,600 L0,600 Z" />
        </svg>
        <div className="absolute bottom-[20%] left-[20%] flex flex-col items-center">
          <div className="w-12 h-6 bg-[#140a24] rounded-t-full border-t border-amber-500/40" />
          <div className="w-16 h-8 bg-[#140a24] rounded-t-full border-t border-amber-500/40 mt-1" />
          <div className="w-20 h-16 bg-[#140a24] border-x border-amber-500/40 mt-1" />
        </div>
      </div>
    );
  }

  if (wallpaper === "cyberhorizon") {
    return (
      <div className="absolute inset-0 bg-[#08031a] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070114] via-[#210238] to-[#450552]" />
        {/* Synthwave Sun */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-amber-400 via-rose-500 to-purple-600 shadow-[0_0_60px_rgba(244,63,94,0.6)]" />

        {/* Horizon Perspective Grid */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#060012] overflow-hidden">
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.4) 25%, rgba(6, 182, 212, 0.4) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.4) 75%, rgba(6, 182, 212, 0.4) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.4) 25%, rgba(6, 182, 212, 0.4) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.4) 75%, rgba(6, 182, 212, 0.4) 76%, transparent 77%)`,
              backgroundSize: `40px 40px`,
              transform: `perspective(200px) rotateX(60deg)`,
            }}
          />
        </div>
      </div>
    );
  }

  if (wallpaper === "lakesidecabin") {
    return (
      <div className="absolute inset-0 bg-[#0d141e] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1324] via-[#162744] via-45% to-[#2e3745]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl" />
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <polygon fill="#1b2a41" fillOpacity="0.7" points="0,390 220,290 420,370 640,280 840,370 1060,270 1280,360 1440,300 1440,600 0,600" />
          <polygon fill="#121b2d" points="0,450 180,370 380,440 560,350 760,440 960,340 1180,430 1440,370 1440,600 0,600" />
        </svg>
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#0b1324] via-[#121b2d]/80 to-transparent" />
      </div>
    );
  }

  if (wallpaper === "deepspace") {
    return (
      <div className="absolute inset-0 bg-[#05030a] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060212] via-[#12082b] to-[#1c0a3d]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-600/25 rounded-full blur-3xl" />
        {/* Ringed Planet */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-700 to-purple-400 shadow-[0_0_40px_rgba(129,140,248,0.5)] flex items-center justify-center">
          <div className="w-36 h-8 border-t-2 border-indigo-300/60 rounded-full transform -rotate-12 absolute" />
        </div>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: `32px 32px`,
          }}
        />
      </div>
    );
  }

  // Default: Firewatch Vector Mountain Sunset
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#090a1a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1026] via-[#1a254b] via-40% via-[#382652] to-[#592651]" />
      <div className="absolute top-[18%] left-[52%] w-16 h-16 rounded-full bg-amber-100/90 shadow-[0_0_40px_rgba(254,243,199,0.8)]" />
      <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
        <polygon fill="#3b6989" fillOpacity="0.4" points="0,380 180,280 340,350 480,290 620,360 800,270 960,340 1120,260 1280,330 1440,280 1440,600 0,600" />
        <polygon fill="#351e43" fillOpacity="0.8" points="0,420 140,340 310,400 450,310 600,390 780,300 950,380 1100,290 1260,370 1440,320 1440,600 0,600" />
        <polygon fill="#231230" points="0,460 120,390 260,450 420,360 580,440 740,350 900,430 1080,340 1240,420 1440,360 1440,600 0,600" />
        <polygon fill="#0c0717" points="0,500 80,450 160,490 240,430 360,510 480,420 600,490 720,410 840,480 980,400 1120,470 1260,390 1440,460 1440,600 0,600" />
      </svg>
      <div className="absolute bottom-[28%] left-[48%] -translate-x-1/2 flex flex-col items-center">
        <div className="w-10 h-10 border-2 border-[#ff9e3b]/80 bg-[#ff9e3b]/30 shadow-[0_0_20px_rgba(255,158,59,0.8)] rounded-sm relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#ff9e3b] animate-ping" />
        </div>
        <div className="w-12 h-16 border-x-2 border-[#160b24] bg-[#160b24]/60" />
      </div>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: `48px 48px`,
        }}
      />
    </div>
  );
};
