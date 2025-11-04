"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  FiAlertTriangle,
  FiClock,
  FiExternalLink,
  FiMusic,
  FiRefreshCw,
} from "react-icons/fi";
import { SiSpotify } from "react-icons/si";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shelfPlaylists } from "@/staticdata/shelf";
import { AudioEqualizer } from "@/components/audio-equalizer";
import { cn } from "@/lib/utils";
type NowPlayingResponse = {
  isPlaying: boolean;
  track?: {
    title: string;
    artist: string;
    album: string;
    albumImageUrl?: string | null;
    songUrl: string;
    durationMs: number;
    progressMs: number;
  };
  lastUpdated: string;
  error?: string;
};

const fetchNowPlaying = async (): Promise<NowPlayingResponse> => {
  const response = await fetch("/api/spotify/now-playing", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = (await response
    .json()
    .catch(() => null)) as NowPlayingResponse | null;

  if (!response.ok) {
    if (payload) {
      return payload;
    }

    throw new Error("Unable to load Spotify playback");
  }

  return (
    payload ?? {
      isPlaying: false,
      lastUpdated: new Date().toISOString(),
    }
  );
};

export default function Playlists() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["spotify", "now-playing"],
    queryFn: fetchNowPlaying,
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
    retry: false,
  });

  const track = data?.track;
  const isPlaying = Boolean(data?.isPlaying && track);
  const lastUpdatedDate = data?.lastUpdated ? new Date(data.lastUpdated) : null;
  const lastUpdatedRelative = lastUpdatedDate
    ? formatDistanceToNow(lastUpdatedDate, { addSuffix: true })
    : null;

  const playbackState = (() => {
    if (error || data?.error) {
      return {
        tone: "error" as const,
        label: "Can't reach Spotify",
        helper:
          data?.error || error?.message || "Spotify connection unavailable.",
      };
    }
    if (!track) {
      return {
        tone: "idle" as const,
        label: "Nothing playing",
        helper: "Start music on Spotify and it will show up here instantly.",
      };
    }
    if (isPlaying) {
      return {
        tone: "playing" as const,
        label: "Now playing",
        helper: "Streaming live from Spotify",
      };
    }
    return {
      tone: "paused" as const,
      label: "Paused on Spotify",
      helper: lastUpdatedRelative
        ? `Last heard ${lastUpdatedRelative}`
        : "Playback paused",
    };
  })();

  const toneStyles: Record<
    typeof playbackState.tone,
    {
      card: string;
      badge: string;
      progress: string;
      statusDot: string;
    }
  > = {
    playing: {
      card: "border-neutral-900 bg-white dark:border-neutral-200/80 dark:bg-neutral-900/70",
      badge: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
      progress: "bg-neutral-900 dark:bg-neutral-100",
      statusDot: "bg-neutral-900 dark:bg-neutral-100",
    },
    paused: {
      card: "border-neutral-200 bg-white dark:border-neutral-700/40 dark:bg-neutral-900/50",
      badge: "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100",
      progress: "bg-neutral-400 dark:bg-neutral-600",
      statusDot: "bg-neutral-400 dark:bg-neutral-600",
    },
    idle: {
      card: "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
      badge: "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
      progress: "bg-neutral-300 dark:bg-neutral-700",
      statusDot: "bg-neutral-400 dark:bg-neutral-600",
    },
    error: {
      card: "border-red-200 bg-white dark:border-red-500/40 dark:bg-neutral-900",
      badge: "bg-red-600 text-white dark:bg-red-500",
      progress: "bg-red-500 dark:bg-red-400",
      statusDot: "bg-amber-500 dark:bg-amber-400",
    },
  };

  const tone = toneStyles[playbackState.tone];

  const progressPercent = useMemo(() => {
    if (!track) return 0;
    if (!track.durationMs) return 0;
    return Math.min(
      100,
      Math.round((track.progressMs / track.durationMs) * 100)
    );
  }, [track]);

  const formatDuration = (ms: number) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const trackDetails = track ? `${track.artist} • ${track.album}` : null;

  return (
    <section className={cn("space-y-6")}>
      <Card
        className={cn(
          "relative overflow-hidden border-2 transition-all duration-300",
          tone.card
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.04),transparent_55%)]",
            "dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.04),transparent_55%)]"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-neutral-200/25 blur-3xl",
            "dark:bg-neutral-700/20"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-neutral-100/25 blur-3xl",
            "dark:bg-neutral-800/25"
          )}
        />

        <CardHeader
          className={cn(
            "relative z-10 border-b border-neutral-100",
            "dark:border-neutral-900"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    tone.statusDot,
                    isPlaying && "animate-pulse-slow"
                  )}
                />
                <span className="text-sm font-semibold text-black dark:text-white">
                  {playbackState.label}
                </span>
                {isPlaying && (
                  <AudioEqualizer
                    isPlaying={isPlaying}
                    barCount={4}
                    className="ml-1"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center gap-2 text-xs text-neutral-600",
                  "dark:text-neutral-400"
                )}
              >
                <FiRefreshCw
                  className={cn("text-sm", isFetching && "animate-spin")}
                  aria-hidden
                />
                <span className="hidden sm:inline">
                  {isLoading
                    ? "Syncing..."
                    : lastUpdatedDate
                    ? `${lastUpdatedDate.getHours().toString().padStart(2, "0")}:${lastUpdatedDate.getMinutes().toString().padStart(2, "0")}`
                    : "Live"}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold",
                  tone.badge
                )}
              >
                <SiSpotify className="text-sm" aria-hidden />
                Spotify
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-6">
          <div className="grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center md:mx-0">
              <div
                className={cn(
                  "relative h-full w-full overflow-hidden rounded-2xl border-2 border-neutral-200 bg-neutral-50 shadow-lg",
                  "dark:border-neutral-700 dark:bg-neutral-900"
                )}
              >
                {track?.albumImageUrl ? (
                  <Image
                    src={track.albumImageUrl || "/placeholder.svg"}
                    alt={`Album art for ${track.album}`}
                    fill
                    sizes="128px"
                    className="relative z-10 object-cover"
                    priority
                  />
                ) : (
                  <div
                    className={cn(
                      "relative z-10 flex h-full w-full items-center justify-center text-neutral-400",
                      "dark:text-neutral-600"
                    )}
                  >
                    <FiMusic className="text-4xl" aria-hidden />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-black dark:text-white">
                  {track ? track.title : playbackState.label}
                </CardTitle>
                <CardDescription
                  className={cn(
                    "text-base text-neutral-600",
                    "dark:text-neutral-400"
                  )}
                >
                  {trackDetails || playbackState.helper}
                </CardDescription>
                {track && playbackState.tone !== "playing" && (
                  <p
                    className={cn(
                      "text-sm text-neutral-500",
                      "dark:text-neutral-500"
                    )}
                  >
                    {playbackState.helper}
                  </p>
                )}
                {!track && playbackState.tone === "error" && (
                  <p
                    className={cn(
                      "flex items-center gap-2 text-sm text-amber-600",
                      "dark:text-amber-400"
                    )}
                  >
                    <FiAlertTriangle aria-hidden />
                    {playbackState.helper}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    "h-2 rounded-full bg-neutral-200",
                    "dark:bg-neutral-800"
                  )}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      tone.progress
                    )}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div
                  className={cn(
                    "flex items-center justify-between text-xs font-medium text-neutral-600",
                    "dark:text-neutral-400"
                  )}
                >
                  <span className="flex items-center gap-1">
                    <FiClock className="text-sm" aria-hidden />
                    {track ? formatDuration(track.progressMs) : "0:00"}
                  </span>
                  <span>
                    {track ? formatDuration(track.durationMs) : "0:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className={cn("grid gap-4", "sm:grid-cols-2")}>
        {shelfPlaylists.map((playlist, index) => (
          <motion.div
            key={playlist.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card
              className={cn(
                "group relative h-full overflow-hidden border-2 border-neutral-200 bg-white transition-all duration-300",
                "hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl",
                "dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-neutral-200/20 blur-2xl transition-opacity duration-300",
                  "group-hover:opacity-100",
                  "dark:bg-neutral-600/20"
                )}
              />
              <CardHeader
                className={cn(
                  "flex flex-row items-start gap-4 border-b border-neutral-100",
                  "dark:border-neutral-800"
                )}
              >
                <div
                  className={cn(
                    "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-50 shadow-md transition-transform duration-300",
                    "group-hover:scale-105",
                    "dark:border-neutral-700 dark:bg-neutral-900"
                  )}
                >
                  {playlist.coverImage ? (
                    <Image
                      src={playlist.coverImage || "/placeholder.svg"}
                      alt={`${playlist.title} cover art`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center text-neutral-400",
                        "dark:text-neutral-600"
                      )}
                    >
                      <FiMusic className="text-2xl" aria-hidden />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <CardTitle
                    className={cn(
                      "text-lg font-bold leading-tight text-black",
                      "dark:text-white"
                    )}
                  >
                    {playlist.title}
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      "text-xs text-neutral-600",
                      "dark:text-neutral-400"
                    )}
                  >
                    by {playlist.curator}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p
                  className={cn(
                    "text-sm leading-relaxed text-neutral-600",
                    "dark:text-neutral-400"
                  )}
                >
                  {playlist.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href={playlist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors",
                    "hover:text-neutral-600",
                    "dark:text-neutral-100 dark:hover:text-neutral-300"
                  )}
                >
                  Listen on Spotify
                  <FiExternalLink aria-hidden />
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
