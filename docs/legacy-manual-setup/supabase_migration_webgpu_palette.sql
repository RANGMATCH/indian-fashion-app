-- WebGPU-friendly dynamic palette table for RangMatch
-- Safe, idempotent migration (re-runnable)

create table if not exists public.webgpu_color_palette (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_hi text,
  hex text not null check (hex ~ '^#[0-9A-Fa-f]{6}$'),
  group_name text not null check (group_name in ('neutrals', 'classic', 'pastels', 'bold', 'ethnic')),
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create index if not exists webgpu_color_palette_group_sort_idx
  on public.webgpu_color_palette (group_name, sort_order);

alter table public.webgpu_color_palette enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'webgpu_color_palette'
      and policyname = 'Allow read webgpu_color_palette'
  ) then
    create policy "Allow read webgpu_color_palette"
      on public.webgpu_color_palette
      for select
      using (true);
  end if;
end $$;

insert into public.webgpu_color_palette (name, name_hi, hex, group_name, sort_order)
values
  ('Ivory White', 'हाथीदांत', '#F5F0EB', 'neutrals', 1),
  ('Charcoal', 'चारकोल', '#374151', 'neutrals', 2),
  ('Navy Blue', 'नेवी नीला', '#1A237E', 'classic', 11),
  ('Deep Maroon', 'मैरून', '#7B1C2B', 'classic', 12),
  ('Blush Pink', 'गुलाबी', '#F8BBD0', 'pastels', 21),
  ('Saffron Orange', 'केसरिया', '#E65100', 'bold', 31),
  ('Mehendi Green', 'मेहंदी', '#558B2F', 'ethnic', 41)
on conflict do nothing;
-- ============================================
-- WEBGPU COLOR PALETTE (separated color dataset)
-- Purpose: keep recolor service fast by querying only color rows.
-- ============================================

CREATE TABLE IF NOT EXISTS webgpu_color_palette (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_hi TEXT,
  hex TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL CHECK (group_name IN ('neutrals', 'classic', 'pastels', 'bold', 'ethnic')),
  source_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webgpu_palette_group ON webgpu_color_palette(group_name);
CREATE INDEX IF NOT EXISTS idx_webgpu_palette_sort ON webgpu_color_palette(sort_order);

COMMENT ON TABLE webgpu_color_palette IS
'Separated color dataset for low-latency recolor and future WebGPU pipelines.';

-- Optional bootstrap from mens_fashion_items when available
-- (assumes columns: color_family, hex_color, hex_color_enhanced)
WITH grouped AS (
  SELECT
    INITCAP(COALESCE(NULLIF(color_family, ''), 'Unnamed Color')) AS name,
    LOWER(COALESCE(NULLIF(hex_color_enhanced, ''), NULLIF(hex_color, ''))) AS hex,
    CASE
      WHEN LOWER(COALESCE(color_family, '')) IN ('black', 'white', 'grey', 'gray', 'beige', 'brown') THEN 'neutrals'
      WHEN LOWER(COALESCE(color_family, '')) IN ('navy', 'blue', 'green', 'maroon', 'purple', 'olive') THEN 'classic'
      WHEN LOWER(COALESCE(color_family, '')) IN ('mint', 'peach', 'lavender', 'pastel blue', 'pastel pink') THEN 'pastels'
      WHEN LOWER(COALESCE(color_family, '')) IN ('orange', 'red', 'yellow', 'hot pink') THEN 'bold'
      ELSE 'ethnic'
    END AS group_name,
    COUNT(*) AS source_count
  FROM mens_fashion_items
  WHERE COALESCE(NULLIF(hex_color_enhanced, ''), NULLIF(hex_color, '')) ~ '^#?[0-9A-Fa-f]{6}$'
  GROUP BY 1, 2, 3
),
dedup AS (
  SELECT
    name,
    hex,
    group_name,
    source_count,
    ROW_NUMBER() OVER (PARTITION BY hex ORDER BY source_count DESC, name ASC) AS rn
  FROM grouped
)
INSERT INTO webgpu_color_palette (name, name_hi, hex, group_name, source_count, sort_order)
SELECT
  name,
  NULL AS name_hi,
  hex,
  group_name,
  source_count,
  DENSE_RANK() OVER (ORDER BY source_count DESC, hex) AS sort_order
FROM dedup
WHERE rn = 1
ON CONFLICT (hex) DO UPDATE
SET
  source_count = EXCLUDED.source_count,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
