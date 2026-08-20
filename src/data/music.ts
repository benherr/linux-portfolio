export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl?: string;
  audioUrl: string;
}

export const defaultTracklist: Track[] = [
  {
    id: "track-1",
    title: "Midnight Chill Beats",
    artist: "Lofi Beats",
    duration: "2:45",
    audioUrl: "/music/song1.mp3",
  },
  {
    id: "track-2",
    title: "Cyber Horizon Synth",
    artist: "Synthwave Lab",
    duration: "3:12",
    audioUrl: "/music/song2.mp3",
  },
  {
    id: "track-3",
    title: "Deep Focus Ambient",
    artist: "Linux Lounge",
    duration: "3:30",
    audioUrl: "/music/song3.mp3",
  },
];
