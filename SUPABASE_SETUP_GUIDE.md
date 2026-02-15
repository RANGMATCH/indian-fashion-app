# 🚀 SUPABASE SETUP QUICKSTART GUIDE
## Indian Men's Fashion Database

---

## 📋 PREREQUISITES

Before you begin, make sure you have:
- [ ] Supabase account (free tier is fine)
- [ ] Project created on Supabase
- [ ] PostgreSQL 14+ (Supabase default)
- [ ] CSV file: `mens_fashion_master_FINAL.csv`
- [ ] SQL file: `supabase_schema_complete.sql`

---

## 🏗️ STEP 1: CREATE SUPABASE PROJECT

1. Go to https://supabase.com
2. Click "New Project"
3. Enter details:
   - **Name:** `indian-mens-fashion`
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to India (Singapore/Mumbai if available)
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

---

## 🗄️ STEP 2: RUN SCHEMA SQL

### Via Supabase Dashboard (Recommended):

1. In your project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open `supabase_schema_complete.sql` file
4. Copy ALL content
5. Paste into SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. Wait for success message: ✅ "Success. No rows returned"

### Expected Results:
```
✅ 6 tables created
✅ 15+ indexes created
✅ 2 triggers created
✅ 3 views created
✅ RLS policies enabled
```

### Verify Schema:
```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should see:
-- mens_fashion_items
-- color_palette
-- styling_rules
-- occasion_guide
-- body_type_hacks
-- fabric_guide
```

---

## 📥 STEP 3: IMPORT CSV DATA

### Option A: Using Supabase Dashboard (For smaller datasets)

1. Go to **Table Editor** → **mens_fashion_items**
2. Click **"Insert"** → **"Import data from CSV"**
3. Select `mens_fashion_master_FINAL.csv`
4. Map columns (should auto-match)
5. Click **"Import"**
6. ⚠️ **Note:** Dashboard import may fail for large files (128K+ rows)

### Option B: Using Python Script (Recommended for large data)

```python
import pandas as pd
from supabase import create_client, Client

# Your Supabase credentials
SUPABASE_URL = "your-project-url"  # From Project Settings
SUPABASE_KEY = "your-anon-key"     # From Project Settings > API

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load CSV
df = pd.read_csv('mens_fashion_master_FINAL.csv')

# Batch insert (1000 rows at a time)
BATCH_SIZE = 1000
total_rows = len(df)

for i in range(0, total_rows, BATCH_SIZE):
    batch = df.iloc[i:i+BATCH_SIZE]
    
    # Convert to list of dicts
    records = batch.to_dict('records')
    
    # Insert batch
    try:
        result = supabase.table('mens_fashion_items').insert(records).execute()
        print(f"✅ Inserted rows {i} to {min(i+BATCH_SIZE, total_rows)}")
    except Exception as e:
        print(f"❌ Error at batch {i}: {e}")
        break

print(f"\n✅ Total rows inserted: {total_rows}")
```

### Option C: Using PostgreSQL COPY (Fastest)

```bash
# Connect to your Supabase database
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Copy CSV data
\COPY mens_fashion_items (unique_id, product_id, keyword_english, ...) 
FROM 'mens_fashion_master_FINAL.csv' 
DELIMITER ',' 
CSV HEADER;
```

---

## 🔍 STEP 4: VERIFY DATA IMPORT

```sql
-- Check row count
SELECT COUNT(*) FROM mens_fashion_items;
-- Expected: 128,743 rows

-- Check Hindi keywords
SELECT keyword_hindi, COUNT(*) 
FROM mens_fashion_items 
WHERE keyword_hindi IS NOT NULL 
GROUP BY keyword_hindi 
LIMIT 10;

-- Check skin tone distribution
SELECT skin_tone, COUNT(*) 
FROM mens_fashion_items 
GROUP BY skin_tone 
ORDER BY COUNT(*) DESC;

-- Test full-text search
SELECT unique_id, keyword_hindi, sub_category 
FROM mens_fashion_items 
WHERE to_tsvector('simple', keyword_hindi) @@ to_tsquery('simple', 'शादी')
LIMIT 10;
```

---

## 🔐 STEP 5: CONFIGURE RLS (Row Level Security)

RLS is already enabled in the schema. Verify:

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;
```

### Test Public Access:

```javascript
// From your app (JavaScript)
const { data, error } = await supabase
  .from('mens_fashion_items')
  .select('*')
  .eq('is_active', true)
  .limit(10);

console.log(data); // Should return 10 items
```

---

## 🌐 STEP 6: TEST API ENDPOINTS

### Get Project URL and Keys:
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL:** `https://xxx.supabase.co`
   - **Anon/Public Key:** `eyJhbGci...`

### Test Queries:

#### 1. Search by Hindi Keyword:
```javascript
const { data } = await supabase
  .from('mens_fashion_items')
  .select('*')
  .ilike('keyword_hindi', '%शादी%')
  .limit(10);
```

#### 2. Search by Skin Tone & Occasion:
```javascript
const { data } = await supabase
  .from('mens_fashion_items')
  .select('*')
  .eq('skin_tone', 'Wheatish')
  .eq('occasion', 'Wedding')
  .limit(20);
```

#### 3. Search by Color:
```javascript
const { data } = await supabase
  .from('mens_fashion_items')
  .select('*')
  .ilike('color_family', '%Navy%')
  .eq('confidence_level', 'Safe')
  .limit(10);
```

#### 4. Full-Text Search:
```javascript
const { data } = await supabase
  .rpc('search_fashion_items', {
    search_query: 'शादी कुर्ता'
  });
```

---

## 🎨 STEP 7: POPULATE COLOR PALETTE TABLE (Optional)

```sql
INSERT INTO color_palette (color_name, color_name_hindi, hex_code, color_family, best_for_skin_tone) VALUES
('Navy Blue', 'नेवी ब्लू', '#000080', 'Blue', ARRAY['Wheatish', 'Medium', 'Dusky', 'Deep']),
('Maroon', 'मैरून', '#800000', 'Red', ARRAY['Wheatish', 'Medium', 'Dusky']),
('White', 'सफेद', '#FFFFFF', 'Neutral', ARRAY['Fair', 'Wheatish', 'Medium', 'Dusky', 'Deep']),
('Black', 'काला', '#000000', 'Neutral', ARRAY['Fair', 'Wheatish', 'Medium', 'Dusky', 'Deep']),
('Olive Green', 'ऑलिव ग्रीन', '#556B2F', 'Green', ARRAY['Wheatish', 'Medium', 'Dusky']);

-- Add more colors as needed
```

---

## 🧪 STEP 8: PERFORMANCE TESTING

### Test Query Speed:

```sql
-- Should be < 50ms
EXPLAIN ANALYZE
SELECT * FROM mens_fashion_items
WHERE category = 'Western Wear'
AND skin_tone = 'Wheatish'
LIMIT 10;

-- Full-text search speed (< 150ms)
EXPLAIN ANALYZE
SELECT * FROM mens_fashion_items
WHERE to_tsvector('simple', keyword_hindi) @@ to_tsquery('simple', 'शादी');
```

### Check Index Usage:

```sql
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

---

## 🔧 TROUBLESHOOTING

### Problem: CSV Import Fails
**Solution:** 
- Check file encoding (must be UTF-8)
- Try smaller batches (500 rows instead of 1000)
- Use Python script with error handling

### Problem: Hindi Keywords Not Searchable
**Solution:**
```sql
-- Recreate index with correct configuration
DROP INDEX IF EXISTS idx_fulltext_search;

CREATE INDEX idx_fulltext_search ON mens_fashion_items 
USING GIN (to_tsvector('simple', 
    COALESCE(keyword_hindi, '') || ' ' || 
    COALESCE(keyword_english, '')
));
```

### Problem: Slow Queries
**Solution:**
- Check if indexes are being used: `EXPLAIN ANALYZE query`
- Vacuum database: `VACUUM ANALYZE mens_fashion_items;`
- Add more specific indexes if needed

### Problem: RLS Blocks Access
**Solution:**
```sql
-- Temporarily disable for testing
ALTER TABLE mens_fashion_items DISABLE ROW LEVEL SECURITY;

-- Re-enable after fixing policies
ALTER TABLE mens_fashion_items ENABLE ROW LEVEL SECURITY;
```

---

## 📊 MONITORING & MAINTENANCE

### Check Database Size:
```sql
SELECT 
    pg_size_pretty(pg_database_size(current_database())) as db_size,
    pg_size_pretty(pg_total_relation_size('mens_fashion_items')) as table_size;
```

### Regular Maintenance:
```sql
-- Run weekly
VACUUM ANALYZE mens_fashion_items;

-- Update statistics
ANALYZE mens_fashion_items;
```

---

## 🚀 NEXT STEPS

1. ✅ Build basic API endpoints
2. ✅ Test Hindi search thoroughly
3. ✅ Implement outfit recommendation logic
4. ✅ Create user profile system
5. ✅ Integrate OpenAI for AI fallback
6. ✅ Generate priority AI images (top 500)
7. ✅ Deploy frontend (React/Next.js)

---

## 📞 SUPPORT

If you encounter issues:
1. Check Supabase logs: **Project → Logs**
2. Review schema: **Table Editor**
3. Test queries: **SQL Editor**
4. Check API response: **API → Logs**

---

## 🎯 SUCCESS CHECKLIST

- [ ] Schema created successfully
- [ ] All 128,743 rows imported
- [ ] Hindi full-text search working
- [ ] API endpoints responding < 200ms
- [ ] RLS policies active
- [ ] Indexes being used (check EXPLAIN)
- [ ] Sample queries returning correct results

---

**Created:** 2024
**Database Version:** 1.0
**Supabase Compatible:** PostgreSQL 14+

🎉 **Congratulations! Your database is ready!** 🎉
