# RangMatch — Indian Men's Fashion Intelligence

Next.js 14 app for Indian men's fashion recommendations: skin tone, occasion, body type, Hindi/English search, and outfit builder.

## Prerequisites

- Node.js 18+
- Supabase account (for database)
- (Optional) OpenAI API key for AI Stylist chat

## Setup

### 1. Clone and install

```bash
cd indian-fashion-app
npm install
```

### 2. Supabase (data ke liye)

**App ko Supabase se link karne ka step-by-step:** **SUPABASE_LINK_KAREIN.md** (Hindi + English)

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → API** se **Project URL** aur **anon public** key copy karo.
3. Project folder mein **`.env.local`** banao aur daalo:
   - `NEXT_PUBLIC_SUPABASE_URL=your_project_url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`
4. Run the schema: **SQL Editor** → paste contents of `supabase_schema_complete.sql` → Run.
5. Create the search function: follow **SUPABASE_SETUP_STEPBYSTEP.md** (Step 3).
6. Import data: set `SUPABASE_URL` and `SUPABASE_KEY` in `scripts/import_data.py`, then:
   ```bash
   pip install pandas supabase tqdm
   python scripts/import_data.py
   ```
7. Verify: open **http://localhost:3000/api/supabase-status** — `connected: true` aur `count` dikhna chahiye.

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# Optional:
OPENAI_API_KEY=sk-...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
- `npm test` — Jest tests (search/filters, ConfidenceIndicator)

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your GitHub repo.
3. **Environment variables** (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - (Optional) `OPENAI_API_KEY` = your OpenAI API key for AI Stylist chat
4. Click **Deploy**. The app will be built and live in a few minutes.
5. After deploy, open your app URL and test Search / Outfit Builder (they need Supabase env vars to show data).

## Project structure (per spec)

- `app/(main)/` — landing, search, outfit-builder, profile, occasions, style-guide, chat
- `app/(auth)/` — login, signup
- `app/api/` — search, recommendations, ai
- `components/` — SearchBar, FilterPanel, ItemCard, OutfitCanvas, ConfidenceIndicator, SocialApprovalScore, SkinTonePicker, BodyTypeSelector, BottomNav, etc.
- `lib/` — supabase.ts, auth.ts, openai.ts, recommendations.ts, api/fashion.ts
- `types/` — fashion.ts
- `scripts/` — CSV import script
- `__tests__/` — Jest + React Testing Library tests

## Data

- **mens_fashion_master_FINAL.csv** — 128K+ items (keywords in Hindi/English/Hinglish, skin tone, occasion, confidence, social approval).
- Schema and import steps: **SUPABASE_SETUP_STEPBYSTEP.md**.
