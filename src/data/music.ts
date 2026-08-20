export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  streamUrl: string;
  duration?: string;
  coverBg?: string;
}

export const TRACK_LIST: Track[] = [
  {
    id: "custom-track-1",
    title: "Custom Song 1 (Place track1.mp3 in public/music)",
    artist: "Benher Basheer",
    genre: "MP3 Audio",
    streamUrl: "/music/track1.mp3",
    duration: "MP3",
    coverBg: "from-emerald-900 via-teal-900 to-slate-900",
  },
  {
    id: "custom-track-2",
    title: "Custom Song 2 (Place track2.mp3 in public/music)",
    artist: "Benher Basheer",
    genre: "MP3 Audio",
    streamUrl: "/music/track2.mp3",
    duration: "MP3",
    coverBg: "from-[#24133b] via-purple-950 to-rose-950",
  },
  {
    id: "kerala-monsoon",
    title: "Monsoon Rain & Chill Beats",
    artist: "NinjaOS Lofi Lab",
    genre: "Malayalam Chill / Lo-Fi",
    streamUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    duration: "LIVE",
    coverBg: "from-indigo-900 via-purple-900 to-slate-900",
  },
  {
    id: "synthwave-drive",
    title: "Neon Highway Sunset",
    artist: "Cyber Synth",
    genre: "Synthwave / Retrowave",
    streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv",
    duration: "LIVE",
    coverBg: "from-[#24133b] via-purple-950 to-rose-950",
  },
  {
    id: "deep-focus",
    title: "Late Night Code Session",
    artist: "Ambient Flow",
    genre: "Ambient / Deep Focus",
    streamUrl: "https://stream.zeno.fm/4b5wv213kg8uv",
    duration: "LIVE",
    coverBg: "from-[#091024] via-[#162347] to-[#1d273d]",
  },
];
