import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

type SpotifyTokenResponse = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  scope: string;
};

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const credentialsMissing = !clientId || !clientSecret || !refreshToken;

async function getAccessToken(): Promise<string | null> {
  if (credentialsMissing) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Spotify token refresh failed", await response.text());
    return null;
  }

  const tokenResponse = (await response.json()) as SpotifyTokenResponse;
  return tokenResponse.access_token;
}

export async function GET() {
  if (credentialsMissing) {
    return NextResponse.json(
      {
        isPlaying: false,
        error:
          "Missing Spotify credentials. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN.",
        lastUpdated: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        {
          isPlaying: false,
          error: "Unable to authenticate with Spotify.",
          lastUpdated: new Date().toISOString(),
        },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const nowPlayingResponse = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status === 200) {
      if (nowPlayingResponse.status === 204) {
        return NextResponse.json(
          {
            isPlaying: false,
            lastUpdated: new Date().toISOString(),
          },
          {
            status: 200,
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
      }

      const nowPlaying = await nowPlayingResponse.json();

      if (!nowPlaying?.item) {
        return NextResponse.json(
          {
            isPlaying: false,
            lastUpdated: new Date().toISOString(),
          },
          {
            status: 200,
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
      }

      const track = {
        title: nowPlaying.item.name as string,
        artist: (nowPlaying.item.artists ?? [])
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        album: nowPlaying.item.album?.name as string,
        albumImageUrl:
          nowPlaying.item.album?.images?.[0]?.url ??
          nowPlaying.item.album?.images?.[1]?.url ??
          null,
        songUrl: nowPlaying.item.external_urls?.spotify as string,
        durationMs: nowPlaying.item.duration_ms as number,
        progressMs: nowPlaying.progress_ms as number,
      };

      return NextResponse.json(
        {
          isPlaying: Boolean(nowPlaying.is_playing),
          track,
          lastUpdated: new Date().toISOString(),
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(
      {
        isPlaying: false,
        error: `Spotify returned status ${nowPlayingResponse.status}`,
        lastUpdated: new Date().toISOString(),
      },
      {
        status: nowPlayingResponse.status,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Spotify now playing error", error);
    return NextResponse.json(
      {
        isPlaying: false,
        error: "Unexpected error fetching Spotify playback.",
        lastUpdated: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

export const dynamic = "force-dynamic";

