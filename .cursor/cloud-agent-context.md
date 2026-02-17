# Cloud Agent – Project Context (same code & settings)

Use this when running as Cursor Cloud Agent on this repo. Keep behavior aligned with local dev.

## Project
- **Name:** RangMatch — Indian Men's Fashion Intelligence
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Supabase, optional OpenAI
- **Repo:** This folder is the full codebase; agent works on this code.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Settings / env (same as .env.local)
Set these as **Secrets** in Cloud Agent setup so agent has same config as local:

| Variable | Purpose |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `OPENAI_API_KEY` | (Optional) AI Stylist chat |
| `NEXT_PUBLIC_APP_URL` | (Optional) App URL for production |
| `SUPABASE_DB_URL` | (Optional) Only if running DB scripts |

Copy values from your local `.env.local` into Cloud Agent secrets.

## Key paths
- App routes: `app/(main)/*`, `app/(auth)/*`, `app/api/*`
- Lib: `lib/supabase.ts`, `lib/api/fashion.ts`, `lib/auth.ts`
- Components: `components/*`
- Types: `types/fashion.ts`
- Schema: `supabase_schema_complete.sql`, `supabase_migration_outfits_profiles.sql`

## Data
- Main table: `mens_fashion_items` (128k+ rows), 49 columns. Other tables: `color_palette`, `styling_rules`, `occasion_guide`, `body_type_hacks`, `fabric_guide`, `saved_outfits`, `user_profiles`.

## Rules
- Do not commit `.env.local` or real secrets; use Cloud Agent UI Secrets.
- Prefer TypeScript and existing patterns (React Query, Supabase client).
- For DB changes use Supabase SQL or migrations; do not change schema without alignment.
