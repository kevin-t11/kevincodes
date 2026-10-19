export type NowPlayingResponse = {
  isPlaying: boolean;
  source?: "currently-playing" | "recently-played";
  playedAt?: string;
  track?: {
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string | null;
    songUrl: string;
    durationMs: number;
    progressMs: number | null;
  };
  lastUpdated: string;
  error?: string;
};
