# Live preview – RangMatch

## Open the app in the browser

1. **Dev server** should be running. If not, in the project folder run:
   ```bash
   npm run dev
   ```

2. **Open in browser:**  
   **http://localhost:3000**

3. **In Cursor:** you can use **Simple Browser** or **Open in Browser** and go to the same URL.

---

## Pages to try

| URL | Page |
|-----|------|
| http://localhost:3000 | Landing (hero, search, trending, testimonials) |
| http://localhost:3000/search | Search (filters, sort, grid/list) |
| http://localhost:3000/outfit-builder | Outfit Builder |
| http://localhost:3000/profile | Profile wizard |
| http://localhost:3000/occasions | Occasions list |
| http://localhost:3000/style-guide | Style guide |
| http://localhost:3000/chat | AI Stylist chat |
| http://localhost:3000/login | Login |
| http://localhost:3000/signup | Sign up |

---

## If Search / Outfit Builder show no data

- Add Supabase credentials to **`.env.local`** (copy from `.env.example`).
- Run the SQL schema and CSV import as in **SUPABASE_SETUP_STEPBYSTEP.md**.

Without Supabase, the app still runs; search and outfit builder will return empty until the DB is set up.
