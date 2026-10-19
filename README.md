This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Reconnect Spotify

The shelf widget uses `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and
`SPOTIFY_REFRESH_TOKEN` from `.env.local` (or the deployment environment).
If Spotify returns `invalid_grant`, the refresh token has expired or been revoked
and the account must authorize the app again.

1. Open your app in the [Spotify developer dashboard](https://developer.spotify.com/dashboard).
2. Add `http://127.0.0.1:4382/callback` to its Redirect URIs and save.
3. Run `npm run spotify:reconnect` and open the printed link in your signed-in browser.
4. Authorize current playback and recently played access. The command saves the new refresh token in the
   gitignored `.env.local` without printing it. Restart the local server.
5. For the live site, update `SPOTIFY_REFRESH_TOKEN` in the Vercel project's
   environment variables and redeploy. Updating an environment variable alone
   does not change an existing deployment.

Spotify's [refresh-token documentation](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens)
describes the six-month token lifetime and reauthorization requirement.

When Spotify has no active track, the shelf shows the latest song from listening
history with a "Last played" label and its actual playback timestamp. Both
`user-read-currently-playing` and `user-read-recently-played` permissions are
required; reconnect once if your token predates the listening-history permission.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
