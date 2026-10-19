const { randomBytes } = require("node:crypto");
const { readFile, writeFile, chmod } = require("node:fs/promises");
const { createServer } = require("node:http");
const { resolve } = require("node:path");
const dotenv = require("dotenv");

const redirectUri = "http://127.0.0.1:4382/callback";
const scopes = ["user-read-currently-playing", "user-read-recently-played"];

async function saveRefreshToken(envPath, token) {
  const contents = await readFile(envPath, "utf8").catch((error) => {
    if (error.code === "ENOENT") return "";
    throw error;
  });
  const setting = `SPOTIFY_REFRESH_TOKEN=${JSON.stringify(token)}`;
  const pattern = /^\s*(?:export\s+)?SPOTIFY_REFRESH_TOKEN\s*=.*$/gm;
  const updated = pattern.test(contents)
    ? contents.replace(pattern, () => setting)
    : `${contents}${contents.endsWith("\n") || !contents ? "" : "\n"}${setting}\n`;
  await writeFile(envPath, updated, { mode: 0o600 });
  await chmod(envPath, 0o600);
}

async function reconnect() {
  dotenv.config({ path: [".env.local", ".env"] });
  const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env;
  if (!clientId || !clientSecret) {
    throw new Error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  }

  const state = randomBytes(32).toString("hex");
  const authorizationUrl = new URL("https://accounts.spotify.com/authorize");
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    state,
  }).toString();

  await new Promise((resolveFlow, rejectFlow) => {
    let exchanging = false;
    const finish = (error) => {
      clearTimeout(timeout);
      server.close();
      if (error) rejectFlow(error);
      else resolveFlow();
    };
    const server = createServer(async (request, response) => {
      response.setHeader("Cache-Control", "no-store");
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.setHeader("Referrer-Policy", "no-referrer");
      const callback = new URL(request.url, redirectUri);
      if (request.method !== "GET" || callback.pathname !== "/callback") {
        response.writeHead(404).end("Not found");
        return;
      }
      if (callback.searchParams.get("state") !== state) {
        response.writeHead(400).end("Invalid authorization state. Use the link printed in your terminal.");
        return;
      }
      if (exchanging) {
        response.writeHead(409).end("Authorization is already being processed.");
        return;
      }
      exchanging = true;
      try {
        const code = callback.searchParams.get("code");
        if (callback.searchParams.has("error") || !code) {
          throw new Error("Spotify authorization was declined. Run npm run spotify:reconnect to retry.");
        }
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
          signal: AbortSignal.timeout(15_000),
        });
        const token = await tokenResponse.json();
        if (!tokenResponse.ok || !token.refresh_token || !scopes.every((scope) => token.scope?.split(" ").includes(scope))) {
          throw new Error(`Spotify could not authorize playback access (HTTP ${tokenResponse.status}). Check the app credentials and retry.`);
        }
        await saveRefreshToken(resolve(".env.local"), token.refresh_token);
        response.end("Spotify reconnected. The refresh token was saved to .env.local. You can close this tab.");
        console.log("Spotify reconnected. Saved SPOTIFY_REFRESH_TOKEN to .env.local without displaying it.");
        console.log("Restart the local server. For the live site, update the same variable in Vercel and redeploy.");
        finish();
      } catch (error) {
        response.writeHead(500).end("Reconnection failed. Check the terminal for details.");
        finish(error);
      }
    });
    const timeout = setTimeout(() => finish(new Error("Authorization timed out. Run npm run spotify:reconnect to retry.")), 10 * 60_000);
    server.once("error", finish);
    server.listen(4382, "127.0.0.1", () => {
      console.log(`Register this Redirect URI in your Spotify app settings: ${redirectUri}`);
      console.log(`Open this link in your signed-in browser:\n${authorizationUrl}`);
    });
  });
}

module.exports = { saveRefreshToken };

if (require.main === module) {
  reconnect().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
