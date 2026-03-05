# Next 30 Days Action Plan
## Indian Men's Fashion App (RangMatch)

Based on audit-report.md and bugs-list.csv.

---

## Week 1: Critical & Data

### Data & Environment
- [ ] Run `/api/supabase-status` and note `count` for `mens_fashion_items`.
- [ ] If count is 0: run `scripts/import_data.py` (or Supabase CSV import) to load `mens_fashion_master_FINAL.csv`.
- [ ] Run audit SQL (Section 2.3 in audit-report.md) in Supabase SQL Editor and record actual counts in data-gaps.csv.

### High-Priority Fixes
- [ ] **Sort on Search:** Pass sort param from Search page to `/api/search` and order by popularity/created_at/price in `lib/api/fashion.ts`.
- [ ] **Save Outfit:** Add `saved_outfits` table (user_id, items JSON, name, created_at). Add POST/GET API or Supabase client calls; wire Save button in outfit-builder.
- [ ] **Profile persistence:** Add `user_profiles` or use Supabase auth user_metadata to save skin_tone, body_type, preferred_occasion; load on profile page.

### Testing
- [ ] Smoke test: Landing → Search (filters + sort) → Outfit Builder (select, suggest, share).
- [ ] Verify Hindi search and filters return results (with DB or mock).

---

## Week 2: Feature Completion

- [ ] **Item detail page:** Add `app/(main)/items/[id]/page.tsx` (or under search) and `getItem(id)`; link from ItemCard “Get Outfit” or “View”.
- [ ] **Price filter:** Either add numeric price columns or parse `price_range` in search; apply FilterPanel price range to query.
- [ ] **Reference tables (optional):** If product needs color_palette / body_type_hacks / fabric_guide, populate and add small API or server reads.

---

## Week 3: Polish & UX

- [ ] Add loading/error states where missing (e.g. outfit save).
- [ ] Consider drag-and-drop for outfit builder (optional).
- [ ] Chat: optional chat history table and load last N messages.
- [ ] Accessibility pass: focus, aria-labels, keyboard nav.

---

## Week 4: Launch Prep

- [ ] Performance: run `next build` and review bundle; lazy-load heavy components if needed.
- [ ] Final cross-browser and mobile testing.
- [ ] Deploy (e.g. Vercel); set env vars for production Supabase and optional OpenAI.
- [ ] Document .env in README and .env.example.

---

## Quick Reference

| Priority | Item | Owner | Target |
|----------|------|-------|--------|
| Critical | Ensure data in Supabase | You | Week 1 |
| High | Sort on search | Dev | Week 1 |
| High | Save outfit to DB | Dev | Week 1 |
| High | Profile preferences persisted | Dev | Week 1 |
| Medium | Item detail page | Dev | Week 2 |
| Medium | Price filter in API | Dev | Week 2 |
| Low | Drag-drop, download image, chat history | Dev | Week 3–4 |

---

*Update this file as items are completed.*
