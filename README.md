# Netflix-style Streaming Starter

This repository is a starter for a Netflix-style streaming site built with Next.js 14, React, TypeScript, Tailwind CSS, TMDB (v3) for metadata, and VidAPI (vaplayer.ru) iframe embeds for playback.

Setup

1. Copy `.env.example` to `.env.local` and set your TMDB API key.

2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

Notes

- Server components call TMDB directly using the server-side secret key.
- The optional API proxy at `/api/tmdb` centralizes TMDB requests if you prefer a proxy.
- VidAPI / vaplayer.ru is used for iframe embeds. Movie embed: `https://vaplayer.ru/embed/movie/{tmdb_id}`. TV embed: `https://vaplayer.ru/embed/tv/{tmdb_id}/{season}/{episode}`.

Security

Do not commit your `.env.local` file with the TMDB key. Use environment variables in production.
