# Italiano Flash

Learn Italian vocabulary with spaced repetition, audio pronunciation and daily
practice. React + Vite frontend; Supabase for auth (email/password + Google)
and per-user progress sync.

## Prerequisites

1. [Node.js](https://nodejs.org/) (LTS)
2. A [Supabase](https://supabase.com) project (free tier is fine)

## Supabase Setup (one-time)

1. **Database**: open the SQL Editor in the Supabase dashboard and run
   [`supabase/schema.sql`](supabase/schema.sql). This creates the
   `word_progress` table with row-level security (each user only sees their
   own rows).

2. **Keys**: in *Project Settings → API*, copy the **Project URL** and the
   **anon public** key.

3. **Environment**: create `.env.local` in the project root:

   ```bash
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

4. **Email confirmation**: in *Authentication → Sign In / Providers → Email*,
   keep **Confirm email** enabled (the register page shows a
   "confirm your email" step). If you disable it, new sign-ups are logged in
   immediately — the app handles both.

5. **Google login** (optional but supported):
   1. Create an OAuth client at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
      (type *Web application*).
   2. Authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   3. In *Authentication → Sign In / Providers → Google*, enable the provider
      and paste the client ID and secret.

6. **Redirect URLs**: in *Authentication → URL Configuration*, add your app's
   origin (e.g. `http://localhost:5173/**` for local dev, your production URL
   with `/**`). The app redirects here after email confirmation, password
   recovery and Google sign-in.

## Run Locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run typecheck` | TypeScript check of the JS config |

## Deploying

Any static host works (Vercel, Netlify, Cloudflare Pages…):

- Build command: `npm run build`, output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
  variables in the host's dashboard
- Add the deployed URL to Supabase's *Redirect URLs* (step 6 above)

## Architecture Notes

- **Local-first progress**: all learning progress lives in `localStorage`
  (instant, offline-capable). On login, `ensureSynced()` in
  `src/lib/storage.js` merges the server's `word_progress` rows with local
  data (most recent wins), then pushes anything the server is missing.
- **Spaced repetition**: intervals `[1, 1, 2, 3, 5, 7, 14]` days by level;
  a wrong answer resets the word to level 0.
- **Vocabulary**: 140 hand-curated core words in `src/lib/vocabulary.js` plus
  generated words in `src/data/vocabulary.json` (~1000 total), merged at
  runtime.
- **UI**: Tailwind CSS + shadcn/ui components in `src/components/ui/`.
