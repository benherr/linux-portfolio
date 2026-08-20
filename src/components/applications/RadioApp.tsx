"use client";

import React, { useState, useRef, useEffect } from "react";
import { Radio as RadioIcon, Play, Pause, SkipForward, Volume2, VolumeX, Disc, Music } from "lucide-react";
import { TRACK_LIST } from "@/data/music";

export const RadioApp: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = TRACK_LIST[currentTrackIndex];

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

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACK_LIST.length;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-200 font-sans select-none">
      {/* Hidden HTML5 Audio element */}
      <audio ref={audioRef} src={activeTrack.streamUrl} preload="none" />

      {/* Radio Header */}
      <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#13142e] border border-[#2b2c52] shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-[#1d1e42] border border-[#e2b714]/40 flex items-center justify-center text-[#e2b714] shrink-0 shadow-[0_0_15px_rgba(226,183,20,0.2)]">
          <RadioIcon className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-mono">
            NinjaOS Audio & Radio Player
          </h1>
          <p className="text-xs text-slate-400">Play your custom MP3 songs or curated audio streams</p>
        </div>
      </div>

      {/* Main Player Display Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181a3d] to-[#11122a] border border-[#2b2c52] shadow-2xl space-y-6">
        {/* Spinning Vinyl Visualizer */}
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div
            className={`w-28 h-28 rounded-full border-4 border-[#2b2c52] bg-[#0b0d1e] flex items-center justify-center shadow-2xl relative ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            <Disc className="w-16 h-16 text-[#e2b714]" />
            <div className="w-6 h-6 rounded-full bg-[#181a3d] border-2 border-[#e2b714] absolute" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold text-white font-mono">{activeTrack.title}</h2>
            <p className="text-xs text-[#e2b714] font-mono">{activeTrack.artist}</p>
            <p className="text-[11px] text-slate-400 font-sans italic">{activeTrack.genre}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-6 pt-2">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#e2b714] hover:bg-[#f5c623] text-[#0b0d1e] font-bold flex items-center justify-center shadow-[0_0_20px_rgba(226,183,20,0.4)] transition transform active:scale-95 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 rounded-full bg-[#1d1e42] hover:bg-[#282a5c] border border-[#2b2c52] text-slate-300 hover:text-white transition cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center space-x-3 pt-2 max-w-xs mx-auto text-slate-400">
          <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition cursor-pointer">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#e2b714]" />}
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
            className="w-full h-1.5 bg-[#0b0d1e] rounded-lg appearance-none cursor-pointer accent-[#e2b714]"
          />
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Available Audio Tracks & Streams
        </h3>
        <div className="space-y-1.5">
          {TRACK_LIST.map((tr, idx) => (
            <button
              key={tr.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setIsPlaying(false);
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }, 200);
              }}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition text-left cursor-pointer ${
                currentTrackIndex === idx
                  ? "bg-[#1d1e42] border-[#e2b714]/60 text-white shadow-glow-gold"
                  : "bg-[#13142e]/60 border-[#2b2c52] hover:bg-[#181a3d] text-slate-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Music className={`w-4 h-4 ${currentTrackIndex === idx ? "text-[#e2b714]" : "text-slate-500"}`} />
                <div>
                  <div className="text-xs font-bold font-mono">{tr.title}</div>
                  <div className="text-[10px] text-slate-400">{tr.artist} • {tr.genre}</div>
                </div>
              </div>
              {currentTrackIndex === idx && isPlaying && (
                <span className="text-[10px] font-mono text-[#e2b714] bg-[#e2b714]/10 border border-[#e2b714]/40 px-2 py-0.5 rounded">
                  PLAYING
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
