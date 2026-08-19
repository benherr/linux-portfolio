"use client";

import React, { useState } from "react";
import { CloudSun, CloudRain, Sun, Wind, Droplets, MapPin, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface KeralaDistrictWeather {
  city: string;
  country: string;
  tempC: number;
  condition: string;
  humidity: string;
  wind: string;
  uv: string;
  icon: typeof CloudSun;
}

export const KERALA_DISTRICTS: KeralaDistrictWeather[] = [
  { city: "Thiruvananthapuram", country: "Kerala, India", tempC: 28, condition: "Coastal Breeze", humidity: "76%", wind: "14 km/h SW", uv: "High (6)", icon: CloudSun },
  { city: "Kollam", country: "Kerala, India", tempC: 28, condition: "Partly Cloudy", humidity: "74%", wind: "12 km/h W", uv: "Moderate (5)", icon: CloudSun },
  { city: "Pathanamthitta", country: "Kerala, India", tempC: 26, condition: "Forest Rain", humidity: "82%", wind: "10 km/h NW", uv: "Low (3)", icon: CloudRain },
  { city: "Alappuzha", country: "Kerala, India", tempC: 27, condition: "Backwater Drizzle", humidity: "84%", wind: "16 km/h SW", uv: "Low (2)", icon: CloudRain },
  { city: "Kottayam", country: "Kerala, India", tempC: 27, condition: "Misty Showers", humidity: "80%", wind: "11 km/h W", uv: "Low (3)", icon: CloudRain },
  { city: "Idukki", country: "Kerala, India", tempC: 20, condition: "Cool Hill Mist", humidity: "88%", wind: "15 km/h E", uv: "Low (2)", icon: CloudRain },
  { city: "Ernakulam", country: "Kerala, India", tempC: 29, condition: "Humid & Sunny", humidity: "72%", wind: "15 km/h W", uv: "High (7)", icon: Sun },
  { city: "Thrissur", country: "Kerala, India", tempC: 28, condition: "Partly Cloudy", humidity: "70%", wind: "12 km/h NW", uv: "Moderate (5)", icon: CloudSun },
  { city: "Palakkad", country: "Kerala, India", tempC: 31, condition: "Sunny Warmth", humidity: "64%", wind: "18 km/h NE", uv: "Very High (8)", icon: Sun },
  { city: "Malappuram", country: "Kerala, India", tempC: 28, condition: "Tropical Warmth", humidity: "73%", wind: "13 km/h W", uv: "Moderate (5)", icon: CloudSun },
  { city: "Kozhikode", country: "Kerala, India", tempC: 28, condition: "Coastal Sunshine", humidity: "75%", wind: "16 km/h SW", uv: "High (6)", icon: Sun },
  { city: "Wayanad", country: "Kerala, India", tempC: 22, condition: "Misty Mountain", humidity: "86%", wind: "12 km/h NE", uv: "Low (3)", icon: CloudRain },
  { city: "Kannur", country: "Kerala, India", tempC: 28, condition: "Clear Sky", humidity: "71%", wind: "14 km/h W", uv: "High (6)", icon: Sun },
  { city: "Kasaragod", country: "Kerala, India", tempC: 28, condition: "Coastal Breeze", humidity: "73%", wind: "15 km/h SW", uv: "Moderate (5)", icon: CloudSun },
];

export const WeatherWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [districtIdx, setDistrictIdx] = useState<number>(6); // Default: Ernakulam

  const currentLoc = KERALA_DISTRICTS[districtIdx];
  const displayTemp = unit === "C" ? currentLoc.tempC : Math.round((currentLoc.tempC * 9) / 5 + 32);
  const IconComponent = currentLoc.icon;

  const forecast = [
    { day: "Today", tempC: currentLoc.tempC, condition: currentLoc.condition, icon: currentLoc.icon },
    { day: "Tomorrow", tempC: currentLoc.tempC - 1, condition: "Light Monsoon Rain", icon: CloudRain },
    { day: "Friday", tempC: currentLoc.tempC + 1, condition: "Clear Sky", icon: Sun },
  ];

  return (
    <div className="relative">
      {/* Top Panel Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2 py-1 rounded bg-[#13142e]/60 hover:bg-[#1d1e42] border border-white/10 text-slate-200 text-[11px] font-mono transition cursor-pointer"
        title="View Kerala Weather Details"
      >
        <IconComponent className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-bold">{displayTemp}°{unit}</span>
        <span className="text-slate-400 hidden lg:inline">{currentLoc.city}</span>
      </button>

      {/* Advanced Weather Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-0 z-[250] w-80 bg-[#120e24]/95 border border-[#2b2c52] rounded-2xl p-4 shadow-2xl backdrop-blur-md text-slate-200 font-sans select-none"
          >
            {/* Header & District Select */}
            <div className="flex justify-between items-center border-b border-[#2b2c52] pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#e2b714]" />
                <select
                  value={districtIdx}
                  onChange={(e) => setDistrictIdx(parseInt(e.target.value, 10))}
                  className="bg-[#181a3d] text-white border border-[#2b2c52] rounded px-2 py-0.5 text-xs font-mono font-bold hover:border-[#e2b714] transition cursor-pointer focus:outline-none"
                >
                  {KERALA_DISTRICTS.map((d, i) => (
                    <option key={d.city} value={i}>
                      {d.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setUnit(unit === "C" ? "F" : "C")}
                  className="text-[10px] font-mono font-bold bg-[#1d1e42] border border-white/10 hover:border-[#e2b714] text-[#e2b714] px-2 py-0.5 rounded transition cursor-pointer"
                >
                  °{unit === "C" ? "F" : "C"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Temperature Banner */}
            <div className="py-4 flex items-center justify-between border-b border-[#2b2c52]">
              <div className="space-y-1">
                <div className="text-3xl font-bold font-mono text-white tracking-tight">
                  {displayTemp}°{unit}
                </div>
                <div className="text-xs font-mono text-[#e2b714]">{currentLoc.condition}</div>
                <div className="text-[10px] text-slate-400">{currentLoc.city}, Kerala</div>
              </div>
              <IconComponent className="w-14 h-14 text-amber-400 shrink-0 drop-shadow-md" />
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 text-center border-b border-[#2b2c52]">
              <div className="p-2 rounded-lg bg-[#181a3d]/80 border border-[#2b2c52]">
                <Droplets className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-400 font-mono">Humidity</div>
                <div className="text-xs font-bold text-slate-200 font-mono">{currentLoc.humidity}</div>
              </div>

              <div className="p-2 rounded-lg bg-[#181a3d]/80 border border-[#2b2c52]">
                <Wind className="w-3.5 h-3.5 text-teal-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-400 font-mono">Wind</div>
                <div className="text-[11px] font-bold text-slate-200 font-mono truncate">{currentLoc.wind}</div>
              </div>

              <div className="p-2 rounded-lg bg-[#181a3d]/80 border border-[#2b2c52]">
                <Sun className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-400 font-mono">UV Index</div>
                <div className="text-xs font-bold text-slate-200 font-mono">{currentLoc.uv}</div>
              </div>
            </div>

            {/* 3-Day Outlook */}
            <div className="pt-3 space-y-2">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                3-Day Kerala Outlook
              </div>
              <div className="space-y-1.5">
                {forecast.map((fc, idx) => {
                  const FcIcon = fc.icon;
                  const fcTemp = unit === "C" ? fc.tempC : Math.round((fc.tempC * 9) / 5 + 32);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#181a3d]/50 border border-[#2b2c52]/60 text-xs"
                    >
                      <div className="flex items-center space-x-2 font-mono">
                        <FcIcon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold text-slate-200">{fc.day}</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-sans truncate px-2 max-w-[110px]">
                        {fc.condition}
                      </span>
                      <span className="font-mono font-bold text-[#e2b714]">
                        {fcTemp}°{unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
