-- ============================================
-- PREVIEW IMAGES TABLE - Feel-good outfit previews
-- Bucket aligned for your setup: recolor_assets (public)
-- ============================================

create extension if not exists "uuid-ossp";

CREATE TABLE IF NOT EXISTS preview_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  url TEXT,
  storage_path TEXT,
  tags TEXT[] DEFAULT '{}',
  fabric TEXT,
  color TEXT,
  type TEXT NOT NULL,
  combo_type TEXT,
  rules_description TEXT,
  rules TEXT,
  preview_type TEXT DEFAULT 'outfit',
  feel_good_factor TEXT[] DEFAULT '{}',
  occasion TEXT[] DEFAULT '{}',
  skin_tone TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_preview_images_type ON preview_images(type);
CREATE INDEX IF NOT EXISTS idx_preview_images_combo_type ON preview_images(combo_type);
CREATE INDEX IF NOT EXISTS idx_preview_images_tags ON preview_images USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_preview_images_occasion ON preview_images USING GIN(occasion);
CREATE INDEX IF NOT EXISTS idx_preview_images_feel_good ON preview_images USING GIN(feel_good_factor);
CREATE INDEX IF NOT EXISTS idx_preview_images_sort ON preview_images(sort_order);

COMMENT ON TABLE preview_images IS 'Feel-good outfit preview images for RangMatch; URLs from Supabase Storage.';
COMMENT ON COLUMN preview_images.preview_type IS 'outfit | ui_element | hero | card';
COMMENT ON COLUMN preview_images.feel_good_factor IS 'confidence_boost | cultural_pride | excitement | freedom | exploration';

ALTER TABLE preview_images ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'preview_images'
      AND policyname = 'Allow read preview_images'
  ) THEN
    CREATE POLICY "Allow read preview_images"
      ON preview_images
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Seed sample rows for homepage recurring feed.
-- NOTE: storage_path must be relative to bucket root `recolor_assets`.
INSERT INTO preview_images (
  prompt_id,
  name,
  storage_path,
  tags,
  fabric,
  color,
  type,
  combo_type,
  rules_description,
  rules,
  preview_type,
  feel_good_factor,
  occasion,
  skin_tone,
  sort_order
) VALUES
  (
    1001,
    'Navy + White Office Smart',
    'previews/formal/navy_white_office.jpg',
    ARRAY['office','smart','repeat'],
    'cotton',
    'navy-white',
    'Office',
    'daily_repeat',
    'Crisp shirt, tailored trouser, brown accessories',
    'Use high contrast with clean neutrals',
    'outfit',
    ARRAY['confidence_boost'],
    ARRAY['office'],
    ARRAY['fair','medium','wheatish','dusky','deep'],
    1
  ),
  (
    1002,
    'Muted Earth Weekend',
    'previews/casual/muted_earth_weekend.jpg',
    ARRAY['weekend','casual','earthy'],
    'linen',
    'olive-beige',
    'Weekend',
    'daily_repeat',
    'Olive overshirt with beige trouser',
    'Keep top muted and footwear clean',
    'outfit',
    ARRAY['freedom','exploration'],
    ARRAY['casual'],
    ARRAY['medium','wheatish','dusky','deep'],
    2
  ),
  (
    1003,
    'Festival Royal Maroon',
    'previews/fusion/festival_royal_maroon.jpg',
    ARRAY['festival','ethnic','royal'],
    'silk-blend',
    'maroon-ivory',
    'Festival',
    'festive_cycle',
    'Deep maroon kurta with ivory base',
    'Contrast warm maroon with soft neutral',
    'outfit',
    ARRAY['cultural_pride','excitement'],
    ARRAY['festival','wedding'],
    ARRAY['fair','medium','wheatish','dusky','deep'],
    3
  )
ON CONFLICT (prompt_id) DO UPDATE
SET
  name = EXCLUDED.name,
  storage_path = EXCLUDED.storage_path,
  tags = EXCLUDED.tags,
  fabric = EXCLUDED.fabric,
  color = EXCLUDED.color,
  type = EXCLUDED.type,
  combo_type = EXCLUDED.combo_type,
  rules_description = EXCLUDED.rules_description,
  rules = EXCLUDED.rules,
  preview_type = EXCLUDED.preview_type,
  feel_good_factor = EXCLUDED.feel_good_factor,
  occasion = EXCLUDED.occasion,
  skin_tone = EXCLUDED.skin_tone,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
