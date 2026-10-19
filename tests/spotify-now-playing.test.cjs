const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(
  readFileSync("src/app/api/spotify/now-playing/route.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
).outputText;

const track = {
  name: "Last song",
  artists: [{ name: "Artist" }],
  album: { name: "Album", images: [{ url: "https://i.scdn.co/cover" }] },
  external_urls: { spotify: "https://open.spotify.com/track/test" },
  duration_ms: 180000,
};
const history = { items: [{ track, played_at: "2026-10-18T12:00:00.000Z" }] };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

function handler(responses) {
  const calls = [];
  const exports = {};
  runInNewContext(source, {
    exports,
    require,
    Buffer,
    URLSearchParams,
    console: { error() {} },
    process: { env: { SPOTIFY_CLIENT_ID: "client", SPOTIFY_CLIENT_SECRET: "secret", SPOTIFY_REFRESH_TOKEN: "refresh" } },
    fetch: async (url, options) => {
      calls.push({ url, options });
      assert.ok(responses.length, "Unexpected upstream request");
      const next = responses.shift();
      if (next instanceof Error) throw next;
      return next;
    },
  });
  return { get: exports.GET, calls };
}

for (const isPlaying of [true, false]) {
  test(`${isPlaying ? "playing" : "paused"} track takes priority over listening history`, async () => {
    const { get, calls } = handler([
      json({ access_token: "access" }),
      json({ item: track, is_playing: isPlaying, progress_ms: 12000 }),
    ]);
    const response = await get();
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.isPlaying, isPlaying);
    assert.equal(body.source, "currently-playing");
    assert.equal(body.track.progressMs, 12000);
    assert.equal(calls.length, 2);
  });
}

for (const current of [() => new Response(null, { status: 204 }), () => json({ item: null, is_playing: false })]) {
  test("idle playback returns the latest song and its real played_at timestamp", async () => {
    const { get, calls } = handler([json({ access_token: "access" }), current(), json(history)]);
    const response = await get();
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(body.isPlaying, false);
    assert.equal(body.source, "recently-played");
    assert.equal(body.track.title, "Last song");
    assert.equal(body.track.albumImageUrl, "https://i.scdn.co/cover");
    assert.equal(body.track.progressMs, null);
    assert.equal(body.playedAt, history.items[0].played_at);
    assert.match(calls[2].url, /recently-played\?limit=1$/);
  });
}

test("empty listening history remains an honest idle state", async () => {
  const { get } = handler([json({ access_token: "access" }), new Response(null, { status: 204 }), json({ items: [] })]);
  const response = await get();
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.isPlaying, false);
  assert.equal(body.track, undefined);
  assert.equal(body.error, undefined);
});

test("missing history permission is reported without exposing upstream details", async () => {
  const { get } = handler([json({ access_token: "access" }), new Response(null, { status: 204 }), json({ error: "private details" }, 403)]);
  const response = await get();
  assert.equal(response.status, 403);
  assert.equal((await response.json()).error, "Unable to load the last played song.");
});

test("history network failure is caught by the route", async () => {
  const { get } = handler([json({ access_token: "access" }), new Response(null, { status: 204 }), new Error("Network failed")]);
  const response = await get();
  assert.equal(response.status, 500);
  assert.ok((await response.json()).error);
});

test("current playback errors do not masquerade as an old song", async () => {
  const { get, calls } = handler([json({ access_token: "access" }), json({ error: "rate limited" }, 429)]);
  const response = await get();
  assert.equal(response.status, 429);
  assert.equal(calls.length, 2);
});
