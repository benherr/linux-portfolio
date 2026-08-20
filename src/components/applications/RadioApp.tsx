"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, FastForward, Rewind } from "lucide-react";
import { defaultTracklist } from "@/data/music";

const STREAMING_FALLBACK = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";

export const RadioApp: React.FC = () => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
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
    const handleEnded = () => setTrackIndex((prev) => (prev + 1) % defaultTracklist.length);
    const handleError = () => {
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

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0a0d24] via-[#121638] to-[#070915] text-slate-100 font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-indigo-500/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold">
            <Music className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold font-mono text-white">NinjaOS Audio Studio</h1>
            <p className="text-xs text-indigo-300 font-mono">Custom MP3 Audio & Lofi Streams</p>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
          Stereo High Fidelity
        </span>
      </div>

      {/* Main Track Visualizer Card */}
      <div className="my-auto py-6 max-w-xl mx-auto w-full bg-[#121638]/80 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <div className="w-full h-full rounded-[22px] bg-[#0d1027] flex items-center justify-center">
              <Music className={`w-10 h-10 text-indigo-400 ${isPlaying ? "animate-spin" : ""}`} />
            </div>
          </div>
          <h2 className="text-xl font-bold font-mono text-white pt-2">{currentTrack.title}</h2>
          <p className="text-xs text-indigo-300 font-mono">{currentTrack.artist}</p>
        </div>

        {/* Progress Slider */}
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
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none accent-indigo-400 cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10))}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="Rewind 10s"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTrackIndex((prev) => (prev - 1 + defaultTracklist.length) % defaultTracklist.length)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-indigo-500 hover:bg-indigo-400 text-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.6)] transition transform active:scale-95 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
          </button>

          <button
            onClick={() => setTrackIndex((prev) => (prev + 1) % defaultTracklist.length)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10))}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="Fast Forward 10s"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Playlist selection */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Available Tracks
          </div>
          <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin">
            {defaultTracklist.map((tr, idx) => (
              <button
                key={tr.id}
                onClick={() => {
                  setTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`w-full p-2 rounded-xl text-left font-mono text-xs flex justify-between items-center transition ${
                  trackIndex === idx
                    ? "bg-indigo-500/25 border border-indigo-500/50 text-indigo-200"
                    : "hover:bg-white/5 text-slate-300"
                }`}
              >
                <span>{idx + 1}. {tr.title} — {tr.artist}</span>
                <span className="text-[11px] text-slate-500">{tr.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="text-center text-xs font-mono text-slate-500">
        To add your own MP3 songs, place files inside <code className="text-indigo-400">public/music/song1.mp3</code>
      </div>
    </div>
  );
};
