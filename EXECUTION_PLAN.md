# 🚀 INDIAN MEN'S FASHION INTELLIGENCE SYSTEM
## Complete Execution Plan

**Created:** Based on CURSOR_AI_MEGA_PROMPT.md + SUPABASE_SETUP_MEGA_PROMPT.md  
**Status:** Awaiting approval to build

---

## 📋 WHAT I UNDERSTOOD

### Project Summary
- **What:** Full-stack Indian men's fashion recommendation app with Hindi/English/Hinglish support
- **Data:** 128,743 fashion items in CSV → Supabase (PostgreSQL)
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Shadcn/ui, Supabase, optional OpenAI
- **Users:** Indian men; focus on skin tone, body type, occasion, confidence/social approval

### Core Features (from spec)
1. **Landing (/):** Hero, search, features, testimonials, Indian aesthetic (Navy/Maroon/Cream)
2. **Search (/search):** Multi-language search, voice, filters (skin tone, occasion, body type, confidence, price, color), grid/list, pagination, Hindi keywords
3. **Outfit Builder (/outfit-builder):** Drag & drop (top/bottom/footwear/accessories), preview, auto-suggest, color harmony, social approval, save/share
4. **Profile (/profile):** Setup wizard (name, age → skin tone → body type → style quiz → optional wardrobe upload), saved outfits, favorites
5. **Occasions (/occasions):** Cards per occasion (Wedding, Office, Party, Casual, Date, Interview, Festival, Gym), detail pages with Safe/Moderate/Bold, regional tips
6. **Style Guide (/style-guide):** Body type hacks, skin tone & color guide, fabric guide, mistakes to avoid
7. **AI Chat (/chat):** Conversational stylist, Hindi/English, context-aware; DB-first, AI fallback

### Design System
- **Colors:** Navy #000080, Maroon #800000, Cream #FFFDD0, Olive #556B2F, Gold #FFD700
- **Fonts:** Inter (EN), Noto Sans Devanagari (Hindi)
- **Responsive:** 320px → 768px → 1024px+ (mobile-first)

### Data & DB
- **Schema:** `mens_fashion_items` (main), `color_palette`, `styling_rules`, `occasion_guide`, `body_type_hacks`, `fabric_guide`
- **Key columns:** unique_id, keyword_english/hindi/hinglish, category, sub_category, color_family, hex_color_enhanced, occasion, body_type, skin_tone, confidence_level, social_approval_score (JSONB), body_type_hack
- **Import:** Python script, batch insert (500 rows), 5–10 min for 128K rows

### Psychology Features (required)
- Confidence level: Safe / Moderate / Bold with labels (e.g. शुरुआत के लिए perfect)
- Social approval: Family, Friends, Professional, Dating (e.g. 5/5 stars)
- Body type hacks in Hindi
- “Problem solved” / intent copy

---

## 📐 STEP-BY-STEP EXECUTION PLAN

### PHASE 1: READ & UNDERSTAND ✅
- [x] Read CURSOR_AI_MEGA_PROMPT.md
- [x] Read SUPABASE_SETUP_MEGA_PROMPT.md
- [x] Review schema, data dictionary, CSV structure
- [x] Create this execution plan

### PHASE 2: SUPABASE SETUP (Your manual steps + my deliverables)
| Step | Deliverable | Your action |
|------|-------------|------------|
| 2.1 | Step-by-step Supabase setup guide (markdown) | Follow in dashboard |
| 2.2 | SQL to run: use `supabase_schema_complete.sql` (with trigger fix if needed) | Copy → SQL Editor → Run |
| 2.3 | Python CSV import script `scripts/import_data.py` | Add URL + anon key, run `python scripts/import_data.py` |
| 2.4 | Verification queries + RPC `search_fashion_items` (in guide) | Run in SQL Editor |
| 2.5 | DB connection test (optional small script or doc) | Confirm row count / sample query |

### PHASE 3: BUILD THE APP (Systematic file creation)

#### 3.1 Initialize project
- Create Next.js 14 (App Router) + TypeScript
- Install: `@supabase/supabase-js`, `tailwindcss`, shadcn/ui init, `framer-motion`, `@tanstack/react-query`, `lucide-react`
- Folders: `app/`, `components/`, `components/ui/`, `lib/`, `types/`, `styles/`, `public/`
- Tailwind: extend theme with Navy, Maroon, Cream, Olive, Gold; fonts Inter + Noto Sans Devanagari
- `tsconfig`, `next.config`, `tailwind.config`, `components.json` (shadcn)

#### 3.2 Layout & navigation
- `app/layout.tsx` (root layout, fonts, metadata)
- `components/Header.tsx`, `components/Footer.tsx`, `components/Navigation.tsx`
- Mobile: bottom nav or hamburger; desktop: top nav
- Links: /, /search, /outfit-builder, /profile, /occasions, /style-guide, /chat

#### 3.3 Lib & types
- `lib/supabase.ts` (createClient with env)
- `types/fashion.ts` (FashionItem, Filters, UserProfile, etc. from schema + data dictionary)
- `lib/api/fashion.ts`: searchItems, getItem, getOutfitSuggestions, searchHindi (RPC), filters applied
- `lib/auth.ts` or auth helpers in supabase (signUp, signIn) for profile
- `lib/utils.ts` (cn, etc.)
- Optional: `lib/openai.ts`, `lib/recommendations.ts` (DB-first, AI fallback)

#### 3.4 Pages (in order)
1. **Landing** `app/page.tsx`: Hero + SearchBar, features grid, testimonials, how it works, footer
2. **Search** `app/search/page.tsx`: SearchBar, FilterPanel, results grid/list, pagination, sort; use Supabase + filters
3. **Outfit Builder** `app/outfit-builder/page.tsx`: OutfitCanvas (top/bottom/footwear/accessories), preview, auto-suggest from API, save/share placeholders
4. **Profile** `app/profile/page.tsx`: Wizard (steps: basic info, skin tone, body type, style quiz, optional upload), saved outfits/favorites (UI + mock or Supabase)
5. **Occasions** `app/occasions/page.tsx`: Occasion cards; `app/occasions/[slug]/page.tsx`: detail (safe/moderate/bold, regional, tips)
6. **Style Guide** `app/style-guide/page.tsx`: Body type selector, skin tone & color guide, fabric section
7. **Chat** `app/chat/page.tsx`: Chat UI, send message; optional API route calling OpenAI with DB context

#### 3.5 Components (from spec)
- `SearchBar`: input (Hindi/English placeholder), voice (Web Speech API), clear, loading
- `FilterPanel`: collapsible sections, skin tone, occasion, body type, confidence, price, color; active badges, clear all
- `ItemCard`: image/color preview, title (bilingual), color badge, skin tone compatibility, ConfidenceIndicator, SocialApprovalScore, quick actions
- `OutfitCanvas`: drop zones, item preview, color harmony indicator, save/share
- `ConfidenceIndicator`: Safe/Moderate/Bold meter + tooltip
- `SocialApprovalScore`: Family/Friends/Professional/Dating display
- `SkinTonePicker`: swatches (Fair, Wheatish, Medium, Dusky, Deep)
- `BodyTypeSelector`: options with short descriptions/tips
- Loading: skeletons, spinners; Error: empty state, retry, user-friendly Hindi where needed

#### 3.6 Design & polish
- Apply design system (colors, typography) across all pages
- Responsive: 320px–768px–1024px+
- Loading states on search, outfit suggest, profile steps
- Error boundaries / error states
- Basic animations (Framer Motion): hover, transitions

#### 3.7 API routes (if needed)
- `app/api/search/route.ts` (optional server-side search)
- `app/api/recommendations/route.ts` (optional)
- `app/api/ai/route.ts` (optional OpenAI proxy)

### PHASE 4: TESTING & VERIFICATION
- Basic test suite: Jest + React Testing Library (search, filters, key components)
- Manual: Hindi keyword search, filters, responsive (320/768/1024), outfit builder flow
- Fix bugs and lint errors

### PHASE 5: DEPLOYMENT READY
- `README.md`: setup, env vars, run dev, build, deploy
- `.env.example`: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, OPENAI_API_KEY (optional), NEXT_PUBLIC_APP_URL
- Vercel deployment guide (connect repo, env, deploy)
- Production checks: no hardcoded secrets, build passes

---

## ⏱️ ESTIMATED TIME

| Phase | Task | Time (approx) |
|-------|------|----------------|
| 1 | Read & plan | Done |
| 2 | Supabase guide + Python script + RPC | 15 min (agent) + 20 min (you: SQL + import) |
| 3.1 | Next.js init + deps + Tailwind | 15 min |
| 3.2 | Layout & nav | 20 min |
| 3.3 | Lib, types, API | 25 min |
| 3.4 | All 7 pages | 70 min |
| 3.5 | All components | 50 min |
| 3.6 | Design & polish | 25 min |
| 3.7 | API routes (optional) | 15 min |
| 4 | Testing & fixes | 25 min |
| 5 | README, .env.example, deploy guide | 15 min |

**Total agent build time (approx):** ~3–3.5 hours  
**Your manual time:** ~30–40 min (Supabase SQL, run import, test, deploy)

---

## ❓ QUESTIONS / ASSUMPTIONS

1. **Supabase credentials:** I will use placeholders in `.env.example`; you’ll add real values when we integrate.
2. **CSV path:** Import script will assume `mens_fashion_master_FINAL.csv` in project root (or path you set).
3. **Schema trigger:** Schema uses `EXECUTE FUNCTION` (PostgreSQL 11+). If your Supabase version errors, we’ll switch to `EXECUTE PROCEDURE`.
4. **Auth:** MVP can use Supabase Auth (email/password) for profile/saved outfits; social login can be Phase 2.
5. **AI (OpenAI):** Implemented as optional: env var present → use AI fallback; else DB-only.
6. **Images:** Item images not in CSV; UI will use color preview (hex) + placeholder. Real images can be added later via Supabase Storage.

---

## ✅ SUCCESS CRITERIA (from your prompt)

- [ ] All pages created and functional  
- [ ] Supabase connected and querying  
- [ ] Search works with Hindi keywords  
- [ ] All filters work  
- [ ] Outfit builder functional  
- [ ] App responsive 320px–1920px  
- [ ] Runs locally without errors (`npm run dev`)  
- [ ] Ready to deploy to Vercel  

---

## 🎯 NEXT STEP

**Should I proceed with the build?**

If yes, I will:
1. Create the Supabase setup guide and Python import script (Phase 2).
2. Initialize the Next.js project and install dependencies (Phase 3.1).
3. Build layout, lib, types, and API layer (Phases 3.2–3.3).
4. Build all pages and components (Phases 3.4–3.6).
5. Add tests, README, .env.example, and deployment guide (Phases 4–5).

Reply with **“Yes, proceed!”** (or “Proceed”) to start.
