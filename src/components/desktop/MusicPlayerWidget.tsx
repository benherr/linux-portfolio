"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc,
  X,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  streamUrl: string;
  duration: string;
  coverBg: string;
}

export const TRACK_LIST: Track[] = [
  {
    id: "my-song-1",
    title: "Custom Song 1",
    artist: "Benher Basheer",
    genre: "Local MP3 (/public/music/song1.mp3)",
    streamUrl: "/music/song1.mp3",
    duration: "MP3",
    coverBg: "from-[#24133b] via-purple-950 to-rose-950",
  },
  {
    id: "my-song-2",
    title: "Custom Song 2",
    artist: "Benher Basheer",
    genre: "Local MP3 (/public/music/song2.mp3)",
    streamUrl: "/music/song2.mp3",
    duration: "MP3",
    coverBg: "from-amber-900 via-rose-950 to-slate-900",
  },
  {
    id: "kerala-monsoon",
    title: "Monsoon Rain & Chill Beats",
    artist: "NinjaOS Lofi Lab",
    genre: "Malayalam Chill / Lo-Fi Stream",
    streamUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    duration: "LIVE",
    coverBg: "from-emerald-900 via-teal-900 to-slate-900",
  },
  {
    id: "synthwave-drive",
    title: "Neon Highway Sunset",
    artist: "Cyber Synth",
    genre: "Synthwave Stream",
    streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv",
    duration: "LIVE",
    coverBg: "from-[#24133b] via-purple-950 to-rose-950",
  },
];

export const MusicPlayerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = TRACK_LIST[currentTrackIdx];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    if (audioRef.current && audioRef.current.currentTime !== undefined) {
      try {
        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds);
      } catch {
        // live audio stream fallback
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACK_LIST.length;
    setCurrentTrackIdx(nextIdx);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIdx - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    setCurrentTrackIdx(prevIdx);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200);
  };

  return (
    <div className="relative">
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src={activeTrack.streamUrl} preload="none" />

      {/* Top Panel Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 px-2 py-1 rounded border text-[11px] font-mono transition cursor-pointer ${
          isPlaying
            ? "bg-[#1d1e42] border-[#e2b714] text-[#e2b714] shadow-glow-gold"
            : "bg-[#13142e]/60 hover:bg-[#1d1e42] border-white/10 text-slate-300"
        }`}
        title="Open Music Player Widget"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-[#e2b714] animate-bounce" : "text-slate-400"}`} />
        <span className="font-bold hidden sm:inline max-w-[110px] truncate">{activeTrack.title}</span>
        {isPlaying && (
          <div className="flex items-end space-x-0.5 h-3">
            <span className="w-0.5 bg-[#e2b714] animate-pulse h-2" />
            <span className="w-0.5 bg-[#e2b714] animate-pulse h-3 delay-75" />
            <span className="w-0.5 bg-[#e2b714] animate-pulse h-1.5 delay-150" />
          </div>
        )}
      </button>

      {/* Popover Music Player Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-0 z-[250] w-84 bg-[#120e24]/95 border border-[#2b2c52] rounded-2xl p-4 shadow-2xl backdrop-blur-md text-slate-200 font-sans select-none space-y-4"
          >
            {/* Widget Header */}
            <div className="flex justify-between items-center border-b border-[#2b2c52] pb-2.5">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-[#e2b714]" />
                <span className="font-bold text-xs text-white font-mono">NinjaOS Music Player</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Track Album Banner */}
            <div
              className={`p-4 rounded-xl bg-gradient-to-r ${activeTrack.coverBg} border border-white/10 flex items-center space-x-3 shadow-inner`}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 border-[#e2b714]/60 bg-[#090a18] flex items-center justify-center shrink-0 shadow-lg relative ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                <Disc className="w-7 h-7 text-[#e2b714]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#e2b714] absolute" />
              </div>

              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white font-mono truncate">{activeTrack.title}</div>
                <div className="text-[11px] text-[#e2b714] font-mono truncate">{activeTrack.artist}</div>
                <div className="text-[10px] text-slate-400 font-sans italic">{activeTrack.genre}</div>
              </div>
            </div>

            {/* Playback & Fast Forward / Rewind Controls */}
            <div className="flex items-center justify-center space-x-3 pt-1">
              {/* Skip Prev */}
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-[#181a3d] hover:bg-[#25285e] text-slate-300 hover:text-white border border-[#2b2c52] transition cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Rewind -10s */}
              <button
                onClick={() => handleSeek(-10)}
                className="p-2 rounded-full bg-[#181a3d] hover:bg-[#25285e] text-amber-400 hover:text-amber-300 border border-[#2b2c52] transition cursor-pointer flex items-center space-x-0.5 text-[10px] font-mono font-bold"
                title="Rewind 10 Seconds"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>10s</span>
              </button>

              {/* Main Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-[#e2b714] hover:bg-[#f5c623] text-[#0b0d1e] font-bold flex items-center justify-center shadow-[0_0_15px_rgba(226,183,20,0.4)] transition transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* Fast Forward +10s */}
              <button
                onClick={() => handleSeek(10)}
                className="p-2 rounded-full bg-[#181a3d] hover:bg-[#25285e] text-amber-400 hover:text-amber-300 border border-[#2b2c52] transition cursor-pointer flex items-center space-x-0.5 text-[10px] font-mono font-bold"
                title="Fast Forward 10 Seconds"
              >
                <span>10s</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Skip Next */}
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-[#181a3d] hover:bg-[#25285e] text-slate-300 hover:text-white border border-[#2b2c52] transition cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume Control Slider */}
            <div className="flex items-center space-x-2 pt-1 px-2 text-slate-400">
              <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition cursor-pointer">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#e2b714]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1 bg-[#0b0d1e] rounded-lg appearance-none cursor-pointer accent-[#e2b714]"
              />
              <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Track Selector List */}
            <div className="pt-2 space-y-1.5 border-t border-[#2b2c52]">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Select Audio Track / Stream
              </div>
              <div className="space-y-1">
                {TRACK_LIST.map((tr, idx) => (
                  <button
                    key={tr.id}
                    onClick={() => {
                      setCurrentTrackIdx(idx);
                      setIsPlaying(false);
                      setTimeout(() => {
                        if (audioRef.current) {
                          audioRef.current.play().catch(() => {});
                          setIsPlaying(true);
                        }
                      }, 200);
                    }}
                    className={`w-full p-2 rounded-lg border flex items-center justify-between transition text-left cursor-pointer ${
                      currentTrackIdx === idx
                        ? "bg-[#1d1e42] border-[#e2b714]/60 text-white"
                        : "bg-[#13142e]/60 border-[#2b2c52] hover:bg-[#181a3d] text-slate-400"
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs font-mono font-bold text-slate-200">{tr.title}</div>
                      <div className="text-[10px] text-slate-400">{tr.genre}</div>
                    </div>
                    {currentTrackIdx === idx && isPlaying && (
                      <span className="text-[9px] font-mono text-[#e2b714] bg-[#e2b714]/10 border border-[#e2b714]/40 px-1.5 py-0.5 rounded shrink-0">
                        PLAYING
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
