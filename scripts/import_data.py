#!/usr/bin/env python3
"""
Supabase CSV Import Script - Indian Men's Fashion Database
Imports mens_fashion_master_FINAL.csv into mens_fashion_items table.
Batch insert for 128K+ rows. Run from project root.
"""

import pandas as pd
from supabase import create_client, Client
import json
import os
from tqdm import tqdm
import time

# ============ CONFIGURATION - UPDATE THESE ============
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://xxxxx.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGci...")
# CSV path: from project root, or use absolute path
CSV_FILE = os.path.join(os.path.dirname(__file__), "..", "mens_fashion_master_FINAL.csv")
BATCH_SIZE = 500
# =====================================================

def clean_value(val):
    """Convert NaN, NIL, empty to None for PostgreSQL."""
    if pd.isna(val) or val == "" or (isinstance(val, str) and val.strip().upper() in ("NIL", "NAN", "NULL")):
        return None
    if isinstance(val, str) and val.strip() == "":
        return None
    return val

def parse_json_safe(val):
    """Parse JSON string to dict; return None if invalid."""
    if val is None or (isinstance(val, float) and pd.isna(val)):
        return None
    if isinstance(val, dict):
        return val
    if isinstance(val, str) and val.strip():
        try:
            return json.loads(val)
        except (json.JSONDecodeError, TypeError):
            return None
    return None

def row_to_record(row):
    """Convert a DataFrame row to a dict matching the database schema."""
    record = {}
    # Map CSV columns to table columns (omit id - auto-generated)
    col_map = {
        "unique_id": "unique_id",
        "product_id": "product_id",
        "keyword_english": "keyword_english",
        "keyword_hindi": "keyword_hindi",
        "keyword_hinglish": "keyword_hinglish",
        "category": "category",
        "sub_category": "sub_category",
        "color_family": "color_family",
        "hex_color": "hex_color",
        "hex_color_enhanced": "hex_color_enhanced",
        "fabric": "fabric",
        "occasion": "occasion",
        "body_type": "body_type",
        "age_group": "age_group",
        "skin_tone": "skin_tone",
        "price_range": "price_range",
        "confidence_level": "confidence_level",
        "solves_problem": "solves_problem",
        "body_type_hack": "body_type_hack",
        "season_recommendation": "season_recommendation",
        "query_type": "query_type",
        "intent": "intent",
        "search_volume": "search_volume",
        "competition": "competition",
        "trend": "trend",
        "answer_english": "answer_english",
        "answer_hindi": "answer_hindi",
        "answer_hinglish": "answer_hinglish",
        "advice_line1": "advice_line1",
        "advice_line2": "advice_line2",
        "advice_line3": "advice_line3",
        "advice_line4": "advice_line4",
        "advice_line5": "advice_line5",
        "combination": "combination",
        "color_top": "color_top",
        "color_bottom": "color_bottom",
        "accessories": "accessories",
        "psychology": "psychology",
        "fabric_suggestion": "fabric_suggestion",
        "weather_best": "weather_best",
        "data_source": "data_source",
    }
    for csv_col, db_col in col_map.items():
        if csv_col in row.index:
            v = clean_value(row[csv_col])
            record[db_col] = v

    # match_score: schema is TEXT, CSV may be number
    if "match_score" in row.index:
        v = row["match_score"]
        if pd.notna(v) and v != "":
            record["match_score"] = str(v) if not isinstance(v, str) else v
        else:
            record["match_score"] = None
    else:
        record["match_score"] = None

    # JSONB columns
    record["social_approval_score"] = parse_json_safe(row.get("social_approval_score"))
    record["image_metadata"] = parse_json_safe(row.get("image_metadata"))

    # Ensure category is not null (schema: NOT NULL)
    if not record.get("category"):
        record["category"] = "General"

    return record

def main():
    if "xxxxx" in SUPABASE_URL or "eyJhbGci..." in SUPABASE_KEY:
        print("ERROR: Please set SUPABASE_URL and SUPABASE_KEY in this script or as env vars.")
        print("Get them from Supabase Dashboard → Project Settings → API")
        return

    csv_path = os.path.abspath(CSV_FILE)
    if not os.path.isfile(csv_path):
        print(f"ERROR: CSV file not found: {csv_path}")
        return

    print("Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Connected.")

    print(f"Loading {csv_path}...")
    df = pd.read_csv(csv_path, low_memory=False, encoding="utf-8")
    total_rows = len(df)
    print(f"Loaded {total_rows:,} rows.")

    success_count = 0
    error_count = 0
    errors = []

    for i in tqdm(range(0, total_rows, BATCH_SIZE), desc="Importing"):
        batch = df.iloc[i : i + BATCH_SIZE]
        records = [row_to_record(batch.iloc[j]) for j in range(len(batch))]

        try:
            supabase.table("mens_fashion_items").insert(records).execute()
            success_count += len(records)
            time.sleep(0.1)
        except Exception as e:
            error_count += len(records)
            errors.append({"batch_start": i, "batch_end": min(i + BATCH_SIZE, total_rows), "error": str(e)})
            tqdm.write(f"Error batch {i}-{min(i + BATCH_SIZE, total_rows)}: {e}")
            continue

    print("\n" + "=" * 60)
    print("IMPORT SUMMARY")
    print("=" * 60)
    print(f"Success: {success_count:,} rows")
    print(f"Errors:  {error_count:,} rows")
    if total_rows:
        print(f"Rate:    {100 * success_count / total_rows:.1f}%")
    if errors:
        for err in errors[:5]:
            print(f"  Batch {err['batch_start']}-{err['batch_end']}: {err['error']}")
    print("=" * 60)

    # Quick verify
    try:
        r = supabase.table("mens_fashion_items").select("unique_id", count="exact").limit(1).execute()
        print(f"Database count (approx): {r.count if hasattr(r, 'count') else 'N/A'}")
    except Exception as e:
        print(f"Verify query failed: {e}")

    print("Done.")

if __name__ == "__main__":
    main()
