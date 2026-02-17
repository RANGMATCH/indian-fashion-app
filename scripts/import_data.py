#!/usr/bin/env python3
"""
Supabase CSV Import Script - Indian Men's Fashion Database
Imports CSV into mens_fashion_items table. Supports large files (e.g. 200 MB).
Usage: python scripts/import_data.py [path/to/your.csv]
       Or put file as mens_fashion_master_FINAL.csv in project root.
"""

import pandas as pd
from supabase import create_client, Client
import json
import os
import sys
from tqdm import tqdm
import time

# Load .env.local so we can use NEXT_PUBLIC_SUPABASE_* from project
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip().strip('"').strip("'")
load_env()

# ============ CONFIGURATION ============
SUPABASE_URL = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "https://xxxxx.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "eyJhbGci...")
# CSV: 1) command-line arg, 2) env CSV_FILE, 3) default file in project
if len(sys.argv) > 1:
    CSV_FILE = os.path.abspath(sys.argv[1])
else:
    CSV_FILE = os.environ.get("CSV_FILE") or os.path.join(os.path.dirname(__file__), "..", "mens_fashion_master_FINAL.csv")
BATCH_SIZE = 500
# =======================================

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

    # Chunked read for large files (e.g. 200 MB) - saves memory
    CHUNK_ROWS = 50_000
    print(f"Reading CSV in chunks (max {CHUNK_ROWS:,} rows per chunk): {csv_path}")
    success_count = 0
    error_count = 0
    errors = []

    for chunk in tqdm(pd.read_csv(csv_path, low_memory=False, encoding="utf-8", chunksize=CHUNK_ROWS), desc="Chunks"):
        total_in_chunk = len(chunk)
        for i in range(0, total_in_chunk, BATCH_SIZE):
            batch = chunk.iloc[i : i + BATCH_SIZE]
            records = [row_to_record(batch.iloc[j]) for j in range(len(batch))]
            try:
                supabase.table("mens_fashion_items").insert(records).execute()
                success_count += len(records)
                time.sleep(0.05)
            except Exception as e:
                error_count += len(records)
                errors.append({"error": str(e)})
                tqdm.write(f"Error: {e}")
                continue

    total_rows = success_count + error_count
    print("\n" + "=" * 60)
    print("IMPORT SUMMARY")
    print("=" * 60)
    print(f"Success: {success_count:,} rows")
    print(f"Errors:  {error_count:,} rows")
    if total_rows:
        print(f"Rate:    {100 * success_count / total_rows:.1f}%")
    if errors:
        for err in errors[:5]:
            msg = err.get("error", str(err))
            print(f"  Error: {msg}")
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
