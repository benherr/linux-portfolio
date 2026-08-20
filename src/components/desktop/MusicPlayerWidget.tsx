"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, FastForward, Rewind } from "lucide-react";
import { defaultTracklist, Track } from "@/data/music";

const STREAMING_FALLBACK = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";

export const MusicPlayerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = defaultTracklist[trackIndex] || defaultTracklist[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.audioUrl);
    } else {
      audioRef.current.src = currentTrack.audioUrl;
    }
    audioRef.current.volume = isMuted ? 0 : volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNextTrack();
    const handleError = () => {
      // Fallback if local MP3 file not found
      if (audio.src !== STREAMING_FALLBACK) {
        audio.src = STREAMING_FALLBACK;
        if (isPlaying) audio.play().catch(() => {});
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [trackIndex]);

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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleNextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % defaultTracklist.length);
  };

  const handlePrevTrack = () => {
    setTrackIndex((prev) => (prev - 1 + defaultTracklist.length) % defaultTracklist.length);
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div className="relative">
      {/* Top Bar Player Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#181a3d]/80 hover:bg-[#25285c] border border-indigo-500/40 text-indigo-200 transition cursor-pointer text-xs font-mono shadow-md"
        title="Music Player Widget"
      >
        <Music className={`w-3.5 h-3.5 text-indigo-400 ${isPlaying ? "animate-bounce" : ""}`} />
        <span className="truncate max-w-[100px] sm:max-w-[130px] font-bold">
          {currentTrack.title}
        </span>
      </button>

      {/* Popover Music Player Card */}
      {isOpen && (
        <div className="absolute top-10 right-0 w-80 bg-[#0d1027]/95 border border-indigo-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-[120] space-y-4 text-slate-100 font-sans">
          {/* Header Track Info */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300 font-bold font-mono">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono text-white truncate max-w-[160px]">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">{currentTrack.artist}</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              MP3 / Lofi
            </span>
          </div>

          {/* Progress Bar & Seek Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                const newT = parseFloat(e.target.value);
                setCurrentTime(newT);
                if (audioRef.current) audioRef.current.currentTime = newT;
              }}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none accent-indigo-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Main Controls (-10s, Prev, Play/Pause, Next, +10s) */}
          <div className="flex items-center justify-center space-x-3 pt-1">
            <button
              onClick={handleRewind}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Rewind 10s"
            >
              <Rewind className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handlePrevTrack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-slate-950 shadow-[0_0_15px_rgba(99,102,241,0.6)] transition transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleFastForward}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Fast Forward 10s"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Track Selection List */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Playlist (Place MP3s in public/music/)
            </div>

            <div className="space-y-1 max-h-24 overflow-y-auto scrollbar-thin">
              {defaultTracklist.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full p-1.5 rounded-lg text-left font-mono text-xs flex justify-between items-center transition ${
                    trackIndex === idx
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                      : "hover:bg-white/5 text-slate-300"
                  }`}
                >
                  <span className="truncate">{idx + 1}. {track.title}</span>
                  <span className="text-[10px] text-slate-500">{track.duration}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 pt-1 border-t border-white/10 text-xs font-mono text-slate-400">
            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
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
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none accent-indigo-400 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
