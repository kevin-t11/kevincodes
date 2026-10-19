import { NextResponse } from "next/server";
import type { NowPlayingResponse } from "@/lib/spotify-types";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyTrack = {
  name: string;
  artists?: { name: string }[];
  album?: { name: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
  duration_ms: number;
};

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

function playbackResponse(
  payload: Omit<NowPlayingResponse, "lastUpdated">,
  status = 200
) {
  return NextResponse.json(
    { ...payload, lastUpdated: new Date().toISOString() },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

function formatTrack(
  track: SpotifyTrack,
  progressMs: number | null
): NonNullable<NowPlayingResponse["track"]> {
  return {
    title: track.name,
    artist: (track.artists ?? []).map((artist) => artist.name).join(", "),
    album: track.album?.name ?? "",
    albumImageUrl: track.album?.images?.[0]?.url ?? null,
    songUrl: track.external_urls?.spotify ?? "",
    durationMs: track.duration_ms,
    progressMs,
  };
}

async function getLastPlayed(accessToken: string) {
  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Spotify listening history failed", response.status);
    return playbackResponse(
      { isPlaying: false, error: "Unable to load the last played song." },
      response.status
    );
  }

  const recentlyPlayed = (await response.json()) as {
    items?: { track: SpotifyTrack; played_at: string }[];
  };
  const lastPlayed = recentlyPlayed.items?.[0];

  if (!lastPlayed?.track) {
    return playbackResponse({ isPlaying: false });
  }

  return playbackResponse({
    isPlaying: false,
    source: "recently-played",
    playedAt: lastPlayed.played_at,
    track: formatTrack(lastPlayed.track, null),
  });
}

export async function GET() {
  if (!clientId || !clientSecret || !refreshToken) {
    return playbackResponse(
      {
        isPlaying: false,
        error:
          "Missing Spotify credentials. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN.",
      },
      503
    );
  }

  try {
    const tokenResponse = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      console.error("Spotify token refresh failed", tokenResponse.status);
      return playbackResponse(
        { isPlaying: false, error: "Unable to authenticate with Spotify." },
        502
      );
    }

    const { access_token: accessToken } = (await tokenResponse.json()) as {
      access_token: string;
    };
    if (!accessToken) {
      return playbackResponse(
        { isPlaying: false, error: "Unable to authenticate with Spotify." },
        502
      );
    }

    const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (response.status === 204) {
      return await getLastPlayed(accessToken);
    }

    if (!response.ok) {
      return playbackResponse(
        { isPlaying: false, error: `Spotify returned status ${response.status}` },
        response.status
      );
    }

    const nowPlaying = (await response.json()) as {
      item?: SpotifyTrack | null;
      is_playing: boolean;
      progress_ms: number | null;
    };

    if (!nowPlaying.item) {
      return await getLastPlayed(accessToken);
    }

    return playbackResponse({
      isPlaying: Boolean(nowPlaying.is_playing),
      source: "currently-playing",
      track: formatTrack(nowPlaying.item, nowPlaying.progress_ms),
    });
  } catch (error) {
    console.error("Spotify now playing error", error);
    return playbackResponse(
      { isPlaying: false, error: "Unexpected error fetching Spotify playback." },
      500
    );
  }
}

export const dynamic = "force-dynamic";
