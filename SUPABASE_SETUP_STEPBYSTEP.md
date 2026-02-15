# Supabase Setup – Step-by-Step Guide

Follow these steps in order. You only need to run SQL and the import script; the app will use the same database.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → Dashboard → **New project**.
2. Set:
   - **Name:** `indian-fashion-db` (or any name)
   - **Database password:** Generate a strong password and **save it**
   - **Region:** `ap-south-1` (Mumbai) or `ap-southeast-1` (Singapore)
3. Click **Create project** and wait 2–3 minutes until the project is ready.

**Verify:** Dashboard opens, status is **Active**, and you see **Project URL** (e.g. `https://xxxxx.supabase.co`).

---

## Step 2: Run the Schema (SQL)

1. In the left sidebar, open **SQL Editor**.
2. Click **+ New query**.
3. Open the file **`supabase_schema_complete.sql`** from this project and copy its **entire** content.
4. Paste into the SQL Editor and click **Run** (or Ctrl/Cmd + Enter).

**Expected:** Message like “Success. No rows returned.”

**If you see an error about the trigger:** Some Supabase/Postgres versions expect `EXECUTE PROCEDURE` instead of `EXECUTE FUNCTION`. If so, in the schema file change:

- `EXECUTE FUNCTION update_updated_at_column();`  
to  
- `EXECUTE PROCEDURE update_updated_at_column();`  

Then run the SQL again.

**Verify:** Run this in a new query:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see: `body_type_hacks`, `color_palette`, `fabric_guide`, `mens_fashion_items`, `occasion_guide`, `styling_rules`.

---

## Step 3: Create Search RPC (Hindi / multi-language search)

In the **SQL Editor**, run this in a **new query**:

```sql
CREATE OR REPLACE FUNCTION search_fashion_items(search_query TEXT)
RETURNS TABLE (
    unique_id TEXT,
    keyword_hindi TEXT,
    keyword_english TEXT,
    sub_category TEXT,
    color_family TEXT,
    occasion TEXT,
    skin_tone TEXT,
    confidence_level TEXT,
    category TEXT,
    hex_color_enhanced TEXT,
    body_type TEXT,
    body_type_hack TEXT,
    solves_problem TEXT,
    social_approval_score JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.unique_id,
        m.keyword_hindi,
        m.keyword_english,
        m.sub_category,
        m.color_family,
        m.occasion,
        m.skin_tone,
        m.confidence_level,
        m.category,
        m.hex_color_enhanced,
        m.body_type,
        m.body_type_hack,
        m.solves_problem,
        m.social_approval_score
    FROM mens_fashion_items m
    WHERE
        m.is_active = true
        AND (
            m.keyword_hindi ILIKE '%' || search_query || '%'
            OR m.keyword_hinglish ILIKE '%' || search_query || '%'
            OR m.keyword_english ILIKE '%' || search_query || '%'
            OR m.sub_category ILIKE '%' || search_query || '%'
            OR m.category ILIKE '%' || search_query || '%'
        )
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION search_fashion_items(TEXT) TO anon, authenticated;
```

**Verify:** Run `SELECT * FROM search_fashion_items('शादी') LIMIT 5;` — you should get rows (after data import) or an empty result (before import).

---

## Step 4: Get Your API Credentials

1. In Supabase Dashboard go to **Project Settings** (gear icon) → **API**.
2. Copy and save:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (under “Project API keys”)

You will use these in the app’s `.env.local` and in the Python import script.

---

## Step 5: Import CSV Data (Python Script)

1. Install Python dependencies (in this project folder):

   ```bash
   pip install pandas supabase tqdm
   ```

2. Open **`scripts/import_data.py`** and set at the top:
   - `SUPABASE_URL` = your **Project URL**
   - `SUPABASE_KEY` = your **anon public** key
   - `CSV_FILE` = path to `mens_fashion_master_FINAL.csv` (e.g. `mens_fashion_master_FINAL.csv` if run from project root)

3. From the **project root** (where the CSV is), run:

   ```bash
   python scripts/import_data.py
   ```

   Expected duration: about 5–10 minutes for 128K rows.

4. If you see batch errors, note the batch range; you can fix data and re-run (script can be adjusted to skip already-imported `unique_id` if needed).

---

## Step 6: Verify Data

In **SQL Editor**, run:

```sql
-- Row count (expected: 128743 or close)
SELECT COUNT(*) AS total_rows FROM mens_fashion_items;

-- Sample rows
SELECT unique_id, keyword_hindi, sub_category, occasion, skin_tone
FROM mens_fashion_items
LIMIT 5;

-- Hindi search
SELECT unique_id, keyword_hindi, sub_category
FROM mens_fashion_items
WHERE keyword_hindi ILIKE '%शादी%'
LIMIT 10;
```

All queries should return results (and the count should match your import).

---

## Step 7: Add Credentials to the App

In the Next.js app root, create **`.env.local`** (do not commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

Replace with your **Project URL** and **anon public** key.

---

## Troubleshooting

- **“relation mens_fashion_items does not exist”**  
  Run **Step 2** again (full `supabase_schema_complete.sql`).

- **Trigger error on `EXECUTE FUNCTION`**  
  Change to `EXECUTE PROCEDURE` in the schema and re-run the SQL.

- **Import timeout / too large**  
  Use the Python script (Step 5); avoid importing the CSV via the Supabase dashboard for 128K rows.

- **Hindi text looks wrong**  
  Ensure the CSV and database use UTF-8. The Python script reads with default UTF-8; Supabase uses UTF-8 by default.

---

You’re done when: all 6 tables exist, row count is correct, Hindi search returns results, and the app’s `.env.local` has the same URL and anon key.
